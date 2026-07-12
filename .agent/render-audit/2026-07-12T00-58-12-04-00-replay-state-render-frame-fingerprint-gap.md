# Replay State / Render / Frame Fingerprint Gap

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-12T00-58-12-04-00`

## Goal

Make deterministic proof extend through the enhanced render plan and first visible frame instead of stopping at two adjacent game snapshots.

## Current evidence path

```txt
create one fallback-backed game
  -> getSnapshot()
  -> snapshot includes base render plan at time 0
  -> stringify
  -> getSnapshot() again without mutation
  -> stringify
  -> compare
```

The renderer, enhancer, GPU resources, committed frame, browser capture and production external provider are outside this comparison.

## Gaps

```txt
render-plan fingerprint: absent
enhanced-plan fingerprint: absent
quality/profile identity: absent
provider fingerprint: absent
renderer resource generation: absent
committed frame ID: absent
visible frame fingerprint: absent
capture fingerprint: absent
state-to-plan correlation: absent
plan-to-frame correlation: absent
first divergent descriptor path: absent
```

`render-plan-smoke.mjs` separately proves that time-only updates preserve the topology key and reuse the enhancer cache. It does not compare independent builds or prove that identical state produces identical enhanced descriptors and visible output.

## Required render proof

```txt
independent runtime A and B
  -> same admitted provider, content, seed and scenario
  -> same committed state fingerprint
  -> same source-plan fingerprint
  -> same enhanced-plan fingerprint
  -> same topology identity
  -> same effective quality fingerprint
  -> same renderer observation
  -> same first visible frame identity
```

## Failure classification

```txt
state divergence
source-plan divergence
enhancer divergence
quality-policy divergence
resource-generation divergence
draw-observation divergence
visible-frame divergence
capture divergence
```

## Required observation fields

```txt
replayRunId
scenarioId
committedTickId
stateFingerprint
providerFingerprint
sourcePlanFingerprint
enhancedPlanFingerprint
topologyKey
qualityFingerprint
rendererGeneration
committedFrameId
visibleFrameFingerprint
captureFingerprint
```

## Completion boundary

A stable topology key or repeated unchanged snapshot is not rendered determinism. Completion requires independent replay evidence from admitted state through the first visible frame, with an exact divergence report when any stage disagrees.