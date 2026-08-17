# dsh-cerrda-theme

DSH（DeepSeek Harness）Web GUI 的 cerrda 暗色主题——以部署级静态 web 插件发布，
**免审批、进程重启后自动加载**。

- rose/purple oklch 配色体系、Sora / Fraunces / JetBrains Mono 字体
- Liquid Glass 输入栏 / hero 面板 / 回到底部按钮（SVG 位移滤镜）
- Silk WebGL2 动态背景、CardSpotlight、Ripple、ShimmerBorder
- CSS 液态玻璃：侧边栏、详情列、会话头部、工具卡片、浮层

## 安装

在 DSH 环境里执行（需要 `pnpm` 在 PATH 上）：

```bash
dsh plugin --profile web add dsh-cerrda-theme
```

然后**重启 DSH 进程**（web profile 的 HMR 已禁用，bundle 层只在启动时应用）。
重启后主题自动生效，无需任何审批。

本地未发布版本（本仓库根目录就是包，在仓库根执行）：

```bash
dsh plugin --profile web add .
```

## 卸载

```bash
dsh plugin --profile web remove dsh-cerrda-theme
```

重启后即恢复默认外观。

## 验证

```bash
dsh --profile web --dump-config | grep dsh-cerrda-theme
```

浏览器 DevTools 网络面板应出现 `/plugins/dsh-cerrda-theme/client.js`。

## 工作原理

本包是一个 **bundle 包**（profile 层），与 `@deepseek-ai/dsh-base`、
`@deepseek-ai/dsh-web-app` 同一机制：

| 字段 | 作用 |
|---|---|
| `dsh.bundle.patch: ./cordis.patch.yml` | `dsh plugin add` 后自动把本包追加进 `dsh.profile.bundles` 层栈，`cordis.patch.yml` 在启动时参与组合 |
| `dsh.client: { platform: "web" }` | 声明浏览器 half，`dsh-client-modules` 把它收进 `window.__DSH_BOOT__` 名录，服务 `/plugins/dsh-cerrda-theme/client.js` |
| `main: lib/index.js` | 空宿主 half（carrier 行）——让 loader 行激活，名录只收录已激活的行 |
| `exports["./client"]: lib/client.js` | 浏览器 bundle：`window.__ModuleLoader__.load({id, factory})` 注册，`require("react")` 取 React，CSS 以 `data-plugin-css` 风格 style 标签注入 |

## 开发

- `src/cerrda-theme-client.js` —— 动态插件版原始 Client half 源码（单一事实来源）。
- `lib/client.js` —— 静态 bundle，由 `src/` 经固定变换生成（包一层 `__ModuleLoader__.load`、
  `require("react")`、手动 CSS 注入、末尾 `return` 改为 `module.exports`）。
  变更源码后需重新生成 `lib/client.js`。
- `docs/` —— 设计（plan）、动态恢复说明（restore）、分享说明（share）。

## 发布

```bash
npm publish
```

## License

MIT
