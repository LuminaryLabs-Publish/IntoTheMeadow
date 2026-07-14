# Gameplay Audit: Boot to First Frame Loop

**Timestamp:** `2026-07-14T15-38-28-04-00`

## Summary

Gameplay state begins advancing on the first RAF before a browser startup result exists. At the same time, the editor bridge can issue manual ticks and reset commands because capability publication already occurred.

## Plan ledger

**Goal:** prevent gameplay and editor commands from becoming authoritative until one accepted browser startup revision owns the first frame.

- [x] Trace first automatic tick.
- [x] Trace editor tick/reset availability.
- [x] Trace readiness and fatal-state behavior.
- [ ] Implement command gating and startup settlement later.

## Current loop

```txt
host construction
  -> GameHost and editor commands become callable
  -> loading disappears
  -> automatic RAF tick advances game
  -> plan validates and renders
```

There is no pre-ready command policy. `runtime.tick` and `runtime.reset` can mutate the same game candidate before the automatic first-frame path settles.

## Required gameplay admission

```txt
Constructing
  -> read-only diagnostics allowed
  -> gameplay tick/reset/capture rejected or queued

FrameCandidate
  -> one authority-owned tick and render only

Ready
  -> public editor and runtime commands admitted

Failed
  -> all gameplay mutation rejected
  -> candidate state retired
```

## Required evidence

`BrowserStartupResult` must cite the initial state revision, first tick revision, render-plan fingerprint, renderer frame ID, and the policy used for commands received before readiness.

## Boundary

No gameplay behavior changed and no browser fixture was executed.