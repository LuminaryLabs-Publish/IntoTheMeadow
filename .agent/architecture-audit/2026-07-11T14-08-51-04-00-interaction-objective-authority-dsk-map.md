# Interaction and Objective Authority DSK Map

## Summary

The repository already declares player, input, interaction, objective and story DSKs, but the implemented runtime does not consume their action services. The missing parent domain is a transaction boundary, not another content-definition layer.

## Plan ledger

**Goal:** connect canonical target definitions to typed commands, progression state, objective results, story transitions and committed observations without duplicating existing DSK responsibilities.

- [x] Map existing DSK declarations.
- [x] Map source-backed runtime consumers.
- [x] Identify the missing command and completion boundary.
- [x] Define owner updates and candidate kits.
- [ ] Implement after prerequisite lifecycle and host gates.

## Current DSK graph

```txt
into-the-meadow-game-dsk
  -> game manifest
  -> DSK registry snapshot
  -> game state root

meadow-player-dsk
  -> declared player state and actions

meadow-input-dsk
  -> declared action map and device bindings

meadow-interaction-dsk
  -> declared target registry, affordances and events

meadow-objective-dsk
  -> declared objective model, flow and completion ledger

meadow-story-dsk
  -> declared story state, beats and sequence runner

web-host-dsk
  -> RAF time-only tick

actual runtime
  -> frame and lastTick mutation only
```

## Missing parent domain

```txt
meadow-interaction-objective-authority-domain
```

## Candidate composition

```txt
interaction-command-kit
interaction-command-id-kit
interaction-admission-kit
canonical-interaction-target-index-kit
player-action-state-kit
path-progress-evaluator-kit
inspect-target-evaluator-kit
objective-definition-index-kit
objective-progress-ledger-kit
objective-completion-result-kit
story-beat-transition-kit
interaction-projection-kit
interaction-debug-observation-kit
interaction-command-journal-kit
interaction-objective-fixture-kit
browser-interaction-parity-smoke-kit
```

## Ownership rule

Reusable command admission, target resolution and objective-result contracts may later move into NexusEngine or ProtoKits. This repository continues to own:

```txt
arrival target definitions
arrival objective definitions
progress thresholds
story ordering
browser bindings
meadow-specific feedback and projection
```

## Required transaction

```txt
command
  -> lifecycle/session/epoch/sequence admission
  -> canonical scene target lookup
  -> action-specific evidence validation
  -> candidate player/inspection state
  -> objective predicate evaluation
  -> exactly-once completion receipts
  -> story transition candidate
  -> atomic state/journal commit
  -> diagnostic and render projection
  -> committed-frame acknowledgement
```

## Dependency order

Interaction authority depends on the earlier session, capability-gateway, step/clock and committed-frame contracts. Do not expose new public action APIs before those owners are exclusive and revisioned.
