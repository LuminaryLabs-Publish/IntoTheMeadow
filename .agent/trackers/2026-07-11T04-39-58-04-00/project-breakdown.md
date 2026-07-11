# IntoTheMeadow Project Breakdown

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T04-39-58-04-00`

## Goal

Map production and test source-provider paths, identify all domains, kits and services, and define a typed external/fallback admission and parity boundary without changing runtime behavior.

## Plan ledger

```txt
[x] Enumerate all accessible LuminaryLabs-Publish repositories.
[x] Exclude LuminaryLabs-Publish/TheCavalryOfRome.
[x] Compare nine eligible repositories with LuminaryLabs-Dev/LuminaryLabs.
[x] Confirm all eligible repositories are tracked with root .agent state.
[x] Select only LuminaryLabs-Publish/IntoTheMeadow as the oldest eligible fallback.
[x] Read AGENTS.md and current .agent routing state.
[x] Trace manifest dependency declaration and browser dynamic import.
[x] Trace external export validation and local fallback selection.
[x] Read the pinned external meadow-area-kit implementation.
[x] Compare external and fallback source-plan contracts.
[x] Trace current tests to the provider they exercise.
[x] Identify interaction loop, domains, kits and services.
[x] Add architecture, render, gameplay, interaction, source-provider and deploy audits.
[x] Refresh required root .agent documents.
[x] Push documentation only to main.
[x] Update central ledger and internal change log.
```

## Selection

```txt
IntoTheMeadow       selected / 2026-07-11T02-28-12-04-00
PrehistoricRush      tracked  / 2026-07-11T02-48-17-04-00
TheOpenAbove         tracked  / 2026-07-11T03-01-38-04-00
HorrorCorridor       tracked  / 2026-07-11T03-18-44-04-00
PhantomCommand       tracked  / 2026-07-11T03-41-49-04-00
ZombieOrchard        tracked  / 2026-07-11T03-48-31-04-00
TheUnmappedHouse     tracked  / 2026-07-11T04-00-07-04-00
MyCozyIsland         tracked  / 2026-07-11T04-09-54-04-00
AetherVale           tracked  / 2026-07-11T04-28-33-04-00
TheCavalryOfRome     excluded
```

## Interaction loop

```txt
browser: manifest -> pinned import -> export check -> external provider -> raw plan -> enhancer -> validator -> WebGL -> GameHost/editor
Node: direct game construction -> no externalKits -> local fallback -> raw plan -> enhancer -> smoke observations
```

## Domains in use

```txt
browser boot and manifest
source discovery, loading, admission and fallback policy
provider identity, version, capabilities and fingerprinting
raw source-plan validation, normalization, parity, caching and rebuild
DSK registry, installation, validation and snapshots
game state, tick, reset, snapshots and diagnostics
terrain, path, materials, scatter, grass, flowers, rocks, mushrooms, trees, wind and atmosphere
render-plan/v2 enhancement, topology hashing and validation
performance and postprocess descriptors
CPU mesh construction and WebGL rendering
runtime lifecycle and committed-frame observation
GameHost, browser editor and Node editor observation
HUD, checks, build and Pages deployment
```

Declared but not runtime-authoritative: player, camera, input, interaction commands, story/objective mutation, audio, save/load and UI progression.

## Kit inventory

```txt
external declared kits: 1
local declared kits: 43
total declared kits: 44
runtime source-backed surfaces: 24
```

External:

```txt
meadow-area-kit 0.1.0
LuminaryLabs-Agents/NexusEngine-ProtoKits
commit 11d245913ba4d30f3ce950eb5a17e1cc6e4aa1f5
```

Runtime-backed:

```txt
fallback-meadow-area-kit
install-dsks
meadow-render-plan-v2
meadow-render-plan-enhancer-v2
meadow-mesh-builder-v2
meadow-webgl-renderer-v2
precision-safe WebGL adapter
tree-object-dsk
wind-field-dsk
meadow-performance-dsk
post-process-stack-dsk
nine grass kits
GameHost diagnostics
browser editor bridge
Node headless-editor environment
```

The complete 43-kit service map is in `.agent/kit-registry.json`.

## Services offered

```txt
module import and export validation
deterministic meadow generation, validation, snapshots and reset
DSK descriptor registry and install validation
terrain/path/material/object composition
grass density, clumps, batches, placement, wind, LOD, scaling and debug
render enhancement, topology keys, mesh building, WebGL cache/passes/snapshot/disposal
game state tick/reset/snapshot
diagnostics, editor observations, checks and Pages deployment
```

## Main finding

Production requires the external provider and throws before game construction if import or export validation fails, so its local fallback is unreachable. Node tests omit `externalKits` and validate only the fallback. The two providers differ in version, placement algorithm, descriptor shape, validation and snapshot semantics, with no typed admission or parity result.

## Parent domain and kits

```txt
meadow-source-provider-authority-domain

source-provider-request-kit
source-provider-candidate-kit
source-provider-loader-kit
source-provider-export-contract-kit
source-provider-capability-kit
source-provider-admission-kit
source-provider-failure-classification-kit
source-provider-fallback-policy-kit
source-provider-fingerprint-kit
source-plan-contract-kit
source-plan-normalization-kit
source-plan-parity-kit
source-provider-journal-kit
source-provider-observation-kit
source-provider-fixture-kit
```

## Next safe ledge

```txt
IntoTheMeadow Source Provider Authority
+ External/Fallback Admission and Parity Fixture Gate
```
