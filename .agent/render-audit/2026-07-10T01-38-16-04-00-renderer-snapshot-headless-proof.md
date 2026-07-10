# Render Audit: Renderer Snapshot Headless Proof

**Timestamp:** `2026-07-10T01-38-16-04-00`

## Render surface

`IntoTheMeadow` renders through `meadow-webgl-renderer-v2` via the compatible adapter path used by `src/hosts/web-host.js`.

The renderer provides useful aggregate readback, but aggregate readback is not row-level proof.

## Current render loop

```txt
web-host frame
  -> game.tick({ time, dt })
  -> game.getRenderPlan(time)
  -> planEnhancer.enhance(rawPlan)
  -> contract validation gate
  -> renderer.render(plan)
  -> lastRender stores renderer snapshot
  -> GameHost exposes getRenderSnapshot()
```

## Render proof gaps

```txt
renderer snapshot is not normalized into proof rows.
descriptorCounts are not classified as consumed, ignored, unsupported, or fallback.
primitiveFallbackCount is not tied back to descriptor ids or fallback classes.
postProcess descriptor consumption is not visible beyond mode labels.
wind and performance policy consumption are not row-backed.
GameHost exposes render snapshots, but not render proof rows.
headless editor smokes do not yet assert descriptor consumption rows.
```

## Render rows needed

```txt
render_object_descriptor_expected
render_object_descriptor_consumed
render_object_descriptor_ignored
render_object_descriptor_unsupported
render_object_descriptor_fallback
renderer_snapshot_normalized
renderer_topology_cache_row
renderer_gpu_cache_row
renderer_postprocess_row
renderer_wind_row
renderer_performance_policy_row
GameHost_render_proof_projection_row
headless_editor_render_observation_row
```

## Do not do next

```txt
visual fidelity pass
renderer replacement
shader rewrite
grass art tuning
external CDN migration
new meadow content
camera/control wiring
```

## Next safe render work

```txt
src/render-proof/render-expectations.js
src/render-proof/renderer-snapshot-normalizer.js
src/render-proof/render-consumption-ledger.js
src/render-proof/gamehost-render-proof.js
tests/render-consumption-ledger-smoke.mjs
```
