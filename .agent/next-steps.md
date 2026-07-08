# Next Steps — IntoTheMeadow

**Timestamp:** `2026-07-08T05:19:46-04:00`

## Goal

Move `IntoTheMeadow` from descriptor-rich prototype toward a visibly higher-fidelity meadow game without letting the publish repo become the permanent home for reusable renderer systems.

## Ordered next implementation ledges

### 1. Renderer descriptor-consumption parity gate

Target repo for reusable renderer work:

```txt
LuminaryLabs-Agents/NexusRealtime-ProtoKits
```

Target kit:

```txt
protokits/meadow-webgl-render-kit
```

Target proof in this publish repo:

```txt
LuminaryLabs-Publish/IntoTheMeadow
```

Add a renderer parity contract that can compare the enhanced render plan against the renderer snapshot.

Required fields:

```txt
expectedDescriptors
consumedDescriptors
unconsumedDescriptors
unsupportedReasons
grassDrawGroupsExpected
grassDrawGroupsRendered
postProcessPassesExpected
postProcessPassesExecuted
parityPassed
```

Acceptance:

```txt
- GameHost exposes render parity diagnostics.
- Unsupported descriptors are reported explicitly, not silently ignored.
- grassSystem.drawGroups are either rendered or listed as unconsumed.
- postProcess.passes are either executed or listed as unsupported.
- renderer snapshot names the descriptor versions it consumed.
```

### 2. Grass renderer consumption pass

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

### 3. Post-process and tree/framing consumption pass

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

### 4. Game repo renderer-contract fixture

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
- renderer parity report can be generated from enhanced plan plus renderer snapshot
```

### 5. Gameplay authority contract

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

### 6. Arrival meadow first playable loop

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

- [ ] Add renderer descriptor-consumption parity contract.
- [ ] Add GameHost render parity diagnostics.
- [ ] Update external `meadow-webgl-render-kit` to consume `grassSystem` descriptors.
- [ ] Replace individual primitive grass rendering with instanced clump patch rendering.
- [ ] Execute or explicitly report post-process pass descriptors.
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
- do not add more scattered decorative object metadata before renderer parity is fixed
- do not move generic renderer systems permanently into the publish repo
- do not break the current external kit import path
- do not remove fallback meadow-area support until external kit loading is fully guarded
- do not claim visual parity without a screenshot/browser validation pass
```
