# Gameplay Audit: Editor Tick and Reset Double-Step Loop

**Timestamp:** `2026-07-15T01-39-38-04-00`

## Summary

The browser editor can manually tick or reset the same game that the recursive RAF advances. Because the editor does not own a scheduler lease, one manual tick can be followed by the normal RAF tick before the first visible result, and reset can be followed by an immediate nonzero-time tick before reset presentation is acknowledged.

## Plan ledger

**Goal:** define deterministic single-step and reset semantics for editor-driven gameplay observation.

- [x] Trace browser manual tick and reset.
- [x] Trace the autonomous RAF step.
- [x] Identify double-step and reset-convergence paths.
- [x] Define explicit headless and visible mutation modes.
- [ ] Implement scheduler admission and fixtures later.

## Tick path

```txt
editor invokes runtime.tick(dt, time)
  -> game advances once
  -> command completes
  -> scheduled RAF runs
  -> game advances again with dt=1/60
  -> later state becomes the first rendered state
```

The result is not necessarily incorrect for free-running gameplay, but it is not a deterministic editor single-step contract.

## Reset path

```txt
editor invokes runtime.reset
  -> game returns to initial state
  -> plan enhancer and renderer remain at predecessor state
  -> command completes
  -> scheduled RAF runs with page-relative time
  -> game ticks before first reset frame
```

The first visible post-reset state is therefore not proven to be the exact reset state.

## Required scheduler policy

```txt
Headless mutation
  -> no browser-frame promise
  -> publish headless RuntimeRevision only

Visible single-step
  -> acquire RAF lease
  -> execute exactly one editor tick
  -> render exactly that revision
  -> acknowledge frame
  -> remain paused or resume by explicit policy

Visible reset
  -> acquire RAF lease
  -> reset all mandatory participants
  -> render the exact reset revision without an extra tick
  -> acknowledge frame
  -> remain paused or resume by explicit policy
```

## Required rejection rules

- Reject a manual visible step when another visible step owns the lease.
- Reject a late RAF callback from a retired scheduler generation.
- Reject stale captures from the predecessor runtime generation.
- Require fresh time and input policy after reset or resume.

## Boundary

No double-step or reset-frame behavior was reproduced in a browser. The source permits these paths and provides no receipt proving otherwise.
