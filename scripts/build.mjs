#!/usr/bin/env node
// Build the static browser bundle (lib/client.js) from the dynamic client
// source (src/cerrda-theme-client.js).
//
// The dynamic source is a plain function body (it ends with `return { apply }
// ...`), evaluated by the cordis client runner with `React`/`styles` closure
// symbols. The static bundle runs in the browser module system instead, so
// this build applies the fixed environment adaptation:
//   1. wrap in window.__ModuleLoader__.load({ id, factory }) and require react
//   2. replace the final `return {` with `module.exports = {`
//   3. replace `styles.insert(CSS)` with a manual <style data-plugin-css>
//      injection (static bundles have no `styles` global)
//
// Run: node scripts/build.mjs   (or: npm run build)

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const srcPath = join(root, 'src', 'cerrda-theme-client.js')
const outPath = join(root, 'lib', 'client.js')

const PLUGIN_ID = 'dsh-cerrda-theme'
const CSS_TAG_ID = `${PLUGIN_ID}/css`

const header = `window.__ModuleLoader__.load({
\tid: "${PLUGIN_ID}",
\tfactory: (require) => {
\t\tvar module = { exports: {} };
\t\tvar exports = module.exports;
\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
\t\tlet React = require("react");
`

const footer = `
\t\treturn module.exports;
\t}
});
`

const cssInjection = `    disposers.push((() => {
      const tagId = '${CSS_TAG_ID}';
      if (typeof document === 'undefined') return () => {};
      if (document.querySelector('style[data-plugin-css="' + tagId + '"]') !== null) return () => {};
      const tag = document.createElement('style');
      tag.dataset.plugin = '${PLUGIN_ID}';
      tag.dataset.pluginCss = tagId;
      tag.textContent = CSS;
      document.head.appendChild(tag);
      return () => {
        const el = document.querySelector('style[data-plugin-css="' + tagId + '"]');
        if (el && el.parentNode) el.parentNode.removeChild(el);
      };
    })());`

let src = readFileSync(srcPath, 'utf8').replace(/\r\n/g, '\n')

const tailMarker = `return {\n  apply(ctx) {`
if (!src.includes(tailMarker)) {
  throw new Error(`build: cannot find plugin-object marker \`${tailMarker.replace(/\n/g, '\\n')}\` in ${srcPath}; the dynamic source shape changed`)
}
src = src.replace(tailMarker, `module.exports = {\n  apply(ctx) {`)

const stylesMarker = `disposers.push(styles.insert(CSS));`
if (!src.includes(stylesMarker)) {
  throw new Error(`build: cannot find \`${stylesMarker}\` in ${srcPath}; the style-injection call changed`)
}
src = src.replace(stylesMarker, cssInjection)

const bundle = header + src + footer

// Parse check without executing (window/__ModuleLoader__ are browser-only).
try {
  // eslint-disable-next-line no-new-func
  new Function(bundle)
} catch (error) {
  throw new Error(`build: generated bundle failed syntax check: ${error.message}`)
}

writeFileSync(outPath, bundle, 'utf8')
console.log(`built ${outPath} (${Buffer.byteLength(bundle)} bytes)`)
