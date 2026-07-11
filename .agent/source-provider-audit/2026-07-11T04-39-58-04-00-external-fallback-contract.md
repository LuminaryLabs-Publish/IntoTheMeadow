# External and Fallback Source Contract

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T04-39-58-04-00`

## Goal

Define the explicit contract between the pinned external meadow provider and the local fallback provider.

## Current candidates

### External

```txt
id: meadow-area-kit
version: 0.1.0
source: LuminaryLabs-Agents/NexusEngine-ProtoKits
commit: 11d245913ba4d30f3ce950eb5a17e1cc6e4aa1f5
factory: createMeadowAreaKit
```

Capabilities:

```txt
getRenderPlan
getSnapshot / snapshot
validate
reset
createRuntimeKit
```

### Local fallback

```txt
id: fallback-meadow-area-kit
version: represented by raw plan local-source-plan-v1
source: IntoTheMeadow local module
selection: only when externalKits.createMeadowAreaKit is absent
```

Capabilities:

```txt
getRenderPlan
getSnapshot
validate
```

## Current admission behavior

```txt
browser external import fails -> reject startup
browser export missing -> reject startup
direct caller omits external factory -> fallback silently selected
```

This is not one coherent fallback policy.

## Required contract

Every provider candidate must declare:

```txt
providerId
providerVersion
source kind
source reference and commit
factory export
capabilities
raw source-plan schema/version
supported meadow config version
fallback or primary role
```

Every admission must return:

```txt
status: admitted | fallback | degraded | rejected
reason
failureClass
candidate fingerprint
capability result
version result
policy result
sequence and startup generation
```

## Parity policy

The local provider may remain intentionally reduced, but reduction must be classified. For the same config, compare:

```txt
area and seed
required object families
path semantics
focal-tree core properties
feature counts
wind semantics
material semantics
validation
normalized source plan
enhanced descriptor families and topology
```

Allowed results:

```txt
exact
normalized-equivalent
intentional-degradation with explicit differences
incompatible
```

## Production policy decision required

Choose one explicit policy during implementation:

```txt
fail-closed: external failure stops boot with typed visible diagnostics
fallback-allowed: external failure admits local source in degraded mode
fallback-debug-only: production fails closed, debug/test callers may admit fallback
```

The current accidental split between browser fail-closed and Node silent fallback must be removed.
