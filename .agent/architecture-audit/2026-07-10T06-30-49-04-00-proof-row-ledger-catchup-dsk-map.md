# Architecture Audit: Proof Row Ledger Catch-up DSK Map

**Run:** `2026-07-10T06-30-49-04-00`

## Current architecture

```txt
static HTML shell
  -> boot-game DOM adapter
  -> web host orchestration
  -> external meadow-area-kit import
  -> createIntoTheMeadowGame
  -> DSK install validation
  -> render plan enhancer
  -> renderer v2 compatible adapter
  -> GameHost diagnostics
  -> Nexus headless editor bridge
  -> animation frame loop
```

## Current DSK chain

```txt
source descriptors
  -> meadow area render plan
  -> render plan enhancer
  -> grass/wind/postprocess/performance descriptors
  -> renderer v2 aggregate snapshot
  -> GameHost aggregate readback
  -> editor bridge aggregate observation
```

## Architecture gap

The architecture has strong descriptors and useful aggregate readback, but no row-level source-to-consumer ledger.

Missing contract layer:

```txt
render expectation rows
renderer snapshot normalization
render consumption rows
grass source/render parity rows
action frame rows
target/action preflight rows
action result rows
objective progress rows
headless editor observation rows
GameHost proof projection rows
```

## Correct next boundary

```txt
source descriptors
  -> proof expectations
  -> runtime aggregate snapshots
  -> normalized proof rows
  -> GameHost.proof additive projection
  -> DOM-free fixture smokes
  -> headless editor proof observations
```

## Do not start first

```txt
visual fidelity pass
renderer replacement
external CDN migration
new meadow content
grass art tuning
camera/control rewiring
shared-kit promotion
editor command expansion before source-backed observation rows
```
