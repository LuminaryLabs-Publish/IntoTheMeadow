# Interaction Audit: Target Action Preflight Fixture

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T03-01-42-04-00`

## Current interaction surface

The runtime has source descriptors for interaction targets and a headless editor bridge for command reachability.

```txt
ARRIVAL_INTERACTION_TARGETS
  -> focal-tree / inspect
  -> arrival-path / path-progress

NexusEditorEnvironment
  -> runtime.*
  -> scene.*
  -> renderer.*
  -> browser.*
```

There is not yet an in-game interaction reducer that resolves target/action requests into typed results.

## Current bridge capabilities

```txt
runtime.status
runtime.getState
runtime.getSnapshot
runtime.tick
runtime.reset
scene.getRenderPlan
scene.getStatistics
renderer.getSnapshot
renderer.getEnhancerSnapshot
renderer.capture
browser.getViewport
browser.getErrors
```

These prove bridge presence and readback shape, but not gameplay interaction semantics.

## Preflight gaps

```txt
no target lookup helper
no action compatibility check
no distance/radius check
no action status
no stable rejection reason
no objective relation row
no interaction fixture rows
no GameHost interaction proof projection
no headless editor observation row for target/action proof
```

## Proposed fixture rows

```txt
preflight.focal-tree.inspect.accepted
preflight.focal-tree.path-progress.rejected
preflight.arrival-path.path-progress.accepted
preflight.arrival-path.inspect.rejected
preflight.missing-target.rejected
preflight.unknown-action.rejected
preflight.completed-objective.skipped
```

## Next safe cut

Build `target-action-preflight` and `action-result` as pure modules first. Only after rows pass should browser input or editor command shims invoke them.

## Deferral boundary

Do not add pointer, keyboard, camera, or route interaction wiring in this slice. Keep the next implementation DOM-free until preflight and result rows are proven.
