# Cache Coherence Audit: Enhancer, Contract, and GPU Dependency Fingerprints

**Generated:** `2026-07-13T16-01-05-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The enhancer fingerprint, contract topology fingerprint and renderer cache key do not cover the same dependency graph. Cache correctness requires explicit manifests for every stage rather than treating one partial topology key as universal authority.

## Plan ledger

**Goal:** enumerate the current fingerprint coverage, omitted dependencies and the minimum replacement contract.

- [x] Inspect `sourceTopologyKey()`.
- [x] Inspect `topologySummary()`.
- [x] Inspect `buildMeadowMeshData()` inputs.
- [x] Inspect WebGL renderer cache admission.
- [x] Classify dynamic and static dependencies.
- [ ] Implement generated manifests and mutation tests later.

## Current fingerprint chain

```txt
sourceTopologyKey(rawPlan)
  -> enhancer cache

contract.topologyKey = stableHash(topologySummary(contractedPlan))
  -> renderer CPU mesh and GPU-buffer cache

meshKey = stableHash({ topologyKey, builder })
  -> diagnostic identity only
```

## Enhancer fingerprint coverage

```txt
included:
  plan id, version, seed, area and style
  object id, type, position, scale and rotation
  path points and width
  focal-tree branchCount and canopyRadius

omitted but consumed:
  object color and accent
  atmosphere hills and ground descriptors
  path rutCount and pebbleCount
  focal-tree trunkHeight and trunkRadius
  focal-tree rootCount and leafClusterCount
  focal-tree shadowRadius
  runtime.performance overrides
```

## Contract topology fingerprint coverage

```txt
included:
  terrain surface
  grass batch IDs, LODs, card counts and instances
  flower, rock, cover and distant-tree instances
  focal-tree segments and leaf clusters

omitted but consumed by static mesh:
  atmosphere geometry and colors
  global grass, flower and sky-adjacent material inputs
  focal-tree bark and leaf materials
  focal-tree outline weight
  other style values baked into vertex arrays
```

## Static versus dynamic classification

```txt
dynamic uniforms:
  time
  wind direction, strength and gust
  light direction, rim and outline colors
  sky clear and fog colors
  camera matrices

mesh-affecting:
  terrain bounds, resolution, heights, path and materials
  grass cards, instances, families and static color policy
  flower, rock, cover and distant-tree descriptors and colors
  atmosphere hill geometry and colors
  focal-tree segments, leaves, materials and outline weights

contract-only or diagnostic:
  schema, validation, counts and cache policy metadata
```

## Required fingerprints

```txt
EnhancementDependencyFingerprint
  -> every raw source and runtime-policy value used to build contracted descriptors

ContractDescriptorFingerprint
  -> complete immutable contracted descriptor graph

MeshDependencyFingerprint
  -> every value read by buildMeadowMeshData

DynamicUniformFingerprint
  -> values that can update without static buffer replacement
```

## Required verification

```txt
generate dependency manifests beside each consumer
fail tests when a consumer reads an undeclared dependency
mutate every declared dependency and assert the expected decision class
assert time-only and supported uniform-only changes avoid mesh rebuilds
assert mesh-affecting changes produce new mesh and GPU generations
assert failure preserves the complete predecessor generation
```

## Boundary

This file documents the dependency model. It does not alter fingerprints, cache behavior or generated mesh data.