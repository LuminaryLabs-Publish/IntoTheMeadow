# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T10-50-14-04-00`

## Selection state

```txt
10 accessible LuminaryLabs-Publish repositories observed
TheCavalryOfRome excluded by rule
9 eligible repositories centrally tracked with root .agent state
IntoTheMeadow selected as oldest eligible central-ledger entry
only IntoTheMeadow changed in the Publish organization
```

## Host capability gateway gaps

### Raw game authority is public

`GameHost.game` exposes the complete game object, including callable `tick()`, `reset()` and `rebuildRenderPlan()` methods.

### Capability registration is bypassable

```txt
NexusEditorEnvironment.invoke -> capability callback -> GameHost.game
page script -> GameHost.game directly
```

The second path bypasses capability lookup, argument isolation, error capture and any future admission policy.

### No session or lifecycle fence

Public commands do not carry:

```txt
host lease ID
session ID
run generation
clock epoch
expected state frame
expected render commit
```

A retained old reference cannot be retired safely after restart or disposal.

### Transport success conceals domain status

The editor reports `completed` when a callback does not throw. It does not distinguish:

```txt
accepted
rejected
duplicate
stale
unavailable
accepted-pending-render
accepted-rendered
```

### No command identity or journal

Missing:

```txt
command ID
capability sequence
domain result sequence
duplicate handling
bounded command journal
bounded result journal
state commit identity
render commit identity
```

### Public read model is not authoritative

State, snapshots, plans and renderer observations are returned without one shared:

```txt
observation revision
session lease
state fingerprint
source revision
topology lineage
render commit ID
```

### Host controller ownership is discarded

`startWebHost()` returns game, renderer, enhancer, bridge, stop and start services. `boot-game.js` does not retain that controller. Stop, fatal rollback, restart and disposal therefore lack one public revocation owner.

## Required capability fixture gaps

```txt
GameHost property allowlist
raw authority absence
session-fenced command admission
unknown capability result
stale and duplicate handling
old lease revocation
clone-safe observation isolation
bounded journal behavior
browser/Node schema parity
accepted command to render-commit correlation
```

## Retained runtime step and clock gaps

```txt
browser RAF, browser editor and Node editor share raw game.tick
finite delta validation absent
integer step-count validation absent
maximum work budget absent
monotonic simulation clock absent
reset epoch absent
step result and journal absent
```

The host gateway must become exclusive before runtime-step admission can be trusted.

## Retained lifecycle gaps

```txt
RAF request handles are not retained
stop does not cancel pending callback
stop/start can create duplicate RAF chains
boot discards returned host controller
GameHost and editor globals have incomplete lease ownership
fatal handling does not coordinate disposal
```

## Retained source-provider gaps

```txt
production fallback is unreachable after external import/export failure
tests use local fallback rather than deployed provider
provider selection has no typed admission result
external and fallback plans lack parity classification
```

## Retained render-cache gaps

```txt
source revision absent
render-affecting projection incomplete
cache key schema implicit
rebuild not transactional
enhancer and renderer invalidation uncoordinated
mesh and GPU buffer lineage incomplete
```

## Retained committed-frame gaps

```txt
state changes before render success
lastPlan changes before renderer completion
editor tick and reset bypass rendering
state, plan, renderer and canvas lack one commit identity
```

## Retained interaction command gaps

```txt
path-progress and inspect commands are authored but cannot be dispatched
player and path mutation absent
objective predicates and story triggers not executed
accepted/rejected result authority absent
```

## Registry truth gap

The DSK registry declares host, diagnostics, game and render services, but declaration does not prove the public host is the exclusive mutation gateway.

## Deployment risk

Any same-page script or editor client can hold `GameHost.game` and mutate state outside future authority layers. Restart or disposal cannot make that old reference inert. Current CI cannot detect raw-authority exposure, stale lease mutation, misleading capability success or observation aliasing.