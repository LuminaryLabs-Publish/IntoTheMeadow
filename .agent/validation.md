# Validation

**Updated:** `2026-07-14T09-58-25-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Audit type:** documentation and source analysis only

## Summary

Source review confirms that browser and headless environments expose different reset behavior. Both recreate state through `game.reset()`, which reuses `arrival-meadow:session-0`; browser render evidence remains retained, while headless reset invalidates the enhancer but retains the prior capture baseline.

## Plan ledger

**Goal:** state exactly what was inspected, changed and left unproven.

- [x] Confirm default branch `main`.
- [x] Compare all 11 Publish repositories and exclude Cavalry.
- [x] Select IntoTheMeadow by the oldest eligible synchronized timestamp.
- [x] Read `game-state.js` and game reset behavior.
- [x] Read web host frame, plan and render retention.
- [x] Read GameHost and browser editor bridge capabilities.
- [x] Read headless environment reset, capture and comparison behavior.
- [x] Read current command smoke coverage.
- [x] Preserve all 44 kit surfaces and services.
- [x] Add the timestamped audit family and refresh root `.agent` state.
- [x] Change documentation only.
- [x] Create no branch or pull request.
- [ ] Execute reset/replay fixtures later.

## Confirmed by source review

```txt
createInitialGameState always emits <scene>:session-0
game.reset recreates state with the same scene and DSK snapshot
game.reset does not rebuild the meadow provider or base render plan
browser runtime.reset calls game.reset only
browser web host retains lastPlan and lastRender
browser RAF remains active around reset
headless runtime.reset resets time and invalidates the enhancer
headless runtime.reset retains lastCapture
renderer.compare can reference a capture from before reset
command smoke ticks frames but does not exercise reset
```

## Source-derived but not executed

```txt
immediate browser readback can mix successor state with predecessor render evidence
headless compare can cross the reset boundary
manual editor ticks can race RAF/reset without an admission barrier
repeated resets cannot be distinguished by session identity
a replay cannot be proven from command and state/render fingerprints
```

These are reachable architecture and proof findings, not claims of a production incident.

## Documentation changed

```txt
new timestamped project breakdown and turn ledger
new architecture, render, gameplay, interaction, reset/replay, deploy and central-sync audits
START_HERE, current audit, next steps, known gaps, validation and kit registry refreshed
central ledger and internal change log synchronized separately
```

## Not executed

```txt
npm install
npm run check
browser reset fixture
headless reset fixture
duplicate/stale reset fixtures
scheduler race fixture
participant rollback fixture
replay comparison fixture
production build
built-output smoke
GitHub Pages smoke
```

## Change boundary

```txt
runtime JavaScript changed: no
CSS changed: no
gameplay changed: no
renderer changed: no
editor bridge changed: no
package or dependency changed: no
test or workflow changed: no
deployment changed: no
branch created: no
pull request created: no
```

## Claim boundary

This audit does not claim reset atomicity, unique session generation, browser/headless parity, scheduler isolation, rollback, replay equivalence, first reset-frame convergence or production readiness.