# External Kit Audit: Meadow Area Kit Provenance Contract

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T16-51-37-04-00`

## Declared external source

```txt
kit id: meadow-area-kit
repository: LuminaryLabs-Agents/NexusEngine-ProtoKits
commit: 11d245913ba4d30f3ce950eb5a17e1cc6e4aa1f5
module: protokits/meadow-area-kit/index.js
exported version: 0.1.0
factory: createMeadowAreaKit
```

## External services

```txt
normalize area, path, style, materials, wind, atmosphere, and scatter features
create deterministic grass, flowers, rocks, mushrooms, tree line, focal tree, and atmosphere descriptors
create meadow-area render plans
validate required area/grass/path/focal-tree conditions
return source snapshots
reset to a deterministic snapshot
optionally create a Nexus runtime kit providing environment:meadow-area, render:meadow-area-plan, and service:meadow-area-query
```

## Current consumer contract

`IntoTheMeadow` checks only that the module exports `createMeadowAreaKit`. It does not capture `MEADOW_AREA_KIT_VERSION`, inspect runtime-kit metadata, persist repository/commit identity, or verify the returned instance beyond later render-plan validation.

## Required provenance contract

```txt
manifest declaration
  -> resolved repository/commit/module URL
  -> import load result
  -> exported factory and version
  -> source instance id/version
  -> source validation result
  -> source-plan id/version/fingerprint
  -> selected mode and fallback reason
  -> downstream enhanced-plan, mesh, render, GameHost, and editor lineage
```

## Required compatibility checks

```txt
factory exists
instance exposes getRenderPlan, getSnapshot or snapshot, and validate
generated plan satisfies the minimum meadow source schema
source version matches an allowed range or exact pin
source fingerprint is deterministic for the same seed/config
source time policy is declared
runtime-kit metadata, when available, is consistent with the manifest id
```

## Decision

Keep the exact commit pin. Add runtime proof around it. Do not replace the pin with a floating branch or package range while provenance and parity are still untested.