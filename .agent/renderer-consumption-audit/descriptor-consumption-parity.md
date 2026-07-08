# Renderer Consumption Audit — Descriptor Consumption Parity

**Timestamp:** `2026-07-08T05:19:46-04:00`

## Purpose

This audit narrows the next safe implementation pass to renderer descriptor-consumption parity.

The game now emits enough high-fidelity meadow intent. The next proof is not more meadow metadata. The next proof is whether the external renderer consumes the metadata.

## Current handoff

```txt
src/hosts/web-host.js
  -> rawPlan = game.getRenderPlan(time)
  -> plan = enhanceRenderPlan(rawPlan)
  -> renderer.render(plan)
  -> GameHost snapshot exposes enhancedRenderPlan and renderer snapshot
```

## Descriptors to compare

```txt
plan.grassSystem.densityTexture
plan.grassSystem.staticBatches
plan.grassSystem.patches
plan.grassSystem.drawGroups
plan.grassSystem.shaderWind
plan.grassSystem.lodPolicy
plan.windField
plan.postProcess.passes
plan.performance.budgets
object.renderStyle
plan.stats.grassPatchCount
plan.stats.grassDrawGroupCount
plan.stats.estimatedGrassInstances
plan.stats.estimatedGrassCards
```

## Required parity result shape

```txt
RenderDescriptorParityResult
  id
  passed
  checkedAtFrame
  consumedDescriptors[]
  unconsumedDescriptors[]
  unsupportedDescriptors[]
  missingPlanDescriptors[]
  missingSnapshotFields[]
  grass
    drawGroupsExpected
    drawGroupsRendered
    instancesExpected
    instancesRendered
    cardsExpected
    cardsRendered
  postProcess
    passesExpected
    passesExecuted
    unsupportedPasses[]
  reasons[]
```

## Reason catalog

```txt
renderer-snapshot-missing
renderer-does-not-report-parity
plan-descriptor-missing
snapshot-field-missing
descriptor-unimplemented
renderer-fallback-used
post-process-unsupported
grass-instancing-unsupported
wind-uniform-unsupported
render-style-unsupported
count-mismatch
accepted
```

## Fixture matrix

```txt
case-01: enhanced plan has grassSystem and renderer snapshot reports matching grass draw groups
case-02: enhanced plan has grassSystem but renderer snapshot lacks grass fields
case-03: enhanced plan has postProcess passes and renderer reports all executed
case-04: enhanced plan has postProcess passes and renderer reports unsupported passes
case-05: enhanced plan has renderStyle metadata and renderer reports style tiers consumed
case-06: enhanced plan has renderStyle metadata and renderer ignores it
case-07: enhanced plan has windField and renderer reports wind uniforms bound
case-08: enhanced plan has grass counts but renderer count mismatches
case-09: enhanced plan lacks optional descriptor and parity reports missing-plan-descriptor
case-10: renderer snapshot lacks parity shape and result reports renderer-does-not-report-parity
```

## Implementation boundary

Publish repo may add:

```txt
- DOM-free parity fixture
- parity result contract
- expected descriptor collector
- snapshot comparator
- GameHost diagnostic projection
```

Reusable renderer changes belong in:

```txt
LuminaryLabs-Agents/NexusRealtime-ProtoKits/protokits/meadow-webgl-render-kit
```

## Do not expand before this passes

```txt
- new meadow content
- more flower/tree metadata
- first-person movement
- save/load
- audio
- new gameplay objectives
```

Renderer parity must be visible before visual expansion can be trusted.
