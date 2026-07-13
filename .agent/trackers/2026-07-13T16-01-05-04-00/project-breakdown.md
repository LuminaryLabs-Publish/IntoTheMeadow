# Project Breakdown: IntoTheMeadow Render Cache Coherence Authority

**Timestamp:** `2026-07-13T16-01-05-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Repository head reviewed:** `5db8c358cac34118619bb83e839f6f962c7b3e80`  
**Status:** `render-plan-mesh-cache-coherence-authority-audited`

## Summary

IntoTheMeadow has two persistent render caches. The render-plan enhancer reuses a contracted plan from `sourceTopologyKey`, then the WebGL renderer reuses CPU mesh data and GPU buffers from `contract.topologyKey`.

Both fingerprints omit values that are consumed by later stages. Some source descriptor changes never rebuild the contracted plan, while other accepted plan changes rebuild the enhancer but still reuse an obsolete GPU mesh. The current cache counters prove hits and rebuilds, but they do not prove dependency coverage, visible adoption, or source-to-frame coherence.

## Plan ledger

**Goal:** require every render-affecting source, policy, descriptor, mesh and GPU-buffer dependency to participate in one classified cache decision and prove the first matching visible frame.

- [x] Enumerate all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare all nine eligible repositories with `LuminaryLabs-Dev/LuminaryLabs` ledger entries.
- [x] Confirm every eligible repository head matches its recorded repo-local documentation head.
- [x] Select only `LuminaryLabs-Publish/IntoTheMeadow` as the oldest eligible central entry.
- [x] Read the render-plan enhancer, render contract, CPU mesh builder, WebGL renderer, web host, editor bridge and cache smoke tests.
- [x] Trace source-plan fingerprinting, contracted-plan generation, topology fingerprinting, mesh building, GPU-buffer reuse and visible projection.
- [x] Identify the complete interaction loop and all domains in use.
- [x] Preserve all 44 declared kit surfaces and their offered services.
- [x] Define the missing render cache coherence authority and candidate kit family.
- [x] Add architecture, render, gameplay, interaction, cache-coherence, deploy and central-sync audits.
- [x] Change documentation only.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement exhaustive dependency fingerprints and executable mutation fixtures later.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
root .agent states recorded: 9
new eligible repositories: 0
ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
repo-local heads newer than central documentation heads: 0

IntoTheMeadow      2026-07-13T10-59-22-04-00 selected
PhantomCommand     2026-07-13T11-41-10-04-00
HorrorCorridor     2026-07-13T11-58-45-04-00
ZombieOrchard      2026-07-13T13-01-03-04-00
TheOpenAbove       2026-07-13T13-39-10-04-00
PrehistoricRush    2026-07-13T13-58-35-04-00
MyCozyIsland       2026-07-13T14-39-40-04-00
TheUnmappedHouse   2026-07-13T14-58-07-04-00
AetherVale         2026-07-13T15-41-24-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/IntoTheMeadow` was modified in the Publish organization.

## Complete interaction loop

```txt
browser frame
  -> game.tick({ time, dt })
  -> game.getRenderPlan(time)
  -> planEnhancer.enhance(rawPlan)

render-plan enhancer
  -> calculate sourceTopologyKey(rawPlan)
  -> compare with cachedSourceKey
  -> cache hit: reuse the previous contracted plan and overlay time
  -> cache miss: normalize descriptors, generate grass, create render plan v2 and tune it
  -> publish enhancer cache counters

contract construction
  -> calculate contract.topologyKey from topologySummary(contractedPlan)
  -> validate schema and required descriptor families

WebGL renderer
  -> compare contract.topologyKey with cached mesh topology key
  -> cache hit: reuse CPU mesh and existing GPU attribute buffers
  -> cache miss: build CPU mesh, delete old buffers and upload new buffers
  -> apply per-frame camera, light, wind and sky uniforms
  -> submit outline and color draws
  -> publish renderer cache counters

editor and diagnostics
  -> read enhancer snapshot and renderer snapshot independently
  -> no source revision, dependency manifest, mesh fingerprint or visible-frame receipt joins them
```

## Domains in use

```txt
browser document, canvas, RAF, loading and fatal projection
external meadow provider loading and deterministic fallback generation
immutable game state, frame count, reset, snapshots and diagnostics
DSK declaration registry, composition and validation
meadow terrain, path, scatter, trees, grass, wind and atmosphere
source render-plan identity, source descriptor revisions and policy revisions
render-plan enhancement, normalization, filtering and quality policy
contracted render descriptors and contract validation
source cache key construction and enhancer cache lifecycle
mesh dependency classification and CPU mesh generation
contract topology key construction and renderer cache lifecycle
WebGL attribute-buffer allocation, replacement, reuse and disposal
camera, light, sky and wind uniform projection
GameHost and editor cache/readback observations
visible frame provenance and first-adoption acknowledgement
headless editor scenarios, artifacts and comparison loops
static checks, deterministic smoke, build and Pages deployment
```

## Kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
required-v0.1 local declarations: 15
planned local declarations: 28
implemented cache-coherence authority domains: 0
planned cache-coherence surfaces including parent: 24
```

## Complete kit and offered-service inventory

| Kit | Offered services |
|---|---|
| `meadow-area-kit` | area normalization; path normalization; style/material normalization; deterministic seeded scatter; feature descriptors; render-plan generation; validation; snapshot; reset; optional runtime adapter |
| `into-the-meadow-game-dsk` | game manifest; kit-stack registry; game-state root; boot sequence; game snapshot |
| `web-host-dsk` | document shell; browser loop; host debug surface; asset loading; browser safety |
| `game-composition-dsk` | DSK registry; scene composition; render composition; simulation composition; composition validation |
| `meadow-area-bridge-dsk` | meadow configuration; feature configuration; provider adapter; area state; area validation |
| `meadow-terrain-texture-dsk` | terrain surface model; material layers; path layers; terrain sampling; terrain validation |
| `path-corridor-dsk` | path curve; walkable corridor; surface detail; path progression; path validation |
| `grass-density-texture-kit` | density texture; density channels; density compositor; density sampler; density validation |
| `grass-clump-archetype-kit` | clump registry; card layout; atlas binding; clump variants; archetype validation |
| `grass-static-batch-kit` | clump mesh; variant cache; atlas material; static-batch LOD; batch validation |
| `grass-patch-placement-kit` | patch grid; density placement; instance selection; instance buffer; placement validation |
| `grass-clump-instancing-render-kit` | batch registry; instance stream; draw groups; shader binding; render validation |
| `grass-shader-wind-kit` | wind uniforms; tip bend; phase field; gust response; wind validation |
| `grass-lod-policy-kit` | near, mid and far LOD; terrain-tint LOD; LOD validation |
| `grass-density-scaling-kit` | quality, budget, density and profile scaling; scale validation |
| `grass-debug-visualization-kit` | density, patch, instance and LOD views; debug validation |
| `grass-patch-dsk` | patch grid; blade distribution; terrain awareness; wind binding; grass validation |
| `gpu-grass-render-dsk` | instance buffer; blade mesh; shader wind; grass LOD rendering; render validation |
| `wind-field-dsk` | wind state; wind sampler; wind zones; wind consumers; wind validation |
| `tree-object-dsk` | focal tree; tree line; tree materials; wind binding; tree validation |
| `meadow-scatter-dsk` | flower, rock and mushroom scatter; placement rules; scatter validation |
| `meadow-atmosphere-dsk` | sky gradient; sun; clouds; distant hills; atmosphere validation |
| `meadow-player-dsk` | player state; movement profile; terrain contact; player actions; player validation |
| `meadow-camera-dsk` | camera mode; rig; collision; feel; camera validation |
| `meadow-input-dsk` | action map; device bindings; input context; normalization; input validation |
| `meadow-interaction-dsk` | interactable registry; affordance rules; inspect state; interaction events; validation |
| `meadow-story-dsk` | story state; beats; dialogue; sequence runner; story validation |
| `meadow-objective-dsk` | objective model; flow; completion ledger; feedback; objective validation |
| `meadow-ecology-dsk` | ambient life; ecology zones; ambience triggers; non-gameplay agents; validation |
| `meadow-audio-dsk` | ambient bed; spatial cues; audio state; audio events; audio validation |
| `meadow-ui-dsk` | minimal HUD; story panel; debug UI; UI state; UI validation |
| `meadow-save-dsk` | save model; slots; persistence adapter; migration; save validation |
| `meadow-diagnostics-dsk` | runtime health; render health; determinism checks; smoke tests; diagnostics report |
| `meadow-performance-dsk` | quality profile; budget policy; LOD policy; adaptive scaling; validation |
| `meadow-render-host-dsk` | renderer selection; render-plan ingest; pass order; renderer state; validation |
| `meadow-webgl-renderer-v2-kit` | WebGL context; shaders; attributes/uniforms; CPU mesh ingest; GPU buffers; draw submission; resize; snapshot; disposal |
| `post-process-stack-dsk` | pass registry; render targets; Sobel outline; color grade; post validation |
| `render-target-kit` | scene color; depth; normal; ping-pong buffers; resize policy |
| `sobel-outline-pass-kit` | color, depth and normal thresholds; outline color; object mask |
| `color-grade-pass-kit` | warmth; contrast; saturation; shadow tint; highlight tint |
| `depth-fog-pass-kit` | fog near/far; fog color; distance curve; horizon haze |
| `vignette-pass-kit` | radius; softness; strength; center; quality tier |
| `final-composite-pass-kit` | scene input; post input; output target; debug overlay; fallback composite |
| `static-pages-deploy-dsk` | build configuration; Pages workflow; release artifacts; cache invalidation; deploy validation |

## Source-backed findings

### The enhancer fingerprint omits descriptor values it consumes

`sourceTopologyKey()` fingerprints object ID, type, position, scale and rotation. For paths it adds points and width. For focal trees it adds branch count and canopy radius. It does not include object color or accent, atmosphere hills, path rut or pebble counts, focal-tree trunk height, trunk radius, root count, leaf-cluster count or shadow radius.

Those omitted values are consumed while constructing flower, rock, distant-tree, atmosphere, path and focal-tree descriptors. A change can therefore leave `sourceTopologyKey` unchanged and return the previous contracted plan as a cache hit.

### Runtime performance overrides are outside the enhancer key

`createRenderPlanEnhancer().enhance()` calculates the key from the raw plan before applying `runtime.performance`. The override can alter grass density, object budgets, outline policy and quality profile, yet it does not independently participate in cache identity.

### The contract topology fingerprint omits CPU-mesh dependencies

`topologySummary()` includes terrain, grass batches and groups, field instances and focal-tree segments/leaves. It omits the atmosphere descriptor, global style/material values used to color static mesh vertices, focal-tree materials and focal-tree outline weight.

A plan rebuild can therefore produce a materially changed contracted plan with the same `contract.topologyKey`.

### The renderer trusts one incomplete key

`ensureMesh()` reuses the prior CPU mesh and GPU buffers whenever `contract.topologyKey` matches. It has no independent mesh dependency fingerprint, source-plan revision, policy revision or descriptor manifest.

### Static buffers contain presentation values

The mesh builder writes vertex colors, outlines and wind weights into static arrays. Atmosphere hill colors, grass material colors, flower stem colors, focal-tree materials and outline weights are therefore cache dependencies, not only dynamic presentation uniforms.

### Existing tests prove only time invariance

The render-plan smoke verifies that changing time does not change topology and that a cache hit occurs. The renderer smoke verifies that changing time keeps the mesh key and vertex count stable. There are no positive invalidation fixtures for omitted source fields, quality changes, atmosphere changes, material changes or tree presentation changes.

## Reachable stale-cache paths

```txt
wildflower color or accent changes
  -> sourceTopologyKey unchanged
  -> enhancer reports cache hit
  -> old flower descriptors and old mesh remain visible

path rutCount or pebbleCount changes
  -> sourceTopologyKey unchanged
  -> old contracted path surface remains active

focal-tree trunkHeight, trunkRadius, rootCount or leafClusterCount changes
  -> sourceTopologyKey unchanged
  -> old tree asset remains active

runtime performance profile changes with stable raw plan
  -> sourceTopologyKey unchanged
  -> old grass density, budgets and outline policy remain active

grass or tree material palette changes
  -> enhancer may rebuild because style changed
  -> contract.topologyKey can remain unchanged
  -> renderer reuses old color buffers

atmosphere hills change
  -> enhancer key omits hill descriptors
  -> contract topology also omits atmosphere
  -> both cache layers can retain old hill geometry and colors
```

## Required parent domain

```txt
meadow-render-cache-coherence-authority-domain
```

## Required transaction

```txt
RenderRevisionCommand
  -> bind SourceRenderPlanRevision, RenderPolicyRevision and host generation
  -> normalize the complete source descriptor graph
  -> classify every dependency as dynamic-uniform, contract-only or mesh-affecting
  -> calculate exhaustive EnhancementDependencyFingerprint
  -> reject stale, duplicate or incomplete source evidence
  -> build one immutable contracted render-plan candidate
  -> calculate ContractDescriptorFingerprint
  -> calculate MeshDependencyFingerprint from every CPU mesh input
  -> decide Reuse, RebuildEnhancer, RebuildMesh, RebuildAll or Reject
  -> prepare CPU mesh and GPU-buffer candidates when required
  -> atomically adopt contracted plan, mesh and buffers
  -> publish RenderCacheDecisionResult and participant receipts
  -> render a frame carrying source, contract and mesh revisions
  -> publish FirstCacheRevisionFrameAck
```

## Candidate authority kits

```txt
meadow-render-cache-coherence-authority-domain
source-render-plan-revision-kit
render-policy-revision-kit
render-dependency-manifest-kit
descriptor-dependency-classification-kit
enhancement-dependency-fingerprint-kit
contract-descriptor-fingerprint-kit
mesh-dependency-fingerprint-kit
dynamic-uniform-fingerprint-kit
render-cache-command-kit
render-cache-decision-kit
stale-render-revision-rejection-kit
duplicate-render-revision-suppression-kit
enhancer-cache-admission-kit
contract-cache-admission-kit
mesh-cache-admission-kit
gpu-buffer-generation-kit
mesh-candidate-preparation-kit
gpu-buffer-candidate-preparation-kit
render-cache-atomic-adoption-kit
render-cache-rollback-kit
render-cache-journal-kit
render-cache-public-readback-kit
first-cache-revision-frame-ack-kit
render-cache-fixture-gate-kit
```

## Required fixtures

```txt
wildflower color-only mutation
rock accent-only mutation
distant-tree color-only mutation
atmosphere hill geometry and color mutation
path rutCount and pebbleCount mutation
focal-tree trunk, root, leaf-count and shadow mutation
runtime performance quality mutation
grass material palette mutation
tree material and outline mutation
dynamic time-only cache hit
camera/light/sky uniform-only update
stale and duplicate render revision
injected mesh-build failure
injected GPU-buffer upload failure
atomic predecessor preservation
source, contract, mesh, renderer and visible-frame readback parity
source browser, production build and Pages parity
```

## Validation boundary

This was a documentation and source-analysis pass. Runtime JavaScript, renderer behavior, tests, dependencies, workflows and deployment were not changed. No positive invalidation, cache rollback, visible adoption or production-readiness claim is made.