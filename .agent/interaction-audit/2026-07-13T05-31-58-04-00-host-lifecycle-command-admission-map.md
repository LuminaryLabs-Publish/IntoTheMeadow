# Interaction audit: host lifecycle command admission

**Timestamp:** `2026-07-13T05-31-58-04-00`

## Summary

The host lifecycle surface is currently two untyped methods plus internal fatal handling. There is no command identity, expected generation, transition result, or stale-command rejection, and browser editor capabilities remain independently invokable after stop or failure.

## Plan ledger

**Goal:** route every start, pause, resume, retire, editor mutation, and fatal transition through explicit lifecycle admission.

- [x] Identify current lifecycle inputs.
- [x] Identify current capability inputs.
- [x] Identify missing command/result boundaries.
- [x] Define admission and rejection rules.
- [ ] Implement and execute interaction fixtures later.

## Current interaction map

```txt
page boot
  -> direct startWebHost call

returned host.stop()
  -> direct boolean mutation

returned host.start()
  -> direct boolean mutation and RAF scheduling

frame exception
  -> direct showFatal call
  -> direct boolean mutation and HUD projection

NexusEditorEnvironment.invoke(action, args)
  -> capability lookup
  -> execute against captured gameHost
  -> no host-lifecycle admission
```

## Missing command identities

```txt
StartWebHostCommandId
PauseWebHostCommandId
ResumeWebHostCommandId
RetireWebHostCommandId
FatalHostResultId
EditorCapabilityInvocationId
ExpectedHostGeneration
ExpectedLifecycleRevision
```

## Required admission matrix

| Current phase | Start | Pause | Resume | Retire | Editor read | Editor mutate |
|---|---|---|---|---|---|---|
| Created | accept | reject | reject | accept | unavailable | unavailable |
| Starting | duplicate/stale policy | reject | reject | cancel/retire | bounded | reject |
| Running | duplicate policy | accept | already-running | accept | accept | capability policy |
| Paused | duplicate policy | already-paused | accept | accept | accept-paused | explicit debug policy |
| Failed | recovery policy | reject | reject | accept/idempotent | bounded diagnostics | reject |
| Retired | reject | reject | reject | already-retired | terminal snapshot only | reject |

## Required interaction transaction

```txt
HostLifecycleCommand
  -> validate command ID
  -> validate host session and expected generation
  -> validate expected lifecycle revision
  -> validate transition against current phase
  -> reserve transition revision
  -> perform transition-specific participant work
  -> publish Accepted, Rejected, Stale, Duplicate, AlreadyApplied, Degraded, or Failed
  -> expose immutable result to GameHost/editor diagnostics
```

## Editor capability binding

Every browser editor invocation should bind:

```txt
editorBridgeGeneration
hostGeneration
lifecycleRevision
capabilityPolicyRevision
mutationClass: read | debug-step | mutation | capture
```

Policy examples:

```txt
Running  -> reads accepted; debug mutation only under explicit mode
Paused   -> reads accepted; stepping requires named debug capability
Failed   -> bounded diagnostics only
Retired  -> terminal snapshot only; capture and mutation unavailable
Stale bridge generation -> zero execution
```

## Stale predecessor quarantine

```txt
host A installed
host B replaces or supersedes A
late host A RAF, editor invocation, stop, fatal, or dispose callback
  -> compare generation
  -> return Stale
  -> perform zero mutation against host B
```

## Required fixtures

```txt
duplicate start command
stale pause command
resume from Running
resume from Paused
retire from Running
retire twice
editor tick while Paused
editor tick while Failed
editor invoke from stale bridge generation
late fatal callback from predecessor host
```

## Validation boundary

No lifecycle or editor interaction behavior changed. No command admission, stale generation, or capability-policy fixture was executed.
