# Next Steps — IntoTheMeadow

**Timestamp:** `2026-07-08T09:11:03-04:00`

## Goal

Move `IntoTheMeadow` from descriptor-rich prototype toward a fixture-proven meadow game without letting the publish repo become the permanent home for reusable renderer systems.

The immediate path is:

```txt
renderer parity proof
-> GameHost renderParity diagnostics
-> ActionFrame / ActionResult gameplay reducer gate
-> first objective loop proof
-> then visual/gameplay expansion
```

## Ordered next implementation ledges

### 1. Renderer Descriptor Consumption Parity Fixture Implementation

Target repo:

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

### 3. ActionFrame / ActionResult gameplay authority implementation

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

### 4. Package check integration

After the two fixtures exist, update `package.json`:

```txt
npm run check
  -> node tests/static-smoke.mjs
  -> node tests/dsk-registry-smoke.mjs
  -> node tests/render-plan-smoke.mjs
  -> node tests/deterministic-scene-smoke.mjs
  -> node tests/render-parity-fixture-smoke.mjs
  -> node tests/gameplay-authority-fixture-smoke.mjs
```

### 5. First playable objective loop

Implement only after renderer parity and action-result gates exist:

```txt
- minimal path-progress input source
- minimal inspect input source
- active objective HUD readout
- completed objective readout
- story beat progression display
```

Do not do this before fixture proof exists.

## Exact source order for next implementation pass

```txt
1. src/render-parity/render-parity-reasons.js
2. src/render-parity/collect-expected-render-descriptors.js
3. src/render-parity/normalize-renderer-snapshot-consumption.js
4. src/render-parity/compare-render-descriptor-parity.js
5. tests/render-parity-fixture-smoke.mjs
6. src/hosts/web-host.js renderParity projection
7. src/gameplay-authority/action-reasons.js
8. src/gameplay-authority/action-result.js
9. src/gameplay-authority/action-frame.js
10. src/gameplay-authority/resolve-objective-completion.js
11. src/gameplay-authority/reduce-path-progress.js
12. src/gameplay-authority/reduce-inspect-target.js
13. src/gameplay-authority/create-gameplay-snapshot.js
14. src/game/game-state.js optional actions
15. src/game/game-snapshot.js snapshot.gameplay
16. tests/gameplay-authority-fixture-smoke.mjs
17. package.json check command
18. npm run check
```

## Do not do next

```txt
- Do not add a new scene yet.
- Do not add real first-person movement yet.
- Do not add more grass metadata before parity is readable.
- Do not claim renderer parity without fixture output.
- Do not move modules into NexusEngine or ProtoKits until local proof is stable.
```
