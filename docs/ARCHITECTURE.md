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
└─ static-pages-deploy-dsk
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
```

## External kit boundary

Reusable meadow infrastructure stays outside this repo:

```txt
meadow-area-kit
meadow-webgl-render-kit
```

## Promotion rule

Game-specific composition stays here. Generic terrain texturing, grass patches, shader wind, and path surface systems should be extracted to ProtoKits once proven across more than one scene.
