# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T02-38-23-04-00`

## Goal

Turn authored player, path, interaction, objective and story declarations into one executable progression pipeline without moving gameplay rules into renderer code.

## Plan ledger

- [ ] Preserve current meadow generation, render topology, shaders and browser composition.
- [ ] Complete Runtime Session Lifecycle Authority first.
- [ ] Replace raw `GameHost.game` exposure with a capability gateway.
- [ ] Complete Runtime Clock and Step Admission Authority.
- [ ] Add runtime session, scene and progression epoch identity.
- [ ] Define `InteractionCommand` and `ProgressionResult` schemas.
- [ ] Add monotonic command sequence and duplicate rejection.
- [ ] Add bounded player movement commands and results.
- [ ] Derive path progress from authoritative player/path geometry.
- [ ] Prevent caller-supplied path progress from becoming authority.
- [ ] Add registered-target inspection admission.
- [ ] Define proximity and optional line-of-sight policy.
- [ ] Evaluate objective rules after admitted movement/inspection evidence.
- [ ] Commit player, completion ledger, active objective and story beats atomically.
- [ ] Add one ordered event bundle per committed progression revision.
- [ ] Add progression state to clone-safe public observations.
- [ ] Route browser input, browser editor and Node headless commands through the same authority.
- [ ] Add reset progression epoch and stale-command rejection.
- [ ] Correlate progression result, snapshot, render plan, renderer observation and first visible frame.
- [ ] Add DOM-free fixtures to `npm run check`.
- [ ] Add browser and Pages walk-and-inspect smoke gates.

## Existing owners to update first

```txt
into-the-meadow-game-dsk
path-corridor-dsk
meadow-player-dsk
meadow-input-dsk
meadow-interaction-dsk
meadow-objective-dsk
meadow-story-dsk
meadow-ui-dsk
meadow-diagnostics-dsk
web-host-dsk
browser editor bridge
Node headless editor environment
Runtime Session Lifecycle Authority
Runtime Clock and Step Admission Authority
Committed Frame Observation Authority
```

## Candidate coordinating kits

```txt
interaction-command-schema-kit
interaction-command-id-kit
interaction-sequence-kit
interaction-target-registry-kit
player-movement-command-kit
path-progress-sampler-kit
path-progress-result-kit
inspect-command-kit
interaction-admission-kit
objective-rule-kit
objective-transition-kit
completion-ledger-kit
story-trigger-kit
story-transition-kit
progression-commit-kit
progression-result-kit
browser-interaction-adapter-kit
editor-interaction-capability-kit
progression-observation-kit
progression-frame-ack-kit
progression-journal-kit
path-progress-fixture-kit
inspect-objective-fixture-kit
browser-editor-progression-parity-fixture-kit
visible-progression-frame-smoke-kit
```

## Interaction command contract

```txt
InteractionCommand
  commandId
  schemaVersion
  runtimeSessionId
  sceneId
  progressionEpoch
  actorId
  inputSequence
  type: move | inspect
  payload
  expectedProgressionRevision
```

## Progression result contract

```txt
ProgressionResult
  commandId
  status: committed | rejected | duplicate | stale
  runtimeSessionId
  sceneId
  progressionEpoch
  predecessorRevision
  committedRevision
  playerReceipt
  pathProgressReceipt
  interactionReceipt
  objectiveTransitions
  storyTransitions
  events
  rejectionReasons
```

## Required path flow

```txt
move command
  -> finite bounded input admission
  -> terrain/corridor movement proposal
  -> accepted player position
  -> path projection and normalized progress
  -> monotonic progress policy
  -> walk-the-path threshold evaluation
  -> objective/story transition bundle
  -> atomic progression commit
```

## Required inspection flow

```txt
inspect command
  -> target ID lookup
  -> scene/type/action compatibility
  -> player-target spatial evidence
  -> proximity and optional visibility policy
  -> inspect result
  -> inspect-tree objective evaluation
  -> focal-tree story trigger
  -> atomic progression commit
```

## Acceptance matrix

```txt
valid movement changes player position
non-finite or oversized movement rejects without mutation
path progress is derived from spatial state
path progress cannot regress unless policy explicitly permits it
0.35 threshold completes walk-the-path exactly once
inspect out of range rejects
inspect focal-tree in range completes inspect-tree exactly once
objective and story changes share one committed revision
duplicate command returns the prior result without a second mutation
stale session/scene/epoch/revision rejects
reset creates a new progression epoch
browser, browser-editor and Node-headless commands produce the same result schema
first visible frame cites the committed progression revision
```

## Ordered architecture queue

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Clock and Step Admission Authority
5. Source Provider Authority
6. Render Topology Identity Authority
6a. WebGL Context Recovery Authority
6b. Render Surface Resolution Authority
7. Committed Frame Observation Authority
7a. Fatal Runtime Failure Recovery Authority
7b. Adaptive Quality and Performance Budget Authority
8. Interaction Command and Objective Progression Authority
8a. Persistence Continuity Authority
9. DSK Runtime Consumption Authority
9a. Deterministic Replay Validation Authority
```

Do not add direct editor-only state mutation. Every product and tooling surface must use the same admitted command and typed progression result.
