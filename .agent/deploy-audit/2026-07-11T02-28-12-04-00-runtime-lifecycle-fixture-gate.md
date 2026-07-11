# Runtime Lifecycle Fixture Gate

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-11T02-28-12-04-00`

## Current validation coverage

`npm run check` currently covers:

```txt
static repository structure
DSK registry
render-plan behavior
renderer v2 behavior
deterministic scene reachability
headless editor environment
headless editor commands
headless editor loop
```

It does not exercise browser lifecycle ownership.

## Required new scripts

```txt
node tests/runtime-controller-reachability-smoke.mjs
node tests/runtime-single-raf-smoke.mjs
node tests/runtime-stop-cancels-pending-raf-smoke.mjs
node tests/runtime-stop-start-race-smoke.mjs
node tests/runtime-restart-generation-smoke.mjs
node tests/runtime-global-lease-restore-smoke.mjs
node tests/runtime-first-frame-rollback-smoke.mjs
node tests/runtime-fatal-disposal-smoke.mjs
node tests/runtime-dispose-idempotency-smoke.mjs
node tests/runtime-listener-release-smoke.mjs
node tests/runtime-render-after-dispose-smoke.mjs
```

## Fake RAF requirements

The scheduler must expose:

```txt
request(callback) -> id
cancel(id)
deliver(id, now)
deliverAll(now)
pendingIds()
requestCount
cancelCount
```

It must allow the exact race:

```txt
queue A
stop
start queues B
deliver A
deliver B
```

Expected result:

```txt
A rejected as stale or cancelled
B admitted
one successor pending
one game tick
one render
```

## Global lease fixture

Set prior values for:

```txt
GameHost
NexusEditorEnvironment
```

Prove:

```txt
session acquisition records prior values
normal disposal restores prior values
newer external replacement is not clobbered
lost ownership is journaled
double release is no_op
```

## Rollback fixture

Inject failure after every acquisition phase and assert:

```txt
zero pending RAFs
zero active listeners
renderer disposed when constructed
editor disposed when installed
globals restored or safely left to newer owners
cleanup order is reverse acquisition order
one detached terminal result exists
```

## Fatal first-frame fixture

Inject failures in:

```txt
game.tick
raw-plan derivation
plan enhancement
contract validation
mesh build
buffer creation
draw
HUD publication
```

Fatal must release the whole session, not leave a restartable partial host.

## Disposal fixture

Assert:

```txt
dispose while running cancels RAF
dispose while stopped works
dispose twice is no_op
start/restart/render after dispose reject
renderer dispose runs once
listeners remove once
globals release once
journal remains readable and JSON-safe
```

## CI gate

Add lifecycle scripts to `npm run check` before claiming:

```txt
safe stop/start
safe restart
safe fatal handling
safe route teardown
safe editor ownership
one active RAF
```

Browser visual smoke remains useful but is not sufficient evidence for these invariants.
