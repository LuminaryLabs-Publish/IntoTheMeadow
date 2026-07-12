# Replay Scenario Admission and Result Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-12T00-58-12-04-00`

## Goal

Define one typed path from a deterministic scenario request to independent replay execution, checkpoint comparison and an exact result.

## Current path

```txt
test calls validateDeterminism(callback)
  -> callback has no scenario identity
  -> no provider or seed admission
  -> no command or tick sequence
  -> no runtime independence
  -> Boolean pass/fail only
```

## Required command

```txt
RunReplayScenarioCommand
  commandId
  scenarioId
  schemaVersion
  providerDescriptor
  seedDescriptor
  contentFingerprint
  initialStateDescriptor
  commandSequence
  tickSchedule
  checkpointPolicy
  expectedResultPolicy
```

## Admission checks

```txt
known scenario schema
canonical-value-safe content
supported provider and version
resolved provider fingerprint
resolved seed policy
bounded command count
bounded tick count
monotonic command sequence
finite normalized dt values
known targets and actions
compatible manifest/content fingerprint
```

## Result states

```txt
accepted
rejected-invalid-scenario
rejected-provider-mismatch
rejected-content-mismatch
rejected-noncanonical-value
rejected-budget
completed-deterministic
completed-divergent
duplicate
stale
failed-construction
failed-execution
failed-observation
```

## First divergence

```txt
FirstDivergence
  checkpointId
  committedTickId
  domainId
  path
  leftFingerprint
  rightFingerprint
  leftValueSummary
  rightValueSummary
  classification
```

## Idempotency

Duplicate `commandId` or `scenarioId + scenarioFingerprint` execution must return the cached terminal result or an explicit in-progress result. It must not create additional providers, runtimes, renderer resources or journal rows.

## Observation surfaces

```txt
Node test runner
browser GameHost capability gateway
browser editor bridge
headless editor environment
diagnostics report
bounded replay journal
visible-frame receipt
```

All surfaces must expose the same result schema and scenario fingerprint.