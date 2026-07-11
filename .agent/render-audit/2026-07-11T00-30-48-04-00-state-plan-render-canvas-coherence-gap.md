# State, Plan, Render, and Canvas Coherence Gap

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-11T00-30-48-04-00`

## Current browser order

```txt
game.tick
rawPlan = game.getRenderPlan(time)
plan = enhancer.enhance(rawPlan)
lastPlan = plan
lastRender = renderer.render(plan)
HUD update
```

`lastPlan` is published before renderer success. The game state changes before both plan and renderer success.

## Failure matrix

```txt
failure after game.tick:
  state may be new
  raw plan may not exist
  lastPlan and lastRender remain previous

failure after lastPlan assignment:
  state is new
  lastPlan is new
  lastRender is previous
  canvas may be previous or partially modified

success:
  state, plan, render, and canvas are likely aligned
  but no shared identity proves alignment
```

## Renderer readback limits

The renderer snapshot exposes:

```txt
planId
schema
topologyKey
vertex and triangle counts
descriptor counts
cache counters
postprocess mode
validation
```

It does not expose:

```txt
sessionId
runId
frameRequestId
committedFrameId
requested time
state fingerprint
plan fingerprint
render fingerprint
canvas commit ID
draw-pass completion rows
```

## Required render result

```txt
{
  frameRequestId,
  planId,
  planFingerprint,
  topologyKey,
  viewport,
  outlinePass: "completed",
  colorPass: "completed",
  vertexCount,
  triangleCount,
  cacheState,
  completedAt
}
```

## Required canvas acknowledgement

```txt
{
  frameRequestId,
  canvasCommitId,
  width,
  height,
  drawingBufferWidth,
  drawingBufferHeight,
  acknowledgedAt
}
```

Only after both renderer result and canvas acknowledgement succeed may frame authority publish a committed frame.
