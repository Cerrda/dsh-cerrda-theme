# Cerrda Theme — 分享给其他人

同一套主题有两种分享形态，按接收方想要的「安装方式」选择。

## 形态一：动态插件（简单，需一次审批）

**给谁用**：接收方只是临时用一下，或愿意在 GUI 里点一次授权。

**要分享的文件**：

- `src/cerrda-theme-client.js` — 完整 Client half 源码（1600+ 行，含 Silk / Liquid Glass / 全套 CSS）
- `docs/restore.md` — 恢复/安装说明

**接收方安装步骤**（让 agent 执行，或手动）：
1. `cordis_define`：`plugin.kind: "new"`、`idPrefix: "cerrda"`、`code.client` = `src/cerrda-theme-client.js` 全部内容（文件本身就是函数体）。
2. `cordis_run`：mode `run`，首次运行需在 GUI 批准一次。
3. 进程重启后插件丢失，需按同样步骤重建（动态插件的固有特性）。

## 形态二：bundle 插件（推荐，`dsh plugin add` 一键安装，免审批、开机自动加载）

**给谁用**：想让主题长期生效、进程重启后自动加载、完全不碰审批的用户。

**接收方安装步骤**：

已发布到 npm 的情况（一行命令）：

```bash
dsh plugin --profile web add dsh-cerrda-theme
```

未发布（把本包目录 `dsh-cerrda-theme` 拷贝给对方后，在包目录所在处执行）：

```bash
dsh plugin --profile web add ./dsh-cerrda-theme
```

然后**重启 DSH 进程**（web profile 的 HMR 已禁用，bundle 层只在启动时应用）。
重启后主题自动生效，无需任何审批，也不会因进程重启丢失。

卸载：

```bash
dsh plugin --profile web remove dsh-cerrda-theme
```

**验证**：`dsh --profile web --dump-config | Select-String dsh-cerrda-theme` 应能看到该行；
浏览器 DevTools 网络面板应出现 `/plugins/dsh-cerrda-theme/client.js`。

## 原理（bundle 包）

`dsh plugin add` = 在 profile 目录跑 `pnpm add <包>`，然后自动把「声明了
`dsh.bundle.patch` 的已装依赖」追加进 `dsh.profile.bundles` 层栈（见
`$DSH_HOME/profiles/web/package.json`）。启动时 loader 按层栈应用各 bundle 的
`cordis.patch.yml`，裸包名经 Node 内部 loader 以 profile 目录为基准解析（包落在
`profiles/web/node_modules/`）。

本包结构：

| 字段 | 作用 |
|---|---|
| `dsh.bundle.patch: ./cordis.patch.yml` | 成为 profile 层；`cordis.patch.yml` 插入插件行 `{id, name: 'dsh-cerrda-theme'}` |
| `dsh.client: { platform: "web" }` | 声明浏览器 half；`dsh-client-modules` 把它收进 `window.__DSH_BOOT__` 名录并服务 `/plugins/dsh-cerrda-theme/client.js` |
| `main: lib/index.js` | 空宿主 half（carrier 行）——让 loader 行激活，名录只收录已激活的行 |
| `exports["./client"]: lib/client.js` | 浏览器 bundle：`window.__ModuleLoader__.load({id, factory})` 注册，`require("react")` 取 React，CSS 以 `data-plugin-css` 风格 style 标签注入 |
