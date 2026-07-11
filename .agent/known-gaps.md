# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T02-20-44-04-00`

## Selection state

```txt
10 accessible LuminaryLabs-Publish repositories observed
TheCavalryOfRome excluded by rule
9 eligible repositories centrally tracked with root .agent state
IntoTheMeadow selected as oldest eligible documented fallback
only IntoTheMeadow changed
```

## Registry census correction

```txt
source local registry count: 43
external registry count: 1
total declared count: 44
required-v0.1 local count: 15
prior docs incorrectly said 44 local plus one external
```

## Registry authority gaps

```txt
active-v0.1 is derived from required-list membership
membership does not prove implementation
implementation does not prove import
import does not prove invocation
invocation does not prove output
output does not prove consumer use
consumer use does not survive into a proof ledger
```

## Service-contract gaps

```txt
meadow-webgl-renderer-v2-kit lacks explicit DOMAIN_LABELS mapping
meadow-webgl-renderer-v2-kit lacks explicit SERVICES mapping
required renderer descriptor receives generic fallback services
actual renderer behavior is richer than its declared service row
no automated comparison checks declared services against exported behavior
```

## Runtime inventory gaps

```txt
fallback-meadow-area-kit is source-backed but not a local registry ID
install-dsks is source-backed but not represented as a kit row
render-plan enhancer and mesh builder are source-backed but not explicit registry rows
precision compatibility adapter is source-backed but not a registry row
GameHost and browser/Node editor surfaces are source-backed but not registry rows
many declared gameplay/audio/save/UI kits are descriptor shells
```

## Consumption-proof gaps

```txt
registry snapshot records descriptor status only
no import or invocation ledger exists
no producer-to-consumer edge list exists
mesh builder does not retain per-kit contribution rows
renderer snapshot does not retain kit or descriptor producer IDs
gameplay loop does not retain descriptor-consumption rows
editor and GameHost cannot query kit truth
```

## Existing runtime gaps retained

```txt
no authoritative runtime session lifecycle
RAF ownership and restart are unsafe
no atomic committed frame
browser and Node source/time/render observations diverge
interaction and objective descriptors are not executable
source provider provenance and parity are unproved
```

## Required missing fixtures

```txt
dsk-registry-census-smoke
dsk-required-status-smoke
dsk-service-map-completeness-smoke
dsk-implementation-resolution-smoke
dsk-import-invocation-smoke
dsk-producer-consumer-edge-smoke
renderer-kit-service-contract-smoke
mesh-contribution-ledger-smoke
gameplay-descriptor-consumption-smoke
gamehost-kit-truth-readback-smoke
browser-node-kit-truth-parity-smoke
```

## Current order

```txt
1. Runtime Session Lifecycle Authority
2. Committed Frame Observation Authority
3. Source Provider Authority
4. Interaction Command Authority
5. DSK Registry Truth + Mesh Contribution and Consumer Proof
```
