# Architecture Audit — DSK Cutover

**Timestamp:** `2026-07-08T02:00:12-04:00`

## Architecture intent

```txt
IntoTheMeadow owns the game.
ProtoKits own reusable meadow systems.
NexusEngine owns runtime/DSK contracts.
```

This is the correct top-level split.

The publish repo should stay focused on the playable meadow composition, proof fixtures, content, state, diagnostics, and deploy route.

## Current runtime chain

```txt
index.html
  -> src/boot/boot-game.js
    -> src/hosts/web-host.js
      -> load external kits from GAME_MANIFEST
      -> createIntoTheMeadowGame({ externalKits })
      -> createMeadowWebglRenderKit({ canvas })
      -> requestAnimationFrame(frame)
      -> game.tick({ time, dt })
      -> game.getRenderPlan(time)
      -> enhanceRenderPlan(rawPlan)
      -> renderer.render(plan)
      -> GameHost exposes state/snapshot/diagnostics/render
```

## Domain tree

```txt
IntoTheMeadow
├─ browser-shell
│  ├─ document-route
│  ├─ canvas-surface
│  ├─ debug-hud
│  └─ loading/error-surface
├─ host-runtime
│  ├─ external-kit-loader
│  ├─ request-animation-frame-loop
│  ├─ GameHost-exposure
│  └─ renderer-handoff
├─ game-authority
│  ├─ manifest-authority
│  ├─ local-dsk-install
│  ├─ deterministic-state-root
│  ├─ snapshot-contract
│  └─ diagnostics-contract
├─ meadow-content
│  ├─ arrival-area
│  ├─ path-config
│  ├─ focal-tree-config
│  ├─ terrain-style
│  ├─ story-beats
│  ├─ objectives
│  └─ interaction-targets
├─ render-plan-authority
│  ├─ external meadow-area render plan
│  ├─ local render-plan enhancement
│  ├─ grass-system descriptors
│  ├─ post-process descriptors
│  ├─ wind-field descriptors
│  ├─ performance policy
│  └─ render stats
├─ grass-system
│  ├─ density-texture-kit
│  ├─ clump-archetype-kit
│  ├─ static-batch-kit
│  ├─ patch-placement-kit
│  ├─ instancing-render-kit
│  ├─ shader-wind-kit
│  ├─ lod-policy-kit
│  ├─ density-scaling-kit
│  └─ debug-visualization-kit
└─ deploy-validation
   ├─ static-smoke
   ├─ dsk-registry-smoke
   ├─ render-plan-smoke
   ├─ deterministic-scene-smoke
   └─ GitHub Pages workflow
```

## DSK inventory

External kits:

```txt
meadow-area-kit
meadow-webgl-render-kit
```

Required active v0.1 local descriptors:

```txt
into-the-meadow-game-dsk
web-host-dsk
game-composition-dsk
meadow-area-bridge-dsk
meadow-render-host-dsk
meadow-diagnostics-dsk
meadow-performance-dsk
grass-density-texture-kit
grass-clump-archetype-kit
grass-static-batch-kit
grass-patch-placement-kit
grass-clump-instancing-render-kit
post-process-stack-dsk
static-pages-deploy-dsk
```

Larger local planned/descriptor inventory:

```txt
meadow-terrain-texture-dsk
path-corridor-dsk
grass-shader-wind-kit
grass-lod-policy-kit
grass-density-scaling-kit
grass-debug-visualization-kit
grass-patch-dsk
gpu-grass-render-dsk
wind-field-dsk
tree-object-dsk
meadow-scatter-dsk
meadow-atmosphere-dsk
meadow-player-dsk
meadow-camera-dsk
meadow-input-dsk
meadow-interaction-dsk
meadow-story-dsk
meadow-objective-dsk
meadow-ecology-dsk
meadow-audio-dsk
meadow-ui-dsk
meadow-save-dsk
render-target-kit
sobel-outline-pass-kit
color-grade-pass-kit
depth-fog-pass-kit
vignette-pass-kit
final-composite-pass-kit
```

## Services in use

Current host/game services:

```txt
locate-canvas
locate-debug-hud
locate-status-surface
locate-loading-surface
load-external-kits
start-web-host
create-game
create-renderer
expose-game-host
run-frame-loop
advance-game-state
create-game-snapshot
get-render-plan
get-diagnostics
reset-state
```

Current DSK/descriptor services:

```txt
create-dsk-descriptor
validate-local-dsks
install-dsks
external-kit-status
manifest-external-kit-url-registry
```

Current render-enhancement services:

```txt
reduce-tiny-clutter
apply-outline-policy
enhance-focal-tree
create-wind-field
create-post-process-stack
create-grass-density-texture
create-grass-clump-archetype
create-grass-static-batch
create-grass-patch-placement
create-grass-instancing-draw-groups
create-grass-shader-wind
create-grass-lod-policy
create-grass-density-scaling
create-grass-debug-summary
attach-render-stats
```

## Architecture gaps

```txt
- Game state does not yet own a full action/reducer gameplay pipeline.
- Render descriptors are ahead of renderer implementation.
- Many local DSK IDs are descriptor-level or planned, not full runtime packages.
- Reusable renderer systems should be promoted to ProtoKits when stable.
- Browser host still directly controls frame cadence and renderer handoff.
```

## Safe cutover rule

Make cutovers in dependency order:

```txt
1. prove render plan shape in IntoTheMeadow
2. update ProtoKits renderer to consume the shape
3. add screenshot/browser validation
4. add gameplay action/reducer fixtures
5. promote any reusable local utilities out of the publish repo
```