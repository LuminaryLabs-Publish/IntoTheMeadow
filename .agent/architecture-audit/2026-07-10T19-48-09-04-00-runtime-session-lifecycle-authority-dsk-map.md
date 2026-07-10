# Runtime Session Lifecycle Authority DSK Map

**Timestamp:** `2026-07-10T19-48-09-04-00`

## Current ownership

```txt
boot-game.js
  owns DOM lookup and startup error projection
  discards the resolved host controller

web-host.js
  owns external import, game construction, renderer construction,
  enhancer construction, GameHost exposure, editor bridge installation,
  RAF scheduling, rendering, and fatal-stop flagging

create-into-the-meadow-game.js
  owns game state, cached source plan, tick, reset, diagnostics, and snapshots

meadow-webgl-renderer-v2.js
  owns WebGL program, buffers, mesh cache, render snapshot, and dispose()

install-editor-bridge.js
  owns browser error listeners, editor capabilities, global exposure, and dispose()

expose-game-host.js
  owns global GameHost assignment but no lease/release operation
```

## Architectural defect

Construction is centralized enough to create a session, but teardown is not composed into the same authority. The lower-level renderer and editor bridge expose cleanup services that the host never calls. The host does not retain a RAF id, session id, lifecycle state, or ordered resource ledger.

## Required lifecycle domains

```txt
runtime session identity
lifecycle state machine
RAF ownership
resource ownership ledger
global exposure lease
start transaction and rollback
stop transaction
disposal ordering
restart policy
fatal-state projection
lifecycle result journal
```

## Candidate DSKs

```txt
meadow-runtime-session-authority-kit
meadow-lifecycle-state-kit
meadow-animation-frame-owner-kit
meadow-resource-ownership-ledger-kit
meadow-global-exposure-lease-kit
meadow-start-rollback-kit
meadow-ordered-disposal-kit
meadow-lifecycle-result-kit
meadow-restart-policy-kit
meadow-lifecycle-fixture-kit
```

## Required service contract

```txt
createSession() -> { sessionId, state: created }
start() -> accepted | no-op | rejected
stop() -> accepted | no-op
restart() -> ordered stop + start with a new run id
status() -> JSON-safe lifecycle snapshot
dispose() -> idempotent terminal cleanup
```

Every result must include the session id, prior state, next state, reason, retained RAF id state, disposed resources, released globals, and errors.

## Dependency order

```txt
session identity
  -> lifecycle state machine
  -> RAF ownership
  -> resource/global ledgers
  -> stop and dispose
  -> startup rollback
  -> restart
  -> GameHost/editor readback
  -> fixtures
```

## Boundary rule

Do not rewrite rendering, grass, meadow content, or gameplay reducers while establishing this boundary. Lifecycle authority should wrap existing services additively and preserve legacy read methods.