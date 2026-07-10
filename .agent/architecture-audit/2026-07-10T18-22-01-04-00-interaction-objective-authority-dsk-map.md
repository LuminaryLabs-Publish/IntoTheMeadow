# Interaction and Objective Authority DSK Map

**Timestamp:** `2026-07-10T18-22-01-04-00`

## Current composition

```txt
web-host-dsk
  -> external meadow-area-kit
  -> game-composition-dsk
       -> static frame/time state
       -> story/objective/target content arrays
       -> no command reducer
  -> meadow-render-plan-enhancer-v2
  -> meadow-mesh-builder-v2
  -> meadow-webgl-renderer-v2
  -> GameHost diagnostics
  -> NexusEditorEnvironment
```

## Active implementation-backed domains

```txt
source import and meadow plan creation
DSK registry/install snapshot
render-plan validation and topology hash
grass/tree/wind/performance/postprocess enhancement
CPU mesh generation
WebGL outline and cel/fog rendering
frame/time tick and reset
aggregate diagnostics and editor capture
```

## Descriptor-only gameplay domains

```txt
meadow-player-dsk
meadow-camera-dsk
meadow-input-dsk
meadow-interaction-dsk
meadow-story-dsk
meadow-objective-dsk
meadow-ui-dsk
meadow-save-dsk
```

These names exist in registry/catalog state, but the active game composition has no implementation modules that consume input, dispatch an action, preflight a target, mutate progression, or retain a result.

## Existing authored contract

```txt
arrival-path
  requiredAction: path-progress
  objective: walk-the-path
  completion: progressAtLeast 0.35

focal-tree
  requiredAction: inspect
  objective: inspect-tree
  completion: inspected true
```

## Required authority chain

```txt
input sample
  -> command adapter
  -> typed command
  -> target lookup
  -> preflight
  -> pure reducer
  -> objective evaluator
  -> accepted/rejected/no-op result
  -> ordered event rows
  -> committed gameplay observation
  -> GameHost/editor projection
  -> replay fixture
```

## Ownership recommendation

```txt
meadow-input-command-adapter-kit
  owns keyboard/editor/fixture normalization

meadow-command-authority-kit
  owns sequence, dispatch, status, reason, and journal

meadow-target-preflight-kit
  owns target existence, supported action, range, and state checks

meadow-player-path-reducer-kit
  owns position/yaw/pathProgress mutation

meadow-inspection-state-kit
  owns inspected target ids and duplicate behavior

meadow-objective-reducer-kit
  owns active/completed objective transitions

meadow-gameplay-observation-kit
  owns immutable result/event/fingerprint rows
```

## Boundary rules

```txt
render plan does not own gameplay mutation
renderer does not infer objective state from geometry
DOM input does not mutate state directly
editor commands use the same dispatcher as browser and fixtures
rejected/no-op commands do not alter canonical state
objective completion is derived from committed state, not UI state
legacy GameHost methods remain additive and compatible
```

## Next safe ledge

```txt
IntoTheMeadow Interaction Command Authority + Objective Progress Fixture Gate
```

External-source provenance, fallback parity, measured mesh contribution, and registry implementation truth remain separate companion proof chains.