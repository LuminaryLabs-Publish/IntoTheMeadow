# Gameplay Audit: Frame-Cost Quality Adaptation Loop

**Generated:** `2026-07-16T21-01-07-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

Gameplay state advances every RAF while presentation cost remains fixed by startup descriptors. The product has no policy for preserving a target frame budget by adapting optional visual work.

## Current loop

```txt
RAF
  -> tick game with constant 1/60 dt
  -> apply time-only render overlay
  -> reuse cached enhanced plan
  -> render fixed-budget meadow
  -> schedule next RAF
```

## Missing gameplay-facing policy

```txt
target frame budget
minimum playable quality
quality downgrade reason
quality upgrade reason
observation window
transition cooldown
hysteresis
pause/hidden-document handling
predecessor preservation
quality-generation acknowledgement
```

The simulation currently has almost no interactive movement, so no gameplay failure was reproduced. The gap matters because future player, input, story and interaction work would otherwise share an unbounded presentation cost without an explicit degradation boundary.

## Required behavior

- Preserve simulation and authored progression truth across quality transitions.
- Adapt only presentation budgets and explicitly classified optional work.
- Never rebuild repeatedly around one threshold.
- Keep the prior valid frame generation until the replacement is ready.
- Report the selected quality and reason through diagnostics without moving simulation truth into the renderer.

## Boundary

Documentation only. No gameplay or quality behavior changed.
