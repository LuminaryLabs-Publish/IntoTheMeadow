# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-10T12-19-05-04-00`

## Selection gap handled

```txt
current public LuminaryLabs-Publish repos were checked
TheCavalryOfRome was excluded
all checked public non-Cavalry repos were tracked in central ledger state
sampled root .agent state was present
IntoTheMeadow was selected as the oldest eligible documented fallback
central tracking is refreshed by this pass
```

## Render proof gaps

```txt
renderer v2 returns aggregate readback, not per-descriptor proof rows
postProcess descriptors are emitted, but renderer snapshot only reports aggregate postProcess facts
primitiveFallbackCount is visible, but not tied back to descriptor ids or fallback classes
descriptorCounts are visible, but not classified as consumed / ignored / unsupported / fallback
renderer.getSnapshot output is not normalized into a source-owned ledger
GameHost exposes render snapshots, but not render proof rows
headless editor smokes can read renderer data but do not assert descriptor consumption rows
```

## Grass proof gaps

```txt
grass density texture rows are not compared against render readback
static batch and archetype card counts are not proven against renderer state
patch instance counts are not fixture-proven
draw group card/instance totals are not normalized into rows
shader wind and LOD policy consumption are not visible as proof rows
headless editor observation does not yet emit grass parity rows
```

## Gameplay and interaction proof gaps

```txt
advanceGameState increments frame and lastTick only
no ActionFrame contract
no TargetActionPreflight contract
no ActionResult contract
no ObjectiveProgress contract
no accepted/rejected/skipped/unchanged reason rows
no DOM-free gameplay fixture rows
```

## GameHost/editor proof gaps

```txt
GameHost exposes aggregate state/render diagnostics, not proof projection rows
NexusEditorEnvironment exposes command reachability, not proof observations
editor loop smoke proves bridge access, not render/grass/action/objective consumption
```

## Consumer attribution gaps

```txt
no source descriptor id to renderer decision row
no fallback attribution row per fallback class
no grass source id to draw group row
no action id to objective-progress row
no editor command id to proof observation row
```

## Do not solve first

```txt
visual fidelity
renderer replacement
external CDN migration
shared-kit promotion
new meadow content
grass art tuning
camera/control rewiring
editor command expansion
```

## Current ledge

```txt
IntoTheMeadow Consumer Proof Attribution Ledger Refresh + Headless Editor Fixture Gate
```
