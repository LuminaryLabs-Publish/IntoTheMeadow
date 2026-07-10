# Render Audit: Render Consumption GameHost Ledger Gap

**Timestamp:** `2026-07-10T09-28-40-04-00`

## Current render path

```txt
game.getRenderPlan(time)
  -> createRenderPlanEnhancer().enhance(rawPlan)
  -> grass/wind/postprocess/performance/stats descriptors
  -> renderer.render(enhancedPlan)
  -> aggregate renderer snapshot
  -> GameHost.getRenderSnapshot()
  -> editor bridge renderer.getSnapshot
```

## What is already useful

```txt
renderer v2 exists
render enhancer exists
aggregate renderer snapshot exists
primitiveFallbackCount is visible
descriptor counts are visible
headless editor bridge can read renderer snapshots
```

## Gap

The render surface cannot yet explain each descriptor row.

```txt
no render expectation rows
no renderer snapshot normalizer
no consumed / ignored / unsupported / fallback row status
no primitive fallback attribution by descriptor id/class
no source-owned render consumption ledger
no GameHost proof projection for render rows
no editor observation row for render proof
```

## Next proof files

```txt
src/render-proof/render-expectations.js
src/render-proof/renderer-snapshot-normalizer.js
src/render-proof/render-consumption-ledger.js
src/render-proof/gamehost-render-proof.js
tests/render-consumption-ledger-smoke.mjs
```

## Deferred render work

```txt
visual fidelity pass
renderer replacement
external CDN migration
postprocess art tuning
camera/control rewiring
```
