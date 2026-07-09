# Architecture Audit — Renderer Readback Consumer Freeze DSK Map

**Timestamp:** `2026-07-09T03-38-54-04-00`

## Architecture read

`IntoTheMeadow` is currently a publish-game shell that composes external meadow kits with local DSK descriptors.

The repo is not the permanent home for reusable meadow rendering. Its useful job is to prove the route, consumer boundaries, snapshots, fixtures, and handoff seams.

## Active runtime architecture

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> GAME_MANIFEST.externalKits
  -> createIntoTheMeadowGame
  -> installDsks
  -> createMeadowAreaKit(ARRIVAL_MEADOW_CONFIG)
  -> getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> createMeadowWebglRenderKit({ canvas })
  -> renderer.render(enhancedPlan)
  -> exposeGameHost(...)
```

## Domain breakdown

```txt
browser shell:
  index route, canvas mount, loading UI, debug HUD.

web host:
  external kit loader, game factory call, renderer factory call, frame loop, GameHost exposure.

game composition:
  manifest, DSK install, content descriptors, state, snapshots, diagnostics.

meadow area bridge:
  external meadow-area kit adapter plus fallback meadow render-plan provider.

render enhancement:
  object filtering, focal tree style, outline policy, wind field, postprocess, performance policy, grass system, render stats.

grass system:
  density texture, clump archetypes, static batches, patch placement, instancing draw groups, shader wind, LOD, scaling, debug summary.

renderer consumer:
  external meadow-webgl-render-kit accepts the enhanced plan and may expose renderer snapshot/readback.

GameHost diagnostics:
  current state, snapshot, diagnostics, enhancedRenderPlan, renderer snapshot.

gameplay content:
  objectives and interaction targets define path-progress and inspect commands.

gameplay reducer target:
  missing ActionFrame, ActionResult, objective completion, action journal, and snapshot.gameplay projection.

fixture target:
  missing DOM-free render parity and gameplay replay rows.
```

## DSK / kit boundary map

```txt
external kits:
  meadow-area-kit
  meadow-webgl-render-kit

core local DSKs:
  into-the-meadow-game-dsk
  web-host-dsk
  game-composition-dsk
  meadow-area-bridge-dsk
  meadow-terrain-texture-dsk
  path-corridor-dsk
  wind-field-dsk
  tree-object-dsk
  meadow-performance-dsk
  meadow-render-host-dsk
  post-process-stack-dsk
  static-pages-deploy-dsk

grass local kits:
  grass-density-texture-kit
  grass-clump-archetype-kit
  grass-static-batch-kit
  grass-patch-placement-kit
  grass-clump-instancing-render-kit
  grass-shader-wind-kit
  grass-lod-policy-kit
  grass-density-scaling-kit
  grass-debug-visualization-kit

content descriptor kits:
  game-manifest descriptor
  arrival-meadow content descriptor
  story-beats descriptor
  arrival-objectives descriptor
  arrival-interaction-targets descriptor

next proof kits:
  render-parity-reason-kit
  expected-render-descriptor-kit
  renderer-snapshot-consumption-kit
  renderer-snapshot-absence-adapter-kit
  render-descriptor-parity-kit
  render-parity-report-kit
  grass-consumption-row-kit
  action-frame-kit
  action-result-kit
  path-progress-reducer-kit
  inspect-target-reducer-kit
  objective-completion-resolver-kit
  gameplay-snapshot-kit
  fixture-row-kit
```

## Architectural rule for next implementation

Additive proof modules should come before any visual or gameplay expansion.

Do not remove current snapshot fields.

Do not change external CDN kit URLs.

Do not replace the renderer.

Do not move reusable meadow renderer logic permanently into this publish repo.
