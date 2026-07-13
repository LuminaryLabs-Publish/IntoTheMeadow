# Provider Commit Version Contract Parity

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-13T00-10-19-04-00`

## Summary

The manifest pin improves repeatability but does not establish runtime compatibility or parity with the local fallback.

## Plan ledger

**Goal:** turn source pinning into a validated provider contract.

- [x] Record exact external repository commit.
- [x] Record external and fallback version strings.
- [x] Record current export and validation checks.
- [x] Record missing service and semantic contracts.
- [ ] Add contract metadata and fixtures later.

## Current identities

```txt
external:
  repo: LuminaryLabs-Agents/NexusEngine-ProtoKits
  commit: 11d245913ba4d30f3ce950eb5a17e1cc6e4aa1f5
  module: protokits/meadow-area-kit/index.js
  version: 0.1.0
  exported factory: createMeadowAreaKit

fallback:
  repo: LuminaryLabs-Publish/IntoTheMeadow
  module: src/game/create-into-the-meadow-game.js
  plan builder: src/content/meadow-areas/create-local-meadow-source-plan.js
  version: local-source-plan-v1
```

## Current validation

```txt
external:
  URL exists in manifest
  module import succeeds
  factory is a function

fallback:
  validate() always returns passed
  representative flag only

missing:
  expected provider version range
  required service IDs
  runtime adapter conformance
  snapshot schema
  render-plan semantic profile
  source and plan fingerprints
  cross-source parity result
```

## Required compatibility profile

```txt
area identity and coordinate space
path enablement, width and point semantics
required object-type set
deterministic object IDs
count and ordering policy
focal-tree contract
wind and atmosphere contract
render-plan validation schema
snapshot/reset semantics
renderer-independent service manifest
```
