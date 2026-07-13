# IntoTheMeadow Project Breakdown

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-13T00-10-19-04-00`  
**Branch:** `main`  
**Status:** `provider-source-parity-authority-audited`

## Summary

IntoTheMeadow contains one browser-loaded external meadow provider, one local fallback provider, 43 local DSK declarations, immutable game state, deterministic content generation, render-plan enhancement, a WebGL renderer, browser `GameHost`, browser editor bridge and Node headless-editor tooling.

The current audit isolates provider-source parity. Browser boot requires the external ProtoKit at a pinned commit and stops before fallback on import/export failure. Headless/editor and deterministic tests omit external kits and therefore use the local fallback. The two environments are not joined by typed provider admission, source lineage, service validation, plan fingerprints or semantic parity proof.

## Plan ledger

**Goal:** preserve the complete 44-kit architecture while defining one provider-source transaction from manifest resolution through fallback policy, conformance, parity and visible-frame acknowledgement.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Confirm current eligible heads match central documentation heads.
- [x] Select only `LuminaryLabs-Publish/IntoTheMeadow`, the oldest eligible central entry.
- [x] Inspect manifest pinning, browser dynamic import, provider export validation and fallback reachability.
- [x] Inspect DSK external status, validation, game snapshots and diagnostics.
- [x] Inspect headless/editor and deterministic-test provider construction.
- [x] Inspect the exact pinned ProtoKit factory and version.
- [x] Identify the complete interaction loop and all active, declared and missing domains.
- [x] Preserve all 44 kit surfaces and every offered service.
- [x] Define the provider-source parity parent authority.
- [x] Add the timestamped tracker, turn ledger and system-specific audit family.
- [x] Refresh required root `.agent` documents and machine registry.
- [x] Push documentation only to `main`; create no branch or pull request.
- [ ] Runtime provider admission and executable parity fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
unsynchronized eligible repositories: 0

IntoTheMeadow      2026-07-12T21-40-09-04-00 selected oldest
PhantomCommand     2026-07-12T22-15-00-04-00
PrehistoricRush    2026-07-12T22-18-39-04-00
HorrorCorridor     2026-07-12T22-44-30-04-00
ZombieOrchard      2026-07-12T23-00-53-04-00
MyCozyIsland       2026-07-12T23-08-37-04-00
TheUnmappedHouse   2026-07-12T23-20-51-04-00
AetherVale         2026-07-12T23-40-11-04-00
TheOpenAbove       2026-07-13T00-00-02-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/IntoTheMeadow` is modified in the Publish organization.

## Complete interaction loop

```txt
browser boot
  -> boot-game obtains canvas/HUD/status nodes
  -> startWebHost calls loadExternalKits
  -> manifest supplies jsDelivr URL pinned to ProtoKits commit
  -> dynamic import module
  -> require createMeadowAreaKit function
  -> createIntoTheMeadowGame({ externalKits })
  -> install 43 local descriptors
  -> mark external row loaded from function truthiness
  -> instantiate external provider
  -> build base render plan
  -> install enhancer, WebGL renderer, GameHost and editor bridge
  -> begin RAF frames

browser load failure
  -> missing URL, import failure or missing export throws
  -> game creation is not reached
  -> local fallback is not selected
  -> generic boot failure is shown

headless/editor
  -> createEnvironment calls createIntoTheMeadowGame()
  -> externalKits defaults empty
  -> local fallback factory is selected
  -> local-source-plan-v1 is enhanced, meshed, measured and captured

deterministic test
  -> createIntoTheMeadowGame()
  -> local fallback only
  -> repeated game snapshot is checked
  -> external provider is not loaded or compared

normal frame
  -> tick immutable state
  -> read provider render plan
  -> enhance to meadow-render-plan/v2
  -> build/reuse mesh
  -> draw WebGL outline and color passes
  -> publish renderer/editor snapshots
```

## Domains in use

```txt
browser document shell, loading and fatal projection
game manifest, build metadata and public route
external module URL, repository and commit identity
dynamic import and provider factory export validation
local fallback provider generation
DSK descriptor state, external status and local validation
game state, tick, reset, snapshots and diagnostics
story, objective and interaction-target content
meadow area, terrain, path, grass, trees, scatter, wind and atmosphere
render-plan enhancement, topology cache and contract normalization
CPU mesh generation and WebGL rendering
GameHost and browser editor bridge
Node headless editor, workspace and SVG capture
determinism, static, DSK, render and editor smoke surfaces
build and GitHub Pages deployment

declared but inert:
  input, player, interaction, objective, story, ecology, audio, UI, save and adaptive performance

missing:
  provider source session and generation
  provider contract/version/service admission
  explicit external/fallback policy
  provider load/fallback terminal results
  provider snapshot lineage in game snapshots
  provider and source-plan fingerprints
  external/fallback semantic parity result
  source-profile-specific determinism proof
  first visible provider-frame acknowledgement
```

## Provider census

```txt
manifest external provider rows: 1
browser external provider version: 0.1.0
browser external commit: 11d245913ba4d30f3ce950eb5a17e1cc6e4aa1f5
local fallback implementations: 1
fallback render-plan version: local-source-plan-v1
browser fallback reachability: none
headless external-provider execution: none
deterministic-test external-provider execution: none
```

## Kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
required-v0.1 declarations: 15
planned declarations: 28
implemented provider-source parity authorities: 0
```

## Complete kit and offered-service inventory

| Kit | Offered services |
|---|---|
| `meadow-area-kit` | area normalization; path normalization; style/material normalization; deterministic seeded scatter; meadow feature descriptors; render-plan generation; validation; snapshot; reset; optional runtime adapter |
| `into-the-meadow-game-dsk` | game-manifest; kit-stack-registry; game-state-root; boot-sequence; game-snapshot |
| `web-host-dsk` | document-shell; browser-loop; host-debug-surface; asset-loading-host; browser-safety |
| `game-composition-dsk` | dsk-registry; scene-composition; render-composition; simulation-composition; composition-validation |
| `meadow-area-bridge-dsk` | meadow-area-config; meadow-feature-config; meadow-area-kit-adapter; meadow-area-state; meadow-area-validation |
| `meadow-terrain-texture-dsk` | terrain-surface-model; material-layer-system; path-layer-system; terrain-sampler; terrain-validation |
| `path-corridor-dsk` | path-curve-model; walkable-corridor; path-surface-detail; path-progression; path-validation |
| `grass-density-texture-kit` | density-texture-model; density-channels; density-compositor; density-sampler; density-validation |
| `grass-clump-archetype-kit` | clump-family-registry; card-layout-generator; texture-atlas-binding; clump-variant-generator; archetype-validation |
| `grass-static-batch-kit` | clump-mesh-builder; batch-variant-cache; atlas-material; static-batch-lod; batch-validation |
| `grass-patch-placement-kit` | patch-grid; density-driven-placement; clump-instance-selection; patch-instance-buffer; placement-validation |
| `grass-clump-instancing-render-kit` | batch-registry; instance-stream; draw-group-builder; shader-binding; render-validation |
| `grass-shader-wind-kit` | wind-uniforms; tip-bend-model; phase-field; gust-response; wind-validation |
| `grass-lod-policy-kit` | near-lod; mid-lod; far-lod; terrain-tint-lod; lod-validation |
| `grass-density-scaling-kit` | quality-scale; budget-scale; density-scale; profile-scale; scale-validation |
| `grass-debug-visualization-kit` | density-view; patch-view; instance-view; lod-view; debug-validation |
| `grass-patch-dsk` | patch-grid; blade-distribution; terrain-awareness; wind-binding; grass-validation |
| `gpu-grass-render-dsk` | grass-instance-buffer; grass-blade-mesh; shader-wind; grass-lod-render; grass-render-validation |
| `wind-field-dsk` | wind-state; wind-sampler; wind-zones; wind-consumers; wind-validation |
| `tree-object-dsk` | focal-tree-model; tree-line-model; tree-materials; tree-wind-binding; tree-validation |
| `meadow-scatter-dsk` | flower-scatter; rock-scatter; mushroom-scatter; placement-rules; scatter-validation |
| `meadow-atmosphere-dsk` | sky-gradient; sun-system; cloud-layer; distant-hills; atmosphere-validation |
| `meadow-player-dsk` | player-state; movement-profile; terrain-contact; player-actions; player-validation |
| `meadow-camera-dsk` | camera-mode; camera-rig; camera-collision; camera-feel; camera-validation |
| `meadow-input-dsk` | action-map; device-bindings; input-context; input-normalization; input-validation |
| `meadow-interaction-dsk` | interactable-registry; affordance-rules; inspect-state; interaction-events; interaction-validation |
| `meadow-story-dsk` | story-state; story-beats; dialogue-text; sequence-runner; story-validation |
| `meadow-objective-dsk` | objective-model; objective-flow; completion-ledger; feedback-surface; objective-validation |
| `meadow-ecology-dsk` | ambient-life; ecology-zones; ambience-triggers; non-gameplay-agents; ecology-validation |
| `meadow-audio-dsk` | ambient-bed; spatial-audio-cues; audio-state; audio-events; audio-validation |
| `meadow-ui-dsk` | minimal-hud; story-text-panel; debug-ui; ui-state; ui-validation |
| `meadow-save-dsk` | save-model; save-slots; persistence-adapter; migration; save-validation |
| `meadow-diagnostics-dsk` | runtime-health; render-health; determinism-checks; smoke-tests; diagnostics-report |
| `meadow-performance-dsk` | quality-profile; budget-policy; lod-policy; adaptive-scaling; performance-validation |
| `meadow-render-host-dsk` | renderer-selection; render-plan-ingest; pass-order; renderer-state; renderer-validation |
| `meadow-webgl-renderer-v2-kit` | WebGL context acquisition; shader program creation; attribute/uniform binding; CPU mesh ingestion; GPU buffer ownership; draw submission; resize; snapshot; disposal |
| `post-process-stack-dsk` | pass-registry; render-target-system; sobel-outline-pass; color-grade-pass; post-validation |
| `render-target-kit` | scene-color-texture; depth-texture; normal-texture; ping-pong-buffer; resize-policy |
| `sobel-outline-pass-kit` | color-edge-threshold; depth-edge-threshold; normal-edge-threshold; outline-color; object-mask |
| `color-grade-pass-kit` | warmth; contrast; saturation; shadow-tint; highlight-tint |
| `depth-fog-pass-kit` | fog-near; fog-far; fog-color; distance-curve; horizon-haze |
| `vignette-pass-kit` | radius; softness; strength; center; quality-tier |
| `final-composite-pass-kit` | scene-input; post-input; output-target; debug-overlay; fallback-composite |
| `static-pages-deploy-dsk` | build-config; github-pages-workflow; release-artifacts; cache-invalidation; deploy-validation |

## Source-backed findings

### Browser requires the external provider

`startWebHost()` awaits `loadExternalKits()` before it calls game construction. The loader reads the manifest URL, imports the module and accepts only a `createMeadowAreaKit` function. Any failure rejects boot before fallback selection.

### Fallback exists at a lower layer only

`createIntoTheMeadowGame()` chooses `createFallbackMeadowAreaKit` only when no external factory is supplied. This is used by Node/headless and tests, but not by normal browser boot.

### Browser and Node proof use different provider implementations

The pinned ProtoKit exports version `0.1.0` and uses its own area/path/style normalization and seeded-scatter algorithm. The local provider emits `local-source-plan-v1` and uses a separate hash/scatter implementation. Both currently produce a broad compatible plan shape, but no fixture proves semantic equivalence.

### DSK readiness is declaration-shaped

`installDsks()` marks the external row loaded from factory truthiness and sets overall validation from local descriptor validation only. It does not validate external provider version, services, snapshot, runtime adapter or plan contract.

### Snapshot lineage is incomplete

The game snapshot includes manifest, state, render plan and diagnostics. It does not include the provider snapshot, selected source mode, repository/commit, module URL, service manifest or provider fingerprint. Diagnostics count the declared external row rather than separate loaded/deferred/rejected totals.

### Current tests do not prove deployed provider behavior

The deterministic scene smoke creates the game without external kits. Static smoke verifies files, host imports and the NexusEngine dependency pin. It does not execute the pinned external module or compare browser and fallback results.

## Required parent domain

```txt
meadow-provider-source-parity-authority-domain
```

## Candidate coordinating kits

```txt
provider-source-id-kit
provider-generation-kit
provider-module-identity-kit
provider-contract-version-kit
provider-service-manifest-kit
provider-load-command-kit
provider-load-admission-kit
provider-load-result-kit
provider-fallback-policy-kit
provider-fallback-result-kit
provider-capability-validation-kit
provider-plan-conformance-kit
provider-plan-fingerprint-kit
provider-parity-result-kit
provider-source-observation-kit
provider-source-journal-kit
stale-provider-result-rejection-kit
first-provider-frame-ack-kit
browser-provider-smoke-kit
headless-provider-smoke-kit
browser-headless-parity-fixture-kit
pages-provider-smoke-kit
```

## Required transaction

```txt
ProviderLoadCommand
  -> bind runtime session, environment and expected source policy
  -> resolve provider ID, owner, repo, commit, module path and contract version
  -> load external candidate or explicitly select fallback
  -> validate factory, version and required/provided services
  -> instantiate detached provider candidate
  -> validate provider snapshot and representative render plan
  -> calculate provider and plan fingerprints
  -> commit exactly one provider generation
  -> publish ProviderLoadResult
  -> expose lineage in game, editor and renderer snapshots
  -> render and acknowledge the first frame from that generation

failure
  -> rejected external result
  -> admitted fallback-selected result
  -> or terminal external-required result
  -> zero silent source substitution
```

## Required proof matrix

| Case | Expected result |
|---|---|
| pinned external module succeeds | admitted external provider with exact commit/version |
| URL missing | rejected manifest result |
| dynamic import fails | fallback-selected or terminal by explicit policy |
| factory export missing | rejected provider contract |
| version incompatible | rejected compatibility result |
| fallback-only headless profile | admitted fallback with explicit lineage |
| same config across both providers | conformance and fingerprint comparison |
| repeated runs per source | deterministic source-profile result |
| browser and Pages frame | visible frame cites provider generation |

## Output

```txt
.agent/trackers/2026-07-13T00-10-19-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T00-10-19-04-00.md
.agent/architecture-audit/2026-07-13T00-10-19-04-00-provider-source-parity-dsk-map.md
.agent/render-audit/2026-07-13T00-10-19-04-00-browser-headless-provider-visible-plan-gap.md
.agent/gameplay-audit/2026-07-13T00-10-19-04-00-browser-cdn-headless-fallback-loop.md
.agent/interaction-audit/2026-07-13T00-10-19-04-00-provider-load-admission-result-map.md
.agent/provider-source-audit/2026-07-13T00-10-19-04-00-commit-version-contract-parity.md
.agent/deploy-audit/2026-07-13T00-10-19-04-00-provider-source-parity-fixture-gate.md
```

## Validation boundary

Documentation only. No runtime, provider, gameplay, renderer, package, dependency or deployment behavior changed. No external-provider, fallback, cross-source parity, browser or Pages fixture was executed.
