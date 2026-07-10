# Deploy Audit: Mesh Contribution Fixture Check Gate

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T15-18-29-04-00`

## Current deploy shape

The project is a static browser route with Node smoke checks and GitHub Pages-compatible assets. The current `check` script runs static, DSK registry, render-plan, renderer, deterministic-scene, and headless-editor smokes.

## Current gate gap

A deploy can pass while:

```txt
descriptorCounts are only echoed expectations
primitiveFallbackCount remains a constant
one descriptor family silently contributes no geometry
registry active-v0.1 status overstates implementation backing
GameHost/editor readback lacks consumer-owned proof rows
```

## Required new scripts

```txt
node tests/mesh-contribution-ledger-smoke.mjs
node tests/mesh-contribution-edge-cases-smoke.mjs
node tests/dsk-registry-truth-smoke.mjs
```

Add them to `npm run check` only after the implementation files exist.

## Required blocking assertions

```txt
all measured family totals reconcile with final mesh totals
fallback total is derived from fallback rows
expected and measured counts are separate
empty/malformed/unsupported cases produce explicit statuses
GameHost and editor projections match renderer-owned rows
all registry ids have explicit truth classification
no unresolved active-v0.1 row is permitted
```

## Deployment rule

Do not change the Pages workflow for this slice unless the existing workflow fails to run the updated `npm run check`. The deploy concern is proof gating, not hosting architecture.

## Validation state

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
new fixtures: not run because they do not exist yet
pushed to main: yes
central ledger updated: yes
```