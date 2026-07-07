# IntoTheMeadow Project Breakdown — 2026-07-07T18-19-15-04-00

## Summary

`LuminaryLabs-Publish/IntoTheMeadow` was selected because the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger showed it as the oldest eligible tracked `LuminaryLabs-Publish` repo after excluding `LuminaryLabs-Publish/TheCavalryOfRome`.

This pass keeps the work on documentation only. The repo already has a clean static route, host, game factory, state root, render-plan seam, external meadow kits, story/objective/interaction descriptors, and GameHost exposure. The next implementation cut should make gameplay state authoritative and fixture-replayable before any renderer, input-polish, save, audio, or ProtoKit promotion work.

## Selection ledger

Goal: pick the oldest eligible non-Cavalry Publish repo, update repo-local `.agent` findings, and mirror the result into the central LuminaryLabs ledger.

Checklist:

- [x] Checked the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger entries.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome` by standing rule.
- [x] Selected one repo only: `LuminaryLabs-Publish/IntoTheMeadow`.
- [x] Read the active browser host, game factory, game state, snapshot, arrival meadow config, objectives, and interaction targets.
- [x] Identified the interaction loop.
- [x] Identified domains in use.
- [x] Identified services offered by current and next-cut kits.
- [x] Identified current external kits, local DSKs, and next-cut kits.
- [x] Added this timestamped tracker under `.agent/trackers/`.
- [x] Prepared root `.agent` README and kit registry updates.
- [x] Prepared central ledger and internal change-log updates.

Latest eligible timestamps checked:

```txt
IntoTheMeadow    2026-07-07T16:58:09-04:00
ZombieOrchard    2026-07-07T17:10:21-04:00
HorrorCorridor   2026-07-07T17:20:57-04:00
TheOpenAbove     2026-07-07T17:29:51-04:00
AetherVale       2026-07-07T17-38-46-04-00
PhantomCommand   2026-07-07T17:49:34-04:00
PrehistoricRush  2026-07-07T18:00:19-04:00
MyCozyIsland     2026-07-07T18:10:03-04:00
```

## Source files read

```txt
index.html
src/boot/boot-game.js
src/hosts/web-host.js
src/game/create-into-the-meadow-game.js
src/game/game-state.js
src/game/game-snapshot.js
src/content/meadow-areas/arrival-meadow.js
src/content/objectives/arrival-objectives.js
src/content/interaction-targets/arrival-targets.js
.agent/README.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/IntoTheMeadow.md
```

## Current repo shape

`IntoTheMeadow` is a publishable static meadow exploration slice. The static route loads `src/boot/boot-game.js`; the boot file passes DOM elements into `startWebHost()`; the web host imports the meadow area and WebGL render kits from the manifest; `createIntoTheMeadowGame()` installs local DSK descriptors and creates the arrival meadow; the frame loop calls `game.tick({ time, dt })`; the meadow emits a render plan; `enhanceRenderPlan()` enriches it; the renderer draws; `window.GameHost` exposes state, snapshot, diagnostics, and render state.

The architecture is ready for a deterministic first playable loop, but gameplay authority is still not cut over. `advanceGameState()` increments only `frame` and `lastTick`. `createGameSnapshot()` returns manifest, raw state, render plan, and diagnostics, but does not expose stable `snapshot.gameplay`. The content already contains enough descriptor data to implement the first loop: six path points, initial player position, path objective, tree inspect objective, and focal-tree interaction target.

## Interaction loop

### Current loop

```txt
open index.html
  -> canvas and HUD are mounted
  -> boot-game.js calls startWebHost()
  -> web-host.js loads external meadow-area-kit and meadow-webgl-render-kit
  -> createIntoTheMeadowGame() installs local DSK descriptors
  -> create arrival meadow kit from ARRIVAL_MEADOW_CONFIG
  -> initialize deterministic state
  -> requestAnimationFrame(frame)
  -> game.tick({ time, dt })
  -> advanceGameState() increments frame and lastTick only
  -> meadow.getRenderPlan({ time })
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(plan)
  -> debug HUD optionally displays validation/counts/render stats
  -> GameHost exposes getState(), getSnapshot(), getDiagnostics(), getRenderPlan()
```

### Target playable loop

```txt
spawn player at { x: 0, y: 0, z: -36 }
  -> collect host/scripted input into ActionFrame records
  -> freeze sorted ActionBatch per tick
  -> validate scene, payload, action type, target, range, and duplicate state
  -> append accepted/rejected/no-op ActionJournal records
  -> run reducers in fixed order
  -> update pathProgress by sampling ARRIVAL_MEADOW_CONFIG.features.path.points
  -> emit one-shot path-progress threshold events
  -> complete walk-the-path at pathProgress >= 0.35
  -> evaluate focal-tree inspect affordance using radius 4.5
  -> reject invalid inspect with stable reason metadata
  -> accept inspect:focal-tree when constraints pass
  -> complete inspect-tree after accepted inspect
  -> derive arrival completion when both objectives complete
  -> expose snapshot.gameplay with player, objectives, actions, reducer results, events, and completion state
  -> prove parity through DOM-free scripted replay fixtures
```

## Domains in use

### Runtime and host domains

- static-browser-shell
- github-pages-deployment
- browser-boot-runtime
- web-host-runtime
- external-kit-loading
- cdn-kit-import-manifest
- animation-frame-loop
- debug-hud-runtime
- gamehost-state-contract
- gamehost-snapshot-contract
- gamehost-diagnostics-contract
- gamehost-render-snapshot-contract

### Game composition domains

- product-game-factory
- manifest-authority
- dsk-registry
- dsk-descriptor-installer
- local-dsk-descriptor-validation
- external-meadow-area-bridge
- external-webgl-meadow-renderer
- fallback-meadow-area-kit
- deterministic-state-root
- scene-identity
- session-identity
- tick-clock
- last-tick-diagnostics

### Meadow content domains

- arrival-meadow-content
- arrival-path-content
- focal-tree-content
- grass-content
- flower-content
- rock-content
- mushroom-content
- tree-line-content
- terrain-material-palette
- world-wind-state
- story-beat-ledger
- objective-ledger
- interaction-target-registry

### Render domains

- render-plan-generation
- render-plan-enhancement
- grass-patch-render-metadata
- wind-field-render-metadata
- post-process-stack-metadata
- outline-policy-metadata
- render-stats-diagnostics
- webgl-renderer-snapshot

### Gameplay authority domains still needed

- host-input-ingress
- scripted-input-domain
- action-frame-contract
- action-batch-contract
- action-journal-contract
- action-frame-normalization
- action-acceptance-policy
- action-rejection-policy
- reducer-result-contract
- reducer-result-journal
- ordered-reducer-pipeline
- movement-integration
- path-point-sampling
- nearest-path-segment-sampling
- path-progress-threshold-detection
- gameplay-event-contract
- gameplay-event-journal
- interaction-affordance-evaluation
- focal-tree-proximity-check
- focal-tree-facing-check
- inspect-event-evaluation
- story-trigger-evaluation
- objective-state-authority
- objective-completion-evaluation
- arrival-completion-state
- gameplay-snapshot-contract
- gameplay-render-metadata-projection
- deterministic-replay-domain
- fixture-replay-domain
- playable-loop-smoke-target

## Services current kits offer

### External kits

```txt
meadow-area-kit
  - createMeadowAreaKit(config)
  - getRenderPlan({ time })
  - getSnapshot()
  - validate()

meadow-webgl-render-kit
  - createMeadowWebglRenderKit({ canvas })
  - render(plan)
  - getSnapshot()
```

### Active local DSKs

```txt
into-the-meadow-game-dsk
  - owns product identity, game composition, and publishable route intent

web-host-dsk
  - owns browser boot, canvas/HUD bridge, frame loop, external kit loading, and GameHost exposure

game-composition-dsk
  - owns game factory composition, manifest, content bundle, DSK install snapshot, and reset/tick surface

meadow-area-bridge-dsk
  - bridges arrival meadow content into the external meadow area kit and fallback render plan

meadow-render-host-dsk
  - owns render-plan delivery into the external WebGL render kit

meadow-diagnostics-dsk
  - combines DSK validation, render-plan validation, and content counts into diagnostics

meadow-performance-dsk
  - tracks object counts, grass patch count, vertex count, and product performance metadata

post-process-stack-dsk
  - represents outline, color grade, depth fog, vignette, and final composite pass metadata

static-pages-deploy-dsk
  - keeps the static Pages route deployable with no server runtime
```

### Full local inventory still represented by the repo

```txt
into-the-meadow-game-dsk
web-host-dsk
game-composition-dsk
meadow-area-bridge-dsk
meadow-terrain-texture-dsk
path-corridor-dsk
grass-patch-dsk
gpu-grass-render-dsk
wind-field-dsk
tree-object-dsk
meadow-scatter-dsk
meadow-atmosphere-dsk
meadow-player-dsk
meadow-camera-dsk
meadow-input-dsk
meadow-interaction-dsk
meadow-story-dsk
meadow-objective-dsk
meadow-ecology-dsk
meadow-audio-dsk
meadow-ui-dsk
meadow-save-dsk
meadow-diagnostics-dsk
meadow-performance-dsk
meadow-render-host-dsk
post-process-stack-dsk
render-target-kit
sobel-outline-pass-kit
color-grade-pass-kit
depth-fog-pass-kit
vignette-pass-kit
final-composite-pass-kit
static-pages-deploy-dsk
```

## Source facts

```txt
initial player position: { x: 0, y: 0, z: -36 }
initial yaw: 0
initial pitch: 0
initial pathProgress: 0
arrival scene id: arrival-meadow
path point count: 6
path start: { x: 0, z: -44 }
path end: { x: 0, z: 20 }
walk objective id: walk-the-path
walk objective requiredAction: path-progress
walk objective targetId: arrival-path
walk objective completion: pathProgress >= 0.35
inspect objective id: inspect-tree
inspect objective requiredAction: inspect
inspect objective targetId: focal-tree
focal-tree position: { x: 0, y: 1.4, z: 24 }
focal-tree radius: 4.5
```

## Gaps and blockers

- The host has no input capture path into deterministic actions.
- `game.tick({ time, dt })` has no additive `actions` path.
- State has no action journal.
- State has no reducer result journal.
- Reducers do not yet exist as explicit pure service boundaries.
- Path progress exists as a player field but is never advanced.
- Objective completion descriptors exist but are never applied.
- Inspect targets exist but no affordance or range reducer evaluates them.
- `snapshot.gameplay` does not exist.
- GameHost has no gameplay-specific diagnostics helpers.
- Existing smokes validate static shape/render determinism, not playable-loop replay parity.

## Next implementation slice

**Build target:** `IntoTheMeadow GameplaySnapshot Fixture Contract + Action Reducer Source Lock`

```txt
preserve index.html, boot-game.js, web-host.js, visible render behavior, and GameHost compatibility
  -> keep game.tick({ time, dt }) working exactly as current callers expect
  -> allow additive game.tick({ time, dt, actions }) without requiring DOM input
  -> add ActionFrame contract and stable rejection reason catalog
  -> add ActionBatch sorting and de-duping
  -> add ActionJournal records for accepted, rejected, and no-op action frames
  -> add ReducerResult contract before concrete movement/inspect reducers
  -> add ReducerResultJournal for reducer ordering and replay diagnostics
  -> add no-op reducer fixture to lock shape before behavior
  -> add player path reducer against ARRIVAL_MEADOW_CONFIG.features.path.points
  -> emit deterministic path-progress events and threshold completion
  -> complete walk-the-path at pathProgress >= 0.35
  -> add focal-tree affordance reducer using ARRIVAL_INTERACTION_TARGETS radius 4.5
  -> reject invalid inspect as unsupported_action, invalid_scene, invalid_payload, out_of_range, wrong_target, duplicate_event, or no_effect
  -> accept inspect:focal-tree when the target is valid and in range
  -> complete inspect-tree after accepted inspect
  -> derive arrival-meadow completion from both objective ids
  -> expose snapshot.gameplay with player, objectives, action journal, reducer journal, gameplay events, story, completion, and fixture metadata
  -> add GameHost gameplay diagnostics helpers
  -> add DOM-free scripted fixtures for no-op tick, path walk, invalid inspect, valid inspect, objective completion, and replay parity
```

## Next-cut kits

```txt
meadow-actionframe-contract-kit
meadow-action-batch-kit
meadow-action-journal-kit
meadow-input-runtime-kit
meadow-action-acceptance-kit
meadow-action-rejection-reason-kit
meadow-action-source-fixture-kit
meadow-reducer-contract-kit
meadow-reducer-result-contract-kit
meadow-reducer-result-journal-kit
meadow-reducer-seed-fixture-kit
meadow-reducer-pipeline-kit
meadow-player-path-reducer-kit
path-progress-runtime-kit
path-threshold-event-kit
meadow-gameplay-event-contract-kit
meadow-gameplay-event-journal-kit
focal-tree-affordance-kit
inspect-event-runtime-kit
inspect-result-reducer-kit
story-trigger-runtime-kit
objective-state-authority-kit
objective-completion-runtime-kit
arrival-completion-runtime-kit
meadow-gameplay-snapshot-kit
gameplay-snapshot-fixture-kit
gamehost-gameplay-diagnostics-kit
meadow-gameplay-fixture-kit
replay-parity-smoke-kit
```

## Services next-cut kits need to offer

```txt
meadow-actionframe-contract-kit
  - defineActionFrameShape
  - defineActionTypes
  - normalizeActionFrame
  - validateActionFrame
  - serializeActionFrame
  - markAccepted
  - markRejected

meadow-action-batch-kit
  - collectFrameActions
  - sortActionFrames
  - dedupeActionFrames
  - freezeActionBatch
  - summarizeActionBatch

meadow-action-journal-kit
  - appendActionRecord
  - queryActionsByStatus
  - summarizeActionJournal
  - serializeActionJournal
  - assertReplayableActionJournal

meadow-action-rejection-reason-kit
  - defineReasonCodes
  - rejectUnsupportedAction
  - rejectInvalidScene
  - rejectInvalidPayload
  - rejectOutOfRange
  - rejectWrongTarget
  - rejectDuplicateEvent
  - rejectNoEffect

meadow-reducer-result-contract-kit
  - defineReducerResultShape
  - createReducerResult
  - createNoopReducerResult
  - mergeReducerResults
  - validateReducerResult

meadow-reducer-result-journal-kit
  - appendReducerResult
  - summarizeReducerJournal
  - queryReducerResults
  - assertReducerOrder
  - serializeReducerJournal

meadow-player-path-reducer-kit
  - samplePathPoints
  - computeNearestPathSegment
  - advancePathProgress
  - clampPathProgress
  - emitPathProgressResult

focal-tree-affordance-kit
  - resolveInteractionTarget
  - computeDistanceToTarget
  - evaluateInspectRange
  - evaluateInspectFacing
  - createAffordanceSnapshot

inspect-result-reducer-kit
  - reduceInspectAction
  - rejectInspectOutOfRange
  - rejectInspectWrongTarget
  - acceptInspectTarget
  - emitInspectEvent

objective-state-authority-kit
  - resolveObjectiveDescriptors
  - evaluateObjectiveCompletion
  - appendCompletedObjective
  - deriveActiveObjective
  - summarizeObjectiveState

meadow-gameplay-snapshot-kit
  - createGameplaySnapshot
  - validateGameplaySnapshot
  - summarizeGameplaySnapshot
  - exposeGameplayDebugFields
  - assertReplaySnapshotParity

replay-parity-smoke-kit
  - runScriptedActionFixture
  - replayAcceptedJournal
  - compareGameplaySnapshots
  - assertObjectiveCompletion
  - assertDeterministicReplay
```

## Deferred work

- Renderer extraction.
- Pointer lock and first-person camera polish.
- Save/load persistence.
- Audio and ambient soundscape.
- Advanced ecology simulation.
- External ProtoKit promotion.
- Multi-area progression beyond arrival meadow.

## Validation status

No runtime source files were changed in this documentation pass. No local build or smoke test was run. Existing known smoke surfaces remain static route, DSK registry, render plan, and deterministic scene checks; the proposed next pass adds playable-loop replay smoke coverage.
