# Known Gaps

**Updated:** `2026-07-13T10-59-22-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `render-surface-viewport-authority-central-reconciled`

## Summary

The current bounded gap is render-surface viewport authority. CSS measurement, DPR policy, pixel budgeting, canvas backing-store mutation, WebGL viewport, camera projection, renderer snapshots, browser readback and canvas capture have no common identity or terminal result.

## Plan ledger

**Goal:** record every missing identity, policy, participant receipt, recovery rule and proof needed for coherent viewport transitions.

- [x] Record host measurement and zero-size behavior.
- [x] Record DPR and allocation policy gaps.
- [x] Record backing-store and camera/WebGL commit gaps.
- [x] Record renderer/readback/capture correlation gaps.
- [x] Record lifecycle and proof gaps.
- [x] Preserve all earlier audits.
- [ ] Implement and prove the authority later.

## Identity and measurement gaps

```txt
render surface ID: absent
surface generation: absent
measurement evidence ID: absent
measurement sequence: absent
viewport revision: absent
actual host-box authority: absent
ResizeObserver ownership: absent
visual viewport evidence: absent
DPR-change evidence: absent
visibility and connection state: absent
```

## Zero-size and fallback gaps

```txt
zero-width classification: absent
zero-height classification: absent
hidden-surface classification: absent
zero-size deferral result: absent
restore-after-zero result: absent
truthy fallback currently replaces zero with global window dimensions
```

## DPR, GPU and budget gaps

```txt
sampled versus effective DPR: not distinguished
quality-profile DPR policy: absent
fractional DPR policy: implicit only
maximum texture dimension admission: absent
maximum renderbuffer dimension admission: absent
total pixel budget: absent
memory-cost estimate: absent
budget downscale result: absent
budget rejection result: absent
```

## Participant and commit gaps

```txt
viewport command ID: absent
expected predecessor viewport revision: absent
canvas backing-store candidate: absent
WebGL viewport candidate: absent
camera projection candidate: absent
future render-target candidate: absent
participant preparation receipts: absent
atomic commit result: absent
rollback receipt: absent
surface-lost result: absent
stale measurement rejection: absent
duplicate measurement suppression: absent
superseded candidate result: absent
```

## Render and visible-frame gaps

```txt
backing-store mutation before frame success: present
last-complete-frame preservation: absent
frame viewport envelope: absent
renderer snapshot CSS dimensions: absent
renderer snapshot effective DPR: absent
renderer snapshot backing dimensions: absent
renderer snapshot camera aspect: absent
renderer snapshot viewport revision: absent
first viewport frame acknowledgement: absent
```

## Readback and capture gaps

```txt
GameHost viewport result: absent
browser.getViewport committed revision: absent
browser.getViewport actual CSS box: absent
browser.getViewport effective DPR: absent
browser.getViewport camera/WebGL parity: absent
capture viewport revision: absent
capture frame ID: absent
capture visible acknowledgement: absent
predecessor-versus-successor capture status: absent
```

## Lifecycle gaps

```txt
viewport policy while host paused: absent
resume convergence result: absent
viewport retirement with host generation: absent
layout transition while fatal: absent
context-loss coordination receipt: absent
editor-mutation/capture coordination: absent
observer disposal receipt: absent
```

## Proof gaps

```txt
initial viewport fixture
zero-size fixture
zero-size restore fixture
DPR increase/decrease fixture
fractional DPR fixture
browser zoom fixture
rapid duplicate resize fixture
stale measurement fixture
pixel-budget fixture
GPU-limit fixture
failure-after-resize fixture
rollback fixture
camera/WebGL parity fixture
readback parity fixture
capture correlation fixture
pause/resume/retire fixture
source/build/Pages parity
```

## Preserved unresolved gaps

```txt
browser editor capability admission
web-host lifecycle retirement
workspace root containment and atomic artifacts
provider-source admission and browser/headless parity
WebGL context/resource recovery
single-chain frame scheduling
executable DSK provider consumption
playable input, movement, interaction, story and objectives
camera-bound grass visibility and LOD
audio user-gesture lifecycle
atomic save and migration
independent replay
```

## Completion boundary

A canvas that eventually resizes is not a viewport authority. Completion requires generation-bound measurements, explicit zero-size and DPR policy, bounded allocation, prepared participants, atomic adoption or rollback, revisioned readback/capture, and executable visible-frame proof.