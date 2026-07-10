# Architecture Audit: GameHost Proof Row Ledger DSK Map

**Timestamp:** `2026-07-10T09-28-40-04-00`

## Current architecture

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
     -> load external meadow-area-kit
     -> createIntoTheMeadowGame
     -> createMeadowWebglRendererV2
     -> createRenderPlanEnhancer
     -> exposeGameHost
     -> installIntoTheMeadowEditorBridge
  -> requestAnimationFrame loop
```

## Implemented DSKs and services

```txt
meadow-area-kit
  services: external arrival meadow render plan

fallback-meadow-area-kit
  services: fallback render plan, validation, snapshot

meadow-webgl-renderer-v2
  services: WebGL context, shader program, mesh buffer cache, topology-key rebuild, outline pass, main cel-fog pass, aggregate renderer snapshot

tree-object-dsk
  services: focal tree enhancement

wind-field-dsk
  services: wind state descriptor

meadow-performance-dsk
  services: quality budget, outline policy, performance policy

post-process-stack-dsk
  services: postprocess descriptors

grass-density-texture-kit
  services: density texture descriptor

grass-clump-archetype-kit
  services: clump card archetypes

grass-static-batch-kit
  services: static batch descriptors

grass-patch-placement-kit
  services: patch placement descriptors

grass-clump-instancing-render-kit
  services: draw groups and instance/card counts

grass-shader-wind-kit
  services: shader wind descriptor

grass-lod-policy-kit
  services: LOD policy descriptor

GameHost-diagnostics-kit
  services: getState, getSnapshot, getDiagnostics, getRenderPlan, getRenderSnapshot, getRenderEnhancerSnapshot, game reference

headless-editor-bridge-kit
  services: runtime status, tick/reset, scene stats, renderer snapshots, canvas capture, viewport/errors, command invocation
```

## Architectural blocker

The route has rich descriptors and aggregate readback, but no source-owned proof ledger.

```txt
render plan descriptors
  -> renderer aggregate snapshot
  -> missing render consumption rows

grass descriptors
  -> renderer counts
  -> missing grass parity rows

objective/interaction descriptors
  -> advanceGameState frame-only tick
  -> missing action/objective result rows

GameHost and editor bridge
  -> aggregate snapshots
  -> missing proof projection rows
```

## Next architecture cut

```txt
render expectations
  -> renderer snapshot normalizer
  -> render consumption ledger
  -> grass consumption ledger
  -> action frame/result rows
  -> objective progress rows
  -> headless editor proof ledger
  -> additive GameHost proof projection
```
