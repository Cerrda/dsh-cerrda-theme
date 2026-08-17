# Cerrda Theme — 插件保存与恢复说明

> 本目录保存了当前运行的动态 Cordis 插件的完整源码与恢复方法。
> 动态插件只存在于 DSH 进程内存中，进程重启后会丢失；恢复 = 用下面的源码重新 `cordis_define` + `cordis_run`。
> **bundle 插件（方案 B）已落地**：见文末「方案 B：bundle 插件」，`dsh plugin add` 一键安装，彻底免去审批与重启后重建。

## 插件身份（最后运行状态）

| 项 | 值 |
|---|---|
| pluginId | `cerrda-1` |
| 当前 packageId | `pkg-1` |
| 最近一次运行 | run-1（成功，运行中） |
| 名称 | cerrda-theme |
| 组成 | 仅 Client half（无 Host half） |

## 目录文件

- `src/cerrda-theme-client.js` — 动态插件版 Client half 完整源码（单一事实来源）。
- `lib/client.js` — 静态 bundle（由 `src/` 经固定变换生成；变更源码后需重新生成）。
- `docs/plan.md` — 主题设计方案（token / glass 策略 / DOM 锚点）。
- `docs/restore.md` — 本文档。
- `docs/share.md` — 分享说明。

## 插件功能

DSH Web GUI 的 cerrda 暗色主题：
- Silk WebGL2 动态背景（`mountSilkBackground`）
- Liquid Glass 输入栏 / hero 面板 / 回到底部按钮（SVG 位移滤镜 `#cerrda-liquid-glass`）
- CSS 液态玻璃：侧边栏、详情列、会话头部、工具卡片、浮层
- 玫瑰 accent / Fraunces+Sora 字体 / CardSpotlight / Ripple / ShimmerBorder

三个修复（相对旧版）：
1. **复制按钮 tooltip 闪现**：`[role='tooltip']` 默认 `opacity:0`，EffectsHost 门控——内联 `left/top` 定位就绪后打 `data-cerrda-show` 淡入（兜底 4 帧）。
2. **hero 光晕**：隐藏 `[data-composer-seat] [class*='_heroGlow']`（HeroGlow 蓝色模糊椭圆 SVG）。
3. **侧边栏透明度**：`--dsw-specific-sidebar-fill` 46%→12%（token 覆盖 + CSS 重映射两处），玻璃层 tint 12%→8%、blur 14px→8px。

## 恢复步骤（进程重启后）

用 agent（本会话或新会话）执行：

1. **定义**：`cordis_define`
   - `plugin.kind: "new"`，`idPrefix: "cerrda"`（会得到新 pluginId，如 `cerrda-3`）
   - `code.client` = `src/cerrda-theme-client.js` 的**全部内容**（该文件本身就是一个返回 Cordis Plugin 的 JS 函数体，可直接作为 `code.client` 传入）
   - `code.host` 不传（插件无 Host half）
2. **运行**：用返回的 `pluginId` + `packageId` 调 `cordis_run`（mode: `run`）。
   - Client 包首次运行需要授权；若会话 approval 策略为 `ask`，需在 GUI 中批准；若为 `never`，则需人工手动运行（`cordis_run` 由用户手动执行）或临时调整策略。

> 提示：若希望彻底免去每次重启后重建，可考虑把该客户端逻辑改写成部署级 web 插件（host 组合中的静态客户端插件），属结构性改造，需要时另行处理。

## 方案 B：bundle 插件（已落地，`dsh plugin add` 一键安装，免审批、开机自动加载）

把主题发布为 **bundle 包**（profile 层，与 `@deepseek-ai/dsh-base`、`@deepseek-ai/dsh-web-app`
同一机制）后，**每次 DSH 启动自动生效，进程重启不丢失，也不需要任何审批**。

**安装**（本机已装，用的本地 link）：

```bash
dsh plugin --profile web add dsh-cerrda-theme     # 已发布到 npm 后
dsh plugin --profile web add ./dsh-cerrda-theme   # 本地目录（当前状态）
```

`dsh plugin add` 会在 profile 目录跑 `pnpm add`，然后把本包（声明了
`dsh.bundle.patch`）自动追加进 `dsh.profile.bundles` 层栈。启动时 loader 应用本包
`cordis.patch.yml` 插入的插件行，裸包名以 profile 目录为基准解析（包在
`profiles/web/node_modules/`）。

**本机当前状态**：
- `%USERPROFILE%\.dsh\profiles\web\package.json` — `dependencies` 含 `dsh-cerrda-theme`（link 到本目录），`dsh.profile.bundles` 已追加 `dsh-cerrda-theme`。
- `%USERPROFILE%\.dsh\profiles\web\cordis.patch.yml` — 用户层已还原为 `[]`（插件行由 bundle 自己的 patch 提供）。

**改造差异**（相对动态版源码，见 `lib/client.js`）：
1. bundle 用 `window.__ModuleLoader__.load({ id: 'dsh-cerrda-theme', factory })` 注册，`require("react")` 取 React（静态插件没有动态运行时的 `React` 闭包符号）。
2. `styles.insert(CSS)` 改为手动注入 `<style data-plugin-css="dsh-cerrda-theme/css">`，dispose 时移除（静态插件没有 `styles` 全局）。
3. 其余逻辑（Silk WebGL2 / Liquid Glass / 全套 CSS / EffectsHost）逐字保留。

**生效条件**：web profile 的 HMR 已禁用，bundle 层只在启动时应用 —— 装完需要**重启 DSH 进程**。验证：`dsh --profile web --dump-config | Select-String dsh-cerrda-theme`，浏览器网络面板应出现 `/plugins/dsh-cerrda-theme/client.js`。

**卸载**：`dsh plugin --profile web remove dsh-cerrda-theme`，重启后恢复默认外观。

## 已知可调参数

- 侧边栏透明度：`src/cerrda-theme-client.js` 中 `TOKEN_OVERRIDES['--dsw-specific-sidebar-fill']`（第 19 行）与 CSS 重映射（第 296 行）的百分比。
- 侧边栏玻璃 blur：第 386-387 行 `blur(8px) saturate(1.25)`。
- hero 面板边缘 bloom 阴影：`[data-composer-seat] [class*='_composerHero']` 的 `box-shadow`（第 465-469 行），如需一并去掉可删除。
