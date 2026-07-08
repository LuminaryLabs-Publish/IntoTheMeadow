# IntoTheMeadow Agent Notes

This folder contains internal project breakdowns for `LuminaryLabs-Publish/IntoTheMeadow`.

## Current project read

`IntoTheMeadow` is a publishable DSK-composed meadow exploration game repo. It owns the browser route, launch host, game factory, deterministic state root, snapshot seam, local DSK descriptor install, arrival-meadow content, story/objective/interaction descriptors, render enhancement, diagnostics, static smoke scripts, and Pages deployment surface while consuming reusable meadow infrastructure from `NexusRealtime-ProtoKits`.

The live route remains:

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> src/game/create-into-the-meadow-game.js
  -> src/game/game-state.js
  -> src/game/game-snapshot.js
```

The current blocker is still gameplay authority. The web host calls `game.tick({ time, dt })`; `advanceGameState()` only increments `frame` and writes `lastTick`; `createGameSnapshot()` exposes manifest/state/renderPlan/diagnostics but no dedicated `snapshot.gameplay` branch. The first loop is descriptor-ready: six path points, player spawn at `{ x: 0, y: 0, z: -36 }`, `walk-the-path` completion at `pathProgress >= 0.35`, `inspect-tree`, `focal-tree` radius `4.5`, `arrival-path` radius `32`, and wind strength `0.38`.

This pass narrows the next cut into **Gameplay Snapshot Fixture Matrix + Reducer Acceptance Gate**. Build `ActionFrame` intake, ordered `ActionBatch` records, typed `ActionResult` and `ReducerResult` records, stable rejection reasons, path progress reduction, focal-tree inspect affordance, objective completion, `snapshot.gameplay`, GameHost gameplay diagnostics, and DOM-free replay fixtures before pointer-lock controls, saves, audio, renderer extraction, or ProtoKit promotion.

## Latest tracker

- `trackers/2026-07-07T23-40-40-04-00/project-breakdown.md`

## Kit registry

- `kit-registry.json`

## Previous trackers

- `trackers/2026-07-07T22-20-00-04-00/project-breakdown.md`
- `trackers/2026-07-07T20-59-30-04-00/project-breakdown.md`
- `trackers/2026-07-07T19-42-05-04-00/project-breakdown.md`
- `trackers/2026-07-07T18-19-15-04-00/project-breakdown.md`
- `trackers/2026-07-07T16-58-09-04-00/project-breakdown.md`
- `trackers/2026-07-07T15-49-14-04-00/project-breakdown.md`
- `trackers/2026-07-07T14-28-17-04-00/project-breakdown.md`
- `trackers/2026-07-07T13-21-30-04-00/project-breakdown.md`
- `trackers/2026-07-07T11-38-17-04-00/project-breakdown.md`
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
2. `meadow-actionframe-contract-kit` defines stable `ActionFrame` records.
3. `meadow-action-batch-kit` batches, sorts, dedupes, and freezes host/scripted/fixture/replay action frames per tick.
4. `meadow-action-result-contract-kit` standardizes accepted, rejected, and no-op command results.
5. `meadow-reducer-result-contract-kit` requires every reducer to return state, accepted actions, rejected actions, events, diffs, and diagnostics.
6. `meadow-reducer-pipeline-kit` applies reducers in fixed order.
7. `path-progress-runtime-kit` samples `ARRIVAL_MEADOW_CONFIG.features.path.points`.
8. `objective-state-authority-kit` completes `walk-the-path` at `pathProgress >= 0.35`.
9. `focal-tree-affordance-kit` evaluates the old-tree inspect affordance with the `4.5` radius target.
10. `inspect-result-reducer-kit` accepts or rejects inspect actions with stable reasons.
11. `objective-completion-runtime-kit` completes `inspect-tree` from accepted `inspect:focal-tree`.
12. `arrival-completion-runtime-kit` records deterministic arrival meadow completion.
13. `meadow-gameplay-snapshot-kit` exposes stable `snapshot.gameplay` through `window.GameHost`.
14. `replay-parity-smoke-kit` proves no-op tick, action ordering, reducer result shape, path walk, invalid inspect, valid inspect, objective completion, and replay parity without DOM input.

## Active next direction

The best next slice is **IntoTheMeadow Gameplay Snapshot Fixture Matrix + Reducer Acceptance Gate**:

- Keep `index.html`, `src/boot/boot-game.js`, current render behavior, and GameHost compatibility intact.
- Keep `game.tick({ time, dt })` compatible for existing runtime and tests.
- Allow `game.tick({ time, dt, actions })` as additive input.
- Add `meadow-actionframe-contract-kit` with stable action id, frame, time, scene id, source, type, target id, payload, and metadata.
- Add `meadow-action-batch-kit` so `game.tick()` receives stable sorted and deduped action arrays.
- Add `meadow-action-result-contract-kit` so accepted, rejected, and no-op command results have a stable shape.
- Add `meadow-action-rejection-reason-kit` with `unsupported_action`, `invalid_scene`, `invalid_payload`, `out_of_range`, `wrong_target`, `duplicate_event`, and `no_effect`.
- Add `meadow-reducer-result-contract-kit` before concrete reducers.
- Require every reducer to return `{ state, events, acceptedActions, rejectedActions, diagnostics }`.
- Add `meadow-reducer-result-journal-kit` for reducer order and state-diff diagnostics.
- Add `path-progress-runtime-kit` against `ARRIVAL_MEADOW_CONFIG.features.path.points`.
- Complete `walk-the-path` at `pathProgress >= 0.35`.
- Add `focal-tree-affordance-kit` using the `ARRIVAL_INTERACTION_TARGETS` focal-tree radius of `4.5`.
- Add `inspect-result-reducer-kit` so out-of-range, wrong-target, duplicate, no-effect, unsupported, invalid-payload, and accepted inspect paths are all explicit.
- Trigger the `focal-tree` story beat and complete `inspect-tree` after valid inspect.
- Derive arrival completion after both existing objectives complete.
- Add `meadow-gameplay-snapshot-kit` so `window.GameHost.getSnapshot().gameplay` exposes player, path, actions, reducers, events, story, objectives, interaction, completion, and render metadata.
- Add scripted fixtures for no-op tick, action batch ordering, action journal, reducer result shape, path walk, invalid inspect, valid inspect, objective completion, and replay parity.

## Runtime cutover kits

```txt
meadow-actionframe-contract-kit
meadow-action-batch-kit
meadow-action-result-contract-kit
meadow-action-journal-kit
meadow-input-runtime-kit
meadow-action-acceptance-kit
meadow-action-rejection-reason-kit
meadow-action-source-fixture-kit
meadow-reducer-contract-kit
meadow-reducer-result-contract-kit
meadow-reducer-result-journal-kit
meadow-reducer-seed-fixture-kit
meadow-reducer-pipeline-kit
meadow-player-path-reducer-kit
path-progress-runtime-kit
path-threshold-event-kit
meadow-gameplay-event-contract-kit
meadow-gameplay-event-journal-kit
focal-tree-affordance-kit
inspect-event-runtime-kit
inspect-result-reducer-kit
story-trigger-runtime-kit
objective-state-authority-kit
objective-completion-runtime-kit
arrival-completion-runtime-kit
meadow-gameplay-snapshot-kit
gameplay-snapshot-fixture-kit
gamehost-gameplay-diagnostics-kit
meadow-gameplay-fixture-kit
replay-parity-smoke-kit
```

## Rules for future agents

- Work on this project only when selected by the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger flow.
- Add a new timestamped folder for each run under `.agent/trackers/`.
- Do not overwrite old tracker entries.
- Commit documentation updates to `main` when the run asks for repo documentation work.
