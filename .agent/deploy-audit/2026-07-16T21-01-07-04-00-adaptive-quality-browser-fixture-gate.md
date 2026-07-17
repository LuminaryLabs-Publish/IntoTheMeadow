# Deploy Audit: Adaptive Quality Browser Fixture Gate

**Generated:** `2026-07-16T21-01-07-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

Static and existing renderer smoke tests do not prove adaptive quality, cache replacement or source/build/Pages parity.

## Required fixtures

```txt
profile declaration fixture
manual low/medium/high/ultra selection fixture
auto capability classification fixture
sustained-overload downgrade fixture
single-spike rejection fixture
sustained-headroom upgrade fixture
hysteresis anti-oscillation fixture
cooldown fixture
hidden/background interval fixture
quality-only enhancer invalidation fixture
terrain-resolution projection fixture
pixel-ratio projection fixture
grass/flower/tree budget fixture
predecessor preservation fixture
stale transition rejection fixture
FirstQualityBoundFrameAck fixture
source/build/Pages parity fixture
```

## Required evidence

Each run should publish the observed sample window, selected quality generation, concrete budget digest, enhancer and renderer generations, visible frame acknowledgement, artifact revision and deployed revision.

## Current boundary

```txt
npm run check: not run in this audit
browser performance fixture: absent
adaptive transition fixture: absent
artifact smoke: not run
Pages smoke: not run
```

No deployment or performance claim is made until the same fixtures pass against source, built artifact and deployed Pages origin.
