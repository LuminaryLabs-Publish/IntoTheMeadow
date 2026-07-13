# Deploy audit: web-host lifecycle fixture gate

**Timestamp:** `2026-07-13T05-31-58-04-00`

## Summary

The current package check is structural and headless-editor focused. Deployment acceptance does not prove that the browser host can pause, resume, fail, retire, or restart without duplicate RAF chains, retained listeners, stale public globals, or undisposed WebGL resources.

## Plan ledger

**Goal:** add a browser lifecycle gate before declaring host cleanup or hot-reload/navigation safety.

- [x] Inspect package scripts.
- [x] Inspect static smoke coverage.
- [x] Identify missing lifecycle fixtures.
- [x] Define local and deployed acceptance gates.
- [ ] Implement and run fixtures later.

## Existing proof

`npm run check` currently chains:

```txt
static-smoke
dsk-registry-smoke
render-plan-smoke
renderer-v2-smoke
deterministic-scene-smoke
headless-editor-environment-smoke
headless-editor-command-smoke
headless-editor-loop-smoke
```

`tests/static-smoke.mjs` verifies required files and that the web host references the local renderer and editor bridge. It does not execute the browser host lifecycle.

## Missing local fixture gate

Add a browser fixture capable of observing:

```txt
active RAF chain count
host generation and lifecycle phase
GameHost lease identity
NexusEditorEnvironment lease identity
window error listener count
window unhandledrejection listener count
renderer generation
WebGL buffer/program dispose receipts
last accepted frame ID
first resumed frame ID
terminal visible-state acknowledgement
```

## Required scenarios

```txt
clean boot
pause before first frame
pause after first frame
resume after pause
resume twice
retire from Running
retire from Paused
retire twice
fatal during plan validation
fatal during renderer render
duplicate start
predecessor replacement
stale predecessor RAF
stale predecessor editor invocation
capture after retirement
pagehide/pageshow or equivalent retained-page policy
full navigation/reload
```

## Required assertions

```txt
one active RAF chain per Running host generation
zero accepted RAF work while Paused or Retired
renderer retained while Paused
renderer disposed once while Retired
editor listeners retained while Paused and detached while Retired
GameHost and NexusEditorEnvironment conditionally revoked on Retire
stale predecessor callbacks perform zero successor mutation
fatal result follows documented retire or degraded-retention policy
public snapshots identify lifecycle generation and revision
first resumed and terminal visible acknowledgements match the active generation
```

## Proposed scripts

```json
{
  "check:lifecycle": "node tests/web-host-lifecycle-smoke.mjs",
  "check:browser-lifecycle": "node tests/web-host-browser-lifecycle.mjs",
  "check:pages-lifecycle": "node tests/pages-web-host-lifecycle.mjs"
}
```

Exact runner choice should reuse the repository's existing browser-observation tooling where possible and must not add a heavyweight framework solely for this gate.

## Deployment acceptance

A Pages deployment should not be marked lifecycle-validated until the deployed origin proves:

```txt
boot creates one host generation
pause/resume preserves one renderer and one bridge
retire revokes globals and detaches listeners
reload does not inherit predecessor state
provider failure produces recoverable, bounded failure projection
fatal frame failure does not retain mutating editor capabilities
```

## Validation boundary

No workflow, script, package, or deployment file changed. No local browser or deployed-origin lifecycle scenario was run.
