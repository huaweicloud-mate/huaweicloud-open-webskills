---
name: huawei-activity-submit-test
description: 直连华为云开放能力线上闯关挑战（activity_code=open-capability-2026-1024）的 Agent 提交接口（POST {base}/submit-activity-work），用 AK/SK 请求头（X-HW-AK / X-HW-SK / X-HW-Security-Token）把活动生成的作品链接/公网地址自动提交到“沙箱部署”（milestone=beginner）与“ECS 持久化部署”（milestone=intermediate）两步，并在成功后回报预计可得积分。Use when the user asks to 提交作品、提交闯关成果、自动提交活动成果、提交沙箱链接/公网地址, or when a generated sandbox URL needs to be submitted for the 华为云开放能力闯关挑战。本 skill 固定使用**测试环境**接口，无需也**不要**切换环境。仅用于调用接口，不涉及任何页面/浏览器操作.
---

# 华为云开放能力闯关 · 作品提交 Skill（测试环境）

让 Agent 直接调用活动 **Agent 提交接口**（AK/SK 鉴权）完成成果提交（**不做任何页面/浏览器操作**），提交成功后向用户提示已获得的对应步骤积分。

## 何时使用

- 用户说“把作品/成果/沙箱链接提交到活动” “帮我提交闯关成果” “提交沙箱域名/公网地址” 等。
- 活动已生成沙箱作品链接（前端站点）和/或 ECS 公网地址，需要提交到对应步骤。
- 仅针对活动 `activity_code = open-capability-2026-1024`。

## 提交接口

| 项 | 值 |
|----|----|
| 基地址（测试，固定） | `https://opentest-dataset.huaweicloud.com/api/v1/hdopenservice/agent` |
| 提交 | `POST {base}/submit-activity-work` |

> 前端页面走 `/user/...`（SSO 登录会话）；Agent 走 `/agent/...`（AK/SK 请求头），两者**请求体与响应一致**。本 skill **固定使用测试环境**基地址，不切换环境。

**鉴权（AK/SK 请求头）**：

- `X-HW-AK`（必填）：华为云 Access Key
- `X-HW-SK`（必填）：华为云 Secret Key
- `X-HW-Security-Token`（可选）：使用 STS 临时凭证时必填

**ECS 步骤附加请求头**（仅 `intermediate`（ECS 持久化部署）提交时携带）：

- `X-HW-PROJECT-ID`：ECS 的 Project ID
- `X-HW-REGION`：ECS 的 region（如 `cn-north-4`）

> 凭证优先级：命令行参数 > 环境变量（`HW_ACCESS_KEY`/`HW_SECRET_KEY`/`HW_SECURITY_TOKEN`，兼容 `HUAWEICLOUD_SDK_AK`/`HUAWEICLOUD_SDK_SK`/`HUAWEICLOUD_SDK_SECURITY_TOKEN`、`HW_AK`/`HW_SK`）> 凭证文件 `~/.config/hw-activity/credentials.json`（`{"ak":"...","sk":"...","securityToken":"..."}`）> DevKit 统一凭据库 `~/.config/huaweicloud/credentials.json`。**切勿把凭证写入仓库。**

**提交请求体**（`Content-Type: application/json`，与 `/user/submit-activity-work` 一致）：

```json
{
  "activity_code": "open-capability-2026-1024",
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
4. **执行提交**：运行 `submit.mjs`（见下）。参数与步骤字段对应（本 skill 固定使用测试环境接口）。
5. **回报用户**：
   - 成功：提示“提交成功。**预计可得**{沙箱部署 / ECS 持久化部署}对应积分 {1000 / 2000} 分（以成长体系实际发放为准；**该积分仅可获得一次**，重复提交不再加分）”，并说明该步骤已完成、可继续下一步。
   - 失败：原样反馈接口返回的 `message`（如 `里程碑参数不合法`、`当前里程碑需提交接口地址`、`作品链接无效`、`缺少请求头 X-HW-AK`）。
6. **资源清理（全部完成后）**：`intermediate`（ECS 持久化部署）提交成功即 `allCompleted=true`，**必须**用 `question` 工具询问用户是否清理本次活动创建的**按量付费资源**（选项：全部清理 / 仅删 ECS / 暂不清理），按用户选择执行或跳过；脚本也会在成功输出中打印清理提醒。

## 脚本用法

脚本位于本 skill 目录：`submit.mjs`（纯 Node，Node ≥ 18，无需额外依赖）。

```bash
# 1) 沙箱部署：提交沙箱域名 URL（milestone=beginner）
node submit.mjs --milestone beginner \
  --work-link https://abcd1234-3000.devbridge-s2.hwtunnel.com \
  --summary "2048 单文件小游戏"

# 2) ECS 持久化部署：提交公网访问地址（milestone=intermediate；链接需含 index.html；带 ECS 的 Project ID / region）
node submit.mjs --milestone intermediate \
  --api-link http://<ECS_EIP>/hc-activity/index.html \
  --project-id <PROJECT_ID> --region cn-north-4
```

凭证可通过命令行参数或环境变量提供：

```bash
# PowerShell
$env:HW_ACCESS_KEY = "<AK>"
$env:HW_SECRET_KEY = "<SK>"
$env:HW_SECURITY_TOKEN = "<使用 STS 临时凭证时填写>"   # 可选
# 或直接：node submit.mjs --ak <AK> --sk <SK> [--security-token <token>]
```

成功输出示例（实际为多行 JSON）：

```
{
  "ok": true,
  "milestone": "intermediate",
  "label": "ECS 持久化部署",
  "points": 2000,
  "message": "...",
  "allCompleted": true
}

提交成功。预计可得ECS 持久化部署对应积分 2000 分（以华为云成长体系实际发放为准；该积分仅可获得一次，重复提交不再加分）。
```

## 注意事项

- **只调接口，不做页面操作**：不要驱动浏览器、不要模拟点击页面表单。
- **固定环境、不切换**：本 skill 始终使用**测试环境**；传入 `--env` / `--base` 等环境参数会被**忽略**（不报错、无效果），不会切到其它环境（生产环境请改用 `huawei-activity-submit-prod`）。
- **顺序提交**：步骤必须按 `beginner`（沙箱）→ `intermediate`（ECS）依次提交，接口会校验顺序。
- **ECS 步骤附加请求头**：`intermediate`（ECS 持久化部署）提交时需携带 `X-HW-PROJECT-ID`（ECS 的 Project ID）与 `X-HW-REGION`（ECS 的 region）；脚本通过 `--project-id`/`--region`（或环境变量 `HW_PROJECT_ID`/`HW_REGION`，或 hcloud 配置）取值，缺失会报错。
- **沙箱域名强校验**：`beginner` 步骤的链接必须是 `https://xxx.devbridge-s2.hwtunnel.com` 形式的沙箱域名；`intermediate` 步骤提交的公网地址必须 **`http(s)://` 开头且包含 `index.html`**（如 `http://<EIP>/hc-activity/index.html`），否则接口正则报错。
- **凭证安全**：AK/SK（及临时凭证的 SecurityToken）仅用于本次会话，不要写入仓库或提交到版本库；优先用环境变量或凭证文件，避免明文出现在命令行历史。
- **SK 明文传输说明**：`X-HW-SK` 以请求头明文传递是**活动 API 自身设计**（`/agent/*` 接口要求 AK/SK 头），依赖 **HTTPS 传输加密**；请勿将 SK 写入仓库、日志或对外分享。
- **提交不可重复使用**：同一地址提交后即与该账户绑定，勿重复提交相同链接。
