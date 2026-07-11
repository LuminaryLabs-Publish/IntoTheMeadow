# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T04-49-30-04-00`

## Goal

Implement one narrow deterministic interaction authority for the two existing gameplay actions: path progress and focal-tree inspection. Every action must return a typed result, mutate player/objective/story state atomically when accepted, leave state unchanged when rejected and expose proof through GameHost and editor surfaces.

## Plan ledger

```txt
[ ] Preserve the current meadow source, render-plan/v2 contract and visual output.
[ ] Complete Runtime Session Lifecycle Authority before exposing restart-sensitive commands.
[ ] Complete Source Provider Authority before claiming production/test parity.
[ ] Update meadow-input-dsk with normalized action samples.
[ ] Add a stable InteractionCommand envelope with commandId, sessionId, action, targetId, payload and requestedTick.
[ ] Add command admission for known actions, known targets, active session and monotonic command sequence.
[ ] Update meadow-player-dsk with deterministic movement/path-progress state transitions.
[ ] Add path projection or an explicit normalized pathProgress command policy for the first fixture.
[ ] Update meadow-interaction-dsk with target registry, range/affordance checks and inspect state.
[ ] Add objective predicate evaluation for progressAtLeast and inspected.
[ ] Commit objective completion and active-objective advancement atomically.
[ ] Execute path-progress:0.25 and inspect:focal-tree story triggers exactly once.
[ ] Return an InteractionResult for accepted, rejected, duplicate and stale commands.
[ ] Add a bounded command/result journal.
[ ] Project objective/story feedback without coupling it to renderer internals.
[ ] Add GameHost dispatchCommand, getCommandJournal and getObjectiveState reads.
[ ] Add browser editor interaction.dispatch and objective.getState capabilities.
[ ] Add equivalent Node headless capabilities.
[ ] Link command results to session, simulation tick and later committed-frame IDs.
[ ] Add deterministic path-progress acceptance and rejection fixtures.
[ ] Add deterministic focal-tree inspect in-range and out-of-range fixtures.
[ ] Add duplicate/stale command fixtures.
[ ] Add objective/story exactly-once transition fixtures.
[ ] Add reset fixture proving command journals and progression reset correctly.
[ ] Wire fixtures into npm run check.
[ ] Run npm run check.
[ ] Run browser and deployed Pages smoke tests.
```

## Required implementation order

```txt
1. input-action-normalization update in meadow-input-dsk
2. interaction-command-envelope-kit
3. interaction-command-admission-kit
4. player/path transition update in meadow-player-dsk
5. interaction-target-query-kit
6. path-progress-evaluator-kit
7. inspect-admission-kit
8. objective-predicate-evaluator-kit
9. objective-transition-kit
10. story-trigger-execution-kit
11. interaction-result-kit
12. interaction-command-journal-kit
13. interaction-feedback-projection-kit
14. interaction-observation-kit
15. objective-progress-fixture-kit
```

## Acceptance criteria

```txt
path-progress can advance the player from 0 to at least 0.35
the 0.25 story beat fires once when the threshold is crossed
walk-the-path completes once at 0.35 or greater
inspect is rejected for unknown or out-of-range targets
inspect:focal-tree is accepted in range
inspect-tree completes once
the focal-tree story beat fires once
accepted commands atomically mutate all required state
rejected commands mutate nothing
duplicate command IDs do not repeat transitions
every result contains stable reason and transition rows
GameHost and both editor environments expose clone-safe command proof
same initial state plus same command sequence yields the same final fingerprint
```

## Deferred until after this gate

```txt
free-form first-person controls
camera feel tuning
new objectives or story beats
audio
save/load
new UI progression
visual retuning
renderer replacement
WebGPU migration
shared-kit promotion
```
