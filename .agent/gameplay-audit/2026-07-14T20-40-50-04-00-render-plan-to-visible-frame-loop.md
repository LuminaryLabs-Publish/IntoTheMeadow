# Gameplay Audit: Render Plan to Visible Frame Loop

**Generated:** `2026-07-14T20-40-50-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

Gameplay state advances once per RAF, but presentation adoption is weaker than the render-plan service inventory implies. The frame can be accepted after geometry validation while declared post-process intent remains unconsumed.

## Plan ledger

**Goal:** connect simulation state, enhanced descriptors, renderer execution, diagnostics, and the visible frame without silent presentation drift.

- [x] Trace the active frame loop.
- [x] Identify where the pass graph enters the plan.
- [x] Identify where renderer execution diverges.
- [ ] Add frame-level presentation settlement later.

## Loop

```txt
RAF time
  -> game.tick({time, dt:1/60})
  -> game.getRenderPlan(time)
  -> enhancer attaches grass, wind, performance and post-process descriptors
  -> geometry/content validation passes
  -> renderer ignores effects.postProcess
  -> inline WebGL frame draws
  -> lastPlan and lastRender are published
```

## Gameplay consequence

No gameplay rules currently depend on post-processing. The architectural risk is diagnostic and experiential drift: quality policy, accessibility, atmosphere, visual emphasis, and future gameplay feedback can declare a pass without proving that the active renderer adopted it.

## Required settlement

A frame should be publishable only with either:

```txt
full profile
  -> all mandatory declared passes execute

reduced profile
  -> policy-approved substitutions and omissions are receipted

inline fallback
  -> an explicit compatibility profile is admitted and fingerprinted

reject
  -> predecessor frame remains accepted and failure is reported
```

## Boundary

No simulation, gameplay, timing, or rendering source changed.