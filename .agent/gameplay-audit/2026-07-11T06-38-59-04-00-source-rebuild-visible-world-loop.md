# Source Rebuild to Visible World Loop

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T06-38-59-04-00`

## Current loop

```txt
create game
  -> source provider generates baseRenderPlan
  -> game caches baseRenderPlan
  -> browser frame reads time-overlay copy
  -> enhancer caches by sourceTopologyKey
  -> renderer caches by enhanced topologyKey
  -> visible world renders
```

## Explicit rebuild loop

```txt
caller invokes game.rebuildRenderPlan()
  -> provider generates a new raw plan
  -> game replaces baseRenderPlan
  -> no source revision increments
  -> no enhancer invalidation occurs
  -> no renderer invalidation occurs
  -> no result links rebuild request to a rendered frame
```

## Gameplay relevance

The current runtime is mostly static, but future interaction work will change world-facing state:

```txt
path progression can alter path feedback
inspection can alter focal-tree feedback
objective completion can alter UI and scene descriptors
quality policy can alter grass density and LOD
provider reset can alter deterministic source descriptors
editor mutation can alter materials or authored content
```

Without render identity authority, accepted gameplay or editor changes can commit to state while the visible meadow remains on an older enhanced plan and GPU generation.

## Required transaction

```txt
source rebuild or gameplay render mutation request
  -> typed request ID and session ID
  -> produce candidate raw plan
  -> validate raw contract
  -> assign source revision and fingerprint
  -> classify changed fields
  -> admit cache hit or rebuild
  -> enhance candidate
  -> validate topology and contributions
  -> build or reuse mesh
  -> upload or reuse GPU buffers
  -> render
  -> publish committed lineage result
```

## Result classes

```txt
accepted-hit
accepted-rebuild
rejected-invalid-source
rejected-unsupported-descriptor
rejected-stale-session
failed-enhancement
failed-mesh-build
failed-buffer-upload
failed-render
```

## Required state

```txt
sessionId
sourceRevision
sourceFingerprint
sourceKeySchema
sourceKey
topologyKey
meshKey
bufferGeneration
committedFrameId
lastSuccessfulRebuildRequestId
lastFailure
```

## Reset rule

A game reset that changes only gameplay state must not pretend to rebuild render topology.

A source-provider reset or authored render mutation must produce a new source revision even when deterministic content hashes to the same final topology.

## Safe implementation order

```txt
1. source revision and fingerprint
2. render-affecting field projection
3. cache admission result
4. coordinated enhancer/renderer invalidation
5. mesh contribution fingerprint
6. GPU buffer generation
7. frame lineage publication
8. gameplay and editor integration
9. mutation matrix fixtures
```