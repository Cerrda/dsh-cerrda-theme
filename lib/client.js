window.__ModuleLoader__.load({
	id: "dsh-cerrda-theme",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let React = require("react");
// Cerrda theme for DSH — Client half (plain JavaScript, no JSX/TS).
// Faithful dark re-theme of the DeepSeek Harness Web GUI in the cerrda
// design language (rose-on-deep-purple oklch, Sora/Fraunces/JetBrains Mono,
// Liquid Glass composer + CSS glass surfaces).

const TOKEN_OVERRIDES = {
  '--dsw-alias-bg-base': { light: 'oklch(0.14 0.015 280)', dark: 'oklch(0.14 0.015 280)' },
  '--dsw-alias-bg-layer-1': { light: 'oklch(0.18 0.02 280)', dark: 'oklch(0.18 0.02 280)' },
  '--dsw-alias-bg-layer-2': { light: 'oklch(0.215 0.022 280)', dark: 'oklch(0.215 0.022 280)' },
  '--dsw-alias-bg-overlay': { light: 'oklch(0.25 0.024 280)', dark: 'oklch(0.25 0.024 280)' },
  '--dsw-alias-border-l1': { light: 'color-mix(in oklch, oklch(0.97 0.01 350) 9%, transparent)', dark: 'color-mix(in oklch, oklch(0.97 0.01 350) 9%, transparent)' },
  '--dsw-alias-border-l2': { light: 'color-mix(in oklch, oklch(0.97 0.01 350) 15%, transparent)', dark: 'color-mix(in oklch, oklch(0.97 0.01 350) 15%, transparent)' },
  '--dsw-alias-brand-primary': { light: 'oklch(0.82 0.1 350)', dark: 'oklch(0.82 0.1 350)' },
  '--dsw-alias-label-primary': { light: 'oklch(0.97 0.01 350)', dark: 'oklch(0.97 0.01 350)' },
  '--dsw-alias-label-secondary': { light: 'oklch(0.73 0.02 285)', dark: 'oklch(0.73 0.02 285)' },
  '--dsw-alias-state-error-primary': { light: 'oklch(0.637 0.237 25.331)', dark: 'oklch(0.637 0.237 25.331)' },
  '--dsw-alias-state-success-primary': { light: 'oklch(0.72 0.19 150)', dark: 'oklch(0.72 0.19 150)' },
  '--dsw-alias-state-warn-primary': { light: 'oklch(0.8 0.15 80)', dark: 'oklch(0.8 0.15 80)' },
  '--dsw-specific-sidebar-fill': { light: 'color-mix(in oklch, oklch(0.14 0.015 280) 12%, transparent)', dark: 'color-mix(in oklch, oklch(0.14 0.015 280) 12%, transparent)' },
};

// ---- Liquid Glass (SVG displacement, composer + back-to-bottom) -------------
function makeDisplacementMap(w, h, radius) {
  const border = Math.min(w, h) * 0.175; // border factor 0.35 * 0.5
  const outerRx = Math.min(radius, w / 2, h / 2);
  const innerRx = Math.max(0, outerRx - border);
  const innerW = Math.max(0, w - border * 2);
  const innerH = Math.max(0, h - border * 2);
  const svg =
    '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
    '<linearGradient id="r" x1="100%" y1="0%" x2="0%" y2="0%">' +
    '<stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="red"/></linearGradient>' +
    '<linearGradient id="b" x1="0%" y1="0%" x2="0%" y2="100%">' +
    '<stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="blue"/></linearGradient>' +
    '</defs>' +
    '<rect x="0" y="0" width="' + w + '" height="' + h + '" fill="black"/>' +
    '<rect x="0" y="0" width="' + w + '" height="' + h + '" rx="' + outerRx + '" fill="url(#r)"/>' +
    '<rect x="0" y="0" width="' + w + '" height="' + h + '" rx="' + outerRx + '" fill="url(#b)" style="mix-blend-mode:difference"/>' +
    '<rect x="' + border + '" y="' + border + '" width="' + innerW + '" height="' + innerH + '" rx="' + innerRx + '" fill="hsl(0 0% 50% / 0.93)" style="filter:blur(11px)"/>' +
    '</svg>';
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

function buildLiquidFilter(filterId, map) {
  // 滤镜元素必须始终存在：backdrop-filter 引用缺失的 url(#id) 会渲染成不透明黑块。
  // map 未就绪时用 1x1 黑色位移图占位，避免黑块。
  const EMPTY_MAP = 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><rect width="1" height="1" fill="black"/></svg>'
  );
  return React.createElement('filter', {
    id: filterId,
    colorInterpolationFilters: 'sRGB',
    x: '-10%', y: '-10%', width: '120%', height: '120%',
  },
    React.createElement('feImage', { x: 0, y: 0, width: '100%', height: '100%', preserveAspectRatio: 'none', href: map || EMPTY_MAP, result: 'map' }),
    React.createElement('feDisplacementMap', { in: 'SourceGraphic', in2: 'map', xChannelSelector: 'R', yChannelSelector: 'B', scale: -80, result: 'dispRed' }),
    React.createElement('feColorMatrix', { in: 'dispRed', type: 'matrix', values: '1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0', result: 'red' }),
    React.createElement('feDisplacementMap', { in: 'SourceGraphic', in2: 'map', xChannelSelector: 'R', yChannelSelector: 'B', scale: -78, result: 'dispGreen' }),
    React.createElement('feColorMatrix', { in: 'dispGreen', type: 'matrix', values: '0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0', result: 'green' }),
    React.createElement('feDisplacementMap', { in: 'SourceGraphic', in2: 'map', xChannelSelector: 'R', yChannelSelector: 'B', scale: -76, result: 'dispBlue' }),
    React.createElement('feColorMatrix', { in: 'dispBlue', type: 'matrix', values: '0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0', result: 'blue' }),
    React.createElement('feBlend', { in: 'red', in2: 'green', mode: 'screen', result: 'rg' }),
    React.createElement('feBlend', { in: 'rg', in2: 'blue', mode: 'screen' })
  );
}

function LiquidGlassProvider() {
  const [map, setMap] = React.useState('');
  const [miniMap, setMiniMap] = React.useState('');
  const dims = React.useRef({ w: 0, h: 0 });
  const miniDims = React.useRef({ w: 0, h: 0 });
  React.useEffect(() => {
    let ro = null;
    let mo = null;
    let raf = 0;
    let timer = 0;
    const apply = (el, ref, setter, radius) => {
      const rect = el.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w > 0 && h > 0 && (w !== ref.current.w || h !== ref.current.h)) {
        ref.current = { w, h };
        setter(makeDisplacementMap(w, h, radius));
      }
    };
    const update = () => {
      const card = document.querySelector('[data-composer-card]');
      if (card) apply(card, dims, setMap, 22);
      const btn = document.querySelector('[class*="_toBottom"]:not([class*="_toBottomSlot"])');
      if (btn) apply(btn, miniDims, setMiniMap, 17);
    };
    const probe = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const card = document.querySelector('[data-composer-card]');
        if (card && !ro) {
          try { ro = new ResizeObserver(update); ro.observe(card); } catch (e) { /* noop */ }
        }
        update();
      });
    };
    try {
      mo = new MutationObserver(probe);
      mo.observe(document.body, { childList: true, subtree: true });
    } catch (e) { /* noop */ }
    probe();
    timer = window.setInterval(probe, 2000);
    return () => {
      if (ro) ro.disconnect();
      if (mo) mo.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
      window.clearInterval(timer);
    };
  }, []);
  return React.createElement('svg', {
    width: 0,
    height: 0,
    'aria-hidden': true,
    style: { position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' },
  }, React.createElement('defs', null,
    buildLiquidFilter('cerrda-liquid-glass', map),
    buildLiquidFilter('cerrda-liquid-glass-mini', miniMap)
  ));
}

// ---- CSS -------------------------------------------------------------------
const CSS = String.raw`
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Sora:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root,
body {
  --cerrda-bg: oklch(0.14 0.015 280);
  --cerrda-bg-deep: oklch(0.115 0.015 280);
  --cerrda-layer-1: oklch(0.18 0.02 280);
  --cerrda-layer-2: oklch(0.215 0.022 280);
  --cerrda-layer-3: oklch(0.25 0.024 280);
  --cerrda-fg: oklch(0.97 0.01 350);
  --cerrda-fg-muted: oklch(0.73 0.02 285);
  --cerrda-fg-dim: oklch(0.56 0.02 285);
  --cerrda-fg-caption: oklch(0.49 0.02 285);
  --cerrda-primary: oklch(0.82 0.1 350);
  --cerrda-primary-bright: oklch(0.88 0.1 350);
  --cerrda-primary-fg: oklch(0.18 0.02 280);
  --cerrda-error: oklch(0.637 0.237 25.331);
  --cerrda-success: oklch(0.72 0.19 150);
  --cerrda-warn: oklch(0.8 0.15 80);
  --cerrda-shadow-bloom: oklch(0 0 0 / 0.35);
  --cerrda-hero-tint: oklch(0.42 0.09 350 / 0.32);
  --cerrda-bloom-warm: oklch(0.5 0.11 350 / 0.22);
}

html {
  color-scheme: dark;
  background-color: var(--cerrda-bg-deep);
}

/* ---------- token re-mapping (applies in both schemes; dark is forced) ---------- */
body,
body[data-ds-dark-theme] {
  --dsw-font-family: 'Sora', 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  --ds-font-family-code: 'JetBrains Mono', 'SF Mono', 'Fira Code', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  --dsw-font-markdown-h1: 700 24px/34px 'Fraunces', var(--dsw-font-family);
  --dsw-font-markdown-h2: 700 20px/30px 'Fraunces', var(--dsw-font-family);
  --dsw-font-markdown-h3: 700 17px/28px 'Fraunces', var(--dsw-font-family);
  --dsw-font-markdown-h1-font-family: 'Fraunces', var(--dsw-font-family);
  --dsw-font-markdown-h2-font-family: 'Fraunces', var(--dsw-font-family);
  --dsw-font-markdown-h3-font-family: 'Fraunces', var(--dsw-font-family);

  --dsw-static-neutral-bluish-00: oklch(1 0 0);
  --dsw-static-neutral-bluish-50: oklch(0.95 0.01 350);
  --dsw-static-neutral-bluish-60: oklch(0.94 0.012 350);
  --dsw-static-neutral-bluish-75: oklch(0.92 0.014 350);
  --dsw-static-neutral-bluish-100: oklch(0.9 0.015 350);
  --dsw-static-neutral-bluish-150: oklch(0.87 0.018 350);
  --dsw-static-neutral-bluish-200: oklch(0.82 0.02 285);
  --dsw-static-neutral-bluish-300: oklch(0.74 0.02 285);
  --dsw-static-neutral-bluish-400: oklch(0.66 0.02 285);
  --dsw-static-neutral-bluish-500: oklch(0.56 0.02 285);
  --dsw-static-neutral-bluish-550: oklch(0.5 0.02 285);
  --dsw-static-neutral-bluish-600: oklch(0.42 0.02 285);
  --dsw-static-neutral-bluish-700: oklch(0.3 0.026 280);
  --dsw-static-neutral-bluish-750: oklch(0.26 0.024 280);
  --dsw-static-neutral-bluish-800: oklch(0.22 0.022 280);
  --dsw-static-neutral-bluish-850: oklch(0.19 0.02 280);
  --dsw-static-neutral-bluish-875: oklch(0.17 0.02 280);
  --dsw-static-neutral-bluish-900: oklch(0.155 0.018 280);
  --dsw-static-neutral-bluish-950: oklch(0.14 0.015 280);
  --dsw-static-neutral-bluish-1000: oklch(0.115 0.015 280);
  --dsw-static-deepseek-50: oklch(0.3 0.06 350);
  --dsw-static-deepseek-100: oklch(0.36 0.07 350);
  --dsw-static-deepseek-200: oklch(0.45 0.09 350);
  --dsw-static-deepseek-300: oklch(0.58 0.11 350);
  --dsw-static-deepseek-400: oklch(0.7 0.12 350);
  --dsw-static-deepseek-450: oklch(0.76 0.115 350);
  --dsw-static-deepseek-500: oklch(0.82 0.1 350);
  --dsw-static-deepseek-600: oklch(0.62 0.1 350);
  --dsw-static-deepseek-800: oklch(0.3 0.05 350);
  --dsw-static-deepseek-900: oklch(0.24 0.04 350);
  --dsw-static-blue-50: oklch(0.3 0.06 350);
  --dsw-static-blue-75: oklch(0.34 0.065 350);
  --dsw-static-blue-100: oklch(0.38 0.07 350);
  --dsw-static-blue-300: oklch(0.6 0.11 350);
  --dsw-static-blue-400: oklch(0.7 0.12 350);
  --dsw-static-blue-450: oklch(0.76 0.115 350);
  --dsw-static-blue-500: oklch(0.82 0.1 350);
  --dsw-static-blue-600: oklch(0.6 0.1 350);
  --dsw-static-blue-800: oklch(0.3 0.05 350);
  --dsw-static-blue-900: oklch(0.24 0.04 350);
  --dsw-static-blue-950: oklch(0.2 0.035 350);

  --dsw-alias-bg-base: var(--cerrda-bg);
  --dsw-alias-bg-layer-1: var(--cerrda-layer-1);
  --dsw-alias-bg-layer-2: var(--cerrda-layer-2);
  --dsw-alias-bg-layer-3: var(--cerrda-layer-3);
  --dsw-alias-bg-mask-1: rgba(6 4 10 / 0.55);
  --dsw-alias-bg-mask-2: rgba(6 4 10 / 0.32);
  --dsw-alias-bg-mask-3: rgba(6 4 10 / 0.6);
  --dsw-alias-bg-mask-photo: rgba(6 4 10 / 0.88);
  --dsw-alias-bg-mask-drop: rgba(12 9 16 / 0.7);
  --dsw-alias-bg-module-platform: var(--cerrda-layer-1);
  --dsw-alias-bg-multi-select: var(--cerrda-layer-2);
  --dsw-alias-bg-skeleton: rgba(255 255 255 / 0.07);
  --dsw-alias-border-inverted2: rgba(255 255 255 / 0.09);
  --dsw-alias-border-inverted: rgba(255 255 255 / 0.07);
  --dsw-alias-border-l1: color-mix(in oklch, var(--cerrda-fg) 9%, transparent);
  --dsw-alias-border-l2-darkmode-thin: color-mix(in oklch, var(--cerrda-fg) 10%, transparent);
  --dsw-alias-border-l2: color-mix(in oklch, var(--cerrda-fg) 15%, transparent);
  --dsw-alias-border-l3: color-mix(in oklch, var(--cerrda-fg) 20%, transparent);
  --dsw-alias-border-l4: color-mix(in oklch, var(--cerrda-fg) 26%, transparent);
  --dsw-alias-brand-primary-invert: var(--cerrda-bg-deep);
  --dsw-alias-brand-primary-new-colorprimary-new-color: var(--cerrda-primary);
  --dsw-alias-brand-primary: var(--cerrda-primary);
  --dsw-alias-brand-text: var(--cerrda-fg);
  --dsw-alias-button-contrast-fill: var(--cerrda-fg);
  --dsw-alias-button-elevated-fill: var(--cerrda-layer-1);
  --dsw-alias-button-floating-fill: color-mix(in oklch, var(--cerrda-layer-2) 92%, transparent);
  --dsw-alias-button-floating-hover: var(--cerrda-layer-3);
  --dsw-alias-button-ghost-active-border: color-mix(in oklch, var(--cerrda-primary) 45%, transparent);
  --dsw-alias-button-ghost-active-fill: color-mix(in oklch, var(--cerrda-primary) 14%, transparent);
  --dsw-alias-button-ghost-active-hover: color-mix(in oklch, var(--cerrda-primary) 20%, transparent);
  --dsw-alias-button-info-fill: var(--cerrda-primary);
  --dsw-alias-button-info-hover: var(--cerrda-primary-bright);
  --dsw-alias-button-primary-dimmed: color-mix(in oklch, var(--cerrda-primary) 32%, var(--cerrda-layer-1));
  --dsw-alias-button-primary-fill: var(--cerrda-primary);
  --dsw-alias-button-primary-hover: var(--cerrda-primary-bright);
  --dsw-alias-button-tool-bar-fill-invisible: rgba(255 255 255 / 0.04);
  --dsw-alias-button-tool-bar-fill: rgba(255 255 255 / 0.06);
  --dsw-alias-button-tool-bar-hover: rgba(255 255 255 / 0.12);
  --dsw-alias-interactive-bg-active: color-mix(in oklch, var(--cerrda-primary) 16%, transparent);
  --dsw-alias-interactive-bg-hover-accent: color-mix(in oklch, var(--cerrda-primary) 13%, transparent);
  --dsw-alias-interactive-bg-hover-danger: color-mix(in oklch, var(--cerrda-error) 16%, transparent);
  --dsw-alias-interactive-bg-hover-solid: var(--cerrda-layer-3);
  --dsw-alias-interactive-bg-hover: rgba(255 255 255 / 0.07);
  --dsw-alias-label-caption: var(--cerrda-fg-caption);
  --dsw-alias-label-dimmed: var(--cerrda-fg-dim);
  --dsw-alias-label-primary-bluish: var(--cerrda-fg);
  --dsw-alias-label-primary-dimmed: color-mix(in oklch, var(--cerrda-fg) 82%, transparent);
  --dsw-alias-label-primary-foreground: var(--cerrda-primary-fg);
  --dsw-alias-label-primary-inverted: var(--cerrda-bg-deep);
  --dsw-alias-label-primary: var(--cerrda-fg);
  --dsw-alias-label-secondary: var(--cerrda-fg-muted);
  --dsw-alias-label-tertiary: var(--cerrda-fg-dim);
  --dsw-alias-markdown-citation: var(--cerrda-layer-2);
  --dsw-alias-markdown-code-block-banner: color-mix(in oklch, var(--cerrda-bg) 94%, black);
  --dsw-alias-markdown-code-block: color-mix(in oklch, var(--cerrda-bg) 92%, black);
  --dsw-alias-markdown-code-segment-selected: var(--cerrda-layer-2);
  --dsw-alias-markdown-code-segment-unselected: color-mix(in oklch, var(--cerrda-bg) 90%, black);
  --dsw-alias-markdown-inline-code: color-mix(in oklch, var(--cerrda-layer-1) 92%, transparent);
  --dsw-alias-markdown-placeholder: var(--cerrda-layer-2);
  --dsw-alias-markdown-tag: color-mix(in oklch, var(--cerrda-primary) 12%, transparent);
  --dsw-alias-scrollbar-bg-l1: color-mix(in oklch, var(--cerrda-fg) 14%, transparent);
  --dsw-alias-scrollbar-bg-l2: color-mix(in oklch, var(--cerrda-fg) 20%, transparent);
  --dsw-alias-scrollbar-hover-l1: color-mix(in oklch, var(--cerrda-primary) 42%, transparent);
  --dsw-alias-scrollbar-hover-l2: color-mix(in oklch, var(--cerrda-primary) 50%, transparent);
  --dsw-alias-state-business-primary: var(--cerrda-primary);
  --dsw-alias-state-business-tertiary: color-mix(in oklch, var(--cerrda-primary) 14%, transparent);
  --dsw-alias-state-error-primary: var(--cerrda-error);
  --dsw-alias-state-error-secondary: oklch(0.72 0.2 25);
  --dsw-alias-state-success-primary: var(--cerrda-success);
  --dsw-alias-state-success-secondary: oklch(0.78 0.15 150);
  --dsw-alias-state-success-tertiary: color-mix(in oklch, var(--cerrda-success) 14%, transparent);
  --dsw-alias-state-warn-label: oklch(0.84 0.13 80);
  --dsw-alias-state-warn-primary: var(--cerrda-warn);
  --dsw-alias-state-warn-secondary: oklch(0.86 0.11 80);
  --dsw-alias-state-warn-tertiary: color-mix(in oklch, var(--cerrda-warn) 13%, transparent);
  --dsw-alias-toast-bg: var(--cerrda-layer-3);
  --dsw-alias-tooltip-bg: var(--cerrda-layer-3);
  --dsw-specific-bubble-highlight: var(--cerrda-layer-2);
  --dsw-specific-bubble: var(--cerrda-layer-1);
  --dsw-specific-input-major: color-mix(in oklch, var(--cerrda-layer-1) 78%, transparent);
  --dsw-specific-login-input: var(--cerrda-layer-1);
  --dsw-specific-menu: color-mix(in oklch, var(--cerrda-layer-2) 88%, transparent);
  --dsw-specific-selector: var(--cerrda-layer-2);
  --dsw-specific-sidebar-fill: color-mix(in oklch, var(--cerrda-bg) 12%, transparent);
  --dsw-specific-sidebar-nav-item-active-accent: color-mix(in oklch, var(--cerrda-primary) 16%, transparent);
  --dsw-specific-sidebar-nav-item-active: color-mix(in oklch, var(--cerrda-primary) 11%, transparent);
  --dsw-specific-sidebar-nav-item-hover: rgba(255 255 255 / 0.06);
  --dsw-specific-tip: color-mix(in oklch, var(--cerrda-layer-2) 82%, transparent);
  --dsw-linear-gradient-think: linear-gradient(180deg, color-mix(in oklch, var(--cerrda-bg) 96%, black) 20%, transparent 100%);
  --dsw-linear-think-select: linear-gradient(180deg, var(--cerrda-layer-2) 20%, transparent 100%);
  --dsw-shadow-lv1: 0 2px 4px rgba(0 0 0 / 0.25);
  --dsw-shadow-lv1-blur: 0 4px 12px rgba(0 0 0 / 0.18);
  --dsw-shadow-lv2: 0 4px 12px rgba(0 0 0 / 0.22), 0 2px 8px rgba(0 0 0 / 0.18);
  --dsw-shadow-lv3: 0 0 1px rgba(0 0 0 / 0.3), 0 4px 16px rgba(0 0 0 / 0.25), 0 12px 32px rgba(0 0 0 / 0.35);
  --dsw-mask-blur: blur(10px);
}

/* ---------- page background: cerrda fixed radial gradients ---------- */
body {
  background: transparent !important;
  color: var(--cerrda-fg);
  color-scheme: dark;
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-color: var(--cerrda-bg);
  background-image:
    radial-gradient(ellipse 72% 50% at 8% -10%, var(--cerrda-hero-tint), transparent 58%),
    radial-gradient(ellipse 50% 38% at 96% -2%, var(--cerrda-bloom-warm), transparent 52%);
}

::selection {
  background: color-mix(in oklch, var(--cerrda-primary) 32%, transparent);
}

body :focus-visible {
  outline-color: color-mix(in oklch, var(--cerrda-primary) 60%, transparent) !important;
}

/* ---------- frame & columns: transparent over the gradient ---------- */
[data-slot='root'] > div {
  background: transparent !important;
}

[data-slot='conversation'] > div {
  background: transparent !important;
}

/* composer 座位默认带 bg-base 渐变（底部渐变为不透明深紫），
   在无会话首页会形成一块不透明黑块 —— 全部透明化，让 silk 透出 */
[data-composer-seat] {
  background: transparent !important;
}

/* composer 栈 / hero 容器：强制透明，杜绝残留黑底 */
[data-composer-seat] [class*='_composerStack'],
[data-composer-seat] [class*='_composerHero'] {
  background: transparent !important;
}

div:has(> [data-slot='sidebar']) {
  background: transparent !important;
  border-right-color: color-mix(in oklch, var(--cerrda-fg) 8%, transparent) !important;
}

div:has(> [data-slot='details']) {
  background: transparent !important;
  border-left-color: color-mix(in oklch, var(--cerrda-fg) 8%, transparent) !important;
}

/* ---------- CSS liquid glass: sidebar（伪元素方案：轻 blur、无包含块，
   不截断内部 fixed 弹层如设置弹窗 / Cordis 面板）
   注意：父元素必须 position:relative + isolation:isolate，
   ::before z-index:-1 才会在父背景之上、内容之下渲染（否则会被吞掉）。 */
[data-slot='sidebar'] > div {
  position: relative;
  isolation: isolate;
  background: transparent !important;
  box-shadow: inset -1px 0 0 color-mix(in oklch, var(--cerrda-fg) 7%, transparent);
}

[data-slot='sidebar'] > div::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: color-mix(in oklch, var(--cerrda-bg) 8%, transparent);
  -webkit-backdrop-filter: blur(8px) saturate(1.25);
  backdrop-filter: blur(8px) saturate(1.25);
}

/* ---------- CSS liquid glass: details column ---------- */
[data-slot='details'] > div {
  position: relative;
  isolation: isolate;
  background: transparent !important;
}

[data-slot='details'] > div::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: color-mix(in oklch, var(--cerrda-bg) 34%, transparent);
  -webkit-backdrop-filter: blur(14px) saturate(1.3);
  backdrop-filter: blur(14px) saturate(1.3);
}

/* ---------- CSS liquid glass: session header（与侧边栏一致的 glass 和样式） ---------- */
[data-slot='conversation.session.header'] > div {
  position: relative;
  isolation: isolate;
  background: transparent !important;
}

[data-slot='conversation.session.header'] > div::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: color-mix(in oklch, var(--cerrda-bg) 28%, transparent);
  -webkit-backdrop-filter: blur(14px) saturate(1.3);
  backdrop-filter: blur(14px) saturate(1.3);
}

/* 头部底部分隔线与侧边栏边缘同色 */
[data-slot='conversation.session.header'] > div::after {
  background: color-mix(in oklch, var(--cerrda-fg) 7%, transparent) !important;
}

/* ---------- CSS liquid glass: hero workspace picker ---------- */
[data-slot='conversation.hero.workspace'] > div {
  position: relative;
  isolation: isolate;
  background: transparent !important;
}

[data-slot='conversation.hero.workspace'] > div::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: color-mix(in oklch, var(--cerrda-layer-1) 30%, transparent);
  -webkit-backdrop-filter: blur(10px) saturate(1.25);
  backdrop-filter: blur(10px) saturate(1.25);
}

/* hero 模式：composerHero 变成与输入框同款的 Liquid Glass 面板
   （SVG 位移滤镜 + 磨砂 + chrome 高光），composerStack 保持透明 + 四周 24px 留白 */
[data-phase='hero'] [data-composer-seat] [class*='_composerStack'] {
  padding: 24px !important;
  background: transparent !important;
}

[data-composer-seat] [class*='_composerHero'] {
  padding: 24px !important;
  background: color-mix(in oklch, var(--cerrda-layer-1) 24%, transparent) !important;
  -webkit-backdrop-filter: blur(26px) saturate(1.6);
  backdrop-filter: blur(26px) saturate(1.6);
  -webkit-backdrop-filter: url(#cerrda-liquid-glass);
  backdrop-filter: url(#cerrda-liquid-glass);
  border: 1px solid color-mix(in oklch, var(--cerrda-fg) 9%, transparent) !important;
  border-radius: 24px !important;
  box-shadow:
    inset 0 0 2px 1px color-mix(in oklch, var(--cerrda-fg) 9%, transparent),
    inset 0 0 12px 4px color-mix(in oklch, var(--cerrda-fg) 5%, transparent),
    0 4px 16px var(--cerrda-shadow-bloom),
    0 10px 28px var(--cerrda-shadow-bloom) !important;
}

/* hero 区域内部发散的光晕：HeroGlow SVG（蓝色模糊椭圆，wSkVaW_heroGlow）
   渲染在 composerStack/composerHero 内部 —— 直接隐藏 */
[data-composer-seat] [class*='_heroGlow'] {
  display: none !important;
}

/* hero 模式下的输入卡片：完全无背景（不要背景），只留细描边，silk 彻底透出 */
[data-phase='hero'] [data-composer-card] {
  background: transparent !important;
  -webkit-backdrop-filter: none !important;
  backdrop-filter: none !important;
  border-color: color-mix(in oklch, var(--cerrda-fg) 8%, transparent) !important;
  box-shadow: none !important;
}

/* ---------- LIQUID GLASS (SVG displacement): composer only ----------
   Progressive enhancement: the plain blur is declared first, then the SVG
   filter reference overrides it in engines that support it (Chromium);
   engines that reject the url() value keep the earlier blur(). */
[data-composer-card] {
  background: color-mix(in oklch, var(--cerrda-layer-1) 24%, transparent) !important;
  -webkit-backdrop-filter: blur(26px) saturate(1.6);
  backdrop-filter: blur(26px) saturate(1.6);
  -webkit-backdrop-filter: url(#cerrda-liquid-glass);
  backdrop-filter: url(#cerrda-liquid-glass);
  border: 1px solid color-mix(in oklch, var(--cerrda-fg) 9%, transparent) !important;
  box-shadow:
    inset 0 0 2px 1px color-mix(in oklch, var(--cerrda-fg) 9%, transparent),
    inset 0 0 12px 4px color-mix(in oklch, var(--cerrda-fg) 5%, transparent),
    0 4px 16px var(--cerrda-shadow-bloom),
    0 10px 28px var(--cerrda-shadow-bloom) !important;
}

/* ---------- CSS liquid glass: tool call cards（cerrda CssLiquidGlass 加强版：
   frost 磨砂 + chrome 强高光/内折射 + specular 斜光 + double border + 内 rim） ---------- */
[data-tool] {
  border-radius: 16px !important;
  overflow: hidden;
  background-color: color-mix(in oklch, var(--cerrda-layer-1) 58%, transparent) !important;
  background-image:
    linear-gradient(45deg, rgba(255 255 255 / 0.07) 0%, transparent 30%, transparent 70%, rgba(255 255 255 / 0.07) 100%) !important;
  -webkit-backdrop-filter: blur(8px) saturate(1.5);
  backdrop-filter: blur(8px) saturate(1.5);
  border: 1px double rgba(255 255 255 / 0.1) !important;
  box-shadow:
    inset 3px -3px 1px -1px rgba(255 255 255 / 0.14),
    inset -3px 3px 1px -1px rgba(255 255 255 / 0.14),
    inset 8px -8px 1px -8px rgba(255 255 255 / 0.07),
    inset -8px 8px 1px -8px rgba(255 255 255 / 0.07),
    inset 0 0 3px rgba(0 0 0 / 0.45),
    inset 0 0 0 1px rgba(255 255 255 / 0.05),
    0 8px 22px -14px var(--cerrda-shadow-bloom) !important;
}

/* 内 rim：贴近边缘的细亮框，增强玻璃折射感 */
[data-tool]::after {
  content: '';
  position: absolute;
  inset: 5px;
  z-index: 0;
  border: 1px solid rgba(255 255 255 / 0.06);
  border-radius: inherit;
  filter: blur(1px);
  pointer-events: none;
}

[data-tool][data-state='error'] {
  background-color: color-mix(in oklch, var(--cerrda-error) 10%, color-mix(in oklch, var(--cerrda-layer-1) 60%, transparent)) !important;
}

/* ---------- CSS liquid glass: overlays ---------- */
[role='menu'],
[role='listbox'],
[role='dialog'],
[role='tooltip'] {
  -webkit-backdrop-filter: blur(26px) saturate(1.45);
  backdrop-filter: blur(26px) saturate(1.45);
}

[role='menu'],
[role='listbox'] {
  background: color-mix(in oklch, var(--cerrda-layer-2) 86%, transparent) !important;
}

[role='dialog'] {
  background: color-mix(in oklch, var(--cerrda-layer-2) 90%, transparent) !important;
}

/* Tooltip 气泡：primitives 的 Tooltip CSS 是空 stub，气泡 span 没有定位，
   会作为行内元素插入操作行把复制按钮挤动 —— 强制 fixed + 置顶 + cerrda 玻璃胶囊。
   默认 opacity:0，由 EffectsHost 在定位（内联 left/top）就绪后打 data-cerrda-show 淡入，
   消除"先出现在右边、再跳到复制按钮下方"的闪现。 */
[role='tooltip'] {
  position: fixed !important;
  z-index: 1000;
  opacity: 0;
  border-radius: 999px !important;
  padding: 5px 12px !important;
  font-size: 12px;
  line-height: 16px;
  max-width: 260px;
  background: color-mix(in oklch, var(--cerrda-layer-3) 92%, transparent) !important;
  -webkit-backdrop-filter: blur(26px) saturate(1.45);
  backdrop-filter: blur(26px) saturate(1.45);
  border: 1px solid color-mix(in oklch, var(--cerrda-fg) 10%, transparent) !important;
  box-shadow: 0 8px 24px -8px var(--cerrda-shadow-bloom) !important;
}

/* ---------- accents ---------- */
[data-state='done'] {
  color: var(--cerrda-success);
}

[data-state='warning'] {
  color: var(--cerrda-warn);
}

[data-state='error'] {
  color: var(--cerrda-error);
}

/* ---------- accessibility: reduce transparency ---------- */
@media (prefers-reduced-transparency: reduce) {
  [data-composer-card],
  [data-tool],
  [data-slot='sidebar'] > div,
  [data-slot='details'] > div,
  [data-slot='conversation.session.header'] > div,
  [data-slot='conversation.hero.workspace'] > div,
  [role='menu'],
  [role='listbox'],
  [role='dialog'],
  [role='tooltip'] {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    background: var(--cerrda-layer-1) !important;
  }
}

/* ==========================================================================
   V2 — 全面重设计：把 cerrda 设计语言应用到 DSH 的每一个 UI 区域
   （圆角体系 / bloom 阴影 / hover 动效 / 玻璃分层 / 排版层次）
   ========================================================================== */

/* ---- 全局动效曲线（cerrda signature ease: cubic-bezier(0.32, 0.72, 0, 1)） ---- */
body {
  --ds-ease-in-out: cubic-bezier(0.32, 0.72, 0, 1);
  --cerrda-ease: cubic-bezier(0.32, 0.72, 0, 1);
}

/* ============ 侧边栏 ============ */
[data-slot='sidebar'] [class*='_logoRow'] {
  border-bottom: 1px solid color-mix(in oklch, var(--cerrda-fg) 6%, transparent);
}

[data-slot='sidebar'] [class*='_brand']:hover {
  opacity: 0.92;
}

/* 新建会话：胶囊 + 玫瑰描边，hover 玫瑰染色上浮 */
[data-slot='sidebar'] [class*='_newSession'] {
  border-radius: 999px !important;
  border-color: color-mix(in oklch, var(--cerrda-primary) 22%, transparent) !important;
  background: color-mix(in oklch, var(--cerrda-layer-1) 74%, transparent) !important;
  box-shadow: inset 0 1px 0 color-mix(in oklch, var(--cerrda-fg) 5%, transparent);
  transition: background 0.25s var(--cerrda-ease), border-color 0.25s var(--cerrda-ease), color 0.25s var(--cerrda-ease), transform 0.25s var(--cerrda-ease) !important;
}

[data-slot='sidebar'] [class*='_newSession']:hover:not(:disabled) {
  background: color-mix(in oklch, var(--cerrda-primary) 14%, transparent) !important;
  border-color: color-mix(in oklch, var(--cerrda-primary) 42%, transparent) !important;
  color: var(--cerrda-primary) !important;
  transform: translateY(-1px);
}

/* 分组标签：eyebrow 风格 */
[data-slot='sidebar.workspaces'] [class*='_sectionLabel'] {
  font-size: 10px !important;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--cerrda-fg-caption) !important;
}

/* 会话树行：圆角 + hover 高亮 + 选中玫瑰指示条 */
[data-slot='sidebar.workspaces'] [role='treeitem'] {
  position: relative;
  border-radius: 12px !important;
  transition: background 0.2s var(--cerrda-ease);
}

[data-slot='sidebar.workspaces'] [role='treeitem']:hover {
  background: color-mix(in oklch, var(--cerrda-fg) 6%, transparent) !important;
}

[data-slot='sidebar.workspaces'] [role='treeitem'][aria-selected='true'] {
  background: color-mix(in oklch, var(--cerrda-primary) 13%, transparent) !important;
}

[data-slot='sidebar.workspaces'] [role='treeitem'][aria-selected='true']::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 26%;
  bottom: 26%;
  width: 2px;
  border-radius: 2px;
  background: linear-gradient(180deg, var(--cerrda-primary-bright), var(--cerrda-primary));
  box-shadow: 0 0 8px color-mix(in oklch, var(--cerrda-primary) 60%, transparent);
}

/* 搜索框：胶囊玻璃，聚焦玫瑰 ring */
[data-slot='sidebar.workspaces'] input[type='text'] {
  border-radius: 999px !important;
  background: color-mix(in oklch, var(--cerrda-fg) 5%, transparent) !important;
  border: 1px solid color-mix(in oklch, var(--cerrda-fg) 8%, transparent) !important;
  transition: border-color 0.2s var(--cerrda-ease), box-shadow 0.2s var(--cerrda-ease);
}

[data-slot='sidebar.workspaces'] input[type='text']:focus {
  border-color: color-mix(in oklch, var(--cerrda-primary) 45%, transparent) !important;
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--cerrda-primary) 14%, transparent);
  outline: none;
}

/* 底部设置触发器：胶囊 */
[data-slot='sidebar.settings'] [class*='_trigger'] {
  border-radius: 999px !important;
  transition: background 0.2s var(--cerrda-ease), color 0.2s var(--cerrda-ease) !important;
}

/* ============ 会话头部 ============ */
[data-slot='conversation.session.header'] [class*='_crumb'] {
  transition: background 0.2s var(--cerrda-ease), color 0.2s var(--cerrda-ease) !important;
}

[data-slot='conversation.session.header'] [class*='_crumbCurrent'] {
  font-family: 'Fraunces', var(--dsw-font-family);
  font-weight: 600;
  letter-spacing: -0.01em;
}

[data-slot='conversation.session.header'] button:not([role='tab']) {
  border-radius: 999px !important;
  transition: background 0.2s var(--cerrda-ease), color 0.2s var(--cerrda-ease) !important;
}

[data-slot='conversation.session.header'] button:not([role='tab']):hover:not(:disabled) {
  background: color-mix(in oklch, var(--cerrda-fg) 7%, transparent) !important;
}

[data-slot='conversation.session.header'] [role='tab'] {
  font-weight: 600 !important;
  transition: color 0.25s var(--cerrda-ease) !important;
}

[data-slot='conversation.session.header'] [role='tab']:hover {
  color: var(--cerrda-fg-muted) !important;
}

[data-slot='conversation.session.header'] [role='tab'][aria-selected='true']::after {
  background: linear-gradient(90deg, var(--cerrda-primary-bright), var(--cerrda-primary)) !important;
  border-radius: 3px !important;
}

/* ============ 消息节点 ============ */
/* user 气泡：浅粉色玻璃（便于识别）+ cerrda CssLiquidGlass 质感
   （frost 磨砂 + chrome 高光/内折射 + specular 斜光 + double border + 内 rim） */
[data-chat-flow-kind='user'] [class*='_bubble'] {
  position: relative;
  background-color: color-mix(in oklch, var(--cerrda-primary) 24%, transparent) !important;
  background-image:
    linear-gradient(45deg, rgba(255 255 255 / 0.09) 0%, transparent 30%, transparent 70%, rgba(255 255 255 / 0.09) 100%) !important;
  -webkit-backdrop-filter: blur(8px) saturate(1.5);
  backdrop-filter: blur(8px) saturate(1.5);
  border: 1px double color-mix(in oklch, var(--cerrda-primary) 34%, transparent) !important;
  border-radius: 22px !important;
  box-shadow:
    inset 3px -3px 1px -1px rgba(255 255 255 / 0.14),
    inset -3px 3px 1px -1px rgba(255 255 255 / 0.14),
    inset 8px -8px 1px -8px rgba(255 255 255 / 0.07),
    inset -8px 8px 1px -8px rgba(255 255 255 / 0.07),
    inset 0 0 3px rgba(0 0 0 / 0.45),
    inset 0 0 0 1px rgba(255 255 255 / 0.05),
    0 6px 18px -10px var(--cerrda-shadow-bloom) !important;
}

[data-chat-flow-kind='user'] [class*='_bubble']::after {
  content: '';
  position: absolute;
  inset: 5px;
  z-index: 0;
  border: 1px solid rgba(255 255 255 / 0.06);
  border-radius: inherit;
  filter: blur(1px);
  pointer-events: none;
}

/* assistant 回复内容：不放卡片，直接浮在 silk 背景上（工具调用卡片保持自身玻璃） */

/* 消息操作条（copy / branch）：保持 shipped 默认样式（token 驱动），
   不再自定义 —— 避免 hover 时布局跳动 */

/* ============ Markdown 内容 ============ */
[class*='_markdown'] a {
  color: var(--cerrda-primary) !important;
  text-decoration-color: color-mix(in oklch, var(--cerrda-primary) 40%, transparent) !important;
}

[class*='_markdown'] a:hover {
  color: var(--cerrda-primary-bright) !important;
  text-decoration-color: var(--cerrda-primary) !important;
}

[class*='_markdown'] :not(pre) > code {
  background: color-mix(in oklch, var(--cerrda-primary) 10%, transparent) !important;
  border: 1px solid color-mix(in oklch, var(--cerrda-primary) 16%, transparent) !important;
  border-radius: 6px !important;
  padding: 1px 6px !important;
  color: oklch(0.92 0.03 350) !important;
  font-family: var(--ds-font-family-code);
  font-size: 0.9em;
}

[class*='_markdown'] pre {
  border: 1px solid color-mix(in oklch, var(--cerrda-fg) 7%, transparent) !important;
  border-radius: 16px !important;
}

[class*='_markdown'] blockquote {
  border-left: 3px solid color-mix(in oklch, var(--cerrda-primary) 45%, transparent) !important;
  background: color-mix(in oklch, var(--cerrda-primary) 5%, transparent) !important;
  border-radius: 0 14px 14px 0 !important;
  padding: 2px 16px !important;
}

[class*='_markdown'] table {
  border-collapse: separate !important;
  border-spacing: 0 !important;
  border: 1px solid color-mix(in oklch, var(--cerrda-fg) 10%, transparent) !important;
  border-radius: 14px !important;
  overflow: hidden !important;
}

[class*='_markdown'] th {
  background: color-mix(in oklch, var(--cerrda-fg) 5%, transparent) !important;
  font-weight: 600;
}

[class*='_markdown'] th,
[class*='_markdown'] td {
  border: none !important;
  border-bottom: 1px solid color-mix(in oklch, var(--cerrda-fg) 8%, transparent) !important;
  border-right: 1px solid color-mix(in oklch, var(--cerrda-fg) 8%, transparent) !important;
  padding: 8px 14px !important;
}

[class*='_markdown'] tr:last-child td {
  border-bottom: none !important;
}

[class*='_markdown'] th:last-child,
[class*='_markdown'] td:last-child {
  border-right: none !important;
}

[class*='_markdown'] hr {
  border: none !important;
  border-top: 1px solid color-mix(in oklch, var(--cerrda-fg) 9%, transparent) !important;
}

/* ============ 输入栏内部 ============ */
/* 发送按钮：玫瑰渐变胶囊 + 辉光，hover 上浮放大 */
[data-composer-card] [class*='_primary'] {
  background: linear-gradient(135deg, var(--cerrda-primary-bright) 0%, var(--cerrda-primary) 55%, oklch(0.78 0.11 350) 100%) !important;
  color: var(--cerrda-primary-fg) !important;
  border: none !important;
  border-radius: 999px !important;
  box-shadow:
    0 4px 18px color-mix(in oklch, var(--cerrda-primary) 42%, transparent),
    inset 0 1px 0 rgba(255 255 255 / 0.28) !important;
  transition: transform 0.2s var(--cerrda-ease), box-shadow 0.2s var(--cerrda-ease), filter 0.2s var(--cerrda-ease) !important;
}

[data-composer-card] [class*='_primary']:hover:not(:disabled) {
  transform: translateY(-1px) scale(1.05);
  filter: brightness(1.07);
  box-shadow:
    0 6px 22px color-mix(in oklch, var(--cerrda-primary) 55%, transparent),
    inset 0 1px 0 rgba(255 255 255 / 0.32) !important;
}

[data-composer-card] [class*='_primary']:active:not(:disabled) {
  transform: translateY(0) scale(0.97);
}

[data-composer-card] [class*='_primary']:disabled {
  background: color-mix(in oklch, var(--cerrda-layer-2) 92%, transparent) !important;
  color: var(--cerrda-fg-dim) !important;
  box-shadow: none !important;
}

/* 添加（+）按钮：胶囊玻璃，hover 玫瑰 */
[data-composer-card] [class*='_add'] {
  background: color-mix(in oklch, var(--cerrda-fg) 5%, transparent) !important;
  border: 1px solid color-mix(in oklch, var(--cerrda-fg) 8%, transparent) !important;
  border-radius: 999px !important;
  transition: all 0.2s var(--cerrda-ease) !important;
}

[data-composer-card] [class*='_add']:hover:not(:disabled) {
  background: color-mix(in oklch, var(--cerrda-primary) 15%, transparent) !important;
  border-color: color-mix(in oklch, var(--cerrda-primary) 40%, transparent) !important;
  color: var(--cerrda-primary) !important;
}

/* 模式 chip / 附件 chip：胶囊 */
[data-composer-card] [class*='_chip'] {
  border-radius: 999px !important;
  background: color-mix(in oklch, var(--cerrda-fg) 5%, transparent) !important;
  border: 1px solid color-mix(in oklch, var(--cerrda-fg) 9%, transparent) !important;
}

/* notice 提示条 */
[data-slot='conversation.composer.bar'] [class*='_notice'] {
  border-radius: 999px !important;
  background: color-mix(in oklch, var(--cerrda-primary) 10%, transparent) !important;
  color: var(--cerrda-primary) !important;
}

/* ============ Hero（无会话） ============ */
[data-composer-seat] > div > div > [class*='_headline'] {
  font-family: 'Fraunces', var(--dsw-font-family) !important;
  font-weight: 600 !important;
  letter-spacing: -0.02em !important;
}

[data-composer-seat] [class*='_workspace'] {
  border-radius: 999px !important;
  background: color-mix(in oklch, var(--cerrda-fg) 5%, transparent) !important;
  border: 1px solid color-mix(in oklch, var(--cerrda-fg) 9%, transparent) !important;
  transition: all 0.2s var(--cerrda-ease) !important;
}

[data-composer-seat] [class*='_workspace']:hover {
  background: color-mix(in oklch, var(--cerrda-primary) 13%, transparent) !important;
  border-color: color-mix(in oklch, var(--cerrda-primary) 38%, transparent) !important;
  color: var(--cerrda-primary) !important;
}

[data-composer-seat] [class*='_previewBadge'] {
  font-family: var(--ds-font-family-code);
  background: color-mix(in oklch, var(--cerrda-primary) 13%, transparent) !important;
  color: var(--cerrda-primary) !important;
  border: 1px solid color-mix(in oklch, var(--cerrda-primary) 30%, transparent) !important;
}

/* ============ 浮层 ============ */
[role='menu'] [role='menuitem'] {
  border-radius: 10px !important;
  transition: background 0.15s var(--cerrda-ease), color 0.15s var(--cerrda-ease) !important;
}

[role='menu'] [role='menuitem']:hover,
[role='menu'] [role='menuitem'][aria-selected='true'] {
  background: color-mix(in oklch, var(--cerrda-primary) 12%, transparent) !important;
  color: var(--cerrda-primary) !important;
}

/* ============ 设置面板 ============ */
[role='dialog'] [class*='_navCell'] {
  border-radius: 12px !important;
  transition: background 0.2s var(--cerrda-ease), color 0.2s var(--cerrda-ease) !important;
}

[role='dialog'] [class*='_navCell'][aria-current='true'] {
  background: color-mix(in oklch, var(--cerrda-primary) 14%, transparent) !important;
  color: var(--cerrda-primary) !important;
}

/* ============ 详情列 ============ */
[data-slot='details'] [class*='_title'] {
  font-family: 'Fraunces', var(--dsw-font-family) !important;
  font-weight: 600 !important;
}

[data-slot='details'] [class*='_sectionLabel'] {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 11px !important;
  font-weight: 600;
  color: var(--cerrda-fg-dim) !important;
}

[data-slot='details'] [class*='_code'] {
  border-radius: 14px !important;
  border: 1px solid color-mix(in oklch, var(--cerrda-fg) 7%, transparent) !important;
}

/* ============ 启动屏 / 品牌字标 ============ */
[class*='_wordmark'] {
  font-family: 'Fraunces', var(--dsw-font-family) !important;
  letter-spacing: 0.06em !important;
}

/* ==========================================================================
   V3 — Silk WebGL 背景 / CardSpotlight 辉光 / Ripple 波纹 / 浮层入场动效
   ========================================================================== */

/* 框架抬升到 silk 画布之上（silk canvas: fixed z-index 0, JS 挂载） */
[data-slot='root'] > div {
  z-index: 1;
}

/* ---- CardSpotlight：工具卡片鼠标跟随辉光（cerrda CardSpotlight） ---- */
[data-tool] {
  position: relative;
  transition: box-shadow 0.3s var(--cerrda-ease);
}

[data-tool]::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s ease;
  background: radial-gradient(circle 340px at var(--spot-x, -999px) var(--spot-y, -999px), oklch(0.72 0.12 350 / 0.22), transparent 70%);
}

[data-tool]:hover::before {
  opacity: 1;
}

[data-tool]:hover {
  box-shadow:
    inset 2px -2px 1px -1px rgba(255 255 255 / 0.12),
    inset -2px 2px 1px -1px rgba(255 255 255 / 0.12),
    inset 0 0 2px rgba(0 0 0 / 0.35),
    inset 0 0 0 1px rgba(255 255 255 / 0.05),
    0 12px 30px -14px var(--cerrda-shadow-bloom) !important;
}

[data-tool] > *:not([class*='_visuallyHidden']) {
  position: relative;
  z-index: 1;
}

/* ---- Ripple：点击波纹（cerrda Ripple）。
   注意：menuitem 不能加 overflow:hidden —— 子菜单渲染在 menuitem 内部，会被裁掉。 */
[data-composer-card] button,
[data-slot='sidebar'] [class*='_newSession'],
[role='dialog'] [class*='_navCell'] {
  position: relative;
  overflow: hidden;
}

[role='menu'] [role='menuitem'] {
  position: relative;
}

.cerrda-ripple {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 5;
  background: radial-gradient(circle, color-mix(in oklch, var(--cerrda-primary) 32%, transparent) 0%, transparent 70%);
  animation: cerrda-ripple 0.6s var(--cerrda-ease) forwards;
}

@keyframes cerrda-ripple {
  from {
    transform: scale(0);
    opacity: 0.55;
  }
  to {
    transform: scale(1);
    opacity: 0;
  }
}

/* ---- 浮层入场动效（AnimatedTooltip / menu / dialog 风格） ---- */
/* Tooltip 显隐门控：EffectsHost 在气泡内联定位就绪后打 data-cerrda-show，才从
   opacity:0 淡入 —— 保证不会在未定位状态下（行内/错误位置）闪现 */
[role='tooltip'][data-cerrda-show] {
  opacity: 1;
  animation: cerrda-tooltip-in 0.14s var(--cerrda-ease);
}

@keyframes cerrda-tooltip-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

[role='menu'] {
  animation: cerrda-pop 0.18s var(--cerrda-ease);
}

/* 弹窗：cerrda AnimatedModal 风格（scale + rotateX + y 弹簧入场） */
[role='dialog'] {
  animation: cerrda-dialog-in 0.34s var(--cerrda-ease);
}

/* 弹窗遮罩：黑底 + 模糊，淡入（cerrda modal overlay） */
[class*='_mask'] {
  animation: cerrda-mask-in 0.3s var(--cerrda-ease);
}

@keyframes cerrda-pop {
  from {
    opacity: 0;
    transform: translateY(3px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes cerrda-dialog-in {
  from {
    opacity: 0;
    transform: perspective(1200px) rotateX(9deg) scale(0.93) translateY(18px);
  }
  to {
    opacity: 1;
    transform: perspective(1200px) rotateX(0deg) scale(1) translateY(0);
  }
}

@keyframes cerrda-mask-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* ---- ContextMeter 面板玻璃 ---- */
[data-composer-card] [class*='_panel'] {
  -webkit-backdrop-filter: blur(22px) saturate(1.4);
  backdrop-filter: blur(22px) saturate(1.4);
}

/* 消息节点不再做滚动模糊显现（BlurReveal 已移除）：
   其 filter/transform 会把消息内 position:fixed 的 tooltip 困在消息盒内，
   造成复制按钮 hover 时"跳动"的假象 */

/* ---- Highlight：markdown mark 高亮（inspira Highlight） ---- */
[class*='_markdown'] mark {
  background: color-mix(in oklch, var(--cerrda-primary) 26%, transparent);
  color: var(--cerrda-fg);
  border-radius: 4px;
  padding: 0 3px;
}

/* ---- ShimmerBorder：发送按钮流光描边（inspira ShimmerBorder） ---- */
@property --cerrda-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

[data-composer-card] [class*='_primary'] {
  position: relative;
}

[data-composer-card] [class*='_primary']:not(:disabled)::after {
  content: '';
  position: absolute;
  inset: -1.5px;
  z-index: 1;
  border-radius: inherit;
  padding: 1.5px;
  background: conic-gradient(from var(--cerrda-angle), transparent 0%, color-mix(in oklch, var(--cerrda-primary-bright) 60%, transparent) 12%, transparent 26%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: cerrda-shimmer 5s linear infinite;
  pointer-events: none;
}

[data-composer-card] [class*='_primary'] > * {
  position: relative;
  z-index: 2;
}

@keyframes cerrda-shimmer {
  to {
    --cerrda-angle: 360deg;
  }
}

/* ---- 回到底部按钮：与输入栏同款 Liquid Glass（独立 mini 位移滤镜） ---- */
[class*='_toBottom']:not([class*='_toBottomSlot']) {
  background: color-mix(in oklch, var(--cerrda-layer-1) 28%, transparent) !important;
  -webkit-backdrop-filter: blur(18px) saturate(1.6);
  backdrop-filter: blur(18px) saturate(1.6);
  -webkit-backdrop-filter: url(#cerrda-liquid-glass-mini);
  backdrop-filter: url(#cerrda-liquid-glass-mini);
  border: 1px solid color-mix(in oklch, var(--cerrda-fg) 10%, transparent) !important;
  box-shadow:
    inset 0 0 2px 1px color-mix(in oklch, var(--cerrda-fg) 9%, transparent),
    0 4px 16px var(--cerrda-shadow-bloom),
    0 8px 24px var(--cerrda-shadow-bloom) !important;
}

[class*='_toBottom']:not([class*='_toBottomSlot']):hover {
  background: color-mix(in oklch, var(--cerrda-layer-1) 46%, transparent) !important;
  border-color: color-mix(in oklch, var(--cerrda-primary) 32%, transparent) !important;
}

/* ---- 工具调用卡片：紧凑但留白（标题行适中、卡片内边距克制、内容区留白） ---- */
[data-tool] {
  padding: 4px 6px 6px !important;
}

[data-tool] > div > [class*='_row'] {
  min-height: 34px !important;
  padding: 2px 8px !important;
}

[data-tool] [class*='_bodyWrap'] {
  padding: 4px 6px 0 !important;
}

[data-tool] [class*='_ioCard'],
[data-tool] [class*='_terminal'] {
  margin: 6px 2px 6px 6px !important;
}

/* ==========================================================================
   V4.5 — cerrda 细节补全：复制按钮 / 弹窗卡片 / markdown / 轨迹视图
   ========================================================================== */

/* ---- 复制按钮：cerrda 胶囊玻璃 + 玫瑰 hover ---- */
[class*='_copyButton'] {
  border-radius: 999px !important;
  border: 1px solid color-mix(in oklch, var(--cerrda-fg) 14%, transparent) !important;
  background: color-mix(in oklch, var(--cerrda-layer-1) 55%, transparent) !important;
  color: var(--cerrda-fg-dim) !important;
  transition: background 0.2s var(--cerrda-ease), border-color 0.2s var(--cerrda-ease), color 0.2s var(--cerrda-ease) !important;
}

[class*='_copyButton']:hover {
  background: color-mix(in oklch, var(--cerrda-primary) 14%, transparent) !important;
  border-color: color-mix(in oklch, var(--cerrda-primary) 42%, transparent) !important;
  color: var(--cerrda-primary) !important;
}

/* ---- 弹窗卡片：cerrda 边框 + bloom 阴影 ---- */
[role='dialog'] {
  border: 1px solid color-mix(in oklch, var(--cerrda-fg) 12%, transparent) !important;
  box-shadow:
    0 0 1px rgba(0 0 0 / 0.3),
    0 4px 16px rgba(0 0 0 / 0.25),
    0 12px 32px rgba(0 0 0 / 0.35),
    0 28px 72px rgba(0 0 0 / 0.42) !important;
}

/* ---- Markdown：玫瑰列表标记 + 强调文字 ---- */
[class*='_markdown'] li::marker {
  color: var(--cerrda-primary);
}

[class*='_markdown'] strong {
  color: oklch(0.99 0.008 350);
  font-weight: 650;
}

/* ---- 轨迹视图（trajectory）：cerrda 风格表格 ---- */
[class*='_split'] {
  background: color-mix(in oklch, var(--cerrda-layer-1) 55%, transparent) !important;
}

[class*='_table'] {
  background: transparent !important;
}

[class*='_table'] th {
  background: color-mix(in oklch, var(--cerrda-bg) 45%, transparent) !important;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  font-size: 11px !important;
  font-weight: 600;
}

[class*='_table'] tbody tr:hover td {
  background: color-mix(in oklch, var(--cerrda-primary) 5%, transparent) !important;
}

/* 回合编号：eyebrow 胶囊 */
[class*='_turnLabel']:not([class*='_turnLabelFull']):not([class*='_turnLabelCompact']) {
  border-radius: 999px !important;
  font-family: var(--ds-font-family-code);
  letter-spacing: 0.05em;
  padding: 1px 8px !important;
  background: color-mix(in oklch, var(--cerrda-fg) 7%, transparent) !important;
  color: var(--cerrda-fg-dim) !important;
}

[class*='_turnLabelActive'] {
  background: color-mix(in oklch, var(--cerrda-primary) 18%, transparent) !important;
  color: var(--cerrda-primary) !important;
}

/* 事件类型标签：胶囊 */
[class*='_kindTag']:not([class*='_kindTagIcon']):not([class*='_kindTagLabel']) {
  border-radius: 999px !important;
  border-color: color-mix(in oklch, var(--cerrda-fg) 14%, transparent) !important;
  background: color-mix(in oklch, var(--cerrda-layer-1) 55%, transparent) !important;
}

/* ---- 减少动效偏好 ---- */
@media (prefers-reduced-motion: reduce) {
  .cerrda-ripple {
    display: none;
  }
  [role='tooltip'],
  [role='menu'],
  [role='dialog'],
  [class*='_mask'] {
    animation: none;
  }
  [data-tool] {
    transition: none;
  }
  [data-composer-card] [class*='_primary']:not(:disabled)::after {
    animation: none;
    opacity: 0.4;
  }
}
`;

// ---- Silk Background（WebGL2，自 cerrda SilkBackground + InspiraShaderToy 移植） ----
const SILK_HEADER = String.raw`#version 300 es
#ifdef GL_ES
precision highp float;
precision highp int;
#endif
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iHSV;
out vec4 fragColor;

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 applyHSV(vec3 color, vec3 hsvAdjust) {
  vec3 hsv = rgb2hsv(color);
  hsv.x = fract(hsv.x + hsvAdjust.x / 360.0);
  hsv.y = clamp(hsv.y * hsvAdjust.y, 0.0, 1.0);
  hsv.z = clamp(hsv.z * hsvAdjust.z, 0.0, 1.0);
  return hsv2rgb(hsv);
}

void mainImage(out vec4 c, in vec2 f);

void main() {
  vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
  mainImage(color, gl_FragCoord.xy);
  if (iHSV.x != 0.0 || iHSV.y != 1.0 || iHSV.z != 1.0) {
    color.rgb = applyHSV(color.rgb, iHSV);
  }
  fragColor = color;
}
`;

const SILK_BODY = String.raw`
#define INVERT 1

float noise(vec2 p) {
    return smoothstep(-0.5, 0.9, sin((p.x - p.y) * 555.0) * sin(p.y * 1444.0)) - 0.4;
}

float fabric(vec2 p) {
    const mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    float f = 0.4 * noise(p);
    f += 0.3 * noise(p = m * p);
    f += 0.2 * noise(p = m * p);
    return f + 0.1 * noise(m * p);
}

float silk(vec2 uv, float t) {
    float s = sin(5.0 * (uv.x + uv.y + cos(2.0 * uv.x + 5.0 * uv.y)) + sin(12.0 * (uv.x + uv.y)) - t);
    s = 0.7 + 0.3 * (s * s * 0.5 + s);
    s *= 0.9 + 0.6 * fabric(uv * min(iResolution.x, iResolution.y) * 0.0006);
    return s * 0.9 + 0.1;
}

float silkd(vec2 uv, float t) {
    float xy = uv.x + uv.y;
    float d = (5.0 * (1.0 - 2.0 * sin(2.0 * uv.x + 5.0 * uv.y)) + 12.0 * cos(12.0 * xy)) * cos(5.0 * (cos(2.0 * uv.x + 5.0 * uv.y) + xy) + sin(12.0 * xy) - t);
    return 0.005 * d * (sign(d) + 3.0);
}

void mainImage(out vec4 fragColor, vec2 fragCoord) {
    float mr = min(iResolution.x, iResolution.y);
    vec2 uv = fragCoord / mr;

    float t = iTime;
    uv.y += 0.03 * sin(8.0 * uv.x - t);

    float s = sqrt(silk(uv, t));
    float d = silkd(uv, t);

    vec3 c = vec3(s);
    c += 0.7 * vec3(1, 0.83, 0.6) * d;
    c *= 1.0 - max(0.0, 0.8 * d);
#if INVERT
    c = pow(c, 0.3 / vec3(0.52, 0.5, 0.4));
    c = 1.0 - c;
#else
    c = pow(c, vec3(0.52, 0.5, 0.4));
#endif

    fragColor = vec4(c, 1);
}
`;

function mountSilkBackground() {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText =
    'position:fixed;inset:0;width:100%;height:100%;z-index:0;opacity:0.5;pointer-events:none;';
  document.body.appendChild(canvas);

  let gl = null;
  try {
    gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    });
  } catch (e) {
    gl = null;
  }
  if (!gl) {
    canvas.remove();
    return () => {};
  }

  const vertexSrc = '#version 300 es\nvoid main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.0-1.0,0.0,1.0);}';
  const fragSrc = SILK_HEADER + SILK_BODY;

  const compile = (type, src) => {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(sh);
      gl.deleteShader(sh);
      throw new Error(log || 'shader compile failed');
    }
    return sh;
  };

  let program = null;
  try {
    const vs = compile(gl.VERTEX_SHADER, vertexSrc);
    const fs = compile(gl.FRAGMENT_SHADER, fragSrc);
    program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || 'program link failed');
    }
  } catch (e) {
    console.error('[cerrda-theme] silk shader failed', e);
    canvas.remove();
    return () => {};
  }

  const uRes = gl.getUniformLocation(program, 'iResolution');
  const uTime = gl.getUniformLocation(program, 'iTime');
  const uHSV = gl.getUniformLocation(program, 'iHSV');

  const reduceMotion = typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const pr = dpr * 0.55; // silk pixel ratio（cerrda GPU 低档）

  const resize = () => {
    const w = Math.max(1, Math.round(window.innerWidth * pr));
    const h = Math.max(1, Math.round(window.innerHeight * pr));
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;
    gl.viewport(0, 0, w, h);
  };
  resize();

  const ro = new ResizeObserver(resize);
  ro.observe(document.documentElement);

  gl.useProgram(program);
  gl.uniform3f(uRes, canvas.width, canvas.height, pr);
  gl.uniform3f(uHSV, 310, 0.45, 0.85); // cerrda 暗色：hue 310 / sat 0.45 / brightness 0.85

  const started = performance.now();
  const frameInterval = 1000 / 45; // 45fps 上限，silk 足够顺滑且省电
  let raf = 0;
  let last = 0;
  let hidden = document.hidden;

  const draw = (now) => {
    const elapsed = (now - started) * 0.001 * 0.55; // cerrda 暗色 speed 0.55
    gl.uniform1f(uTime, elapsed);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const loop = (now) => {
    raf = 0;
    if (document.hidden) {
      hidden = true;
      return;
    }
    if (hidden) {
      hidden = false;
      last = now;
    }
    if (now - last >= frameInterval) {
      last = now;
      draw(now);
    }
    raf = window.requestAnimationFrame(loop);
  };

  if (reduceMotion) {
    draw(performance.now());
  } else {
    raf = window.requestAnimationFrame(loop);
  }

  return () => {
    if (raf) window.cancelAnimationFrame(raf);
    ro.disconnect();
    if (program) gl.deleteProgram(program);
    canvas.remove();
  };
}

// ---- CardSpotlight + Ripple + BlurReveal：全局委托监听，不改动 shipped DOM ----
function EffectsHost() {
  React.useEffect(() => {
    const RIPPLE_TARGET =
      '[data-composer-card] button, [data-slot="sidebar"] [class*="_newSession"], [role="menu"] [role="menuitem"], [role="dialog"] [class*="_navCell"]';
    let spotRaf = 0;

    const onPointerMove = (e) => {
      const el = e.target && e.target.closest ? e.target.closest('[data-tool]') : null;
      if (!el) return;
      if (spotRaf) return;
      spotRaf = window.requestAnimationFrame(() => {
        spotRaf = 0;
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--spot-x', e.clientX - rect.left + 'px');
        el.style.setProperty('--spot-y', e.clientY - rect.top + 'px');
      });
    };

    const onPointerDown = (e) => {
      if (!e.target || !e.target.closest) return;
      const btn = e.target.closest(RIPPLE_TARGET);
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2.2;
      const span = document.createElement('span');
      span.className = 'cerrda-ripple';
      span.style.width = size + 'px';
      span.style.height = size + 'px';
      span.style.left = e.clientX - rect.left - size / 2 + 'px';
      span.style.top = e.clientY - rect.top - size / 2 + 'px';
      btn.appendChild(span);
      window.setTimeout(() => span.remove(), 700);
    };

    // Tooltip 显隐门控：primitives Tooltip 的气泡 span 每次 show 都会重新挂载，
    // CSS 默认 opacity:0；等内联定位（left/top）就绪后打 data-cerrda-show 淡入，
    // 消除"先出现在右边、再跳到复制按钮下方"的闪现。兜底最多等 4 帧（约 64ms），
    // 避免定位信号缺失时气泡永不显示。
    const gateTooltip = (tip) => {
      if (tip.getAttribute('data-cerrda-gated') === '1') return;
      tip.setAttribute('data-cerrda-gated', '1');
      let frames = 0;
      const check = () => {
        frames += 1;
        const style = tip.getAttribute('style') || '';
        const positioned = /\bleft\s*:/.test(style) && /\btop\s*:/.test(style);
        if (positioned || frames >= 4) {
          tip.setAttribute('data-cerrda-show', '');
        } else {
          window.requestAnimationFrame(check);
        }
      };
      window.requestAnimationFrame(check);
    };
    const scanTooltips = (root) => {
      if (!root || !root.querySelectorAll) return;
      const tips = root.querySelectorAll('[role="tooltip"]');
      for (const tip of tips) gateTooltip(tip);
    };
    let mo = null;
    if (typeof MutationObserver === 'function') {
      mo = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (!node || node.nodeType !== 1) continue;
            if (node.getAttribute && node.getAttribute('role') === 'tooltip') gateTooltip(node);
            else scanTooltips(node);
          }
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
      scanTooltips(document);
    }

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerdown', onPointerDown, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerdown', onPointerDown);
      if (spotRaf) window.cancelAnimationFrame(spotRaf);
      if (mo) mo.disconnect();
    };
  }, []);
  return null;
}

module.exports = {
  apply(ctx) {
    const disposers = [];

    const theme = ctx.get('theme');
    if (theme !== undefined) {
      try {
        disposers.push(theme.overrideTokens('cerrda-theme', TOKEN_OVERRIDES));
      } catch (err) {
        console.error('[cerrda-theme] token override failed', err);
      }
    }

        disposers.push((() => {
      const tagId = 'dsh-cerrda-theme/css';
      if (typeof document === 'undefined') return () => {};
      if (document.querySelector('style[data-plugin-css="' + tagId + '"]') !== null) return () => {};
      const tag = document.createElement('style');
      tag.dataset.plugin = 'dsh-cerrda-theme';
      tag.dataset.pluginCss = tagId;
      tag.textContent = CSS;
      document.head.appendChild(tag);
      return () => {
        const el = document.querySelector('style[data-plugin-css="' + tagId + '"]');
        if (el && el.parentNode) el.parentNode.removeChild(el);
      };
    })());

    try {
      disposers.push(mountSilkBackground());
    } catch (err) {
      console.error('[cerrda-theme] silk background failed', err);
    }

    const slots = ctx.get('slots');
    if (slots !== undefined) {
      disposers.push(slots.inject('shell.overlay', () => slots.register(
        { name: 'shell.overlay', id: 'cerrda-liquid-glass' },
        () => React.createElement(LiquidGlassProvider)
      )));
      disposers.push(slots.inject('shell.overlay', () => slots.register(
        { name: 'shell.overlay', id: 'cerrda-effects' },
        () => React.createElement(EffectsHost)
      )));
    }

    return () => {
      for (const d of disposers) {
        if (typeof d === 'function') d();
      }
    };
  },
};

		return module.exports;
	}
});