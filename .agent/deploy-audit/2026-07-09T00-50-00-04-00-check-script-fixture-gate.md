# Deploy Audit — Check Script Fixture Gate

**Timestamp:** `2026-07-09T00-50-00-04-00`

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

## Current deploy concern

The route is static and publishable, but `npm run check` does not yet prove the next two source contracts:

```txt
render parity consumer snapshot rows
gameplay action replay rows
```

## Required fixture additions

```txt
tests/render-parity-fixture-smoke.mjs
tests/gameplay-action-replay-fixture-smoke.mjs
```

## Required check-script change next implementation

```json
{
  "scripts": {
    "check": "node tests/static-smoke.mjs && node tests/dsk-registry-smoke.mjs && node tests/render-plan-smoke.mjs && node tests/deterministic-scene-smoke.mjs && node tests/render-parity-fixture-smoke.mjs && node tests/gameplay-action-replay-fixture-smoke.mjs"
  }
}
```

## Deployment non-goals

```txt
No branch creation.
No PR creation.
No GitHub Pages workflow rewrite before fixtures exist.
No external CDN URL changes before compatibility rows exist.
```

## Finding

The deploy gate is not broken.

It is incomplete because it cannot prove that the descriptor-rich render/gameplay source is consumed by a renderer or reducer.
