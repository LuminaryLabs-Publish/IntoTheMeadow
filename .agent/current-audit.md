# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Audit timestamp:** `2026-07-11T04-39-58-04-00`

## Summary

`IntoTheMeadow` is a DSK-composed static meadow route with one commit-pinned external source kit, one local fallback source implementation, a local render-plan enhancer, a WebGL renderer, browser and Node editor surfaces, and 43 locally declared DSK descriptors.

This documentation-only pass identifies the missing authority between source discovery, provider admission, fallback policy, raw-plan validation, render-plan enhancement, production deployment, and test parity.

## Plan ledger

**Goal:** Make meadow source selection deterministic, typed, observable, and parity-tested so production and validation cannot silently exercise different content providers.

```txt
[x] Enumerate the complete LuminaryLabs-Publish inventory.
[x] Exclude TheCavalryOfRome.
[x] Compare all eligible repositories with the central ledger.
[x] Select only IntoTheMeadow as the oldest eligible fallback.
[x] Read AGENTS.md and current root .agent state.
[x] Trace manifest URL resolution and dynamic import.
[x] Trace external export validation and game construction.
[x] Trace local fallback construction and raw-plan generation.
[x] Compare external and local provider contracts.
[x] Trace Node tests to the provider they actually exercise.
[x] Identify the interaction loop, domains, kits, and services.
[x] Add source-provider, architecture, render, gameplay, interaction, and deploy audits.
[x] Refresh required root .agent files.
[x] Push documentation only to main.
[x] Synchronize the central ledger and internal change log.
```

## Selection state

```txt
accessible Publish repos: 10
eligible after exclusion: 9
new or missing central ledgers: 0
missing root .agent state: 0
selected: LuminaryLabs-Publish/IntoTheMeadow
selection basis: oldest eligible central ledger timestamp
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Interaction loop

```txt
index.html
  -> src/boot/boot-game.js
  -> startWebHost()
  -> loadExternalKits()
  -> locate meadow-area-kit manifest entry
  -> dynamic import commit-pinned jsDelivr URL
  -> require createMeadowAreaKit export
  -> createIntoTheMeadowGame({ externalKits })
  -> install DSK descriptors
  -> create meadow source instance
  -> cache raw source plan
  -> enhance to meadow-render-plan/v2
  -> validate enhanced contract
  -> WebGL render and HUD projection
  -> expose GameHost and editor observations
```

Headless and test loop:

```txt
Node smoke
  -> createIntoTheMeadowGame()
  -> externalKits defaults to {}
  -> local createFallbackMeadowAreaKit selected
  -> createLocalMeadowSourcePlan()
  -> enhancer and validation
  -> synthetic renderer/editor observation
```

## Domains in use

```txt
browser shell and DOM boot
manifest and external dependency declaration
source-provider discovery and admission
external module loading and export validation
fallback source construction
provider identity, version and capability projection
DSK registry, installation and validation
meadow area configuration and deterministic generation
raw source-plan creation, caching, rebuild and time overlay
raw-plan validation and topology classification
render-plan/v2 enhancement and descriptor normalization
terrain, path, grass, flower, rock, mushroom, tree and atmosphere composition
wind and material descriptors
game state, tick, reset, snapshot and diagnostics
runtime lifecycle and RAF ownership
committed frame and observation authority
CPU mesh construction
WebGL resource, cache, render, snapshot and disposal
GameHost and editor bridge observation
Node headless-editor metrics and artifacts
HUD/loading/fatal projection
static checks, smoke tests, build and Pages deployment
```

Declared but not runtime-authoritative:

```txt
player movement
camera control
browser input mapping
interaction commands
objective and story mutation
audio
save/load
UI progression
```

## Kit inventory

```txt
external declared kits: 1
local declared kits: 43
total declared kits: 44
required-v0.1 local kits: 15
runtime source-backed surfaces: 24
```

External source kit:

```txt
meadow-area-kit 0.1.0
source: LuminaryLabs-Agents/NexusEngine-ProtoKits
commit: 11d245913ba4d30f3ce950eb5a17e1cc6e4aa1f5
```

Runtime source-backed surfaces:

```txt
fallback-meadow-area-kit
install-dsks
meadow-render-plan-v2
meadow-render-plan-enhancer-v2
meadow-mesh-builder-v2
meadow-webgl-renderer-v2
precision-safe WebGL compatibility adapter
tree-object-dsk
wind-field-dsk
meadow-performance-dsk
post-process-stack-dsk
grass-density-texture-kit
grass-clump-archetype-kit
grass-static-batch-kit
grass-patch-placement-kit
grass-clump-instancing-render-kit
grass-shader-wind-kit
grass-lod-policy-kit
grass-density-scaling-kit
grass-debug-visualization-kit
GameHost diagnostics surface
browser editor bridge
Node headless-editor environment
```

All 43 declared local kit IDs and services remain listed in `.agent/kit-registry.json`.

## Services offered by the kit stack

```txt
external module import and commit pinning
area and feature normalization
deterministic seeded generation
path-relative and local hash-based scatter
raw render-plan generation
validation, snapshots and reset
DSK descriptor registration, lookup, installation and snapshots
terrain, materials, path and surface descriptors
grass density, clumps, batches, placement, instances, wind, LOD, scaling and debug
flower, rock, mushroom, tree, sky, sun, cloud and hill descriptors
wind state, sampling, zones and consumers
render-plan enhancement, topology hashing and contract validation
CPU mesh building
WebGL context, shaders, buffers, cache, resize, outline, cel/fog, snapshot and disposal
game state tick/reset/snapshot and diagnostics
GameHost plan/render/enhancer readback
browser editor tick/reset/render/capture/viewport/error capabilities
Node plan/mesh/metrics/SVG/workspace capabilities
static checks, smoke tests and Pages deployment
```

## Main finding: production and tests use different source authorities

The browser host requires the external provider before it constructs the game:

```txt
import failure
or missing createMeadowAreaKit export
  -> loadExternalKits throws
  -> createIntoTheMeadowGame is never called
  -> local fallback is unreachable
```

The local fallback is only selected when a caller omits `externalKits`. Current Node smoke tests do exactly that, so they validate the fallback provider rather than the provider used by the deployed browser route.

## Raw provider differences

```txt
external provider
  version: 0.1.0
  RNG: seeded mutable generator scoped to seed + area id
  scatter: path-relative with jitter
  path: normalized defaults and derived fields
  grass: rotation, lean, sway and palette selection
  atmosphere: normalized ground, hills, clouds and sun
  validation: area, bounds, grass, path and focal-tree checks
  snapshot: version, seed, area, features, style, stats and validation

local fallback
  version: local-source-plan-v1
  RNG: independent hash samples by kind and index
  scatter: broad side-distance bands, not path-relative
  path: copied authored config
  grass: one reduced source placeholder
  atmosphere: hard-coded hills and sun
  validation: always passed
  snapshot: fallback flag, source version and object count only
```

Both can currently reach the same enhancer, but there is no contract proving that they are semantically equivalent, intentionally degraded, or even compatible for every authored configuration.

## Missing authority

```txt
no ProviderRequest contract
no ProviderCandidate descriptor
no ProviderAdmissionResult
no failure classification or retry policy
no explicit fallback policy
no source capability negotiation
no provider fingerprint in game snapshots
no raw-plan schema compatibility result
no external/fallback parity matrix
no production-path smoke test
no deterministic injected-loader fixture
no GameHost provider observation
```

## Required parent domain

```txt
meadow-source-provider-authority-domain
```

Candidate kits:

```txt
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

The runtime lifecycle gate remains a prerequisite for safe startup rollback. Provider authority is the next content/composition boundary because current tests can pass while production source import, export shape, or raw semantics fail.