# IntoTheMeadow Agent Notes

This folder contains internal project breakdowns for `LuminaryLabs-Publish/IntoTheMeadow`.

## Current project read

`IntoTheMeadow` is a publishable DSK-composed meadow exploration game repo. It owns the product route, browser host, game factory, deterministic state root, local DSK descriptors, arrival-meadow content, objective/story/interaction descriptors, diagnostics, validation scripts, and deployment surface while consuming reusable meadow infrastructure from `NexusRealtime-ProtoKits`.

The repo remains a strong v0.1 DSK scaffold and browser proof. The missing layer is still executable agency: `src/hosts/web-host.js` calls `game.tick({ time, dt })`, and `src/game/game-state.js` currently advances only `frame` and `lastTick`. The content needed for the first playable loop already exists: `ARRIVAL_MEADOW_CONFIG.features.path.points`, `ARRIVAL_INTERACTION_TARGETS`, `STORY_BEATS`, and `ARRIVAL_OBJECTIVES`.

This pass narrows the next cut from broad ActionFrame/reducer work into the exact contract seam that should land first: reducer result records and gameplay event records. The next implementation should make every reducer return accepted/rejected actions, emitted events, state diff diagnostics, and fixture-readable metadata before renderer extraction, save persistence, pointer-lock polish, or audio work.

## Latest tracker

- `trackers/2026-07-07T13-21-30-04-00/project-breakdown.md`

## Kit registry

- `kit-registry.json`

## Previous trackers

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
2. `meadow-actionframe-contract-kit` defines stable ActionFrame records.
3. `meadow-action-batch-kit` batches and orders host/scripted action frames per tick.
4. `meadow-action-rejection-reason-kit` gives every unsupported or impossible action a stable reason code.
5. `meadow-reducer-result-contract-kit` requires every reducer to return state, accepted/rejected actions, events, and diagnostics.
6. `meadow-gameplay-event-contract-kit` defines path, inspect, story, objective, completion, and diagnostic events.
7. `meadow-reducer-pipeline-kit` applies reducers in fixed order.
8. `path-progress-runtime-kit` samples `ARRIVAL_MEADOW_CONFIG.features.path.points` and emits path-progress events.
9. `focal-tree-affordance-kit` exposes the old-tree inspect affordance.
10. `inspect-event-runtime-kit` emits `inspect:focal-tree` only when the inspect action is valid.
11. `meadow-gameplay-event-journal-kit` records and dedupes one-shot events.
12. `story-trigger-runtime-kit` fires `path-discovery` and `focal-tree` story beats once.
13. `objective-completion-runtime-kit` completes `walk-the-path` and `inspect-tree`.
14. `arrival-completion-runtime-kit` records deterministic arrival meadow completion.
15. `meadow-gameplay-snapshot-kit` exposes stable gameplay snapshots through `window.GameHost`.
16. `meadow-render-metadata-projection-kit` exposes product-neutral gameplay metadata to render debug surfaces.

## Active next direction

The best next slice is the **IntoTheMeadow GameplayEvent Contract + Reducer Result Fixture Cutover**:

- Keep `index.html`, `src/boot/boot-game.js`, and current render behavior intact.
- Keep `game.tick({ time, dt })` compatible for existing runtime and tests.
- Add `meadow-actionframe-contract-kit` with stable action id, frame, time, scene id, source, value, accepted/rejected, and reason metadata.
- Add `meadow-action-batch-kit` so `game.tick()` receives stable sorted action arrays.
- Add `meadow-action-rejection-reason-kit` with `unsupported_action`, `invalid_scene`, `out_of_range`, `wrong_target`, `duplicate_event`, and `no_effect`.
- Add `meadow-reducer-result-contract-kit` before concrete reducer work.
- Require every reducer to return `{ state, events, acceptedActions, rejectedActions, diagnostics }`.
- Add `meadow-gameplay-event-contract-kit` for `path-progress`, `story-beat`, `objective-complete`, `inspect`, `completion`, and `diagnostic` event types.
- Add `meadow-gameplay-event-journal-kit` with one-shot event de-dupe by event key.
- Add `path-progress-runtime-kit` against `ARRIVAL_MEADOW_CONFIG.features.path.points`.
- Fire `path-progress:0.25` once and complete `walk-the-path` at `pathProgress >= 0.35`.
- Add `focal-tree-affordance-kit` using the `ARRIVAL_INTERACTION_TARGETS` focal-tree radius of `4.5`.
- Reject out-of-range inspect with stable reason metadata.
- Accept `inspect:focal-tree` when the position/facing constraints pass.
- Trigger the `focal-tree` story beat and complete `inspect-tree` after valid inspect.
- Derive arrival completion after both existing objectives complete.
- Add `meadow-gameplay-snapshot-kit` so `window.GameHost.getSnapshot().gameplay` exposes player, actions, reducers, events, story, objectives, interaction, completion, and render metadata.
- Add scripted fixtures for path walk, invalid inspect, valid inspect, objective completion, and replay parity.

## Runtime cutover kits

```txt
meadow-actionframe-contract-kit
meadow-action-batch-kit
meadow-input-runtime-kit
meadow-action-acceptance-kit
meadow-action-rejection-reason-kit
meadow-reducer-contract-kit
meadow-reducer-result-contract-kit
meadow-reducer-pipeline-kit
meadow-player-path-reducer-kit
path-progress-runtime-kit
meadow-gameplay-event-contract-kit
meadow-gameplay-event-journal-kit
focal-tree-affordance-kit
inspect-event-runtime-kit
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
