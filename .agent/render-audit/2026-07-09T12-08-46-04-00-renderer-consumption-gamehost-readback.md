# Render Audit — Renderer Consumption + GameHost Readback

**Timestamp:** `2026-07-09T12-08-46-04-00`

## Current render path

```txt
web-host frame(now)
  -> game.tick({ time, dt: 1 / 60 })
  -> rawPlan = game.getRenderPlan(time)
  -> plan = enhanceRenderPlan(rawPlan, { performance })
  -> lastPlan = plan
  -> render = renderer.render(plan)
  -> debug HUD uses diagnostics and render.vertexCount
```

## Render descriptors emitted now

```txt
raw meadow plan:
- id
- type
- time
- seed
- area
- style
- wind
- objects
- stats
- validation

enhanced plan:
- filtered objects
- focal tree renderStyle
- rock/small-object outline policy
- grassSystem
- grassPatches
- windField
- postProcess
- performance profile/budgets/outlinePolicy
- stats.objectCount
- stats.grassPatchCount
- stats.grassStaticBatchCount
- stats.grassDrawGroupCount
- stats.estimatedGrassInstances
- stats.estimatedGrassCards
```

## Current readback surface

`src/hosts/web-host.js` exposes a snapshot closure that includes:

```txt
{
  ...game.getSnapshot(),
  enhancedRenderPlan: lastPlan,
  render: renderer.getSnapshot?.()
}
```

This is useful but incomplete. It exposes the enhanced plan and optional renderer snapshot, but it does not compare them.

## Gaps

```txt
No expected descriptor collector.
No renderer snapshot normalizer.
No supported/unsupported descriptor matrix.
No consumed/missing/fallback/sparse classification rows.
No stable renderParity block in GameHost snapshot.
No DOM-free fixture for renderer absence or sparse readback.
No guard that renderer readback includes grass-related consumption.
```

## Next render proof contract

```txt
expected descriptors
  -> renderer snapshot normalization
  -> render consumption rows
  -> grass consumption rows
  -> render parity summary
  -> GameHost.getSnapshot().renderParity
  -> DOM-free fixture rows
```

## Required fixture rows

```txt
renderer snapshot absent -> pass with fallback-rendered/unknown support rows
renderer snapshot sparse -> classify missing descriptor rows
basic enhanced plan -> expected descriptors include grass/wind/postprocess/performance/object styles
grass system present -> expected grass rows include densityTexture/staticBatches/patches/drawGroups/instances/cards
render stats mismatch -> fail with reasoned row, not ad hoc string
```

## Non-goals

Do not replace the WebGL renderer, change CDN kits, rewrite the meadow plan, retune visuals, or add new objects before the consumer-readback contract exists.
