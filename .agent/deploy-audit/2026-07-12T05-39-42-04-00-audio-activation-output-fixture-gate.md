# Deploy Audit: Audio Activation and Audible-Output Fixture Gate

**Timestamp:** `2026-07-12T05-39-42-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Current deployment proof

The current `npm run check` chain validates static files, DSK descriptors, render plans, renderer topology, deterministic scene output and headless-editor commands. It does not create a browser audio context or prove activation, playback, spatialization, suspension, recovery or disposal.

## Required DOM-free fixtures

```txt
fixture:audio-activation-state-machine
fixture:audio-policy-validation
fixture:audio-resource-generation
fixture:audio-stale-decode-rejection
fixture:audio-cue-admission-and-voice-budget
fixture:audio-listener-pose-validation
fixture:audio-mute-volume-roundtrip
fixture:audio-dispose-idempotence
```

## Required browser smoke

```txt
open the game with fresh storage and no audio activation
assert no AudioContext exists before trusted gesture
activate through the visible control
assert READY or explicit BLOCKED result
prove one ambient source and expected buses
move/update the listener and verify pose revision changes
trigger one spatial cue and verify source identity
mute, unmute and change bounded volume
hide/show the page and verify declared suspension policy
stop and restart without duplicate contexts or sources
dispose and verify zero live source/listener leases
```

## Required Pages smoke

Run the same activation, visibility, restart and cleanup sequence against the deployed GitHub Pages URL. Record browser family, autoplay result, audio state/revision, context generation, active-source count and cleanup result.

## CI boundary

Audio tests must not require a physical output device for deterministic state-machine and scheduling proof. Audible browser smoke may use a generated short test buffer and analyser/graph evidence, while manual listening remains supplementary rather than authoritative.

## Completion gate

Do not claim audio support because the DSK or an asset file exists. Deployment readiness requires trusted-gesture admission, typed blocked/failure behavior, resource-generation fencing, listener parity, exact cleanup and a deployed browser result.
