# Gameplay Audit: Reset Session Replay Loop

**Timestamp:** `2026-07-14T09-58-25-04-00`

## Summary

The current game state has one hard-coded session identity and a tick that advances only frame/time metadata. Reset recreates the same frame-zero state without a new run identity, replay journal or command result.

## Plan ledger

**Goal:** make reset create a distinct deterministic run that can be replayed and compared without mixing predecessor evidence.

- [x] Trace initial state, tick and reset.
- [x] Identify session identity reuse.
- [x] Identify absent replay inputs and fingerprints.
- [ ] Add deterministic reset/replay fixtures later.

## Current loop

```txt
create state
  -> activeSessionId = arrival-meadow:session-0
  -> frame = 0

tick
  -> frame += 1
  -> record dt and time

reset
  -> create state again
  -> activeSessionId = arrival-meadow:session-0
  -> frame = 0
  -> no predecessor/successor relationship
  -> no reset cause or result
```

## Gameplay gaps

```txt
SessionGeneration: absent
ResetCommandId: absent
ExpectedStateRevision: absent
input journal: absent
reset result: absent
participant receipts: absent
state fingerprint: absent
replay comparison result: absent
stale tick rejection: absent
```

## Required loop

```txt
admit reset command
  -> freeze predecessor revision
  -> create successor session generation
  -> reset all declared participants
  -> publish reset result
  -> replay accepted input journal
  -> compare terminal state and frame fingerprints
```

## Boundary

No gameplay behavior changed.