# Declared Versus Authoritative Gameplay Kit Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-11T02-20-44-04-00`

## Declared gameplay kits

```txt
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
```

## Current executable authority

```txt
game.tick
  -> increments frame
  -> stores lastTick

game.reset
  -> recreates static initial state

content
  -> exposes story beats, objectives, and targets as descriptors
```

No movement, inspection, objective, audio, save, or UI reducer consumes the declared services.

## Required registry classification

```txt
meadow-player-dsk: descriptor-shell
meadow-camera-dsk: descriptor-shell
meadow-input-dsk: descriptor-shell
meadow-interaction-dsk: descriptor-shell
meadow-story-dsk: descriptor-shell
meadow-objective-dsk: descriptor-shell
meadow-ecology-dsk: descriptor-shell
meadow-audio-dsk: descriptor-shell
meadow-ui-dsk: descriptor-shell
meadow-save-dsk: descriptor-shell
```

These rows must not be promoted to implemented or consumed until source and proof rows exist.
