# Declared, Runtime, and Consumption Contract

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-11T02-20-44-04-00`

## Classification model

### Declaration state

```txt
external
local-required
local-planned
```

### Implementation state

```txt
source-backed
descriptor-shell
external-provider
unresolved
```

### Runtime state

```txt
not-imported
imported
invoked
failed
```

### Consumption state

```txt
not-applicable
not-observed
produced
partially-consumed
consumed
rejected
unsupported
fallback-consumed
```

## Invariants

```txt
counts derive from the registry source, never prose
required kits must have explicit labels and services
source-backed requires a resolvable implementation module
imported requires a module observation
invoked requires a call/result observation
produced requires an output row
consumed requires a producer-to-consumer edge and consumer result
descriptor-shell cannot be reported as runtime-implemented
external-provider must retain URL, commit, version, and provider result
all proof journals are bounded and immutable
```

## First fixture cases

```txt
registry count is 43 local plus one external
required count is 15
renderer kit fails completeness until explicit services are added
gameplay descriptor shells remain unimplemented
external meadow provider resolves as external-provider
fallback meadow source resolves as source-backed but not local-declared
browser and Node snapshots serialize the same row schema
```
