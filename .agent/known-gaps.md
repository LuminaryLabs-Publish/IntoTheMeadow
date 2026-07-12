# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T02-38-23-04-00`

## Selection state

```txt
10 accessible Publish repositories observed
TheCavalryOfRome excluded
9 eligible repositories centrally tracked with root .agent state
TheOpenAbove skipped because repo-local state was newer than its central ledger during this run
IntoTheMeadow selected as the oldest stable eligible repository
only IntoTheMeadow changed in the Publish organization
```

## Current interaction and progression gaps

### Authored rules are inert

```txt
authored path objective: present
authored inspect objective: present
authored path target: present
authored tree target: present
authored arrival/path/tree story beats: present
runtime rule evaluator: absent
```

### Player state cannot advance

```txt
player starts at x:0 y:0 z:-36
pathProgress starts at 0
movement command: absent
movement result: absent
terrain-contact update: absent
path sampler: absent
path revision: absent
```

### Inspection is unreachable

```txt
inspect command: absent
registered-target admission: absent
proximity/line-of-sight policy: absent
inspection result: absent
inspect-state commit: absent
focal-tree story trigger: absent
```

### Objective and story transitions are absent

```txt
objective rule evaluation: absent
objective transition result: absent
completion ledger mutation: absent
active-objective advancement: absent
story trigger evaluation: absent
story transition result: absent
atomic objective/story commit: absent
progression revision: absent
```

### Product adapters do not expose gameplay actions

```txt
browser keyboard adapter: absent
browser pointer/touch adapter: absent
public command gateway: absent
editor movement capability: absent
editor path-progress capability: absent
editor inspect capability: absent
headless scenario progression command: absent
```

### Observation can mislead

Diagnostics report authored content counts, not executable reachability. Snapshots contain state but no command ID, interaction result, progression revision, objective transition, story transition or visible-frame receipt.

## Required progression fixtures

```txt
fixture:movement-finite-bounds
fixture:path-progress-spatial-sampling
fixture:path-progress-monotonicity
fixture:path-objective-threshold
fixture:inspect-target-admission
fixture:inspect-out-of-range-rejection
fixture:objective-story-atomic-commit
fixture:duplicate-command-idempotence
fixture:stale-session-scene-rejection
fixture:reset-progression-epoch
fixture:browser-editor-progression-parity
fixture:first-visible-progression-frame
smoke:browser-walk-and-inspect
smoke:pages-walk-and-inspect
```

## Retained deterministic-replay gaps

```txt
same-instance adjacent-read check only
production provider not covered
canonical-value policy absent
independent construction/replay absent
reset/cadence parity absent
first-divergence and visible-frame fingerprints absent
```

## Retained runtime and rendering gaps

```txt
RAF absolute time and fixed dt disagree
stop/start can duplicate scheduling state
raw GameHost exposes game authority
WebGL context generations and transactional restore absent
DPR/pixel budget and surface revision absent
committed state/plan/frame identity absent
fatal startup/frame recovery remains non-transactional
```

## Retained performance and persistence gaps

```txt
auto quality is static
complete terrain/grass/scatter/post budgets are not enforced
quality transition transactions and frame receipts are absent
save/load commands, schema, migration and hydration commit are absent
```

## Retained DSK truth gaps

```txt
declaration status is not runtime consumption proof
local implementations are not registry-bound
runtime consumers bypass registry lookup
reverse disposal is not registry-owned
```

## Completion boundary

Do not treat objective, target or story counts as playable progression. Completion requires admitted movement and inspection commands, authoritative spatial evidence, atomic objective/story commits, reset epoch fencing, browser/editor parity and a visible frame that cites the accepted progression result.
