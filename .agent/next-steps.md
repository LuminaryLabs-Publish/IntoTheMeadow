# Next Steps — IntoTheMeadow

**Timestamp:** `2026-07-08T02:00:12-04:00`

## Goal

Move `IntoTheMeadow` from descriptor-rich prototype toward a visibly higher-fidelity meadow game without letting the publish repo become the permanent home for reusable renderer systems.

## Ordered next implementation ledges

### 1. Renderer consumption pass

Target repo for reusable renderer work:

```txt
LuminaryLabs-Agents/NexusRealtime-ProtoKits
```

Target kit:

```txt
protokits/meadow-webgl-render-kit
```

Implement renderer support for:

```txt
- plan.grassSystem.staticBatches
- plan.grassSystem.patches
- plan.grassSystem.drawGroups
- plan.grassSystem.shaderWind
- plan.postProcess.passes
- plan.performance.budgets
- focal tree renderStyle metadata
```

Acceptance:

```txt
- old grass-blade object rendering is not the main grass path
- grass draws as reusable static clump batches with instancing
- patches cover the meadow as a dense field, not scattered individual props
- wind bends grass through shader uniforms
- post-process descriptors visibly affect final output
```

### 2. Game repo renderer-contract fixture

Target repo:

```txt
LuminaryLabs-Publish/IntoTheMeadow
```

Add a DOM-free fixture proving the enhanced render plan shape expected by the renderer:

```txt
- grassSystem exists
- densityTexture exists
- staticBatches exist
- patches exist
- drawGroups exist
- postProcess passes exist
- no grass-blade objects remain in enhanced objects
- stats include grassPatchCount, grassStaticBatchCount, grassDrawGroupCount, estimatedGrassInstances, estimatedGrassCards
```

### 3. Gameplay authority contract

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

### 4. Arrival meadow first playable loop

Implement the first real loop:

```txt
spawn in meadow
follow path progress
inspect focal tree
complete first arrival objective
trigger first story beat
expose completion in GameHost snapshot
```

### 5. Repo-local proof cadence

Every meaningful pass should update:

```txt
.agent/turn-ledger/<timestamp>.md
.agent/trackers/<timestamp>/project-breakdown.md
.agent/validation.md
LuminaryLabs-Dev/LuminaryLabs/internal-change-log/<timestamp>-into-the-meadow-*.md
```

## Checklist

- [ ] Update external `meadow-webgl-render-kit` to consume `grassSystem` descriptors.
- [ ] Replace individual primitive grass rendering with instanced clump patch rendering.
- [ ] Execute post-process pass descriptors in renderer.
- [ ] Add tree/framing-tree renderer support beyond primitive focal tree shapes.
- [ ] Add render-contract fixture in `IntoTheMeadow`.
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
- do not add more scattered decorative object metadata before renderer consumption is fixed
- do not move generic renderer systems permanently into the publish repo
- do not break the current external kit import path
- do not remove fallback meadow-area support until external kit loading is fully guarded
- do not claim visual parity without a screenshot/browser validation pass
```