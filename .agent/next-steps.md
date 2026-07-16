# Next Steps

**Updated:** `2026-07-16T01-38-56-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `static-module-graph-release-revision-cache-coherence-authority-audited`

## Summary

Replace ad hoc URL query labels with one generated release graph. Keep immutable external-provider pinning, but bind every local module and compatibility wrapper to the same release generation and proof chain.

## Plan ledger

**Goal:** create the smallest reliable path from source revision to one coherent browser and Pages frame.

### Release identity

- [ ] Add `ReleaseId`, `ReleaseGeneration` and `ReleaseGraphDigest`.
- [ ] Generate one immutable `ReleaseGraphDescriptor`.
- [ ] Include the manifest build, HTML entry and all transitive local modules.
- [ ] Record compatibility-parent relationships for wrapper/base renderer modules.
- [ ] Preserve immutable external-provider commit identity.

### Module graph and cache policy

- [ ] Record each resolved module URL and content digest.
- [ ] Define HTML, mutable-entry and immutable-asset cache semantics.
- [ ] Replace hand-maintained query labels with generated release URLs or graph validation.
- [ ] Reject partial or mixed successor graphs.
- [ ] Preserve the coherent predecessor when successor admission fails.

### Runtime admission

- [ ] Publish `ReleaseGraphAdmissionResult` before game startup.
- [ ] Bind GameHost, editor bridge, renderer and diagnostics to the accepted generation.
- [ ] Reject late work from retired release generations.
- [ ] Publish `ReleaseUpgradeResult` for reload, upgrade and rollback.

### Evidence

- [ ] Add clean-cache and warm-cache browser fixtures.
- [ ] Add predecessor/successor mixed-cache fixtures.
- [ ] Add partial deploy and rollback fixtures.
- [ ] Compare source, artifact and Pages graph digests.
- [ ] Publish `FirstReleaseBoundFrameAck`.

## Required result

```txt
ReleaseGraphAdmissionResult {
  releaseId
  releaseGeneration
  manifestVersion
  buildRevision
  entryUrl
  moduleGraphDigest
  externalProviderRevisions
  cachePolicyRevision
  artifactDigest
  deploymentRevision
  status
  reason
}
```

## Preserved dependencies

Renderer identity, accessibility, audio, editor settlement, post-processing, startup readiness, reset/replay, DSK admission, observation provenance, render-cache coherence, viewport, WebGL recovery, frame scheduling, progression, grass visibility and persistence remain separate bounded work.
