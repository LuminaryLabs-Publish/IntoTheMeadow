# Render Audit: Renderer Consumption Ledger Readback

**Timestamp:** `2026-07-09T15-39-08-04-00`

## Current render loop

```txt
web-host frame(now)
  -> game.tick({ time, dt })
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(enhancedPlan)
  -> debug HUD displays validation/object/patch/vertex counts
  -> GameHost snapshot can include enhancedRenderPlan and renderer.getSnapshot?.()
```

## Render descriptors currently produced

```txt
area
style
objects
features/path
wind
postProcess
performance
windField
grassSystem
grassPatches
stats.objectCount
stats.grassPatchCount
stats.grassStaticBatchCount
stats.grassDrawGroupCount
stats.estimatedGrassInstances
stats.estimatedGrassCards
```

## Render readback gap

The route can expose the enhanced render plan and optional renderer snapshot, but it does not yet normalize renderer readback into a stable ledger. There is no source-owned proof for:

```txt
- descriptor id
- descriptor type
- expected consumer
- consumed / ignored / unsupported status
- fallback behavior
- renderer snapshot evidence
- per-frame parity result
- non-normalized volatile fields
- GameHost proof projection
```

## Safe next render cut

Add a pure render-consumption ledger beside source descriptors before replacing the renderer or expanding visuals.

```txt
src/render-proof/render-expectations.js
src/render-proof/renderer-snapshot-normalizer.js
src/render-proof/render-consumption-ledger.js
src/render-proof/gamehost-render-proof.js
tests/render-consumption-ledger-smoke.mjs
```

## Do not change yet

```txt
- external meadow-webgl-render-kit URL
- visual style
- grass appearance
- camera/route shell
- meadow area content
- renderer implementation
```
