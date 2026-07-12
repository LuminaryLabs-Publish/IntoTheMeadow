# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-12T00-58-12-04-00`

## Selection state

```txt
10 accessible LuminaryLabs-Publish repositories observed
TheCavalryOfRome excluded by rule
9 eligible repositories centrally tracked with root .agent state
IntoTheMeadow selected because newer repo-local work required reconciliation
only IntoTheMeadow changed in the Publish organization for this pass
```

## Current deterministic-replay gaps

### Determinism check is a same-instance read check

`deterministic-scene-smoke.mjs` constructs one game, performs no tick or reset, and compares two immediate `game.getSnapshot()` reads.

```txt
independent construction: absent
second provider instance: absent
second game instance: absent
shared-state detection: absent
constructor-order variation: absent
```

### Production provider is not exercised

The smoke calls `createIntoTheMeadowGame()` without `externalKits`, so the local fallback provider is selected. The commit-pinned external provider used by browser production is outside the deterministic gate.

```txt
provider ID/version admission: absent
provider fingerprint: absent
fallback/external parity classification: absent
production-provider replay fixture: absent
```

### Simulation replay is absent

```txt
sequenced commands: absent
normalized tick schedule: absent
intermediate checkpoints: absent
reset replay: absent
stop/start replay: absent
30/60/120 Hz committed-tick parity: absent
objective/story replay: absent
```

### Canonical-value policy is absent

`stableStringify()` sorts object keys but does not reject or tag unsupported JavaScript values.

```txt
NaN/Infinity policy: absent
-0 policy: absent
undefined policy: absent
sparse-array policy: absent
Date/Map/Set policy: absent
typed-value tags: absent
cycle rejection result: absent
accessor/getter policy: absent
schema and serializer version: absent
```

### Fingerprints are absent

```txt
provider fingerprint: absent
seed fingerprint: absent
content fingerprint: absent
scenario fingerprint: absent
state checkpoint fingerprint: absent
objective/story fingerprint: absent
source render-plan fingerprint: absent
enhanced render-plan fingerprint: absent
visible-frame fingerprint: absent
```

### Divergence reporting is absent

The validator returns a Boolean and one generic failure string.

```txt
replay run ID: absent
checkpoint ID: absent
committed tick ID: absent
domain/path: absent
left/right fingerprints: absent
classification: absent
bounded evidence journal: absent
```

### Browser/headless/frame proof is absent

```txt
browser replay command: absent
headless replay command: absent
shared replay result schema: absent
renderer replay identity: absent
first visible replay-frame acknowledgement: absent
capture replay identity: absent
Pages replay smoke: absent
```

## Missing deterministic-replay fixtures

```txt
canonical-value fixture
independent fallback construction fixture
independent external-provider construction fixture
fallback/external parity fixture
same-seed replay fixture
changed-seed negative control
changed-provider negative control
changed-command-order negative control
tick-sequence checkpoint fixture
reset-and-replay fixture
stop/start replay fixture
30/60/120 Hz cadence-parity fixture
browser/headless parity fixture
first-divergence fixture
state/render/frame correlation fixture
visible replay-frame browser smoke
Pages replay smoke
```

## Retained adaptive-quality gaps

```txt
auto remains a static profile
frame/GPU sampling absent
hysteresis, cooldown and minimum residency absent
quality transition command/revision/result absent
quality-aware cache identity absent
maxGrassInstances not globally enforced
maxSmallScatterObjects unused
terrainResolution not bound to terrain topology
postProcess not bound to actual pass submission
surface/DPR budget not owned by quality
consumer prepare/commit/rollback absent
first visible quality-frame receipt absent
```

## Retained persistence gaps

```txt
meadow-save-dsk remains a planned declaration
browser boot always starts fresh
reset silently discards state
save schema, slot registry and checkpoint identity absent
save/load commands absent from public adapters
candidate admission, migration and reconciliation absent
hydration commit and rollback absent
first visible hydrated-frame receipt absent
```

## Retained runtime and rendering gaps

```txt
RAF absolute time and fixed dt disagree
stop/start can retain or duplicate scheduling state
clock revisions and typed step results absent
WebGL context generations and transactional restore absent
DPR/pixel budget and surface revision absent
committed state/plan/frame identity absent
fatal startup/frame recovery remains non-transactional
```

## Retained DSK and capability gaps

```txt
declaration status is not runtime consumption proof
local implementations are not registry-bound
runtime consumers bypass registry lookup
reverse disposal is not registry-owned
GameHost exposes raw game authority
session/lifecycle fences and fatal capability quarantine absent
public observations are not revisioned
```

## Retained interaction and progression gaps

```txt
path-progress and inspect commands absent
player path progress remains zero
objective completion and story transitions absent
browser/editor interaction parity absent
committed-frame progression acknowledgement absent
```

## Completion boundary

Do not close deterministic validation because repeated reads are equal. Completion requires canonical admission, independent runtime replay, production-provider coverage, reset/cadence parity, exact first divergence and state/render/visible-frame correlation.