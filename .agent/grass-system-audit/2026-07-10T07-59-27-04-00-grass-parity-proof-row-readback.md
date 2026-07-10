# Grass System Audit: Grass Parity Proof Row Readback

## Current grass source

`enhanceRenderPlan()` creates the grass source stack:

```txt
grass-density-texture-kit
  -> grass-clump-archetype-kit
  -> grass-static-batch-kit
  -> grass-patch-placement-kit
  -> grass-clump-instancing-render-kit
  -> grass-shader-wind-kit
  -> grass-lod-policy-kit
  -> grass-density-scaling-kit
  -> grass-debug-visualization-kit
```

## Current consumer

The renderer consumes the enhanced plan and reports aggregate render counts. The GameHost and editor bridge can read those aggregate snapshots.

## Gap

Grass descriptors are rich, but there is no parity ledger that compares source rows to renderer rows.

Missing proof:

```txt
density texture channel row
static batch count row
patch count row
draw group instance/card row
shader wind row
lod policy row
debug summary row
renderer parity row
GameHost grass proof row
headless editor grass observation row
```

## Deferral

Do not tune grass art or density until the rows above exist. The current need is proof, not visual change.
