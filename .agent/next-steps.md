# Next Steps — IntoTheMeadow

**Timestamp:** `2026-07-08T06:10:03-04:00`

## Goal

Move `IntoTheMeadow` from descriptor-rich prototype toward a visibly higher-fidelity meadow game without letting the publish repo become the permanent home for reusable renderer systems.

## Ordered next implementation ledges

### 1. Renderer Descriptor Consumption Parity Fixture Matrix

Target proof in this publish repo:

```txt
LuminaryLabs-Publish/IntoTheMeadow
```

Add a DOM-free parity fixture that compares the enhanced render plan against renderer snapshot consumption.

Required modules:

```txt
src/render-parity/collect-expected-render-descriptors.js
src/render-parity/normalize-renderer-snapshot-consumption.js
src/render-parity/compare-render-descriptor-parity.js
src/render-parity/render-parity-reasons.js
tests/render-parity-fixture-smoke.mjs
```

Required result fields:

```txt
expectedDescriptors
consumedDescriptors
unconsumedDescriptors
unsupportedDescriptors
missingPlanDescriptors
missingSnapshotFields
fallbackDescriptors
grass.drawGroupsExpected
grass.drawGroupsRendered
grass.instancesExpected
grass.instancesRendered
grass.cardsExpected
grass.cardsRendered
postProcess.passesExpected
postProcess.passesExecuted
postProcess.unsupportedPasses
wind.windUniformsBound
renderStyle.styledObjectsConsumed
parityPassed
reasons
```

Acceptance:

```txt
- Fixture passes all-descriptors-consumed positive case.
- Fixture fails renderer-snapshot-missing case with stable reason.
- Fixture fails renderer-does-not-report-parity case with stable reason.
- Fixture reports unconsumed grass draw groups.
- Fixture reports grass count mismatches.
- Fixture reports unsupported post-process passes.
- Fixture reports unsupported wind uniforms.
- Fixture reports unconsumed renderStyle tiers.
- Fixture handles optional absent descriptors without false failure.
- Fixture reports fallback renderer use.
```

### 2. GameHost render parity diagnostics

Project the fixture result into:

```txt
GameHost.getDiagnostics().renderParity
GameHost.getSnapshot().renderParity
```

Acceptance:

```txt
- GameHost remains backward compatible.
- GameHost.getState() still works.
- GameHost.getSnapshot().enhancedRenderPlan still exists.
- GameHost.getSnapshot().render still exists.
- renderParity appears only after a render snapshot exists or reports missing snapshot clearly.
```

### 3. Renderer descriptor-consumption parity gate

Target repo for reusable renderer work:

```txt
LuminaryLabs-Agents/NexusRealtime-ProtoKits
```

Target kit:

```txt
protokits/meadow-webgl-render-kit
```

Update the renderer snapshot so it can report descriptor consumption.

Acceptance:

```txt
- Renderer snapshot names descriptor versions it consumed.
- Unsupported descriptors are reported explicitly, not silently ignored.
- grassSystem.drawGroups are either rendered or listed as unconsumed.
- postProcess.passes are either executed or listed as unsupported.
```

### 4. Grass renderer consumption pass

Implement renderer support for:

```txt
- plan.grassSystem.densityTexture
- plan.grassSystem.staticBatches
- plan.grassSystem.patches
- plan.grassSystem.drawGroups
- plan.grassSystem.shaderWind
- plan.grassSystem.lodPolicy
```

Acceptance:

```txt
- old grass-blade object rendering is not the main grass path
- grass draws as reusable static clump batches with instancing
- patches cover the meadow as a dense field, not scattered individual props
- wind bends grass through shader uniforms
- renderer snapshot reports draw group counts
```

### 5. Post-process and tree/framing consumption pass

Implement or explicitly report:

```txt
- plan.postProcess.passes
- plan.performance.budgets
- focal tree renderStyle metadata
- tree-line object renderStyle metadata
- outline policy tiers
```

Acceptance:

```txt
- post-process descriptors visibly affect final output or are reported unsupported
- focal tree no longer reads as a primitive symbol
- object outline weights are tiered by renderStyle
```

### 6. Gameplay authority contract

Add optional action input without breaking current frame ticking:

```txt
game.tick({ time, dt })
game.tick({ time, dt, actions })
```

Define and test:

```txt
ActionFrame
ActionBatch
ActionResult
ReducerResult
stable rejection reasons
reducer journal
snapshot.gameplay
```

### 7. Arrival meadow first playable loop

Implement the first real loop after renderer parity is proven:

```txt
spawn in meadow
follow path progress
inspect focal tree
complete first arrival objective
trigger first story beat
expose completion in GameHost snapshot
```

## Checklist

- [ ] Add renderer parity fixture matrix modules.
- [ ] Add renderer parity fixture smoke test.
- [ ] Add GameHost render parity diagnostics.
- [ ] Update external `meadow-webgl-render-kit` to report descriptor consumption.
- [ ] Replace individual primitive grass rendering with instanced clump patch rendering.
- [ ] Execute or explicitly report post-process pass descriptors.
- [ ] Add tree/framing-tree renderer support beyond primitive focal tree shapes.
- [ ] Add action/result contract kits or local runtime equivalents.
- [ ] Add path progress reducer.
- [ ] Add focal-tree inspect reducer.
- [ ] Add story/objective reducer integration.
- [ ] Add `snapshot.gameplay`.
- [ ] Add GameHost gameplay diagnostics.
- [ ] Promote reusable renderer improvements back to ProtoKits.
- [ ] Keep public route loading from `index.html`.
- [ ] Keep `npm run check` passing.

## Do not do next

```txt
- do not add more scattered decorative object metadata before renderer parity is fixed
- do not move generic renderer systems permanently into the publish repo
- do not break the current external kit import path
- do not remove fallback meadow-area support until external kit loading is fully guarded
- do not claim visual parity without a screenshot/browser validation pass
```
