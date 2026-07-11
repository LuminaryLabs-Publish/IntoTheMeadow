# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-10T21-19-36-04-00`

## Current ledge

```txt
IntoTheMeadow Runtime Session Lifecycle Authority + Stop/Restart/Dispose Fixture Gate
```

## Immediate companion gate

```txt
IntoTheMeadow Committed Frame Observation Authority + Atomic Frame Fixture Gate
```

## Read first

```txt
.agent/trackers/2026-07-10T21-19-36-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T21-19-36-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-10T21-19-36-04-00-committed-frame-observation-dsk-map.md
.agent/render-audit/2026-07-10T21-19-36-04-00-atomic-frame-commit-gap.md
.agent/gameplay-audit/2026-07-10T21-19-36-04-00-tick-reset-render-commit-loop.md
.agent/interaction-audit/2026-07-10T21-19-36-04-00-editor-tick-capture-commit-map.md
.agent/frame-authority-audit/2026-07-10T21-19-36-04-00-staged-frame-commit-contract.md
.agent/deploy-audit/2026-07-10T21-19-36-04-00-committed-frame-fixture-gate.md
```

The earlier lifecycle and source-provider audits remain required context:

```txt
.agent/lifecycle-audit/2026-07-10T19-48-09-04-00-runtime-session-stop-dispose-restart-contract.md
.agent/source-authority-audit/2026-07-10T19-48-39-04-00-external-fallback-provider-contract.md
```

## Selection result

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. `TheCavalryOfRome` remains excluded. All nine eligible repositories are centrally tracked and have root `.agent` state.

`IntoTheMeadow` was selected as the oldest eligible documented fallback. Only this product repository was changed.

## Product read

`IntoTheMeadow` is a static DSK-composed meadow route. The browser imports a commit-pinned external meadow provider, creates a cached source plan, enhances it through local terrain/grass/wind/performance/postprocess services, builds or reuses one combined WebGL mesh, draws outline and cel/fog passes, and exposes GameHost/editor readback.

## Actual frame and observation loop

```txt
requestAnimationFrame
  -> game.tick() mutates live state
  -> source plan time overlay
  -> planEnhancer.enhance()
  -> lastPlan is published
  -> renderer.render()
  -> lastRender is published
  -> HUD reads live state and the latest fields
  -> next requestAnimationFrame
```

Editor capabilities can separately call `runtime.tick`, `runtime.reset`, `scene.getRenderPlan`, `renderer.getSnapshot`, and `renderer.capture`.

## Current finding

The route has no atomic committed-frame authority.

```txt
game state can advance before render succeeds
lastPlan updates before renderer.render returns
render failure can leave a new plan paired with an older render snapshot
runtime.tick can advance state without drawing a frame
runtime.reset can expose reset state while the canvas remains stale
renderer.capture has no committed-frame id tying pixels to state/plan/render facts
GameHost and editor snapshots compose live values from different phases
```

## Implementation order

```txt
1. Runtime Session Lifecycle Authority + Stop/Restart/Dispose Fixture Gate
2. Committed Frame Observation Authority + Atomic Frame Fixture Gate
3. Source Provider Authority + External/Fallback Parity Fixture Gate
4. Interaction Command Authority + Objective Progress Fixture Gate
5. Mesh Contribution Ledger + Registry Truth Fixture Gate
```

Do not begin with visual tuning, renderer replacement, CDN migration, new meadow content, or shared-kit promotion.
