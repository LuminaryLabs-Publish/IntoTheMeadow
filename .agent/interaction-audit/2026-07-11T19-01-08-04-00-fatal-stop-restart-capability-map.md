# Fatal Stop, Restart and Capability Map

**Timestamp:** `2026-07-11T19-01-08-04-00`

## Current command paths

```txt
automatic frame
  -> RAF -> game.tick -> render

public raw game
  -> GameHost.game.tick
  -> GameHost.game.reset
  -> GameHost.game.rebuildRenderPlan

editor capabilities
  -> runtime.tick
  -> runtime.reset
  -> scene.getRenderPlan
  -> renderer.getSnapshot
  -> renderer.capture

host lifecycle
  -> stop sets stopped = true
  -> start sets stopped = false and requests RAF
```

## Fatal-state behavior today

After `showFatal()`:

```txt
automatic next-frame scheduling stops
GameHost remains published
NexusEditorEnvironment remains published
window error listeners remain installed
raw game mutations remain reachable
canvas capture remains reachable
in-place start remains reachable through the returned host controller
no typed rejection explains the failure state
```

## Required capability phases

```txt
starting
ready
quarantined
recovering
disposing
disposed
failed-terminal
```

Capability policy:

```txt
starting
  reads limited to startup observation

ready
  admitted public reads and commands

quarantined/recovering
  bounded failure/status reads only
  tick/reset/rebuild/capture rejected

failed-terminal/disposed
  immutable terminal observation only
```

## Required command result

```txt
CapabilityResult
  commandId
  capabilityId
  runtimeSessionId
  lifecyclePhase
  failureId
  status
  reason
  stateRevisionBefore
  stateRevisionAfter
  committedFrameId
```

## Restart admission

```txt
start after normal stop
  -> may resume only if session and renderer remain healthy

start after fatal terminal failure
  -> reject in-place resume
  -> require ColdRestartCommand

cold restart
  -> dispose predecessor leases
  -> allocate new identities
  -> publish capabilities only after first committed frame
```

## Required proof

```txt
fatal state removes raw game authority from public surface
editor mutation and capture return typed rejection
normal stop and fatal quarantine are distinguishable
start cannot bypass failure policy
late predecessor commands are rejected by session generation
new session capabilities cannot reference predecessor resources
```

No public API behavior changed in this documentation pass.