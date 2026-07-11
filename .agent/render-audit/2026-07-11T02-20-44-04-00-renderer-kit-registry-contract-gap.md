# Renderer Kit Registry Contract Gap

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-11T02-20-44-04-00`

## Finding

`meadow-webgl-renderer-v2-kit` is present in both the local registry and the required-v0.1 list, but it is absent from the explicit label and service maps.

The descriptor factory therefore assigns:

```txt
label: meadow-webgl-renderer-v2-kit
services: model, state, events, validation, snapshot
```

The implementation actually provides:

```txt
WebGL context acquisition
precision-safe shader adaptation
shader program creation
CPU mesh upload
GPU buffer caching
topology-key reuse
viewport resize
outline pass
cel/fog pass
renderer statistics
snapshot
dispose
```

## Risk

A registry consumer can report the renderer kit as active while exposing a generic contract unrelated to the concrete renderer. No fixture detects this divergence.

## Required proof

```txt
every required renderer kit has explicit label and services
declared renderer services match exported adapter capabilities
renderer output rows identify the producing kit
mesh and render consumption rows retain kitId
unsupported descriptor families fail visibly
GameHost/editor snapshots expose renderer kit truth
```
