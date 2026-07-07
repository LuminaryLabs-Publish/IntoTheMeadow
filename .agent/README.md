# IntoTheMeadow Agent Notes

This folder contains internal project breakdowns for `LuminaryLabs-Publish/IntoTheMeadow`.

## Current project read

`IntoTheMeadow` is a publishable DSK-composed meadow exploration game repo. It owns game-specific composition, story, progression, content, validation, and deployment while consuming reusable meadow infrastructure from `NexusRealtime-ProtoKits` and Nexus Engine runtime contracts.

The repo is currently a strong v0.1 DSK scaffold and browser proof. It has external meadow kit imports, deterministic state snapshots, local DSK descriptors, diagnostics, static validation, and render-plan enhancement, but the playable movement, interaction, story, and objective loop still needs executable runtime behavior.

## Latest tracker

- `trackers/2026-07-07T04-41-22-04-00/project-breakdown.md`

## Kit registry

- `kit-registry.json`

## Previous trackers

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
2. Player walks the meadow path through normalized input.
3. `path-corridor-dsk` samples path progress.
4. `meadow-story-dsk` triggers the path discovery story beat.
5. `meadow-interaction-dsk` exposes the old tree inspection affordance.
6. `meadow-objective-dsk` completes `walk-the-path` and `inspect-tree`.
7. `meadow-save-dsk` records arrival meadow completion.
8. The game moves toward the next meadow area or story scene.

## Active next direction

The best next slice is the **Arrival Meadow Playable Loop Cutover**:

- Add host-level input collection and `meadow-input-dsk` action normalization.
- Expand `advanceGameState()` into a service-composed reducer.
- Add `meadow-player-dsk` movement and path-progress sampling.
- Add `meadow-camera-dsk` camera state and render-plan metadata.
- Convert interaction targets into proximity, view, and inspect affordances.
- Convert static objectives into live completion checks.
- Convert story beats into one-shot trigger evaluation.
- Preserve `window.GameHost.getState()`, `getSnapshot()`, and `getDiagnostics()` for smoke validation.

## Rules for future agents

- Work on this project only when selected by the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger flow.
- Add a new timestamped folder for each run under `.agent/trackers/`.
- Do not overwrite old tracker entries.
- Commit documentation updates to `main` when the run asks for repo documentation work.
