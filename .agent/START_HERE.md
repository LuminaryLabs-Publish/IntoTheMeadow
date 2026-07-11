# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-11T06-38-59-04-00`

## Current ledge

```txt
IntoTheMeadow Render Topology Identity Authority
+ Source Mutation / Cache Rebuild Fixture Gate
```

## Prerequisite and follow-on gates

```txt
1. Runtime Session Lifecycle Authority
2. Source Provider Authority
3. Render Topology Identity Authority
4. Committed Frame Observation Authority
5. Interaction Command Authority
6. DSK Registry Consumption Proof
```

## Read first

```txt
.agent/trackers/2026-07-11T06-38-59-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T06-38-59-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-11T06-38-59-04-00-render-cache-identity-dsk-map.md
.agent/render-audit/2026-07-11T06-38-59-04-00-source-topology-gpu-cache-gap.md
.agent/gameplay-audit/2026-07-11T06-38-59-04-00-source-rebuild-visible-world-loop.md
.agent/interaction-audit/2026-07-11T06-38-59-04-00-rebuild-invalidate-observation-map.md
.agent/render-cache-audit/2026-07-11T06-38-59-04-00-source-key-mutation-contract.md
.agent/deploy-audit/2026-07-11T06-38-59-04-00-render-cache-mutation-fixture-gate.md
```

Retained companion context:

```txt
.agent/source-provider-audit/2026-07-11T04-39-58-04-00-external-fallback-contract.md
.agent/objective-system-audit/2026-07-11T04-49-30-04-00-objective-story-transition-contract.md
.agent/lifecycle-audit/2026-07-11T02-28-12-04-00-single-raf-global-lease-rollback-contract.md
.agent/frame-authority-audit/2026-07-11T00-30-48-04-00-atomic-committed-frame-contract.md
.agent/registry-truth-audit/2026-07-11T02-20-44-04-00-declared-runtime-consumption-contract.md
```

## Selection result

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. `TheCavalryOfRome` remains excluded. All nine eligible repositories are centrally tracked and have root `.agent` state.

```txt
IntoTheMeadow       selected / 2026-07-11T04-49-30-04-00
MyCozyIsland         tracked  / 2026-07-11T05-10-36-04-00
TheOpenAbove         tracked  / 2026-07-11T05-25-29-04-00
HorrorCorridor       tracked  / 2026-07-11T05-28-29-04-00
PrehistoricRush      tracked  / 2026-07-11T05-39-11-04-00
PhantomCommand       tracked  / 2026-07-11T05-50-43-04-00
ZombieOrchard        tracked  / 2026-07-11T06-02-00-04-00
TheUnmappedHouse     tracked  / 2026-07-11T06-21-57-04-00
AetherVale           tracked  / 2026-07-11T06-29-11-04-00
TheCavalryOfRome     excluded by rule
```

Only `LuminaryLabs-Publish/IntoTheMeadow` is in scope for this pass.

## Product read

`IntoTheMeadow` caches the raw source plan in the game, the enhanced render plan in `createRenderPlanEnhancer()`, and the CPU mesh/GPU buffers in `meadow-webgl-renderer-v2`.

The first cache key does not include every render-affecting source field. A source rebuild can therefore keep an old enhanced plan and old GPU buffers while diagnostics still report a valid cache hit.

## Actual render identity loop

```txt
source provider
  -> baseRenderPlan
  -> sourceTopologyKey
  -> enhancer hit or rebuild
  -> contract.topologyKey
  -> renderer hit or rebuild
  -> CPU mesh and GPU buffers
  -> rendered frame
  -> GameHost/editor snapshots
```

Current rebuild path:

```txt
game.rebuildRenderPlan()
  -> replace baseRenderPlan
  -> no source revision
  -> no coordinated enhancer invalidation
  -> no coordinated renderer invalidation
  -> no result proving the next visible frame consumed the new source
```

## Current finding

`sourceTopologyKey()` omits path detail fields, scatter colors and accents, several focal-tree geometry fields, raw wind state, and runtime performance overrides.

Current tests prove that changing time does not rebuild static topology. They do not prove that every static mutation rebuilds exactly once or that dynamic-only changes avoid unnecessary GPU uploads.

## Exact inventory retained

```txt
external declared kits: 1
local declared kits: 43
total declared kits: 44
required-v0.1 local kits: 15
runtime source-backed surfaces cataloged: 24
```

## Next implementation boundary

Update existing meadow area, render-host, performance, wind, and diagnostics DSKs first. Add one coordinating render-cache identity domain only for cross-owner admission, invalidation, lineage, and fixture proof.

Do not begin with renderer replacement, visual retuning, WebGPU migration, new content, audio, or save/load. First prove that source identity, enhanced topology, CPU mesh, GPU buffers, and the rendered frame remain coherent across mutations.