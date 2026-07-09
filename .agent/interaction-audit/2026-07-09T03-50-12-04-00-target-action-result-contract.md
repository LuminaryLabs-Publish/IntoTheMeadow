# Interaction Audit — Target Action Result Contract

**Timestamp:** `2026-07-09T03-50-12-04-00`

## Current interaction source

The interaction target content is the source anchor for the first non-tick gameplay behavior.

The first target/action seam is:

```txt
arrival-path -> path-progress
focal-tree -> inspect
```

## Current gap

Interaction targets exist as descriptors, but there is no reducer that turns a target/action pair into an explicit result.

This means the game can describe interactions without proving:

```txt
accepted action
rejected action
unknown target
wrong action for target
objective completion
no mutation on rejection
```

## Required interaction contract

```txt
TargetActionRequest {
  id
  type
  targetId
  payload
}

TargetActionResult {
  id
  requestId
  type
  targetId
  accepted
  reason
  stateChanged
  objectiveEffects[]
}
```

## Required fixture rows

```txt
path-progress / arrival-path / valid progress -> accepted
path-progress / arrival-path / invalid progress -> rejected invalid-progress
inspect / focal-tree -> accepted
inspect / unknown-target -> rejected unknown-target
path-progress / focal-tree -> rejected wrong-action-for-target
rejected actions produce no state mutation
```

## Implementation order

```txt
create action frame contract
normalize request rows
validate target/action pairs
produce TargetActionResult
apply accepted reducer mutations
project objective effects
write DOM-free fixture rows
```

## Non-goal

Do not add clickable browser input before the target/action reducer and fixture rows exist.
