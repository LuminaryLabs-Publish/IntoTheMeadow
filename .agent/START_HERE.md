# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Last aligned:** `2026-07-15T20-38-13-04-00`  
**Status:** `runtime-renderer-identity-manifest-proof-authority-audited`

## Summary

IntoTheMeadow declares `./src/renderers/meadow-webgl-renderer-v2.js` as its local renderer in both manifest surfaces, but the browser host executes `meadow-webgl-renderer-v2-compatible.js`. The compatibility module materially changes shader submission by normalizing float precision through proxied WebGL contexts.

The required `meadow-webgl-renderer-v2-kit` also lacks an explicit label and service list in `src/dsks/index.js`, so its public DSK descriptor falls back to generic `model`, `state`, `events`, `validation` and `snapshot` services. Current static and renderer smokes do not prove manifest, DSK descriptor and executable renderer identity convergence.

## Plan ledger

**Goal:** make one immutable renderer identity authoritative across manifests, DSK services, browser execution, tests, headless evidence, built output and deployed Pages.

- [x] Compare all 11 accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm ten eligible ledgers, root `.agent` states and synchronized heads.
- [x] Select only IntoTheMeadow by the oldest synchronized timestamp.
- [x] Identify the interaction loop, domains, kits and offered services.
- [x] Preserve all 44 declared kit surfaces.
- [x] Add the `2026-07-15T20-38-13-04-00` audit family.
- [x] Change documentation only and target `main`.
- [x] Create no branch or pull request.
- [ ] Implement renderer identity admission and executable browser fixtures later.

## Read this pass first

```txt
.agent/trackers/2026-07-15T20-38-13-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T20-38-13-04-00.md
.agent/architecture-audit/2026-07-15T20-38-13-04-00-runtime-renderer-identity-dsk-map.md
.agent/render-audit/2026-07-15T20-38-13-04-00-manifest-executable-renderer-divergence.md
.agent/interaction-audit/2026-07-15T20-38-13-04-00-renderer-selection-command-result-map.md
.agent/renderer-identity-audit/2026-07-15T20-38-13-04-00-manifest-module-service-proof-contract.md
.agent/deploy-audit/2026-07-15T20-38-13-04-00-renderer-identity-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-15T20-38-13-04-00-oldest-selection-renderer-identity-reconciliation.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Complete interaction loop

```txt
document boot
  -> import web host
  -> read GAME_MANIFEST for the external meadow provider
  -> create game and local DSK descriptors
  -> import the compatible renderer directly from web-host.js
  -> wrap WebGL contexts and normalize shader float precision
  -> create editor bridge and start RAF

frame
  -> tick game with fixed host delta
  -> build and enhance render plan
  -> validate the render contract
  -> submit the plan through the compatible renderer
  -> publish GameHost snapshots

proof surfaces
  -> manifests declare the base renderer module
  -> DSK registry requires meadow-webgl-renderer-v2-kit
  -> DSK descriptor exposes generic fallback services
  -> static smoke checks only the renderer factory name
  -> renderer smoke validates mesh data without instantiating either renderer module
```

## Domain and kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
active-v0.1 local descriptors: 15
planned local descriptors: 28
planned renderer-identity authority surfaces: 19
```

The complete kit-by-kit service map is in the latest tracker and `.agent/kit-registry.json`.

## Required parent domain

`meadow-runtime-renderer-identity-manifest-proof-authority-domain`

## Next safe ledge

Resolve one accepted renderer descriptor containing module URL, revision, wrapper chain, shader-precision policy, context policy and service contract. Require the browser host, manifests, DSK descriptor, tests, headless evidence, build and Pages artifact to cite that descriptor and publish a matching first-frame acknowledgement.

## Claim boundary

This pass does not claim a reproduced shader failure, browser incompatibility, manifest consumer failure, renderer parity, passing tests, build parity, Pages parity or production readiness.
