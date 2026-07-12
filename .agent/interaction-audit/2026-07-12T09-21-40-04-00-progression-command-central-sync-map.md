# Progression Command and Central-Sync Interaction Map

**Timestamp:** `2026-07-12T09-21-40-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

Browser and editor interaction paths can tick, reset, read and capture the runtime, but neither can submit a typed progression command. This audit maps the required semantic parity and records the central-sync boundary.

## Plan ledger

**Goal:** give browser, editor and future automation callers one command/result contract without exposing raw game mutation.

- [x] Identify current browser and editor capabilities.
- [x] Confirm no interaction/progression command exists.
- [x] Define command admission and typed rejection.
- [x] Define browser/editor parity.
- [x] Define detached observation and central tracking requirements.
- [ ] Implement after runtime-session and host-gateway authorities exist.

## Current ingress

```txt
browser RAF -> game.tick({time, dt})
GameHost -> raw game/state/snapshot/diagnostics access
editor -> read, tick, reset, render, capture
```

## Missing ingress

```txt
move/path-progress command
inspect command
canonical target query
expected progression revision
expected reset generation
command identity/idempotency
semantic result and rejection reason
```

## Required command

```txt
InteractionCommand {
  commandId
  source: browser | editor | automation
  sessionId
  resetGeneration
  expectedProgressionRevision
  actorId
  action: path-progress | inspect
  targetId
  payload
}
```

## Required result

```txt
InteractionResult {
  commandId
  accepted
  reason
  targetRevision
  predecessorProgressionRevision
  committedProgressionRevision
  objectiveResults[]
  storyResults[]
  feedbackRevision
}
```

## Admission rules

```txt
reject unsupported source/action
reject stale session or reset generation
reject stale expected progression revision
reject unknown target or stale target revision
reject invalid affordance or range
coalesce duplicate commandId
preserve predecessor on prepare/commit failure
publish detached result and bounded journal entry
```

## Parity invariant

The browser adapter, editor capability and future automation adapter must produce the same semantic command for the same action evidence and receive the same typed result. No adapter may mutate path, inspection, objective or story state directly.

## Documentation synchronization

```txt
repo-local START_HERE
repo-local kit-registry
repo-local tracker and audit family
central repo ledger
central internal change log
```

All five surfaces must identify the same current audit timestamp, status and parent domain. A stale machine registry is treated as an audit-state defect even when the human Markdown files are current.

## Validation boundary

```txt
runtime command surface changed: no
editor capability changed: no
browser adapter changed: no
parity fixtures available: no
```
