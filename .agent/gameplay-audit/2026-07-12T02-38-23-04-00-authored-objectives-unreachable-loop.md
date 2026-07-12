# Gameplay Audit: Authored Objectives Are Unreachable

**Timestamp:** `2026-07-12T02-38-23-04-00`

## Intended loop

```txt
arrive in meadow
  -> follow path
  -> discover path story beat
  -> complete walk-the-path objective
  -> reach old tree
  -> inspect tree
  -> complete inspect-tree objective
  -> reveal focal-tree story beat
```

## Shipped loop

```txt
arrive in meadow
  -> remain at initial player state
  -> pathProgress remains 0
  -> frame counter advances
  -> meadow wind/time presentation animates
  -> no objective or story transition
```

## Cause

- Authored objective and story rules are data only.
- The game API has no action or command method.
- `advanceGameState()` does not update player or progression.
- The browser host has no gameplay input adapter.
- The editor bridge has no progression capabilities.

## Consequences

```txt
walk-the-path cannot complete
inspect-tree cannot complete
path-discovery cannot trigger
focal-tree story cannot trigger
active objective never advances
completion ledger remains empty
diagnostics can report valid content while gameplay is inert
```

## Required gameplay policy

- Movement is command-driven and bounded.
- Path progress is derived from player/path geometry.
- Path story and objective thresholds trigger once.
- Inspection uses registered targets and spatial admission.
- Objective and story effects commit atomically.
- Duplicate commands do not duplicate rewards or story beats.
- Reset creates a fresh progression epoch.

## Proof scenarios

```txt
walk from start to 0.24 progress -> no story/objective transition
cross 0.25 -> path-discovery once
cross 0.35 -> walk-the-path once
inspect focal-tree out of range -> reject
inspect in range -> objective and story commit together
repeat inspect -> duplicate/no extra transition
```
