# IntoTheMeadow Agent Notes

This folder contains internal project breakdowns for `LuminaryLabs-Publish/IntoTheMeadow`.

## Current project read

`IntoTheMeadow` is a publishable DSK-composed meadow exploration game repo. It owns the product route, browser host, game factory, deterministic state root, local DSK descriptors, arrival-meadow content, objective/story/interaction descriptors, diagnostics, validation scripts, and deployment surface while consuming reusable meadow infrastructure from `NexusRealtime-ProtoKits`.

The repo remains a strong v0.1 DSK scaffold and browser proof. The missing layer is executable agency: the host frame loop calls `game.tick({ time, dt })`, and `advanceGameState()` currently increments frame/lastTick without evaluating input, movement, path progress, interactions, story, objectives, completion, replay, or render metadata.

## Latest tracker

- `trackers/2026-07-07T08-10-08-04-00/project-breakdown.md`

## Kit registry

- `kit-registry.json`

## Previous trackers

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
6. `advanceGameState()` increments frame and records `lastTick`.
7. The meadow area kit creates a render plan, `enhanceRenderPlan()` adds product metadata, and the WebGL renderer draws the scene.
8. `window.GameHost` exposes state, snapshot, diagnostics, and render snapshot surfaces.

Target playable loop:

1. Player spawns at the arrival path.
2. `meadow-action-contract-kit` defines stable `move`, `look`, `inspect`, `reset`, and `debug-toggle` actions.
3. `web-host-dsk` collects keyboard, pointer, touch, inspect, reset, and debug input as normalized action frames.
4. `meadow-reducer-pipeline-kit` applies reducers in a fixed deterministic order.
5. `meadow-player-runtime-kit` updates position, yaw, pitch, and path-facing state.
6. `path-progress-runtime-kit` samples `ARRIVAL_MEADOW_CONFIG.features.path.points` and emits path-progress events.
7. `focal-tree-interaction-runtime-kit` exposes the old-tree inspect affordance.
8. `meadow-event-journal-kit` records path, inspect, story, objective, and completion events.
9. `story-trigger-runtime-kit` fires `path-discovery` and `focal-tree` story beats once.
10. `objective-completion-runtime-kit` completes `walk-the-path` and `inspect-tree`.
11. `arrival-completion-save-kit` records deterministic arrival meadow completion.
12. `meadow-render-metadata-projection-kit` exposes player/story/objective/interaction/completion state to GameHost and render debug metadata.

## Active next direction

The best next slice is the **IntoTheMeadow Action Reducer Replay + Render Metadata Contract Cutover**:

- Keep `index.html` and `src/boot/boot-game.js` thin.
- Add `meadow-action-contract-kit` with stable action names and normalized action frames.
- Add host-level keyboard, pointer, touch, inspect, reset, and debug input collection in `src/hosts/web-host.js`.
- Pass `actions` into `game.tick({ time, dt, actions })`.
- Add `meadow-reducer-pipeline-kit` and split `advanceGameState()` into ordered pure reducer services.
- Add `meadow-event-journal-kit` so story, objective, and completion rules consume deterministic events instead of ad-hoc flags.
- Add `meadow-player-runtime-kit`, `path-progress-runtime-kit`, `focal-tree-interaction-runtime-kit`, `story-trigger-runtime-kit`, and `objective-completion-runtime-kit`.
- Add `meadow-render-metadata-projection-kit` so GameHost and debug rendering can see player/objective/story/interaction/completion state.
- Add `meadow-deterministic-replay-kit`, `meadow-snapshot-contract-kit`, and scripted smoke that walks the path, triggers `path-discovery`, inspects the old tree, and proves replay parity.

## Runtime cutover kits

```txt
meadow-action-contract-kit
meadow-input-runtime-kit
meadow-reducer-pipeline-kit
meadow-player-runtime-kit
path-progress-runtime-kit
focal-tree-interaction-runtime-kit
meadow-event-journal-kit
story-trigger-runtime-kit
objective-completion-runtime-kit
arrival-completion-save-kit
meadow-gameplay-diagnostics-kit
meadow-scripted-input-smoke-kit
meadow-render-metadata-projection-kit
meadow-deterministic-replay-kit
meadow-snapshot-contract-kit
playable-loop-smoke-kit
```

## Rules for future agents

- Work on this project only when selected by the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger flow.
- Add a new timestamped folder for each run under `.agent/trackers/`.
- Do not overwrite old tracker entries.
- Commit documentation updates to `main` when the run asks for repo documentation work.
