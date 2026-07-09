# Architecture Audit — RenderParity Consumer + Action Replay DSK Map

**Timestamp:** `2026-07-08T22-38-17-04-00`

## Current architecture

```txt
index.html
  -> boot-game.js
  -> web-host.js
  -> GAME_MANIFEST.externalKits
  -> external meadow-area-kit
  -> external meadow-webgl-render-kit
  -> createIntoTheMeadowGame
  -> installDsks
  -> meadow.getRenderPlan
  -> enhanceRenderPlan
  -> renderer.render
  -> exposeGameHost
```

## Domain map

| Domain | Status | Owner / source | Notes |
|---|---:|---|---|
| static route | implemented | `index.html` | Mounts canvas/HUD and loads boot script. |
| boot host | implemented | `src/boot/boot-game.js` | Resolves DOM handles and calls `startWebHost`. |
| external kit loading | implemented | `src/hosts/web-host.js` | Imports both CDN kits from `GAME_MANIFEST.externalKits`. |
| manifest authority | implemented | `src/content/game-manifest.js` | Owns route, public URL, default scene, and external kit URLs. |
| game factory | implemented | `src/game/create-into-the-meadow-game.js` | Builds game object, state, content, diagnostics, tick, reset, snapshot. |
| DSK install | implemented | `src/boot/install-dsks.js` | Tracks local/external DSK install validation. |
| meadow area render plan | implemented / external | `meadow-area-kit` | External render-plan source. |
| fallback meadow area | implemented / local | `createFallbackMeadowAreaKit` | Keeps route alive if external kit not supplied. |
| render enhancement | implemented / local | `src/game/enhance-render-plan.js` | Adds local tree, wind, postprocess, performance, outline, and grass descriptors. |
| grass system | implemented / local | grass DSK family | Density texture, archetypes, static batches, placement, instancing, wind, LOD, debug. |
| renderer host | implemented / external | `meadow-webgl-render-kit` | Receives enhanced plan. Consumption readback is not normalized. |
| GameHost projection | implemented / partial | `src/boot/expose-game-host.js` and `web-host.js` | Exposes state/snapshot/diagnostics/render plan/render snapshot. Missing renderParity/gameplay. |
| game state | implemented / partial | `src/game/game-state.js` | Tick-only reducer. No action authority yet. |
| objective descriptors | implemented / unused by reducer | `src/content/objectives/arrival-objectives.js` | Defines walk-the-path and inspect-tree. |
| interaction targets | implemented / unused by reducer | `src/content/interaction-targets/arrival-targets.js` | Defines focal-tree and arrival-path targets. |
| render parity | missing | target `src/render-parity/*` | Must compare expected enhanced descriptors to renderer snapshot readback. |
| gameplay action replay | missing | target `src/gameplay/*` | Must normalize actions and produce ActionResult rows. |
| fixture smoke | missing | target `scripts/*fixture*.mjs` | Must prove render parity and action replay without DOM. |

## DSK/domain breakdown

```txt
into-the-meadow-domain
├─ route-domain
│  ├─ static-route-kit
│  └─ browser-boot-kit
├─ host-domain
│  ├─ web-host-kit
│  ├─ external-kit-loader-kit
│  └─ gamehost-projection-kit
├─ manifest-domain
│  └─ game-manifest-descriptor-kit
├─ meadow-content-domain
│  ├─ arrival-meadow-descriptor-kit
│  ├─ story-beats-descriptor-kit
│  ├─ arrival-objectives-descriptor-kit
│  └─ arrival-interaction-targets-descriptor-kit
├─ render-domain
│  ├─ meadow-area-kit
│  ├─ meadow-webgl-render-kit
│  ├─ render-plan-enhancement-kit
│  ├─ tree-object-dsk
│  ├─ wind-field-dsk
│  ├─ post-process-stack-dsk
│  ├─ meadow-performance-dsk
│  └─ outline-policy-descriptor-kit
├─ grass-system-domain
│  ├─ grass-density-texture-kit
│  ├─ grass-clump-archetype-kit
│  ├─ grass-static-batch-kit
│  ├─ grass-patch-placement-kit
│  ├─ grass-clump-instancing-render-kit
│  ├─ grass-shader-wind-kit
│  ├─ grass-lod-policy-kit
│  ├─ grass-density-scaling-kit
│  └─ grass-debug-visualization-kit
├─ render-parity-domain
│  ├─ render-parity-reason-kit
│  ├─ expected-render-descriptor-kit
│  ├─ renderer-snapshot-consumption-kit
│  ├─ render-descriptor-parity-kit
│  ├─ grass-consumption-row-kit
│  └─ render-parity-diagnostics-projection-kit
└─ gameplay-authority-domain
   ├─ action-frame-kit
   ├─ action-result-kit
   ├─ action-journal-kit
   ├─ path-progress-reducer-kit
   ├─ inspect-target-reducer-kit
   ├─ objective-completion-resolver-kit
   └─ gameplay-snapshot-kit
```

## Implementation boundary

Build pure modules first.

Do not change the external CDN kit URLs, renderer visuals, meadow content placement, or public route during the parity/action replay fixture pass.
