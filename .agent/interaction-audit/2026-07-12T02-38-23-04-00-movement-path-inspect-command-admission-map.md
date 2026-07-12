# Interaction Audit: Movement, Path and Inspect Command Admission

**Timestamp:** `2026-07-12T02-38-23-04-00`

## Missing public action surface

```txt
GameHost
  -> state/snapshot/diagnostics/render reads
  -> raw game owner
  -> no admitted action API

NexusEditorEnvironment
  -> runtime.tick
  -> runtime.reset
  -> render reads/capture
  -> no move/path/inspect actions

browser host
  -> no keyboard/pointer/touch gameplay listeners
```

## Required command map

```txt
move
  payload: local input vector or desired displacement
  admission: finite, bounded, active session/scene, monotonic sequence
  authority: movement + terrain/corridor owners
  result: accepted position and path evidence

inspect
  payload: targetId
  admission: registered target, scene match, required action, spatial policy
  authority: interaction target registry
  result: inspection evidence
```

## Required rejection statuses

```txt
invalid-schema
non-finite
out-of-bounds
unknown-target
wrong-scene
action-not-supported
out-of-range
stale-session
stale-scene
stale-epoch
revision-conflict
duplicate
```

## Adapter rule

Browser input, public host, browser editor and Node headless execution may translate device/tool input into commands, but none may supply authoritative path progress, objective completion or story transitions.

## Observation rule

Every command returns a typed result. Accepted results expose committed revision and event bundle. Rejected results expose reasons and zero mutation. Duplicate results reproduce the original receipt.
