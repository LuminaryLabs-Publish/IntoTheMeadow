# Project Breakdown: IntoTheMeadow DSK Capability Dependency Admission

**Timestamp:** `2026-07-14T04-00-15-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Repository head reviewed:** `7ac9cda130a32bf23022aa4ed87e0111b7af6d18`  
**Runtime source revision retained:** `db9bd0127fcb28a2b37706ca32cc7b201a646d17`  
**Status:** `dsk-capability-dependency-admission-authority-audited`

## Summary

IntoTheMeadow maintains a broad DSK catalog, but the current runtime treats that catalog as architecture metadata. Local descriptors are generated from one table, report five service labels, expose one generic `game:<domain>` token and declare no requirements. Installation validates descriptor shape and returns snapshots; it does not resolve or install an executable service graph.

The game then creates the meadow provider and immutable state directly. A valid DSK snapshot can therefore describe player, input, story, objective, audio, UI, save and other capabilities that are not yet active runtime services.

## Plan ledger

**Goal:** define one DSK composition transaction that proves concrete service ownership, dependency satisfaction, executable provider readiness, atomic adoption and matching runtime/frame readback.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare ten eligible repositories with central tracking.
- [x] Confirm central-ledger and root `.agent` coverage for all ten eligible repositories.
- [x] Confirm no eligible repository is new, missing, undocumented or runtime-ahead.
- [x] Select only `LuminaryLabs-Publish/IntoTheMeadow` by the oldest eligible central timestamp.
- [x] Read the registry declarations, descriptor generator, validation, installer, game composition, state and smoke test.
- [x] Identify the complete interaction loop and domains in use.
- [x] Preserve all 44 declared kit surfaces and offered services.
- [x] Define the 22-surface DSK capability admission authority family.
- [x] Add architecture, render, gameplay, interaction, DSK-admission, deploy and central-sync audits.
- [x] Change documentation only.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement and execute capability graph fixtures later.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible non-Cavalry repositories: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
runtime-ahead eligible repositories: 0

IntoTheMeadow    selected: oldest eligible central timestamp
HorrorCorridor   tracked, root agent present, synchronized
AetherVale       tracked, root agent present, synchronized
ZombieOrchard    tracked, root agent present, synchronized
TheUnmappedHouse tracked, root agent present, synchronized
MyCozyIsland     tracked, root agent present, synchronized
TheOpenAbove     tracked, root agent present, synchronized
PhantomCommand   tracked, root agent present, synchronized
PrehistoricRush  tracked, root agent present, synchronized
TheLongHaul      tracked, root agent present, synchronized
TheCavalryOfRome excluded
```

Only `LuminaryLabs-Publish/IntoTheMeadow` was modified in the Publish organization.

## Complete interaction loop

```txt
index.html
  -> boot-game.js resolves canvas, HUD, status and loading nodes
  -> startWebHost loads the external meadow-area provider
  -> createIntoTheMeadowGame calls installDsks

installDsks
  -> generate 43 local descriptors
  -> validate duplicate IDs, suffixes, five labels and required IDs
  -> classify the external provider as loaded or deferred
  -> return descriptors, counts, validation and snapshots

createIntoTheMeadowGame
  -> create meadow provider instance directly
  -> build one base render plan
  -> create immutable game state carrying the DSK snapshot
  -> expose tick, reset, snapshots, diagnostics and render-plan access

frame
  -> tick frame/time metadata
  -> enhance and validate render plan
  -> submit WebGL draw
  -> report DSK counts and renderer facts
  -> no DSK composition revision or executable capability receipt is attached
```

## Main findings

### Service labels are not service-registry tokens

Each descriptor uses the `SERVICES` table to produce five layer labels, but `provides` contains only one generic `game:<domain>` token. The catalog cannot prove which specific API implements `player-state`, `input-normalization`, `save-model`, `audio-events` or any other listed service.

### Every local dependency list is empty

`createDskDescriptor()` returns `requires: []` for every local kit. Missing requirements, incompatible versions and dependency cycles are therefore invisible to current validation.

### Planned and active descriptors share one structural path

The `status` field distinguishes the 15 required v0.1 descriptors from 28 planned descriptors, but installation returns both together. There is no admission rule preventing a planned descriptor from appearing to satisfy an active capability expectation.

### External availability is status, not composition admission

The installer records the external meadow provider as `loaded` or `deferred`. It does not declare whether a deferred external provider is fatal, degraded or replaceable. The browser host separately requires the provider, while direct game creation can use a fallback.

### Installation does not install executable services

`installDsks()` returns descriptors and snapshots. It does not create service handles, prepare participants, topologically order initialization, probe APIs, adopt a composition atomically or dispose failed candidates.

### Runtime composition bypasses most declared capabilities

Game creation directly creates the meadow provider, render plan and immutable state. `advanceGameState()` increments frame metadata only. Most cataloged player, input, interaction, story, objective, audio, UI and save services are not reached through DSK service APIs.

### Existing proof is structural

The DSK smoke validates the registry, requires at least 26 descriptors and checks five layers per descriptor. It does not execute the advertised services or inject graph failures.

## Domains in use

```txt
repository and source revision identity
external provider identity and dynamic import
DSK registry and active/planned classification
service label and generic provides-token declaration
descriptor validation and required-ID presence
external loaded/deferred status
immutable game state and DSK snapshots
meadow provider and render-plan generation
frame/time advancement
render-plan enhancement and WebGL rendering
GameHost, editor bridge and diagnostics readback
capability dependency, ownership and version admission
service provider preparation, probing, adoption, rollback and disposal
capability-aware gameplay command admission
visible capability revision evidence
static, headless, build and Pages validation
repo-local and central audit tracking
```

## Kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
active-v0.1 local descriptors: 15
planned local descriptors: 28
planned capability-admission surfaces including parent: 22
```

## Complete kit and offered-service inventory

| Kit | Offered services |
|---|---|
| `meadow-area-kit` | area, path and style normalization; deterministic scatter; feature descriptors; render-plan generation; validation; snapshot; reset; runtime adaptation |
| `into-the-meadow-game-dsk` | game manifest; kit-stack registry; game-state root; boot sequence; game snapshot |
| `web-host-dsk` | document shell; browser loop; debug host; asset loading; browser safety |
| `game-composition-dsk` | DSK registry; scene, render and simulation composition; composition validation |
| `meadow-area-bridge-dsk` | meadow configuration; provider adapter; area state; area validation |
| `meadow-terrain-texture-dsk` | terrain model; material and path layers; terrain sampling; validation |
| `path-corridor-dsk` | path curve; walkable corridor; detail; progression; validation |
| `grass-density-texture-kit` | density texture; channels; compositor; sampler; validation |
| `grass-clump-archetype-kit` | clump registry; card layout; atlas binding; variants; validation |
| `grass-static-batch-kit` | clump mesh; variant cache; atlas material; static LOD; validation |
| `grass-patch-placement-kit` | patch grid; density placement; instance selection and buffers; validation |
| `grass-clump-instancing-render-kit` | batch registry; instance stream; draw groups; shader binding; validation |
| `grass-shader-wind-kit` | wind uniforms; tip bend; phase field; gust response; validation |
| `grass-lod-policy-kit` | near, mid, far and terrain-tint LOD; validation |
| `grass-density-scaling-kit` | quality, budget, density and profile scaling; validation |
| `grass-debug-visualization-kit` | density, patch, instance and LOD views; validation |
| `grass-patch-dsk` | patch grid; blade distribution; terrain awareness; wind binding; validation |
| `gpu-grass-render-dsk` | instance buffers; blade mesh; shader wind; LOD rendering; validation |
| `wind-field-dsk` | wind state; sampler; zones; consumers; validation |
| `tree-object-dsk` | focal tree; tree line; materials; wind binding; validation |
| `meadow-scatter-dsk` | flower, rock and mushroom scatter; placement rules; validation |
| `meadow-atmosphere-dsk` | sky, sun, clouds, distant hills; validation |
| `meadow-player-dsk` | player state; movement; terrain contact; actions; validation |
| `meadow-camera-dsk` | camera mode; rig; collision; feel; validation |
| `meadow-input-dsk` | action map; bindings; contexts; normalization; validation |
| `meadow-interaction-dsk` | interactable registry; affordances; inspection; events; validation |
| `meadow-story-dsk` | story state; beats; dialogue; sequences; validation |
| `meadow-objective-dsk` | objective model; flow; completion; feedback; validation |
| `meadow-ecology-dsk` | ambient life; zones; triggers; non-gameplay agents; validation |
| `meadow-audio-dsk` | ambient bed; spatial cues; audio state and events; validation |
| `meadow-ui-dsk` | HUD; story panel; debug UI; UI state; validation |
| `meadow-save-dsk` | save model; slots; persistence adapter; migration; validation |
| `meadow-diagnostics-dsk` | runtime health; render health; determinism checks; smoke reports |
| `meadow-performance-dsk` | quality profile; budgets; LOD; adaptive scaling; validation |
| `meadow-render-host-dsk` | renderer selection; plan ingest; pass order; state; validation |
| `meadow-webgl-renderer-v2-kit` | context; shaders; attributes; uniforms; CPU mesh ingest; GPU buffers; draw; resize; snapshot; disposal |
| `post-process-stack-dsk` | pass registry; targets; outline; color grade; validation |
| `render-target-kit` | scene color, depth, normal and ping-pong buffers; resize policy |
| `sobel-outline-pass-kit` | color, depth and normal thresholds; outline color; object mask |
| `color-grade-pass-kit` | warmth; contrast; saturation; shadow and highlight tint |
| `depth-fog-pass-kit` | fog range; color; distance curve; horizon haze |
| `vignette-pass-kit` | radius; softness; strength; center; quality tier |
| `final-composite-pass-kit` | scene/post inputs; output; debug overlay; fallback composite |
| `static-pages-deploy-dsk` | build configuration; Pages workflow; artifacts; cache invalidation; deploy validation |

## Required parent domain

```txt
meadow-dsk-capability-dependency-admission-authority-domain
```

## Required transaction

```txt
DskCompositionCommand
  -> bind RepositoryRevision, DskRegistryRevision and ProviderRevision
  -> normalize active, planned, experimental and external manifests
  -> expand concrete provides and requires service tokens
  -> validate unique ownership and explicit multi-provider policies
  -> validate service API versions and provider compatibility
  -> resolve one acyclic dependency graph
  -> reject planned, deferred, missing, duplicate, stale or conflicting capabilities
  -> prepare executable service providers in dependency order
  -> probe every required active service
  -> collect preparation receipts
  -> atomically adopt all participants or dispose all candidates
  -> publish DskCompositionResult and immutable CapabilityManifest
  -> bind game state, commands, diagnostics and editor readback to the accepted revision
  -> publish FirstCapabilityRevisionFrameAck
```

## Planned coordinating kits

```txt
meadow-dsk-capability-dependency-admission-authority-domain
dsk-composition-command-kit
dsk-registry-revision-kit
dsk-capability-manifest-kit
dsk-status-admission-kit
service-token-normalization-kit
service-ownership-registry-kit
dependency-version-policy-kit
dependency-graph-resolution-kit
dependency-cycle-rejection-kit
external-provider-admission-kit
planned-capability-rejection-kit
service-provider-preparation-kit
service-probe-kit
composition-preparation-receipt-kit
composition-atomic-adoption-kit
composition-rollback-kit
capability-manifest-readback-kit
gameplay-capability-admission-kit
capability-diagnostics-kit
first-capability-frame-ack-kit
dsk-composition-result-kit
```

## Repo-local output

```txt
.agent/trackers/2026-07-14T04-00-15-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T04-00-15-04-00.md
.agent/architecture-audit/2026-07-14T04-00-15-04-00-dsk-capability-dependency-admission-map.md
.agent/render-audit/2026-07-14T04-00-15-04-00-capability-state-visible-frame-gap.md
.agent/gameplay-audit/2026-07-14T04-00-15-04-00-declared-capability-runtime-loop.md
.agent/interaction-audit/2026-07-14T04-00-15-04-00-capability-command-service-result-map.md
.agent/dsk-admission-audit/2026-07-14T04-00-15-04-00-requires-provides-service-ownership-contract.md
.agent/deploy-audit/2026-07-14T04-00-15-04-00-dsk-capability-fixture-gate.md
.agent/central-sync-audit/2026-07-14T04-00-15-04-00-repo-ledger-dsk-capability-reconciliation.md
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Validation

```txt
runtime, DSK declarations, installer, game and renderer changed: no
package, dependency, test, workflow and deployment changed: no
branch created: no
pull request created: no

npm run check: not run
dependency graph fixtures: unavailable
service provider probes: unavailable
rollback fixtures: unavailable
browser capability readback: not run
built-output and Pages capability parity: not run
```

No executable service ownership, dependency resolution, atomic composition, rollback, gameplay capability admission, visible-frame convergence or production-readiness claim is made.