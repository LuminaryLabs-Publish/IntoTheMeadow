# Gameplay Audit: Visual Policy and Descriptor Update Loop

**Generated:** `2026-07-13T16-01-05-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

IntoTheMeadow currently has little active player gameplay, but editor-driven visual iteration is a primary product loop. That loop can accept a descriptor or performance-policy change while retaining a predecessor contracted plan or GPU mesh because cache invalidation does not cover every consumed field.

## Plan ledger

**Goal:** preserve the visual-iteration loop while making every accepted policy or descriptor revision deterministic and visibly attributable.

- [x] Trace editor and host render-plan consumption.
- [x] Trace performance-policy application.
- [x] Trace grass, atmosphere, path, scatter and focal-tree descriptor generation.
- [x] Identify stale-cache effects on the active visual-iteration loop.
- [ ] Add complete cache admission and mutation fixtures later.

## Current visual-iteration loop

```txt
author or editor changes source plan or runtime policy
  -> game exposes a raw render plan
  -> enhancer calculates sourceTopologyKey
  -> previous contracted plan may be reused
  -> renderer calculates no independent mesh dependency key
  -> previous CPU mesh and GPU buffers may be reused
  -> browser presents a frame
  -> editor reads counters and captures pixels without a common revision
```

## Affected semantic areas

```txt
terrain and path appearance
wildflower and rock palettes
meadow ground cover
distant tree presentation
hero-tree proportions, roots, leaves, materials and outline
grass density, quality, family colors and object budgets
atmosphere hill geometry and colors
performance quality profiles
```

## Gameplay and authoring consequences

```txt
accepted authoring changes may not become visible
capture-based evaluation may judge predecessor pixels
quality-profile changes may report completion without changing density or budgets
cache-hit counters can appear healthy while dependency coverage is incomplete
repeated edits can become order-dependent because an unrelated later miss exposes older changes
```

## Required authoritative loop

```txt
visual edit or policy command
  -> allocate source and policy revisions
  -> normalize all descriptors
  -> classify dynamic, contract and mesh dependencies
  -> calculate complete fingerprints
  -> publish one cache decision
  -> prepare required plan, mesh and GPU candidates
  -> atomically adopt or preserve predecessor state
  -> render the accepted generation
  -> publish first visible revision acknowledgement
  -> allow capture and comparison against that acknowledged frame
```

## Boundary

No gameplay mechanics or authoring behavior changed. The audit only documents how cache identity can affect visual iteration and future gameplay presentation.