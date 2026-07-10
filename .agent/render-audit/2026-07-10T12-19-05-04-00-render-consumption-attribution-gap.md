# Render Audit: Render Consumption Attribution Gap

**Timestamp:** `2026-07-10T12-19-05-04-00`

## Current render path

```txt
raw meadow render plan
  -> enhanceRenderPlan
  -> grassSystem / windField / postProcess / performance / stats descriptors
  -> meadow-webgl-renderer-v2-compatible
  -> meadow-webgl-renderer-v2
  -> renderer.render(plan)
  -> aggregate renderer snapshot
  -> GameHost.getRenderSnapshot()
```

## Current gap

```txt
descriptorCounts are aggregate
primitiveFallbackCount is aggregate
cache state is aggregate
topology rebuild/cache hit counts are aggregate
postProcess facts are aggregate
no source object id to consumer decision row
no unsupported/fallback attribution row per descriptor
no normalized renderer snapshot row
```

## Required row shape

```txt
RenderConsumptionRow {
  rowId
  sourceDescriptorId
  sourceDescriptorType
  expectedConsumer
  consumer
  status
  reason
  fallbackClass
  topologyKey
  renderFrameId
  snapshotHash
}
```

## Recommendation

Do not replace renderer v2. Normalize its current aggregate snapshot into source-owned proof rows, then fixture-test the rows before any visual fidelity work.
