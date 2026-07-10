# Render Audit: External/Fallback Plan Parity Gap

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T16-51-37-04-00`

## Current render inputs

The external kit produces a normalized meadow plan with path data, thousands of grass blades, flowers, rocks, mushrooms, tree-line objects, a focal tree, wind, atmosphere, validation, and version `0.1.0`.

The local fallback produces `local-source-plan-v1` with atmosphere, ground, path, one source grass descriptor, flowers, rocks, tree-line objects, and a focal tree. It does not reproduce the same source descriptor population or validation semantics.

## Parity problem

```txt
external and fallback use the same downstream enhancer and renderer
but they do not expose a declared shared minimum contract
and no fixture distinguishes acceptable degradation from accidental omission
```

Required parity rows:

```txt
source mode
source plan version
required descriptor families present
optional descriptor families present
object counts by family
validation status and reasons
source plan fingerprint
enhanced plan validation
topology key
measured mesh contribution totals
fallback degradation class
```

## Critical render risks

```txt
fallback can render a visually and structurally different scene while claiming representative
source descriptor counts can be echoed rather than measured
source identity is lost before mesh/render snapshots
unsupported source families cannot be attributed to source mode
source-plan caching can hide time-dependent source behavior
```

## Decision

The fallback does not need pixel-identical output. It must satisfy a fixture-defined minimum consumer contract and report every intentional degradation. Render snapshots should carry the source fingerprint and mode so external and fallback captures can be compared deterministically.