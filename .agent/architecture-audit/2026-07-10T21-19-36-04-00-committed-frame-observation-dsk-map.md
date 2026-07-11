# Committed Frame Observation DSK Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-10T21-19-36-04-00`

## Current ownership map

```txt
web-host
  owns RAF callback and mutable lastPlan/lastRender fields

game-state
  owns simulation frame and lastTick

game
  owns cached source plan and reset

render-plan enhancer
  owns topology-derived enhanced-plan cache

WebGL renderer
  owns mesh/buffer cache and latest renderer snapshot

GameHost
  exposes live state and separately sourced snapshots

editor bridge
  invokes tick/reset and reads state/plan/render/canvas independently
```

No owner composes these into one transaction.

## Current phase graph

```txt
RAF request
  -> mutate game state
  -> derive raw plan
  -> enhance plan
  -> publish lastPlan
  -> resize / ensure mesh / draw outline / draw color
  -> publish renderer snapshot
  -> publish lastRender
  -> HUD projection
```

## Missing domain

```txt
committed-frame-authority-domain
```

Responsibilities:

```txt
allocate frame request sequence
capture state-before
stage simulation result
stage source/enhanced plan observations
submit renderer
reject failed or stale stages
commit one immutable row
retain previous successful row on failure
publish bounded success/failure journals
serve HUD/GameHost/editor projections
```

## Proposed kit map

```txt
committed-frame-authority-domain
  -> frame-request-kit
  -> frame-staging-kit
  -> state-fingerprint-kit
  -> plan-fingerprint-kit
  -> render-consumption-row-kit
  -> frame-commit-kit
  -> frame-journal-kit
  -> frame-failure-row-kit
  -> GameHost-frame-observation-kit
  -> headless-editor-frame-capability-kit
  -> frame-fixture-adapter-kit
```

Reuse existing owners for:

```txt
session/lifecycle ownership
source provider provenance
render-plan topology
renderer draw statistics
canvas capture
```

Do not create a second renderer, game state, source provider, or editor protocol.

## Contract boundary

```txt
prepare(request)
  -> staged frame

submit(staged)
  -> renderer result or failure

commit(staged, renderer result)
  -> immutable committed frame

publish(committed frame)
  -> HUD / GameHost / editor / capture metadata
```

Only `commit()` may advance public frame observations.
