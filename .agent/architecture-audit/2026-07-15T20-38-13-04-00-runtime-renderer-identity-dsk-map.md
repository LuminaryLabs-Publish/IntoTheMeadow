# Architecture Audit: Runtime Renderer Identity DSK Map

**Timestamp:** `2026-07-15T20:38:13-04:00`  
**Status:** `runtime-renderer-identity-manifest-proof-authority-audited`

## Plan ledger

**Goal:** map the declaration, selection, compatibility, execution and proof boundaries for the active meadow renderer.

- [x] Map manifest ownership.
- [x] Map DSK registry and service descriptor ownership.
- [x] Map browser host renderer selection.
- [x] Map compatibility-wrapper behavior.
- [x] Map current test and headless proof boundaries.
- [ ] Implement one coordinating authority later.

## Current domain map

```txt
Game Manifest Domain
  game.manifest.json
  src/content/game-manifest.js
  declares meadow-webgl-renderer-v2.js

DSK Registry Domain
  dsk-registry.json
  src/content/dsk-registry.js
  requires meadow-webgl-renderer-v2-kit

DSK Descriptor Domain
  src/dsks/index.js
  lacks explicit renderer label/services
  emits generic fallback capability surface

Browser Host Domain
  src/hosts/web-host.js
  imports meadow-webgl-renderer-v2-compatible.js directly

Compatibility Domain
  meadow-webgl-renderer-v2-compatible.js
  imports base renderer
  proxies getContext
  records shader types
  rewrites graphics shader precision

Base Renderer Domain
  meadow-webgl-renderer-v2.js
  owns WebGL context, programs, buffers, draws, resize, snapshots and disposal

Proof Domain
  static smoke checks tokens/files
  renderer smoke checks enhanced plans and mesh buffers
  headless editor checks mesh observations and generated SVG
  no identity-bound browser frame proof
```

## Ownership collision

```txt
declared renderer identity owner: manifests
executable renderer identity owner: browser host import
compatibility policy owner: wrapper module
service contract owner: generic DSK descriptor fallback
proof target owner: separate static/mesh/headless scripts
```

No one surface reconciles these owners into a single accepted renderer generation.

## Required parent domain

`meadow-runtime-renderer-identity-manifest-proof-authority-domain`

## Required DSK composition

```txt
Renderer Identity
  renderer-manifest-source-kit
  renderer-executable-module-kit
  renderer-revision-identity-kit
  renderer-wrapper-chain-kit

Renderer Capability
  renderer-capability-descriptor-kit
  renderer-dsk-service-contract-kit
  shader-precision-compatibility-policy-kit
  webgl-context-proxy-policy-kit

Admission and Lifecycle
  renderer-selection-admission-kit
  manifest-runtime-convergence-kit
  renderer-identity-admission-result-kit
  renderer-generation-lifecycle-kit

Proof
  browser-renderer-instantiation-fixture-kit
  shader-precision-compile-fixture-kit
  base-wrapper-equivalence-fixture-kit
  headless-browser-renderer-parity-kit
  source-build-pages-renderer-parity-kit
  first-renderer-identity-frame-ack-kit
```

## Required command path

```txt
RendererIdentityAdmissionCommand
  -> read canonical manifest descriptor
  -> validate DSK capability descriptor
  -> resolve executable module and wrapper chain
  -> validate shader/context policy
  -> create one renderer generation
  -> publish RendererIdentityAdmissionResult
  -> render and acknowledge matching first frame
```

## Boundary

This map defines future ownership only. It does not change renderer selection, shader precision, context creation or proof behavior.
