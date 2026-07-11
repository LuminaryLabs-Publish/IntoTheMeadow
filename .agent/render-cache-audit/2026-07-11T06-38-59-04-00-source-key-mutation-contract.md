# Source-Key Mutation Contract

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T06-38-59-04-00`

## Purpose

Define which source changes must rebuild enhanced descriptors and GPU buffers, which changes are uniform-only, and which changes are observation-only.

## Identity layers

```txt
providerFingerprint
  identifies source implementation and pinned version

sourceRevision
  identifies an accepted raw-plan production event

sourceFingerprint
  hashes the complete normalized raw contract

staticRenderKey
  hashes only values that change enhanced static descriptors or CPU mesh data

dynamicRenderKey
  hashes values consumed as uniforms or per-frame transforms

topologyKey
  hashes the complete enhanced static descriptor topology

meshKey
  hashes CPU mesh contributions and buffer payloads

bufferGeneration
  identifies the GPU upload that consumed meshKey

committedFrameId
  identifies the successful draw that consumed bufferGeneration and dynamicRenderKey
```

## Classification table

| Change | Source revision | Static rebuild | GPU upload | Uniform/frame update |
|---|---:|---:|---:|---:|
| time | no | no | no | yes |
| camera position/target/FOV | policy-dependent | no | no | yes |
| wind phase/time | no | no | no | yes |
| wind direction/strength | yes | no if uniform-only | no | yes |
| performance quality affecting grass density | yes | yes | yes | yes |
| path points/width/ruts/pebbles | yes | yes | yes | yes |
| flower/rock/tree color or accent | yes | yes | yes | yes |
| object position/scale/rotation | yes | yes | yes | yes |
| focal-tree trunk/root/branch/leaf parameters | yes | yes | yes | yes |
| provider implementation or version | yes | compare normalized output | compare | compare |
| identical deterministic provider reset | yes | no when static key matches | no | observation only |
| manual invalidate | no | yes | yes | yes |

## Required key schema

```txt
meadow-source-render-key/v1
```

The key schema must be explicit in snapshots and fixtures. A projection change requires a schema version change.

## Canonical projection rules

```txt
sort descriptor families by stable family ID
sort instances by stable instance ID
round finite numeric fields consistently
preserve colors, accents, variants, and material selectors
preserve all geometry-generating parameters
preserve path and focal-tree detail parameters
classify dynamic fields before hashing
reject unknown fields that claim static render impact without a registered projector
never hash mutable object identity or insertion-order accidents
```

## Admission invariants

```txt
same normalized static projection -> same staticRenderKey
changed registered static field -> changed staticRenderKey
changed dynamic-only field -> unchanged staticRenderKey
changed topology -> changed topologyKey
changed mesh payload -> changed meshKey
new meshKey -> new bufferGeneration
cache hit never changes bufferGeneration
failed candidate never replaces committed identities
```

## Mutation fixture families

```txt
path detail mutations
scatter transform mutations
scatter material mutations
focal-tree geometry mutations
wind dynamic/static classification
performance budget mutations
provider parity mutations
manual invalidation
invalid descriptor rejection
identical deterministic rebuild
```

## Completion rule

A persistent cache is correct only when both are proved:

```txt
no stale reuse after a render-affecting change
no unnecessary rebuild after a dynamic-only change
```