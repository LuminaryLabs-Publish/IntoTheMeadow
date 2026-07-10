# Interaction Audit: Target Action Result Readback Map

**Timestamp:** `2026-07-10T09-28-40-04-00`

## Current interaction surface

```txt
ARRIVAL_INTERACTION_TARGETS describe possible targets
ARRIVAL_OBJECTIVES describe intended progression
game state stores active objective and completed objectives
advanceGameState does not yet process target/action commands
GameHost exposes aggregate state only
editor bridge can tick/reset/read state but has no proof rows
```

## Missing interaction contracts

```txt
ActionFrame
TargetActionPreflight
ActionResult
ObjectiveProgress
GameplayFixtureRows
GameHost proof projection
Editor proof observation rows
```

## Next interaction contract

```txt
input action
  -> ActionFrame
  -> TargetActionPreflight
  -> ActionResult { accepted | rejected | skipped | unchanged, reason }
  -> ObjectiveProgress
  -> GameHost proof projection
  -> headless editor proof ledger row
```

## Do not change first

```txt
new controls
new targets
new objectives
new meadow content
editor command expansion
```
