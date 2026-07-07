# IntoTheMeadow Agent Notes

This folder contains internal project breakdowns for `LuminaryLabs-Publish/IntoTheMeadow`.

## Current project read

`IntoTheMeadow` is a publishable DSK-composed meadow exploration game repo. It owns the product route, browser host, game factory, deterministic state root, local DSK descriptors, arrival-meadow content, objective/story/interaction descriptors, diagnostics, validation scripts, and deployment surface while consuming reusable meadow infrastructure from `NexusRealtime-ProtoKits`.

The repo remains a strong v0.1 DSK scaffold and browser proof. The missing layer is executable agency: `src/hosts/web-host.js` calls `game.tick({ time, dt })`, and `src/game/game-state.js` currently advances only `frame` and `lastTick`. The content needed for the first playable loop already exists: `ARRIVAL_MEADOW_CONFIG.features.path.points`, `ARRIVAL_INTERACTION_TARGETS`, `STORY_BEATS`, and `ARRIVAL_OBJECTIVES`.

## Latest tracker

- `trackers/2026-07-07T11-38-17-04-00/project-breakdown.md`

## Kit registry

- `kit-registry.json`

## Previous trackers

- `trackers/2026-07-07T10-28-28-04-00/project-breakdown.md`
- `trackers/2026-07-07T09-18-43-04-00/project-breakdown.md`
- `trackers/2026-07-07T08-10-08-04-00/project-breakdown.md`
- `trackers/2026-07-07T06-58-36-04-00/project-breakdown.md`
- `trackers/2026-07-07T05-50-01-04-00/project-breakdown.md`
- `trackers/2026-07-07T04-41-22-04-00/project-breakdown.md`
- `trackers/2026-07-07T03-28-26-04-00/project-breakdown.md`

## Core loop snapshot

Current loop:

1. Browser opens `index.html`.
2. `src/boot/boot-game.js` starts the web host.
3. `src/hosts/web-host.js` loads external meadow kits from the manifest.
4. `createIntoTheMeadowGame()` installs local DSK descriptors and creates the arrival meadow area.
5. The animation frame loop calls `game.tick({ time, dt })`.
6. `advanceGameState()` increments frame and records `lastTick` only.
7. The meadow area kit creates a render plan, `enhanceRenderPlan()` adds product metadata, and the WebGL renderer draws the scene.
8. `window.GameHost` exposes state, snapshot, diagnostics, and render snapshot surfaces.

Target playable loop:

1. Player spawns at the arrival path.
2. `meadow-actionframe-contract-kit` defines stable ActionFrame records.
3. `meadow-action-batch-kit` batches and orders host/scripted action frames per tick.
4. `web-host-dsk` collects keyboard, pointer, touch, inspect, reset, and debug input as normalized action frames.
5. `game.tick({ time, dt, actions })` routes those actions into deterministic state.
6. `meadow-reducer-contract-kit` validates reducer input/output.
7. `meadow-reducer-pipeline-kit` applies reducers in fixed order.
8. `meadow-player-path-reducer-kit` moves the player along / near the existing path descriptor.
9. `path-progress-runtime-kit` samples `ARRIVAL_MEADOW_CONFIG.features.path.points` and emits path-progress events.
10. `focal-tree-affordance-kit` exposes the old-tree inspect affordance.
11. `inspect-event-runtime-kit` emits `inspect:focal-tree` when the inspect action is valid.
12. `meadow-event-journal-kit` records path, inspect, story, objective, and completion events.
13. `story-trigger-runtime-kit` fires `path-discovery` and `focal-tree` story beats once.
14. `objective-completion-runtime-kit` completes `walk-the-path` and `inspect-tree`.
15. `arrival-completion-runtime-kit` records deterministic arrival meadow completion.
16. `meadow-gameplay-snapshot-kit` exposes stable gameplay snapshots through `window.GameHost`.
17. `meadow-render-metadata-projection-kit` exposes player/story/objective/interaction/completion state to render debug metadata without making renderer kits product-specific.

## Active next direction

The best next slice is the **IntoTheMeadow ActionFrame Reducer Contract + Gameplay Snapshot Fixture Cutover**:

- Keep `index.html` and `src/boot/boot-game.js` thin.
- Add `meadow-actionframe-contract-kit` with ActionFrame fields: `frame`, `time`, `sceneId`, `action`, `value`, `source`, `accepted`, `rejected`, and `reason`.
- Add `meadow-action-batch-kit` so `game.tick()` receives stable sorted action arrays.
- Add host-level WASD/arrows, pointer look, touch move, inspect, reset, and debug input collection in `src/hosts/web-host.js`.
- Pass `actions` into `game.tick({ time, dt, actions })`.
- Expand deterministic state with `actionJournal`, `rejectedActions`, `reducerDiagnostics`, `eventJournal`, `interaction`, `diagnostics`, `completion`, and `gameplaySnapshotVersion` fields.
- Add `meadow-reducer-contract-kit` and a fixed-order `meadow-reducer-pipeline-kit` before wiring concrete reducers.
- Add `meadow-player-path-reducer-kit` and move the player along the existing six-point arrival path under scripted movement.
- Add `path-progress-runtime-kit` against `ARRIVAL_MEADOW_CONFIG.features.path.points`.
- Fire `path-progress:0.25` once and complete `walk-the-path` at `pathProgress >= 0.35`.
- Add `focal-tree-affordance-kit` using the `ARRIVAL_INTERACTION_TARGETS` focal-tree radius of `4.5`.
- Add `inspect-event-runtime-kit`, rejecting out-of-range inspect and accepting `inspect:focal-tree` when valid.
- Trigger the `focal-tree` story beat and complete `inspect-tree` after valid inspect.
- Derive arrival completion after both existing objectives complete.
- Add `meadow-gameplay-snapshot-kit` so `window.GameHost.getSnapshot().gameplay` exposes player, actions, reducers, events, story, objectives, interaction, completion, and render metadata.
- Add `meadow-render-metadata-projection-kit` through `enhanceRenderPlan()` options, while keeping `meadow-webgl-render-kit` product-agnostic.
- Add scripted fixtures for path walk, invalid inspect, valid inspect, objective completion, and replay parity.

## Runtime cutover kits

```txt
meadow-actionframe-contract-kit
meadow-action-batch-kit
meadow-input-runtime-kit
meadow-action-acceptance-kit
meadow-reducer-contract-kit
meadow-reducer-pipeline-kit
meadow-player-path-reducer-kit
path-progress-runtime-kit
focal-tree-affordance-kit
inspect-event-runtime-kit
meadow-event-journal-kit
story-trigger-runtime-kit
objective-completion-runtime-kit
arrival-completion-runtime-kit
meadow-gameplay-snapshot-kit
meadow-render-metadata-projection-kit
meadow-gameplay-fixture-kit
replay-parity-smoke-kit
```

## Rules for future agents

- Work on this project only when selected by the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger flow.
- Add a new timestamped folder for each run under `.agent/trackers/`.
- Do not overwrite old tracker entries.
- Commit documentation updates to `main` when the run asks for repo documentation work.
