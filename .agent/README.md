# IntoTheMeadow Agent Notes

This folder contains internal project breakdowns for `LuminaryLabs-Publish/IntoTheMeadow`.

## Current project read

`IntoTheMeadow` is a publishable DSK-composed meadow exploration game repo. It owns the product route, browser host, game factory, deterministic state root, local DSK descriptors, arrival-meadow content, objective/story/interaction descriptors, diagnostics, validation scripts, and deployment surface while consuming reusable meadow infrastructure from `NexusRealtime-ProtoKits`.

The repo remains a strong v0.1 DSK scaffold and browser proof. The missing layer is executable agency: `src/hosts/web-host.js` calls `game.tick({ time, dt })`, and `src/game/game-state.js` currently advances only `frame` and `lastTick`. The content needed for the first playable loop already exists: `ARRIVAL_MEADOW_CONFIG.features.path.points`, `ARRIVAL_INTERACTION_TARGETS`, `STORY_BEATS`, and `ARRIVAL_OBJECTIVES`.

## Latest tracker

- `trackers/2026-07-07T09-18-43-04-00/project-breakdown.md`

## Kit registry

- `kit-registry.json`

## Previous trackers

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
2. `meadow-action-contract-kit` defines stable ActionFrame records.
3. `web-host-dsk` collects keyboard, pointer, touch, inspect, reset, and debug input as normalized action frames.
4. `game.tick({ time, dt, actions })` routes those actions into deterministic state.
5. `meadow-reducer-pipeline-kit` applies reducers in fixed order.
6. `meadow-player-runtime-kit` updates position, yaw, pitch, and path-facing state.
7. `path-progress-runtime-kit` samples `ARRIVAL_MEADOW_CONFIG.features.path.points` and emits path-progress events.
8. `focal-tree-interaction-runtime-kit` exposes the old-tree inspect affordance.
9. `meadow-event-journal-kit` records path, inspect, story, objective, and completion events.
10. `story-trigger-runtime-kit` fires `path-discovery` and `focal-tree` story beats once.
11. `objective-completion-runtime-kit` completes `walk-the-path` and `inspect-tree`.
12. `arrival-completion-save-kit` records deterministic arrival meadow completion.
13. `meadow-snapshot-contract-kit` exposes stable gameplay snapshots through `window.GameHost`.
14. `meadow-render-metadata-projection-kit` exposes player/story/objective/interaction/completion state to render debug metadata without making renderer kits product-specific.

## Active next direction

The best next slice is the **IntoTheMeadow Action Ingress + Gameplay Snapshot Contract Cutover**:

- Keep `index.html` and `src/boot/boot-game.js` thin.
- Add `meadow-action-contract-kit` with ActionFrame fields: `frame`, `time`, `sceneId`, `action`, `value`, and `source`.
- Add host-level keyboard, pointer, touch, inspect, reset, and debug input collection in `src/hosts/web-host.js`.
- Pass `actions` into `game.tick({ time, dt, actions })`.
- Expand deterministic state with `actionJournal`, `eventJournal`, `interaction`, `diagnostics`, and `completion` fields.
- Replace the `advanceGameState()` stub with an ordered pure reducer pipeline.
- Add player, path progress, focal tree interaction, event journal, story trigger, objective completion, and arrival completion reducers.
- Add `meadow-snapshot-contract-kit` so `window.GameHost.getSnapshot().gameplay` exposes player, actions, events, story, objectives, interaction, completion, reducer diagnostics, and render metadata.
- Add `meadow-render-metadata-projection-kit` through `enhanceRenderPlan()` options, while keeping `meadow-webgl-render-kit` product-agnostic.
- Add scripted smoke for path walk, focal-tree inspection, story/objective completion, and replay parity.

## Runtime cutover kits

```txt
meadow-action-contract-kit
meadow-input-runtime-kit
meadow-action-ingress-diagnostics-kit
meadow-reducer-pipeline-kit
meadow-player-runtime-kit
path-progress-runtime-kit
focal-tree-interaction-runtime-kit
meadow-event-journal-kit
story-trigger-runtime-kit
objective-completion-runtime-kit
arrival-completion-save-kit
meadow-gameplay-diagnostics-kit
meadow-render-metadata-projection-kit
meadow-snapshot-contract-kit
meadow-deterministic-replay-kit
meadow-scripted-input-smoke-kit
playable-loop-smoke-kit
```

## Rules for future agents

- Work on this project only when selected by the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger flow.
- Add a new timestamped folder for each run under `.agent/trackers/`.
- Do not overwrite old tracker entries.
- Commit documentation updates to `main` when the run asks for repo documentation work.
