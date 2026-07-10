# Render Audit: Render Consumption GameHost Proof Gap

## Render surface

`IntoTheMeadow` has a visual WebGL surface and a headless editor bridge.

## Current render loop

```txt
raw render plan
  -> createRenderPlanEnhancer.enhance(rawPlan)
  -> enhanced plan with grassSystem, windField, postProcess, performance, stats
  -> renderer.render(enhancedPlan)
  -> lastRender aggregate snapshot
  -> GameHost.getRenderSnapshot()
  -> editor renderer.getSnapshot command
```

## Current strengths

```txt
renderer v2 has topology cache and aggregate snapshot
render enhancer records topology/source key state
postprocess and wind descriptors are source-owned
grassSystem exposes density, patch, draw group, wind, lod, and debug descriptors
GameHost preserves legacy aggregate render readback
headless editor can ask for renderer snapshot and capture canvas
```

## Gap

The render stack has no normalized consumption ledger. It cannot answer, row by row, which source descriptors were consumed, ignored, unsupported, or fallback-rendered.

The next pass should not replace the renderer. It should add additive proof rows around the existing renderer.

## Required rows

```txt
source object expectation rows
renderer snapshot normalized rows
descriptor consumed rows
descriptor ignored rows
descriptor unsupported rows
primitive fallback attribution rows
postProcess consumed row
windField consumed row
performance policy row
GameHost render proof projection row
headless editor render observation row
```

## Next safe ledge

```txt
IntoTheMeadow GameHost Proof Row Readback Refresh + Headless Fixture Gate
```
