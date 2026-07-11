# Fatal Runtime Recovery Fixture Gate

**Timestamp:** `2026-07-11T19-01-08-04-00`

## Current deployment proof

The existing static, renderer, deterministic-scene, editor and browser-observation checks prove happy-path construction and one available browser frame. They do not force startup or frame failures and do not inspect post-failure ownership.

## Required gate

```txt
static/source proof
  -> failure result schemas present
  -> startup acquisition ledger present
  -> capability quarantine policy present
  -> cold restart path present

DOM-free proof
  -> every acquisition phase failure cleans prior leases
  -> every frame phase failure preserves or classifies the prior commit
  -> cleanup failures remain terminal
  -> stale predecessor work is rejected

browser proof
  -> inject fatal failure after a committed frame
  -> observe visible fatal state and typed diagnostics
  -> assert tick/reset/rebuild/capture rejection
  -> assert no additional automatic frames
  -> cold restart
  -> assert new runtime/renderer generations and first committed frame
  -> repeat without RAF/listener/global leaks

Pages proof
  -> deployed route exposes the same typed results and replacement identities
```

## Required fixture commands

```bash
npm run fixture:startup-rollback
npm run fixture:frame-failure-quarantine
npm run fixture:fatal-capability-fence
npm run fixture:fatal-cleanup-failure
npm run smoke:cold-restart
npm run smoke:repeated-failure-recovery
npm run check
```

## Failure matrix

```txt
external provider import
provider export validation
game construction
renderer context/program construction
enhancer construction
GameHost publication
editor installation
simulation tick
plan enhancement/validation
mesh build
buffer upload
outline draw
color draw
HUD projection
cleanup callback
```

## Acceptance evidence

Each fixture must record:

```txt
startupAttemptId or frameRequestId
runtimeSessionId and rendererInstanceId
failureId and classification
phase reached
previous committed frame
resource impact
capability quarantine state
cleanup result
recovery policy
replacement identities when applicable
first replacement committed frame
active RAF/listener/global/resource counts
```

## Deployment blocker

Do not claim resilient startup, fatal recovery, restart safety or current canvas/readback integrity from a successful Pages build or visible error message. The deployment gate remains blocked until injected failures prove cleanup, quarantine and new-generation recovery on the deployed browser route.