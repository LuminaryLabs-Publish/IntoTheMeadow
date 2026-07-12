# Gameplay Audit: Camera Traversal and Grass Cost Loop

**Timestamp:** `2026-07-12T04-11-54-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Intended loop

```txt
player/camera traverses meadow
  -> nearby grass uses detailed clumps
  -> middle grass uses reduced clumps
  -> far grass uses four-card batches
  -> horizon grass becomes terrain tint
  -> off-screen grass contributes no active work
```

## Current loop

```txt
camera remains outside grass policy
  -> deterministic patches are created once
  -> density chooses near or mid batch
  -> all patch instances remain active
  -> all active cards become static triangles
  -> camera movement changes projection only
  -> grass geometry cost remains effectively fixed
```

## Gameplay effect

The authored exploration path and focal tree are visually supported by dense grass, but camera traversal cannot trade detail for range. Future movement, inspection and camera systems would therefore inherit a field whose render work does not follow the player view.

## Required gameplay guarantees

```txt
path corridor remains visually clear at every tier
near-player grass preserves authored density
rapid camera movement cannot commit stale visible sets
camera reset restores the canonical visible set
objective or story transitions do not silently rebuild unrelated grass topology
quality fallback changes detail without changing deterministic placement identity
```

## Required traversal fixture

```txt
start before the arrival path
advance camera toward focal tree
record visible patches and tier counts at checkpoints
rotate camera away from the meadow
assert off-frustum work drops
move beyond far threshold
assert terrain-tint transition
reset camera
assert canonical visible-set fingerprint
```
