# Deploy Audit: Grass Visibility and LOD Fixture Gate

**Timestamp:** `2026-07-12T13-38-52-04-00`

## Summary

The existing validation chain proves descriptor structure, static topology and CPU mesh integrity, but it does not exercise camera-dependent grass visibility. Deployment readiness requires deterministic fixtures plus local and GitHub Pages browser evidence.

## Plan ledger

**Goal:** define the minimum proof gate before camera-bound grass LOD can be treated as complete or deployable.

- [x] Inspect current package checks and renderer fixtures.
- [x] Identify missing camera/visibility coverage.
- [x] Define deterministic and browser matrices.
- [ ] Add and execute fixtures after implementation.

## Existing gate

```txt
static file presence
DSK registry validation
render-plan validation
grass descriptor presence
CPU mesh array alignment
static topology persistence
deterministic scene generation
headless editor plumbing
page/editor/gpu markers and screenshot bytes
```

## Missing deterministic gate

```txt
patch bounds including wind extent
near/mid/far/tint/culled reachability
frustum inside/intersection/outside
threshold hysteresis
camera teleport
viewport and topology revision races
quality, vertex and draw budgets
candidate failure preserves predecessor
stale result rejection
visible-set fingerprint stability
first visible grass-frame receipt
```

## Browser matrix

```txt
WebGL2 and WebGL1 fallback
desktop, tablet and mobile viewports
pixel ratio 1 and 2
slow movement, orbit and teleport
high, medium, low and emergency quality
initial frame, resize, stop/start, context loss/restore
local static server and deployed GitHub Pages
```

## Acceptance

A release can claim camera-based grass LOD only when renderer snapshots and captured frames identify the same accepted visibility revision, all tiers are reachable, outside-frustum patches stop contributing blade geometry, threshold flicker is bounded and local/Pages results agree.

## Current status

```txt
runtime implementation: absent
deterministic fixtures: absent
browser smoke: not run
Pages smoke: not run
deployment changed: no
```
