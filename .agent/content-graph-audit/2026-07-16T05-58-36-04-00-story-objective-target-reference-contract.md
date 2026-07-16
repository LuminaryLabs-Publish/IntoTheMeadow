# Content Graph Audit: Story, Objective and Target Reference Contract

**Timestamp:** `2026-07-16T05-58-36-04-00`

## Summary

The authored records currently form a small coherent graph, but that coherence is not represented as a validated product artifact. This contract defines the node types, edges, admission checks and proof outputs required before authored content becomes runtime-capable.

## Plan ledger

**Goal:** convert independent string-linked content modules into one immutable, queryable and revision-bound content graph.

- [x] Inventory node and edge types.
- [x] Define schema, reference and reachability checks.
- [x] Define graph digest and generation semantics.
- [x] Define editor mutation behavior.
- [ ] Implement and prove later.

## Node types

```txt
SceneNode
InteractionTargetNode
ObjectiveNode
StoryBeatNode
ActionNode
TriggerNode
InitialStateNode
```

## Required edges

```txt
InitialStateNode.activeSceneId -> SceneNode.id
InitialStateNode.activeObjectiveId -> ObjectiveNode.id
InitialStateNode.storyBeatIds[] -> StoryBeatNode.id
ObjectiveNode.targetId -> InteractionTargetNode.id
ObjectiveNode.requiredAction -> ActionNode.id
StoryBeatNode.sceneId -> SceneNode.id
StoryBeatNode.trigger -> TriggerNode
TriggerNode.actionId -> ActionNode.id
TriggerNode.targetId? -> InteractionTargetNode.id
```

## Admission checks

```txt
schema validity
non-empty stable IDs
namespace uniqueness
supported action vocabulary
trigger expression parseability
all required references resolved
completion predicate compatibility with action/target type
initial-state references resolved
required objective/story reachability
no impossible required cycles
stable graph digest
```

## Current checked-in graph

```txt
SceneNode: arrival-meadow
InteractionTargetNodes: arrival-path, focal-tree
ObjectiveNodes: walk-the-path, inspect-tree
StoryBeatNodes: arrival, path-discovery, focal-tree
ActionNodes inferred today: path-progress, inspect
InitialStateNode: arrival-meadow / walk-the-path / arrival
```

## Generation contract

A graph is immutable after admission. Editor changes create a detached successor candidate, rerun all checks, publish a new digest on success and leave the predecessor authoritative on failure. Gameplay, saves, diagnostics and visible-frame acknowledgements cite the accepted generation.

## Boundary

The current content records were not modified.