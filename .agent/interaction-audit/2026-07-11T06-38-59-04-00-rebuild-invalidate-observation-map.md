# Rebuild, Invalidation, and Observation Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T06-38-59-04-00`

## Current public surfaces

```txt
GameHost.getRenderPlan()
GameHost.getRenderSnapshot()
GameHost.getRenderEnhancerSnapshot()
GameHost.getSnapshot()
GameHost.game

NexusEditorEnvironment scene.getRenderPlan
NexusEditorEnvironment scene.getStatistics
NexusEditorEnvironment renderer.getSnapshot
NexusEditorEnvironment renderer.getEnhancerSnapshot
NexusEditorEnvironment renderer.capture
NexusEditorEnvironment runtime.tick
NexusEditorEnvironment runtime.reset
```

## Current write surface

The raw game object exposes:

```txt
game.rebuildRenderPlan()
planEnhancer.invalidate()
renderer.dispose()
```

These are mutable owners, not typed editor capabilities.

No public transaction coordinates them.

## Missing interaction contract

```txt
render.rebuildSource
render.invalidateCache
render.getLineage
render.getCacheJournal
render.assertCurrentSource
render.getBufferGeneration
render.runMutationFixture
```

## Required rebuild command

```js
{
  id: "render-command-0001",
  sessionId: "arrival-meadow:session-0",
  action: "rebuild-source" | "invalidate-cache",
  expectedSourceRevision: 3,
  reason: "provider-reset" | "editor-change" | "quality-change" | "manual-debug",
  payload: {}
}
```

## Required result

```js
{
  commandId: "render-command-0001",
  status: "accepted" | "rejected" | "duplicate" | "stale" | "failed",
  reason: "ok" | "revision-conflict" | "invalid-source" | "unsupported-change" | "disposed",
  sourceRevisionBefore: 3,
  sourceRevisionAfter: 4,
  cacheAdmission: "hit" | "rebuild" | "invalidated",
  sourceKey: "...",
  topologyKey: "...",
  meshKey: "...",
  bufferGeneration: 8,
  committedFrameId: 105,
  changedFields: [],
  journalSequence: 22
}
```

## Admission rules

```txt
unknown actions are rejected
stale session IDs are rejected
unexpected source revisions are rejected
invalid source plans never mutate admitted cache state
duplicate command IDs never repeat rebuilds
manual invalidation is explicit and journaled
one accepted rebuild produces at most one enhancer rebuild and one GPU generation
failure preserves the last successfully committed visible frame
```

## Observation rules

```txt
GameHost returns clone-safe lineage, not mutable owners, as proof
editor capabilities return typed results
capture includes sourceRevision, topologyKey, meshKey, bufferGeneration, and committedFrameId
lastPlan and lastRender are published only after successful render
errors include the failed stage and candidate identities
journals are bounded
```

## Current mismatch risk

```txt
rebuildRenderPlan returns new raw plan
GameHost.getRenderPlan can still return last enhanced plan
renderer snapshot can still describe prior topology
canvas can still show prior GPU buffers
no shared revision proves which one is current
```

## Future interaction dependency

The authored path and inspect commands should not publish visual feedback until the render consumer can acknowledge the source or state revision that generated the visible frame.