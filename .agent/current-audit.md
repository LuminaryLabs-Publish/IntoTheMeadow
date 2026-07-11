# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Audit timestamp:** `2026-07-11T06-38-59-04-00`

## Summary

`IntoTheMeadow` is a DSK-composed static meadow route with one pinned external source kit, one local fallback source implementation, 43 local DSK declarations, a render-plan enhancer, a CPU mesh builder, a WebGL renderer, browser and Node editor surfaces, and authored interaction/objective/story descriptors.

This pass audits the missing authority between raw source identity, enhanced topology, CPU mesh identity, GPU buffer generations, cache invalidation, rendered frames, and host/editor proof.

## Plan ledger

**Goal:** make persistent render caching correct in both directions: every render-affecting source mutation must rebuild exactly once, and every dynamic-only mutation must reuse static mesh buffers.

- [x] Enumerate the complete accessible `LuminaryLabs-Publish` inventory.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare all eligible repositories with the central ledger.
- [x] Select only `IntoTheMeadow` as the oldest eligible entry.
- [x] Read `AGENTS.md` and the current root `.agent` state.
- [x] Trace raw source-plan construction and caching.
- [x] Trace source-key projection and enhancer cache admission.
- [x] Trace enhanced topology hashing and CPU mesh construction.
- [x] Trace WebGL mesh/buffer caching, snapshots, and disposal.
- [x] Trace rebuild, GameHost, and editor observation surfaces.
- [x] Inspect current render-plan and renderer smoke tests.
- [x] Identify the interaction loop, domains, kits, and services.
- [x] Add architecture, render, gameplay, interaction, cache, and deploy audits.
- [x] Refresh required root `.agent` files.
- [x] Push documentation only to `main`.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection state

```txt
accessible Publish repos: 10
eligible after exclusion: 9
new or missing central ledgers: 0
missing root .agent state: 0
selected: LuminaryLabs-Publish/IntoTheMeadow
selection basis: oldest eligible central ledger
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Interaction loop

### Browser route

```txt
index.html
  -> boot-game.js
  -> startWebHost()
  -> load pinned source provider
  -> createIntoTheMeadowGame()
  -> cache baseRenderPlan
  -> install DSK descriptors
  -> RAF
  -> game.tick({ dt, time })
  -> get time-overlay raw plan
  -> enhancer.enhance(rawPlan)
  -> source key hit or rebuild
  -> render plan validation
  -> renderer.render(plan)
  -> topology key hit or mesh rebuild
  -> GPU buffer reuse or upload
  -> outline and color draw passes
  -> GameHost/editor observations
```

### Explicit source rebuild

```txt
game.rebuildRenderPlan()
  -> provider generates new raw plan
  -> baseRenderPlan is replaced
  -> no source revision
  -> no source fingerprint result
  -> no enhancer invalidation
  -> no renderer invalidation
  -> no committed-frame acknowledgement
```

## Domains in use

```txt
browser shell and DOM boot
manifest and external dependency declaration
source-provider discovery, loading, fallback, validation, normalization, and caching
DSK registry, descriptor registration, installation, validation, and snapshots
game state, tick, reset, snapshot, and diagnostics
terrain, path, grass, scatter, tree, wind, atmosphere, materials, and style composition
render-plan/v2 enhancement, normalization, validation, and topology hashing
performance, LOD, wind, and postprocess policy
CPU mesh construction and contribution accounting
WebGL shader, buffer, cache, render, snapshot, resize, and disposal
GameHost and browser/Node editor observation
HUD, loading, fatal projection, checks, build, and Pages deployment
```

Missing runtime-authoritative domains:

```txt
source revision and provider fingerprint
canonical render-affecting projection
versioned source-key schema
cache admission and rejection results
coordinated enhancer/renderer invalidation
source-to-topology-to-mesh-to-buffer lineage
mesh contribution fingerprint
GPU buffer generation identity
bounded cache journal
clone-safe cache observation
source mutation fixture authority
```

## Kit inventory

```txt
external declared kits: 1
local declared kits: 43
total declared kits: 44
required-v0.1 local kits: 15
runtime source-backed surfaces: 24
```

External kit:

```txt
meadow-area-kit 0.1.0
source: LuminaryLabs-Agents/NexusEngine-ProtoKits
commit: 11d245913ba4d30f3ce950eb5a17e1cc6e4aa1f5
```

All 43 declared local kit IDs and their services remain in `.agent/kit-registry.json`.

Primary source-backed kits for this audit:

```txt
fallback-meadow-area-kit
  local source-plan generation, snapshot, and validation

meadow-render-plan-enhancer-v2
  source-key admission, enhancement, cache snapshot, and manual invalidation

meadow-render-plan-v2
  descriptor normalization, validation, topology projection, stable hashing, and time overlay

meadow-mesh-builder-v2
  CPU geometry buffers, descriptor contributions, mesh metrics, and mesh identity

meadow-webgl-renderer-v2
  context, shaders, attribute buffers, topology cache, rendering, snapshot, and disposal

precision-safe WebGL compatibility adapter
  one float precision declaration per graphics shader

GameHost diagnostics surface
  game, state, diagnostics, enhanced plan, enhancer snapshot, and renderer snapshot

browser editor bridge
  runtime, scene, renderer, viewport, capture, and error capabilities

Node headless editor environment
  plan, mesh, metrics, SVG, workspace, tick, reset, and observation capabilities
```

## Services offered by the current stack

```txt
commit-pinned external source loading
deterministic external or fallback raw source generation
DSK descriptor registration and snapshots
raw-plan caching and explicit rebuild
render-plan enhancement and descriptor-family validation
source and enhanced topology hashing
performance, wind, grass, tree, and postprocess descriptor composition
CPU mesh generation
WebGL static buffer caching and two-pass draw
renderer and enhancer cache snapshots
GameHost and editor readback
static checks and Pages deployment
```

Services not currently offered:

```txt
source revision assignment
complete render-affecting source projection
versioned cache-key contract
typed cache admission result
coordinated rebuild/invalidation transaction
mesh contribution parity result
GPU buffer generation ID
source-to-frame lineage
cache mutation journal
source mutation fixture matrix
```

## Main finding: incomplete source identity can preserve stale output

`createRenderPlanEnhancer()` caches by `sourceTopologyKey(rawPlan)`.

The key includes the plan identity, area, style, and only selected object fields. It omits render-affecting inputs including:

```txt
path enabled, rutCount, and pebbleCount
wildflower color and accent
rock color and accent
tree-line color and accent
focal-tree trunkRadius, trunkHeight, rootCount, leafClusterCount, shadowRadius, and renderStyle
raw wind state
runtime performance overrides
```

A new raw source plan that changes only one of these fields can be classified as a cache hit. The old enhanced plan keeps its old topology key, and the renderer then reuses the old CPU mesh and GPU buffers.

`rebuildRenderPlan()` replaces the raw plan but does not invalidate either cache or return a typed result.

Current tests prove that time-only changes preserve static topology. They do not prove that static mutations rebuild exactly once or that dynamic-only changes avoid unnecessary rebuilds.

## Required parent domain

```txt
meadow-render-cache-identity-authority-domain
```

Update existing DSKs first:

```txt
meadow-area-bridge-dsk
meadow-render-host-dsk
meadow-performance-dsk
wind-field-dsk
meadow-diagnostics-dsk
```

Add only coordinating kits:

```txt
source-plan-revision-kit
render-affecting-projection-kit
render-cache-key-schema-kit
render-cache-admission-kit
render-cache-invalidation-kit
render-lineage-kit
mesh-contribution-fingerprint-kit
gpu-buffer-generation-kit
render-cache-journal-kit
render-cache-observation-kit
render-cache-mutation-fixture-kit
```

## Next safe ledge

```txt
IntoTheMeadow Render Topology Identity Authority
+ Source Mutation / Cache Rebuild Fixture Gate
```

Runtime lifecycle and provider admission remain prerequisites. Committed-frame and interaction-command work should consume this lineage instead of inventing separate render identity.