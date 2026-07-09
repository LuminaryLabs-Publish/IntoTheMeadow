# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-09T15-39-08-04-00`

## Selection gap handled

```txt
- accessible LuminaryLabs-Publish repos were checked.
- TheCavalryOfRome was excluded.
- all checked non-Cavalry repos were tracked in central ledger state.
- sampled root .agent state was present for the selected repo.
- IntoTheMeadow was selected as the oldest eligible central-ledger fallback.
- central tracking is refreshed to 2026-07-09T15-39-08-04-00.
```

## Render proof gaps

```txt
- enhanced render plans are source-rich but lack a descriptor-consumption ledger.
- renderer.getSnapshot?.() is optional and not normalized.
- no row proves whether grassSystem, grassPatches, windField, postProcess, performance, object renderStyle, or stats were consumed.
- no stable consumed / ignored / unsupported / fallback classification exists.
- no GameHost render parity projection exists.
```

## Grass proof gaps

```txt
- grass density texture rows are not compared against render readback.
- static batch and archetype card counts are not proven against renderer state.
- patch instance counts are not fixture-proven.
- draw group card/instance totals are not normalized into rows.
- shader wind and LOD policy consumption are not visible in diagnostics.
```

## Gameplay/action gaps

```txt
- ARRIVAL_OBJECTIVES defines path-progress and inspect objectives.
- ARRIVAL_INTERACTION_TARGETS defines focal-tree and arrival-path targets.
- advanceGameState only increments frame and lastTick.
- no ActionFrame contract exists.
- no target/action preflight helper exists.
- no ActionResult contract exists.
- no objective progress helper exists.
- no DOM-free action fixture exists.
```

## Validation gaps

```txt
- npm run check does not include render-consumption ledger rows.
- npm run check does not include grass-consumption rows.
- npm run check does not include action-result fixture rows.
- central ledger sync is manual documentation only.
```
