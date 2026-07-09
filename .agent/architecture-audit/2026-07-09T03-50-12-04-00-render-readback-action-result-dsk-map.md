# Architecture Audit — Render Readback + Action Result DSK Map

**Timestamp:** `2026-07-09T03-50-12-04-00`

## Selected repo

```txt
LuminaryLabs-Publish/IntoTheMeadow
```

## Why this repo

The full accessible Publish repo list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` ledger.

No checked non-Cavalry Publish repo was new, ledger-absent, undocumented, recently added but undocumented, or missing sampled root `.agent` state.

`IntoTheMeadow` was selected because repo-local `.agent` state had advanced past central tracking and the same unresolved architecture seam remains: descriptor-rich render and gameplay inputs exist, but no source-level readback/action-result proof layer exists.

## Current route architecture

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> GAME_MANIFEST.externalKits
  -> createIntoTheMeadowGame
  -> installDsks
  -> create meadow area kit
  -> getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(enhancedPlan)
  -> expose GameHost snapshot/readback
```

## Domains in use

```txt
route-shell-domain
web-host-domain
external-kit-loading-domain
game-composition-domain
manifest-domain
DSK-registry-domain
meadow-area-domain
fallback-meadow-domain
render-plan-domain
render-enhancement-domain
grass-system-domain
wind-field-domain
post-process-domain
performance-policy-domain
render-host-domain
gameplay-state-domain
objective-domain
interaction-target-domain
diagnostics-domain
deploy-validation-domain
```

## Current DSK/service map

| DSK / kit | Domain | Services |
|---|---|---|
| `into-the-meadow-game-dsk` | game foundation | manifest, kit stack registry, game state root, boot sequence, game snapshot |
| `web-host-dsk` | host runtime | document shell, browser loop, debug surface, asset-loading host, browser safety |
| `game-composition-dsk` | composition | dsk registry, scene composition, render composition, simulation composition, validation |
| `meadow-area-bridge-dsk` | meadow area | meadow config, feature config, kit adapter, state, validation |
| `meadow-area-kit` | external render-plan source | meadow area plan, objects, features, validation |
| `meadow-webgl-render-kit` | external renderer | canvas renderer, plan consumption, renderer snapshot |
| `grass-density-texture-kit` | grass density | density model, channels, compositor, sampler, validation |
| `grass-clump-archetype-kit` | grass archetype | clump registry, card layout, atlas binding, variants, validation |
| `grass-static-batch-kit` | grass batch | mesh builder, cache, atlas material, LOD, validation |
| `grass-patch-placement-kit` | grass placement | patch grid, density placement, instance selection, buffers, validation |
| `grass-clump-instancing-render-kit` | grass render descriptor | batch registry, instance stream, draw groups, shader binding, validation |
| `grass-shader-wind-kit` | grass wind | uniforms, bend model, phase field, gust response, validation |
| `grass-lod-policy-kit` | grass LOD | near/mid/far policy, terrain tint LOD, validation |
| `grass-density-scaling-kit` | quality scaling | quality, budget, density, profile, validation |
| `grass-debug-visualization-kit` | grass diagnostics | density view, patch view, instance view, LOD view, validation |
| `wind-field-dsk` | wind weather | wind state, sampler, zones, consumers, validation |
| `tree-object-dsk` | tree object | focal tree model, tree line model, materials, wind binding, validation |
| `meadow-performance-dsk` | performance | profile, budget, LOD, adaptive scaling, validation |
| `post-process-stack-dsk` | post process | pass registry, render target, outline, color grade, validation |

## Missing architecture boundary

The next architecture boundary should add pure source modules, not browser-only UI logic:

```txt
src/render-parity/*
src/gameplay/*
tests/render-parity-fixture-smoke.mjs
tests/gameplay-action-replay-fixture-smoke.mjs
```

## Target architecture

```txt
enhanced render plan
  -> collect expected descriptors
  -> normalize renderer snapshot consumption
  -> create render parity report
  -> create grass consumption rows
  -> expose GameHost.renderParity additively

action frame
  -> normalize action rows
  -> reduce path progress and inspect target actions
  -> resolve objective completion
  -> project snapshot.gameplay additively
  -> prove rows through DOM-free fixtures
```

## Guardrails

```txt
Do not remove existing GameHost fields.
Do not rewrite external meadow kits.
Do not change the GitHub Pages route.
Do not move reusable renderer systems into this publish repo permanently.
Do not add browser fixture dependencies before pure Node fixtures exist.
```
