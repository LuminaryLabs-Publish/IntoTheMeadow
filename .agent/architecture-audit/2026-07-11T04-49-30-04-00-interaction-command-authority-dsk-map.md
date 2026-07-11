# Interaction Command Authority DSK Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T04-49-30-04-00`

## Goal

Assign each part of input, interaction, progression and proof to one explicit DSK owner while avoiding a second monolithic gameplay runtime.

## Existing declarations to implement first

| DSK | Declared services | Required runtime responsibility |
|---|---|---|
| `meadow-input-dsk` | action-map, device-bindings, input-context, input-normalization, input-validation | Produce normalized action samples, not mutate game state |
| `meadow-player-dsk` | player-state, movement-profile, terrain-contact, player-actions, player-validation | Own player position, yaw and path-progress transitions |
| `meadow-interaction-dsk` | interactable-registry, affordance-rules, inspect-state, interaction-events, interaction-validation | Own target lookup, range/affordance admission and inspect state |
| `meadow-objective-dsk` | objective-model, objective-flow, completion-ledger, feedback-surface, objective-validation | Own predicate evaluation and objective transitions |
| `meadow-story-dsk` | story-state, story-beats, dialogue-text, sequence-runner, story-validation | Own trigger evaluation and exactly-once story activation |
| `meadow-ui-dsk` | minimal-hud, story-text-panel, debug-ui, ui-state, ui-validation | Project feedback from committed results |
| `meadow-diagnostics-dsk` | runtime-health, render-health, determinism-checks, smoke-tests, diagnostics-report | Expose journals, fingerprints and fixture health |

## Coordinating parent domain

```txt
meadow-interaction-command-authority-domain
```

The parent owns transaction order and atomicity only:

```txt
receive command
  -> validate envelope and session
  -> normalize action
  -> resolve target
  -> compute proposed player/interaction transition
  -> evaluate objective predicates
  -> evaluate story triggers
  -> atomically commit or reject
  -> append typed result journal
  -> publish clone-safe observation
```

## Candidate coordinating kits

```txt
interaction-command-envelope-kit
interaction-command-admission-kit
interaction-target-query-kit
path-progress-evaluator-kit
inspect-admission-kit
objective-predicate-evaluator-kit
objective-transition-kit
story-trigger-execution-kit
interaction-result-kit
interaction-command-journal-kit
interaction-feedback-projection-kit
interaction-observation-kit
objective-progress-fixture-kit
```

## Command contract

```js
{
  id: "command-0001",
  sessionId: "arrival-meadow:session-0",
  action: "path-progress" | "inspect",
  targetId: "arrival-path" | "focal-tree",
  requestedTick: 12,
  payload: {}
}
```

## Result contract

```js
{
  commandId: "command-0001",
  sessionId: "arrival-meadow:session-0",
  status: "accepted" | "rejected" | "duplicate" | "stale",
  reason: "ok" | "unknown-action" | "unknown-target" | "out-of-range" | "invalid-progress" | "already-completed",
  committedTick: 12,
  preStateFingerprint: "...",
  postStateFingerprint: "...",
  playerTransitions: [],
  interactionTransitions: [],
  objectiveTransitions: [],
  storyTransitions: [],
  journalSequence: 1
}
```

## Ownership rules

```txt
input adapters never mutate progression
renderers never decide interaction acceptance
objectives never directly move the player
story triggers consume committed facts, not raw browser input
rejected commands mutate no domain
one command produces one atomic result
duplicate command IDs never repeat side effects
journals are bounded and clone-safe
```

## Nexus Engine placement

Before creating generic utilities locally, inspect Nexus Engine/ProtoKits for reusable command envelope, result journal, objective predicate and deterministic fingerprint services. Keep `arrival-path`, `focal-tree`, labels, thresholds and story text in this game repository.
