# Release Cache Audit: Module Graph Version and Cache Contract

**Timestamp:** `2026-07-16T01:38:56-04:00`  
**Status:** `static-module-graph-release-revision-cache-coherence-authority-audited`

## Plan ledger

**Goal:** replace ad hoc query labels with one verifiable release-graph and cache contract.

- [x] Record current revision labels.
- [x] Separate immutable provider pinning from local module revisioning.
- [x] Define graph, digest, cache and upgrade requirements.
- [x] Preserve compatibility-wrapper history.
- [ ] Implement and exercise later.

## Current revision surfaces

```txt
GAME_MANIFEST.version: 0.3.0
GAME_MANIFEST.build: 0.3.0-headless-editor-runtime
entry query: 0.3.0-headless-editor
host/editor/compatible-renderer query: 0.3.0-headless-editor
base renderer query: 0.2.1-shader-precision
remaining relative imports: unversioned
external meadow provider: immutable commit 11d245913ba4d30f3ce950eb5a17e1cc6e4aa1f5
```

## Contract

1. Generate one immutable `ReleaseGraphDescriptor` from source or build output.
2. Resolve every local module to one release generation and content digest.
3. Treat compatibility modules as explicit graph nodes, not hidden historical URLs.
4. Define cache semantics for HTML, mutable entry URLs and immutable digest URLs.
5. Reject execution when observed nodes do not match the accepted graph.
6. Permit upgrade only after the complete successor graph is available.
7. Preserve the predecessor when admission of the successor fails.
8. Publish artifact and Pages graph digests.
9. Acknowledge the first visible frame from the accepted graph.

## Suggested publication shape

```txt
release-manifest.json
  releaseId
  build
  entry
  modules:
    - url
      sha256
      role
      compatibilityParent
  externalProviders
  cachePolicy
  artifactDigest
```

## Boundary

This audit does not prescribe a service worker. A generated immutable manifest plus URL/digest validation may be sufficient. No cache headers or live Pages responses were measured.
