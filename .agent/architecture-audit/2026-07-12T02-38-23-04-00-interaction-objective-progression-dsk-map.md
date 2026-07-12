# Architecture Audit: Interaction, Objective and Story Progression DSK Map

**Timestamp:** `2026-07-12T02-38-23-04-00`

## Current ownership

```txt
meadow-player-dsk
  declares player state, movement profile, terrain contact and actions
meadow-input-dsk
  declares action map, device bindings and input normalization
path-corridor-dsk
  declares path curve, corridor and path progression
meadow-interaction-dsk
  declares targets, affordances, inspect state and events
meadow-objective-dsk
  declares objectives, flow, completion ledger and feedback
meadow-story-dsk
  declares story state, beats, dialogue and sequence runner
into-the-meadow-game-dsk
  owns immutable root state, tick, reset and snapshot
web-host-dsk
  owns browser loop and host surface
```

These ownership names are declared, but no implementation composes them into an executable transaction.

## Current dependency failure

```txt
browser input adapter -> absent
command admission -> absent
player movement -> absent
path sampling -> absent
interaction admission -> absent
objective evaluation -> absent
story evaluation -> absent
atomic progression commit -> absent
committed frame receipt -> absent
```

## Required parent domain

```txt
meadow-interaction-objective-progression-authority-domain
```

## Child kits

```txt
identity and admission
  interaction-command-schema-kit
  interaction-command-id-kit
  interaction-sequence-kit
  interaction-admission-kit

spatial evidence
  interaction-target-registry-kit
  player-movement-command-kit
  path-progress-sampler-kit
  path-progress-result-kit
  inspect-command-kit

progression rules
  objective-rule-kit
  objective-transition-kit
  completion-ledger-kit
  story-trigger-kit
  story-transition-kit

commit and observation
  progression-commit-kit
  progression-result-kit
  progression-observation-kit
  progression-frame-ack-kit
  progression-journal-kit

adapters and proof
  browser-interaction-adapter-kit
  editor-interaction-capability-kit
  path-progress-fixture-kit
  inspect-objective-fixture-kit
  browser-editor-progression-parity-fixture-kit
  visible-progression-frame-smoke-kit
```

## Correct dependency direction

```txt
browser/editor/headless adapters
  -> command schema and admission
  -> player/path/target evidence
  -> objective and story rules
  -> atomic progression commit
  -> immutable result and observation
  -> render/UI consumers
```

Renderer and editor code must not become a second progression writer.

## Required composition invariants

```txt
one active progression owner per runtime session
all commands carry session, scene, epoch and expected revision
all spatial evidence is computed by trusted owners
objective and story transitions share one commit revision
adapters cannot mutate state directly
reset replaces the progression epoch
visible frames cite committed progression revision
```
