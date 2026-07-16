# Renderer Identity Audit: Manifest, Module, Service and Proof Contract

**Timestamp:** `2026-07-15T20:38:13-04:00`  
**Status:** `runtime-renderer-identity-manifest-proof-authority-audited`

## Plan ledger

**Goal:** define the minimum immutable contract that makes renderer identity observable and enforceable across all product surfaces.

- [x] Record manifest identity fields.
- [x] Record executable wrapper behavior.
- [x] Record DSK service-contract fallback.
- [x] Record proof-target divergence.
- [ ] Implement the contract later.

## Canonical descriptor

```txt
RendererIdentityDescriptor {
  id
  revision
  baseModule
  executableModule
  wrapperChain[]
  supportedContexts[]
  contextAttributes
  shaderPrecisionPolicy
  capabilityServices[]
  renderContractIds[]
  cachePolicy
  resizePolicy
  snapshotContract
  disposalContract
  integrity
}
```

## Required services

The renderer DSK should explicitly publish at least:

```txt
webgl-context
shader-program-compilation
shader-precision-policy
attribute-binding
uniform-binding
render-plan-ingest
mesh-buffer-upload
frame-draw
viewport-resize
gpu-cache-state
renderer-snapshot
renderer-disposal
renderer-validation
```

The current generic fallback of `model`, `state`, `events`, `validation` and `snapshot` is insufficient to identify the actual executable capability surface.

## Required invariants

```txt
one renderer ID resolves to one immutable descriptor revision
one descriptor names the exact executable module
all wrappers are ordered and named
shader precision policy is explicit
manifest and host cite the same descriptor
DSK services match implementation capabilities
context and GPU resources cite renderer generation
proof artifacts cite renderer identity and revision
retirement occurs once per generation
```

## Required proof matrix

| Surface | Required evidence |
|---|---|
| Source manifest | Canonical descriptor identity and module chain. |
| Browser host | Accepted renderer admission result. |
| DSK registry | Explicit capability services and revision. |
| Static smoke | Exact manifest-to-host identity convergence. |
| Browser fixture | Context creation, shader compile and first frame. |
| Headless editor | Renderer identity or explicit non-rendering observation classification. |
| Built output | Preserved executable module and wrapper chain. |
| GitHub Pages | Deployed identity receipt and matching first frame. |

## Current classification

```txt
base renderer declared: yes
compatible renderer executed: yes
wrapper chain declared: no
precision policy declared: no
explicit DSK renderer services: no
browser identity fixture: no
headless/browser parity result: no
build/Pages identity parity: no
```

## Completion boundary

This contract is complete only when every consumer can resolve the same renderer descriptor and every successful frame can be traced to the accepted renderer, context, shader and render-plan revisions.
