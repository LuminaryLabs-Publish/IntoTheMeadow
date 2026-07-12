# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T22-08-13-04-00`

## Plan ledger

**Goal:** distinguish a canvas that fills the browser from executable proof that viewport, DPR, WebGL drawing-buffer dimensions, projection, renderer snapshot, capture and visible frame share one bounded surface revision.

- [x] Review the complete accessible Publish inventory.
- [x] Compare every eligible repository with central tracking.
- [x] Verify central and root `.agent` coverage.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `IntoTheMeadow` after skipping active unsynchronized `AetherVale` work.
- [x] Inspect CSS canvas sizing.
- [x] Inspect renderer DPR and drawing-buffer mutation.
- [x] Inspect GL viewport and camera aspect derivation.
- [x] Inspect renderer snapshot contents.
- [x] Inspect browser editor viewport and capture capabilities.
- [x] Inspect the existing browser observation configuration.
- [x] Document surface identity, policy, budget, capability, fallback, revision and frame requirements.
- [x] Change documentation only.
- [ ] Execute fixtures after implementation exists.

## Source inspection completed

```txt
render surface IDs: 0
surface revisions: 0
resize command IDs: 0
resize generations: 0
pixel-budget policies: 0
WebGL surface capability results: 0
actual drawing-buffer readback records: 0
fallback results: 0
surface journals: 0
capture/frame surface receipts: 0
hard-coded DPR policy: min 1, max 2
browser observation surface configurations: one, 1440x900 at DPR 1
```

## Proven from source

```txt
canvas CSS width and height are 100 percent of the viewport
renderer.render invokes resize every frame
resize samples canvas.clientWidth/clientHeight with inner-size fallback
resize samples live devicePixelRatio
DPR is clamped to 1 through 2
canvas.width and canvas.height are assigned directly when different
gl.viewport uses the requested width and height
camera projection aspect uses requested width divided by requested height
renderer snapshot omits width, height, DPR and surface revision
browser.getViewport reads live browser and canvas values
renderer.capture reads canvas width, height and data URL
capture attaches the latest renderer snapshot independently
browser observation forces DPR 1 and window size 1440 by 900
browser observation checks screenshot byte size, not surface policy or correlation
```

## Existing proof

Current checks prove:

```txt
required files exist
render-plan descriptors validate
CPU mesh data is internally aligned
static topology remains stable across time changes
renderer can draw the current plan
browser can produce one nontrivial screenshot at DPR 1
editor viewport and capture capabilities exist
```

Current checks do not prove:

```txt
bounded DPR and total pixel policy
WebGL maximum-dimension admission
actual drawing-buffer dimensions
browser clamping detection
rapid resize coalescing
hidden and zero-size behavior
fallback or rollback
stale resize rejection
context-generation fencing
camera projection from committed dimensions
renderer/capture/frame surface correlation
high-DPR or 4K behavior
Pages resize parity
```

## Execution status

```txt
runtime source changed: no
renderer source changed: no
package scripts changed: no
dependencies changed: no
render output changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check executed: no
browser resize smoke executed: no
render-surface fixtures available: no
```

## Required DOM-free policy fixture

Construct fake viewport, policy and WebGL capability inputs.

Acceptance assertions:

```txt
finite positive CSS dimensions and DPR normalize deterministically
DPR policy identifies requested and applied values
maximum width, height and total pixels are never exceeded
capability limits produce a declared fallback or typed rejection
actual drawing-buffer readback governs committed dimensions
stale session, context generation and surface revision reject
newer viewport observations supersede older queued commands
accepted resize advances surface revision exactly once
failed allocation does not publish a new committed revision
bounded journal records accepted, degraded and rejected commands
```

## Required rapid resize fixture

```txt
submit a sequence of viewport observations before the next frame
assert superseded commands are coalesced deterministically
assert only the latest admitted command can commit
assert predecessor surface remains valid until successor frame acknowledgement
assert projection and capture do not cite an intermediate stale surface
```

## Required hidden and zero-size fixture

```txt
commit a baseline surface
simulate hidden page and zero CSS size
assert explicit preserve, suspend or release policy
assert no accidental one-pixel surface is reported as ready
resume with a valid viewport
assert one successor surface revision and first-frame receipt
```

## Required browser surface matrix

```txt
320x240 DPR 1
1440x900 DPR 1
1920x1080 DPR 1.25
2560x1440 DPR 2
3840x2160 requested DPR 2
3840x2160 requested DPR 3
portrait and landscape transition
browser zoom change
context loss during resize
```

For every case assert:

```txt
requested values
bounded candidate values
actual drawing-buffer values
applied DPR and quality tier
camera aspect
surface revision
renderer snapshot revision
visible-frame revision
capture revision and dimensions
```

## Required browser smoke

```txt
boot and wait for initial visible surface frame
record surface and frame receipt
resize viewport and change DPR
wait for successor surface revision
assert actual dimensions obey policy and capability limits
capture canvas
assert viewport, renderer, capture and frame cite one revision
trigger rapid resize and assert coalescing
trigger hidden/zero transition and assert explicit policy
trigger context loss during resize and assert recovery routing
```

## Future commands

```bash
npm run fixture:render-resolution-policy
npm run fixture:render-surface-capabilities
npm run fixture:render-surface-budget-fallback
npm run fixture:render-surface-stale-rejection
npm run fixture:render-surface-allocation-failure
npm run smoke:render-surface-resize
npm run smoke:render-surface-dpr
npm run smoke:render-surface-hidden-zero
npm run smoke:render-surface-capture-correlation
npm run smoke:render-surface-context-loss
npm run check
```

## Completion boundary

Do not claim responsive or high-DPI rendering because the canvas fills the window or a screenshot is nonempty. Completion requires one accepted surface revision and actual drawing-buffer dimensions to propagate through projection, renderer snapshot, capture and visible-frame evidence.
