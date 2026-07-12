# Interaction and Objective Progression Reconciliation DSK Map

**Timestamp:** `2026-07-12T09-21-40-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The authored interaction, objective and story descriptors are installed as declarations but have no implementation provider that admits commands, derives target evidence, mutates progression or proves visible feedback. This audit preserves the `09-08-17` architecture finding while synchronizing machine and central tracking.

## Plan ledger

**Goal:** define the exact authority boundary between declared DSK services and executable progression.

- [x] Identify existing owners.
- [x] Identify missing command/result boundaries.
- [x] Identify the composed parent domain.
- [x] Define coordinating kits and transaction order.
- [x] Preserve preceding lifecycle, clock, render and persistence dependencies.
- [ ] Implement after the authority contracts and fixtures are accepted.

## Current declaration graph

```txt
meadow-input-dsk
  -> action-map, device-bindings, input-context, input-normalization

meadow-player-dsk
  -> player-state, movement-profile, terrain-contact, player-actions

path-corridor-dsk
  -> path curve, walkable corridor, path progression metadata

meadow-interaction-dsk
  -> target registry metadata, affordance rules, inspect state, interaction events

meadow-objective-dsk
  -> objective model, objective flow, completion ledger, feedback surface

meadow-story-dsk
  -> story state, beats, dialogue and sequence metadata

meadow-ui-dsk
  -> HUD, story panel, debug UI and UI state
```

These are declarations. The current runtime does not install an implementation provider that composes them into one executable transaction.

## Required parent domain

```txt
meadow-interaction-objective-progression-authority-domain
```

## Existing owners to update first

```txt
meadow-input-dsk
meadow-player-dsk
path-corridor-dsk
meadow-interaction-dsk
meadow-objective-dsk
meadow-story-dsk
meadow-ui-dsk
into-the-meadow-game-dsk
game-composition-dsk
web-host-dsk
meadow-diagnostics-dsk
GameHost capability surface
browser editor bridge
game snapshot/read model
committed-frame authority
persistence continuity authority
```

## Coordinating kits

```txt
progression-session-id-kit
progression-reset-generation-kit
progression-state-revision-kit
interaction-command-id-kit
interaction-command-kit
interaction-command-admission-kit
interaction-action-map-kit
interaction-target-registry-kit
interaction-target-revision-kit
interaction-target-query-kit
interaction-proximity-evidence-kit
path-progress-evidence-kit
inspect-evidence-kit
interaction-result-kit
stale-interaction-command-rejection-kit
objective-definition-registry-kit
objective-evaluation-kit
objective-completion-result-kit
objective-successor-policy-kit
completion-ledger-commit-kit
story-trigger-parser-kit
story-trigger-evaluation-kit
story-beat-deduplication-kit
story-progression-result-kit
progression-transaction-kit
progression-rollback-kit
feedback-state-kit
progression-ui-projection-kit
progression-observation-kit
progression-journal-kit
visible-progression-frame-ack-kit
interaction-objective-fixture-kit
browser-editor-progression-parity-fixture-kit
```

## Transaction

```txt
InteractionCommand
  -> session/reset/revision admission
  -> command identity and idempotency
  -> canonical target resolution
  -> detached proximity/path/inspect evidence
  -> typed rejection or candidate progression state
  -> objective evaluation
  -> story trigger evaluation and deduplication
  -> feedback/UI prepare
  -> atomic commit or rollback
  -> one progression revision
  -> typed results
  -> first visible feedback-frame acknowledgement
```

## Required invariant

```txt
An installed descriptor is not an executable capability.

Progression may change only through one admitted command that cites the current
session, reset generation, target revision and progression revision.

Objective, story and feedback state commit atomically and the first displayed
feedback frame cites the resulting progression revision.
```

## Dependencies

```txt
runtime session lifecycle authority
host capability gateway
runtime clock and step admission
render topology/context/surface authority
committed-frame observation
persistence continuity
DSK runtime consumption authority
deterministic replay validation
```
