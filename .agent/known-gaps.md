# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T11-29-40-04-00`

## Summary

The leading render gap is that successful shader compilation and program linking are treated as sufficient readiness. The active linked interface is not reflected or compared with required attribute, uniform, mesh-layout and uniform-payload schemas before buffer binding and draw submission.

## Plan ledger

**Goal:** close active-symbol, schema, generation and frame-proof gaps while preserving previously documented runtime, gameplay, editor, performance, audio, persistence, DSK-consumption and replay gaps.

- [x] Add WebGL program-interface admission gaps.
- [x] Preserve the preceding interaction/objective progression gap.
- [x] Preserve earlier lifecycle, host, render, audio, persistence and replay gaps.
- [ ] Implement in dependency order.

## Selection state

```txt
10 accessible Publish repositories observed
TheCavalryOfRome excluded
9 eligible repositories centrally tracked with root .agent state
IntoTheMeadow selected as the oldest eligible synchronized repository
only IntoTheMeadow changed in the Publish organization
```

## Program identity gaps

```txt
context-bound program generation: absent
candidate program identity: absent
manifest revision: absent
program-interface fingerprint: absent
predecessor/current program transaction: absent
retired program/interface state: absent
stale program/interface rejection: absent
```

## Active-symbol reflection gaps

```txt
ACTIVE_ATTRIBUTES inventory: absent
getActiveAttrib evidence: absent
ACTIVE_UNIFORMS inventory: absent
getActiveUniform evidence: absent
canonical symbol normalization: absent
symbol type/size inventory: absent
required/optional symbol policy: absent
optimized-out required uniform classification: absent
```

## Attribute admission gaps

```txt
required attributes queried: 5
aggregate attribute admission result: absent
exact GL type validation: absent
array size validation: absent
semantic mapping result: absent
location admission before buffer mutation: absent
mesh-layout fingerprint: absent
mesh/program compatibility result: absent
```

Current attribute rejection occurs only when a first mesh bind reaches `createAttributeBuffer()` with a location below zero.

## Uniform admission gaps

```txt
required uniforms queried: 12
non-null location admission: absent
exact GL type validation: absent
array size validation: absent
host update-operation validation: absent
finite payload batch result: absent
pass-specific required update result: absent
uniform-payload fingerprint: absent
```

A missing uniform location can remain a silent no-op rather than a typed renderer failure.

## Resource and compatibility gaps

```txt
MAX_VERTEX_ATTRIBS observation: absent
uniform component/vector limit profile: absent
active resource usage result: absent
resource-budget rejection: absent
WebGL1/WebGL2 interface compatibility result: absent
precision decision to interface fingerprint correlation: absent
```

## Draw and frame-proof gaps

```txt
draw admission command/result: absent
outline pass interface result: absent
color pass interface result: absent
GPU error observation result: absent
renderer snapshot program generation: absent
renderer snapshot interface fingerprint: absent
first visible program-interface frame receipt: absent
capture/interface correlation: absent
```

## Missing interface proof

```txt
complete five-attribute admission
complete twelve-uniform admission
missing attribute rejection before buffer publication
missing uniform rejection before draw
optimized-out required uniform rejection
attribute type/size mismatch rejection
uniform type/size mismatch rejection
mesh/program schema compatibility
uniform/program schema compatibility
resource-limit rejection
candidate rejection preserves predecessor
stale context/program/interface rejection
WebGL1/WebGL2 parity
first visible frame interface receipt
local browser and deployed Pages parity
```

## Preserved progression gaps

```txt
browser/editor interaction command surface
canonical target evidence
path and inspection mutation
objective evaluation and completion ledger
story trigger evaluation and deduplication
atomic progression commit and rollback
feedback projection
first visible progression-frame acknowledgement
```

## Preserved editor and host gaps

```txt
raw GameHost capability quarantine
editor bridge generation and predecessor retirement
listener leases
bounded bridge errors
stale capability rejection
capture/frame provenance
host stop/dispose parity
```

## Preserved runtime and rendering gaps

```txt
runtime session lifecycle and ordered disposal
RAF clock and step admission
source-provider artifact authority
render topology identity
WebGL context recovery
render surface revision and physical-buffer proof
shader precision capability admission
committed frame observation
fatal frame recovery
adaptive quality and physical-policy parity
camera-distance/frustum grass LOD
```

## Preserved audio and data gaps

```txt
trusted audio activation and resource generations
audio listener/output proof
save schema, migration and atomic hydration
DSK declaration-to-runtime consumption authority
independent deterministic replay and first-divergence proof
```

## Completion boundary

Do not treat compile/link success, queried locations, a returned renderer snapshot, a `gpu:` DOM marker or a non-empty screenshot as interface proof. Completion requires reflected active symbols, exact schema compatibility, current generations, typed binding/update/draw results and a visible frame citing the accepted interface fingerprint.