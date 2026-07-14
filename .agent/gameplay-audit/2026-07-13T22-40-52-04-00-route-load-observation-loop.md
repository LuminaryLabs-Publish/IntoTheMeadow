# Gameplay Audit: Route Load and Observation Loop

**Timestamp:** `2026-07-13T22-40-52-04-00`

## Summary

The observation runner does not control the game through a single admitted browser page. It starts two independent page boots and infers readiness from route text, so deterministic game and renderer state are not actually held constant across the observed artifacts.

## Plan ledger

**Goal:** bind route boot, provider admission, game state, renderer state and captured evidence to one observation attempt.

- [x] Trace route loading and external provider boot.
- [x] Trace the fixed virtual-time budget.
- [x] Trace game tick and renderer marker behavior.
- [x] Record independent page-state divergence.
- [ ] Add deterministic same-page observation later.

## Reachable divergence

```txt
screenshot page A
  -> provider import A
  -> game creation A
  -> independent RAF timing A
  -> renderer state A

DOM page B
  -> provider import B
  -> game creation B
  -> independent RAF timing B
  -> renderer state B
```

Even with deterministic content, environment timing, provider load timing, viewport admission, context generation and cache warmup can differ.

## Required loop

```txt
ObservationAttempt
  -> load one route
  -> admit provider and game snapshot
  -> admit one renderer frame
  -> freeze or snapshot the observation boundary
  -> capture DOM, editor state, canvas and screenshot
  -> resume or retire
```

## Boundary

No gameplay or route behavior changed.