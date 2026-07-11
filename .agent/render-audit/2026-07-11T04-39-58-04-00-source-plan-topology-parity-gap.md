# Source Plan Topology Parity Gap

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T04-39-58-04-00`

## Goal

Identify render risks caused by sending two materially different raw source providers into the same enhancer without a parity or normalization contract.

## Current render path

```txt
selected provider
  -> raw meadow-area-render-plan
  -> createRenderPlanEnhancer.enhance()
  -> meadow-render-plan/v2 validation
  -> topology key
  -> CPU mesh construction
  -> WebGL buffer cache
  -> outline and cel/fog draws
```

## Provider differences before enhancement

```txt
external version: 0.1.0
fallback version: local-source-plan-v1

external path: normalized points, width, pebbles, ruts and edge-grass fields
fallback path: copied authored feature object

external grass: normalized position, height, width, lean, rotation, color and sway
fallback grass: one reduced placeholder without lean, rotation or sway

external atmosphere: normalized ground, hills, clouds and sun
fallback atmosphere: hard-coded hills and sun

external validation: structural failures possible
fallback validation: always passed
```

## Missing proof

```txt
no canonical raw source-plan schema
no provider fingerprint in topology provenance
no same-config descriptor count comparison
no source-plan normalization result
no external/fallback topology-key comparison
no mesh contribution parity result
no renderer output parity classification
```

A successful enhanced-plan validation proves only that the enhancer accepted one plan. It does not prove that production and tests exercise the same topology, placement semantics or visual feature set.

## Required render parity row

```txt
providerFingerprint
sourcePlanFingerprint
normalizedPlanFingerprint
enhancedTopologyKey
descriptorCounts
meshVertexCount
meshIndexCount
renderCacheState
parityClass
classifiedDifferences[]
```

## Acceptance gate

For `ARRIVAL_MEADOW_CONFIG`, both providers must either:

```txt
produce exact or normalized-equivalent required descriptor families
or
publish an intentional-degradation result listing every omitted or altered semantic
```

Unclassified differences must fail before GPU resource preparation.
