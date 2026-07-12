# Gameplay Audit: Declared Ambience, Silent Runtime Loop

**Timestamp:** `2026-07-12T05-39-42-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Current loop

```txt
boot scene
  -> create deterministic visual meadow
  -> start visual RAF
  -> never activate audio

runtime
  -> advance frame and render time
  -> render wind, foliage, atmosphere and scene motion
  -> emit no ambient-bed state
  -> emit no ecology-to-audio event
  -> emit no spatial cue
  -> expose no mute, volume or audio status
```

## Gameplay consequence

The product declares ecology ambience and audio services but cannot turn those declarations into player feedback. Wind, tree movement, distant atmosphere, objective beats and interaction targets can be represented visually while the runtime has no authoritative sound state, event policy or playback result.

## Required gameplay flow

```txt
scene/route commit
  -> select audio scene policy
  -> activate or retain the admitted ambient bed

committed simulation/event batch
  -> derive eligible audio cues
  -> apply cooldown, priority and overlap policy
  -> produce typed cue commands

camera/player observation
  -> update listener pose
  -> spatialize admitted cues

pause, reset, scene transition or stop
  -> apply explicit fade, suspend, retire or replace policy
```

## Required policies

```txt
ambient bed identity and loop boundaries
ecology cue source IDs and deterministic eligibility
objective/story cue priority
one-shot overlap and voice limits
pause/menu/background-tab behavior
reset and scene-transition fades
mute and volume persistence
failure behavior when assets or output devices are unavailable
```

## Completion boundary

The `meadow-audio-dsk` declaration is not gameplay proof. Completion requires an admitted user gesture, an active audio generation, exact-once ambient playback, event-to-cue results, listener updates, lifecycle cleanup and observable browser evidence.
