# Audio Audit: Browser Audio Event and Lifecycle Contract

**Timestamp:** `2026-07-15T10:40:17-04:00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The declared audio DSK needs one browser-provider contract that owns capability discovery, gesture unlock, context generation, ambience, spatial cues, preferences, lifecycle settlement and retirement.

## Plan ledger

**Goal:** ensure audible work is accepted once, silenced deterministically and retired without leaked sources or stale cues.

- [x] Define context and source ownership.
- [x] Define event deduplication and voice budgeting.
- [x] Define pause, visibility, route and failure policy.
- [x] Define proof receipts.
- [ ] Implement and execute later.

## Lifecycle

```txt
unsupported
  -> disabled result

supported + locked
  -> await accepted user gesture
  -> unlock attempt
  -> ready or failed

ready + active session
  -> start/adopt ambience
  -> accept semantic cues
  -> update listener and spatial sources

paused or hidden
  -> settle buses to silence or suspend context by policy
  -> reject disallowed cues

resumed and visible
  -> require accepted session and policy revisions
  -> restore ambience and listener state

route exit, host replacement or fatal stop
  -> reject new events
  -> stop and disconnect sources
  -> close or retire context
  -> publish receipts
```

## Required resource identities

```txt
AudioContextGeneration
AudioBusRevision
AudioSourceLeaseId
AmbienceRevision
CueVoiceId
ListenerPoseRevision
SpatialSourceRevision
AudioPreferenceRevision
AudioPolicyRevision
```

## Deduplication key

```txt
sessionRevision
semanticEventId
semanticEventRevision
cueDescriptorRevision
```

## Voice policy

```txt
UI cues: highest short-lived priority
story cues: protected while active
world interaction cues: bounded spatial pool
ambient one-shots: low priority and distance limited
ambient loops: one adopted generation per zone/category
```

## Retirement receipts

```txt
sourceStopped
sourceDisconnected
gainDisconnected
bufferReleased
listenerRetired
contextSuspended
contextClosed
lateCueRejected
```

## Proof matrix

```txt
unsupported browser
locked before gesture
successful unlock
failed unlock
ambience start
semantic cue once
repeated snapshot deduplication
mute and volume change
pause and resume
visibility hide and restore
route exit
fatal renderer stop
host replacement
source/build/Pages parity
```

## Boundary

No browser audio graph was created or tested during this documentation run.