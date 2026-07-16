# Current Audit: Static Module Graph Release and Cache Coherence

**Updated:** `2026-07-16T01-38-56-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `static-module-graph-release-revision-cache-coherence-authority-audited`  
**Immediate predecessor:** `runtime-renderer-identity-manifest-proof-authority-central-reconciled`

## Summary

The static browser graph does not publish one authoritative release identity. Local modules combine current query labels, an older renderer compatibility label and unversioned relative URLs, while the manifest publishes a logical build string without an executable module graph or content digests.

## Plan ledger

**Goal:** bind the full module graph, cache policy, deployment artifact and first visible frame to one accepted release generation.

- [x] Compare Publish inventory and central tracking.
- [x] Exclude TheCavalryOfRome.
- [x] Select only IntoTheMeadow by oldest synchronized timestamp.
- [x] Read entry, boot, host, renderer wrapper, manifest and package surfaces.
- [x] Preserve all 44 kit surfaces and services.
- [x] Add the timestamped release/cache audit family.
- [x] Change documentation only and target `main`.
- [ ] Implement the authority and fixtures later.

## Main finding

```txt
manifest version: 0.3.0
manifest build: 0.3.0-headless-editor-runtime
entry and selected host query: 0.3.0-headless-editor
base renderer query: 0.2.1-shader-precision
other local imports: unversioned
external provider: immutable commit pinned
release graph descriptor: absent
per-module digests: absent
mixed-generation result: absent
FirstReleaseBoundFrameAck: absent
```

## Current proof gap

```txt
complete transitive graph manifest: absent
resolved module URL snapshot: absent
content digest set: absent
cache/revalidation policy receipt: absent
partial successor rejection: absent
predecessor preservation result: absent
artifact graph digest: absent
Pages graph digest: absent
browser reload/upgrade fixture: absent
rollback fixture: absent
```

## Required parent domain

`meadow-static-module-graph-release-cache-coherence-authority-domain`

## Required transaction

```txt
ReleaseGraphAdmissionCommand
  -> bind manifest, entry, module, provider, artifact and deployment revisions
  -> resolve one immutable ReleaseGraphDescriptor
  -> validate every module URL and digest
  -> classify compatibility modules within the accepted graph
  -> reject mixed or stale generations
  -> publish ReleaseGraphAdmissionResult
  -> create game and renderer from the accepted ReleaseGeneration
  -> acknowledge FirstReleaseBoundFrameAck
```

## Boundary

Documentation only. No runtime, HTML, query-string, manifest, package, test, workflow, cache or deployment behavior changed.
