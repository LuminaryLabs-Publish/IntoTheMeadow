# Deploy Audit — Fixture Check Gate Map

**Timestamp:** `2026-07-09T03-50-12-04-00`

## Current package validation

`package.json` defines:

```txt
npm run check
  -> node tests/static-smoke.mjs
  -> node tests/dsk-registry-smoke.mjs
  -> node tests/render-plan-smoke.mjs
  -> node tests/deterministic-scene-smoke.mjs
```

## Current gap

The check script validates static structure, DSK registry, render plan, and deterministic scene creation.

It does not yet validate:

```txt
render parity readback
renderer snapshot absence adapter
grass consumer rows
gameplay action replay
objective completion rows
legacy snapshot compatibility after adding gameplay/renderParity projections
```

## Required next check additions

```txt
tests/render-parity-fixture-smoke.mjs
tests/gameplay-action-replay-fixture-smoke.mjs
```

Then update `package.json` to run both through `npm run check`.

## Static Pages guardrails

```txt
Keep index.html as the route shell.
Keep src/boot/boot-game.js as the boot entry.
Keep external CDN kit URLs stable until source contracts prove compatibility.
Do not add branch-based deploy assumptions.
Only push to main.
```

## Validation note

This pass was documentation-only. The fixture files do not exist yet, so no local `npm run check` was run.
