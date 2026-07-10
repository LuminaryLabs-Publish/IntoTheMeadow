# Architecture Audit: Consumer Proof Attribution Ledger DSK Map

**Timestamp:** `2026-07-10T12-19-05-04-00`

## Current architecture

```txt
boot-game.js
  -> web-host.js
  -> external meadow-area-kit
  -> createIntoTheMeadowGame
  -> installDsks
  -> createRenderPlanEnhancer
  -> meadow-webgl-renderer-v2-compatible
  -> meadow-webgl-renderer-v2
  -> exposeGameHost
  -> installIntoTheMeadowEditorBridge
```

## Current proof boundary

```txt
source descriptors exist
renderer consumes enhanced render plan
renderer snapshot is aggregate
GameHost exposes aggregate render and state snapshots
editor bridge proves command reachability
```

## Missing architecture layer

```txt
source descriptor id
  -> expected consumer behavior
  -> renderer / grass / gameplay / editor decision
  -> consumed / ignored / unsupported / fallback / accepted / rejected / skipped / completed row
  -> GameHost proof projection
  -> DOM-free fixture assertion
```

## Required next DSK/proof kits

```txt
render-expectation-row-kit
renderer-snapshot-normalizer-kit
render-consumption-ledger-kit
grass-consumption-row-kit
consumer-attribution-row-kit
gamehost-render-proof-kit
action-frame-kit
target-action-preflight-kit
action-result-kit
objective-progress-kit
headless-editor-proof-ledger-kit
GameHost-proof-projection-kit
```

## Architecture recommendation

Add attribution rows as an additive readback layer. Preserve the current route shell, external meadow-area kit, renderer v2, `GameHost` legacy methods, and editor bridge while introducing source-owned proof rows.
