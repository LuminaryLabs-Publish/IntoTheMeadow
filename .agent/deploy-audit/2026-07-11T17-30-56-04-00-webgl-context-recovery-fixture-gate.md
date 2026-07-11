# WebGL Context Recovery Fixture Gate

**Timestamp:** `2026-07-11T17-30-56-04-00`

## Summary

Current checks prove renderer utility behavior and one successful Chromium screenshot. They do not force WebGL context loss, prove restoration, verify resource regeneration or reject stale canvas capture.

## Plan ledger

**Goal:** add deterministic DOM/browser fixtures that prove context generation, resource rebuild, first recovered frame, capture freshness and leak-free repeated recovery.

- [x] Review package check scripts.
- [x] Review renderer utility smoke.
- [x] Review browser screenshot observation.
- [x] Identify missing context-loss and restoration coverage.
- [x] Define DOM-free state-machine fixtures.
- [x] Define browser `WEBGL_lose_context` coverage.
- [x] Define release assertions.
- [ ] Add commands and execute after implementation exists.

## Existing check surface

```txt
static smoke
DSK registry smoke
render-plan smoke
renderer-v2 mesh smoke
deterministic scene smoke
headless editor environment smoke
headless editor command smoke
headless editor loop smoke
optional Chromium screenshot observation
```

Current renderer smoke builds CPU mesh data. It does not create a browser WebGL context or exercise lifecycle events.

Current browser observation checks:

```txt
page boots
editor bridge exists
HUD includes gpu:
screenshot exists and is larger than 10 KB
fatal text is absent
```

It does not inspect context generation or force loss/restoration.

## Required commands

```bash
npm run fixture:webgl-context-state
npm run fixture:webgl-resource-generation
npm run smoke:webgl-context-loss-restore
npm run smoke:webgl-capture-freshness
npm run smoke:webgl-repeated-recovery
npm run check
```

## DOM-free state-machine fixture

Use fake context events and fake resource factories to prove:

```txt
ready -> lost
lost -> restoring
restoring -> recovered
restoring -> failed
lost -> disposed
restoring -> disposed
```

Assert stale, duplicate and illegal transitions return typed rejection without partial resource publication.

## Resource-generation fixture

```txt
start context generation 1 with topology A
commit resource generation 1 and frame 1
accept loss
accept restore into context generation 2
retain topology A and CPU mesh
assert program factory called again
assert all attribute buffers created again
assert resource generation 2 belongs to context generation 2
assert frame 2 commits before readiness returns
assert generation 1 handles are never reused
```

## Browser context-loss fixture

Use `WEBGL_lose_context` where available:

```txt
boot real browser route
wait for committed frame
capture baseline context/resource/frame IDs
lose context
assert HUD and diagnostics report lost
assert renderer.capture rejects or reports unavailable
restore context
wait for recovered frame
assert context generation advanced
assert resource generation advanced
assert frame ID advanced
assert visible screenshot succeeds
assert no fatal text
```

If the extension is unavailable, report a typed skipped capability rather than a false pass.

## Capture freshness fixture

```txt
capture baseline frame
lose context
attempt capture and require rejection
restore context
attempt capture before recovered frame and require rejection
wait for recovered frame
capture successfully
assert capture, renderer and committed-frame IDs match
```

## Repeated recovery fixture

Run at least three loss/restore cycles and assert:

```txt
strictly increasing context generations
strictly increasing resource generations
one active listener pair
one active program
expected active buffer count
bounded journal size
no duplicate RAF chains
no stale captures
idempotent final disposal
```

## Failure injection

Required cases:

```txt
shader compilation failure after restore
program link failure after restore
missing required attribute
missing required uniform
buffer allocation failure
loss during buffer upload
loss during candidate draw
dispose during restoration
```

Each failure must leave no active partial registry and must not restore render readiness.

## Release rule

Do not report the WebGL renderer as recovered, ready or capture-capable after context loss until the restored context owns a complete validated resource generation and a first recovered frame has committed. A successful pre-loss screenshot is not recovery proof.
