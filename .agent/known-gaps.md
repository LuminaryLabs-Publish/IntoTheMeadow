# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T19-01-08-04-00`

## Selection state

```txt
10 accessible LuminaryLabs-Publish repositories observed
TheCavalryOfRome excluded by rule
9 eligible repositories centrally tracked with root .agent state
IntoTheMeadow selected as the oldest eligible documented repository
only IntoTheMeadow changed in the Publish organization for this pass
```

## Current fatal-runtime recovery gaps

### Startup acquisitions are not transactional

The external provider, game, renderer, enhancer, `GameHost`, editor bridge and listeners are acquired sequentially without an acquisition ledger or reverse cleanup stack.

### Public globals can be published before full readiness

`GameHost` is exposed before editor installation and before the first committed rendered frame. A later startup failure has no authoritative global-retirement path.

### Frame state mutates before frame success

`game.tick()` advances state before plan validation and rendering. `lastPlan` is assigned before `renderer.render()` completes. Failed work can leave state, plan, renderer snapshot and canvas representing different phases.

### Renderer mutation is not staged

A render attempt can resize the canvas, replace buffers, clear and issue draws before failing. No candidate resource registry, rollback receipt or last-known-good canvas/frame boundary exists.

### Fatal handling is only presentation

`showFatal()` sets `stopped`, writes text and logs the error. It creates no failure ID, lifecycle state, classification, resource-impact record, cleanup result or recovery policy.

### Capabilities survive fatal state

The raw game and editor capabilities remain callable:

```txt
runtime.tick
runtime.reset
scene.getRenderPlan
renderer.getSnapshot
renderer.capture
GameHost.game.tick/reset/rebuildRenderPlan
```

### Capture remains stale-capable

Canvas serialization can continue after fatal state and is paired with the latest renderer snapshot without failure state or committed-frame admission.

### In-place restart reuses the damaged graph

`start()` schedules the same frame callback with the same game, renderer, enhancer, bridge, globals and observations. No new session, renderer, resource or frame generation is allocated.

### Disposal is disconnected from failure

The renderer and editor bridge expose `dispose()`, but boot and frame failure paths do not invoke them. Cleanup failure is also not representable.

### Late callbacks are not fenced

There is no predecessor-session or callback-generation check to reject work that arrives after fatal retirement or cold restart.

## Missing fatal-recovery fixtures

```txt
startup acquisition rollback fixture
partial global-publication fixture
failure-after-tick rollback fixture
plan-validation failure fixture
mesh/buffer/draw failure injection fixture
fatal capability quarantine fixture
fatal capture rejection fixture
cleanup failure fixture
in-place restart rejection fixture
cold replacement-session fixture
repeated failure/restart leak fixture
terminal disposal idempotency fixture
```

## Retained WebGL context recovery gaps

```txt
context events are unowned
context and resource generations are absent
same topology can conceal invalid GPU resources
renderer readiness and capture are not fenced
restoration is not transactional
repeated restoration and late-event fixtures are absent
```

A recoverable WebGL context loss must route through the context-recovery authority. Unknown, invariant-breaking or cleanup-compromised failures must retire the graph and cold restart.

## Retained DSK registry truth gaps

```txt
multiple declaration sources can drift
descriptor status is policy rather than runtime evidence
dependency requirements are empty
implementation and service bindings are absent
installDsks() creates no local instances
runtime consumers bypass registry lookup
renderer descriptor services drift from implementation
runtime diagnostics report counts rather than consumption truth
registry-owned reverse disposal is absent
registry tests prove shape rather than runtime consumption
```

## Retained interaction and objective gaps

```txt
path-progress and inspect commands absent
player path progress remains zero
inspection receipts absent
objective predicates and completion results absent
story transitions absent
browser/editor interaction parity absent
committed-frame progression acknowledgement absent
```

## Retained workspace path gaps

```txt
segment-aware containment absent
symlink escape policy absent
new-write ancestor containment absent
root/session/revision identity absent
operation budgets and typed filesystem results absent
```

## Retained host capability gaps

```txt
GameHost exposes raw game authority
capability registration remains bypassable
session and lifecycle fences absent
transport success can conceal domain failure
public observations are not revisioned
fatal capability quarantine is absent
```

## Retained runtime step and clock gaps

```txt
browser RAF and editor surfaces share raw game.tick
finite delta and integer step validation absent
maximum work budget absent
monotonic simulation clock absent
reset epoch and step journal absent
```

## Retained lifecycle gaps

```txt
RAF request handles not retained
stop does not cancel pending callbacks
stop/start can create duplicate RAF chains
boot discards the host controller
fatal handling does not coordinate disposal
cold replacement-session ownership is absent
```

## Retained source-provider gaps

```txt
provider selection has no typed admission result
external and fallback plans lack parity classification
production import/export failure cannot reach the local fallback
provider failure cleanup and retry policy are absent
```

## Retained render and committed-frame gaps

```txt
render-affecting cache projection incomplete
rebuild is not transactional
enhancer and renderer invalidation are uncoordinated
state, plan, renderer and canvas lack one commit identity
editor tick and reset bypass visible rendering
WebGL context and resource generation are absent
fatal candidate rollback and last-known-good frame ownership are absent
```

## Deployment risk

A Pages route can display a useful fatal message while leaving partially acquired globals, listeners, renderer resources and mutation capabilities alive. A later in-place `start()` or editor command can continue against a graph whose state, plan, buffers, canvas and snapshots no longer share a proven commit. Visible error text is not cleanup, quarantine or recovery proof.