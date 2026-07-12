# Architecture Audit: Audio Activation and Lifecycle DSK Map

**Timestamp:** `2026-07-12T05-39-42-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Current ownership

```txt
meadow-audio-dsk
  declares ambient-bed, spatial-audio-cues, audio-state, audio-events and audio-validation
  status: planned

web-host-dsk
  owns browser startup and RAF
  creates no audio owner

meadow-input-dsk
  declares device bindings and input context
  supplies no audio activation command

meadow-camera-dsk / meadow-player-dsk
  declare listener-relevant pose data
  supply no committed listener observation

meadow-ecology-dsk
  declares ambience triggers
  has no audio-event consumer

meadow-diagnostics-dsk
  exposes no audio health, state or revision

editor bridge
  exposes runtime, scene, renderer, browser and error capabilities
  exposes no audio capability
```

## Ownership gap

The DSK declaration does not identify who owns browser autoplay admission, `AudioContext`, decode work, audio nodes, decoded buffers, buses, scheduled sources, listener updates, visibility suspension, retry or disposal. Without one owner, later audio code would be likely to split authority between DOM event handlers, gameplay events and renderer-frame code.

## Required parent domain

```txt
meadow-audio-activation-lifecycle-authority-domain
```

## Domain composition

```txt
activation
  audio-policy-kit
  audio-activation-command-kit
  user-gesture-audio-admission-kit
  audio-activation-result-kit

session and resources
  audio-session-id-kit
  audio-session-generation-kit
  audio-lifecycle-state-kit
  audio-context-owner-kit
  audio-asset-manifest-kit
  audio-resource-load-plan-kit
  audio-decode-result-kit
  audio-resource-generation-kit
  audio-stale-generation-rejection-kit

playback and mix
  ambient-bed-kit
  spatial-audio-cue-registry-kit
  spatial-audio-play-command-kit
  audio-listener-pose-kit
  audio-frame-command-kit
  audio-mix-plan-kit
  audio-bus-state-kit
  audio-volume-policy-kit
  audio-mute-command-kit

lifecycle and observation
  audio-visibility-suspension-kit
  audio-device-change-observation-kit
  audio-dispose-plan-kit
  audio-dispose-result-kit
  audio-observation-kit
  audio-journal-kit
  audio-editor-capability-kit

proof
  audio-activation-fixture-kit
  audio-spatial-listener-fixture-kit
  audio-suspend-resume-fixture-kit
  audio-restart-leak-fixture-kit
  browser-audible-output-smoke-kit
```

## Required dependencies

```txt
runtime session ID and generation
runtime lifecycle phase
clock and step revision
route/scene revision
camera or player listener pose revision
input command identity and trusted gesture evidence
visibility state
quality/performance policy
committed state and diagnostic observation
```

## Command model

```txt
AudioActivateCommand {
  commandId
  runtimeSessionId
  expectedRuntimeGeneration
  expectedAudioRevision
  gestureEvidence
  policyId
  requestedMode
}

AudioActivationResult {
  status: READY | BLOCKED | FAILED | STALE | DISPOSED
  audioSessionId
  audioGeneration
  audioRevision
  contextState
  resourceGeneration
  failures[]
}

AudioFrameCommand {
  runtimeSessionId
  audioGeneration
  clockRevision
  sceneRevision
  listenerPoseRevision
  cueEvents[]
  mixPolicyRevision
}
```

## Invariants

```txt
one runtime session owns at most one active audio generation
no AudioContext is created before admitted user gesture
one activation command produces one stable typed result
ambient playback begins at most once per committed audio generation
all scheduled cues cite scene, source and audio generation
listener updates use committed pose observations
stale decode, resume, device and cue results cannot commit
mute and volume are state, not write-only DOM effects
stop/dispose retires every source, node, buffer lease and event listener
observations and editor readback never expose mutable Web Audio objects
journals and retained diagnostics are bounded
```

## Boundary with rendering

Audio must not be owned by the WebGL renderer. The renderer and audio authority may consume the same committed clock, camera and scene observations, but each publishes its own typed result. A visual frame cannot be treated as audible-output proof, and audio failure must not terminate rendering.

## Implementation order

```txt
1. runtime session and lifecycle authority
2. trusted input/gesture command admission
3. audio policy and asset manifest
4. context and resource-generation transaction
5. ambient bed and buses
6. listener pose and spatial cue commands
7. visibility, mute, volume and device policies
8. diagnostics/editor observation
9. exact cleanup and restart proof
10. browser and Pages audible-output smoke
```
