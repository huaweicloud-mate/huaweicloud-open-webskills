# ABC Skills

华为云 Web 前端开发技能集（Codex / Claude Code / OpenCode 兼容的 SKILL.md 格式）。

## 技能列表

| 技能 | 说明 |
| --- | --- |
| huawei-cloud-web-form | 通用网页表单开发：字段设计、校验、提交流程、防刷、埋点，覆盖推广报名/登录注册/数据录入/搜索/配置等场景，含原生与 Vue3 模板 |
| huawei-cloud-web-scaffold | Vue3 + TS + Vite + Opentiny + Pinia 项目初始化：目录结构、vite/tsconfig 配置、环境变量、路由、store、i18n、工具函数 |
| huawei-cloud-web-responsive-layout | Vue3 响应式布局：断点体系、PC 多尺寸与主流手机机型适配、useViewport |
| huawei-cloud-web-compatibility | 浏览器兼容：Chrome/Firefox/Safari/Edge/国产浏览器支持矩阵（L1-L3 + A/B/C）、分辨率适配原则、特性检测与降级写法 |
| huawei-cloud-web-performance | Web 性能优化：Core Web Vitals、资源优化、缓存 CDN、vitals 采集器 |
| huawei-cloud-web-login | 华为云平台登录/登出集成：IAM SSO 登录流程、islogin 登录态判断、ticket 换 token、SSOJTC/token cookie 管理 |
| huawei-cloud-web-code-style | Vue3 组件与代码规范：SFC 结构、命名、props/emits、TS 类型、评审清单 |
| huawei-cloud-web-nav-footer | 华为云风格页头 NavBar 与页尾 Footer：黑色中国站顶栏、白色吸顶导航、移动端汉堡菜单、营销页尾，Vue3 组件即插即用 |
| huawei-cloud-web-ui | 华为云官网 UI 设计规范（cnpm-baseui 3.0.17）：设计 Token（por- 前缀 CSS 变量）、完整组件库（按钮/链接/输入框/下拉/单选复选/日期/弹窗/提示/标签/面包屑/分页/轮播/评分/价格/倒计时/滚动条/播放器/页签/锚点/折叠/卡片/服务表格/固定表头表格/文本/图标）、布局（楼层/栅格）、页头接入（开发者官网场景默认接入公共 `<hd-header>`）、XTemplate 与完整示例 |
| **huawei-cloud-web-develop** | **（合并新增）开发阶段入口技能**：合并 scaffold/ui/nav-footer/login/form/responsive-layout/code-style，端到端开发，内置「OpenTiny 组件优先」「项目 CSS 加 `#项目id` 前缀」两条强制规则 |
| **huawei-cloud-web-review** | **（合并新增）测试/QA 阶段入口技能**：合并 compatibility/performance + code-style 评审清单，做兼容性、性能与代码规范审查（暂不含 UI 审查） |
| huawei-activity-submit | 华为云开放能力线上闯关挑战作品提交（Agent 接口 `{base}/submit-activity-work`，AK/SK 请求头）：按顺序提交「沙箱部署」(milestone=beginner) 与「ECS 持久化部署」(milestone=intermediate)，成功后回报对应积分；沙箱完成后可选发布到作品展览馆的闯关活动 |

## 阶段合并技能（新增）

为适配「**一个阶段只能加载一个 skill**」的平台（如 grape），把开发阶段与审查阶段的相关技能分别合并为两个**入口技能**。**原有技能全部保留、不删除；以下两个技能为纯新增。**

### huawei-cloud-web-develop（开发阶段）

- **合并自**：`huawei-cloud-web-scaffold`、`huawei-cloud-web-ui`、`huawei-cloud-web-nav-footer`、`huawei-cloud-web-login`、`huawei-cloud-web-form`、`huawei-cloud-web-responsive-layout`、`huawei-cloud-web-code-style`
- **覆盖流程**：工程脚手架 → UI 规范与组件 → 页头/页脚 → 登录 → 表单 → 响应式布局 → 代码规范
- **内置强制规则**：
  1. 能用 OpenTiny 组件实现的，不要用 HTML 标签手写（`npx skills add opentiny/agent-skills`）
  2. 项目内部 CSS 样式统一加 `#当前项目id` 前缀，避免被公共样式污染
- **结构**：`SKILL.md`（工作流 + 强制规则 + 资源索引）+ `references/`（scaffold/ui/nav-footer/forms/responsive-layout/code-style）+ `assets/`（`.js` 原件 + `.md` 包裹的 `.vue`/`.css` 源码）

### huawei-cloud-web-review（测试 / QA 阶段）

- **合并自**：`huawei-cloud-web-compatibility`、`huawei-cloud-web-performance`，以及 `huawei-cloud-web-code-style` 的评审自查清单
- **覆盖流程**：代码规范评审 → 浏览器兼容性审查 → 性能审查 → 统一验收清单
- **范围说明**：当前**不包含 UI 设计规范审查**
- **结构**：`SKILL.md` + `references/`（browser-compatibility/browser-matrix/resolution-support/compatibility-techniques/performance/performance-metrics/performance-techniques/review-checklist）+ `assets/`（`feature-detect.js`/`vitals-collect.js`）

### 平台约束

- 上述两个技能文件夹**仅包含平台支持的文件类型（`.md` / `.js` / `.yaml`），不含 `.html` / `.vue` / `.css` 文件**。原 `.html` 整页示例、`.vue` 组件与 `.css` 样式均已转为 Markdown 下的代码块，内容原样保留。
- 技能统一采用 `SKILL.md` + `references/` 多文件结构。

## 安装

### 方式一：npx 安装（推荐）

```bash
npx skills add https://github.com/huaweicloud-mate/huaweicloud-open-webskills.git --skill huawei-activity-submit -y
```

> GitCode/Gitee 等非 GitHub/GitLab 仓库，URL **必须以 `.git` 结尾**；否则会被当作网页下载而报 `Downloaded URL is not a valid SKILL.md file or supported archive`。GitHub 网页 URL 可省略 `.git`，但统一带 `.git` 更稳妥。
>
> 只装单个技能用 `--skill <技能名>`（本仓库有多个技能，加 `--skill` 只装指定那一个）。

### 方式二：手动复制

将需要的技能目录复制到对应工具的 skills 目录：

- Codex：`~/.codex/skills/<skill-name>/`
- Claude Code：`~/.claude/skills/<skill-name>/`
- OpenCode：`~/.config/opencode/skill/<skill-name>/`
