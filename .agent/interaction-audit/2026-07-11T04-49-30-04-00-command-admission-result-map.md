# Command Admission and Result Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T04-49-30-04-00`

## Current public surfaces

| Surface | Tick | Reset | Gameplay command | Objective read | Journal read |
|---|---:|---:|---:|---:|---:|
| game object | yes | yes | no | indirect state only | no |
| GameHost | raw game reachable | raw game reachable | no stable API | indirect state only | no |
| browser editor bridge | yes | yes | no | no | no |
| Node headless editor | yes | yes | no | no | no |

## Required command admission

```txt
validate command envelope
validate active session
reject duplicate command ID
validate requested tick policy
resolve known action
resolve known target
validate target-action compatibility
validate range/affordance
compute proposed transition
evaluate objective/story effects
commit atomically
append result
```

## Rejection map

| Condition | Status | Reason | Mutation |
|---|---|---|---|
| malformed envelope | rejected | invalid-command | none |
| unknown action | rejected | unknown-action | none |
| unknown target | rejected | unknown-target | none |
| action/target mismatch | rejected | unsupported-affordance | none |
| focal tree out of range | rejected | out-of-range | none |
| invalid path progress | rejected | invalid-progress | none |
| stale session | stale | stale-session | none |
| repeated command ID | duplicate | duplicate-command | none |

## Required public capabilities

```txt
GameHost.dispatchCommand(command)
GameHost.getCommandJournal()
GameHost.getObjectiveState()

browser editor:
  interaction.dispatch
  interaction.getJournal
  objective.getState
  story.getState

Node headless editor:
  same action and observation semantics
```

## Proof rule

No public caller should infer success by reading mutable state after an untyped call. Every dispatch returns the authoritative result that names its committed transitions and fingerprints.
