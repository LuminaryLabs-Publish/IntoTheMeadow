# Known Gaps

**Updated:** `2026-07-18T07-40-23-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `render-descriptor-mesh-expansion-budget-authority-audited`

## Summary

The active render path is shape-validated but not work-admitted. Descriptor counts and topology identity are available, while limits, estimates, overflow settlement and budget-bound frame proof are absent.

## Plan-admission gaps

```txt
maximum terrain cells: absent
maximum terrain segments by axis: absent
maximum grass instances by LOD: absent
maximum cards per admitted batch: absent
maximum flower, cover, rock and distant-tree instances: absent
maximum hero-tree segments and leaf cards: absent
versioned render profile limits: absent
viewport/device-class binding: absent
```

## Estimate gaps

```txt
predicted vertex count: absent
predicted triangle count: absent
predicted typed attribute bytes: absent
per-contributor work ledger: absent
shared estimator/build formulas: absent
RenderWorkEstimateResult: absent
```

## Build-admission gaps

```txt
accepted admission ID required by mesh builder: absent
profile and provider revision binding: absent
actual-versus-admitted count verification: absent
actual typed-buffer byte readback: absent
partial allocation rollback result: absent
MeshBuildResult: absent
```

## Overflow and recovery gaps

```txt
overflow classification: absent
deterministic degradation ordering: absent
re-estimation after degradation: absent
required landmark preservation policy: absent
last-accepted generation retention: absent
bounded fallback result: absent
stale plan/profile/provider generation rejection: absent
RenderOverflowSettlementResult: absent
```

## Projection gaps

```txt
admission ID in GameHost snapshot: absent
admission ID in editor snapshot: absent
admission ID in renderer snapshot: absent
plan/mesh/profile/frame digest chain: absent
FirstRenderBudgetBoundFrameAck: absent
```

## Current divergence

```txt
render plan: descriptor counts and topology key are published
validation: schema, identity, required types and array presence only
mesh builder: expands all accepted descriptors into JavaScript arrays
renderer: creates five Float32Array attribute uploads after full expansion
performance descriptor: carried on plan but not used for admission
smoke tests: ordinary output and array parity, not bounded-work proof
```

## Proof gaps

```txt
exact-limit acceptance fixture: absent
one-over-limit rejection fixture: absent
extreme terrain-resolution fixture: absent
extreme grass-instance fixture: absent
deterministic degradation repeatability: absent
estimated-versus-actual work parity: absent
stale-generation fixture: absent
last-good retention fixture: absent
host/editor/renderer result parity: absent
source/artifact/Pages budget parity: absent
```

## Preserved unresolved gaps

```txt
DSK dependency closure and activation truth
save capability and durable restore
WebGL capture readback and frame correlation
adaptive quality feedback and projection
browser failure classification and bounded diagnostics
authored content graph integrity
static module release/cache coherence
runtime renderer identity
accessible semantic projection
audio event projection
shader capability admission
editor command settlement
post-process execution
browser startup readiness
runtime reset and replay
browser observation provenance
render-plan and mesh-cache coherence
viewport authority
editor capability lifecycle
web-host retirement
workspace containment
external provider parity
WebGL context recovery
single-chain frame scheduling
playable progression
grass visibility and LOD
```

## Completion boundary

Render work is not bounded until one estimate is admitted under a versioned profile, overflow settles before allocation, the actual mesh remains within accepted limits, stale generations cannot commit and the matching visible frame publishes `FirstRenderBudgetBoundFrameAck`.