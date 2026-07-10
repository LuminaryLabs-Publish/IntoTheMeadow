# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-10T18-22-01-04-00`

## Goal

Turn the existing path, tree, player, interaction, and objective descriptors into one deterministic gameplay slice while preserving the current meadow source, renderer, visual output, and legacy readback surfaces.

## Current next build slice

```txt
IntoTheMeadow Interaction Command Authority + Objective Progress Fixture Gate
```

## Plan ledger

```txt
[ ] Preserve the current external meadow source URL, fallback path, render-plan schema, topologyKey behavior, renderer output, GameHost legacy methods, and editor protocol.
[ ] Define typed commands for move, path-progress, inspect, and reset.
[ ] Add a command adapter that normalizes keyboard/editor/fixture inputs into the same command contract.
[ ] Add target lookup and deterministic preflight for target existence, action support, range, state, and objective eligibility.
[ ] Return accepted, rejected, or no-op results with stable status and reason codes.
[ ] Move player/path-progress mutation into a pure reducer.
[ ] Add inspected target state and prevent duplicate inspection mutation.
[ ] Evaluate walk-the-path at progress >= 0.35.
[ ] Evaluate inspect-tree after focal-tree inspection.
[ ] Advance active objective and completedObjectiveIds deterministically.
[ ] Retain a bounded ordered command/result/event journal with sequence and frame ids.
[ ] Add canonical gameplay state fingerprints.
[ ] Project gameplay observations through GameHost additively.
[ ] Add editor capabilities for gameplay.dispatch and gameplay.getJournal.
[ ] Add DOM-free fixtures for accepted movement, rejected target, out-of-range inspect, successful inspect, objective completion, duplicate command, reset, and replay.
[ ] Prove the same command list produces the same results, progression, and fingerprint.
[ ] Keep external-source provenance/fallback parity, mesh contribution, and registry truth as companion gates.
[ ] Wire fixtures into npm run check.
[ ] Update repo-local and central ledgers after implementation lands.
```

## Suggested files

```txt
src/game/commands/meadow-command-contract.js
src/game/commands/dispatch-meadow-command.js
src/game/interaction/preflight-meadow-target.js
src/game/reducers/reduce-player-movement.js
src/game/reducers/reduce-objective-progress.js
src/game/observations/create-gameplay-observation.js
src/game/game-state.js
src/game/create-into-the-meadow-game.js
src/hosts/web-host.js
src/boot/expose-game-host.js
src/editor/install-editor-bridge.js
tests/meadow-interaction-command-smoke.mjs
tests/meadow-objective-progress-smoke.mjs
tests/meadow-command-replay-smoke.mjs
package.json
```

## Expected result row

```txt
{
  sequence,
  frameId,
  command: { type, targetId, value },
  status: accepted | rejected | no-op,
  reason,
  mutations,
  events,
  objectiveBefore,
  objectiveAfter,
  stateFingerprint
}
```

## Implementation order

```txt
1. Define command, status, reason, mutation, event, and observation schemas.
2. Add pure target preflight and reducers.
3. Add dispatch and bounded journal ownership to the game domain.
4. Wire browser/editor/fixture inputs through the same adapter.
5. Project readback through GameHost and NexusEditorEnvironment.
6. Add deterministic command, objective, reset, and replay fixtures.
7. Preserve source/render proof surfaces and run npm run check.
8. Update central tracking.
```

## Stop condition

Stop when a DOM-free fixture can walk the path, inspect the focal tree, complete both objectives, prove rejection/no-op behavior, reset, replay the same commands, and obtain identical ordered results and final fingerprints through GameHost/editor readback.