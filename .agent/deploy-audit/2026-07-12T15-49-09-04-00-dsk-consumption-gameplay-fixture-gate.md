# Deploy Audit: DSK Consumption and Gameplay Fixture Gate

**Timestamp:** `2026-07-12T15-49-09-04-00`

## Summary

Current checks prove descriptor shape, render-plan structure, deterministic static scenes, renderer behavior and editor tooling. They do not prove that an active DSK has an executable provider or that the deployed page can perform one gameplay action.

## Plan ledger

**Goal:** block gameplay-readiness claims until local and deployed builds prove provider installation, command consumption, progression mutation and visible-frame correlation.

- [x] Review declared package check surfaces.
- [x] Compare existing checks with DSK runtime-consumption requirements.
- [x] Define deterministic Node and browser fixture gates.
- [x] Define local/Pages parity requirements.
- [ ] Implement and run the fixture matrix.

## Existing checks can establish

```txt
required repository files exist
local DSK descriptor ids validate
descriptor service lists contain five entries
required-v0.1 ids are present
external meadow provider loads or fallback is representative
render plan validates and is deterministic
renderer mesh/buffer/cache paths satisfy current smokes
headless editor commands and scenarios operate
```

## Existing checks cannot establish

```txt
concrete provider identity for each active DSK
provider/service contract compatibility
dependency resolution and install order
readiness, rollback and retirement
callable player/input/interaction/objective/story services
browser input normalization
gameplay command admission
player movement or path progress
inspect-tree evidence
objective/story transition
save or feedback consumer binding
DSK consumption receipts
first visible gameplay frame
local/Pages gameplay parity
```

## Required Node fixtures

```txt
dsk-declared-realized-parity.mjs
dsk-dependency-graph.mjs
dsk-provider-readiness-rollback.mjs
gameplay-command-determinism.mjs
player-path-objective-transition.mjs
inspect-tree-story-transition.mjs
dsk-consumption-receipt.mjs
stale-capability-generation.mjs
```

## Required browser fixtures

```txt
page loads with required capability generation
WASD or editor gameplay command changes player state
path progress completes walk-the-path once
inspect-tree requires target evidence
focal-tree story beat emits once
feedback surface reflects committed result
GameHost reports provider/service consumption receipts
first visible frame cites gameplay revision
stop/start retires stale input and provider generations
```

## Deployment matrix

```txt
local static host
GitHub Pages URL
desktop keyboard/pointer
narrow viewport
DPR 1 and 2
WebGL2 and WebGL1 fallback
fresh session and reset session
provider load success and controlled provider failure
```

## Gate

Do not describe the deployed route as an interactive game until at least one complete player-action-to-visible-frame transaction passes locally and on GitHub Pages. The current environment/editor proof may continue to be described accurately as such.