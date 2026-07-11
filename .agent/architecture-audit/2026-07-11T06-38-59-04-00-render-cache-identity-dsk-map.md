# Render Cache Identity DSK Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T06-38-59-04-00`

## Goal

Assign source revision, cache identity, invalidation, mesh contribution, GPU generation, and observation to explicit owners without moving game-specific renderer behavior into a generic engine domain prematurely.

## Existing owners

| Owner | Current service | Authority gap |
|---|---|---|
| `meadow-area-kit` | Generate raw source plans | No host-owned source revision or canonical fingerprint |
| `fallback-meadow-area-kit` | Generate local raw plans | Different contract from production provider |
| `meadow-render-plan-enhancer-v2` | Cache and enhance source plans | Cache key omits render-affecting fields |
| `meadow-render-plan-v2` | Normalize descriptors and compute topology key | No versioned key schema or source lineage |
| `meadow-mesh-builder-v2` | Build CPU mesh buffers | No typed contribution parity result tied to source revision |
| `meadow-webgl-renderer-v2` | Cache mesh and GPU buffers | No explicit buffer generation ID or cache admission result |
| `GameHost` | Expose plan and renderer snapshots | No source-to-frame lineage or rebuild transaction |
| editor environments | Read plan, metrics, renderer, capture | No source mutation or cache fixture capabilities |

## Required parent domain

```txt
meadow-render-cache-identity-authority-domain
```

The parent owns transaction order and proof only:

```txt
receive source plan and source revision
  -> project all render-affecting fields canonically
  -> calculate versioned source identity
  -> compare with admitted identity
  -> return hit, rebuild, reject, or explicit invalidate
  -> build enhanced plan
  -> calculate enhanced topology identity
  -> build CPU mesh and contribution fingerprint
  -> upload a new GPU buffer generation when required
  -> append a bounded lineage row
  -> publish clone-safe observation
```

## Existing DSKs to update first

```txt
meadow-area-bridge-dsk
  source revision and provider fingerprint

meadow-render-host-dsk
  cache admission, invalidation, lineage, and renderer consumption

meadow-performance-dsk
  performance policy identity and mutation classification

wind-field-dsk
  dynamic uniform versus static topology classification

meadow-diagnostics-dsk
  cache journal, lineage, rebuild counts, and fixture health
```

## Candidate coordinating kits

```txt
source-plan-revision-kit
  monotonic source revision and provider fingerprint

render-affecting-projection-kit
  canonical projection of every value that changes enhanced descriptors or mesh data

render-cache-key-schema-kit
  versioned identity schema and stable hashing

render-cache-admission-kit
  hit, rebuild, reject, and explicit-invalidate result

render-cache-invalidation-kit
  coordinated enhancer and renderer invalidation

render-lineage-kit
  sourceRevision -> sourceKey -> topologyKey -> meshKey -> bufferGeneration

mesh-contribution-fingerprint-kit
  descriptor family counts, contribution counts, and deterministic mesh fingerprint

gpu-buffer-generation-kit
  monotonic GPU upload generation and disposal proof

render-cache-journal-kit
  bounded immutable admission and rebuild rows

render-cache-observation-kit
  clone-safe GameHost and editor projection

render-cache-mutation-fixture-kit
  mutation matrix and exact rebuild assertions
```

## Canonical source identity

The source identity must include or explicitly classify:

```txt
plan id, version, seed, provider fingerprint, and source revision
area and anchor
style materials, camera, light, performance, and postprocess inputs
path enabled, points, width, rutCount, and pebbleCount
all scatter positions, rotations, scales, colors, accents, variants, and archetype inputs
focal-tree trunk, root, branch, leaf, shadow, and render-style inputs
wind values that influence static descriptors
dynamic-only values such as animation time in a separate non-topology identity
```

## Cache admission result

```js
{
  status: "hit" | "rebuild" | "rejected" | "invalidated",
  reason: "identity-match" | "source-changed" | "schema-changed" | "manual-invalidate" | "invalid-source",
  sourceRevision: 3,
  sourceKeySchema: "meadow-source-render-key/v1",
  sourceKey: "...",
  priorSourceKey: "...",
  topologyKey: "...",
  meshKey: "...",
  bufferGeneration: 4,
  changedFields: [],
  journalSequence: 12
}
```

## Ownership rules

```txt
animation time never changes static topology identity
any changed static descriptor changes the versioned source key
dynamic uniforms are classified explicitly and never hidden inside a static cache hit
rebuildRenderPlan returns a typed result and coordinates invalidation
renderer buffer reuse requires exact admitted topology and mesh identity
validation proves descriptor coverage, not only descriptor-family presence
host observations never expose mutable cache owners as the proof surface
all journals are bounded and clone-safe
```

## Nexus Engine placement

Generic stable hashing, immutable admission results, bounded journals, and lineage primitives may belong in Nexus Engine or ProtoKits after reuse is proved.

The meadow descriptor projection, field classification, mesh contributions, and WebGL adapter remain in `LuminaryLabs-Publish/IntoTheMeadow`.