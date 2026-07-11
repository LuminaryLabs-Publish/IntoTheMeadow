# Session Ownership and Rollback Contract

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-10T22-58-36-04-00`

## Required session state

```txt
sessionId
runId
state: created | starting | running | stopping | stopped | restarting | disposing | disposed | failed
commandSequence
rafId
frameCount
startedAt
stoppedAt
disposedAt
failurePhase
failureReason
resourceLedger
globalLeaseLedger
lifecycleJournal
```

## Acquisition ledger

Every successful acquisition must register cleanup immediately.

```txt
external kit module
  cleanup: release retained module reference

game
  cleanup: release retained game/content/source references

renderer
  cleanup: renderer.dispose

enhancer
  cleanup: invalidate cache and release reference

GameHost lease
  cleanup: restore previous value or delete only when lease still owns it

editor bridge
  cleanup: editorBridge.dispose

RAF
  cleanup: cancelAnimationFrame(rafId)
```

## Startup rollback

Failure phases:

```txt
external-import
game-construction
renderer-construction
enhancer-construction
gamehost-exposure
editor-installation
first-frame-tick
first-frame-plan
first-frame-render
first-frame-publication
```

On failure:

```txt
mark failed transition pending
cancel owned RAF
execute cleanup stack in reverse order
retain detached JSON-safe failure result
publish visible fatal DOM output
mark failed terminal state
```

## Stop semantics

A resumable stop must:

```txt
cancel the retained RAF
clear RAF ownership
fence queued callbacks by runId
prevent tick/render submission
leave game/renderer/editor resources intact
return no-op when already stopped
reject after disposal
```

## Restart semantics

Restart is one transaction:

```txt
validate current state
cancel old RAF
increment runId
clear run-local counters
schedule exactly one new RAF
return completed result
```

It must never be implemented as an uncoordinated public `stop(); start();` pair.

## Dispose semantics

Disposal order:

```txt
mark disposing
reject new mutating commands
cancel RAF
remove editor listeners and release editor global
release GameHost lease
invalidate enhancer cache
call renderer.dispose
release game, plan, render, and module references
mark disposed
append terminal result
```

## Idempotency matrix

```txt
start while running       -> no-op
start while stopped       -> accepted
start after disposed      -> rejected
stop while running        -> accepted
stop while stopped        -> no-op
stop after disposed       -> rejected
restart while running     -> accepted, old RAF cancelled before new RAF
restart while stopped     -> accepted, runId increments and one RAF starts
dispose while running     -> accepted
dispose while stopped     -> accepted
dispose while disposed    -> no-op
fatal after disposed      -> observation only
render after disposed     -> rejected
```

## Proof requirement

Every lifecycle command from browser controller, GameHost, and editor must produce the same stable result statuses and reason codes. Fake RAF, fake global target, fake event target, and fake renderer resources must prove stop/restart/dispose/rollback without requiring a browser.
