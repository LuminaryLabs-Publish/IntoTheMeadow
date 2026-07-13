# Known Gaps

**Updated:** `2026-07-13T16-01-05-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `render-plan-mesh-cache-coherence-authority-central-reconciled`

## Summary

The current bounded gap is render cache coherence. Source plans, runtime performance policy, contracted descriptors, CPU mesh data, GPU buffers, renderer snapshots and captured pixels have no complete shared revision or dependency contract.

## Plan ledger

**Goal:** record every missing identity, dependency, decision, participant receipt, recovery rule and proof needed for correct render cache reuse.

- [x] Record enhancer fingerprint omissions.
- [x] Record contract topology omissions.
- [x] Record CPU mesh and GPU-buffer admission gaps.
- [x] Record public readback and visible-frame gaps.
- [x] Record test and deployment proof gaps.
- [x] Preserve all earlier audits.
- [ ] Implement and prove the authority later.

## Revision and identity gaps

```txt
source render-plan revision: absent
runtime render-policy revision: absent
contract descriptor revision: absent
CPU mesh revision: absent
GPU buffer generation: absent
cache decision ID: absent
cache transition generation: absent
visible cache-frame revision: absent
```

## Dependency-manifest gaps

```txt
enhancer dependency manifest: absent
contract dependency manifest: absent
mesh-builder dependency manifest: absent
dynamic uniform dependency manifest: absent
consumer undeclared-read detection: absent
fingerprint schema versioning: absent
```

## Enhancer cache gaps

```txt
object color and accent coverage: absent
atmosphere hills and ground coverage: absent
path rutCount and pebbleCount coverage: absent
focal-tree trunkHeight and trunkRadius coverage: absent
focal-tree rootCount and leafClusterCount coverage: absent
focal-tree shadowRadius coverage: absent
runtime.performance coverage: absent
explicit cache-decision result: absent
stale/duplicate/superseded classification: absent
```

## Contract and mesh cache gaps

```txt
complete contracted-descriptor fingerprint: absent
independent mesh dependency fingerprint: absent
atmosphere dependency coverage: absent
static material palette coverage: absent
focal-tree material coverage: absent
focal-tree outline coverage: absent
mesh candidate revision: absent
GPU buffer candidate generation: absent
partial buffer preparation receipt: absent
```

## Commit and recovery gaps

```txt
aggregate cache command: absent
participant preparation receipts: absent
atomic plan/mesh/GPU adoption: absent
predecessor preservation result: absent
rollback receipt: absent
failed candidate disposal receipt: absent
predecessor GPU disposal receipt: absent
surface-loss handoff result: absent
```

## Render and visible-frame gaps

```txt
frame source revision: absent
frame policy revision: absent
frame contract revision: absent
frame mesh revision: absent
frame GPU generation: absent
renderer snapshot cache decision: absent
first cache-revision frame acknowledgement: absent
```

## Readback and capture gaps

```txt
GameHost render-cache state: absent
editor cache-decision readback: absent
capture source revision: absent
capture contract revision: absent
capture mesh revision: absent
capture GPU generation: absent
capture visible-frame acknowledgement: absent
predecessor-versus-successor capture status: absent
```

## Proof gaps

```txt
color-only source mutation fixture
atmosphere mutation fixture
path detail mutation fixture
focal-tree geometry and material mutation fixture
runtime performance mutation fixture
grass and terrain palette mutation fixture
dynamic uniform-only reuse fixture
stale and duplicate revision fixture
contract preparation failure fixture
mesh preparation failure fixture
GPU buffer failure fixture
atomic rollback fixture
public readback parity fixture
capture and visible-frame correlation fixture
source/build/Pages parity fixture
```

## Preserved unresolved gaps

```txt
render-surface viewport authority
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

A cache that increments hit and rebuild counters is not a coherence authority. Completion requires complete dependency manifests, exhaustive fingerprints, typed rebuild decisions, prepared candidates, atomic adoption or rollback, revisioned readback/capture and executable first-visible-frame proof.