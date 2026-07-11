# Objective State and Visible Frame Gap

## Summary

The WebGL route renders a visually complete meadow, but the render contract has no progression input. Objective and interaction state cannot affect the HUD, scene, diagnostics or a committed frame because those states never mutate and are not included in render-plan identity.

## Render loop

```txt
game.tick({ time, dt })
  -> frame metadata changes
  -> getRenderPlan(time)
  -> plan enhancement
  -> renderer.render(plan)
  -> optional debug counts
```

## Missing render evidence

```txt
interaction command ID
interaction result
player path progress
inspection receipt
objective progress revision
objective completion receipt
active objective revision
story-beat transition
state/plan/render commit identity
first visible frame acknowledgement
```

## Consequence

A browser screenshot can prove that the meadow rendered, but cannot prove that the user advanced along the path, inspected the tree or completed an objective. Static rendering and editor capture may pass while gameplay remains inert.

## Required render boundary

```txt
committed GameState revision
  -> progression projection
  -> HUD/story projection
  -> render-plan observation or UI packet
  -> renderer/canvas commit
  -> FrameAcknowledgement citing progression revision
```

## Required proof

- A path-progress commit appears in diagnostics and the first committed frame.
- Tree inspection appears exactly once.
- Completion changes the projected active objective.
- Failed or stale commands do not alter render observations.
- Editor tick without render cannot masquerade as visible completion.

The existing committed-frame authority audit remains a prerequisite for this projection.
