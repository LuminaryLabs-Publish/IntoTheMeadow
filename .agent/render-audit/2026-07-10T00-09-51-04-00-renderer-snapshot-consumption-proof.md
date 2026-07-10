# Render Audit: Renderer Snapshot Consumption Proof

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T00-09-51-04-00`

## Render surface

`src/hosts/web-host.js` creates `createMeadowWebglRendererV2({ canvas })`, enhances the raw render plan, calls `renderer.render(enhancedPlan)`, and stores the renderer snapshot as `lastRender`.

`src/renderers/meadow-webgl-renderer-v2.js` validates the render schema, builds or reuses mesh data by topology key, draws outline and main passes, and returns an aggregate frozen snapshot.

## Snapshot fields already available

```txt
id
version
planId
schema
topologyKey
vertexCount
triangleCount
primitiveFallbackCount
descriptorCounts
rebuildCount
cacheHitCount
cacheState
postProcessMode
validation
```

## Consumption proof gap

The renderer snapshot is aggregate readback, not a ledger.

Missing rows:

```txt
source descriptor id
source descriptor type
expected consumer
consumed / ignored / unsupported / fallback status
fallback reason
mesh contribution
primitive fallback attribution
postprocess descriptor status
wind descriptor status
gamehost projection status
```

## Renderer next-cut files

```txt
src/render-proof/render-expectations.js
src/render-proof/renderer-snapshot-normalizer.js
src/render-proof/render-consumption-ledger.js
src/render-proof/gamehost-render-proof.js
tests/render-consumption-ledger-smoke.mjs
```

## Do not do first

```txt
renderer rewrite
visual fidelity pass
postprocess retune
external renderer migration
new meadow art/content
camera/control changes
```

## Required rows before render changes

```txt
valid enhanced render plan row
renderer snapshot present row
renderer snapshot missing fallback row
descriptor count parity row
primitive fallback attribution row
postprocess inline-cel-fog row
topology cache rebuild row
topology cache hit row
GameHost legacy shape preserved row
```
