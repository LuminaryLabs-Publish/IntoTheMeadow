# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T02-38-23-04-00`

## Plan ledger

**Goal:** distinguish authored progression data from executable proof that movement, path sampling, inspection, objective/story transition and visible feedback work through one authority.

- [x] Review the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Verify all eligible root `.agent` states.
- [x] Select only `IntoTheMeadow` after avoiding active unsynchronized work.
- [x] Inspect objective, target and story content.
- [x] Inspect initial state and `advanceGameState()`.
- [x] Inspect game construction, browser host, public host and editor capabilities.
- [x] Inspect package checks and current smoke coverage.
- [x] Document command, spatial, progression, parity and visible-frame proof requirements.
- [x] Change documentation only.
- [ ] Execute progression fixtures after implementation exists.

## Source inspection completed

```txt
authored objectives: 2
authored interaction targets: 2
authored story beats: 3
initial active objective: walk-the-path
initial completed objectives: 0
initial path progress: 0
implemented game-state transition functions: 1
state fields mutated by advanceGameState: frame and lastTick only
browser gameplay listeners in web host: 0
movement capabilities in editor bridge: 0
inspect capabilities in editor bridge: 0
progression result schemas: 0
visible progression-frame receipts: 0
```

## Proven from source

```txt
walk-the-path requires action path-progress on arrival-path and progress >= 0.35
inspect-tree requires action inspect on focal-tree and inspected=true
focal-tree has an authored position and interaction radius
arrival-path has an authored position and interaction radius
path-discovery story beat is keyed to path-progress:0.25
focal-tree story beat is keyed to inspect:focal-tree
initial state contains player, progression and story IDs
advanceGameState increments frame and records lastTick only
createIntoTheMeadowGame exposes authored content but no action command
web host ticks and renders but installs no gameplay input adapter
editor bridge exposes tick/reset/read/render/capture only
snapshot returns state and render data without a progression result
```

## Existing proof

Current checks prove:

```txt
required source files exist
DSK descriptors validate structurally
authored scene-flow counts validate
render plans and CPU mesh data validate
renderer and headless editor smoke paths execute
```

Current checks do not prove:

```txt
player movement
path projection or progress
path objective completion
tree inspection
tree objective completion
story beat transition
objective/story atomicity
command sequencing or idempotence
stale session/scene/epoch rejection
reset progression fencing
browser/editor/headless parity
visible progression-frame correlation
```

## Execution status

```txt
runtime source changed: no
interaction source changed: no
objective/story source changed: no
renderer source changed: no
package scripts changed: no
dependencies changed: no
render output changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check executed: no
progression fixtures available: no
browser progression smoke available: no
```

## Required command-admission fixture

```txt
accept a valid monotonic command ID and input sequence
reject duplicate command without a second mutation
reject stale session, scene, epoch and expected revision
reject unknown action and target
reject non-finite movement values
reject movement outside configured bounds
return typed status and reasons
```

## Required path fixture

```txt
start from the canonical initial player position
apply admitted movement commands
project player position onto arrival-path geometry
produce normalized progress from authoritative geometry
assert monotonic policy
emit path-discovery at 0.25 exactly once
complete walk-the-path at 0.35 exactly once
preserve transition identity across snapshot and replay
```

## Required inspection fixture

```txt
reject focal-tree inspection outside the admitted radius
accept inspection inside the admitted radius
validate target scene, type and required action
complete inspect-tree exactly once
emit focal-tree story beat exactly once
duplicate inspect returns prior result without mutation
```

## Required atomic progression fixture

```txt
prepare player, path, interaction, objective and story changes
fail one staged rule and preserve predecessor state
commit all accepted changes under one progression revision
publish one ordered event bundle
ensure active objective and completion ledger agree
ensure story beat IDs agree with emitted transitions
```

## Required reset fixture

```txt
complete at least one objective
reset into a new progression epoch
restore canonical player and progression state
reject predecessor-epoch commands
ensure no predecessor event appears after reset
acknowledge the first neutral replacement frame
```

## Required adapter parity fixture

```txt
run the same command sequence through direct domain API
run through browser capability gateway
run through browser editor bridge
run through Node headless editor environment
compare ProgressionResult and terminal state fingerprints
```

## Required render and frame fixture

```txt
commit a progression result
build the matching snapshot/read model
render one frame carrying progression revision and result ID
capture the browser canvas after that frame
assert HUD/story feedback and observation cite the same revision
```

## Future commands

```bash
npm run fixture:interaction-command
npm run fixture:path-progress
npm run fixture:inspect-objective
npm run fixture:progression-atomicity
npm run fixture:progression-reset
npm run fixture:progression-adapter-parity
npm run smoke:progression-visible-frame
npm run smoke:progression-pages
npm run check
```

## Completion boundary

Do not claim playable progression because the content arrays and DSK descriptors exist. Completion requires executable commands, authoritative spatial evidence, atomic objective/story commits, adapter parity, reset fencing and a first visible frame that cites the committed progression result.
