# Deploy Audit — Check Script Fixture Wire Map

**Timestamp:** `2026-07-08T22-38-17-04-00`

## Current validation entrypoint

`package.json` exposes:

```txt
npm run check
```

which currently runs:

```txt
node tests/static-smoke.mjs
node tests/dsk-registry-smoke.mjs
node tests/render-plan-smoke.mjs
node tests/deterministic-scene-smoke.mjs
```

## Fixture scripts to add next

```txt
node tests/render-parity-fixture-smoke.mjs
node tests/gameplay-action-replay-fixture-smoke.mjs
```

## Wire order

```txt
static-smoke
-> dsk-registry-smoke
-> render-plan-smoke
-> deterministic-scene-smoke
-> render-parity-fixture-smoke
-> gameplay-action-replay-fixture-smoke
```

## Acceptance rules

```txt
fixture scripts must be DOM-free
fixture scripts must not import browser-only renderer APIs
fixture scripts must not require canvas, WebGL, or requestAnimationFrame
fixture scripts must return stable reason rows for missing renderer snapshots
fixture scripts must prove legacy snapshot fields remain present
fixture scripts must prove additive renderParity and gameplay projections
```

## Non-goals

```txt
Do not change GitHub Pages routing.
Do not change external CDN kit URLs.
Do not add Playwright for this ledge.
Do not add browser screenshots for this ledge.
Do not rewrite renderer visuals before readback proof exists.
```
