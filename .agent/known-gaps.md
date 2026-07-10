# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-10T18-22-01-04-00`

## Selection state

```txt
10 accessible LuminaryLabs-Publish repositories observed
TheCavalryOfRome excluded by rule
9 eligible repositories centrally tracked with root .agent state
IntoTheMeadow selected as oldest eligible documented fallback
```

## Interaction authority gaps

```txt
web-host submits only time and a fixed dt to game.tick
advanceGameState ignores movement and action inputs
no browser keyboard/pointer input adapter reaches game state
no typed gameplay command contract exists
no target lookup or range/precondition check exists
no accepted/rejected/no-op result contract exists
no ordered command/result/event journal exists
```

## Objective authority gaps

```txt
walk-the-path and inspect-tree are static descriptors
arrival-path and focal-tree are static target descriptors
player.pathProgress never changes
no inspected-target state exists
completedObjectiveIds never changes
activeObjectiveId never advances
no reducer links requiredAction to completion rules
no duplicate-action policy exists
```

## Host and editor proof gaps

```txt
GameHost exposes the raw game object instead of a bounded gameplay command surface
GameHost has no gameplay observation or journal method
editor bridge supports runtime.tick/reset but not gameplay.dispatch
editor command completion proves invocation only
no frame/sequence/state fingerprint links a command to progression and render readback
```

## Timing gaps

```txt
web-host passes dt: 1/60 regardless of actual frame duration
state frame count is render-loop iteration count rather than committed simulation step authority
absolute requestAnimationFrame time and fixed dt use different clocks
no pause/resume or visibility-gap policy is documented
no fixture proves equal command sequences remain stable across frame cadence
```

## External source provenance and fallback gaps

```txt
runtime drops external source URL, commit, and exported version after import
install status is inferred from function presence
browser startup hard-fails before local fallback selection
fallback validation claims representative without parity evidence
external/fallback descriptor differences are not classified
source plan is cached at time 0 and later receives only a time-field overlay
```

## Mesh and registry truth gaps

```txt
mesh builder lacks per-stage contribution rows
descriptor ids are not retained in renderer readback
attempted/consumed/skipped/unsupported/fallback counts are absent
primitiveFallbackCount is hard-coded to 0
registry active-v0.1 status is list membership, not implementation proof
```

## Grass proof gaps

```txt
grass expectations are not reconciled with measured emitted geometry
source and enhanced grass ids do not survive into render observations
patch/draw-group contribution is not attributed
external and fallback grass populations have no shared parity row
```

## Validation gaps

```txt
no interaction command fixture
no target preflight fixture
no objective progression fixture
no duplicate-command fixture
no same-command replay fingerprint fixture
no source provenance/fallback parity fixtures
no mesh contribution or registry truth fixtures
```

## Do not solve first

```txt
visual fidelity or asset expansion
renderer replacement or WebGPU cutover
new meadow content
postprocess expansion
shared-kit promotion
CDN migration
audio/save/UI expansion before command authority
```

## Current ledge

```txt
IntoTheMeadow Interaction Command Authority + Objective Progress Fixture Gate
```

External-source provenance/fallback parity, mesh contribution, and registry truth remain required companion gates.