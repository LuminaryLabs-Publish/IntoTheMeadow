# DSK Registry and Service Truth Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-11T02-20-44-04-00`

## Current DSK construction

```txt
src/content/dsk-registry.js
  -> LOCAL_DSK_IDS (43)
  -> REQUIRED_V01_DSK_IDS (15)
  -> EXTERNAL_DSK_IDS (1)

src/dsks/index.js
  -> DOMAIN_LABELS
  -> SERVICES
  -> createDskDescriptor(id)
  -> required membership => active-v0.1
  -> non-required membership => planned

src/boot/install-dsks.js
  -> validate local descriptor shape
  -> mark external loaded or deferred
  -> expose install snapshot
```

## Current authority problem

The chain proves that an ID is present and descriptor-shaped. It does not prove runtime behavior.

```txt
declaration
  != implementation
  != import
  != invocation
  != output
  != consumption
  != observed proof
```

## Required parent domain

```txt
dsk-registry-truth-domain
```

Owns only registry and proof metadata:

```txt
registryRevision
declaredKitRows
implementationRows
invocationRows
producerConsumerEdges
validationRows
bounded proof journal
detached snapshot
```

It must not own game state, terrain, mesh buffers, renderer resources, or editor artifacts.

## Candidate kits

```txt
dsk-census-kit
dsk-declaration-row-kit
dsk-required-status-kit
dsk-service-contract-kit
dsk-implementation-resolver-kit
dsk-import-observation-kit
dsk-invocation-observation-kit
dsk-output-kind-kit
dsk-consumer-edge-kit
dsk-consumption-status-kit
dsk-proof-row-kit
dsk-truth-snapshot-kit
GameHost-dsk-truth-projection-kit
editor-dsk-truth-capability-kit
dsk-registry-truth-fixture-kit
```

## Required row

```txt
kitId
domain
label
declaredServices
required
implementationStatus
implementationModule
imported
invoked
outputKinds
consumerIds
consumptionStatus
proofRows
validation
```

## Important correction

```txt
local declared kits: 43
external declared kits: 1
total declared kits: 44
```

The registry is not one external plus 44 local kits.
