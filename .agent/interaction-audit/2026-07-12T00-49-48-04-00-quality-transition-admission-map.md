# Quality Transition Admission Map

**Timestamp:** `2026-07-12T00-49-48-04-00`

## Goal

Replace implicit profile lookup with one typed command surface shared by automatic policy, GameHost, browser editor and headless operation.

## Current interaction surface

```txt
scene configuration
  -> optional style.performance
  -> enhancer profile lookup
  -> no result

web host
  -> planEnhancer.enhance(rawPlan)
  -> no runtime performance argument
  -> no frame timing samples

GameHost
  -> exposes raw plan enhancer and game authority
  -> no quality capability

browser and Node editors
  -> inspect and capture
  -> no quality list, set, auto, lock or observe command
```

## Missing commands

```txt
ListQualityProfiles
GetEffectiveQuality
SetQualityProfile
EnableAutoQuality
DisableAutoQuality
SetPerformanceBudgetOverride
ClearPerformanceBudgetOverride
ReevaluateQuality
```

## Required command envelope

```txt
QualityTransitionCommand
  commandId
  transitionId
  runtimeSessionId
  rendererGeneration
  surfaceRevision
  expectedQualityRevision
  source
  requestedProfile
  reason
  observedPerformanceWindowId
  optionalBudgetOverrides
```

## Required admission

```txt
validate runtime session and lifecycle phase
validate renderer and surface generations
validate expected quality revision
validate profile schema and supported consumer bindings
validate budget override ranges
classify automatic, manual, debug and recovery sources
reject transition during fatal, disposing or context-lost phases unless policy allows recovery
return prior result for accepted duplicate transitionId
```

## Required result

```txt
QualityTransitionResult
  commandId
  transitionId
  status
  reason
  predecessorQualityRevision
  committedQualityRevision
  requestedProfile
  effectiveProfile
  qualityFingerprint
  budgetLedgerFingerprint
  consumerResults
  topologyKey
  rendererGeneration
  surfaceRevision
  committedFrameId
```

## Transport semantics

```txt
transport success
  != command admitted
  != candidate prepared
  != consumers committed
  != first frame visible
```

Every adapter must retain the typed domain result. Generic `completed` responses are insufficient.

## Automatic policy flow

```txt
PerformanceWindowResult
  -> QualityDecisionResult
  -> QualityTransitionCommand
  -> admission
  -> prepare
  -> commit or rollback
  -> QualityTransitionResult
  -> first-frame acknowledgement
```

## Manual/debug flow

```txt
GameHost or editor request
  -> same QualityTransitionCommand
  -> same admission and budget validation
  -> same transition transaction
  -> same result and observations
```

No adapter may mutate enhancer options, scene style, renderer DPR or consumer budgets directly.

## Required interaction fixtures

```txt
list profiles returns canonical versioned schemas
manual high-to-low transition commits one revision
same transitionId returns the prior result
stale expected revision rejects without mutation
invalid profile rejects before plan preparation
invalid budget override rejects before consumer reservation
auto and manual commands use the same result schema
manual lock suppresses automatic transitions until explicitly released
browser and headless adapters preserve domain status and reason
first visible frame cites the committed transition and quality revision
```
