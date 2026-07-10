# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-10T04-58-56-04-00`

## Selection gap handled

```txt
current public LuminaryLabs-Publish repos were checked.
TheCavalryOfRome was excluded.
all checked public non-Cavalry repos were tracked in central ledger state.
sampled root .agent state was present according to central tracking.
IntoTheMeadow was selected as the oldest eligible documented fallback.
central tracking is refreshed by this pass.
```

## Render proof gaps

```txt
renderer v2 returns aggregate readback, not per-descriptor proof rows.
postProcess descriptors are emitted, but renderer snapshot only reports postProcessMode inline-cel-fog.
primitiveFallbackCount is visible, but not tied back to descriptor ids or fallback classes.
descriptorCounts are visible, but not classified as consumed / ignored / unsupported / fallback.
renderer.getSnapshot output is not normalized into a source-owned ledger.
GameHost exposes render snapshots, but not render proof rows.
headless editor smokes can read renderer data but do not yet assert descriptor consumption rows.
```

## Grass proof gaps

```txt
grass density texture rows are not compared against render readback.
static batch and archetype card counts are not proven against renderer state.
patch instance counts are not fixture-proven.
draw group card/instance totals are not normalized into rows.
shader wind and LOD policy consumption are not visible as proof rows.
headless editor observation does not yet emit grass parity rows.
```

## Gameplay/action gaps

```txt
ARRIVAL_OBJECTIVES defines path-progress and inspect objectives.
ARRIVAL_INTERACTION_TARGETS defines focal-tree and arrival-path targets.
advanceGameState only increments frame and lastTick.
no ActionFrame contract exists.
no target/action preflight helper exists.
no ActionResult contract exists.
no objective progress helper exists.
no DOM-free action fixture exists.
no editor command row is tied to objective/action proof.
```

## Headless editor proof gaps

```txt
headless editor smoke exists.
headless editor proof ledger does not exist.
editor observation rows are not tied to render proof rows.
editor observation rows are not tied to grass proof rows.
editor observation rows are not tied to action/objective rows.
GameHost has no additive proof projection for editor observations.
```

## Validation gaps

```txt
npm run check exists and is useful.
npm run check includes headless editor smokes.
npm run check does not include render-consumption ledger rows.
npm run check does not include grass-consumption rows.
npm run check does not include action-result fixture rows.
npm run check does not include objective-progress rows.
npm run check does not include headless editor proof ledger rows.
central ledger sync is still documentation-only.
```

## Explicit deferrals

```txt
visual fidelity pass
renderer replacement
external CDN migration
new meadow content
grass art tuning
camera/control wiring
shared-kit promotion
browser input wiring before DOM-free action rows
editor command expansion before source-backed observation rows
```
