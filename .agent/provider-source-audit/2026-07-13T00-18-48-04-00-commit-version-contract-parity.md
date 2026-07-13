# Provider Commit, Version and Contract Parity

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-13T00-18-48-04-00`

## Summary

A commit-pinned module URL narrows code identity but does not prove that the loaded provider satisfies the expected contract or that the local fallback is semantically equivalent. Current browser and proof surfaces expose different version identities without a shared compatibility profile.

## Plan ledger

**Goal:** define the source, version, service and semantic evidence required before external/fallback parity can be claimed.

- [x] Separate commit pinning from runtime admission.
- [x] Record current version identities.
- [x] Define service and plan contract checks.
- [x] Define normalized parity dimensions and fingerprints.
- [x] Define drift and fallback policy.
- [ ] Implement and execute later.

## Current source identities

```txt
browser provider
  source: commit-pinned ProtoKits module URL
  factory: createMeadowAreaKit
  declared provider version: 0.1.0

local fallback
  source: repository-local fallback factory
  render-plan version: local-source-plan-v1
```

These identifiers are not directly comparable and are not admitted through a shared contract version.

## Commit pinning proves

```txt
one requested repository commit
one requested module path
cache-stable URL identity
```

## Commit pinning does not prove

```txt
successful browser import
expected export shape
provider API compatibility
required service availability
valid provider snapshot
valid render-plan contract
fallback compatibility
semantic equivalence
first visible frame provenance
```

## Required contract manifest

```txt
ProviderContractManifest {
  providerId
  providerContractVersion
  implementationVersion
  sourceMode
  owner
  repository
  commit
  modulePath
  services[]
  snapshotSchemaVersion
  renderPlanSchemaVersion
  deterministicSeedProfile
  compatibilityProfiles[]
}
```

## Required service contract

At minimum, the admitted meadow provider must explicitly expose or adapt:

```txt
arrival-area normalization
path normalization
style/material normalization
deterministic seeded scatter
feature descriptors
render-plan generation
validation
snapshot
reset
optional runtime adapter capability
```

## Parity dimensions

```txt
schema and required fields
area identity, bounds and scale
path control data and corridor semantics
feature/object category identities
feature counts and deterministic ordering
positions, rotations and scales under tolerance
material/style semantic identifiers
wind and atmosphere descriptors
provider snapshot invariants
reset determinism
deterministic content fingerprints
```

## Normalized fingerprints

```txt
providerFingerprint
  -> contract manifest
  -> implementation identity
  -> provided service IDs
  -> normalized snapshot schema

planFingerprint
  -> normalized area/path/features/materials
  -> environment-independent ordering
  -> declared numeric tolerances
  -> compatibility-profile version
```

## Compatibility policy

```txt
exact
  all normalized values and fingerprints match

semantic-compatible
  declared representational differences are tolerated
  gameplay and render semantics remain equal

incompatible
  missing services, schema drift or semantic drift
  candidate is rejected
```

## Required fixtures

```txt
external provider import succeeds at pinned commit
external provider manifest is admitted
fallback manifest is admitted
identical config and seed run through both providers
normalized outputs are compared
allowed differences are reported
unexpected drift is rejected
repeat run proves deterministic fingerprints
browser, headless and Pages artifacts expose source lineage
```

## Validation boundary

No claim is made that the providers are currently incompatible or visually different. The current state is unproven, not proven divergent.