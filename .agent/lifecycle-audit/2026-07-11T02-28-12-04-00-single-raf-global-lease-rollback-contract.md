# Single-RAF, Global-Lease, and Rollback Contract

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-11T02-28-12-04-00`

## Required session state

```txt
sessionId
runId
state: created | starting | running | stopping | stopped | restarting | failing | failed | disposing | disposed
commandSequence
frameSequence
activeRafId
startedAt
stoppedAt
failedAt
disposedAt
failurePhase
failureReason
resourceLedger
cleanupStack
globalLeaseLedger
listenerLeaseLedger
lastResult
boundedJournal
```

## One-active-RAF invariant

```txt
created     -> 0
starting    -> 0 or 1 during first request transaction
running     -> exactly 1 pending owned RAF
stopping    -> 0 after cancellation
stopped     -> 0
restarting  -> 0 before request, exactly 1 after commit
failing     -> 0 after cancellation
failed      -> 0
disposing   -> 0 after cancellation
disposed    -> 0
```

## Callback fence

A callback is admitted only when:

```txt
captured sessionId == current sessionId
captured runId == current runId
captured rafId == activeRafId
state == running
```

Rejected stale callbacks must not tick, enhance, render, update HUD, or schedule successors.

## Global exposure lease

Lease row:

```txt
{
  leaseId,
  targetId,
  property,
  ownerToken,
  previousValuePresent,
  previousValue,
  installedValue,
  acquiredAt,
  releasedAt,
  releaseStatus
}
```

Release behavior:

```txt
current value is installedValue -> restore previous value or delete
current value differs           -> publish lost_ownership and do not mutate
already released                -> no_op
```

## Listener lease

Every listener row records:

```txt
target
type
listener identity
owner token
installedAt
removedAt
status
```

Stop may leave listeners active if the session is resumable. Fatal and dispose must remove them.

## Cleanup stack

Register inverse cleanup immediately after each acquisition:

```txt
external module reference
game/source provider
renderer
enhancer
GameHost lease
editor global lease
editor listeners
RAF
```

Rollback and dispose execute in reverse order.

## Startup failure phases

```txt
external-import
game-construction
renderer-construction
enhancer-construction
gamehost-lease
editor-global-lease
editor-listeners
first-raf-request
first-frame-tick
first-frame-plan
first-frame-enhance
first-frame-render
first-frame-publication
```

Every phase produces a terminal typed result.

## Stop

```txt
cancel active RAF
clear active RAF ownership
fence old run callbacks
retain game, renderer, enhancer, globals, and listeners
publish completed or no_op result
```

## Restart

```txt
cancel active RAF
increment runId
clear run-local counters
request exactly one RAF
retain resources
publish one completed result
```

## Fatal

```txt
cancel active RAF
reject new commands
execute full cleanup stack
retain detached failure result and journal
show fatal DOM
mark failed
```

Fatal is terminal for that session. A new session must be constructed for retry.

## Dispose

```txt
cancel active RAF
remove listener leases
release editor global lease
release GameHost lease
invalidate enhancer
dispose renderer
release game/source/module references
mark disposed
publish terminal result
```

## Idempotency matrix

```txt
start while running       -> no_op
start while stopped       -> completed
start after failed        -> rejected
start after disposed      -> rejected
stop while running        -> completed
stop while stopped        -> no_op
restart while running     -> completed
restart while stopped     -> completed
restart after failed      -> rejected
dispose while running     -> completed
dispose while stopped     -> completed
dispose while failed      -> completed or no_op after rollback
dispose while disposed    -> no_op
fatal after disposed      -> observation_only
```

## Proof adapters

```txt
fake RAF scheduler
fake global target
fake event target
fake renderer
fake enhancer
fake game
failure injector for every startup phase
```

No browser or real WebGL context should be required for the lifecycle gate.
