# IntoTheMeadow Agent Notes

This folder contains internal project breakdowns for `LuminaryLabs-Publish/IntoTheMeadow`.

## Current project read

`IntoTheMeadow` is a publishable DSK-composed meadow exploration game repo. It owns game-specific composition, story, progression, content, validation, and deployment while consuming reusable meadow infrastructure from `NexusRealtime-ProtoKits` and Nexus Engine runtime contracts.

## Latest tracker

- `trackers/2026-07-07T03-28-26-04-00/project-breakdown.md`

## Core loop snapshot

Current loop:

1. Browser opens `index.html`.
2. `src/boot/boot-game.js` starts the web host.
3. `src/hosts/web-host.js` loads external meadow kits from the manifest.
4. `createIntoTheMeadowGame()` creates the game state, installs DSK descriptors, and creates the arrival meadow area.
5. The animation frame loop ticks deterministic state, requests a meadow render plan, enhances it with local DSK services, and sends it to the WebGL render kit.
6. `window.GameHost` exposes state, snapshot, diagnostics, and render snapshot surfaces.

Target playable loop:

1. Player spawns at the arrival path.
2. Player walks the meadow path.
3. Story beats trigger from path progress and inspection.
4. Player inspects the old meadow tree.
5. Objectives update and complete.
6. The game records completion and moves toward the next meadow area / story scene.

## Active next direction

The best next slice is the **Arrival Meadow Playable Loop Cutover**:

- Add first-person or third-person movement through `meadow-player-dsk`, `meadow-input-dsk`, and `meadow-camera-dsk`.
- Convert static objectives into live objective checks.
- Convert interaction targets into proximity / look / action affordances.
- Trigger story beats from actual state transitions instead of static content counts.
- Keep `index.html` thin and keep reusable meadow behavior in ProtoKits or local DSK modules.
- Preserve `window.GameHost.getState()`, `getSnapshot()`, and `getDiagnostics()` for smoke validation.

## Rules for future agents

- Work on this project only when selected by the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger flow.
- Add a new timestamped folder for each run under `.agent/trackers/`.
- Do not overwrite old tracker entries.
- Push documentation updates to `main` when the run asks for repo documentation work.
