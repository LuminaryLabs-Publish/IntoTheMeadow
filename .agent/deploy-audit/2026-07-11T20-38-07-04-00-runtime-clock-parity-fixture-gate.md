# Runtime Clock Parity Fixture Gate

**Timestamp:** `2026-07-11T20-38-07-04-00`

## Current deployment proof

The existing checks prove happy-path construction, descriptor validity, static topology stability, editor command execution and one browser screenshot. They do not prove clock ownership or parity.

## Required gate

```txt
static proof
  -> clock and step result schemas exist
  -> raw public game.tick bypass is removed
  -> delta/tick budgets and reset epoch policy exist

DOM-free proof
  -> source rate parity
  -> finite delta and bounded multi-step admission
  -> stale session/epoch/revision rejection
  -> deterministic journal and result receipts

browser proof
  -> delayed RAF policy
  -> pause/resume rebase
  -> reset epoch
  -> stale editor command rejection
  -> clock/state/render/canvas correlation

cross-surface proof
  -> browser and Node replay the same accepted command stream
  -> clock, state and render-time receipts match

Pages proof
  -> deployed route exposes the same admitted clock observations
```

## Required commands

```bash
npm run fixture:runtime-clock
npm run fixture:runtime-step-admission
npm run fixture:pause-resume-clock
npm run fixture:reset-epoch-clock
npm run fixture:browser-headless-clock-parity
npm run smoke:runtime-clock-frame-correlation
npm run check
```

## Deployment blocker

Do not claim deterministic runtime timing, pause safety, reset correctness or browser/headless parity from a successful build or animated wind. The gate remains blocked until accepted step identity and clock revision are visible through state, render plan, renderer and committed-frame evidence.