# Cerrda 主题插件实现方案

## 目标
DSH Web GUI 暗色主题，完整复刻 cerrda 站点设计语言（rose/purple oklch 体系）。

## 设计令牌（cerrda 原版）
| cerrda token | oklch 值 |
|---|---|
| --background | oklch(0.14 0.015 280) |
| --foreground | oklch(0.97 0.01 350) |
| --card | oklch(0.18 0.02 280) |
| --primary | oklch(0.82 0.1 350)（玫瑰粉） |
| --muted-fg | oklch(0.72 0.02 280) |
| --border | oklch(0.28 0.02 280) |
| --ring | oklch(0.7 0.1 350) |
| 字体 | Sora / Fraunces / JetBrains Mono |
| 背景 | 固定径向渐变：左上 hero-tint + 右上 bloom-warm |

## Glass 策略
- **Liquid Glass（SVG 位移滤镜，重）**：仅 `[data-composer-card]`（输入栏，最高频 UI）
- **CSS 液态玻璃（frost+chrome，轻）**：侧边栏、会话头部、详情列、工具卡片、菜单/弹层/tooltip
- **性能兜底**：`prefers-reduced-transparency` 时全部降级为实色

## DOM 锚点（已验证，非 hash 稳定）
- `[data-slot="root"] > div` — AppFrame
- `[data-slot="conversation"] > div` — ConversationRoot
- `[data-slot="sidebar"] > div` — 侧边栏列；`div:has(> [data-slot="sidebar"])` — 列包装
- `[data-slot="details"] > div` — 详情列
- `[data-slot="conversation.session.header"] > div` — 会话头部
- `[data-composer-card]` — 输入栏卡片（Liquid Glass 目标）
- `[data-tool]` — 工具调用卡片
- `[role="menu"]/[role="listbox"]/[role="dialog"]/[role="tooltip"]` — 浮层

## 实现
1. `theme.overrideTokens` 覆盖 13 个可查询 token（light/dark 均给暗色值）
2. `styles.insert` 全局 CSS：静态/别名 token 全量重映射 + 结构视觉
3. `shell.overlay` 槽注册 React 组件渲染 SVG 液态玻璃滤镜（ResizeObserver 跟踪 composer 尺寸）
