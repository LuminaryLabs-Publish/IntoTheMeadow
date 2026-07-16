# Render Audit: Mixed Release Visible-Frame Gap

**Timestamp:** `2026-07-16T01:38:56-04:00`  
**Status:** `static-module-graph-release-revision-cache-coherence-authority-audited`

## Plan ledger

**Goal:** bind every visible WebGL frame to one accepted static-module release generation.

- [x] Trace the HTML-to-renderer import chain.
- [x] Record query-version and unversioned edges.
- [x] Record the immutable external provider edge.
- [x] Identify missing release-bound frame evidence.
- [ ] Execute browser cache fixtures later.

## Observed import chain

```txt
index.html
  -> boot-game.js?v=0.3.0-headless-editor
  -> web-host.js?v=0.3.0-headless-editor
     -> game-manifest.js
     -> create-into-the-meadow-game.js
     -> expose-game-host.js
     -> enhance-render-plan.js
     -> meadow-webgl-renderer-v2-compatible.js?v=0.3.0-headless-editor
        -> meadow-webgl-renderer-v2.js?v=0.2.1-shader-precision
     -> install-editor-bridge.js?v=0.3.0-headless-editor
```

## Gap

The renderer can produce a valid visible frame while no result states which content revisions were actually used for all transitive modules. `GAME_MANIFEST.build` identifies a logical build, but the running module graph is not attested to that build.

## Missing visible-frame evidence

```txt
ReleaseGeneration: absent
resolved module graph snapshot: absent
per-module content digest: absent
renderer compatibility membership receipt: absent
mixed-generation rejection: absent
artifact digest: absent
Pages deployment revision: absent
FirstReleaseBoundFrameAck: absent
```

## Required acknowledgement

```txt
FirstReleaseBoundFrameAck {
  releaseGeneration
  frameRevision
  manifestBuild
  moduleGraphDigest
  rendererGeneration
  deploymentRevision
  presented
}
```

## Boundary

No visible corruption, shader failure or stale resource was reproduced. The finding is that current source and proof surfaces cannot attribute a presented frame to one complete release graph.
