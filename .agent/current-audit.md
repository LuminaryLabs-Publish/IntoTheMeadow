# Current Audit: Runtime Renderer Identity and Proof Authority

**Updated:** `2026-07-15T20-38-13-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `runtime-renderer-identity-manifest-proof-authority-audited`  
**Immediate predecessor:** `accessible-semantic-projection-authority-central-reconciled`

## Summary

The declared renderer and the executed browser renderer are not the same module. Both game manifests identify `./src/renderers/meadow-webgl-renderer-v2.js`, while `src/hosts/web-host.js` imports `meadow-webgl-renderer-v2-compatible.js`, whose WebGL proxy rewrites shader float precision before compilation.

The required renderer DSK is also under-described. `meadow-webgl-renderer-v2-kit` is present in the local and required registries, but it is missing from both `DOMAIN_LABELS` and `SERVICES`, causing the descriptor to expose generic fallback services rather than the renderer's actual context, shader, buffer, draw, resize, snapshot and disposal capabilities.

## Plan ledger

**Goal:** bind manifest identity, DSK capabilities, executable module selection and renderer proof to one accepted revision.

- [x] Compare Publish inventory and central tracking.
- [x] Exclude TheCavalryOfRome.
- [x] Select only IntoTheMeadow by oldest synchronized timestamp.
- [x] Read both manifests, the web host, compatibility wrapper, DSK registry, DSK descriptor and renderer tests.
- [x] Preserve all 44 kit surfaces and services.
- [x] Add the timestamped renderer-identity audit family.
- [x] Change documentation only and target `main`.
- [ ] Implement the authority and browser fixtures later.

## Main findings

```txt
game.manifest.json localRenderer.module: ./src/renderers/meadow-webgl-renderer-v2.js
GAME_MANIFEST localRenderer.module:       ./src/renderers/meadow-webgl-renderer-v2.js
web-host executable import:               meadow-webgl-renderer-v2-compatible.js
compatibility behavior:                   shader float precision normalization
manifest wrapper identity:                absent
manifest shader precision policy:         absent
renderer revision identity:               absent
```

```txt
meadow-webgl-renderer-v2-kit in local registry: yes
meadow-webgl-renderer-v2-kit required v0.1:      yes
explicit DOMAIN_LABELS entry:                  no
explicit SERVICES entry:                       no
descriptor fallback services:                  model/state/events/validation/snapshot
actual renderer capability contract:           not represented by DSK descriptor
```

## Current proof gap

```txt
static smoke exact import assertion: absent
manifest to host module convergence check: absent
browser renderer instantiation fixture: absent
shader compile fixture through wrapper: absent
base versus wrapper equivalence result: absent
headless proof of browser renderer identity: absent
built artifact module identity receipt: absent
Pages renderer identity receipt: absent
FirstRendererIdentityFrameAck: absent
```

## Required parent domain

`meadow-runtime-renderer-identity-manifest-proof-authority-domain`

## Required transaction

```txt
RendererIdentityAdmissionCommand
  -> bind manifest, DSK registry, host, module and build revisions
  -> resolve one immutable RendererIdentityDescriptor
  -> include base module, wrapper chain and shader/context policies
  -> validate the DSK capability contract against implementation
  -> reject missing, stale or divergent renderer identities
  -> instantiate only the accepted executable module
  -> publish RendererIdentityAdmissionResult
  -> render one frame through the accepted generation
  -> acknowledge FirstRendererIdentityFrameAck
```

## Boundary

Documentation only. No runtime, shader, renderer, manifest, DSK descriptor, test, workflow, build or deployment code changed.
