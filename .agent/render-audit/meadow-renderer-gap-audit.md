# Render Audit — Meadow Renderer Gap

**Timestamp:** `2026-07-08T05:19:46-04:00`

## Current render handoff

`src/hosts/web-host.js` renders this frame loop:

```txt
game.tick({ time, dt })
rawPlan = game.getRenderPlan(time)
plan = enhanceRenderPlan(rawPlan)
renderer.render(plan)
```

The local game repo has a clean renderer-handoff seam.

The issue is not that `IntoTheMeadow` lacks render intent.

The issue is that the renderer must consume the enhanced plan as production visual systems, and the renderer snapshot must say what was consumed.

## Enhanced render plan adds

```txt
- filtered objects without grass-blade clutter
- grassSystem
- grassPatches
- windField
- postProcess
- performance
- stats.grassPatchCount
- stats.grassStaticBatchCount
- stats.grassDrawGroupCount
- stats.estimatedGrassInstances
- stats.estimatedGrassCards
```

## Renderer parity risk

If `meadow-webgl-render-kit` continues to render old object primitives, then the scene will remain visually simple even when the game plan contains high-fidelity grass, post-process, wind, and batching metadata.

A renderer can also partly consume the plan while silently ignoring the most important descriptors.

The next proof must separate these states:

```txt
consumed
unconsumed
unsupported
fallback-rendered
missing-from-plan
missing-from-snapshot
```

## Required renderer consumption

The external renderer should consume:

```txt
plan.grassSystem.densityTexture
plan.grassSystem.staticBatches
plan.grassSystem.patches
plan.grassSystem.drawGroups
plan.grassSystem.shaderWind
plan.grassSystem.lodPolicy
plan.postProcess.passes
plan.windField
plan.performance
object.renderStyle
```

## Required renderer snapshot fields

```txt
snapshot.renderParity.consumedDescriptors
snapshot.renderParity.unconsumedDescriptors
snapshot.renderParity.unsupportedReasons
snapshot.renderParity.grass.drawGroupsExpected
snapshot.renderParity.grass.drawGroupsRendered
snapshot.renderParity.grass.instancesExpected
snapshot.renderParity.grass.instancesRendered
snapshot.renderParity.postProcess.passesExpected
snapshot.renderParity.postProcess.passesExecuted
snapshot.renderParity.parityPassed
```

## Target render pipeline

```txt
meadow render plan
  -> terrain material pass
  -> path material pass
  -> tree/framing object system
  -> grass density texture sampling
  -> grass static batch instancing
  -> flower/rock/mushroom scatter render path
  -> wind uniform update
  -> scene color target
  -> outline/post-process passes
  -> final composite
  -> renderer parity snapshot
```

## Concrete renderer fixes needed

```txt
1. Stop treating grass as individual object primitives.
2. Render grass as reusable clump archetype batches.
3. Instance grass patches from plan.grassSystem.drawGroups.
4. Bind shader wind from plan.grassSystem.shaderWind.
5. Use density texture channels to drive patch density and path clearing.
6. Convert focal tree metadata into real tree silhouette/framing geometry.
7. Use renderStyle outline classes instead of one global cartoon outline.
8. Execute postProcess descriptors or report them unsupported.
9. Add renderer snapshot fields for grass draw calls, post passes, material tiers, and parity.
10. Add a browser screenshot proof after renderer cutover.
```

## Acceptance criteria

```txt
- grass appears as dense patch fields, not scattered blades
- path visibly cuts through grass density
- foreground/midground/background vegetation reads as one meadow system
- focal tree has believable silhouette mass, not a primitive symbol
- post-process visibly grades depth, edge, haze, and vignette or reports unsupported reasons
- GameHost render plan matches renderer snapshot counts
- GameHost diagnostics reports renderer parity pass/fail
```

## Ownership call

Reusable renderer implementation belongs in:

```txt
LuminaryLabs-Agents/NexusRealtime-ProtoKits/protokits/meadow-webgl-render-kit
```

`IntoTheMeadow` should keep only proof fixtures, diagnostics, and game-specific composition for this renderer contract.
