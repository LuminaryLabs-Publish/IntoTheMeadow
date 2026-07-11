# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T17-30-56-04-00`

## Plan ledger

**Goal:** separate one successful renderer boot from executable proof that context loss invalidates readiness and restoration rebuilds a complete new-generation resource set before frame and capture success.

- [x] Review the full accessible Publish inventory.
- [x] Compare every eligible repository with the central ledger.
- [x] Verify central and root `.agent` coverage.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `IntoTheMeadow`.
- [x] Read `AGENTS.md` and retained audits.
- [x] Inspect WebGL renderer construction and resource ownership.
- [x] Inspect topology cache and buffer replacement.
- [x] Inspect web-host RAF, fatal projection and snapshots.
- [x] Inspect editor canvas capture.
- [x] Inspect renderer and browser smoke coverage.
- [x] Document context-generation recovery and fixture requirements.
- [x] Change documentation only.
- [ ] Execute fixtures after implementation exists.

## Source inspection completed

```txt
WebGL contexts acquired during renderer construction: 1
shader programs created during renderer construction: 1
context-loss listeners: 0
context-restoration listeners: 0
context generation fields: 0
resource generation fields: 0
first recovered frame acknowledgements: 0
capture freshness checks: 0
```

## Proven from source

```txt
renderer acquires WebGL2 or WebGL once
renderer creates and links the program once
attribute and uniform locations are resolved once
GPU buffers are replaced only when bindMesh() runs
bindMesh() runs when topology cache misses
same topology returns cached CPU mesh
renderer snapshot has no context/resource/frame identity
web host stores lastRender independently of context state
editor capture returns canvas data URL plus latest renderer snapshot
browser observation checks one successful screenshot and gpu HUD marker
```

## Existing proof

Current checks prove:

```txt
required files exist
render-plan descriptors validate
CPU mesh is substantial and internally aligned
animation time does not change static topology
browser route can boot in an available Chromium
one screenshot can be created
editor bridge and gpu HUD marker can be observed
```

Current checks do not prove:

```txt
loss event admission
preventDefault handling
render suspension during loss
context generation advancement
program recreation after restore
attribute and uniform re-resolution
buffer reconstruction after restore
same-topology forced GPU rebuild
staged recovery rollback
first recovered frame commitment
HUD and GameHost recovery correlation
capture rejection while stale
repeated recovery without leaks
late-event rejection after dispose
```

## Execution status

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
render output changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check executed: no
browser smoke executed: no
WebGL context fixtures available: no
```

## Required DOM-free fixture

Construct fake event and resource adapters with:

```txt
runtime session identity
renderer instance identity
context state machine
context generation counter
resource generation counter
fake program factory
fake location resolver
fake buffer factory
candidate frame submitter
capture admission adapter
bounded result journal
```

## DOM-free acceptance assertions

```txt
ready -> lost invalidates render and capture success
lost -> restoring allocates next context generation
same topology still recreates program and buffers
candidate resources remain private until complete
successful candidate frame atomically commits recovery
failed candidate leaves no active partial registry
stale and duplicate events are rejected
stop/dispose blocks late restoration
```

## Required browser fixture

Use the `WEBGL_lose_context` extension when available:

```txt
boot route and wait for committed frame
record baseline frame/context/resource generations
lose context
assert diagnostics report lost
assert capture is rejected
restore context
assert context and resource generations advance
wait for first recovered frame
capture and compare correlated IDs
repeat at least three times
```

An unavailable extension must produce an explicit skipped-capability result rather than a pass.

## Failure injection

```txt
shader compilation failure
program link failure
missing required attribute
missing required uniform
buffer creation failure
loss during buffer upload
loss during candidate draw
disposal during restoration
```

Each failure must assert:

```txt
no partial active resource registry
no recovered readiness
no successful capture
one typed failure result
one bounded journal row
```

## Future commands

```bash
npm run fixture:webgl-context-state
npm run fixture:webgl-resource-generation
npm run smoke:webgl-context-loss-restore
npm run smoke:webgl-capture-freshness
npm run smoke:webgl-repeated-recovery
npm run check
```

## Completion boundary

Do not claim context recovery, current renderer readiness, committed-frame coherence or capture freshness until a restored context owns a fully rebuilt resource generation and a first post-restoration frame has committed.
