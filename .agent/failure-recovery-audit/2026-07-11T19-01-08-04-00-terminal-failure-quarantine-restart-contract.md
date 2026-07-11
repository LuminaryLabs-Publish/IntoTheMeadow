# Terminal Failure, Quarantine and Restart Contract

**Timestamp:** `2026-07-11T19-01-08-04-00`

## Goal

Define the lifecycle contract that separates a recoverable WebGL event, a safely rolled-back frame rejection and a terminal runtime failure requiring complete graph retirement and cold replacement.

## Failure classes

```txt
candidate-rejection
  candidate work failed before public commit
  predecessor graph remains healthy

recoverable-resource-failure
  WebGL context/resource state requires recovery
  graph remains quarantined until a recovered frame commits

terminal-runtime-failure
  invariant, cleanup, unknown-state or multi-owner failure
  predecessor graph must be retired

startup-failure
  candidate never becomes public ready state
  all acquired leases must be cleaned
```

## Quarantine contract

Entering quarantine must atomically:

```txt
stop new automatic frame admission
invalidate pending candidate work
retain the prior committed observation
block tick/reset/rebuild/capture
freeze public readiness
publish failure identity and classification
record resource and cleanup impact
```

Quarantine must not imply that predecessor resources are safe to resume.

## Cleanup ledger

Every acquisition must register:

```txt
leaseId
ownerId
resourceKind
acquiredAtPhase
cleanupOrder
cleanupCallback
cleanupStatus
cleanupFailure
```

Cleanup executes once in reverse order. A cleanup failure is evidence for terminal state, not permission to return to ready.

## Rollback or retirement decision

```txt
candidate plan/validation failure with no live mutation
  -> reject candidate
  -> preserve ready predecessor

known WebGL context loss
  -> context-recovery authority
  -> remain quarantined until recovered frame

state advanced or resource mutation with uncertain rollback
  -> terminal retirement

cleanup failure or unknown owner state
  -> terminal retirement
```

## Cold restart contract

```txt
ColdRestartCommand
  predecessorSessionId
  predecessorFailureId
  expectedTerminalRevision

admission
  terminal predecessor exists
  no active cleanup is pending
  caller holds restart capability

execution
  finalize predecessor cleanup
  allocate replacement runtime/session/renderer identities
  acquire resources under a new ledger
  publish no globals before candidate validation
  commit first replacement frame
  publish replacement capabilities and readiness

result
  predecessor identities
  cleanup result
  replacement identities
  first committed frame
  status/failures
```

## Stale-work rejection

Every callback, command, render result and editor invocation must carry or resolve:

```txt
runtimeSessionId
rendererInstanceId
frameGeneration
failureRevision
```

Predecessor work arriving after terminal retirement must be rejected without mutation.

## Observability

Expose bounded, clone-safe records:

```txt
current lifecycle/failure state
last failure result
last cleanup result
last cold restart result
current committed frame
active lease counts by owner/resource kind
rejected stale-work count
```

Raw resources, callbacks and mutation owners remain private.

## Required fixtures

```txt
failure at every startup phase
failure at every frame phase
candidate rejection without terminal retirement
WebGL recovery routing
uncertain partial draw terminal retirement
cleanup failure
capability quarantine
late predecessor callback
cold restart success/failure
three repeated restart cycles
idempotent final disposal
```

## Completion rule

A replacement route is ready only when predecessor cleanup is finalized, replacement ownership is committed, public capabilities identify the replacement session and a first replacement frame has committed. Error text, a stopped RAF or a scheduled new callback is insufficient.