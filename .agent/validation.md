# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T14-08-51-04-00`

## Plan ledger

**Goal:** separate source-backed proof that the interaction loop is inert from executable proof that future path and inspection commands mutate progression correctly and reach a committed frame.

- [x] Review the full accessible Publish inventory.
- [x] Compare every eligible repository with the central ledger.
- [x] Verify root `.agent` coverage.
- [x] Exclude `TheCavalryOfRome`.
- [x] Avoid duplicate work on the newer AetherVale audit already in flight.
- [x] Select only `IntoTheMeadow`.
- [x] Read `AGENTS.md` and current audit state.
- [x] Inspect objective and target declarations.
- [x] Inspect initial state and `advanceGameState()`.
- [x] Inspect browser host RAF input.
- [x] Inspect browser and Node editor capabilities.
- [x] Document interaction/objective authority and fixture requirements.
- [x] Change documentation only.
- [ ] Execute fixtures after implementation exists.

## Source inspection completed

```txt
authored objectives: 2
authored interaction targets: 2
initial active objective: walk-the-path
initial path progress: 0
initial completed objectives: 0
advanceGameState mutates frame: yes
advanceGameState mutates lastTick: yes
advanceGameState mutates player/path progress: no
advanceGameState mutates inspection state: no
advanceGameState evaluates objectives: no
advanceGameState advances story beats: no
browser host sends gameplay commands: no
browser editor interaction capability: no
Node editor interaction capability: no
objective result type: no
interaction journal: no
committed-frame progression revision: no
```

## Proven from source

```txt
walk-the-path requires path-progress on arrival-path at progress >= 0.35
inspect-tree requires inspect on focal-tree
initial game state exposes matching progression fields
browser RAF calls game.tick with only time and dt
advanceGameState ignores action, target and progress input
player.pathProgress remains unchanged
completedObjectiveIds remains unchanged
storyBeatIds remains unchanged
editor surfaces cannot submit interaction commands
diagnostics count authored content but do not prove consumption
```

## Existing proof

Current checks prove:

```txt
required files and host wiring exist
DSK registry shape is valid
fallback source plan can be generated
render plan can be enhanced and validated
CPU mesh metrics satisfy positive thresholds
positive editor capabilities route
positive runtime.tick test advances frames
headless capture writes normal artifacts
```

Current checks do not prove:

```txt
path progress mutation
inspect command admission
canonical target lookup
objective predicate evaluation
exactly-once completion
story transition
browser/editor interaction parity
reset retirement of stale commands
progression revision in diagnostics
progression revision in a committed frame
```

## Execution status

```txt
npm run check executed in this documentation pass: no
Node editor smoke executed: no
browser smoke executed: no
Pages smoke executed: no
runtime source changed: no
package scripts changed: no
dependencies changed: no
render output changed: no
deployment changed: no
branch created: no
pull request created: no
```

A local clone and `npm run check` were attempted, but the execution container could not resolve `github.com`. The GitHub connector was therefore used for source inspection and documentation updates only.

## Required interaction/objective fixture

Create a DOM-free fixture with:

```txt
canonical active scene
canonical target index
canonical objective index
session and epoch IDs
monotonic command sequences
initial player and progression state
bounded command/result journal
fake committed-frame acknowledgement adapter
```

## Acceptance assertions

```txt
path progress 0.10 is accepted but incomplete
path progress 0.35 completes walk-the-path once
path completion activates inspect-tree deterministically
focal-tree inspect completes inspect-tree once
accepted results include command, target and objective revisions
story transition cites completion receipt
browser and editor adapters produce equivalent commands/results
reset returns the initial progression state
first committed frame cites the new progression revision
```

## Rejection assertions

```txt
unknown target rejected
wrong action for target rejected
inactive-scene target rejected
non-finite progress rejected
non-monotonic progress rejected when policy requires monotonicity
stale session or epoch rejected
duplicate inspection returns no-mutation duplicate
duplicate completion returns no-mutation duplicate
post-reset old command rejected
```

Every rejected or duplicate result must assert:

```txt
no player mutation
no inspection mutation
no objective mutation
no story mutation
no committed revision increment
one typed result
one bounded journal row
```

## Future commands

```bash
npm run fixture:interaction-objective
npm run fixture:interaction-ingress-parity
npm run fixture:interaction-reset-retirement
npm run check
```

## Completion boundary

Do not claim that `IntoTheMeadow` has a playable exploration/objective loop until path progress and tree inspection are admitted through canonical commands, objective completion is exactly-once, story state advances deterministically and a committed browser frame acknowledges the same progression revision.
