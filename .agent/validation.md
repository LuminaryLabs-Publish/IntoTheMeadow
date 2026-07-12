# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-12T00-49-48-04-00`

## Plan ledger

**Goal:** distinguish static quality profiles and readable render statistics from executable proof that quality decisions are cadence-independent, budgets are complete, transitions are atomic and the committed profile reaches a visible frame.

- [x] Review the complete accessible Publish inventory.
- [x] Compare every eligible repository with central tracking.
- [x] Verify central and root `.agent` coverage.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `IntoTheMeadow` as the oldest eligible central-ledger entry.
- [x] Inspect the required-v0.1 DSK registry and performance descriptor.
- [x] Inspect the production scene performance input.
- [x] Inspect enhancer cache identity and quality consumption.
- [x] Inspect grass, scatter, terrain and post-process consumers.
- [x] Inspect renderer DPR, draw submission and snapshot shape.
- [x] Inspect the browser frame loop and current package validation scripts.
- [x] Document sampling, decision, budget, transition, rollback and visible-frame proof requirements.
- [x] Change documentation only.
- [ ] Execute fixtures after implementation exists.

## Source inspection completed

```txt
external declared kits: 1
local declared kits: 43
total declared kits: 44
required-v0.1 local kits: 15
performance DSK required-v0.1: yes
named quality profiles: 5
runtime performance sample types: 0
elapsed-time performance windows: 0
adaptive decision results: 0
quality transition commands: 0
quality transition results: 0
quality revisions: 0
quality fingerprints: 0
performance budget ledgers: 0
first visible quality-frame receipts: 0
adaptive-quality fixture commands: 0
```

## Proven from source

```txt
meadow-performance-dsk defines low, medium, high, ultra and auto
all five profiles are static objects
arrival-meadow supplies no style.performance object
policy default quality is high
web host supplies no runtime performance input to the enhancer
enhancer cache identity is sourceTopologyKey only
maxFlowerObjects limits wildflowers by source order
maxTreeLineObjects limits tree-line objects by source order
maxGrassInstances is calculated but not passed as a global ceiling
maxSmallScatterObjects is calculated but not consumed
mushroom limit is hard-coded to 14
terrain topology is hard-coded to 96 x 124
profile.terrainResolution is not consumed
profile.postProcess is not consumed
renderer independently clamps DPR between 1 and 2
renderer always submits outline and color/fog draws
enhancer does not call performance.validate()
renderer snapshot has no quality revision or fingerprint
npm run check has no adaptive-quality fixture
```

## Existing proof

Current checks prove:

```txt
required files exist
DSK descriptors validate structurally
render-plan descriptors validate
CPU mesh data is internally aligned
static topology remains stable across time changes
renderer can draw the current plan
headless-editor runtime and existing command surfaces operate
```

Current checks do not prove:

```txt
valid profile schema admission
unknown profile rejection
frame-cost sampling
elapsed-time decision windows
cadence parity
hysteresis or cooldown
visibility and suspension handling
complete budget allocation and enforcement
terrain-resolution profile binding
post-process and actual draw binding
surface/DPR profile binding
quality-aware cache invalidation
transition idempotency or stale rejection
consumer prepare/commit/rollback
context-loss behavior during transition
browser/headless quality observation parity
first visible quality-frame correlation
Pages degrade and recovery behavior
```

## Execution status

```txt
runtime source changed: no
performance source changed: no
renderer source changed: no
package scripts changed: no
dependencies changed: no
render output changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check executed: no
browser performance smoke executed: no
adaptive-quality fixtures available: no
```

## Required profile fixture

```txt
validate all canonical profile fields and ranges
reject unknown profile names
reject unsupported consumer requirements
compute deterministic profile and quality fingerprints
prove the same canonical profile produces the same fingerprint
prove profile version changes alter compatibility identity
```

## Required performance-window fixture

```txt
feed monotonic CPU and optional GPU samples
classify invalid, hidden, suspended and context-lost frames
use elapsed duration rather than sample count
produce the same decision for equivalent 30, 60 and 120 Hz traces
require declared sustained evidence before degrade or recovery
prove hysteresis and cooldown prevent threshold thrashing
bound retained sample history
```

## Required budget fixture

Construct an adversarially dense source plan.

Acceptance assertions:

```txt
all consumers reserve before topology generation
grass instances and cards remain within admitted totals
flowers, mushrooms, rocks, tree line and small scatter remain within totals
terrain vertices and triangles match the admitted resolution policy
post-process pass and draw counts match the admitted profile
drawing-buffer pixels and DPR remain within the admitted surface policy
dropped work and remaining budget are reported
no consumer silently ignores a required profile field
```

## Required cache fixture

```txt
same source and same quality revision produce cache hits
same source with a new quality revision rebuilds enhancer exactly once
renderer topology changes exactly once when required
quality change without topology change still updates effective-quality observation
stale predecessor plans cannot replace the successor
quality fingerprint appears in plan, renderer and capture observations
```

## Required transition fixture

```txt
commit a baseline quality and visible frame
admit a transition against session, renderer, surface and expected quality revision
allocate a complete budget ledger
prepare detached plan and resource candidates
validate every consumer result
commit one successor quality revision
wait for first visible quality frame
assert plan, renderer, GameHost, editor and frame share identity
inject failure before and after resource preparation
assert the predecessor plan and frame remain authoritative or rollback succeeds
return one typed transition result and bounded journal row
```

## Required browser matrix

```txt
manual high-to-low transition
auto slow-trace degradation
auto fast-trace recovery
alternating threshold trace
hidden-tab interval
manual quality lock and release
invalid profile
invalid budget override
duplicate transition
stale expected revision
shader preparation failure
buffer preparation failure
WebGL context loss during transition
stop/start during sampling
pagehide/pageshow during sampling
```

For every successful transition assert:

```txt
transition ID and quality revision
requested and effective profile
quality and budget fingerprints
terrain, grass, scatter, post and surface settings
enhancer and renderer rebuild counts
renderer generation and surface revision
committed visible frame ID
capture and editor observation identity
```

## Required browser smoke

```txt
boot and wait for initial committed frame
observe explicit effective high-quality result
feed deterministic slow trace through supported test capability
observe admitted degradation and committed low-quality frame
verify all effective consumer settings and budgets
feed deterministic recovery trace
observe committed recovered frame
inject one candidate failure and verify predecessor ownership
assert no duplicate RAF or sampler work
assert no unbounded buffer or journal growth
```

## Future commands

```bash
npm run fixture:performance-profiles
npm run fixture:performance-window
npm run fixture:performance-cadence
npm run fixture:performance-budgets
npm run fixture:quality-cache
npm run fixture:quality-transition
npm run fixture:quality-rollback
npm run smoke:quality-browser
npm run smoke:quality-pages
npm run check
```

## Completion boundary

Do not claim adaptive quality because `auto` exists or a static profile changes object counts. Completion requires cadence-independent evidence, full consumer budget enforcement, transactional transition and rollback, and a first visible frame that cites the committed quality revision and fingerprint.
