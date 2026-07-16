# Architecture Audit: Authored Content Graph DSK Map

**Timestamp:** `2026-07-16T05-58-36-04-00`

## Summary

Authored scenes, targets, objectives, story beats and initial state are separate source modules connected by untyped string references. Existing validation proves DSK descriptor shape and render-plan validity, not content-graph integrity.

## Plan ledger

**Goal:** define a bounded parent domain that validates authored references without absorbing story, objective, interaction, editor or renderer ownership.

- [x] Identify current content nodes and reference edges.
- [x] Map existing DSK ownership.
- [x] Define parent authority, inputs, outputs and invariants.
- [x] Preserve renderer and gameplay boundaries.
- [ ] Implement after executable progression services exist.

## Existing bounded ownership

```txt
into-the-meadow-game-dsk -> manifest, root state, boot, snapshot
meadow-area-bridge-dsk   -> area config and provider adapter
path-corridor-dsk        -> path identity and progression service declaration
meadow-input-dsk         -> action vocabulary and bindings declaration
meadow-interaction-dsk   -> target registry and interaction events declaration
meadow-objective-dsk     -> objective records and completion ledger declaration
meadow-story-dsk         -> story beats and sequence declaration
meadow-ui-dsk            -> feedback projection declaration
meadow-save-dsk          -> persistence and migration declaration
meadow-diagnostics-dsk   -> runtime and proof reporting declaration
```

## Missing parent

`meadow-authored-content-graph-referential-integrity-authority-domain`

It owns content generation identity, schema admission, ID uniqueness, reference resolution, trigger parsing, reachability, digest publication and stale-generation rejection. It does not own authored prose, movement, interaction execution, objective settlement, story sequencing, UI rendering or storage.

## Dependency direction

```txt
authored source modules or editor mutation
  -> node schema admission
  -> typed ID registries
  -> trigger parsing and capability resolution
  -> objective/target and story/scene reference resolution
  -> initial-state reference resolution
  -> reachability analysis
  -> immutable ContentGraphDigest
  -> ContentGraphAdmissionResult
  -> gameplay state creation
  -> visible frame acknowledgement
```

## Required result

```txt
ContentGraphAdmissionResult {
  contentGeneration
  contentGraphDigest
  manifestRevision
  sceneIds[]
  targetIds[]
  objectiveIds[]
  storyBeatIds[]
  actionIds[]
  triggerIds[]
  resolvedEdgeCount
  unreachableNodeIds[]
  status
  reason
}
```

## Invariants

```txt
all IDs are unique within their namespace
all initial-state IDs resolve
all objective target IDs and action IDs resolve
all story scene IDs resolve
all trigger expressions parse and use supported capabilities
no accepted required node is unreachable
editor mutations cannot publish before graph admission
retired content generations cannot mutate gameplay
visible acknowledgement cites the accepted graph digest
```

## Boundary

Documentation only. Existing 44 kit surfaces and their declared services are unchanged.