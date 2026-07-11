# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T04-49-30-04-00`

## Plan ledger

**Goal:** Separate completed command-path inspection from executable proof and define the exact fixtures required before claiming that the authored path and tree objectives are playable.

```txt
[x] Review the complete accessible Publish inventory.
[x] Compare every eligible repository with the central ledger.
[x] Exclude TheCavalryOfRome.
[x] Select only IntoTheMeadow.
[x] Read AGENTS.md and current .agent state.
[x] Inspect objective, target and story declarations.
[x] Inspect initial game state and advanceGameState.
[x] Inspect browser host input and tick behavior.
[x] Inspect GameHost and browser editor capabilities.
[x] Inspect Node headless editor capabilities and command smoke.
[x] Document interaction authority and required fixtures.
[x] Change documentation only.
[x] Push to main.
[x] Synchronize the central ledger and internal change log.
```

## Source inspection completed

```txt
authored objectives: 2
authored interaction targets: 2
authored story beats: 3
runtime gameplay command API: no
browser input mapping: no
player movement mutation: no
path progress mutation: no
inspect mutation: no
objective predicate evaluation: no
story trigger execution after startup: no
typed interaction result: no
command journal: no
GameHost command observation: no
browser editor command capability: no
Node editor command capability: no
```

## Existing proof

Current checks prove:

```txt
static source and manifest reachability
DSK registry structure
fallback render-plan generation
render-plan enhancement and validation
renderer-v2 descriptors
deterministic fallback scene snapshots
headless environment reachability
runtime.tick frame increments
renderer capture metrics
```

Current checks do not prove:

```txt
movement
path progress
target range
inspect admission
objective completion
story transition
command rejection
duplicate/stale protection
command/result journals
command-to-frame correlation
```

## Execution status

```txt
npm run check executed in this documentation pass: no
browser smoke executed: no
Pages smoke executed: no
runtime source changed: no
package scripts changed: no
dependencies changed: no
```

The GitHub connector was used for this docs-only audit and does not execute repository commands.

## Required path-progress fixture

Start from the canonical initial state and dispatch a deterministic command sequence.

Cases:

```txt
unknown action -> rejected / no mutation
unknown target -> rejected / no mutation
negative progress -> rejected / no mutation
progress below 0.25 -> accepted / no story transition
cross 0.25 -> path-discovery story beat exactly once
cross 0.35 -> walk-the-path objective completion exactly once
repeat same commandId -> duplicate / no second mutation
stale sessionId -> rejected / no mutation
reset -> pathProgress 0 and initial progression restored
```

Each result must assert:

```txt
commandId
sessionId
requestedTick and committedTick
action and targetId
status
reason
preStateFingerprint
postStateFingerprint
player transition
objective transitions
story transitions
journal sequence
```

## Required inspect fixture

Cases:

```txt
inspect unknown target -> rejected
inspect wrong target type -> rejected
inspect focal-tree out of range -> rejected
inspect focal-tree in range -> accepted
inspect-tree objective completes exactly once
focal-tree story beat emits exactly once
repeat accepted commandId -> duplicate with no mutation
new command after completion -> already-completed or accepted-noop by declared policy
```

## Required host/editor proof

```txt
GameHost.dispatchCommand()
GameHost.getCommandJournal()
GameHost.getObjectiveState()
NexusEditorEnvironment interaction.dispatch
NexusEditorEnvironment objective.getState
Node headless equivalents
clone-safe results
bounded journal
same command sequence yields same state fingerprint
```

## Future commands

```bash
npm run fixture:interaction-path
npm run fixture:interaction-inspect
npm run fixture:objective-story
npm run fixture:interaction-replay
npm run check
```

## Completion boundary

Do not claim the meadow is playable because it renders or because `runtime.tick` advances the frame. Completion requires accepted and rejected command fixtures, atomic objective/story transitions, deterministic replay and host/editor observation.
