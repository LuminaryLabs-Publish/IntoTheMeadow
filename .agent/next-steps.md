# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T05-39-42-04-00`

## Goal

Turn the planned `meadow-audio-dsk` into one browser-safe, session-scoped audio authority without placing playback ownership inside the renderer or exposing mutable Web Audio objects through public/editor surfaces.

## Plan ledger

- [ ] Preserve all existing visual, render-plan and shader behavior.
- [ ] Complete Runtime Session Lifecycle Authority first.
- [ ] Complete trusted input/command admission needed for user-gesture evidence.
- [ ] Add a versioned audio policy and asset manifest.
- [ ] Add `AudioActivateCommand` and typed READY/BLOCKED/FAILED/STALE results.
- [ ] Create one AudioContext owner per runtime/audio generation.
- [ ] Stage decode and node-graph work before live commit.
- [ ] Add deterministic resource identity and stale-generation rejection.
- [ ] Add master, ambience, effects and UI buses.
- [ ] Add exact-once ambient-bed ownership.
- [ ] Add a spatial-cue registry and command admission policy.
- [ ] Add listener pose from committed camera/player observation.
- [ ] Add bounded overlap, cooldown and voice-budget policy.
- [ ] Add mute, master-volume and user preference state.
- [ ] Define pause, visibility, route transition, reset and device-change behavior.
- [ ] Add diagnostics and clone-safe editor observation.
- [ ] Add ordered stop/dispose with zero active leases.
- [ ] Add DOM-free state-machine, scheduling and cleanup fixtures.
- [ ] Add browser and Pages activation/suspend/resume/restart smoke gates.

## Existing owners to update first

```txt
meadow-audio-dsk
meadow-ecology-dsk
meadow-input-dsk
meadow-camera-dsk
meadow-player-dsk
meadow-performance-dsk
meadow-diagnostics-dsk
web-host-dsk
into-the-meadow-game-dsk
game snapshot/read model
browser shell
editor capability bridge
runtime session lifecycle authority
runtime clock and step authority
committed frame observation authority
static-pages-deploy-dsk
```

## Candidate coordinating kits

```txt
audio-session-id-kit
audio-session-generation-kit
audio-lifecycle-state-kit
audio-policy-kit
audio-asset-manifest-kit
audio-activation-command-kit
audio-activation-result-kit
user-gesture-audio-admission-kit
audio-context-owner-kit
audio-resource-load-plan-kit
audio-decode-result-kit
audio-resource-generation-kit
ambient-bed-kit
spatial-audio-cue-registry-kit
spatial-audio-play-command-kit
audio-listener-pose-kit
audio-frame-command-kit
audio-mix-plan-kit
audio-bus-state-kit
audio-volume-policy-kit
audio-mute-command-kit
audio-visibility-suspension-kit
audio-device-change-observation-kit
audio-stale-generation-rejection-kit
audio-dispose-plan-kit
audio-dispose-result-kit
audio-observation-kit
audio-journal-kit
audio-editor-capability-kit
audio-activation-fixture-kit
audio-spatial-listener-fixture-kit
audio-suspend-resume-fixture-kit
audio-restart-leak-fixture-kit
browser-audible-output-smoke-kit
```

## Required activation flow

```txt
trusted browser gesture
  -> gesture evidence
  -> AudioActivateCommand
  -> session/route/policy/revision admission
  -> create or resume context generation
  -> load/decode candidate resources
  -> build candidate buses and sources
  -> commit READY or return typed blocked/failure result
```

## Required frame flow

```txt
committed clock + scene + listener pose
  -> AudioFrameCommand
  -> ambience and cue eligibility
  -> cooldown, priority, overlap and voice budget
  -> immutable mix plan
  -> apply only to matching audio generation
  -> AudioFrameResult and observation
```

## Required lifecycle flow

```txt
pause/visibility/reset/transition/stop/dispose
  -> explicit policy decision
  -> reject new playback when required
  -> fence stale decode and cue callbacks
  -> stop/disconnect sources and nodes
  -> remove listener/device subscriptions
  -> release decoded resources
  -> close or suspend context
  -> typed terminal result
```

## Acceptance matrix

```txt
page load before gesture creates no AudioContext
trusted gesture produces READY or explicit BLOCKED/FAILED
second identical activation is idempotent
concurrent activation is coalesced or typed in-progress
ambient bed begins exactly once per generation
listener revision follows committed camera/player pose
invalid or stale listener pose is rejected
spatial cue cites source, scene and audio generation
voice overflow applies deterministic admission policy
mute/unmute roundtrip preserves prior bounded volume
hidden-tab policy matches the documented state transition
reset and restart create no duplicate sources or listeners
stale decode and cue callbacks cannot mutate replacement generation
dispose leaves zero active contexts, nodes, sources and event leases
editor and diagnostics report the same audio revision
visual rendering remains live while audio is blocked or failed
Pages smoke proves activation, suspension, resume and cleanup
```

## Ordered architecture queue

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Clock and Step Admission Authority
5. Source Provider Authority
6. Render Topology Identity Authority
6a. WebGL Context Recovery Authority
6b. Render Surface Resolution Authority
6c. Shader Precision Admission Authority
7. Committed Frame Observation Authority
7a. Fatal Runtime Failure Recovery Authority
7b. Adaptive Quality and Performance Budget Authority
7c. Grass Visibility and LOD Authority
7d. Audio Activation and Lifecycle Authority
8. Interaction Command and Objective Progression Authority
8a. Persistence Continuity Authority
9. DSK Runtime Consumption Authority
9a. Deterministic Replay Validation Authority
```

Do not create or resume Web Audio from the RAF, renderer or untrusted editor command. Activation must originate from admitted browser gesture evidence, and all later operations must cite the committed audio generation.
