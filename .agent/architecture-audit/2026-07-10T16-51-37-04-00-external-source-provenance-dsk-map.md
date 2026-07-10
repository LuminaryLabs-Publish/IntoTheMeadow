# Architecture Audit: External Source Provenance DSK Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T16-51-37-04-00`

## Active composition

```txt
GAME_MANIFEST
  -> externalKits[meadow-area-kit]
  -> web-host dynamic import
  -> createMeadowAreaKit factory
  -> meadow source instance
  -> source render plan
  -> local enhancer DSKs
  -> mesh builder
  -> WebGL renderer
  -> GameHost/editor diagnostics
```

## Domain ownership

| Domain | Current owner | Services | Authority gap |
|---|---|---|---|
| External source declaration | `src/content/game-manifest.js` | id, URL | Repository/commit are encoded only inside URL text |
| Source loading | `src/hosts/web-host.js` | import, factory export check | No serializable load result or fallback policy |
| External meadow source | pinned `meadow-area-kit` | normalize, compose, validate, snapshot, reset, runtime-kit adapter | Exported version and validation are not captured by host |
| Local fallback source | `createFallbackMeadowAreaKit` + `createLocalMeadowSourcePlan` | reduced source plan, snapshot, validation | Not used by browser failure path; parity unproven |
| DSK installation | `src/boot/install-dsks.js` | local validation, external loaded/deferred status | Function presence is treated as external truth |
| Game composition | `createIntoTheMeadowGame` | source selection, plan cache, tick/reset/snapshot | Source identity and load result are absent |
| Render-plan enhancement | `createRenderPlanEnhancer` | grass/wind/performance/postprocess augmentation | No upstream source fingerprint |
| Mesh/render consumers | mesh builder and WebGL renderer | geometry, buffers, passes, snapshots | No source lineage or measured contribution ledger |
| Diagnostics | GameHost/editor bridge | aggregate readback and capture | No source provenance, mode, parity, or load-result journal |

## Kit classification

```txt
external implementation-backed:
  meadow-area-kit 0.1.0

local implementation-backed:
  fallback-meadow-area-kit
  install-dsks
  meadow-render-plan-v2
  meadow-render-plan-enhancer-v2
  meadow-mesh-builder-v2
  meadow-webgl-renderer-v2
  grass composition kits
  tree/wind/performance/postprocess kits
  GameHost diagnostics
  headless editor bridge

registry descriptor shells or planned families:
  player/camera/input/interaction/story/objective/ecology/audio/ui/save
  several render-target/postprocess pass ids
```

## Required architecture addition

```txt
MeadowSourceResolver
  -> MeadowSourceLoadResult
  -> MeadowSourceProvenance
  -> MeadowSourceParityReport
  -> source plan fingerprint
  -> enhanced plan source block
  -> mesh/render lineage
  -> GameHost/editor projection
```

The resolver should own external/fallback selection. The game should receive an already resolved source object plus provenance rather than infer source mode from the presence of a function.

## Compatibility constraints

```txt
preserve current external URL and commit pin
preserve createMeadowAreaKit consumer shape
preserve render-plan v2 and topologyKey behavior
preserve legacy GameHost/editor methods
add provenance fields and capabilities without removing existing fields
keep fallback degradation explicit rather than pretending full equivalence
```

## Decision

Do not promote more DSKs or expand content until the source boundary can prove identity, selection, validation, parity, time policy, and downstream lineage.