# Interaction Audit: Target Action Preflight Result Map

**Timestamp:** `2026-07-10T10-49-23-04-00`

## Current interaction sources

```txt
ARRIVAL_INTERACTION_TARGETS
ARRIVAL_OBJECTIVES
STORY_BEATS
GameHost aggregate state
NexusEditorEnvironment runtime commands
```

## Current interaction read

The route has interaction-target and objective source descriptors, but browser interaction is not yet expressed as stable command/result rows.

## Missing preflight/result cases

```txt
target found and action supported
target found and action unsupported
target missing
path-progress below threshold
path-progress completes objective
inspect focal tree accepted
inspect repeated / unchanged
unknown action rejected
objective progress emitted
objective already complete skipped
```

## Next target

Add a `target-action-preflight` helper and `action-result` helper that can be run without DOM input, then project rows into `GameHost` and headless editor proof observations.
