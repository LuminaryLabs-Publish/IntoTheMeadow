# Gameplay Audit: Declared Capability Runtime Loop

## Current loop

```txt
boot
  -> descriptor catalog reports player, input, interaction, story, objective, audio, UI and save domains
  -> install returns a valid descriptor snapshot
  -> initial state contains fixed player and progression records
  -> each tick increments frame and stores time/dt
  -> no input command changes player state
  -> no interaction advances story or objectives
  -> no audio, UI or save service is invoked through a DSK API
```

## Finding

The catalog accurately records intended domain boundaries, but gameplay capability is not established by descriptor presence. Current gameplay truth is the immutable state constructor plus frame advancement.

## Required command admission

Every gameplay command should declare its required capability tokens.

```txt
GameplayCommand
  -> resolve accepted DskCompositionRevision
  -> verify required service tokens are active
  -> reject unavailable or planned-only capabilities
  -> execute through the admitted service owner
  -> publish typed command result and state revision
```

## Required proof rows

```txt
movement requires player + input + terrain-contact
inspection requires player + input + interaction
story advance requires interaction + story + objective
save requires save-model + persistence-adapter + migration
render feedback requires UI or render projection capability
```

## Boundary

This audit does not claim that the declared gameplay kits are implemented or that current fixed state is defective. It records the missing admission link between intended capability descriptors and executable gameplay services.