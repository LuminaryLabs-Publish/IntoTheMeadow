# Grass System Audit: Draw-Group Contribution Proof

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T15-18-29-04-00`

## Current grass composition

```txt
grass-density-texture-kit
  -> grass-clump-archetype-kit
  -> grass-static-batch-kit
  -> grass-density-scaling-kit
  -> grass-patch-placement-kit
  -> grass-clump-instancing-render-kit
  -> grass-shader-wind-kit
  -> grass-lod-policy-kit
  -> grass-debug-visualization-kit
  -> meadow-render-plan/v2 grass descriptors
  -> addGrassField in meadow-mesh-builder-v2
```

## Current strengths

```txt
deterministic density texture
separate archetype and static-batch descriptors
patch placement driven by density and quality scale
draw-group descriptors with instance/card estimates
shader-wind and LOD policy descriptors
validation at each composition step
persistent final mesh buffers by topologyKey
```

## Proof gap

The grass source has rich structure, but the renderer collapses it into one mesh and returns only aggregate descriptor counts and final geometry totals.

Missing readback:

```txt
density texture id and sampled/accepted status
static batch id -> attempted card contribution
patch id -> accepted/skipped instances
draw group id -> measured emitted cards/vertices/triangles
shader-wind descriptor -> consumed uniform binding status
LOD policy -> selected/ignored status
density scaling -> applied scale and resulting instance count
```

`estimatedGrassInstances` and `estimatedGrassCards` remain plan estimates. They are not consumer measurements.

## Required grass contribution rows

```txt
sourceKind: density-texture | static-batch | patch | draw-group | shader-wind | lod-policy | density-scale
sourceId
status
expectedInstances
attemptedInstances
consumedInstances
emittedCards
emittedVertices
emittedTriangles
reason
```

## Scope rule

Do not redesign the grass art, replace cards, add GPU compute, or retune density in this slice. Instrument the existing path first so later visual changes can be evaluated against authoritative source-to-render parity.

## Fixture gate

```txt
full grass plan produces nonzero measured rows
empty patch list reports absent/zero without false consumption
malformed draw group reports skipped with stable reason
measured grass vertex totals reconcile with the grass family contribution row
wind/LOD descriptors report explicit consumed or ignored status
```