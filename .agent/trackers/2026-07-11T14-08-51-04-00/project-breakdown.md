# IntoTheMeadow Project Breakdown

**Timestamp:** `2026-07-11T14-08-51-04-00`

## Summary

This documentation-only pass identifies a gameplay contract gap: `IntoTheMeadow` declares two objectives and two matching interaction targets, but no browser or editor command can execute `path-progress` or `inspect`. The game reducer advances frame metadata only, so progression and story state remain inert.

## Plan ledger

**Goal:** map the complete interaction/objective boundary and define the smallest typed DSK transaction required to make the current authored loop executable and fixture-backed.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Avoid duplicate work on the newer AetherVale audit already in flight.
- [x] Select only `IntoTheMeadow`.
- [x] Read root guidance and prior `.agent` audits.
- [x] Trace browser boot, RAF, game state, editor and headless capabilities.
- [x] Inventory active domains, kits and services.
- [x] Trace authored objectives and targets into runtime mutation.
- [x] Define the interaction/objective authority domain.
- [x] Add architecture, render, gameplay, interaction, objective and deploy audits.
- [x] Change documentation only and push to `main`.
- [ ] Runtime implementation remains future work.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central-ledger entries: 9
root .agent states: 9
AetherVale: newer repo-local audit already in flight
selected: IntoTheMeadow
selection basis: oldest fully aligned eligible repository
```

## Interaction loop

```txt
browser boot
  -> load pinned meadow provider
  -> create game, renderer, enhancer and editor bridge
  -> RAF calls game.tick({ time, dt })
  -> advanceGameState increments frame and lastTick only
  -> render static meadow plan

content
  -> walk-the-path / path-progress / arrival-path / threshold 0.35
  -> inspect-tree / inspect / focal-tree / inspected true

result
  -> no command ingress
  -> no player/path mutation
  -> no inspection receipt
  -> no objective evaluation
  -> no story transition
```

## Domains in use

```txt
browser host and lifecycle
external provider and DSK registry
game state and snapshots
player/input/interaction/objective/story declarations
browser and Node editor capabilities
workspace and artifact effects
runtime clock and step admission
terrain, path, grass, scatter, trees, wind and atmosphere
render-plan enhancement and topology
CPU mesh and WebGL rendering
postprocess, performance and diagnostics
validation and Pages deployment
```

## Kit inventory

```txt
external declared kits: 1
local declared kits: 43
total declared kits: 44
runtime source-backed surfaces: 24
```

All local DSKs and supplied services are recorded in `.agent/kit-registry.json`. The directly relevant declarations are:

```txt
meadow-player-dsk
meadow-input-dsk
meadow-interaction-dsk
meadow-objective-dsk
meadow-story-dsk
into-the-meadow-game-dsk
web-host-dsk
meadow-diagnostics-dsk
```

## Main finding

`ARRIVAL_OBJECTIVES` and `ARRIVAL_INTERACTION_TARGETS` line up semantically, but the runtime never consumes them. `advanceGameState()` only adds one frame and stores `dt/time`. The browser host has no gameplay input listeners, and both editor adapters lack interaction/objective capabilities.

## Required parent domain

```txt
meadow-interaction-objective-authority-domain
```

## Candidate kits

```txt
interaction-command-kit
interaction-command-id-kit
interaction-admission-kit
canonical-interaction-target-index-kit
player-action-state-kit
path-progress-evaluator-kit
inspect-target-evaluator-kit
objective-definition-index-kit
objective-progress-ledger-kit
objective-completion-result-kit
story-beat-transition-kit
interaction-projection-kit
interaction-debug-observation-kit
interaction-command-journal-kit
interaction-objective-fixture-kit
browser-interaction-parity-smoke-kit
```

## Validation boundary

```txt
runtime source changed: no
rendering changed: no
dependencies changed: no
deployment changed: no
branch or PR created: no
npm run check: not run
browser smoke: not run
interaction fixtures: unavailable
```
