# IntoTheMeadow project breakdown

Timestamp: 2026-07-10T13-50-05-04-00

## Selection

Selected `LuminaryLabs-Publish/IntoTheMeadow` after comparing the current Publish org list against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger. `TheCavalryOfRome` stayed excluded. No checked non-Cavalry repo was new, ledger-missing, missing root `.agent`, recently added, or otherwise undocumented. `IntoTheMeadow` was the oldest eligible fallback after `PrehistoricRush` advanced.

## Interaction loop

`index.html` loads `src/boot/boot-game.js`, which captures the canvas/HUD/status/loading DOM, calls `startWebHost`, then runs a browser frame loop through `web-host.js`.

The loop is:

1. Boot DOM and canvas.
2. Create the game via `createIntoTheMeadowGame()`.
3. Enhance the source render plan with DSK-backed renderer, grass, wind, post-process, and performance descriptors.
4. Tick game state with `advanceGameState()`.
5. Render through `MeadowWebGLRendererV2`.
6. Expose aggregate readback through `GameHost` and editor bridge surfaces.

## Domains in use

- boot domain: DOM, canvas, HUD, loading, debug status.
- game state domain: meadow state, frame/time, camera, objectives, targets, story metadata.
- render domain: render plan, WebGL renderer v2, mesh cache, outline pass, main pass.
- grass system domain: density, archetype, static batch, patch, instancing, shader wind, LOD, density scaling, debug rows.
- interaction domain: targets, actions, preflight checks, objective progression intent.
- editor domain: runtime, scene, renderer, capture, and browser capabilities.
- diagnostics domain: GameHost snapshots, renderer snapshots, enhancer snapshots, diagnostics.

## Kits and services

Primary kits observed:

- `meadow-area-kit`: external source area descriptors.
- `meadow-renderer-kit`: local render descriptor source.
- `tree-object-domain-kit`: tree object/domain descriptors.
- `wind-field-domain-kit`: wind-field rows.
- `performance-policy-domain-kit`: performance/fidelity policies.
- `post-process-domain-kit`: post-process settings.
- grass DSKs: density, archetype, static batch, patch, instancing, shader wind, LOD, density scaling, debug.
- fallback meadow kit: fallback render/game descriptors.
- editor bridge capabilities: runtime, scene, renderer, capture, browser.

Services offered by the kits are source description, render-plan enrichment, descriptor normalization, grass layout and batching, wind/post-process/performance policy declaration, renderer compatibility, and editor/runtime inspection.

## Main finding

`IntoTheMeadow` should not start next with visual fidelity, renderer replacement, external CDN migration, shared-kit promotion, new meadow content, grass art tuning, camera/control rewiring, or editor command expansion.

The blocker is renderer proof attribution readback. Renderer v2, the grass system, `GameHost`, gameplay, and editor bridge expose aggregate snapshots or command reachability, but not source-owned proof rows showing what was consumed, ignored, unsupported, fallback-rendered, accepted, rejected, skipped, completed, or observed.

## Next safe ledge

`IntoTheMeadow Renderer Proof Attribution Readback Refresh + Headless Editor Fixture Gate`
