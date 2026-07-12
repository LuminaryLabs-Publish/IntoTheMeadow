# Audio Audit: Context, Resource, Listener and Lifecycle Contract

**Timestamp:** `2026-07-12T05-39-42-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## State machine

```txt
UNINITIALIZED
  -> ACTIVATING
  -> READY
  -> SUSPENDED
  -> READY
  -> STOPPING
  -> DISPOSED

ACTIVATING
  -> BLOCKED
  -> retry -> ACTIVATING

any non-terminal state
  -> FAILED
  -> explicit recovery or disposal
```

## Resource generation

An audio resource generation owns:

```txt
AudioContext lease
master, ambience, effects and UI buses
decoded buffer references
ambient loop source and gain envelope
spatial source/node leases
listener update subscription
visibility and device-change listener leases
scheduled cue handles
bounded observation and fault journal
```

Resources must be staged away from live output and committed as one generation. A predecessor generation remains authoritative until the candidate is ready or the operation returns a typed failure.

## Listener contract

```txt
AudioListenerPose {
  poseRevision
  sceneRevision
  position
  forward
  up
  velocityPolicy
}
```

The listener cannot read mutable renderer camera objects directly. It consumes a clone-safe committed observation and rejects non-finite or stale pose revisions.

## Scheduling contract

```txt
SpatialAudioPlayCommand {
  commandId
  audioGeneration
  sceneRevision
  sourceId
  cueId
  position
  gain
  priority
  requestedStartClockRevision
}
```

Cue admission applies source validity, policy, cooldown, overlap, voice budget, scene revision and generation checks before scheduling.

## Suspension and visibility

The product must choose and document one background policy:

```txt
suspend all audio
reduce ambience and reject new cues
continue explicitly permitted audio
```

Browser visibility changes, focus changes and OS/device interruptions must produce typed transitions rather than hidden Web Audio side effects.

## Disposal order

```txt
reject new commands
fence callbacks and async decode results
stop and disconnect scheduled/active sources
remove listener and device subscriptions
disconnect buses and processors
release decoded-resource ownership
close or terminally suspend AudioContext
publish AudioDisposeResult
clear public read model without exposing mutable objects
```

## Required metrics

```txt
audio state and revision
context state and generation
resource generation
active source count
scheduled source count
listener pose revision
mix policy revision
master/mute state
blocked/failure reason
last activation/dispose result
bounded fault count
```
