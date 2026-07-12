# Action Command and Progression Result Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T09-08-17-04-00`

## Summary

The browser and editor expose no canonical gameplay command surface. The only mutable operation is `tick({dt,time})`, which cannot identify an actor, action, target, input sequence or expected progression revision.

## Plan ledger

**Goal:** route every browser, editor and future controller action through one command/admission/result contract.

- [x] Inventory current mutation surfaces.
- [x] Identify missing command provenance and rejection reasons.
- [x] Define browser/editor parity.
- [x] Define typed results and stale-work rejection.
- [ ] Implement after runtime session identity exists.

## Current ingress

```txt
browser RAF
  game.tick({time,dt})

GameHost
  exposes raw game object
  external callers can reach game.tick/reset directly

editor bridge
  runtime.tick({dt,time})
  runtime.reset()
  no interaction capability
```

## Missing command fields

```txt
commandId
runtimeSessionId
resetGeneration
actorId
action
targetId
input device/source
input sequence
expected target revision
expected progression revision
submittedAt
```

## Canonical command

```txt
InteractionCommand {
  commandId
  runtimeSessionId
  resetGeneration
  actorId
  action: move | path-progress | inspect
  targetId
  payload
  source: browser | editor | replay
  inputSequence
  expectedTargetRevision
  expectedProgressionRevision
  submittedAt
}
```

## Admission map

```txt
command received
  -> validate schema
  -> validate session and reset generation
  -> reject duplicate commandId
  -> validate monotonic input sequence
  -> validate supported action
  -> resolve canonical target
  -> validate target revision
  -> derive action-specific evidence
  -> evaluate affordance and objective policy
  -> prepare progression transaction
```

## Required rejection reasons

```txt
invalid-command
wrong-session
stale-reset-generation
duplicate-command
out-of-order-input
unsupported-action
unknown-target
stale-target-revision
target-out-of-range
affordance-denied
objective-not-active
stale-progression-revision
prepare-failed
commit-failed
```

## Result map

```txt
InteractionResult
  accepted | rejected | duplicate | stale | failed

PathProgressResult
  predecessor progress
  candidate progress
  committed progress
  threshold receipts

InspectResult
  target identity
  proximity/affordance evidence
  predecessor and committed inspect state

ObjectiveProgressionResult
  evaluated objectives
  completed objectives
  activated successor
  ledger revision

StoryProgressionResult
  evaluated triggers
  newly committed beats
  story revision

ProgressionFrameResult
  feedback revision
  first visible frame ID
```

## Browser adapter

```txt
DOM/controller input
  -> normalized action-map result
  -> InteractionCommand
  -> authority dispatch
  -> typed result
  -> UI/feedback projection
```

## Editor adapter

```txt
interaction.dispatch
objective.getState
story.getState
progression.getJournal
  -> same command/result contracts as browser
```

The editor must not mutate state by calling raw game internals.

## Public host boundary

Replace raw mutation exposure with capabilities such as:

```txt
runtime.getState
runtime.getSnapshot
interaction.dispatch
progression.getState
progression.getLastResult
```

Keep raw authority private or explicitly privileged.

## Proof

```txt
same command through browser and editor -> same result digest
same duplicate command -> no second mutation
stale reset-generation command -> rejected
stale progression revision -> rejected
unsupported target/action -> typed rejection
replay command stream -> identical result sequence
```

## Claim boundary

A generic `tick` call is not an interaction API. Interaction authority requires explicit action intent, provenance, admission, typed results and deterministic state transitions.