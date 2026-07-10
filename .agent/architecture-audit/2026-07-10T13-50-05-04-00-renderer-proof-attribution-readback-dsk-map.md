# Architecture audit: renderer proof attribution readback DSK map

Timestamp: 2026-07-10T13-50-05-04-00

## Current route

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> createIntoTheMeadowGame()
  -> enhanceRenderPlan()
  -> MeadowWebGLRendererV2.render()
  -> GameHost / editor bridge aggregate readback
```

## Domain-Service-Kit map

| Domain | Current owner | Kit/service role | Missing proof |
| --- | --- | --- | --- |
| Boot | `boot-game.js`, `web-host.js` | DOM capture, canvas/HUD/status wiring, RAF loop | boot route/source fingerprint row |
| Game state | `create-into-the-meadow-game.js` | state creation, diagnostics, render-plan caching | accepted/rejected tick and objective rows |
| Render plan | `enhance-render-plan.js` | descriptor enrichment and DSK composition | per-descriptor consumed/ignored/fallback rows |
| Renderer | `meadow-webgl-renderer-v2.js` | WebGL mesh build, cache, draw passes, aggregate snapshot | source-attributed render-consumption ledger |
| Grass | grass DSK set in enhancer | density/archetype/patch/instance/wind/LOD/debug rows | grass descriptor-to-render attribution rows |
| Interaction | targets/actions/objectives source files | action intent and preflight source descriptors | action result and objective progress proof rows |
| Editor | `install-editor-bridge.js` | runtime, scene, renderer, capture, browser capabilities | command observation/result ledger |
| Diagnostics | `expose-game-host.js` | aggregate GameHost snapshots | JSON-safe proof projection rows |

## Architecture blocker

The repo has a strong DSK-oriented source side, but readback does not preserve row provenance. Renderer, grass, objective, and editor paths currently say the system is reachable; they do not prove which source rows were consumed or why rows were skipped.

## Next architecture ledge

Add a JSON-safe proof ledger that can be produced without DOM/WebGL mutation. The first fixture should assert descriptor IDs, consumer names, outcomes, reasons, and fallback status across renderer, grass, action, objective, and editor surfaces.
