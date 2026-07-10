# Render Audit: Source Identity and Render Consumption Gap

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T19-48-39-04-00`

## Current render path

```txt
selected meadow provider
  -> time-0 source render plan
  -> cached baseRenderPlan
  -> time-field overlay
  -> render-plan enhancer
  -> topologyKey and enhanced descriptors
  -> meadow mesh builder
  -> topology-keyed GPU buffers
  -> outline pass
  -> cel/fog pass
  -> aggregate renderer snapshot
```

## What render readback currently proves

```txt
render-plan schema validation passed
static topology key exists
enhancer cache hit/rebuild counts
aggregate source descriptor counts
final vertex and triangle counts
GPU buffer cache state
outline and cel/fog submission completed
```

## What it cannot prove

```txt
which source provider produced the raw plan
which manifest URL and pinned commit were used
whether the local fallback or external provider was selected
why fallback was selected
whether the plan changed across a source rebuild
whether two provider plans are parity-compatible
which source-plan fingerprint produced the topology key
which source object ids contributed to final geometry
which frame consumed which source epoch
```

## Source identity loss points

1. `loadExternalKits()` returns only `createMeadowAreaKit`.
2. `createIntoTheMeadowGame()` stores the created meadow object but no provider result row.
3. `baseRenderPlan` retains `id` and `version`, but not a normalized provider identity.
4. `getRenderPlan(time)` overlays time without source lineage.
5. The enhancer derives topology and descriptors without a canonical source fingerprint.
6. The renderer snapshot reports aggregate geometry but not the source epoch or plan fingerprint.
7. HUD, GameHost, and editor readback cannot join a displayed frame to a source selection.

## External/fallback parity risk

The external source and local fallback both emit `meadow-area-render-plan`, but they use different implementations:

```txt
external:
  meadow-area-kit version 0.1.0
  normalized area/style/path contracts
  seeded mutable PRNG
  source IDs such as grass-0 and wildflower-0
  explicit plan validation against grass/path/focal tree

local fallback:
  local-source-plan-v1
  independent hash-per-field scatter
  zero-padded source IDs for scattered objects
  simplified feature coverage and placement
  validation always returns passed and representative
```

A common type string is not parity evidence. The enhanced topology could differ even when aggregate object counts look similar.

## Required render provenance row

```txt
{
  frameId,
  sourceEpoch,
  providerKind,
  providerVersion,
  pinnedCommit,
  sourcePlanId,
  sourcePlanVersion,
  sourcePlanFingerprint,
  enhancedTopologyKey,
  meshFingerprint,
  vertexCount,
  triangleCount,
  cacheState,
  consumedAt
}
```

## Required fixture matrix

```txt
external provider, time 0
external provider, time 1
local fallback, time 0
local fallback, time 1
same provider repeated construction
explicit source rebuild
external import failure with fallback allowed
external import failure with fallback denied
```

Assertions:

```txt
provider selection is explicit
source-plan fingerprint is stable for same provider/config
source epoch increments only on rebuild/reselection
same source fingerprint produces same topology key
external and fallback differences are classified rather than hidden
renderer snapshot includes the consumed source epoch and fingerprint
legacy visual counts remain unchanged for the default external path
```

## Conclusion

The renderer is deterministic with respect to the plan it receives, but the host cannot prove the origin of that plan. Add source identity and epoch propagation before using renderer statistics as evidence of production-source behavior.