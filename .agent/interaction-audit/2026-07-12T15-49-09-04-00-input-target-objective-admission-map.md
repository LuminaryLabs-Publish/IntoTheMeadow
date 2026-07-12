# Interaction Audit: Input, Target and Objective Admission

**Timestamp:** `2026-07-12T15-49-09-04-00`

## Summary

The repository declares input, player, interaction and objective services, but the web host has no browser input listeners and the game has no command admission surface. Authored target descriptors can be read but cannot produce authoritative interaction evidence.

## Plan ledger

**Goal:** route every gameplay action through normalized input, target evidence, service-generation admission, idempotent command handling and typed progression results.

- [x] Trace browser input ownership.
- [x] Trace target descriptors and objective requirements.
- [x] Confirm no command API or target-query service is active.
- [x] Define required admission and result flow.
- [ ] Implement after provider installation authority.

## Current path

```txt
keyboard/pointer/gamepad input
  -> no listener
  -> no normalized sample
  -> no action map
  -> no command
  -> no target query
  -> no interaction result
  -> no objective mutation
```

The editor bridge can inspect and capture the environment, but no gameplay capability is published for movement or inspection.

## Required admission map

```txt
DeviceEvent or EditorGameplayRequest
  -> InputSample {
       inputId,
       deviceId,
       timestamp,
       runtimeGeneration,
       context,
       action,
       value
     }
  -> InputAdmissionResult
  -> GameplayCommand {
       commandId,
       sessionId,
       capabilityGeneration,
       expectedGameplayRevision,
       action,
       payload
     }
  -> service binding admission
  -> target evidence or motion evidence
  -> objective/story candidate results
  -> atomic GameplayCommitResult
```

## Inspect-tree evidence

```txt
committed player transform
focal-tree descriptor revision
interaction radius policy
line-of-sight or distance result
input context and action
capability generation
expected gameplay revision
command id and idempotency record
```

A target id supplied by a caller is not sufficient evidence by itself.

## Status examples

```txt
Accepted
AcceptedNoStateChange
RejectedNoProvider
RejectedWrongContext
RejectedStaleCapabilityGeneration
RejectedStaleGameplayRevision
RejectedUnknownAction
RejectedTargetUnavailable
RejectedOutOfRange
RejectedDuplicateConflict
Retired
```

## Required observations

```txt
input samples accepted/rejected
commands admitted/rejected
target queries and reasons
service ids and provider generations consumed
objective/story candidates and commits
idempotent duplicate outcomes
first visible feedback frame
```

No input or interaction behavior was changed by this audit.