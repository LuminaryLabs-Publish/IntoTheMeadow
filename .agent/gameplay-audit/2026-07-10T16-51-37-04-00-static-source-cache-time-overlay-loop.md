# Gameplay Audit: Static Source Cache and Time Overlay

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T16-51-37-04-00`

## Current loop

```txt
create source kit
  -> create source plan at time 0
  -> cache baseRenderPlan
  -> requestAnimationFrame
  -> update frame and lastTick
  -> clone cached plan with a new time field
  -> enhance and render
```

## Finding

The gameplay state is intentionally minimal, but source-time authority is ambiguous. The external kit exposes `getRenderPlan({ time })`; the game calls it once at startup and later changes only the plan's `time` property. This is safe only if every source-owned object and validation result is static and all animation is downstream.

## Required time policy

```txt
static-source-plan:
  source topology and descriptors are immutable after startup
  time is a downstream shader/enhancer input only

or

dynamic-source-plan:
  source kit is re-queried at defined cadence
  topology changes are fingerprinted and trigger deterministic buffer rebuilds
```

## Fixture requirements

```txt
prove repeated same-seed startup produces the same source fingerprint
prove time-only frames preserve topology under static policy
prove external and fallback sources declare the same time policy
fail when source output changes with time while host still uses static caching
preserve reset and deterministic scene behavior
```

## Decision

Do not activate movement, objectives, or interaction mutation inside this source-authority slice. First make source selection and time semantics explicit so later gameplay can rely on a stable world-state contract.