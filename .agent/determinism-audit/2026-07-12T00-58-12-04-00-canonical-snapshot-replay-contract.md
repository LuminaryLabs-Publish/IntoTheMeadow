# Canonical Snapshot and Replay Contract

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-12T00-58-12-04-00`

## Goal

Replace permissive JavaScript stringification and same-instance reads with an admitted canonical value model and replay contract that can explain the first mismatch.

## Current validator

```js
const first = stableStringify(createSnapshot());
const second = stableStringify(createSnapshot());
return { passed: first === second };
```

## Canonicalization risks

`stableStringify()` sorts plain object keys, but it does not define an admissible value schema.

```txt
NaN and Infinity serialize as null
-0 serializes as 0
sparse arrays and undefined array elements can collapse
Date, Map and Set lose semantic type
functions and symbols are not meaningfully represented
typed values lack explicit type tags
cyclic values throw
getter side effects are not fenced
prototype and class identity are omitted
```

The current snapshots appear mostly plain frozen data, but the validator does not enforce that boundary. Future provider, renderer or editor observations can silently exceed it.

## Canonical value schema

Allowed values should be explicit:

```txt
null
boolean
UTF-8 string
finite number with -0 policy
ordered array of canonical values
plain object with sorted UTF-8 keys and canonical values
explicit tagged byte/typed arrays when required
```

Rejected values should include:

```txt
undefined
NaN
Infinity
functions
symbols
cyclic references
accessor properties
unsupported prototypes
Map/Set/Date without an explicit tagged adapter
```

## Fingerprint envelope

```txt
DeterminismFingerprintEnvelope
  schemaId
  schemaVersion
  projectionId
  projectionVersion
  providerId
  providerVersion
  providerFingerprint
  seedPolicyId
  seedFingerprint
  contentFingerprint
  scenarioFingerprint
  checkpointId
  committedTickId
  canonicalByteLength
  digestAlgorithm
  digest
```

## Projection boundaries

Separate fingerprints are required for:

```txt
canonical initial state
committed gameplay state
objective/story progression
source render plan
enhanced render plan
renderer observation
first visible frame
capture artifact metadata
```

## Replay rules

```txt
two independent runtime constructions
same admitted inputs and normalized ticks
no shared mutable provider or cache state
reset creates an explicit new replay epoch
all checkpoints use the same canonical schema and version
comparison stops at and reports the first divergence
success records bounded evidence, not entire unbounded snapshots
```

## Negative controls

Every fixture suite must prove that changing one admitted cause changes the expected fingerprint:

```txt
seed
provider version
content revision
command order
tick schedule
quality policy
render-plan schema
```

## Completion boundary

A Boolean string comparison is insufficient. Completion requires canonical schema admission, versioned fingerprints, independent replay, negative controls and an exact first-divergence result.