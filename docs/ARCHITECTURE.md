# IntoTheMeadow DSK Architecture

This repo implements the DSK-first plan for turning the path meadow proof into a publishable game.

## Five-layer rule

```txt
Layer 1 = Game repo / product
Layer 2 = Game capability domain
Layer 3 = DSK package/folder
Layer 4 = Subdomain module
Layer 5 = Internal service/data/adapter
```

## Active v0.1 stack

```txt
IntoTheMeadow
├─ into-the-meadow-game-dsk
├─ web-host-dsk
├─ game-composition-dsk
├─ meadow-area-bridge-dsk
├─ meadow-render-host-dsk
├─ meadow-diagnostics-dsk
├─ meadow-performance-dsk
├─ post-process-stack-dsk
└─ static-pages-deploy-dsk
```

## Active visual upgrade pass

```txt
render-plan-enhancement
├─ tree-object-dsk
│  ├─ better focal-tree descriptor
│  ├─ softer hero outline policy
│  ├─ increased roots/branches/crown clusters
│  └─ tree validation surface
├─ grass-patch-dsk
│  ├─ patch descriptor generation
│  ├─ density and item budget
│  ├─ LOD intent
│  └─ wind weight metadata
├─ gpu-grass-render-dsk
│  ├─ instance layout contract
│  ├─ shader wind contract
│  ├─ LOD render contract
│  └─ future WebGL/WebGPU split
├─ wind-field-dsk
│  ├─ direction
│  ├─ strength
│  ├─ gust
│  └─ sampler surface
└─ post-process-stack-dsk
   ├─ render-target
   ├─ depth-fog
   ├─ color-grade
   ├─ edge-outline
   ├─ vignette
   └─ final-composite
```

## Planned domain stack

The registry includes all planned DSKs from the architecture plan:

```txt
meadow-terrain-texture-dsk
path-corridor-dsk
grass-patch-dsk
gpu-grass-render-dsk
wind-field-dsk
tree-object-dsk
meadow-scatter-dsk
meadow-atmosphere-dsk
meadow-player-dsk
meadow-camera-dsk
meadow-input-dsk
meadow-interaction-dsk
meadow-story-dsk
meadow-objective-dsk
meadow-ecology-dsk
meadow-audio-dsk
meadow-ui-dsk
meadow-save-dsk
meadow-performance-dsk
post-process-stack-dsk
render-target-kit
sobel-outline-pass-kit
color-grade-pass-kit
depth-fog-pass-kit
vignette-pass-kit
final-composite-pass-kit
```

## External kit boundary

Reusable meadow infrastructure stays outside this repo:

```txt
meadow-area-kit
meadow-webgl-render-kit
```

## Promotion rule

Game-specific composition stays here. Generic terrain texturing, grass patches, shader wind, post-process passes, and path surface systems should be extracted to ProtoKits once proven across more than one scene.
