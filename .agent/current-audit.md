# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Audit timestamp:** `2026-07-11T14-08-51-04-00`

## Summary

`IntoTheMeadow` is a DSK-composed browser meadow with one commit-pinned external provider, 43 local DSK declarations, a WebGL renderer, browser editor bridge and Node headless-editor environment.

This pass audits the authored interaction and objective layer. The content contains a path-progress objective, a tree-inspection objective and matching target descriptors. Those definitions are counted and exposed through `game.content`, but no browser input, editor capability or game command can submit either action. `advanceGameState()` only increments `frame` and stores `lastTick`.

## Plan ledger

**Goal:** define one canonical command and objective transaction shared by browser input, browser and Node editor adapters, target lookup, player state, progression, story beats, diagnostics and committed rendering.

- [x] Enumerate the ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Verify nine eligible central ledger entries and root `.agent` states.
- [x] Avoid duplicating the newer AetherVale repo-local audit already in flight.
- [x] Select only `IntoTheMeadow` as the oldest fully aligned eligible entry.
- [x] Read `AGENTS.md` and retained audits.
- [x] Trace browser, game, content, editor and headless interaction paths.
- [x] Inventory domains, kits and services.
- [x] Add architecture, render, gameplay, interaction, objective-system and deploy audits.
- [x] Change documentation only.
- [ ] Runtime implementation and fixtures remain future work.

## Interaction loops

### Browser render loop

```txt
boot
  -> load pinned meadow-area provider
  -> create game, plan enhancer and WebGL renderer
  -> expose GameHost and browser editor bridge
  -> requestAnimationFrame
  -> game.tick({ time, dt })
  -> enhance static render plan
  -> render
  -> publish diagnostics
```

### Authored gameplay loop

```txt
ARRIVAL_OBJECTIVES
  -> walk-the-path requires path-progress >= 0.35
  -> inspect-tree requires inspected=true for focal-tree

ARRIVAL_INTERACTION_TARGETS
  -> arrival-path / requiredAction=path-progress
  -> focal-tree / requiredAction=inspect
```

### Actual state mutation

```txt
createInitialGameState
  -> player.pathProgress = 0
  -> activeObjectiveId = walk-the-path
  -> completedObjectiveIds = []
  -> storyBeatIds = [arrival]

advanceGameState(state, input)
  -> frame += 1
  -> lastTick = { dt, time }
  -> all player, objective, inspection and story fields unchanged
```

### Editor surfaces

```txt
browser editor
  -> runtime.tick / runtime.reset
  -> scene and renderer observation
  -> no interaction or objective capability

Node headless editor
  -> runtime.tick / runtime.reset
  -> scene, renderer, camera, browser and workspace capabilities
  -> no interaction or objective capability
```

## Domains in use

```txt
browser shell, DOM boot and fatal projection
manifest and external dependency declaration
source-provider loading, fallback, source-plan generation and validation
DSK registry, descriptor installation and snapshots
game state, tick, reset, snapshot and diagnostics
runtime lifecycle, RAF ownership and session authority
public host capability routing, admission and revocation
browser editor invocation and error observation
Node headless editor runtime and workspace capabilities
workspace root identity, path containment, symlink policy and I/O admission
runtime step admission, clock policy and work budget
player state and authored movement profile
interaction-target definitions and target indexing
path-progress and inspection action semantics
objective definitions, progress ledger and completion predicates
story beats and transition projection
terrain, path, materials, grass, scatter, trees, wind and atmosphere
render-plan enhancement, validation and topology identity
performance, LOD and postprocess policy
CPU mesh construction and contribution accounting
WebGL resources, caching, rendering, snapshots and disposal
GameHost and editor observations
static checks, editor smokes, build and Pages deployment
```

## Kit inventory

```txt
external declared kits: 1
local declared kits: 43
total declared kits: 44
required-v0.1 local kits: 15
runtime source-backed surfaces: 24
```

The complete per-kit service inventory remains in `.agent/kit-registry.json` and `src/dsks/index.js`.

## Services offered by the current stack

```txt
commit-pinned external meadow source loading
fallback source-plan construction
DSK descriptor registration and snapshots
raw game state, tick, reset and render-plan rebuild
browser RAF hosting
browser editor capability lookup and invocation
Node headless runtime, scene, renderer, camera and workspace capabilities
workspace list/read/write and capture artifacts
render-plan enhancement and descriptor validation
CPU mesh generation
WebGL buffer caching and two-pass drawing
GameHost and editor observations
static checks and Pages deployment
authored objective, story and target descriptors
```

Services not currently offered:

```txt
interaction command envelope
command identity, sequence or session admission
canonical target resolution from targetId
player path-progress mutation
inspection receipt or duplicate classification
objective progress evaluation
objective completion result
story-beat transition result
browser and editor command parity
interaction journal
committed-frame acknowledgement of progression
```

## Main finding: authored gameplay is inert

The content layer defines:

```txt
walk-the-path
  requiredAction: path-progress
  targetId: arrival-path
  completion: progressAtLeast 0.35

inspect-tree
  requiredAction: inspect
  targetId: focal-tree
  completion: inspected true
```

The initial state exposes matching progression fields, but the only mutation function is:

```js
return Object.freeze({
  ...state,
  frame: state.frame + 1,
  lastTick: Object.freeze({ dt, time })
});
```

The browser host sends only `{ time, dt }`; it registers no keyboard, pointer, proximity or interaction listeners. The browser and Node editor bridges expose no `interaction.*`, `player.*` or `objective.*` capability.

Consequences:

```txt
pathProgress remains 0
focal-tree cannot be inspected
completedObjectiveIds remains empty
activeObjectiveId never advances
storyBeatIds never changes
render/HUD cannot acknowledge progression
editor smokes can pass without exercising gameplay
```

## Required parent domain

```txt
meadow-interaction-objective-authority-domain
```

Update existing owners first:

```txt
into-the-meadow-game-dsk
meadow-player-dsk
meadow-input-dsk
meadow-interaction-dsk
meadow-objective-dsk
meadow-story-dsk
web-host-dsk
meadow-diagnostics-dsk
browser and Node editor adapters
```

Candidate coordinating kits:

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

## Required transaction

```txt
InteractionCommand C
  -> validate session, epoch, command sequence and action kind
  -> resolve canonical target from active scene and targetId
  -> validate range/progress evidence under one policy
  -> classify stale, duplicate, rejected or accepted
  -> prepare player/inspection candidate state
  -> evaluate objective predicates from canonical definitions
  -> emit zero or more ObjectiveCompletionResult values
  -> prepare story-beat transition
  -> atomically commit state and bounded journal
  -> project command/result/revision into diagnostics and render state
  -> acknowledge the first committed frame that consumed the revision
```

Compatibility targets:

```txt
path progress threshold: 0.35
inspect target: focal-tree
path target: arrival-path
initial active objective: walk-the-path
initial story beat: arrival
```

## Required proof

```txt
path progress below threshold does not complete
path progress at threshold completes once
canonical target lookup rejects unknown target IDs
tree inspection completes once and duplicates are no-mutation
wrong action for target is rejected
stale session/epoch/sequence commands are rejected
browser and editor ingress produce equivalent results
objective completion advances active objective deterministically
story transition cites objective completion receipts
reset retires old commands and restores initial progression
state, diagnostics and committed frame cite one revision
```

## Ordered safe ledges

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Step Admission and Clock Integrity
5. Source Provider Authority
6. Render Topology Identity Authority
7. Committed Frame Observation Authority
8. Interaction Command and Objective Authority
9. DSK Registry Consumption Proof
```

## Validation boundary

```txt
runtime source changed: no
dependencies or manifests changed: no
gameplay/render/deployment changed: no
branch or PR created: no
npm run check: not run
browser smoke: not run
interaction/objective fixtures: unavailable
```

No gameplay-completion claim is made until a fixture proves command admission, canonical target lookup, state mutation, objective predicates, story transition and committed-frame projection at one session, epoch and revision.
