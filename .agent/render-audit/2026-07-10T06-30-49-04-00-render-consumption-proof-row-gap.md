# Render Audit: Render Consumption Proof Row Gap

**Run:** `2026-07-10T06-30-49-04-00`

## Current render path

```txt
raw meadow render plan
  -> enhanceRenderPlan
  -> createMeadowRenderPlanV2
  -> meadow-webgl-renderer-v2-compatible
  -> meadow-webgl-renderer-v2
  -> buildMeadowMeshData
  -> WebGL outline pass
  -> WebGL cel-fog pass
  -> renderer snapshot
```

## Current readback

Renderer v2 returns aggregate facts:

```txt
planId
schema
topologyKey
vertexCount
triangleCount
primitiveFallbackCount
descriptorCounts
rebuildCount
cacheHitCount
cacheState
postProcessMode
validation
```

## Gap

The aggregate snapshot does not prove each descriptor row.

Missing rows:

```txt
source object expectation
source object consumed
source object ignored
source object unsupported
source object fallback
mesh primitive fallback attribution
postprocess descriptor consumed
wind descriptor consumed
performance policy consumed
renderer cache row
```

## Next render proof files

```txt
src/render-proof/render-expectations.js
src/render-proof/renderer-snapshot-normalizer.js
src/render-proof/render-consumption-ledger.js
src/render-proof/gamehost-render-proof.js
tests/render-consumption-ledger-smoke.mjs
```

## Validation target

A passing renderer smoke is useful, but the next check must prove descriptor consumption row-by-row without a browser.
