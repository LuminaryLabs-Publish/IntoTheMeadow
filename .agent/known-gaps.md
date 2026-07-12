# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-12T00-49-48-04-00`

## Selection state

```txt
10 accessible LuminaryLabs-Publish repositories observed
TheCavalryOfRome excluded by rule
9 eligible repositories centrally tracked with root .agent state
IntoTheMeadow selected as the oldest eligible central-ledger entry
only IntoTheMeadow changed in the Publish organization for this pass
```

## Current adaptive-quality gaps

### Auto is a static profile

`QUALITY_PROFILES.auto` is a fixed set of multipliers. No runtime sample window or adaptive decision changes it.

### Production quality is implicit

The arrival scene has no `style.performance` descriptor. `createMeadowPerformancePolicy()` therefore defaults to `high` without an admission result, revision or observation receipt.

### Performance sampling is absent

```txt
post-frame CPU sample: absent
GPU timing sample: absent
sample identity: absent
visibility and suspension classification: absent
elapsed-time performance window: absent
outlier policy: absent
bounded sample history: absent
```

### Adaptive decision policy is absent

```txt
degrade threshold: absent
recover threshold: absent
hysteresis: absent
cooldown: absent
minimum profile residency: absent
quality decision result: absent
manual override and auto-lock policy: absent
```

### Quality transition authority is absent

```txt
transition command and ID: absent
quality revision: absent
expected-revision admission: absent
session, renderer and surface fences: absent
consumer prepare/commit/rollback: absent
idempotent duplicate result: absent
stale transition rejection: absent
bounded transition journal: absent
```

### Enhancer cache ignores quality

`createRenderPlanEnhancer()` caches by source topology only. Quality profile, budget overrides, terrain resolution, post policy, surface policy and quality revision do not participate in cache identity.

A quality-only change can therefore reuse the predecessor plan indefinitely.

### Grass budget is not enforced

The policy computes `maxGrassInstances`, but grass placement receives only a quality scale. Patch creation has no global reservation ledger and can exceed the declared total.

### Scatter budget is incomplete

```txt
maxFlowerObjects: applied by source-order filtering
maxTreeLineObjects: applied by source-order filtering
maxSmallScatterObjects: unused
mushroom ceiling: hard-coded to 14 outside policy
rock ceiling: no performance-policy enforcement
stable priority and dropped-work result: absent
```

### Terrain quality binding is absent

Profiles declare `terrainResolution`, but the enhancer hard-codes terrain segments to `96 x 124`.

### Post-process quality binding is absent

Profiles declare `postProcess`, but stack construction is driven separately by scene configuration. The renderer always submits an outline pass and a color/fog pass.

### Surface quality binding is absent

The renderer independently clamps device pixel ratio from 1 through 2. No profile owns DPR, drawing-buffer pixel ceiling or surface revision.

### Performance validation is not consumed

The enhancer does not call `performance.validate()`. An unknown quality label can retain that label while profile lookup and grass scaling silently fall back to `high`.

### Quality observation is incomplete

```txt
quality profile version: absent from renderer snapshot
quality revision: absent
quality fingerprint: absent
budget ledger and violations: absent
consumer effective settings: absent
transition result: absent
first visible quality-frame receipt: absent
GameHost/editor/headless parity proof: absent
```

## Missing adaptive-quality fixtures

```txt
profile schema fixture
unknown profile fixture
quality fingerprint fixture
performance-window fixture
30/60/120 Hz cadence-parity fixture
visibility and suspension fixture
hysteresis and cooldown fixture
complete budget-allocation fixture
grass hard-ceiling fixture
scatter hard-ceiling fixture
terrain-resolution binding fixture
post-process draw-binding fixture
surface pixel-budget fixture
quality-aware cache invalidation fixture
transition idempotency and stale fixture
consumer preparation failure fixture
rollback fixture
context-loss transition fixture
browser degrade/recovery smoke
first visible quality-frame fixture
Pages degrade/recovery smoke
```

## Retained persistence gaps

```txt
meadow-save-dsk remains a planned declaration
browser boot always starts fresh
reset silently discards state
save schema, slot registry and checkpoint identity absent
save/load commands absent from all public adapters
candidate admission, migration and reconciliation absent
hydration commit and rollback absent
storage failure classification absent
first visible hydrated-frame receipt absent
reload continuity fixtures absent
```

## Retained render-surface gaps

```txt
DPR policy remains a hard-coded 1 through 2 clamp
pixel and WebGL surface budgets are absent
resize commands and surface revisions are absent
actual drawing-buffer readback is absent
fallback and rollback are absent
renderer, viewport, capture and visible frame lack one surface identity
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

A successful page load can conceal a static high-quality plan, ignored profile fields, unenforced budgets and a quality-blind cache. Do not claim adaptive quality until elapsed-time evidence drives a typed transition, every consumer honors the admitted budget, failure preserves the predecessor and the first visible frame cites the committed quality revision.
