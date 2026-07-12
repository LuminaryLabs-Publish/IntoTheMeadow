# Performance Sampling, Budget and Transition Contract

**Timestamp:** `2026-07-12T00-49-48-04-00`

## Goal

Define cadence-independent sampling, complete budget enforcement and reversible quality transitions for the meadow runtime.

## Current policy facts

```txt
policy version: 0.2.0
profiles: low, medium, high, ultra, auto
production default: high
sample collection: none
adaptive decision: none
hysteresis: none
cooldown: none
quality revision: none
budget ledger: none
transition result: none
```

## Current profile contract

Profiles currently contain:

```txt
outline
grassScale
flowerScale
terrainResolution
postProcess
```

The policy derives:

```txt
maxGrassInstances
maxFlowerObjects
maxSmallScatterObjects
maxTreeLineObjects
hero/soft/tiny/far outline weights
```

Only part of that contract reaches consumers.

## Required sample model

```txt
PerformanceSample
  sampleId
  runtimeSessionId
  frameId
  qualityRevision
  monotonicTimestamp
  cpuFrameMs
  optionalGpuFrameMs
  drawingBufferPixels
  vertexCount
  triangleCount
  grassInstanceCount
  visibilityState
  suspensionEpoch
  valid
  invalidReason
```

Samples must be collected after frame completion and must not reuse RAF absolute time as a frame-cost measurement.

## Required window policy

```txt
elapsed-time window, not frame-count window
minimum valid sample duration
separate degrade and recover thresholds
minimum profile residency
transition cooldown
outlier policy
visibility and bfcache policy
context-loss and fatal-frame exclusion
bounded sample history
```

The same cost trace must produce the same decision at 30, 60 and 120 Hz.

## Required budget ledger

```txt
PerformanceBudgetLedger
  qualityRevision
  profileId
  total grass instances
  total grass cards
  flowers
  mushrooms
  rocks
  tree-line objects
  small scatter
  terrain vertices/triangles
  post-process passes
  draw calls
  drawing-buffer pixels
  reserved
  consumed
  dropped
  remaining
  violations
```

Every consumer must reserve before generating topology. Source-order truncation without stable priority or a result is not sufficient.

## Required profile bindings

```txt
grassScale
  -> density and explicit global grass instance/card ceilings

flowerScale
  -> deterministic flower allocation policy

terrainResolution
  -> admitted x/z segment topology

postProcess
  -> descriptor pass enablement and actual draw submission

outline
  -> object outline weights and optional outline-pass policy

surface policy
  -> admitted DPR/pixel budget extension required
```

## Required transition phases

```txt
DECIDE
  -> produce QualityDecisionResult

ADMIT
  -> validate session, generations, profile and expected revision

ALLOCATE
  -> create complete budget ledger

PREPARE
  -> build detached render plan and required GPU resources

VALIDATE
  -> prove every consumer honored the admitted profile and budget

COMMIT
  -> activate one quality revision atomically

ACKNOWLEDGE
  -> correlate the first visible frame

RETIRE
  -> dispose predecessor-only resources

ROLLBACK
  -> preserve or restore predecessor quality on failure
```

## Required decisions

```txt
NoChange
Degrade
Recover
ManualOverride
AutoLocked
Suspended
InsufficientEvidence
ConsumerUnsupported
RejectedStale
RejectedInvalidProfile
FailedPrepare
RolledBack
Committed
```

## Required observations

```txt
current quality profile and version
quality revision and fingerprint
latest performance window
latest decision and reason
active budget ledger
consumer effective settings
transition phase and result
first visible quality-frame receipt
bounded sample and transition journals
```

## Acceptance matrix

```txt
stable fast trace remains high
stable slow trace degrades deterministically
recovery requires declared sustained evidence
alternating threshold trace does not thrash
30/60/120 Hz cadence parity
hidden-tab interval does not trigger degradation
unknown profile rejects
low profile changes terrain/post/draw behavior
ultra profile stays inside explicit hard ceilings
adversarial source plan cannot exceed any budget
duplicate transition is idempotent
stale transition rejects
consumer preparation failure rolls back
context loss during transition produces one classified result
GameHost, browser editor and headless observations agree
visible frame cites the committed quality revision
```
