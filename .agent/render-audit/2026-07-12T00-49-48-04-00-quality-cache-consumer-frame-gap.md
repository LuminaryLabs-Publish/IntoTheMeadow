# Quality Cache, Consumer and Visible-Frame Gap

**Timestamp:** `2026-07-12T00-49-48-04-00`

## Goal

Prove which quality profile and budget set produced the render plan, GPU topology and first visible frame.

## Current render path

```txt
arrival scene
  -> no style.performance object
  -> performance policy defaults to high
  -> enhancer builds one contracted plan
  -> enhancer caches by sourceTopologyKey
  -> WebGL renderer caches by plan.contract.topologyKey
  -> renderer resizes from DPR
  -> outline draw
  -> color and inline-fog draw
  -> renderer snapshot
```

## Quality-blind enhancer cache

`createRenderPlanEnhancer()` rebuilds only when `sourceTopologyKey(renderPlan)` changes. Performance inputs are passed only during rebuild and are not part of the key.

Consequences:

```txt
quality high -> low with same source plan
  enhancer cache hit
  prior terrain, grass, scatter and outline topology retained
  no quality transition result

budget override change with same source plan
  enhancer cache hit
  prior object and grass counts retained

post-process policy change with same source plan
  enhancer cache hit
  prior descriptor retained
```

## Consumer-binding gaps

### Terrain

The performance profile declares `terrainResolution`, but `tuneContractedPlan()` hard-codes:

```txt
xSegments: 96
zSegments: 124
```

No profile-to-resolution mapping or budget result exists.

### Grass

The policy calculates `maxGrassInstances`, but grass creation receives only a quality-derived density scale. The patch grid has no global reservation ledger and can neither report nor enforce the declared maximum.

### Scatter

Flowers and tree-line objects are filtered by source encounter order. `maxSmallScatterObjects` is unused, and mushroom count is governed by a local constant rather than the performance policy.

### Post-processing

The profile declares `postProcess`, but the stack is created from scene post-process configuration. The current renderer reports `inline-cel-fog` and submits both outline and color/fog draws regardless of profile.

### Surface resolution

Renderer DPR is clamped independently to 1 through 2. Quality profiles do not own surface ratio, pixel budget or drawing-buffer dimensions.

## Missing render identity

The following values are absent from the committed render observation:

```txt
qualityTransitionId
qualityRevision
qualityProfileId
qualityProfileVersion
qualityFingerprint
budgetLedgerFingerprint
terrainResolutionDecision
postProcessDecision
surfaceResolutionDecision
consumerPrepareResults
consumerCommitResults
firstVisibleQualityFrameId
```

## Required render transaction

```txt
admitted quality transition
  -> canonical consumer plan
  -> explicit terrain, grass, scatter, post and surface budgets
  -> quality fingerprint
  -> detached render-plan candidate
  -> topology and resource preparation
  -> validation of every consumer result
  -> atomic plan/cache/resource commit
  -> draw first quality frame
  -> renderer and consumer acknowledgements
  -> publish immutable visible-frame receipt
  -> retire replaced resources
```

## Required render fixtures

```txt
profile matrix produces expected terrain, grass, scatter, post and surface decisions
quality-only changes produce a new quality fingerprint and topology key
same quality revision reuses enhancer and renderer caches
low profile disables the declared expensive passes in actual draw submission
budget ceilings hold for adversarially dense source plans
failed buffer or shader preparation leaves the prior frame authoritative
renderer snapshot, capture and visible frame cite one quality revision
context loss during transition rejects or retries without mixed generations
```

## Current validation state

```txt
source inspection: complete
runtime render change: none
GPU fixture: absent
quality transition browser smoke: absent
first visible quality-frame proof: absent
```
