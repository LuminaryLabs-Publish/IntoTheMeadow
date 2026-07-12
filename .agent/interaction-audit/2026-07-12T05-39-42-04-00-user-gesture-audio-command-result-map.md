# Interaction Audit: User-Gesture Audio Command and Result Map

**Timestamp:** `2026-07-12T05-39-42-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Current state

The page contains a canvas, hidden diagnostics HUD and loading message. It exposes no Start Audio, Play, Enter, mute or volume interaction. Boot starts automatically, and no trusted user event is converted into an audio activation command.

## Required activation path

```txt
trusted pointer/key/touch gesture
  -> normalize gesture evidence
  -> create AudioActivateCommand
  -> validate runtime session and current audio phase
  -> create/resume context and stage resources
  -> return READY, BLOCKED, FAILED, STALE or DISPOSED
  -> project status to UI, diagnostics and editor readback
```

## Command admission rules

```txt
untrusted synthetic event: reject
wrong runtime generation: stale
already ready, same policy: idempotent success
activation in progress: coalesce or return in-progress result
blocked browser policy: preserve retryable blocked state
missing resource: typed partial/failed result
stopped/disposed session: reject
```

## Required interaction commands

```txt
AudioActivateCommand
AudioRetryCommand
AudioMuteCommand
AudioSetMasterVolumeCommand
AudioSuspendCommand
AudioResumeCommand
AudioStopCommand
```

Every command requires command identity, expected session/audio revision and a typed result. UI handlers must not retain direct `AudioContext`, node or buffer references.

## Accessibility and control

- activation control must be keyboard and pointer reachable;
- silent and blocked states need visible status, not console-only failure;
- mute state must remain discoverable;
- volume must have bounded normalization;
- reduced-sensory or user preference policy must be explicit;
- editor capability calls may observe or request policy changes but cannot forge trusted browser gesture evidence.
