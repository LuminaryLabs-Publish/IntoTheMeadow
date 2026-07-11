# IntoTheMeadow Project Breakdown

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T06-38-59-04-00`

## Summary

`IntoTheMeadow` keeps two persistent render caches: the render-plan enhancer caches by `sourceTopologyKey`, then the WebGL renderer caches mesh buffers by the enhanced `contract.topologyKey`.

The first key omits several source fields that materially change generated geometry, color, wind, density, and performance policy. A rebuilt source plan can therefore be accepted as a cache hit and leave the rendered meadow stale.

## Plan ledger

**Goal:** define one deterministic identity and admission chain from raw source revision through enhanced topology, CPU mesh, GPU buffers, rendered frame, host readback, and fixture proof.

- [x] Compare the complete accessible `LuminaryLabs-Publish` inventory.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are centrally tracked with root `.agent` state.
- [x] Select only `IntoTheMeadow` as the oldest eligible central-ledger entry.
- [x] Read `AGENTS.md` and the current root `.agent` routing state.
- [x] Trace source-plan creation and `rebuildRenderPlan()`.
- [x] Trace `sourceTopologyKey()` and enhancer cache admission.
- [x] Trace enhanced `topologyKey`, CPU mesh creation, and WebGL buffer reuse.
- [x] Trace GameHost and editor readback surfaces.
- [x] Inspect current cache-related smoke tests.
- [x] Identify the interaction loop, domains, kits, and services.
- [x] Add timestamped architecture, render, gameplay, interaction, cache, and deployment audits.
- [x] Refresh all required root `.agent` files.
- [x] Push documentation only to `main`.
- [ ] Runtime implementation and executable cache mutation fixtures remain future work.

## Selection comparison

```txt
IntoTheMeadow       2026-07-11T04-49-30-04-00 selected
MyCozyIsland         2026-07-11T05-10-36-04-00
TheOpenAbove         2026-07-11T05-25-29-04-00
HorrorCorridor       2026-07-11T05-28-29-04-00
PrehistoricRush      2026-07-11T05-39-11-04-00
PhantomCommand       2026-07-11T05-50-43-04-00
ZombieOrchard        2026-07-11T06-02-00-04-00
TheUnmappedHouse     2026-07-11T06-21-57-04-00
AetherVale           2026-07-11T06-29-11-04-00
TheCavalryOfRome     excluded by rule
```

No new or ledger-missing eligible repository was found. No eligible repository lacked root `.agent` state.

## Interaction loop

```txt
browser boot
  -> load pinned meadow-area-kit
  -> create game and cache baseRenderPlan
  -> install 43 local DSK declarations
  -> request animation frame
  -> tick static game state
  -> get raw plan with time overlay
  -> calculate sourceTopologyKey
  -> enhancer cache hit or rebuild
  -> calculate enhanced contract.topologyKey
  -> renderer mesh cache hit or rebuild
  -> upload or reuse GPU buffers
  -> draw outline and color passes
  -> publish GameHost and editor snapshots
  -> repeat

explicit source rebuild
  -> game.rebuildRenderPlan()
  -> replace baseRenderPlan
  -> no enhancer invalidation result
  -> no renderer invalidation result
  -> next frame may reuse stale enhanced plan and GPU buffers
```

## Domains in use

```txt
browser shell and DOM boot
manifest and commit-pinned external dependency
source-provider loading, fallback, validation, normalization, and caching
DSK registry, installation, validation, and snapshots
game state, tick, reset, snapshot, and diagnostics
terrain, path, grass, scatter, tree, wind, atmosphere, and style composition
render-plan/v2 enhancement and descriptor validation
source identity and topology hashing
performance policy, LOD, wind, and postprocess descriptors
CPU mesh construction
WebGL shader, buffer, cache, render, snapshot, and disposal
GameHost and browser/Node editor observation
HUD, loading, fatal projection, checks, build, and Pages deployment
```

Missing authority domains:

```txt
source revision identity
canonical render-affecting descriptor projection
cache-key schema and versioning
cache admission and rejection results
explicit invalidation transaction
raw-plan to enhanced-plan lineage
enhanced-plan to mesh lineage
mesh to GPU-buffer lineage
cache mutation journal
host/editor cache observation
cache fixture authority
```

## Kits and services

Exact retained census:

```txt
external declared kits: 1
local declared kits: 43
total declared kits: 44
required-v0.1 local kits: 15
runtime source-backed surfaces: 24
```

Primary source-backed kits in this audit:

```txt
meadow-area-kit
  deterministic source plans, validation, snapshots, reset

fallback-meadow-area-kit
  local source plan generation and fallback snapshot

meadow-render-plan-enhancer-v2
  source-key admission, render-plan enhancement, topology generation, cache snapshot, invalidation

meadow-render-plan-v2
  descriptor normalization, validation, topology summary, topology hashing, time overlay

meadow-mesh-builder-v2
  descriptor consumption, CPU vertex buffers, mesh key, contribution counts

meadow-webgl-renderer-v2
  WebGL resources, topology-key mesh cache, buffer upload, draw, snapshot, disposal

GameHost diagnostics surface
  state, diagnostics, enhanced plan, renderer snapshot, enhancer snapshot

browser and Node editor environments
  plan, renderer, metrics, capture, tick, reset, and error observations
```

## Main finding

`sourceTopologyKey()` includes only a subset of source-object fields.

It omits render-affecting values including:

```txt
path enabled, rutCount, pebbleCount
wildflower color and accent
rock color and accent
tree-line color and accent
focal-tree trunkRadius, trunkHeight, rootCount, leafClusterCount, shadowRadius, and renderStyle
raw wind state
runtime performance override
```

`createRenderPlanEnhancer()` returns the cached enhanced plan when this incomplete key is unchanged. `rebuildRenderPlan()` does not invalidate the enhancer. The WebGL renderer then reuses buffers by the cached enhanced topology key.

Current tests prove only that changing time does not rebuild static topology. They do not prove that every render-affecting mutation changes the right identity and rebuilds exactly once.

## Required parent domain

```txt
meadow-render-cache-identity-authority-domain
```

Candidate coordinating kits:

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

## Priority order

```txt
1. Runtime Session Lifecycle Authority
2. Source Provider Authority
3. Render Topology Identity Authority
4. Committed Frame Observation Authority
5. Interaction Command Authority
6. DSK Registry Consumption Proof
```

Render identity must precede committed-frame proof because a frame cannot be considered coherent when its source revision can differ from the cached enhanced plan and GPU buffers.