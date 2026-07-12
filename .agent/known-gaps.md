# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T22-08-13-04-00`

## Selection state

```txt
10 accessible LuminaryLabs-Publish repositories observed
TheCavalryOfRome excluded by rule
9 eligible repositories centrally tracked with root .agent state
AetherVale skipped because active repo-local lifecycle work was newer than its central ledger
IntoTheMeadow selected as the oldest stable eligible repository
only IntoTheMeadow changed in the Publish organization for this pass
```

## Current render-surface gaps

### Live browser values mutate the drawing buffer directly

`renderer.render()` calls `resize()` every frame. The function samples live canvas CSS dimensions and `devicePixelRatio`, then immediately assigns `canvas.width` and `canvas.height` when the requested size differs.

### DPR is a hard-coded clamp, not a complete policy

The current rule clamps DPR from 1 through 2. It has no policy identity, revision, quality tier, minimum device support rule, total pixel budget or relationship to `meadow-performance-dsk`.

### WebGL surface capabilities are not admitted

The renderer does not query or record:

```txt
MAX_VIEWPORT_DIMS
MAX_RENDERBUFFER_SIZE
gl.drawingBufferWidth
gl.drawingBufferHeight
browser clamping or allocation mismatch
```

### Large requested surfaces are unbounded by total pixels

A 3840 by 2160 viewport at DPR 2 requests 7680 by 4320, or 33,177,600 pixels. Antialiasing, depth and browser implementation overhead are additional and unclassified.

### Resize commands and revisions are absent

```txt
viewport observation ID: absent
resize command ID: absent
resize sequence/generation: absent
surface ID: absent
surface revision: absent
context-generation fence: absent
stale resize rejection: absent
rapid-resize coalescing: absent
```

### Fallback and rollback are absent

There is no lower-resolution fallback sequence, typed allocation failure, predecessor-surface restoration policy, last-known-good frame policy or cold-rebuild routing.

### Renderer snapshots omit surface state

Renderer snapshots report topology, mesh counts and cache status but not CSS size, requested/applied DPR, actual drawing-buffer size, aspect, quality tier, surface revision, context generation or committed frame.

### Viewport and capture observations are not correlated

`browser.getViewport` reads live browser and canvas values. `renderer.capture` reads the current canvas and independently attaches the latest renderer snapshot. Neither returns a surface revision or frame freshness result.

### Existing browser proof is one configuration

The observation script fixes 1440 by 900 at DPR 1 and checks screenshot byte size. It does not exercise resize, zoom, orientation, high DPR, hidden/zero-size layout, WebGL limits, fallback or capture parity.

## Missing render-surface fixtures

```txt
resolution policy fixture
WebGL capability fixture
pixel-budget fallback fixture
rapid resize coalescing fixture
hidden and zero-size fixture
actual drawing-buffer mismatch fixture
stale context/surface revision fixture
allocation failure fixture
context loss during resize fixture
capture freshness fixture
visible-frame surface correlation fixture
Pages resize and DPR smoke
```

## Retained runtime clock and step gaps

```txt
RAF absolute time and fixed dt disagree
stop/start injects wall-clock pause into presentation
browser reset does not establish a new clock origin
browser editor bypasses clock admission
Node headless uses an independent accumulated clock
multi-step work is unbounded
clock revisions, step results and journals are absent
state, shader and frame clock correlation is absent
```

## Retained fatal-runtime recovery gaps

```txt
startup acquisitions are not transactional
public globals can publish before full readiness
frame state mutates before frame success
renderer mutation is not staged
fatal handling is only presentation
capabilities survive fatal state
capture remains stale-capable
in-place restart reuses the damaged graph
disposal is disconnected from failure
late predecessor callbacks are not fenced
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

A successful full-window screenshot can still hide an oversized, clamped, stale or uncorrelated drawing buffer. Do not claim responsive or high-DPI correctness until actual WebGL dimensions and one committed surface revision are visible through projection, renderer snapshot, capture and the first rendered frame.
