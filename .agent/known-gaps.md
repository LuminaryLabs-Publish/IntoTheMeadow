# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T14-08-51-04-00`

## Selection state

```txt
10 accessible LuminaryLabs-Publish repositories observed
TheCavalryOfRome excluded by rule
9 eligible repositories centrally tracked with root .agent state
AetherVale had a newer repo-local audit already in flight
IntoTheMeadow selected as the oldest fully aligned eligible repository
only IntoTheMeadow changed in the Publish organization for this pass
```

## Interaction and objective gaps

### Authored definitions are not executable

`ARRIVAL_OBJECTIVES` and `ARRIVAL_INTERACTION_TARGETS` define `path-progress` and `inspect` behavior, but no runtime command accepts either action.

### Game state mutation is frame-only

`advanceGameState()` changes only:

```txt
frame
lastTick.dt
lastTick.time
```

It does not change:

```txt
player.position
player.pathProgress
inspection state
completedObjectiveIds
activeObjectiveId
storyBeatIds
```

### Browser ingress is absent

The web host installs no keyboard, pointer, proximity or interaction listeners. Each frame sends only `{ time, dt }` into `game.tick()`.

### Editor ingress is absent

The browser and Node editor capability sets include runtime, scene, renderer, camera, browser and workspace operations, but no interaction, player or objective commands.

### Canonical target admission is absent

There is no command envelope carrying:

```txt
command ID
session ID
epoch
scene ID
target ID
action kind
sequence
progress or range evidence
expected objective revision
```

### Target descriptors are not indexed

The target list is exposed as content, but no canonical scene-scoped target index resolves `arrival-path` or `focal-tree` for mutation.

### Path progress is absent

The initial state sets `pathProgress: 0`; no runtime computes movement along `arrival-path`, validates finite progress or commits threshold crossings.

### Inspection receipts are absent

There is no inspection ledger, duplicate classification, range policy, target receipt or no-mutation duplicate result.

### Objective evaluation is absent

No service evaluates:

```txt
progressAtLeast: 0.35
inspected: true
requiredAction
targetId
objective ordering
```

### Completion and story transitions are absent

No typed objective completion result exists. Active-objective advancement and story-beat transitions are not connected to gameplay state.

### Render and diagnostics acknowledgement is absent

Diagnostics count objectives and targets but do not expose progress, completion, command result, revision or committed-frame evidence. The render path does not consume progression state.

## Required interaction fixture gaps

```txt
path progress below threshold
path progress at threshold
finite and monotonic progress validation
canonical target lookup
unknown target rejection
wrong action rejection
focal-tree inspect success
duplicate inspect no-mutation
objective completion exactly once
objective ordering and story transition
browser/editor ingress parity
reset and stale epoch rejection
state/diagnostic/frame revision parity
```

## Retained workspace path gaps

```txt
raw target.startsWith(root) membership
sibling-prefix escape
symlink escape
new-write ancestor containment
root/session/revision identity
operation budgets and relative-path redaction
typed filesystem results
```

## Retained host capability gaps

```txt
GameHost exposes raw game authority
capability registration is bypassable
session and lifecycle fences are absent
transport success conceals domain status
command identity and bounded journals are absent
public observations are not revisioned
host controller ownership is discarded
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

## Registry truth gap

The registry declares player, input, interaction, objective and story DSK services, but declarations do not prove runtime consumption. The implemented game exposes authored content only.

## Deployment risk

Current checks validate DSK declarations, render plans, renderer behavior and editor loops, but they do not prove that a player can complete either authored objective. A static Pages deployment can therefore appear healthy while the gameplay loop remains inert.
