# Render Audit: Render Plan Consumption Readback

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-09T18-20-18-04-00`

## Current render surface

`src/hosts/web-host.js` creates the external `meadow-webgl-render-kit` renderer, calls `enhanceRenderPlan(rawPlan)`, stores the enhanced plan as `lastPlan`, and calls `renderer.render(plan)` every animation frame.

`GameHost.getSnapshot()` includes `enhancedRenderPlan: lastPlan` and `render: renderer.getSnapshot?.()`, but renderer snapshot support is optional and not normalized.

## Render loop

```txt
requestAnimationFrame
  -> game.tick({ time, dt })
  -> rawPlan = game.getRenderPlan(time)
  -> plan = enhanceRenderPlan(rawPlan)
  -> lastPlan = plan
  -> render = renderer.render(plan)
  -> debug HUD uses diagnostics plus plan.stats plus render.vertexCount
```

## Active render domains

```txt
external meadow render plan
external WebGL render consumer
object descriptor filtering
focal tree enhancement
outline policy
wind field
postprocess stack
performance profile and budgets
render stats
GameHost enhancedPlan readback
optional renderer snapshot readback
```

## Gap

The route does not yet produce rows like:

```txt
object:focal-tree       expected -> consumed | fallback | ignored | unsupported
object:path             expected -> consumed | fallback | ignored | unsupported
grassSystem             expected -> consumed | fallback | ignored | unsupported
windField               expected -> consumed | fallback | ignored | unsupported
postProcess             expected -> consumed | fallback | ignored | unsupported
rendererSnapshot        present  -> normalized | missing-optional
```

Without those rows, downstream work cannot safely tell the difference between a descriptor that was emitted and a descriptor that was actually consumed.

## Next render proof target

Add `src/render-proof/*` modules first, then expose proof additively through `GameHost` and snapshot state.

Suggested first files:

```txt
src/render-proof/render-expectations.js
src/render-proof/renderer-snapshot-normalizer.js
src/render-proof/render-consumption-ledger.js
src/render-proof/gamehost-render-proof.js
tests/render-consumption-ledger-smoke.mjs
```
