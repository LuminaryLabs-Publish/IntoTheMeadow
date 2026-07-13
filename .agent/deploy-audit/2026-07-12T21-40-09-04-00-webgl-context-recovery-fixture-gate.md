# WebGL Context Recovery Fixture Gate

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T21-40-09-04-00`

## Summary

Current checks prove static descriptors, render-plan topology, CPU mesh shape and headless-editor operations. They do not create an authoritative context-loss/restoration sequence or prove that rebuilt resources produce a visible GitHub Pages frame.

## Plan ledger

**Goal:** define the executable gate required before WebGL recovery can be called source-ready, build-ready or Pages-ready.

- [x] Review package check surface and renderer smoke scope.
- [x] Separate CPU mesh proof from browser GPU lifecycle proof.
- [x] Define deterministic loss, restoration, rollback and repeated-loss fixtures.
- [x] Define source/build/Pages parity requirements.
- [x] Preserve current non-claims.
- [ ] Add and run fixtures after runtime implementation.

## Existing command surface

```txt
npm run check
  -> static-smoke
  -> dsk-registry-smoke
  -> render-plan-smoke
  -> renderer-v2-smoke
  -> deterministic-scene-smoke
  -> headless-editor environment/command/loop smokes
```

Existing renderer proof is CPU-side. It validates enhanced descriptors, topology stability, substantial triangle output and array lengths. It does not exercise a browser WebGL context lifecycle.

## Required unit fixtures

```txt
context event admission
context phase transitions
context/resource generation allocation
stale and duplicate event rejection
draw suspension while LOST
resource manifest completeness
candidate program/link failure rollback
candidate buffer failure rollback
exact-once candidate/predecessor retirement
stale resource rejection
terminal ReloadRequired result
```

## Required browser fixtures

Where supported, use `WEBGL_lose_context` or an equivalent controlled harness:

```txt
loss before first frame
loss after a stable frame
loss between outline and color pass
loss during topology rebuild
successful restoration and resource rebuild
failed restoration candidate
repeated loss/restoration
late RAF callback after generation replacement
renderer disposal during recovery
first visible restored-frame acknowledgement
```

## Required observations

```txt
context phase and generation
resource generation and manifest fingerprint
loss/restoration counts
zero successful snapshots while lost
zero stale callback/resource mutation
candidate rollback receipt
scheduler resume result
first visible restored-frame receipt
screenshot/readback parity
```

## Source/build/Pages gate

```txt
source modules
  -> deterministic browser recovery fixture passes

built output
  -> same context/resource generation behavior
  -> same fixture result fingerprints

GitHub Pages
  -> deployed revision identified
  -> loss/restoration smoke runs against deployed files
  -> first visible restored frame captured
  -> runtime snapshot and screenshot agree
```

## Failure policy

A browser or environment without controllable context-loss injection must be reported as `fixture unavailable`, not passed. A normal screenshot without an injected generation transition is not recovery proof.

## Current execution status

```txt
runtime implementation: absent
context fixtures: absent
npm run check: not run this turn
browser recovery smoke: not run
built-output recovery smoke: not run
Pages recovery smoke: not run
production readiness: not claimed
```
