# Runtime Session Lifecycle DSK Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-10T22-58-36-04-00`

## Current ownership map

```txt
boot-game
  starts the host and displays rejection
  discards the resolved controller

web-host
  owns construction order, stopped Boolean, frame callback, and retained lastPlan/lastRender
  does not retain RAF id or expose dispose

GameHost exposure
  assigns globalThis.GameHost
  has no lease, previous-value restoration, or release operation

editor bridge
  assigns globalThis.NexusEditorEnvironment
  owns error and rejection listeners
  provides a local dispose primitive

WebGL renderer
  owns program, buffers, mesh cache, and renderer snapshot
  provides a local dispose primitive

plan enhancer
  owns enhanced-plan cache
  is retained by host/global readback
```

No domain owns all of these resources as one session.

## Current construction graph

```txt
loadExternalKits
  -> createIntoTheMeadowGame
  -> createMeadowWebglRendererV2
  -> createRenderPlanEnhancer
  -> exposeGameHost
  -> installIntoTheMeadowEditorBridge
  -> requestAnimationFrame
```

Cleanup is not registered after acquisition, so failures after a side effect cannot unwind the preceding steps.

## Missing domain

```txt
runtime-session-authority-domain
```

Responsibilities:

```txt
allocate sessionId and runId
own lifecycle state transitions
own one RAF slot
fence callbacks by run generation
register cleanup immediately after each acquisition
lease and release global exposures
coordinate editor, renderer, enhancer, and retained-reference cleanup
rollback construction and first-frame failure
provide stop, start, restart, dispose, and fatal commands
publish typed lifecycle results and a bounded journal
serve lifecycle snapshots to controller, GameHost, and editor
```

## Proposed kit map

```txt
runtime-session-authority-domain
  -> runtime-session-identity-kit
  -> runtime-lifecycle-state-kit
  -> runtime-lifecycle-command-kit
  -> runtime-lifecycle-result-kit
  -> raf-ownership-kit
  -> run-generation-fence-kit
  -> resource-ownership-ledger-kit
  -> cleanup-stack-kit
  -> global-exposure-lease-kit
  -> startup-rollback-kit
  -> fatal-transition-kit
  -> runtime-lifecycle-journal-kit
  -> GameHost-lifecycle-observation-kit
  -> headless-editor-lifecycle-capability-kit
  -> runtime-lifecycle-fixture-adapter-kit
```

Reuse existing implementations for:

```txt
meadow game construction
source provider selection
render-plan enhancement
WebGL rendering and renderer.dispose
editor capability routing and editorBridge.dispose
HUD/fatal DOM projection
```

Do not create a second game, renderer, editor protocol, or source provider.

## Contract boundary

```txt
create(config)
  -> session in created state with cleanup ledger

start()
  -> accepted/no-op/rejected result
  -> one owned RAF

stop()
  -> cancel owned RAF
  -> stopped result

restart()
  -> cancel old run
  -> increment runId
  -> schedule one new RAF

dispose()
  -> reverse-order cleanup
  -> terminal disposed state

fail(phase, error)
  -> terminal policy
  -> rollback or disposal
  -> failed result
```

Only the session authority may schedule or cancel RAF work, release globals, or call terminal cleanup.
