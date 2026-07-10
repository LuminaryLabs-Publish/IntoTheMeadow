# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-10T15-18-29-04-00`

## Selection state

```txt
10 accessible LuminaryLabs-Publish repositories observed
TheCavalryOfRome excluded by rule
9 eligible repositories centrally tracked
sampled root .agent state present
IntoTheMeadow selected as oldest eligible documented fallback
```

## Mesh contribution gaps

```txt
buildMeadowMeshData has no per-stage contribution counters
source descriptor ids are not retained in mesh readback
attempted, consumed, skipped, and unsupported counts are absent
emitted vertex and triangle counts are not attributed by descriptor family
renderPlan.contract.descriptorCounts is copied into mesh.descriptorCounts
primitiveFallbackCount is hard-coded to 0
unsupported/fallback behavior cannot be proven from the returned snapshot
one combined mesh prevents downstream attribution unless construction records rows while building
```

## Grass proof gaps

```txt
grass density texture, static batches, patches, and draw groups are created and validated before rendering
the mesh builder iterates rendered grass descriptors without contribution rows
source patch/draw-group ids are not visible in renderer readback
estimatedGrassInstances and estimatedGrassCards are expectations, not measured mesh output
shader-wind and LOD descriptors are not reported as consumed, ignored, or unsupported
```

## Registry truth gaps

```txt
dsk-registry.json declares 44 local kits and one external kit
src/dsks/index.js marks requiredForV01 entries active-v0.1 by list membership
active descriptor status is not the same as an implementation-backed module
planned player/input/interaction/story/objective/audio/save and postprocess-pass families can look more complete than runtime source proves
no fixture reconciles registry ids, descriptor status, imported implementation modules, and runtime consumers
```

## GameHost/editor readback gaps

```txt
GameHost forwards aggregate render and enhancer snapshots only
NexusEditorEnvironment renderer.getSnapshot forwards the same aggregate snapshot
renderer.capture adds a data URL but no descriptor-consumption rows
editor command completion proves invocation, not semantic consumption
no stable observation row links editor action -> renderer snapshot -> mesh contribution ledger
```

## Gameplay gaps

```txt
advanceGameState only updates frame and lastTick
objectives and interaction targets remain content descriptors rather than an active player loop
no movement, target preflight, action result, or objective mutation runtime exists yet
these are valid later slices but should not be mixed into the mesh-proof implementation
```

## Validation gaps

```txt
existing renderer smoke proves schema acceptance and aggregate counts
existing editor smokes prove environment reachability
no fixture injects missing, empty, unsupported, or partially consumed descriptor families
no fixture verifies descriptor counts against measured emitted geometry
no fixture verifies registry active/planned truth against source-backed implementations
```

## Do not solve first

```txt
visual fidelity or asset expansion
camera and movement
new meadow content
renderer replacement or WebGPU cutover
external CDN migration
shared-kit promotion
postprocess expansion
editor command expansion
```

## Current ledge

```txt
IntoTheMeadow Mesh Contribution Ledger + Registry Truth Fixture Gate
```