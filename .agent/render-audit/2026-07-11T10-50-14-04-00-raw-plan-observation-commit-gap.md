# Raw Render Observation and Commit Gap

**Timestamp:** `2026-07-11T10-50-14-04-00`

## Current path

```txt
GameHost.getRenderPlan
  -> returns lastPlan or enhancer output

GameHost.getRenderSnapshot
  -> returns lastRender or renderer snapshot

NexusEditorEnvironment
  -> scene.getRenderPlan
  -> renderer.getSnapshot
  -> renderer.capture
```

## Gap

The public read surface has no observation revision or shared commit identity connecting:

```txt
game state frame
source plan
source topology key
enhanced topology key
mesh build
GPU buffer generation
renderer result
canvas pixels
```

The raw `game` reference also exposes `rebuildRenderPlan()`. A caller can rebuild source lineage without entering a render transaction or invalidating the enhancer and renderer through one authoritative command.

## Required render observation

```js
{
  observationRevision: 17,
  sessionId: "arrival-meadow:session-0",
  stateFrame: 12,
  sourcePlanId: "arrival-meadow",
  sourceRevision: 3,
  sourceTopologyKey: "...",
  enhancedTopologyKey: "...",
  meshGeneration: 2,
  gpuBufferGeneration: 2,
  renderCommitId: "render-0017",
  canvasFingerprint: null
}
```

## Required proof

```txt
read APIs cannot mutate renderer or plan state
rebuild enters one admitted capability transaction
failed rebuild preserves the prior committed observation
renderer observations are clone-safe
one accepted visible mutation reaches one renderCommitId
canvas capture identifies the same commit
old-session observations are marked stale
```

This gate composes with the existing Render Topology Identity and Committed Frame Observation audits.