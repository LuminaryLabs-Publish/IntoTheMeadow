# Deploy Audit — Check Script Fixture Map

**Timestamp:** `2026-07-09T03-38-54-04-00`

## Current package scripts

```txt
npm run check
  -> node tests/static-smoke.mjs
  -> node tests/dsk-registry-smoke.mjs
  -> node tests/render-plan-smoke.mjs
  -> node tests/deterministic-scene-smoke.mjs

npm test
  -> npm run check
```

## Current deploy/readiness gap

The current checks prove syntax, DSK registry shape, render-plan creation, and deterministic scene output.

They do not yet prove:

```txt
renderer consumer readback parity
grass descriptor consumption rows
missing renderer snapshot handling
sparse renderer snapshot handling
action-frame normalization
path-progress results
inspect results
objective completion
snapshot.gameplay compatibility
GameHost renderParity compatibility
```

## Required check additions after implementation

```txt
tests/render-parity-fixture-smoke.mjs
tests/gameplay-action-replay-fixture-smoke.mjs
```

Then update `package.json`:

```txt
"check": "node tests/static-smoke.mjs && node tests/dsk-registry-smoke.mjs && node tests/render-plan-smoke.mjs && node tests/deterministic-scene-smoke.mjs && node tests/render-parity-fixture-smoke.mjs && node tests/gameplay-action-replay-fixture-smoke.mjs"
```

## Deployment rule

The next implementation should remain static-site compatible.

Do not introduce browser-only test dependencies for the pure fixture gate.

Do not require a dev server for fixture rows.
