# Deploy Audit — Check Script Fixture Wire Gate

**Timestamp:** `2026-07-09T09-50-00-04-00`

## Current deploy/check surface

`package.json` exposes:

```txt
npm run check
npm test
```

`npm run check` currently runs:

```txt
node tests/static-smoke.mjs
node tests/dsk-registry-smoke.mjs
node tests/render-plan-smoke.mjs
node tests/deterministic-scene-smoke.mjs
```

## Current static route

```txt
index.html
  -> ./src/boot/boot-game.js
```

The static route is suitable for GitHub Pages style hosting and currently relies on browser imports plus CDN-hosted meadow kits.

## Gap

The next proof work has no fixture script yet.

Required fixture gate:

```txt
scripts/into-the-meadow-render-action-fixture.mjs
```

Add it to `npm run check` only after the fixture exists and passes locally.

## Proposed check sequence after implementation

```txt
node tests/static-smoke.mjs
node tests/dsk-registry-smoke.mjs
node tests/render-plan-smoke.mjs
node tests/deterministic-scene-smoke.mjs
node scripts/into-the-meadow-render-action-fixture.mjs
```

## Fixture must prove

```txt
renderer snapshot absent does not break the route
renderer snapshot sparse creates sparse rows
expected render descriptors classify consistently
grass patch/draw-group/instance/card counts classify consistently
path-progress action mutates state and resolves objective threshold
inspect action mutates state and resolves objective
repeated inspect becomes a no-op with stable reason
unknown target is rejected without mutation
```

## Deploy non-goals

```txt
Do not change Pages deployment first.
Do not change the public URL.
Do not change external CDN URLs first.
Do not require a browser to run the source authority fixture.
Do not block static smoke on optional renderer snapshots.
```
