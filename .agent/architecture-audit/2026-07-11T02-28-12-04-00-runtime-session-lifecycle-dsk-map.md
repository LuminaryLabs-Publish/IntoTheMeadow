# Runtime Session Lifecycle DSK Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-11T02-28-12-04-00`

## Current ownership map

```txt
boot-game.js
  starts asynchronous construction
  owns no retained controller

web-host.js
  constructs resources
  owns stopped Boolean
  closes over lastPlan and lastRender
  schedules untracked RAF callbacks

game
  owns current immutable state pointer and source plan

renderer
  owns WebGL context, program, buffers, mesh cache, and renderer snapshot

plan enhancer
  owns enhanced-plan cache and counters

GameHost global
  exposes game and independently sourced observations

browser editor bridge
  owns capabilities, error rows, two global listeners, and one global exposure
```

No object owns the complete session.

## Current DSK boundary failure

```txt
lifecycle coordination
  is spread across boot, web host, renderer, GameHost, and editor bridge

resource ownership
  exists as isolated dispose primitives

frame ownership
  is represented by a Boolean rather than an exact RAF lease

global ownership
  is represented by direct assignment rather than a lease

failure ownership
  stops scheduling but does not perform terminal cleanup
```

## Required parent domain

```txt
runtime-session-authority-domain
```

The domain owns coordination only:

```txt
sessionId
runId
lifecycle state
command sequence
exact active rafId
frame admission generation
resource ledger
cleanup stack
global lease ledger
listener lease ledger
last lifecycle result
bounded lifecycle journal
terminal failure record
```

It must not permanently own meadow generation, terrain descriptors, mesh data, WebGL shader behavior, or gameplay content.

## Candidate kits

```txt
runtime-session-identity-kit
runtime-lifecycle-state-kit
runtime-lifecycle-command-kit
runtime-lifecycle-result-kit
raf-ownership-kit
run-generation-fence-kit
runtime-clock-admission-kit
resource-ownership-ledger-kit
cleanup-stack-kit
global-exposure-lease-kit
listener-lease-kit
startup-rollback-kit
fatal-transition-kit
runtime-disposal-kit
runtime-lifecycle-journal-kit
GameHost-lifecycle-observation-kit
headless-editor-lifecycle-capability-kit
runtime-lifecycle-fixture-adapter-kit
```

## Provider contracts

```txt
game provider:
  tick(input)
  reset()
  release()

renderer provider:
  render(plan)
  getSnapshot()
  dispose()

enhancer provider:
  enhance(plan)
  getSnapshot()
  invalidate()
  release()

global target provider:
  acquire(name, value, ownerToken)
  release(lease)

event target provider:
  add(type, listener, ownerToken)
  remove(lease)

frame scheduler provider:
  request(callback)
  cancel(rafId)
```

## Session construction transaction

```txt
create session identity
  -> import external source
  -> create game
  -> create renderer
  -> create enhancer
  -> acquire GameHost lease
  -> install editor bridge and listener leases
  -> request first RAF and retain id
  -> publish running result
```

Every successful step registers inverse cleanup immediately.

## Callback admission

Each requested callback captures:

```txt
sessionId
runId
rafId
frameSequence
```

On delivery, the session admits it only when all values match the current owner snapshot and lifecycle state is `running`.

## Stop transaction

```txt
validate state
  -> mark stopping
  -> cancel exact active rafId
  -> clear active raf ownership
  -> increment or fence run generation
  -> mark stopped
  -> publish typed result
```

## Restart transaction

Restart is not public `stop(); start();`.

```txt
validate state
  -> cancel exact active RAF
  -> increment runId
  -> clear run-local counters
  -> request exactly one new RAF
  -> mark running
  -> publish one result
```

## Fatal transaction

```txt
mark failing
  -> cancel exact RAF
  -> reject new commands
  -> run cleanup stack in reverse order
  -> retain detached failure row
  -> project fatal DOM
  -> mark failed
```

## Dispose transaction

```txt
mark disposing
  -> cancel exact RAF
  -> dispose editor/listeners
  -> release editor global lease
  -> release GameHost lease
  -> invalidate enhancer
  -> dispose renderer
  -> release game/source/module references
  -> mark disposed
  -> publish terminal result
```

## Boundary with committed-frame authority

Lifecycle authority answers:

```txt
may this callback or command run?
which session and run own it?
what resources and leases remain live?
```

Committed-frame authority answers:

```txt
did this admitted frame commit atomically?
```

The frame domain must be a child of the active runtime session.
