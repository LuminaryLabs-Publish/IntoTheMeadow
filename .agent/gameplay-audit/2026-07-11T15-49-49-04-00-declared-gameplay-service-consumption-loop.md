# Declared Gameplay Service Consumption Loop

**Timestamp:** `2026-07-11T15-49-49-04-00`

## Summary

The registry declares player, input, interaction, story and objective services, but the active game loop consumes none of them. This is the clearest product-level example of why descriptor existence cannot be treated as operational DSK status.

## Declared gameplay services

```txt
meadow-player-dsk
  player-state
  movement-profile
  terrain-contact
  player-actions
  player-validation

meadow-input-dsk
  action-map
  device-bindings
  input-context
  input-normalization
  input-validation

meadow-interaction-dsk
  interactable-registry
  affordance-rules
  inspect-state
  interaction-events
  interaction-validation

meadow-objective-dsk
  objective-model
  objective-flow
  completion-ledger
  feedback-surface
  objective-validation

meadow-story-dsk
  story-state
  story-beats
  dialogue-text
  sequence-runner
  story-validation
```

## Actual gameplay loop

```txt
browser RAF
  -> game.tick({ time, dt })
  -> advanceGameState()
  -> frame += 1
  -> lastTick updated
  -> player state unchanged
  -> path progress unchanged
  -> inspection state absent
  -> objectives unchanged
  -> story unchanged
```

## Registry result

```txt
all five DSK descriptors exist
all five have five declared services
all five descriptor validations pass
none has an implementation binding in the registry
none is instantiated by installDsks()
none produces a consumer receipt
```

## False status risk

A future observer could interpret the descriptor snapshot as evidence that gameplay services are part of the active composition. The source instead proves these are declarations and authored data only.

Required classification:

```txt
meadow-player-dsk: declared-only
meadow-input-dsk: declared-only
meadow-interaction-dsk: declared-only
meadow-objective-dsk: declared-only
meadow-story-dsk: declared-only
```

This classification should change only when each DSK has:

```txt
implementation binding
admitted dependencies
active instance
service registration
expected consumer receipt
behavioral fixture
lifecycle retirement proof
```

## Required gameplay consumption path

```txt
input adapter consumes action-map service
  -> game command authority consumes player-actions service
  -> interaction authority consumes target and affordance services
  -> objective authority consumes objective-flow and completion-ledger services
  -> story authority consumes sequence-runner service
  -> diagnostics and committed frame acknowledge one progression revision
```

## Required proof

```txt
browser input and editor commands resolve the same capabilities
path-progress command consumes player and objective services
inspect command consumes interaction and objective services
completion consumes story service
consumption receipts cite one registry revision
no declared-only service is reported active
reset retires gameplay instances and rejects stale handles
```

## Relationship to the interaction audit

The interaction/objective authority remains the behavioral gate. The DSK consumption authority is the composition-truth gate that proves those behaviors came from the registered providers rather than direct or hidden imports.

## Release rule

Do not describe player, input, interaction, objective or story DSKs as active until the authored path and inspection loop executes through registered services and produces consumption receipts plus committed-frame proof.