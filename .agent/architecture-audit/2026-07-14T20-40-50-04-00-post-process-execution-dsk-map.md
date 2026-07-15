# Architecture Audit: Post-Process Execution DSK Map

**Generated:** `2026-07-14T20-40-50-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The descriptor layer and renderer layer disagree about post-processing ownership. Composition declares a pass graph, but the renderer neither consumes that graph nor returns an explicit fallback result.

## Plan ledger

**Goal:** place each current and required service under one unambiguous domain owner.

- [x] Map descriptor producers.
- [x] Map render-contract transport.
- [x] Map current WebGL consumers.
- [x] Identify missing admission, execution, receipt, and rollback owners.
- [ ] Implement the authority later.

## Current domain map

```txt
game composition
  -> createRenderPlanEnhancer

post-process descriptor domain
  -> post-process-stack-dsk
  -> render-target-kit
  -> depth-fog-pass-kit
  -> color-grade-pass-kit
  -> sobel-outline-pass-kit
  -> vignette-pass-kit
  -> final-composite-pass-kit

render contract
  -> effects.postProcess
  -> geometry/content validation only

WebGL renderer
  -> mesh cache
  -> default framebuffer
  -> geometry outline draw
  -> inline cel/fog draw
  -> snapshot postProcessMode=inline-cel-fog
```

## Missing ownership

```txt
renderer capability manifest
pass graph admission
ordered pass dispatch
render-target generations
pass substitution and skip reasons
inline fallback compatibility profile
per-pass execution receipts
resource retirement receipts
frame result and visible-frame acknowledgement
failure rollback preserving predecessor output
```

## Required parent domain

`meadow-post-process-descriptor-execution-authority-domain`

## Required service boundaries

| Surface | Authority |
|---|---|
| Pass descriptors | Declare immutable desired graph and settings. |
| Capability manifest | State exact supported formats, targets, inputs, and passes. |
| Profile admission | Select full, reduced, inline fallback, or reject. |
| Resource planning | Allocate versioned color, depth, normal, and ping-pong targets. |
| Pass dispatch | Execute accepted graph in declared order. |
| Substitution policy | Explain every replacement or omission. |
| Result publication | Return graph, profile, receipts, output target, and frame identity. |
| Rollback | Retire candidate resources and preserve accepted predecessor output. |

## Boundary

No DSK, renderer, render contract, or export was changed.