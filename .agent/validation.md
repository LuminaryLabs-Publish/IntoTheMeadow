# Validation

**Updated:** `2026-07-13T10-59-22-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Audit type:** documentation and source analysis only

## Summary

Source review confirms that viewport sizing is performed as direct renderer mutation: global DPR and client dimensions are sampled during render, zero measurements use global-window fallback, the canvas backing store changes before frame success, and renderer/readback/capture surfaces expose no common viewport or visible-frame revision.

## Plan ledger

**Goal:** state exactly what was inspected, changed, synchronized and left unproven.

- [x] Confirm the repository default branch is `main`.
- [x] Compare the full ten-repository Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have root `.agent` state.
- [x] Select IntoTheMeadow by the oldest eligible central timestamp.
- [x] Read `README.md`, `package.json`, `index.html`, boot, GameHost, web host, game state, renderer compatibility/base implementations, editor bridge and prior audits.
- [x] Confirm per-render DPR and CSS-size sampling.
- [x] Confirm zero-size measurements use global window fallback.
- [x] Confirm no total pixel budget or GPU-limit admission.
- [x] Confirm canvas backing-store mutation precedes render success.
- [x] Confirm camera/WebGL viewport use the successor backing dimensions.
- [x] Confirm renderer snapshot omits viewport evidence.
- [x] Confirm viewport readback and capture are independently sampled.
- [x] Preserve the complete 44-kit service inventory.
- [x] Add a new timestamped tracker and audit family.
- [x] Refresh required root `.agent` documents and machine state.
- [x] Change documentation only.
- [x] Create no branch or pull request.
- [ ] Execute viewport authority fixtures later.

## Confirmed by source review

```txt
index.html fixes main and canvas to the full viewport
renderer resize runs inside every render
DPR is sampled from globalThis.devicePixelRatio
DPR is clamped to 1..2
CSS dimensions use canvas.clientWidth/clientHeight
falsy CSS dimensions fall back to global innerWidth/innerHeight
canvas.width and canvas.height are assigned before mesh/draw success
WebGL viewport uses backing dimensions
perspective aspect uses backing dimensions
renderer snapshot omits CSS/DPR/backing/aspect/viewport revision
browser.getViewport reads global layout, DPR and canvas backing dimensions
renderer.capture encodes current canvas and attaches last renderer snapshot
no ResizeObserver, viewport command, rollback or first-frame ack exists
```

## Source-derived but not executed

```txt
zero-sized hosts can request full-window backing allocation
large high-DPR surfaces can exceed a safe total pixel budget
failure after resize can leave successor backing dimensions with predecessor metadata
layout changes while stopped can produce new browser dimensions and old canvas dimensions
capture during transition can combine unrelated pixels and renderer metadata
```

These are reachable ownership and correlation findings, not claims of a production incident.

## Documentation changed

```txt
new timestamped project breakdown and turn ledger
new architecture, render, gameplay, interaction, viewport, deploy and central-sync audits
START_HERE, current audit, next steps, known gaps, validation and kit registry refreshed
central repository ledger and internal change log synchronized separately
```

## Not executed

```txt
npm install
npm run check
browser boot smoke
ResizeObserver fixture
zero-size and restore fixture
DPR transition fixture
browser zoom fixture
pixel-budget or GPU-limit fixture
failure-after-resize injection
rollback fixture
viewport readback parity
capture/frame correlation
production build
built-output browser smoke
GitHub Pages smoke
```

## Change boundary

```txt
runtime JavaScript changed: no
CSS changed: no
gameplay changed: no
provider loading changed: no
renderer behavior changed: no
editor bridge behavior changed: no
package or dependency changed: no
test or workflow changed: no
deployment changed: no
branch created: no
pull request created: no
```

## Claim boundary

This audit does not claim host measurement authority, zero-size deferral, bounded allocation, atomic viewport adoption, rollback, renderer/readback parity, capture correctness, browser parity or production readiness. Those properties remain unimplemented and unproven.