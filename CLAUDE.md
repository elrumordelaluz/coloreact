# ColoReact — Claude Code Guide

## Project

Lightweight React color picker library (npm: `coloreact`, v1.0.0). Exports a ready-made `ColorPicker` and low-level `Map`/`Slider` primitives for custom pickers.

## Commands

```bash
npm start        # dev server at http://localhost:3040 (webpack-dev-server)
npm run lib      # transpile src/ → lib/ (what gets published to npm)
npm run build    # webpack production build → docs/bundle.js (demo site)
```

No test runner is configured.

## Architecture

```
src/
  index.js                  # exports: default ColorPicker, named Map, Slider
  components/
    ColorPicker.js          # top-level component; owns HSV state
    Map.js                  # 2D saturation/value picker; wrapped by Draggable
    Slider.js               # 1D hue or opacity slider; wrapped by Draggable
    Draggable.js            # HOC that injects drag logic into Map and Slider
```

**Color space:** state is stored in HSV (h 0–360, s/v 0–100, a 0–1). tinycolor2 handles all parsing and format conversion.

**Draggable HOC:** `draggable(options)(Component)` — options `{ single: true }` for 1D sliders, default for 2D map. Injects `startUpdates`, `getPercentageValue`, `active`, `rect` props.

**onChange output shape:**
```js
{ hsl, hex, hexString, rgb, rgbString }
```

## Key details

- `src/index.js` uses `export X from` syntax — requires `@babel/plugin-proposal-export-default-from`.
- `UNSAFE_componentWillReceiveProps` is used in `ColorPicker.js` (correct prefixed form for React 18/19).
- Drag position uses a `containerRef` forwarded from `Draggable` → `Map`/`Slider` root `<div>` — no `ReactDOM.findDOMNode`.
- No TypeScript types shipped.
- Peer dep: `react >= 15.6.1`.

## Publishing

`prepublish` runs `npm run lib` automatically, so always edit `src/`, never `lib/`.
