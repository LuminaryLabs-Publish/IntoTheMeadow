# Interaction Audit: Audio Projection Command and Result Map

**Timestamp:** `2026-07-15T10:40:17-04:00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

Audio needs an explicit command/result path rather than direct reactions to mutable state or repeated snapshots. The command must bind the semantic event, session, policy, browser capability and expected audio generation.

## Plan ledger

**Goal:** make every cue exactly-once, revision-bound, lifecycle-aware and externally observable.

- [x] Define event, unlock, cue and retirement commands.
- [x] Define stale, duplicate and unsupported rejection paths.
- [x] Define visible/audible acknowledgement requirements.
- [ ] Implement later.

## Command map

```txt
AudioUnlockCommand
  -> AudioUnlockResult

SemanticAudioEventCommand
  -> CueDescriptorResolutionResult
  -> AudioCueAdmissionResult

AudioLifecycleCommand
  -> AudioLifecycleResult

AudioPreferenceCommand
  -> AudioPreferenceResult

AudioResourceRetirementCommand
  -> AudioResourceRetirementReceipt
```

## Admission fields

```txt
commandId
callerId
hostGeneration
sessionRevision
stateRevision
semanticEventId
semanticEventRevision
audioPolicyRevision
expectedAudioContextGeneration
expectedPreferenceRevision
expectedListenerPoseRevision
```

## Terminal classifications

```txt
accepted
substituted
skipped-muted
skipped-unlocked-required
rejected-stale
rejected-duplicate
rejected-retired
rejected-unsupported
failed-resource
```

## Required acknowledgements

```txt
FirstAudioUnlockedAck
FirstAmbienceStartedAck
FirstAudibleCueAck
FirstSilentLifecycleAck
FirstAudioVisualConvergenceAck
```

## Boundary

The map defines authority and evidence only. Content remains asset-neutral, gameplay remains browser-neutral and Web Audio calls remain provider-owned.