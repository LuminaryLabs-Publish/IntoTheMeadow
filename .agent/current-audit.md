# Current Audit: Authored Content Graph Referential Integrity

**Updated:** `2026-07-16T05-58-36-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `authored-content-graph-referential-integrity-authority-audited`  
**Immediate predecessor:** `static-module-graph-release-revision-cache-coherence-authority-central-reconciled`

## Summary

The authored scene, objective, interaction-target, story-beat and initial-state modules currently agree through string IDs, but that agreement is not validated as one graph. Existing startup diagnostics validate DSK descriptor structure and render-plan validity, then only count authored records.

## Plan ledger

**Goal:** bind all authored content references to one accepted generation before game-state creation, editor publication or visible gameplay proof.

- [x] Compare Publish inventory and central tracking.
- [x] Select only IntoTheMeadow by oldest synchronized timestamp.
- [x] Read all relevant content, state, DSK, diagnostics and host surfaces.
- [x] Preserve all 44 kit surfaces and services.
- [x] Add the timestamped content-graph audit family.
- [x] Change documentation only on `main`.
- [ ] Implement the authority and fixtures later.

## Main finding

```txt
initial state scene: arrival-meadow
initial objective: walk-the-path
initial story beat: arrival
objective targets: arrival-path, focal-tree
objective actions: path-progress, inspect
story triggers: scene-start, path-progress:0.25, inspect:focal-tree
interaction targets: arrival-path, focal-tree
```

These records currently align, but there is no:

```txt
ContentGeneration
ContentGraphDescriptor
ContentGraphDigest
typed scene/target/objective/story/action registries
trigger parser and capability registry
duplicate-ID rejection
unknown-reference rejection
required-node reachability analysis
editor mutation admission
ContentGraphAdmissionResult
FirstContentBoundGameplayFrameAck
```

## Current validation gap

`validateLocalDsks()` checks descriptor IDs and service counts. `getDiagnostics()` combines DSK and render-plan failures, then reports content counts. Neither surface validates content node schema, reference edges or reachability.

## Required parent domain

`meadow-authored-content-graph-referential-integrity-authority-domain`

## Required transaction

```txt
ContentGraphAdmissionCommand
  -> bind manifest, source and editor generations
  -> parse typed content nodes and triggers
  -> enforce unique IDs
  -> resolve every required reference
  -> analyze required reachability
  -> compute ContentGraphDigest
  -> publish ContentGraphAdmissionResult
  -> create initial game state from the accepted generation
  -> acknowledge FirstContentBoundGameplayFrameAck
```

## Boundary

Documentation only. No authored content, runtime, renderer, editor, package, test, workflow or deployment behavior changed.