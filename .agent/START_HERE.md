# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-10T19-48-09-04-00`

## Current ledge

```txt
IntoTheMeadow Runtime Session Lifecycle Authority + Stop/Restart/Dispose Fixture Gate
```

## Read first

```txt
.agent/trackers/2026-07-10T19-48-09-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T19-48-09-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-10T19-48-09-04-00-runtime-session-lifecycle-authority-dsk-map.md
.agent/render-audit/2026-07-10T19-48-09-04-00-renderer-disposal-orphaned-context-gap.md
.agent/gameplay-audit/2026-07-10T19-48-09-04-00-frame-loop-stop-start-session-loop.md
.agent/interaction-audit/2026-07-10T19-48-09-04-00-host-control-surface-lifecycle-map.md
.agent/lifecycle-audit/2026-07-10T19-48-09-04-00-runtime-session-stop-dispose-restart-contract.md
.agent/editor-proof-audit/2026-07-10T19-48-09-04-00-editor-listener-global-cleanup-gap.md
.agent/deploy-audit/2026-07-10T19-48-09-04-00-lifecycle-idempotency-fixture-gate.md
```

## Runtime route

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> external meadow-area-kit import
  -> createIntoTheMeadowGame
  -> cached source plan and local enhancement
  -> CPU mesh builder
  -> WebGL outline and cel/fog passes
  -> GameHost and NexusEditorEnvironment
```

## Actual session loop

```txt
startWebHost
  -> construct game, renderer, enhancer, diagnostics, and editor bridge
  -> schedule animation frame
  -> fixed-delta game tick
  -> render
  -> schedule the next frame
```

## Main finding

The route can create and run a browser session, but lifecycle ownership is incomplete. The boot file does not retain the returned host controller, the animation-frame id is not retained, stop only changes a flag, restart can schedule while an older callback is pending, and the host never coordinates the existing renderer and editor-bridge cleanup methods.

Add one host-owned session id, lifecycle state, animation-frame owner, resource/global ownership ledger, ordered stop/dispose/restart operations, and deterministic lifecycle fixtures before adding authoritative gameplay commands.

The interaction-command and objective-progress slice remains queued immediately after lifecycle idempotency is proven.

## Validation state

Documentation only. Runtime source, dependencies, routes, renderer behavior, package scripts, and deployment configuration did not change. No branch or pull request was created.