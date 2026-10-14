---
name: huawei-activity-submit
description: 直连华为云开放能力线上闯关挑战（activity_code=open-capability-2026）的 Agent 提交接口（POST {base}/submit-activity-work），用 AK/SK 请求头（X-HW-AK / X-HW-SK / X-HW-Security-Token）把活动生成的作品链接/公网地址自动提交到“沙箱部署”（milestone=beginner）与“ECS 持久化部署”（milestone=intermediate）两步，并在成功后回报已获得的对应积分；沙箱部署（beginner）完成后询问用户是否（可选）将作品发布到开发者作品展览馆的闯关活动（npx skills add ... publish-work-to-gallery）。Use when the user asks to 提交作品、提交闯关成果、自动提交活动成果、提交沙箱链接/公网地址, or when a generated sandbox URL needs to be submitted for the 华为云开放能力闯关挑战。用户提示词提到“测试环境/测试/test”时走测试环境接口（--env test），否则默认走生产接口。仅用于调用接口，不涉及任何页面/浏览器操作.
---

# 华为云开放能力闯关 · 作品提交 Skill

让 Agent 直接调用活动 **Agent 提交接口**（AK/SK 鉴权）完成成果提交（**不做任何页面/浏览器操作**），提交成功后向用户提示已获得的对应步骤积分。

## 何时使用

- 用户说“把作品/成果/沙箱链接提交到活动” “帮我提交闯关成果” “提交沙箱域名/公网地址” 等。
- 活动已生成沙箱作品链接（前端站点）和/或 ECS 公网地址，需要提交到对应步骤。
- 仅针对活动 `activity_code = open-capability-2026`。

## 提交接口

| 项 | 值 |
|----|----|
| 生产基地址（默认） | `https://open-dataset.huaweicloud.com/api/v1/hdopenservice/agent` |
| 测试基地址（`--env test`） | `https://opentest-dataset.huaweicloud.com/api/v1/hdopenservice/agent` |
| 提交 | `POST {base}/submit-activity-work` |

> 前端页面走 `/user/...`（SSO 登录会话）；Agent 走 `/agent/...`（AK/SK 请求头），两者**请求体与响应一致**。生产/测试**路径相同，仅主机不同**；**默认走生产**，用 `--env test` 切测试、`--env prod` 切生产。

> **环境选择规则（重要）**：默认**生产**。当**用户提示词中出现“测试环境 / 测试 / test”等字样**时，改用**测试**接口——提交命令加 `--env test`（或设环境变量 `HW_ACTIVITY_ENV=test`）。其余情况一律走生产，不要主动切测试。

**鉴权（AK/SK 请求头）**：

- `X-HW-AK`（必填）：华为云 Access Key
- `X-HW-SK`（必填）：华为云 Secret Key
- `X-HW-Security-Token`（可选）：使用 STS 临时凭证时必填

> 凭证优先级：命令行参数 > 环境变量（`HW_ACCESS_KEY`/`HW_SECRET_KEY`/`HW_SECURITY_TOKEN`，兼容 `HUAWEICLOUD_SDK_AK`/`HUAWEICLOUD_SDK_SK`/`HUAWEICLOUD_SDK_SECURITY_TOKEN`、`HW_AK`/`HW_SK`）> 凭证文件 `~/.config/hw-activity/credentials.json`（`{"ak":"...","sk":"...","securityToken":"..."}`）> DevKit 统一凭据库 `~/.config/huaweicloud/credentials.json`。**切勿把凭证写入仓库。**

**提交请求体**（`Content-Type: application/json`，与 `/user/submit-activity-work` 一致）：

```json
{
  "activity_code": "open-capability-2026",
  "milestone": "beginner | intermediate",
  "work_link": "https://xxx.devbridge-s2.hwtunnel.com",
  "api_link": "http://<ECS_EIP>/hc-activity/index.html",
  "summary": "作品说明（可选，≤500 字）"
}
```

按步骤取字段：

- `beginner`（沙箱部署）：只传 `work_link`（沙箱站点链接）
- `intermediate`（ECS 持久化部署）：只传 `api_link`（ECS 公网访问地址，**需含 `index.html`**，如 `http://<EIP>/hc-activity/index.html`）

**响应**：`{ "code": "success", "message": "..." }`；`code === "success"` 即提交成功。

## 步骤、字段对应、校验与积分

两步，必须**按顺序**提交：`beginner`（沙箱部署）→ `intermediate`（ECS 持久化部署）；前一步通过后才能提交下一步。

> **字段/取值对应（重要）**：后端 `milestone` 取值**沿用旧版** `beginner` / `intermediate`（页面文案已改名为“沙箱部署 / ECS 持久化部署”）；旧 `advanced` 步骤**已取消**，不存在。
>
> | 页面步骤 | `milestone` 取值 | 提交字段 |
> |---|---|---|
> | 沙箱部署 | `beginner` | `work_link` |
> | ECS 持久化部署 | `intermediate` | `api_link` |
>
> `--milestone` 同时接受别名：`sandbox`→`beginner`、`ecs`→`intermediate`（脚本自动归一化）。

沙箱域名正则（同前端 `SANDBOX_RE`）：`^https:\/\/[^/]*devbridge-s2\.hwtunnel\.com(\/|$)`

| 步骤 | milestone | 需提交 | 校验 | 成功后积分 |
|------|-----------|--------|------|-----------|
| 沙箱部署 | `beginner` | 沙箱站点链接（`work_link`） | 沙箱域名 | 1000 分（¥100） |
| ECS 持久化部署 | `intermediate` | 公网访问地址（`api_link`） | `http(s)://` 开头**且含 `index.html`**（如 `http://<EIP>/hc-activity/index.html`） | 2000 分（¥200） |

## 操作步骤（Agent 执行）

1. **收集链接**：沙箱步骤用公开沙箱域名（`https://xxx.devbridge-s2.hwtunnel.com`，部署后先 `curl -sI <URL>` 验证 200）；ECS 步骤用 ECS 公网 HTML 地址（`http://<EIP>/`）。
2. **确定当前步骤**：按流程判断——先提交沙箱（`beginner`），沙箱通过后再提交 ECS（`intermediate`）；只提交当前已完成的步骤。
3. **校验链接格式**：脚本会在提交前自动校验（沙箱域名、`http(s)://` 前缀与 `index.html`、说明 ≤500 字）；不通过时会打印原因，修正后再提交。
4. **执行提交**：运行 `submit.mjs`（见下）。参数与步骤字段对应；**若用户提示词提到“测试环境/测试/test”则加 `--env test`，否则默认走生产**。
5. **回报用户**：
   - 成功：提示“提交成功，已获得{沙箱部署 / ECS 持久化部署}对应积分 {1000 / 2000} 分”，并说明该步骤已完成、可继续下一步。
   - 失败：原样反馈接口返回的 `message`（如 `里程碑参数不合法`、`当前里程碑需提交接口地址`、`作品链接无效`、`缺少请求头 X-HW-AK`）。
6. **沙箱部署完成后（见下节）**：`beginner`（沙箱部署）提交成功后，**即**询问用户是否将作品提交到**开发者作品展览馆的闯关活动**展示（**是否提交由用户自行决定**，同意才发布）；ECS 步骤不触发此询问。

## 脚本用法

脚本位于本 skill 目录：`submit.mjs`（纯 Node，Node ≥ 18，无需额外依赖）。

```bash
# 1) 沙箱部署：提交沙箱域名 URL（milestone=beginner）
node submit.mjs --milestone beginner \
  --work-link https://abcd1234-3000.devbridge-s2.hwtunnel.com \
  --summary "2048 单文件小游戏"

# 2) ECS 持久化部署：提交公网访问地址（milestone=intermediate；链接需含 index.html）
node submit.mjs --milestone intermediate \
  --api-link http://<ECS_EIP>/hc-activity/index.html
```

凭证可通过命令行参数或环境变量提供：

```bash
# PowerShell
$env:HW_ACCESS_KEY = "<AK>"
$env:HW_SECRET_KEY = "<SK>"
$env:HW_SECURITY_TOKEN = "<使用 STS 临时凭证时填写>"   # 可选
# 或直接：node submit.mjs --ak <AK> --sk <SK> [--security-token <token>]
```

成功输出示例：

```
{ "ok": true, "milestone": "intermediate", "label": "ECS 持久化部署", "points": 2000, "message": "..." }

提交成功，已获得ECS 持久化部署对应积分 2000 分。
```

## 沙箱部署完成后：提交到开发者作品展览馆的闯关活动展示（用户可选）

当**沙箱部署（`beginner`）提交成功后**（提交输出 `"milestone": "beginner"`、`"ok": true`）**即**执行本步骤；**是否提交展览馆由用户决定**——用户同意才发布，拒绝则跳过本节、直接结束。ECS（`intermediate`）步骤**不再触发**此询问。

> **默认直接提交到此活动**：作品默认提交到作品展览馆的「**闯关活动**」，**跳过训练营选择**，不再让用户挑营地。
> - 活动名：`闯关活动`
> - `trainingCampId`：`47d6ba99-fca0-4797-947d-a8776f506df1`

1. **询问用户**（用 `question` 工具）：是否将作品提交到**开发者作品展览馆的闯关活动**展示？（**用户可选**，明确同意才继续；不同意就结束，不要勉强）
2. **用户同意后**，执行：
   ```bash
   npx skills add https://gitcode.com/Lingxi-HandsOn/gallery.git --skill publish-work-to-gallery -y 2>&1
   ```
3. 该命令会安装 `publish-work-to-gallery` skill；随后**按该 skill 的指引**，收集并将用户本地做闯关任务产生的代码（前端、后端等项目的实际目录）推送至开发者作品展览馆的闯关活动。发布时**默认使用 `trainingCampId=47d6ba99-fca0-4797-947d-a8776f506df1`（闯关活动），无需再选择训练营**。**代码目录名不固定**，以用户本次实际生成/使用的目录为准，不要假定某个固定仓库名。
4. 用户不同意则跳过本步骤，直接结束。

**注意事项**：
- 只在**沙箱部署（`beginner`）提交成功后**提示本次询问；不要提前询问，ECS（`intermediate`）步骤**不再询问**。
- 是否提交展览馆**完全由用户决定**，用户拒绝则跳过，不得代替用户决定。
- 执行前先与用户确认或识别闯关任务实际产生的代码目录（前端、后端项目，**目录名不固定**），只推送相关代码，避免带上无关文件。可由用户指定，或扫描本次工作区中生成的项目目录来确定。
- 如 `npx skills add` 需要联网/安装，失败时如实反馈错误并让用户决定是否重试。

## 注意事项

- **只调接口，不做页面操作**：不要驱动浏览器、不要模拟点击页面表单。
- **顺序提交**：步骤必须按 `beginner`（沙箱）→ `intermediate`（ECS）依次提交，接口会校验顺序。
- **沙箱域名强校验**：`beginner` 步骤的链接必须是 `https://xxx.devbridge-s2.hwtunnel.com` 形式的沙箱域名；`intermediate` 步骤提交的公网地址必须 **`http(s)://` 开头且包含 `index.html`**（如 `http://<EIP>/hc-activity/index.html`），否则接口正则报错。
- **凭证安全**：AK/SK（及临时凭证的 SecurityToken）仅用于本次会话，不要写入仓库或提交到版本库；优先用环境变量或凭证文件，避免明文出现在命令行历史。
- **提交不可重复使用**：同一地址提交后即与该账户绑定，勿重复提交相同链接。
