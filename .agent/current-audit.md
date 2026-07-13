# Current audit: web-host lifecycle retirement authority

**Updated:** `2026-07-13T05-31-58-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `web-host-lifecycle-retirement-authority-audited`

## Summary

The browser host owns frame scheduling and constructs the game, renderer, plan enhancer, public `GameHost`, and browser editor bridge. Its public lifecycle surface does not own terminal cleanup. `stop()` and fatal handling mark the loop stopped without disposing participants or revoking public capabilities.

## Plan ledger

**Goal:** make host creation, running, pause, resume, failure, stopping, and terminal retirement explicit phases with exactly-once participant cleanup.

- [x] Trace the page boot path.
- [x] Trace frame scheduling and rescheduling.
- [x] Trace `stop()`, `start()`, and fatal behavior.
- [x] Verify renderer and bridge disposal surfaces exist.
- [x] Verify the host does not invoke those surfaces.
- [x] Verify `GameHost` has no revoke or generation boundary.
- [x] Verify current static proof does not execute lifecycle behavior.
- [x] Define the required DSK and transaction.
- [ ] Implement and validate the authority later.

## Source-backed interaction loop

```txt
src/boot/boot-game.js
  -> startWebHost(...)
  -> catch boot rejection and project a static failure

src/hosts/web-host.js
  -> loadExternalKits()
  -> createIntoTheMeadowGame()
  -> createMeadowWebglRendererV2()
  -> createRenderPlanEnhancer()
  -> exposeGameHost()
  -> installIntoTheMeadowEditorBridge()
  -> requestAnimationFrame(frame)

frame(now)
  -> return when stopped
  -> game.tick({ time: now / 1000, dt: 1/60 })
  -> get and enhance render plan
  -> validate render contract
  -> renderer.render(plan)
  -> schedule successor RAF

stop()
  -> stopped = true

start()
  -> if stopped, set false and schedule RAF

showFatal(error)
  -> stopped = true
  -> project error
```

## Source findings

### The host exposes pause-like methods without declaring their semantics

`src/hosts/web-host.js` returns `stop()` and `start()`. `stop()` only sets `stopped = true`; it does not identify or cancel the pending RAF. The queued callback can still execute once and return at the guard.

### Terminal resources already expose disposal surfaces

`src/renderers/meadow-webgl-renderer-v2.js` exposes `dispose()`, which deletes attribute buffers and the WebGL program. `src/editor/install-editor-bridge.js` exposes `dispose()`, which detaches `error` and `unhandledrejection` listeners and deletes `NexusEditorEnvironment` when it still owns the global.

The host never calls either method.

### Fatal handling is not terminal cleanup

`showFatal()` stops future frame work and updates the HUD, but leaves the renderer, editor listeners, global bridge, and `GameHost` installed. Editor calls can therefore continue to reach a stopped or failed host generation.

### Public `GameHost` has no revoke path

`src/boot/expose-game-host.js` assigns an immutable object to `globalThis.GameHost` and returns it. There is no lease, generation, ownership test, dispose method, or conditional delete.

### Repeated boot can orphan predecessor participants

A second `startWebHost()` call creates a new renderer and editor bridge, overwrites public globals, and installs new global error listeners. The predecessor host retains its resources and callbacks unless external code retained and manually disposed it. No duplicate-start admission or predecessor retirement result exists.

### Existing proof is structural

`tests/static-smoke.mjs` checks required files and source markers for renderer and editor-bridge construction. The package test chain does not list a web-host stop/start/fatal lifecycle fixture.

## Reachable failure paths

```txt
explicit stop
  -> host marked stopped
  -> WebGL buffers/program remain allocated
  -> editor listeners remain attached
  -> GameHost and NexusEditorEnvironment remain callable

fatal render error
  -> host marked stopped and error shown
  -> same resources and capabilities remain installed

duplicate boot or hot reload
  -> successor globals overwrite predecessor globals
  -> predecessor listeners and renderer can remain live
  -> no generation identifies which host owns later observations

stop then start
  -> same participants are reused
  -> no typed pause/resume result proves they remained valid
  -> no discontinuity or first-resumed-frame acknowledgement exists
```

These are source-derived lifecycle gaps, not measured production leaks or failures.

## Domains in use

```txt
browser document shell and boot failure projection
external provider loading and module admission
immutable game state, reset, snapshots, and diagnostics
DSK registry, validation, and composition
meadow generation: area, terrain, path, grass, trees, scatter, wind, atmosphere
render-plan enhancement and validation
CPU mesh generation and WebGL presentation
RAF scheduling and fixed-delta game ticking
public GameHost capability projection
browser editor capabilities, capture, and error observation
Node headless runtime, terminal, scenarios, loops, workspace, and artifacts
static checks, build, GitHub Pages, and internal audit tracking
```

## Missing authority

```txt
host session ID and generation
lifecycle phase and revision
Created/Starting/Running/Paused/Stopping/Stopped/Failed/Retired states
RAF request identity and cancel receipt
pause/resume versus retire policy
participant registry and dependency order
renderer disposal receipt
editor-bridge listener-detachment receipt
global capability lease and revocation
fatal cleanup policy
duplicate-start and stale-generation rejection
typed HostLifecycleResult
bounded lifecycle observation and journal
first resumed, stopped, failed, and retired visible acknowledgements
browser and headless lifecycle fixtures
```

## Required parent domain

```txt
meadow-web-host-lifecycle-retirement-authority-domain
```

## Required transaction

```txt
StartWebHostCommand
  -> bind document, runtime, provider, and host generations
  -> reject duplicate active ownership or retire predecessor explicitly
  -> create game, renderer, enhancer, GameHost lease, and editor bridge
  -> wait for required readiness
  -> enter Running and publish Accepted

PauseWebHostCommand
  -> validate active generation
  -> cancel or account for the pending RAF
  -> stop frame admission without disposing retained participants
  -> publish Paused and a pause receipt

ResumeWebHostCommand
  -> validate retained participant generations
  -> reset scheduling time/discontinuity state
  -> allocate one successor RAF
  -> enter Running
  -> acknowledge the first resumed frame

RetireWebHostCommand
  -> idempotently enter Stopping
  -> cancel the active RAF
  -> reject new editor mutations
  -> dispose editor bridge and detach listeners
  -> revoke NexusEditorEnvironment and GameHost leases
  -> dispose WebGL buffers and program exactly once
  -> retire game and enhancer participants when they gain disposal contracts
  -> publish Stopped, Degraded, Failed, or Retired

FatalHostResult
  -> preserve bounded diagnostics
  -> run the same retirement transaction or an explicitly documented degraded-retention policy
  -> expose only provider-independent recovery controls
```

## Validation boundary

No runtime source changed. No browser, WebGL, duplicate-start, stop/start, fatal-cleanup, listener-count, capability-revocation, or deployed-origin fixture was executed. No leak, lifecycle correctness, or production-readiness claim is made.
