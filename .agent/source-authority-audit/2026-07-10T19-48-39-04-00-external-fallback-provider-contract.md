# Source Authority Audit: External/Fallback Provider Contract

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T19-48-39-04-00`

## Finding

The repository has two meadow providers but no common authoritative provider contract.

## External provider

```txt
identity: meadow-area-kit
version: 0.1.0
source: LuminaryLabs-Agents/NexusEngine-ProtoKits
commit: 11d245913ba4d30f3ce950eb5a17e1cc6e4aa1f5
delivery: jsDelivr dynamic import
browser selection: mandatory
validation: area, bounds, grass, path, focal tree
snapshot: normalized area/features/style/stats/validation
```

## Local fallback provider

```txt
identity: fallback-meadow-area-kit
plan version: local-source-plan-v1
source: repo-local createLocalMeadowSourcePlan
selection: used when external factory is absent
browser selection: unreachable after external import failure
validation: always passed, fallback true, representative true
snapshot: id, fallback, sourcePlanVersion, objectCount
```

## Contract mismatch

```txt
provider identity fields differ
version semantics differ
snapshot shapes differ
validation strength differs
placement algorithms differ
object ID formats differ
feature normalization differs
browser failure policy differs from headless behavior
no shared fingerprint contract exists
no parity classification exists
```

## Required common interface

```txt
provider.id
provider.kind
provider.version
provider.sourceUrl
provider.pinnedCommit
provider.create(config)
instance.getRenderPlan({ time })
instance.getSnapshot()
instance.validate()
instance.getProvenance()
instance.getFingerprint()
```

## Required provider policy

```txt
preferred: external
browserFallback: explicit allow or deny
headlessFallback: explicit allow
validationFailureFallback: explicit allow or deny
selection journal retention: bounded
source rebuild: explicit command
source epoch: monotonic
```

## Parity levels

```txt
schema parity:
  required fields and types match

semantic parity:
  area, path, focal tree, coordinate space, seed, and feature intent match

count parity:
  object-type counts match or classified tolerances exist

topology parity:
  enhancer topology keys match when exact parity is required

visual compatibility:
  both providers pass mesh and renderer consumers without fallback geometry

gameplay parity:
  path and focal-tree target facts support the same command/objective outcomes
```

Exact object placement does not need to match unless the fallback is intended to reproduce the same scene. The contract must explicitly state whether the fallback is representative, compatible, or exact.

## Required proof rows

```txt
provider-selection row
source-plan provenance row
source-plan fingerprint row
provider parity comparison row
render-consumption row
gameplay target-index row
```

## Conclusion

`representative: true` is currently an assertion, not evidence. Replace it with measured parity classification and make browser fallback policy explicit.