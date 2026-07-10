# Render Audit: Renderer V2 Consumption Proof Gap

**Timestamp:** `2026-07-09T22-40-25-04-00`

## Current render loop

```txt
raw render plan
  -> createRenderPlanEnhancer().enhance(rawPlan)
  -> createMeadowRenderPlanV2(...)
  -> createMeadowWebglRendererV2().render(plan)
  -> buildMeadowMeshData(plan)
  -> bind buffers when topologyKey changes
  -> draw outline pass
  -> draw main cel/fog pass
  -> return renderer snapshot
```

## Current renderer readback

`meadow-webgl-renderer-v2` returns a snapshot with:

```txt
id
version
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

The renderer readback exists, but it is still aggregate readback.

No ledger row says:

```txt
source descriptor id
source descriptor type
expected consumer
actual consumer
consumed / ignored / unsupported / fallback
renderer evidence
reason
```

## High-risk blind spots

```txt
postProcess descriptors report through plan, but renderer snapshot says postProcessMode inline-cel-fog.
grass descriptors are aggregated through descriptorCounts, not row-proven.
primitiveFallbackCount is visible, but not tied back to descriptor ids.
renderer validation mirrors contract validation, not consumer parity.
GameHost exposes render snapshots, but not normalized proof rows.
```

## Required next kits

```txt
render-expectation-row-kit
renderer-snapshot-normalizer-kit
render-consumption-ledger-kit
gamehost-render-proof-kit
```

## Do not do next

```txt
renderer replacement
new shaders
visual fidelity pass
new meadow objects
external kit migration
```

## Next validation target

```txt
node tests/render-consumption-ledger-smoke.mjs
```
