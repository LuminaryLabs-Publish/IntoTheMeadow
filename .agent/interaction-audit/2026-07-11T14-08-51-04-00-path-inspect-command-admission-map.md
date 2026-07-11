# Path and Inspect Command Admission Map

## Summary

No current ingress can submit a gameplay action. Browser RAF, browser editor and Node editor all reach raw tick/reset or observation surfaces instead of a canonical interaction authority.

## Current ingress map

```txt
browser RAF
  -> game.tick({ time, dt })

browser editor
  -> runtime.tick({ dt, time })
  -> runtime.reset()

Node editor
  -> runtime.tick({ dt, ticks })
  -> runtime.reset()

missing
  -> interaction.execute
  -> player.progressPath
  -> target.inspect
  -> objective.getProgress
```

## Required command envelope

```txt
InteractionCommand {
  commandId
  sessionId
  epoch
  sceneId
  sequence
  action: path-progress | inspect
  targetId
  evidence
  expectedObjectiveRevision
}
```

## Admission sequence

```txt
lifecycle admission
  -> session/epoch check
  -> monotonic sequence check
  -> active-scene check
  -> canonical target lookup
  -> requiredAction check
  -> evidence policy
  -> duplicate/stale classification
  -> candidate mutation
  -> objective evaluation
  -> typed result
```

## Required result classes

```txt
accepted-progress
accepted-inspection
accepted-objective-completion
duplicate-no-mutation
rejected-unknown-target
rejected-wrong-action
rejected-out-of-range
rejected-invalid-progress
rejected-stale-session
rejected-stale-epoch
rejected-sequence
failed-internal
```

## Adapter parity

Browser input, browser editor and Node editor must construct the same command shape and receive the same domain result. Transport-level `ok: true` must not conceal a rejected domain command.
