#!/usr/bin/env node
// 华为云开放能力线上闯关挑战 —— 作品提交脚本（直连活动 Agent 接口，非页面操作）
//
// 接口（Agent 版，AK/SK 鉴权）：
//   POST {base}/submit-activity-work
//   base = https://open-dataset.huaweicloud.com/api/v1/hdopenservice/agent    （prod，默认）
//          https://opentest-dataset.huaweicloud.com/api/v1/hdopenservice/agent  （test）
//   请求头（鉴权）：X-HW-AK（必）、X-HW-SK（必）、X-HW-Security-Token（可选）
//   ECS 步骤（intermediate）额外请求头：X-HW-PROJECT-ID、X-HW-REGION（上传 ECS 的 Project ID 与 region）
//   请求体 / 响应与 /user/submit-activity-work 一致：
//     { activity_code, milestone, work_link?, api_link?, summary? }
//
//   两步里程碑（后端实际取值沿用旧版 beginner / intermediate；页面已改名为“沙箱部署 / ECS 持久化部署”）：
//     - sandbox  步骤（旧 beginner）→ 提交字段 work_link（沙箱域名链接）
//     - ecs      步骤（旧 intermediate）→ 提交字段 api_link（公网访问地址，**需含 index.html**，如 http://<EIP>/hc-activity/index.html；缺省时脚本自动补全）
//     - 旧 advanced 步骤已取消，不存在
//   `--milestone` 同时接受 sandbox / ecs 别名（自动归一化为 beginner / intermediate）。
//
// 用法示例：
//   node submit.mjs --milestone beginner --work-link https://xxxx-3000.devbridge-s2.hwtunnel.com --summary "..."
//   node submit.mjs --milestone intermediate --api-link http://<ECS_EIP>/hc-activity/index.html --project-id <PROJECT_ID> --region cn-north-4 --summary "..."
//
// 凭证（优先级：命令行参数 > 环境变量 > 凭证文件）：
//   --ak <AK> / --sk <SK> / --security-token <token>
//   环境变量 HW_ACCESS_KEY / HW_SECRET_KEY / HW_SECURITY_TOKEN
//     （兼容 HUAWEICLOUD_SDK_AK / HUAWEICLOUD_SDK_SK / HUAWEICLOUD_SDK_SECURITY_TOKEN、HW_AK / HW_SK）
//   凭证文件 ~/.config/hw-activity/credentials.json  {"ak":"...","sk":"...","securityToken":"..."}
//   兜底：DevKit 统一凭据库 ~/.config/huaweicloud/credentials.json（{"ak","sk","securityToken"}）
//
// 其他：
//   --env prod|test   选择环境（默认 prod；用户提示词含“测试环境/测试/test”时用 test）
//   HW_ACTIVITY_ENV   环境变量，等价于 --env（=test 时走测试接口）
//   --project-id <id> ECS 步骤：Project ID（也支持 HW_PROJECT_ID / hcloud 配置）
//   --region <region> ECS 步骤：region（也支持 HW_REGION / hcloud 配置）
//   --base <url>      直接覆盖接口基地址
//   --dry-run         只打印将提交的请求体，不真正提交
//   --help            显示帮助

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'

const BASES = {
  test: 'https://opentest-dataset.huaweicloud.com/api/v1/hdopenservice/agent',
  prod: 'https://open-dataset.huaweicloud.com/api/v1/hdopenservice/agent',
}

const ACTIVITY_CODE = 'open-capability-2026-1024'
const SANDBOX_RE = /^https:\/\/[^/]*devbridge-s2\.hwtunnel\.com(\/|$)/
const LABEL = {
  beginner: '沙箱部署',
  intermediate: 'ECS 持久化部署',
}
const POINTS = { beginner: 1000, intermediate: 2000 }

// 步骤别名 → 后端 milestone 值
const MILESTONE_ALIAS = {
  beginner: 'beginner',
  sandbox: 'beginner',
  intermediate: 'intermediate',
  ecs: 'intermediate',
}

function parseArgs(argv) {
  const args = {}
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (!a.startsWith('--')) continue
    const key = a.slice(2)
    if (key === 'dry-run' || key === 'help') {
      args[key] = true
      continue
    }
    args[key] = argv[++i]
  }
  return args
}

function envFirst(names) {
  for (const n of names) {
    const v = process.env[n]
    if (v) return v
  }
  return ''
}

function readCredFile(f) {
  try {
    if (fs.existsSync(f)) {
      const j = JSON.parse(fs.readFileSync(f, 'utf8'))
      return {
        ak: j.ak || j.accessKeyId || j.access_key || '',
        sk: j.sk || j.secretAccessKey || j.secret_key || '',
        securityToken: j.securityToken || j.security_token || j.token_st || '',
      }
    }
  } catch {
    /* 忽略畸形凭证文件 */
  }
  return { ak: '', sk: '', securityToken: '' }
}

function loadCreds(args) {
  let ak = args.ak || envFirst(['HW_ACCESS_KEY', 'HUAWEICLOUD_SDK_AK', 'HW_AK'])
  let sk = args.sk || envFirst(['HW_SECRET_KEY', 'HUAWEICLOUD_SDK_SK', 'HW_SK'])
  let securityToken = args['security-token'] || envFirst(['HW_SECURITY_TOKEN', 'HUAWEICLOUD_SDK_SECURITY_TOKEN'])
  if (!ak || !sk) {
    const candidates = [
      path.join(os.homedir(), '.config', 'hw-activity', 'credentials.json'),
      path.join(os.homedir(), '.config', 'huaweicloud', 'credentials.json'),
    ]
    for (const f of candidates) {
      const c = readCredFile(f)
      ak = ak || c.ak
      sk = sk || c.sk
      securityToken = securityToken || c.securityToken
      if (ak && sk) break
    }
  }
  return { ak, sk, securityToken }
}

function readHcloudProfile() {
  try {
    const f = path.join(os.homedir(), '.hcloud', 'config.json')
    if (!fs.existsSync(f)) return {}
    const j = JSON.parse(fs.readFileSync(f, 'utf8'))
    const list = Array.isArray(j.profiles) ? j.profiles : []
    const cur = list.find((p) => p.name === (j.current || 'default')) || list[0]
    return cur ? { projectId: cur.projectId || '', region: cur.region || '' } : {}
  } catch {
    return {}
  }
}

// ECS 步骤所需的 Project ID / region（优先级：命令行参数 > 环境变量 > hcloud 配置）
function loadProjectRegion(args) {
  let projectId = args['project-id'] || envFirst(['HW_PROJECT_ID', 'HUAWEICLOUD_PROJECT_ID'])
  let region = args.region || envFirst(['HW_REGION', 'HUAWEICLOUD_REGION'])
  if (!projectId || !region) {
    const h = readHcloudProfile()
    projectId = projectId || h.projectId || ''
    region = region || h.region || ''
  }
  return { projectId, region }
}

async function call(base, pathname, { method = 'GET', body, creds, extraHeaders } = {}) {
  const headers = { Accept: 'application/json' }
  if (body) headers['Content-Type'] = 'application/json'
  if (creds?.ak) headers['X-HW-AK'] = creds.ak
  if (creds?.sk) headers['X-HW-SK'] = creds.sk
  if (creds?.securityToken) headers['X-HW-Security-Token'] = creds.securityToken
  if (extraHeaders) {
    for (const k of Object.keys(extraHeaders)) {
      if (extraHeaders[k]) headers[k] = extraHeaders[k]
    }
  }
  const res = await fetch(base + pathname, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  let json = null
  try {
    json = JSON.parse(text)
  } catch {
    /* 非 JSON 响应 */
  }
  return { status: res.status, json, text }
}

function ensureIndexHtml(u) {
  const s = (u || '').trim()
  if (/index\.html(\?|#|$)/i.test(s)) return s
  const m = s.match(/^([^?#]*)([?#].*)?$/)
  if (!m) return s
  let path = m[1]
  const tail = m[2] || ''
  let last
  try {
    last = new URL(path).pathname.split('/').pop() || ''
  } catch {
    return s
  }
  if (last.includes('.')) return s // 路径末段已是文件（如 a.php）→ 原样返回，交由校验报错
  if (!path.endsWith('/')) path += '/'
  return path + 'index.html' + tail
}

function validate(ms, workLink, apiLink) {
  const errs = []
  if (ms === 'beginner') {
    if (!workLink) errs.push('作品链接缺失')
    else if (!SANDBOX_RE.test(workLink)) errs.push('作品链接需为 https://xxx.devbridge-s2.hwtunnel.com 形式')
  } else if (ms === 'intermediate') {
    if (!apiLink) errs.push('公网访问地址缺失')
    else if (!/^https?:\/\//i.test(apiLink)) errs.push('公网访问地址需为 http(s):// 开头')
    else if (!/index\.html/i.test(apiLink)) errs.push('公网访问地址需包含 index.html（如 http://<EIP>/hc-activity/index.html）')
  } else {
    errs.push(`未知里程碑：${ms}（应为 beginner(沙箱) / intermediate(ECS)）`)
  }
  return errs
}

function buildBody(ms, workLink, apiLink, summary) {
  const body = { activity_code: ACTIVITY_CODE, milestone: ms }
  if (summary) body.summary = summary
  if (ms === 'beginner') body.work_link = workLink
  else if (ms === 'intermediate') body.api_link = apiLink
  return body
}

function hasCreds(creds) {
  return Boolean(creds.ak && creds.sk)
}

function fail(msg) {
  console.error(msg)
  process.exitCode = 1
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.help || (!args.milestone && !args['dry-run'])) {
    printHelp()
    return
  }

  const env = (args.env || process.env.HW_ACTIVITY_ENV || 'prod').toLowerCase()
  const base = args.base || BASES[env === 'test' ? 'test' : 'prod']
  const creds = loadCreds(args)

  const ms = MILESTONE_ALIAS[args.milestone] || args.milestone
  const workLink = args['work-link']
  let apiLink = args['api-link']
  const summary = args.summary

  if (ms === 'intermediate' && apiLink) apiLink = ensureIndexHtml(apiLink)

  // ECS 步骤：附加 X-HW-PROJECT-ID / X-HW-REGION 请求头（上传 ECS 的 Project ID 与 region）
  const { projectId, region } = loadProjectRegion(args)
  const extraHeaders = {}
  if (ms === 'intermediate') {
    if (projectId) extraHeaders['X-HW-PROJECT-ID'] = projectId
    if (region) extraHeaders['X-HW-REGION'] = region
  }

  const errs = validate(ms, workLink, apiLink)
  if (ms === 'intermediate') {
    if (!projectId) errs.push('缺少 ECS Project ID：请传 --project-id，或设 HW_PROJECT_ID，或确保 hcloud 配置了 projectId')
    if (!region) errs.push('缺少 ECS region：请传 --region，或设 HW_REGION，或确保 hcloud 配置了 region')
  }
  if (summary && summary.length > 500) errs.push('作品说明不能超过 500 字')
  if (errs.length) {
    fail('参数校验未通过：\n- ' + errs.join('\n- '))
    return
  }

  const body = buildBody(ms, workLink, apiLink, summary)
  if (args['dry-run']) {
    console.log(JSON.stringify({ base, headers: extraHeaders, body }, null, 2))
    return
  }
  if (!hasCreds(creds)) {
    fail('缺少凭证：请提供 --ak/--sk（或 HW_ACCESS_KEY/HW_SECRET_KEY、~/.config/hw-activity/credentials.json）')
    return
  }

  const r = await call(base, '/submit-activity-work', { method: 'POST', body, creds, extraHeaders })
  if (r.status === 401 || r.status === 403) {
    fail(`鉴权失败（HTTP ${r.status}），请检查 AK/SK（及临时凭证的 SecurityToken）是否正确`)
    return
  }
  if (r.status !== 200 || !r.json) {
    fail(`提交失败（HTTP ${r.status}）：${r.text}`)
    return
  }
  if (r.json.code !== 'success') {
    fail(`提交失败：${r.json.message || r.text}`)
    return
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        milestone: ms,
        label: LABEL[ms],
        points: POINTS[ms],
        message: r.json.message || '',
        allCompleted: ms === 'intermediate',
      },
      null,
      2,
    ),
  )
  console.log(`\n提交成功，已获得${LABEL[ms]}对应积分 ${POINTS[ms]} 分。`)
  if (ms === 'beginner') {
    console.log('沙箱部署已完成。请询问用户是否将作品提交到开发者作品展览馆的闯关活动展示（用户可选，不强求；默认训练营：闯关活动，trainingCampId=47d6ba99-fca0-4797-947d-a8776f506df1）。')
  }
}

function printHelp() {
  console.log(`华为云开放能力闯关 · 作品提交脚本（Agent 接口 / AK-SK 鉴权）

用法：
  node submit.mjs --milestone <beginner|intermediate> [--work-link <url>] [--api-link <url>] [--project-id <id>] [--region <region>] [--summary "<text>"]

参数：
  --milestone <ms>       步骤：beginner（沙箱部署）/ intermediate（ECS 持久化部署）；也接受别名 sandbox / ecs
  --work-link <url>      beginner 必填，沙箱域名 URL（https://xxx.devbridge-s2.hwtunnel.com 形式）
  --api-link <url>       intermediate 必填，公网访问地址（http(s):// 开头且含 index.html，如 http://<EIP>/hc-activity/index.html）
  --project-id <id>      intermediate 必填，ECS 的 Project ID（请求头 X-HW-PROJECT-ID；或 HW_PROJECT_ID / hcloud 配置）
  --region <region>      intermediate 必填，ECS 的 region（请求头 X-HW-REGION；或 HW_REGION / hcloud 配置）
  --summary <text>       作品说明，≤500 字（可选）
  --env prod|test        接口环境（默认 prod；提示词含“测试环境”时用 test，等价于 HW_ACTIVITY_ENV=test）
  --base <url>           覆盖接口基地址
  --dry-run              仅打印将提交的请求头与请求体

凭证（优先级 参数 > 环境变量 > 文件）：
  --ak <AK> / --sk <SK> / --security-token <token>
  HW_ACCESS_KEY / HW_SECRET_KEY / HW_SECURITY_TOKEN
    （兼容 HUAWEICLOUD_SDK_AK / HUAWEICLOUD_SDK_SK / HUAWEICLOUD_SDK_SECURITY_TOKEN、HW_AK / HW_SK）
  ~/.config/hw-activity/credentials.json            {"ak":"...","sk":"...","securityToken":"..."}
  ~/.config/huaweicloud/credentials.json（DevKit 兜底）
`)
}

main().catch((e) => fail(String(e?.stack || e)))
