# Render Loop Without Gameplay Commit Audit

**Timestamp:** `2026-07-10T18-22-01-04-00`

## Current frame path

```txt
requestAnimationFrame(now)
  -> game.tick({ time: now/1000, dt: 1/60 })
  -> getRenderPlan(time)
  -> planEnhancer.enhance(rawPlan)
  -> renderer.render(plan)
  -> HUD/GameHost/editor readback
```

## Finding

The renderer is fed a valid visual plan every frame, but there is no gameplay commit between input and rendering. `game.tick()` only increments a frame counter and records timing. Player position, path progress, inspected targets, active objective, and completed objectives remain unchanged.

The render loop can therefore prove visual liveness while gameplay remains inert.

## Consequences

```txt
rendered frame id is not tied to a gameplay command sequence
camera/player descriptors cannot be traced to accepted movement
path progress cannot be reconciled with a committed state mutation
tree inspection cannot be reflected in render or diagnostics
objective completion has no frame of authority
editor capture cannot state which gameplay result produced the image
```

## Required additive render observation

```txt
{
  renderFrameId,
  gameplayCommitId,
  commandSequenceRange,
  stateFingerprint,
  playerProjection,
  objectiveProjection,
  renderPlanId,
  topologyKey,
  rendererSnapshot
}
```

## Guardrails

```txt
do not move gameplay mutation into the renderer
do not infer path progress from rendered geometry
do not make objective completion dependent on HUD text
do not rebuild topology for state that only affects diagnostics
keep renderer output stable while adding commit attribution
```

## Validation gate

A fixture should dispatch a command, commit gameplay state, render or mock-consume the resulting observation, and prove the renderer snapshot references the same gameplay commit and state fingerprint. Existing visual smoke tests remain necessary but are not sufficient.