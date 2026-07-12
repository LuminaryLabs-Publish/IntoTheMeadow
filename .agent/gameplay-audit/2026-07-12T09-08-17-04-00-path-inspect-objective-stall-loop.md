# Path, Inspect and Objective Stall Loop

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T09-08-17-04-00`

## Summary

The authored arrival sequence cannot advance. The player begins with `walk-the-path`, but no runtime path-progress mutation exists. The later `inspect-tree` objective and its story beat are therefore unreachable through normal runtime operations.

## Plan ledger

**Goal:** document the gameplay stall and define deterministic completion semantics.

- [x] Trace initial player and progression state.
- [x] Trace authored objective thresholds and interaction targets.
- [x] Trace frame and editor mutation paths.
- [x] Identify unreachable progression states.
- [ ] Implement progression only through typed commands and atomic results.

## Current authored sequence

```txt
initial:
  active objective = walk-the-path
  player.pathProgress = 0
  story beats = [arrival]

expected:
  pathProgress >= 0.25
    -> commit path-discovery story beat

  pathProgress >= 0.35
    -> complete walk-the-path
    -> select inspect-tree

  inspect focal-tree
    -> complete inspect-tree
    -> commit focal-tree story beat
```

## Actual runtime sequence

```txt
frame 0
  pathProgress = 0
  activeObjectiveId = walk-the-path

frame N
  frame counter increments
  lastTick changes
  pathProgress remains 0
  activeObjectiveId remains walk-the-path
  completedObjectiveIds remains []
  storyBeatIds remains [arrival]
```

## Root causes

```txt
no movement command
no path sampler or path-progress evidence
no inspect command
no target proximity/admission result
no objective evaluator
no successor-objective policy
no story-trigger parser/evaluator
no completion/story deduplication
no progression commit or rollback
no gameplay feedback projection
```

## Failure modes after partial implementation

```txt
frame-rate-dependent progress if path progress is added directly to RAF dt
client/editor divergence if editor writes state directly
objective skipping if inspect-tree can complete before walk-the-path
story duplication if trigger evaluation is not idempotent
stale completion after reset without reset generation
partial state if objective commits but story/UI preparation fails
unbounded repeated events if completion is evaluated every frame
```

## Required gameplay invariants

```txt
one command has one immutable identity
one target resolves canonically under one target revision
path progress is monotonic within a session unless reset policy says otherwise
objective completion is idempotent
completed objectives cannot reactivate without an explicit reset/new-run policy
story beats commit at most once per story revision
successor selection is deterministic
reset rejects all predecessor-generation commands
state, feedback and journals commit atomically
```

## Acceptance scenarios

```txt
progress 0.24 -> no path-discovery and no objective completion
progress 0.25 -> path-discovery commits once
progress 0.34 -> walk-the-path remains active
progress 0.35 -> walk-the-path completes once
inspect focal-tree before successor activation -> typed rejection or declared optional policy
inspect focal-tree out of range -> typed rejection
inspect focal-tree in range -> inspect-tree and focal-tree story commit once
repeat same commandId -> duplicate result without mutation
reset -> exact baseline progression state
```

## Claim boundary

Authored JSON-like descriptors are content, not gameplay. The arrival loop becomes playable only when action evidence can deterministically mutate progression and produce visible, testable results.