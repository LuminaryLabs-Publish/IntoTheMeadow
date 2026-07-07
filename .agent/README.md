# IntoTheMeadow Agent Notes

This folder contains internal project breakdowns for `LuminaryLabs-Publish/IntoTheMeadow`.

## Current project read

`IntoTheMeadow` is a publishable DSK-composed meadow exploration game repo. It owns the product route, browser host, game factory, deterministic state root, local DSK descriptors, arrival-meadow content, objective/story descriptors, diagnostics, validation scripts, and deployment surface while consuming reusable meadow infrastructure from `NexusRealtime-ProtoKits`.

The repo is still a strong v0.1 DSK scaffold and browser proof. It has external meadow kit imports, deterministic snapshots, local DSK descriptors, render-plan enhancement, diagnostics, and static validation. The missing layer is executable play: input, movement, path progress, tree inspection, story triggers, objective completion, and arrival completion state.

## Latest tracker

- `trackers/2026-07-07T05-50-01-04-00/project-breakdown.md`

## Kit registry

- `kit-registry.json`

## Previous trackers

- `trackers/2026-07-07T04-41-22-04-00/project-breakdown.md`
- `trackers/2026-07-07T03-28-26-04-00/project-breakdown.md`

## Core loop snapshot

Current loop:

1. Browser opens `index.html`.
2. `src/boot/boot-game.js` starts the web host.
3. `src/hosts/web-host.js` loads external meadow kits from the manifest.
4. `createIntoTheMeadowGame()` installs local DSK descriptors and creates the arrival meadow area.
5. The animation frame loop ticks deterministic state, requests a meadow render plan, enhances it with local DSK services, and sends it to the WebGL render kit.
6. `window.GameHost` exposes state, snapshot, diagnostics, and render snapshot surfaces.

Target playable loop:

1. Player spawns at the arrival path.
2. Host input is normalized through `meadow-input-dsk`.
3. `meadow-player-dsk` updates position, yaw, pitch, and path progress.
4. `path-corridor-dsk` samples path progress against the configured arrival path.
5. `meadow-story-dsk` triggers `path-discovery` after path progress crosses `0.25`.
6. `meadow-interaction-dsk` exposes the old tree inspection affordance.
7. `meadow-objective-dsk` completes `walk-the-path` and `inspect-tree`.
8. `meadow-save-dsk` records arrival meadow completion after deterministic gameplay state is stable.

## Active next direction

The best next slice is the **IntoTheMeadow Runtime Loop Evaluation Cutover**:

- Add host-level input collection in `src/hosts/web-host.js`.
- Pass normalized action frames into `game.tick({ time, dt, actions })`.
- Expand `advanceGameState()` into service-composed reducers.
- Add `meadow-player-dsk` movement and path-progress sampling.
- Add `meadow-camera-dsk` camera state and render-plan metadata.
- Convert `ARRIVAL_INTERACTION_TARGETS` into proximity, facing, and inspect affordances.
- Convert `STORY_BEATS` into one-shot trigger evaluation.
- Convert `ARRIVAL_OBJECTIVES` into live completion checks.
- Preserve `window.GameHost.getState()`, `getSnapshot()`, and `getDiagnostics()` for smoke validation.

## Runtime cutover kits

```txt
meadow-input-runtime-kit
meadow-player-runtime-kit
path-progress-runtime-kit
focal-tree-interaction-runtime-kit
story-trigger-runtime-kit
objective-completion-runtime-kit
arrival-completion-save-kit
playable-loop-smoke-kit
```

## Rules for future agents

- Work on this project only when selected by the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger flow.
- Add a new timestamped folder for each run under `.agent/trackers/`.
- Do not overwrite old tracker entries.
- Commit documentation updates to `main` when the run asks for repo documentation work.
