# Next Steps

**Updated:** `2026-07-16T05-58-36-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `authored-content-graph-referential-integrity-authority-audited`

## Summary

Create one generated content graph before enabling exploration progression. Keep authored scene, target, objective and story modules separate, but admit them together through typed registries, reference checks, reachability analysis and a stable graph digest.

## Plan ledger

**Goal:** create the smallest reliable path from authored modules to one accepted gameplay-capable content generation.

### Schema and identity

- [ ] Define `ContentGeneration`, `ContentGraphDescriptor` and `ContentGraphDigest`.
- [ ] Define typed schemas for scene, target, objective, story beat, action, trigger and initial-state nodes.
- [ ] Create independent typed ID registries.
- [ ] Reject missing, empty and duplicate IDs.

### Reference resolution

- [ ] Resolve initial scene, objective and story references.
- [ ] Resolve objective target and action references.
- [ ] Parse story trigger expressions.
- [ ] Resolve trigger actions and optional target IDs.
- [ ] Validate completion predicates against target and action types.

### Reachability and adoption

- [ ] Compute required progression reachability from initial state.
- [ ] Distinguish required from optional unreachable content.
- [ ] Publish `ContentGraphAdmissionResult` before game-state creation.
- [ ] Bind gameplay, diagnostics, save eligibility and rendering to the accepted generation.
- [ ] Reject late work from retired content generations.

### Editor mutation

- [ ] Convert editor changes into detached `ContentMutationCommand` candidates.
- [ ] Revalidate the complete successor graph.
- [ ] Preserve the predecessor on failure.
- [ ] Publish stable accepted, rejected, stale and duplicate results.

### Evidence

- [ ] Add duplicate-ID and unknown-reference fixtures.
- [ ] Add malformed-trigger and unreachable-content fixtures.
- [ ] Add editor mutation predecessor-preservation fixtures.
- [ ] Compare source, artifact and Pages graph digests.
- [ ] Publish `FirstContentBoundGameplayFrameAck`.

## Required result

```txt
ContentGraphAdmissionResult {
  contentGeneration
  contentGraphDigest
  manifestRevision
  sceneIds
  targetIds
  objectiveIds
  storyBeatIds
  actionIds
  resolvedEdgeCount
  unreachableNodeIds
  status
  reason
}
```

## Preserved dependencies

Release/cache coherence, renderer identity, accessibility, audio, shader admission, editor command settlement, post-processing, startup readiness, reset/replay, DSK admission, observation provenance, cache coherence, viewport, WebGL recovery, frame scheduling, progression, grass visibility and persistence remain separate bounded work.