# Progression Audit: Objective and Story Exactly-Once Central Contract

**Generated:** `2026-07-12T17-58-43-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

Four authored progression conditions exist, but none is evaluated. A future implementation must evaluate objective and story transitions from the same committed candidate state and prevent duplicate threshold or inspection completion.

## Plan ledger

**Goal:** make path and inspection progression deterministic, atomic and exactly once.

- [x] Identify all authored progression conditions.
- [x] Define shared candidate-state evaluation.
- [x] Define duplicate and stale rejection.
- [ ] Implement ledgers and fixtures.

## Authored conditions

```txt
path-discovery story: path progress crosses 0.25
walk-the-path objective: path progress crosses 0.35
focal-tree story: admitted inspect:focal-tree
inspect-tree objective: admitted inspect:focal-tree
```

## Required contract

```txt
candidate gameplay state
  -> evaluate path threshold crossings
  -> evaluate admitted inspection result
  -> derive objective transitions
  -> derive story transitions
  -> reserve completion/sequence identities
  -> atomically commit all transitions with gameplay state
  -> publish one GameplayResult
```

## Exactly-once rules

```txt
threshold crossing uses predecessor and successor path progress
high-delta movement cannot skip a threshold
completed objective ids cannot recommit
story sequence ids cannot recommit
replayed command ids return the prior terminal result
failed or stale commits release reservations and mutate nothing
reset/new session uses a new generation while preserving explicit persistence policy
```

## Required fixtures

```txt
0.24 -> 0.26 path discovery once
0.34 -> 0.36 objective completion once
0.20 -> 0.40 both path transitions in defined order
duplicate movement command parity
out-of-range focal-tree rejection
in-range focal-tree story/objective atomic commit
duplicate inspect parity
failure between objective and story candidate commit produces zero partial mutation
```

## Boundary

No progression ledger or executable fixture was added in this documentation pass.