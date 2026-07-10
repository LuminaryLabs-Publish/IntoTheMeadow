# Render Audit: Renderer Proof Row Gap

**Timestamp:** `2026-07-10T04-58-56-04-00`

## Current render surface

`meadow-webgl-renderer-v2` renders the enhanced meadow plan and returns aggregate renderer readback.

The renderer tracks topology key, vertex count, rebuild count, cache hits, and related render facts, but the repo does not yet normalize those facts into source-owned proof rows.

## Current render loop

```txt
raw render plan
  -> createRenderPlanEnhancer.enhance(rawPlan)
  -> enhanceRenderPlan emits tuned terrain, path, focal tree, grass system, wind, postprocess, performance, stats
  -> renderer.render(enhancedPlan)
  -> renderer builds or reuses topology cache
  -> renderer returns aggregate snapshot
  -> GameHost exposes aggregate render snapshot
```

## Render gaps

```txt
no render expectation rows
no renderer snapshot normalizer
no descriptor-level consumed / ignored / unsupported / fallback rows
primitiveFallbackCount is not tied back to descriptor ids or classes
postProcess descriptors are not proven against renderer output
wind descriptors are not proven against shader uniform/readback rows
GameHost exposes aggregate render readback, not row-level proof
headless editor sees renderer state but not proof status rows
```

## Next proof rows

```txt
RenderExpectationRow
RendererSnapshotRow
RenderConsumptionRow
RendererFallbackRow
PostProcessConsumptionRow
WindConsumptionRow
GameHostRenderProofRow
EditorRenderObservationRow
```

## Deferral

Do not replace the renderer or start a visual-fidelity pass until render consumption rows are fixture-proven.
