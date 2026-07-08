# Next Steps — IntoTheMeadow

**Timestamp:** `2026-07-08T07:41:52-04:00`

## Goal

Move `IntoTheMeadow` from descriptor-rich prototype toward a visibly higher-fidelity meadow game without letting the publish repo become the permanent home for reusable renderer systems.

The immediate path is:

```txt
renderer parity proof
-> GameHost renderParity diagnostics
-> ActionFrame / ActionResult gameplay reducer gate
-> first objective loop proof
-> then visual/gameplay expansion
```

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

### 3. ActionFrame / ActionResult gameplay authority gate

Keep current ticking valid:

```txt
game.tick({ time, dt })
```

Add optional gameplay action input:

```txt
game.tick({ time, dt, actions })
```

Required modules:

```txt
src/gameplay-authority/action-frame.js
src/gameplay-authority/action-result.js
src/gameplay-authority/action-reasons.js
src/gameplay-authority/reduce-path-progress.js
src/gameplay-authority/reduce-inspect-target.js
src/gameplay-authority/resolve-objective-completion.js
src/gameplay-authority/create-gameplay-snapshot.js
tests/gameplay-authority-fixture-smoke.mjs
```

Required result fields:

```txt
ActionResult
  id
  actionId
  actionType
  targetId
  accepted
  reason
  stateDelta
  objectiveDelta
  storyDelta
  diagnostics
```

Acceptance:

```txt
- Existing game.tick({ time, dt }) behavior still increments frame and records lastTick.
- game.tick({ time, dt, actions }) accepts path-progress and inspect action arrays.
- path-progress can complete walk-the-path only when progressAtLeast >= 0.35.
- inspect can complete inspect-tree only for focal-tree.
- unknown targets return stable unknown-target reason.
- unknown action types return stable unknown-action-type reason.
- repeated objective completion does not duplicate completedObjectiveIds.
- snapshot.gameplay exposes active objective, completed objectives, story beats, player pathProgress, actionJournal, and lastActionResults.
```

### 4. First playable objective loop

Implement only after renderer parity and action-result gates exist:

```txt
spawn in meadow
-> follow path progress
-> complete walk-the-path
-> inspect focal tree
-> complete inspect-tree
-> trigger first story beat update
-> expose completion in GameHost snapshot
```

### 5. Renderer descriptor-consumption parity gate in ProtoKits

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

### 6. Grass renderer consumption pass

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

### 7. Post-process and tree/framing consumption pass

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

## Checklist

- [ ] Add renderer parity fixture matrix modules.
- [ ] Add renderer parity fixture smoke test.
- [ ] Add GameHost render parity diagnostics.
- [ ] Keep `game.tick({ time, dt })` backward compatible.
- [ ] Add optional `game.tick({ time, dt, actions })` input.
- [ ] Add `ActionFrame`, `ActionBatch`, and `ActionResult` modules.
- [ ] Add stable action rejection reason catalog.
- [ ] Add path progress reducer.
- [ ] Add focal-tree inspect reducer.
- [ ] Add objective completion resolver.
- [ ] Add `snapshot.gameplay`.
- [ ] Add GameHost gameplay diagnostics.
- [ ] Add gameplay replay fixture smoke test.
- [ ] Update external `meadow-webgl-render-kit` to report descriptor consumption.
- [ ] Replace individual primitive grass rendering with instanced clump patch rendering.
- [ ] Execute or explicitly report post-process pass descriptors.
- [ ] Add tree/framing-tree renderer support beyond primitive focal tree shapes.
- [ ] Promote reusable renderer improvements back to ProtoKits.
- [ ] Keep public route loading from `index.html`.
- [ ] Keep `npm run check` passing.

## Do not do next

```txt
- do not add more scattered decorative object metadata before renderer parity is fixed
- do not add more story scenes before ActionResult and replay fixture exist
- do not move generic renderer systems permanently into the publish repo
- do not break the current external kit import path
- do not remove fallback meadow-area support until external kit loading is fully guarded
- do not claim visual parity without a screenshot/browser validation pass
```