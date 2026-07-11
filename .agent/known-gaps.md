# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T17-30-56-04-00`

## Selection state

```txt
10 accessible LuminaryLabs-Publish repositories observed
TheCavalryOfRome excluded by rule
9 eligible repositories centrally tracked with root .agent state
IntoTheMeadow selected as the oldest eligible documented repository
only IntoTheMeadow changed in the Publish organization for this pass
```

## Current WebGL context recovery gaps

### Context events are unowned

No runtime owner registers or admits:

```txt
webglcontextlost
webglcontextrestored
```

The host cannot deliberately prevent default loss handling, suspend submissions, sequence restoration or reject stale events.

### No context generation exists

The runtime records no context identity or generation. A program, location or buffer cannot prove which browser context lifetime created it.

### No resource generation exists

The renderer tracks a topology key and CPU mesh but does not track a complete context-bound resource set. Program, locations and buffers are not committed or retired as one generation.

### Same topology can conceal invalid GPU resources

After restoration, the CPU topology and mesh may remain valid while all GPU objects require recreation. The current cache hit path can skip `bindMesh()` because the topology key did not change.

### Renderer readiness is not fenced

Loss does not invalidate:

```txt
lastRender
renderer snapshot
HUD gpu status
GameHost render observations
editor capture eligibility
committed-frame eligibility
```

### Restoration is not transactional

There is no staged recreation, validation, candidate draw, atomic commit or rollback for program, locations and buffers.

### Capture has no freshness contract

Canvas pixels and renderer metadata are returned together without a shared frame ID, context generation or resource generation.

### Disposal and late events are uncoordinated

Explicit renderer disposal deletes buffers and the program, but listener ownership and stale restore-event rejection do not exist. This must be integrated with the retained runtime lifecycle authority.

## Missing recovery fixtures

```txt
DOM-free context state transition fixture
resource-generation fixture
real browser WEBGL_lose_context fixture
same-topology restoration fixture
loss-during-rebuild fixture
capture freshness fixture
repeated recovery leak fixture
dispose-during-restore fixture
```

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
```

## Retained source-provider gaps

```txt
provider selection has no typed admission result
external and fallback plans lack parity classification
production import/export failure cannot reach the local fallback
```

## Retained render and committed-frame gaps

```txt
render-affecting cache projection incomplete
rebuild is not transactional
enhancer and renderer invalidation are uncoordinated
state, plan, renderer and canvas lack one commit identity
editor tick and reset bypass visible rendering
WebGL context and resource generation are absent
```

## Deployment risk

A Pages route can pass static, mesh and screenshot checks while remaining unable to recover from a browser WebGL context loss. A pre-loss screenshot and a stale renderer snapshot are not proof that a restored context owns valid resources or that capture describes a current visible frame.
