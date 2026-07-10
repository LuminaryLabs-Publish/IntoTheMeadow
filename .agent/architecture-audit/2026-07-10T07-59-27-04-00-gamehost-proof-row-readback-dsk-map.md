# Architecture Audit: GameHost Proof Row Readback DSK Map

## Current DSK flow

```txt
GAME_MANIFEST
  -> installDsks
  -> external meadow-area-kit or local fallback source plan
  -> createIntoTheMeadowGame
  -> createRenderPlanEnhancer
  -> meadow-webgl-renderer-v2
  -> exposeGameHost
  -> installIntoTheMeadowEditorBridge
```

## Current proof boundary

The route currently proves reachability and aggregate readback:

```txt
GameHost.getState()
GameHost.getSnapshot()
GameHost.getDiagnostics()
GameHost.getRenderPlan()
GameHost.getRenderSnapshot()
GameHost.getRenderEnhancerSnapshot()
NexusEditorEnvironment.invoke(...)
```

These surfaces are useful but not yet row-level proof. They show that the route, renderer, and editor bridge are alive. They do not yet prove source descriptor consumption, fallback attribution, grass parity, accepted/rejected actions, objective progress, or editor observations as stable rows.

## Domains mapped

```txt
source: manifest, meadow config, story beats, objectives, interaction targets
DSK install: local descriptors, external meadow kit, validation snapshot
render source: raw plan, enhanced plan, contract descriptor counts, topology keys
render consumer: renderer v2, topology cache, mesh buffers, aggregate snapshot
grass: density texture, archetypes, static batches, patches, draw groups, shader wind, lod, debug
state: frame, active scene/session, player pathProgress, progression objectives
interaction: arrival-path, focal-tree, target/action preflight next
editor: runtime status, scene statistics, renderer snapshot, capture, viewport, errors
GameHost: aggregate debug surface, planned proof projection
central: repo-local .agent and LuminaryLabs-Dev ledger sync
```

## Main gap

`advanceGameState()` only increments `frame` and `lastTick`. `enhanceRenderPlan()` emits rich descriptors, but the renderer snapshot is not normalized into source-owned proof rows. The editor bridge can inspect runtime and renderer state, but no editor-proof ledger ties command observations back to render, grass, or gameplay proof rows.

## Next DSK map

```txt
render expectations
  -> renderer snapshot normalizer
  -> render consumption ledger
  -> GameHost proof projection

grass descriptors
  -> grass consumption ledger
  -> GameHost proof projection

action frame
  -> target action preflight
  -> ActionResult
  -> objective progress
  -> gameplay fixture rows
  -> GameHost proof projection

NexusEditorEnvironment
  -> headless editor proof ledger
  -> fixture rows
```
