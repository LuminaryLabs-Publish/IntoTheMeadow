# Grass System Audit — Texture-Driven Static Batch Grass

**Timestamp:** `2026-07-08T02:00:12-04:00`

## Current grass direction

The current architecture is moving in the right direction:

```txt
texture density
  -> patch placement
  -> reusable clump archetypes
  -> static batches
  -> instance draw groups
  -> shader wind
  -> LOD policy
```

This matches the desired approach better than placing individual grass blades in scene coordinates.

## Current local pipeline

`src/game/enhance-render-plan.js` creates the grass system using:

```txt
grass-density-texture-kit
grass-clump-archetype-kit
grass-static-batch-kit
grass-patch-placement-kit
grass-clump-instancing-render-kit
grass-shader-wind-kit
grass-lod-policy-kit
grass-density-scaling-kit
grass-debug-visualization-kit
```

The generated `grassSystem` contains:

```txt
- densityTexture
- staticBatches
- patches
- drawGroups
- shaderWind
- lodPolicy
- densityScale
- debug summary
- validation results
```

## Correct target model

```txt
1. Build a low-resolution world-space density texture.
2. Encode path clearing, slope/noise, moisture, flower channels, and edge density into channels.
3. Generate a small set of reusable grass clump archetypes.
4. Build each clump as 50-100 crossed/curved card planes.
5. Cache clump archetypes as static batches.
6. Populate meadow patches from texture samples.
7. Instance clump batches across patches.
8. Apply wind in shader, not by CPU-updating individual cards.
9. LOD far grass into tint/noise/terrain material layers.
10. Keep debug views for density, patch bounds, draw groups, and LOD.
```

## What must not happen

```txt
- do not place thousands of individual grass objects in scene data
- do not make every blade its own draw path
- do not hardcode per-object grass positions in game content
- do not make the publish repo own the final reusable grass renderer forever
- do not draw the density texture only as a debug artifact
```

## Renderer handoff shape

The renderer should be able to draw grass from this plan shape:

```txt
plan.grassSystem.staticBatches[]
plan.grassSystem.patches[]
plan.grassSystem.drawGroups[]
plan.grassSystem.shaderWind
plan.grassSystem.lodPolicy
```

## Visual acceptance

The scene should read as:

```txt
one continuous meadow surface
path carved through the density
layered near/mid/far grass
small flowers embedded in patches
wind moving in coherent gust bands
no visible grid pattern
no lollipop/tree-symbol look fighting the grass style
```

## Next implementation target

The next grass pass should happen primarily in:

```txt
LuminaryLabs-Agents/NexusRealtime-ProtoKits/protokits/meadow-webgl-render-kit
```

`IntoTheMeadow` should add only enough fixture coverage to prove the renderer contract remains stable.

## Fixture checklist

- [ ] density texture has stable world bounds and resolution.
- [ ] path lowers density in the path channel.
- [ ] static batches are reused across patches.
- [ ] draw groups reference static batch IDs.
- [ ] patch count is deterministic for a given seed.
- [ ] estimated instance/card stats are exposed.
- [ ] grass-blade objects are absent from enhanced `objects`.
- [ ] shader wind descriptor validates.
- [ ] LOD policy descriptor validates.
- [ ] renderer snapshot reports grass draw groups after render-kit cutover.