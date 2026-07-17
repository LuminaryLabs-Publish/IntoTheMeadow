# Project Breakdown: Save Capability Admission, Durable Commit and Migration

**Timestamp:** `2026-07-17T08-45-46-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Reviewed repository head:** `f418a721c3adf2ad8c2983f2603fb8250cf884b3`  
**Reviewed runtime source revision:** `ba702cc59dd0a8a4acfae3246ac16b45261d0c4d`  
**Status:** `save-capability-admission-durable-commit-migration-authority-audited`

## Summary

IntoTheMeadow declares `meadow-save-dsk` and the services `save-model`, `save-slots`, `persistence-adapter`, `migration` and `save-validation`, but the descriptor remains `planned`. The browser host, public `GameHost`, editor bridge and game runtime expose state inspection, ticking and reset only. No versioned save envelope, slot authority, persistence adapter, atomic commit, durability receipt, migration registry, restore admission, failure classification or restored-frame acknowledgement is implemented.

## Intent

Make persistence capability truthful and transactional: only advertise save support when one versioned state projection can be atomically committed, verified, migrated, restored and acknowledged by the matching runtime and visible frame.

## Checklist

- [x] Compare all 11 current `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and ten root `.agent` states.
- [x] Confirm every eligible `main` head matches its documented repo-local head.
- [x] Select only IntoTheMeadow by the oldest synchronized central timestamp.
- [x] Inspect DSK registration, game state, snapshots, `GameHost`, browser bridge and host lifecycle.
- [x] Identify the complete interaction loop, active domains, all 44 kit surfaces and offered services.
- [x] Define one persistence authority and 20 coordinating surfaces.
- [x] Add this timestamped root `.agent` audit family.
- [x] Change documentation only on `main`; create no branch or pull request.
- [ ] Implement persistence and source/browser/artifact/Pages fixtures later.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0

selected: LuminaryLabs-Publish/IntoTheMeadow
selection rule: oldest synchronized central timestamp
selected prior timestamp: 2026-07-17T03-44-31-04-00
next oldest: LuminaryLabs-Publish/HorrorCorridor at 2026-07-17T03-58-09-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
browser boot
  -> load the pinned external meadow-area provider
  -> register all local DSK descriptors
  -> create initial in-memory game state
  -> expose GameHost and NexusEditorEnvironment
  -> start RAF ticking and rendering

runtime use
  -> advance frame and lastTick in memory
  -> read state, snapshot, diagnostics and render evidence
  -> editor may invoke runtime.tick or runtime.reset

session end or reload
  -> no save-capability admission result
  -> no state-to-save projection
  -> no slot selection or atomic persistence commit
  -> no durability verification
  -> no migration or restore admission
  -> the next boot creates the initial state again

missing settlement
  -> SaveCapabilityResult
  -> SavePrepareResult
  -> DurableSaveCommitResult
  -> SaveMigrationResult
  -> RestoreAdmissionResult
  -> RestoreApplyResult
  -> FirstRestoredStateFrameAck
```

## Domains in use

```txt
repository and audit identity
browser startup, host lifecycle and RAF scheduling
external meadow provider loading
DSK registration, status declaration and composition validation
in-memory game state and session identity
game snapshot and diagnostics projection
editor capability admission and invocation
render-plan generation and WebGL presentation
planned persistence descriptor and service declaration
save capability truth and admission
versioned save-state projection and exclusion policy
slot identity, storage adapter and atomic commit
durability verification, quota and storage failure classification
migration registry and schema compatibility
restore validation, application and visible-frame acknowledgement
source, browser, artifact and Pages evidence
central tracking and reconciliation
```

## Source-backed finding

`src/dsks/index.js` declares `meadow-save-dsk` with five persistence services, while `createDskDescriptor()` marks it `planned`. `installDsks()` still returns all local descriptors in the installed DSK snapshot, so consumers must inspect descriptor status to distinguish a declared plan from an available runtime capability.

`src/game/game-state.js` creates and advances only in-memory state. `reset()` recreates the initial state. There is no serialization schema, persisted revision, slot ID, save digest, migration version or restored-session identity.

`src/game/game-snapshot.js` returns a diagnostic snapshot containing manifest, state, render plan and diagnostics. It is not a bounded durable-save projection and its validator checks no save schema, compatibility, digest or migration policy.

`src/boot/expose-game-host.js` publishes read-only state/snapshot/diagnostic/render access plus the raw game object. `src/editor/install-editor-bridge.js` exposes status, state, snapshot, tick, reset, render and browser evidence. Neither surface exposes typed save, load, delete, list-slot or migration capabilities.

```txt
meadow-save-dsk declaration: present, planned
save capability availability result: absent
versioned save envelope: absent
bounded state projection: absent
slot registry and active slot lease: absent
persistence adapter: absent
atomic write/replace: absent
durability verification receipt: absent
quota/security/storage error classification: absent
schema migration registry: absent
restore admission and validation: absent
stale or foreign save rejection: absent
restore application settlement: absent
FirstRestoredStateFrameAck: absent
```

This is a capability-truth, durability and recovery gap. No player-data loss incident was reproduced.

## Required authority

`meadow-save-capability-admission-durable-commit-migration-authority-domain`

```txt
SaveCapabilityAdmissionCommand
  -> inspect implemented adapters, schema, migration and runtime generation
  -> distinguish planned descriptors from executable capability
  -> publish SaveCapabilityResult

SavePrepareCommand
  -> bind runtime, scene, session, state and slot revisions
  -> project only durable gameplay state
  -> attach schema version, build compatibility and digest
  -> publish SavePrepareResult

DurableSaveCommitCommand
  -> write to a temporary generation
  -> verify bytes and digest
  -> atomically replace the accepted slot
  -> retain bounded failure evidence
  -> publish DurableSaveCommitResult

RestoreAdmissionCommand
  -> read and classify the selected slot
  -> reject corrupt, foreign, stale or unsupported evidence
  -> select a migration path when required
  -> publish RestoreAdmissionResult

SaveMigrationCommand
  -> apply ordered idempotent migrations
  -> validate the resulting envelope
  -> publish SaveMigrationResult

RestoreApplyCommand
  -> replace runtime state exactly once
  -> allocate a restored session revision
  -> render the matching accepted state
  -> publish RestoreApplyResult
  -> publish FirstRestoredStateFrameAck
```

## Planned authority surfaces

```txt
1. meadow-save-capability-admission-durable-commit-migration-authority-domain
2. save-capability-manifest-kit
3. save-capability-admission-kit
4. save-schema-envelope-kit
5. save-state-projection-kit
6. save-exclusion-policy-kit
7. save-slot-registry-kit
8. save-slot-lease-kit
9. save-version-compatibility-kit
10. save-digest-kit
11. persistence-adapter-kit
12. atomic-save-write-kit
13. save-durability-verification-kit
14. persistence-failure-classification-kit
15. stale-foreign-save-rejection-kit
16. save-migration-registry-kit
17. restore-admission-validation-kit
18. restore-apply-settlement-kit
19. browser-persistence-fixture-kit
20. first-restored-state-frame-ack-kit
```

## Complete kit and offered service inventory

| Kit | Status | Offered services |
|---|---|---|
| `meadow-area-kit` | external loaded | meadow configuration, render-plan generation, snapshot, validation |
| `into-the-meadow-game-dsk` | active-v0.1 | game-manifest, kit-stack-registry, game-state-root, boot-sequence, game-snapshot |
| `web-host-dsk` | active-v0.1 | document-shell, browser-loop, host-debug-surface, asset-loading-host, browser-safety |
| `game-composition-dsk` | active-v0.1 | dsk-registry, scene-composition, render-composition, simulation-composition, composition-validation |
| `meadow-area-bridge-dsk` | active-v0.1 | meadow-area-config, meadow-feature-config, meadow-area-kit-adapter, meadow-area-state, meadow-area-validation |
| `meadow-terrain-texture-dsk` | planned | terrain-surface-model, material-layer-system, path-layer-system, terrain-sampler, terrain-validation |
| `path-corridor-dsk` | planned | path-curve-model, walkable-corridor, path-surface-detail, path-progression, path-validation |
| `grass-density-texture-kit` | active-v0.1 | density-texture-model, density-channels, density-compositor, density-sampler, density-validation |
| `grass-clump-archetype-kit` | active-v0.1 | clump-family-registry, card-layout-generator, texture-atlas-binding, clump-variant-generator, archetype-validation |
| `grass-static-batch-kit` | active-v0.1 | clump-mesh-builder, batch-variant-cache, atlas-material, static-batch-lod, batch-validation |
| `grass-patch-placement-kit` | active-v0.1 | patch-grid, density-driven-placement, clump-instance-selection, patch-instance-buffer, placement-validation |
| `grass-clump-instancing-render-kit` | active-v0.1 | batch-registry, instance-stream, draw-group-builder, shader-binding, render-validation |
| `grass-shader-wind-kit` | planned | wind-uniforms, tip-bend-model, phase-field, gust-response, wind-validation |
| `grass-lod-policy-kit` | planned | near-lod, mid-lod, far-lod, terrain-tint-lod, lod-validation |
| `grass-density-scaling-kit` | planned | quality-scale, budget-scale, density-scale, profile-scale, scale-validation |
| `grass-debug-visualization-kit` | planned | density-view, patch-view, instance-view, lod-view, debug-validation |
| `grass-patch-dsk` | planned | patch-grid, blade-distribution, terrain-awareness, wind-binding, grass-validation |
| `gpu-grass-render-dsk` | planned | grass-instance-buffer, grass-blade-mesh, shader-wind, grass-lod-render, grass-render-validation |
| `wind-field-dsk` | planned | wind-state, wind-sampler, wind-zones, wind-consumers, wind-validation |
| `tree-object-dsk` | planned | focal-tree-model, tree-line-model, tree-materials, tree-wind-binding, tree-validation |
| `meadow-scatter-dsk` | planned | flower-scatter, rock-scatter, mushroom-scatter, placement-rules, scatter-validation |
| `meadow-atmosphere-dsk` | planned | sky-gradient, sun-system, cloud-layer, distant-hills, atmosphere-validation |
| `meadow-player-dsk` | planned | player-state, movement-profile, terrain-contact, player-actions, player-validation |
| `meadow-camera-dsk` | planned | camera-mode, camera-rig, camera-collision, camera-feel, camera-validation |
| `meadow-input-dsk` | planned | action-map, device-bindings, input-context, input-normalization, input-validation |
| `meadow-interaction-dsk` | planned | interactable-registry, affordance-rules, inspect-state, interaction-events, interaction-validation |
| `meadow-story-dsk` | planned | story-state, story-beats, dialogue-text, sequence-runner, story-validation |
| `meadow-objective-dsk` | planned | objective-model, objective-flow, completion-ledger, feedback-surface, objective-validation |
| `meadow-ecology-dsk` | planned | ambient-life, ecology-zones, ambience-triggers, non-gameplay-agents, ecology-validation |
| `meadow-audio-dsk` | planned | ambient-bed, spatial-audio-cues, audio-state, audio-events, audio-validation |
| `meadow-ui-dsk` | planned | minimal-hud, story-text-panel, debug-ui, ui-state, ui-validation |
| `meadow-save-dsk` | planned | save-model, save-slots, persistence-adapter, migration, save-validation |
| `meadow-diagnostics-dsk` | active-v0.1 | runtime-health, render-health, determinism-checks, smoke-tests, diagnostics-report |
| `meadow-performance-dsk` | active-v0.1 | quality-profile, budget-policy, lod-policy, adaptive-scaling, performance-validation |
| `meadow-render-host-dsk` | active-v0.1 | renderer-selection, render-plan-ingest, pass-order, renderer-state, renderer-validation |
| `meadow-webgl-renderer-v2-kit` | active-v0.1 | model, state, events, validation, snapshot |
| `post-process-stack-dsk` | active-v0.1 | pass-registry, render-target-system, sobel-outline-pass, color-grade-pass, post-validation |
| `render-target-kit` | planned | scene-color-texture, depth-texture, normal-texture, ping-pong-buffer, resize-policy |
| `sobel-outline-pass-kit` | planned | color-edge-threshold, depth-edge-threshold, normal-edge-threshold, outline-color, object-mask |
| `color-grade-pass-kit` | planned | warmth, contrast, saturation, shadow-tint, highlight-tint |
| `depth-fog-pass-kit` | planned | fog-near, fog-far, fog-color, distance-curve, horizon-haze |
| `vignette-pass-kit` | planned | radius, softness, strength, center, quality-tier |
| `final-composite-pass-kit` | planned | scene-input, post-input, output-target, debug-overlay, fallback-composite |
| `static-pages-deploy-dsk` | active-v0.1 | build-config, github-pages-workflow, release-artifacts, cache-invalidation, deploy-validation |

## Census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
active-v0.1 local descriptors: 15
planned local descriptors: 28
planned save-authority surfaces: 20
implemented SaveCapabilityResult: 0
implemented DurableSaveCommitResult: 0
implemented SaveMigrationResult: 0
implemented RestoreApplyResult: 0
implemented FirstRestoredStateFrameAck: 0
```

## Validation boundary

Documentation only. Runtime JavaScript, gameplay state, storage, rendering, browser capabilities, tests, package scripts, workflows and deployment did not change. Relevant source files were inspected. `npm run check`, browser storage, reload/restore, migration, corruption, quota, artifact and Pages fixtures were not run.

No data-loss incident, atomic-save correctness, migration correctness, restore correctness, artifact parity, Pages parity or production readiness is claimed.