# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-10T22-58-36-04-00`

## Current ledge

```txt
IntoTheMeadow Runtime Session Lifecycle Authority
+ Stop/Restart/Dispose/Rollback Fixture Gate
```

## Immediate companion gate

```txt
IntoTheMeadow Committed Frame Observation Authority
+ Atomic Frame Fixture Gate
```

## Read first

```txt
.agent/trackers/2026-07-10T22-58-36-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T22-58-36-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-10T22-58-36-04-00-runtime-session-lifecycle-dsk-map.md
.agent/render-audit/2026-07-10T22-58-36-04-00-render-resource-lifecycle-gap.md
.agent/gameplay-audit/2026-07-10T22-58-36-04-00-stop-restart-frame-loop.md
.agent/interaction-audit/2026-07-10T22-58-36-04-00-host-editor-lifecycle-command-map.md
.agent/lifecycle-audit/2026-07-10T22-58-36-04-00-session-ownership-rollback-contract.md
.agent/deploy-audit/2026-07-10T22-58-36-04-00-lifecycle-fixture-gate.md
```

The committed-frame and source-provider audits remain required companion context:

```txt
.agent/frame-authority-audit/2026-07-10T21-19-36-04-00-staged-frame-commit-contract.md
.agent/source-authority-audit/2026-07-10T19-48-39-04-00-external-fallback-provider-contract.md
```

## Selection result

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. `TheCavalryOfRome` remains excluded. All nine eligible repositories are centrally tracked and have root `.agent` state.

`IntoTheMeadow` was selected as the oldest eligible documented fallback. Only this product repository was changed.

## Product read

`IntoTheMeadow` is a static DSK-composed meadow route. The browser resolves a commit-pinned external meadow provider, creates static game state and a cached source plan, enhances the plan through local services, renders a combined WebGL mesh, and exposes GameHost and Nexus headless-editor observations.

## Actual interaction and lifecycle loop

```txt
index.html
  -> boot-game.js
  -> startWebHost()
  -> load external meadow-area-kit
  -> create game
  -> create renderer
  -> create enhancer
  -> expose global GameHost
  -> install global NexusEditorEnvironment and browser listeners
  -> requestAnimationFrame(frame)
  -> tick / enhance / render / HUD
  -> schedule the next RAF
```

The returned host controller is discarded by `boot-game.js`.

## Current finding

The runtime has useful cleanup primitives but no owner that coordinates them.

```txt
RAF id is never retained or cancelled
stop() changes only a Boolean
start() can schedule beside a still-pending stopped RAF
no dispose() exists on the host controller
GameHost has no lease or release operation
editor listeners/global exposure survive fatal render failure
renderer.dispose() is never called by the host
startup construction has no reverse-order rollback
first-frame failure leaves partial runtime ownership live
```

A stop followed by start before the old RAF callback fires can create two active callbacks. Both see `stopped === false`, both render, and both schedule successors.

## Implementation order

```txt
1. Runtime Session Lifecycle Authority + Stop/Restart/Dispose/Rollback Fixture Gate
2. Committed Frame Observation Authority + Atomic Frame Fixture Gate
3. Source Provider Authority + External/Fallback Parity Fixture Gate
4. Interaction Command Authority + Objective Progress Fixture Gate
5. Mesh Contribution Ledger + Registry Truth Fixture Gate
```

Do not begin with visual tuning, renderer replacement, CDN migration, new meadow content, or shared-kit promotion.
