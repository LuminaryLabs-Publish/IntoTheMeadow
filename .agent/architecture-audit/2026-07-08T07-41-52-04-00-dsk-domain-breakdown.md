# Architecture Audit — DSK Domain Breakdown

**Timestamp:** `2026-07-08T07:41:52-04:00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Intent

Map the current `IntoTheMeadow` source into domain-kit boundaries so the next implementation can add proof without turning the publish repo into a generic renderer kit foundry.

## Current composition

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> src/game/create-into-the-meadow-game.js
  -> src/game/enhance-render-plan.js
  -> external meadow-area-kit
  -> external meadow-webgl-render-kit
```

## Domain map

### Static shell domain

```txt
surface: index.html
owns:
  - page metadata
  - canvas element
  - small debug HUD surface
  - loading/error text
  - module boot script path
services:
  - route-load
  - canvas-host
  - loading-message
```

### Boot domain

```txt
surface: src/boot/boot-game.js
owns:
  - DOM lookup
  - debug flag parsing
  - web-host start call
  - boot failure projection
services:
  - locate-canvas
  - locate-debug-surfaces
  - start-host
  - report-boot-error
```

### Web host domain

```txt
surface: src/hosts/web-host.js
owns:
  - external kit imports
  - game creation
  - renderer creation
  - frame loop
  - render plan enhancement handoff
  - GameHost exposure
services:
  - load-external-kits
  - create-game
  - create-renderer
  - run-frame-loop
  - render-frame
  - expose-host-diagnostics
```

### Game authority domain

```txt
surface: src/game/create-into-the-meadow-game.js
owns:
  - manifest binding
  - content binding
  - local DSK install
  - meadow-area kit bridge
  - state root
  - snapshot root
  - diagnostics root
services:
  - create-game
  - create-render-plan
  - tick
  - reset
  - get-state
  - get-snapshot
  - get-diagnostics
```

### State domain

```txt
surface: src/game/game-state.js
owns:
  - frame
  - activeSceneId
  - activeSessionId
  - player position/yaw/pitch/pathProgress
  - world wind state
  - active objective/story beat ids
services:
  - create-initial-state
  - advance-frame-state
```

Current limitation:

```txt
advanceGameState() only increments frame and stores lastTick.
```

Target extension:

```txt
game.tick({ time, dt, actions })
  -> normalize ActionFrame
  -> apply path-progress reducer
  -> apply inspect reducer
  -> resolve objective completion
  -> append ActionResult journal
  -> project snapshot.gameplay
```

### Snapshot domain

```txt
surface: src/game/game-snapshot.js
owns:
  - build projection
  - manifest projection
  - state projection
  - renderPlan projection
  - diagnostics projection
services:
  - create-game-snapshot
  - validate-game-snapshot
```

Target extension:

```txt
snapshot.renderParity
snapshot.gameplay
```

### Render enhancement domain

```txt
surface: src/game/enhance-render-plan.js
owns:
  - outline policy
  - focal tree enhancement
  - clutter reduction
  - wind metadata
  - post-process metadata
  - texture-driven grass system
  - render stats
services:
  - reduce-tiny-clutter
  - with-outline-policy
  - create-grass-system
  - enhance-render-plan
```

### Renderer parity proof domain

```txt
surface: planned src/render-parity/*
owns:
  - expected descriptor collection
  - renderer snapshot normalization
  - consumed/unconsumed/unsupported comparison
  - stable reason catalog
  - DOM-free fixture cases
services:
  - collect-expected-render-descriptors
  - normalize-renderer-snapshot-consumption
  - compare-render-descriptor-parity
  - classify-render-descriptor-status
  - project-render-parity-to-GameHost
```

### Gameplay authority proof domain

```txt
surface: planned src/gameplay-authority/*
owns:
  - ActionFrame
  - ActionBatch
  - ActionResult
  - reducer journal
  - stable rejection reasons
  - objective completion records
services:
  - normalize-action-frame
  - reduce-path-progress-action
  - reduce-inspect-action
  - resolve-objective-completion
  - emit-action-result
  - create-gameplay-snapshot
  - replay-action-fixture
```

## Kit classification

### External reusable kits

```txt
meadow-area-kit
meadow-webgl-render-kit
```

### Active local implementation kits

```txt
grass-density-texture-kit
grass-clump-archetype-kit
grass-static-batch-kit
grass-patch-placement-kit
grass-clump-instancing-render-kit
grass-shader-wind-kit
grass-lod-policy-kit
grass-density-scaling-kit
grass-debug-visualization-kit
wind-field-dsk
tree-object-dsk
meadow-performance-dsk
post-process-stack-dsk
```

### Next-cut proof kits

```txt
renderer-descriptor-expectation-kit
renderer-snapshot-consumption-kit
renderer-descriptor-consumption-kit
renderer-unsupported-descriptor-reason-kit
renderer-parity-report-kit
gamehost-render-parity-diagnostics-kit
action-frame-kit
action-result-kit
path-progress-reducer-kit
inspect-target-reducer-kit
objective-completion-reducer-kit
gameplay-snapshot-kit
```

## Boundary rule

`IntoTheMeadow` may own fixture proof and game-specific composition.

Reusable renderer implementation should move back to `LuminaryLabs-Agents/NexusRealtime-ProtoKits` after the publish repo proves what the renderer must consume.