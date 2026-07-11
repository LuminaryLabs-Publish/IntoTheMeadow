# Runtime Tick Command Admission Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T08-31-33-04-00`

## Current interaction surfaces

| Source | Entry point | Input contract | Direct mutation | Typed domain result |
|---|---|---|---|---|
| Browser RAF | `frame(now)` | implicit timestamp | yes | no |
| Browser editor | `NexusEditorEnvironment.invoke("runtime.tick")` | arbitrary `{ dt, time }` | yes | capability wrapper only |
| Node editor | `runtime.tick` capability | arbitrary `{ dt, ticks }` | yes, repeated | environment wrapper only |
| Browser editor reset | `runtime.reset` | none | yes | raw state |
| Node editor reset | `runtime.reset` | none | yes plus local time/enhancer mutation | raw state wrapper |

The outer editor protocols report whether capability execution threw. They do not report whether a step request was semantically accepted, rejected, stale, duplicate or partially applied.

## Required admission sequence

```txt
adapter receives intent
  -> create immutable runtime-step command
  -> attach source, sessionId, clockEpoch and expectedFrame
  -> validate command schema
  -> validate finite delta and target time
  -> validate bounded integer step count
  -> validate source policy
  -> validate session and frame fence
  -> apply steps atomically or reject
  -> publish typed result
  -> append bounded observation
```

## Required reason catalog

```txt
ok
invalid-command
unknown-source
session-mismatch
clock-epoch-mismatch
stale-frame
future-frame
non-finite-dt
negative-dt
dt-out-of-range
non-finite-time
time-regression
non-integer-step-count
step-budget-exceeded
duplicate-command
runtime-stopped
runtime-disposed
```

## Adapter rules

### Browser RAF

```txt
convert RAF timestamp through clock policy
never expose raw wall time as simulation authority
submit one step per admitted callback
reject stale callback generations
```

### Browser editor

```txt
never call GameHost.game.tick directly
require explicit source and expected state frame
use session policy to decide whether stepping is allowed while RAF is running
return domain result inside capability response
```

### Node editor

```txt
validate before entering a loop
cap work synchronously
use the same delta and time policy as browser stepping
return accepted step count and committed time
```

## Result observation

```txt
GameHost.getStepClock()
GameHost.getStepJournal()
NexusEditorEnvironment runtime.getStepClock
NexusEditorEnvironment runtime.getStepJournal
Node headless equivalents
```

The capability-level `ok: true` flag must mean only that the adapter executed. The nested step result must carry gameplay admission truth.