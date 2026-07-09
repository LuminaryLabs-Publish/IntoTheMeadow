# Grass System Audit — Descriptor Readback Proof Map

**Timestamp:** `2026-07-09T12-08-46-04-00`

## Current grass path

`enhanceRenderPlan()` creates the entire grass descriptor stack inside `createGrassSystem(renderPlan, performance, wind)`.

```txt
path descriptor
  -> grass density texture
  -> grass clump archetypes
  -> grass static batches
  -> density scale
  -> grass patch placement
  -> instanced draw groups
  -> shader wind
  -> LOD policy
  -> debug summary
  -> validation block
```

## Good structure already present

```txt
densityTexture: id, resolution, worldBounds, channels
staticBatches: reusable archetype/card batches
patches: patch descriptors and instances
drawGroups: instancing descriptors
shaderWind: wind shader descriptor and validation
lodPolicy: LOD descriptor and validation
densityScale: quality-dependent scale descriptor
debug: density/batch/patch/drawGroup summary
validation: density/archetype/batch/placement/drawGroup/wind/LOD checks
```

## Missing proof

The repo can describe grass, but cannot yet prove that the renderer consumed the grass descriptors.

```txt
Missing readback rows for density texture.
Missing readback rows for static batch count.
Missing readback rows for patch count.
Missing readback rows for draw group count.
Missing readback rows for instance count.
Missing readback rows for estimated grass cards.
Missing reason codes for sparse/absent renderer readback.
Missing GameHost grass parity projection.
Missing DOM-free fixture for grass count parity.
```

## Required grass proof rows

```txt
grass.densityTexture.present
grass.densityTexture.resolution
grass.staticBatches.count
grass.patches.count
grass.drawGroups.count
grass.instances.estimated
grass.cards.estimated
grass.shaderWind.present
grass.lodPolicy.present
grass.debugSummary.present
```

Each row should include:

```txt
id
status: consumed | expected | missing | sparse | unsupported | fallback-rendered
expected
actual
reason
sourcePath
```

## Next implementation rule

Do not rewrite the grass generator or renderer path first. Preserve the current descriptor stack and add a narrow readback/parity layer around it.
