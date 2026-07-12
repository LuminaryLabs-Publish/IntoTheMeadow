# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T05-39-42-04-00`

## Selection state

```txt
10 accessible Publish repositories observed
TheCavalryOfRome excluded
9 eligible repositories centrally tracked with root .agent state
IntoTheMeadow selected from the oldest central ledger timestamp
a newer repo-local shader-precision audit was discovered and preserved
only IntoTheMeadow changed in the Publish organization
```

## Current audio activation and lifecycle gaps

### Declaration is not implementation

```txt
meadow-audio-dsk: present
services: ambient-bed, spatial-audio-cues, audio-state, audio-events, audio-validation
required-v0.1: no
runtime owner: absent
runtime consumption receipt: absent
```

### Activation authority is absent

```txt
trusted user-gesture evidence: absent
AudioActivateCommand: absent
activation revision: absent
READY/BLOCKED/FAILED result: absent
idempotent retry policy: absent
concurrent activation policy: absent
```

### Context and resource ownership are absent

```txt
AudioContext owner: absent
audio session ID/generation: absent
audio asset manifest: absent
codec/fallback policy: absent
decode plan/result: absent
resource generation: absent
stale decode rejection: absent
```

### Playback and mix are absent

```txt
master/ambience/effects/UI buses: absent
ambient bed: absent
spatial cue registry: absent
cue command/result: absent
cooldown/overlap/priority policy: absent
voice budget: absent
mix-plan revision: absent
```

### Listener authority is absent

```txt
committed listener pose: absent
camera/player pose revision: absent
scene-to-audio frame correlation: absent
stale listener rejection: absent
audio-frame result: absent
```

### Lifecycle policy is absent

```txt
visibility suspension policy: absent
pause/resume audio policy: absent
reset and route-transition policy: absent
device-change observation: absent
ordered audio disposal: absent
restart duplicate-source prevention: absent
```

### Controls and observability are absent

```txt
visible activation control: absent
mute control/state: absent
bounded volume policy/state: absent
audio snapshot fields: absent
audio diagnostics: absent
editor audio capabilities: absent
bounded audio fault journal: absent
```

### Validation is absent

```txt
audio state-machine fixture: absent
activation/autoplay fixture: absent
resource generation fixture: absent
spatial listener fixture: absent
voice-budget fixture: absent
suspend/resume fixture: absent
restart leak fixture: absent
browser audible-output smoke: absent
Pages audio smoke: absent
```

## Required audio fixtures

```txt
fixture:audio-activation-state-machine
fixture:audio-policy-validation
fixture:audio-resource-generation
fixture:audio-stale-decode-rejection
fixture:audio-exact-once-ambient
fixture:audio-spatial-listener
fixture:audio-cue-voice-budget
fixture:audio-mute-volume-roundtrip
fixture:audio-suspend-resume
fixture:audio-dispose-idempotence
fixture:audio-restart-no-duplicates
smoke:browser-audible-output
smoke:pages-audio-lifecycle
```

## Retained shader and rendering gaps

```txt
shader precision capability admission remains unimplemented
original/normalized shader source fingerprints remain absent
compile/link/program generation receipts remain absent
WebGL context recovery remains non-transactional
DPR, surface revision and committed visible-frame identity remain incomplete
grass camera-distance/frustum LOD remains unimplemented
adaptive quality transaction remains unimplemented
```

## Retained interaction and progression gaps

```txt
movement and inspect commands absent
path progress and objective rules unreachable
objective/story atomic commit absent
browser/editor progression parity absent
```

## Retained runtime, persistence and replay gaps

```txt
RAF absolute time and fixed dt disagree
raw GameHost exposes game authority
fatal startup/frame recovery remains non-transactional
save schema, migration and atomic hydration absent
independent deterministic replay proof absent
first-divergence and visible-frame fingerprints absent
```

## Retained DSK truth gaps

```txt
declaration status is not runtime consumption proof
local implementations are not registry-bound
runtime consumers bypass registry lookup
reverse disposal is not registry-owned
```

## Completion boundary

Do not treat `meadow-audio-dsk`, future asset filenames or a created `AudioContext` as complete audio support. Completion requires admitted user gesture, typed blocked/failure behavior, versioned resources, exact-once playback, committed listener parity, bounded scheduling, lifecycle cleanup, diagnostics and deployed browser proof.
