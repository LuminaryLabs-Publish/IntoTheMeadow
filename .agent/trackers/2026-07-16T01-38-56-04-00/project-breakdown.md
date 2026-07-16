# Project Breakdown: IntoTheMeadow Static Module Graph Release Coherence

**Timestamp:** `2026-07-16T01:38:56-04:00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Reviewed runtime source revision:** `105a8fb0d06aa3e5e9d00203b96a973963d5fe21`  
**Reviewed pre-audit documentation head:** `07b4507f1246b63840e1f3ae3025c652fbb7703a`  
**Status:** `static-module-graph-release-revision-cache-coherence-authority-audited`

## Summary

IntoTheMeadow is a static ES-module application published from source. Its boot graph uses three different revision modes at once: `0.3.0-headless-editor` query tags on the entry and selected host modules, `0.2.1-shader-precision` on the compatible renderer's base import, and unversioned relative URLs for the rest of the transitive graph.

The game manifest publishes build `0.3.0-headless-editor-runtime`, but there is no immutable release descriptor listing the complete module graph, resolved URLs, content digests, cache policy or deployment artifact revision. Existing source checks can therefore validate files independently without proving that one browser frame came from a single coherent release graph.

## Plan ledger

**Goal:** make one immutable release identity authoritative from `index.html` through every transitive module, external provider, deployment artifact and first visible browser frame.

- [x] Compare all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central-ledger entries and root `.agent` states.
- [x] Confirm no new, ledger-missing, root-agent-missing, undocumented or runtime-ahead priority repository.
- [x] Select only `LuminaryLabs-Publish/IntoTheMeadow` by the oldest synchronized timestamp.
- [x] Inspect the HTML entry, boot module, web host, compatible renderer, game manifest, package surface and retained deploy ownership.
- [x] Identify the complete interaction loop, domains, all 44 kit surfaces and their services.
- [x] Define one parent release/cache authority and 19 coordinating surfaces.
- [x] Add the `2026-07-16T01-38-56-04-00` audit family under root `.agent`.
- [x] Change documentation only and push directly to `main`.
- [x] Create no branch or pull request.
- [ ] Implement and execute release-graph, cache-upgrade, rollback, artifact and Pages fixtures later.

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
prior central timestamp: 2026-07-15T20-38-13-04-00
next oldest: LuminaryLabs-Publish/PrehistoricRush at 2026-07-15T20-59-46-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
document request
  -> index.html loads ./src/boot/boot-game.js?v=0.3.0-headless-editor

boot module
  -> imports ../hosts/web-host.js?v=0.3.0-headless-editor
  -> resolves canvas, HUD, status and loading elements
  -> starts the browser host

web host module graph
  -> imports GAME_MANIFEST without a URL revision
  -> imports game construction without a URL revision
  -> imports GameHost exposure without a URL revision
  -> imports render-plan enhancement without a URL revision
  -> imports compatible renderer with ?v=0.3.0-headless-editor
  -> imports editor bridge with ?v=0.3.0-headless-editor

compatible renderer
  -> imports base renderer with ?v=0.2.1-shader-precision
  -> wraps WebGL contexts
  -> normalizes graphics-shader float precision

runtime
  -> dynamically imports the external meadow provider at an immutable commit
  -> creates game, renderer, enhancer and editor bridge
  -> starts recursive requestAnimationFrame
  -> advances state, builds a plan and renders a visible frame

release proof
  -> GAME_MANIFEST reports build 0.3.0-headless-editor-runtime
  -> no complete module-graph manifest is published
  -> no per-module content digest is bound to the running page
  -> no result rejects mixed release revisions
  -> no first visible frame acknowledges one accepted release generation
```

## Main finding

```txt
manifest version:                  0.3.0
manifest build:                    0.3.0-headless-editor-runtime
HTML entry query revision:         0.3.0-headless-editor
boot-to-host query revision:       0.3.0-headless-editor
host-to-compatible query revision: 0.3.0-headless-editor
compatible-to-base query revision: 0.2.1-shader-precision
other transitive imports:          unversioned
external provider:                 immutable commit pinned
complete release graph identity:   absent
module content digests:            absent
mixed-graph rejection:             absent
FirstReleaseBoundFrameAck:         absent
```

Query strings are being used as local cache-busting labels, but they do not represent one shared release-generation contract. The older renderer query may be intentional compatibility history; the gap is that no descriptor proves it belongs to the same accepted release as the `0.3.0` host graph.

This is a source-backed release-identity and evidence gap. No stale-cache incident, mixed-module browser failure or Pages rollback defect was reproduced.

## Domains in use

```txt
repository and audit identity
static HTML entry and browser boot
ES-module URL resolution and transitive graph loading
game manifest version and build identity
local query-version cache labels
immutable external provider revision
browser HTTP cache and revalidation policy
release generation and module content digests
mixed-graph admission and stale-module rejection
game and DSK composition
renderer wrapper and WebGL presentation
GameHost and editor capability publication
source checks and headless evidence
deployment artifact and GitHub Pages publication
central tracking and release-proof reconciliation
```

## Kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
active-v0.1 local descriptors: 15
planned local descriptors: 28
planned release/cache authority surfaces: 19
```

## Complete kit and offered-service inventory

| Kit | Offered services |
|---|---|
| `meadow-area-kit` | Area/path/style normalization, deterministic scatter, render-plan generation, validation, snapshot and reset adaptation. |
| `into-the-meadow-game-dsk` | Manifest, kit stack, root game state, boot sequence and snapshots. |
| `web-host-dsk` | Document shell, browser loop, debug host, asset loading and browser safety. |
| `game-composition-dsk` | Registry, scene/render/simulation composition and validation. |
| `meadow-area-bridge-dsk` | Meadow configuration, provider adapter, area state and validation. |
| `meadow-terrain-texture-dsk` | Terrain model, materials, path layers, sampling and validation. |
| `path-corridor-dsk` | Path curve, corridor, detail, progression and validation. |
| `grass-density-texture-kit` | Density channels, composition, sampling and validation. |
| `grass-clump-archetype-kit` | Clump registry, card layout, atlas binding and variants. |
| `grass-static-batch-kit` | Clump meshes, variant cache, atlas material and static LOD. |
| `grass-patch-placement-kit` | Patch grid, density placement, instance selection and buffers. |
| `grass-clump-instancing-render-kit` | Batch registry, instance stream, draw groups and shader binding. |
| `grass-shader-wind-kit` | Wind uniforms, tip bend, phase field and gust response. |
| `grass-lod-policy-kit` | Near, mid, far and terrain-tint LOD policy. |
| `grass-density-scaling-kit` | Quality, budget, density and profile scaling. |
| `grass-debug-visualization-kit` | Density, patch, instance and LOD views. |
| `grass-patch-dsk` | Patch grid, blade distribution, terrain awareness and wind binding. |
| `gpu-grass-render-dsk` | Instance buffers, blade mesh, shader wind and LOD rendering. |
| `wind-field-dsk` | Wind state, sampling, zones and consumers. |
| `tree-object-dsk` | Focal tree, tree line, materials and wind binding. |
| `meadow-scatter-dsk` | Flower, rock and mushroom scatter and placement rules. |
| `meadow-atmosphere-dsk` | Sky, sun, clouds and distant hills. |
| `meadow-player-dsk` | Player state, movement, terrain contact and actions. |
| `meadow-camera-dsk` | Camera mode, rig, collision and feel. |
| `meadow-input-dsk` | Action map, bindings, contexts and normalization. |
| `meadow-interaction-dsk` | Interactable registry, affordances, inspection and events. |
| `meadow-story-dsk` | Story state, beats, dialogue and sequences. |
| `meadow-objective-dsk` | Objective model, flow, completion and feedback. |
| `meadow-ecology-dsk` | Ambient life, zones, triggers and non-gameplay agents. |
| `meadow-audio-dsk` | Ambient bed, spatial cues, audio state and events. |
| `meadow-ui-dsk` | Minimal HUD, story panel, debug UI, UI state and validation. |
| `meadow-save-dsk` | Save model, slots, persistence adapter and migration. |
| `meadow-diagnostics-dsk` | Runtime/render health, determinism checks and smoke reports. |
| `meadow-performance-dsk` | Quality profile, budgets, LOD and adaptive scaling. |
| `meadow-render-host-dsk` | Renderer selection, render-plan ingest, pass order, state and validation. |
| `meadow-webgl-renderer-v2-kit` | WebGL context, shaders, attributes, uniforms, mesh ingestion, buffers, drawing, resize, snapshots and disposal. |
| `post-process-stack-dsk` | Pass registry, ordered enablement, settings and structural validation. |
| `render-target-kit` | Scene color, depth, normal and ping-pong buffers plus resize policy. |
| `sobel-outline-pass-kit` | Color/depth/normal thresholds, outline color and object mask. |
| `color-grade-pass-kit` | Warmth, contrast, saturation and tonal tint. |
| `depth-fog-pass-kit` | Fog range, color, curve and horizon haze. |
| `vignette-pass-kit` | Radius, softness, strength, center and quality tier. |
| `final-composite-pass-kit` | Scene/post inputs, output, debug overlay and fallback composite. |
| `static-pages-deploy-dsk` | Build configuration, Pages workflow, artifacts, cache invalidation and deploy validation. |

## Required parent domain

`meadow-static-module-graph-release-cache-coherence-authority-domain`

## Required transaction

```txt
ReleaseGraphAdmissionCommand
  -> bind manifest, HTML entry, module graph, provider, artifact and deployment revisions
  -> resolve one immutable ReleaseGraphDescriptor
  -> list every executable module URL and content digest
  -> classify compatibility modules as members of the accepted release
  -> bind explicit cache and revalidation policy
  -> reject missing, stale, duplicate or mixed-generation modules
  -> allocate one ReleaseGeneration
  -> publish ReleaseGraphAdmissionResult
  -> start game and renderer only from the accepted graph
  -> render one matching visible frame
  -> acknowledge FirstReleaseBoundFrameAck

ReleaseUpgradeCommand
  -> observe a newer artifact generation
  -> settle or retire the previous generation
  -> reload atomically or preserve the predecessor
  -> publish ReleaseUpgradeResult
```

## Planned coordinating kits

```txt
meadow-static-module-graph-release-cache-coherence-authority-domain
release-identity-kit
module-graph-manifest-kit
module-url-revision-kit
asset-content-digest-kit
entrypoint-release-binding-kit
nested-import-revision-kit
external-provider-revision-kit
cache-policy-descriptor-kit
mixed-graph-admission-kit
release-generation-kit
module-load-observation-kit
stale-module-rejection-kit
deployment-artifact-manifest-kit
source-artifact-pages-parity-kit
browser-reload-upgrade-fixture-kit
partial-deploy-cache-fixture-kit
rollback-module-graph-fixture-kit
first-release-bound-frame-ack-kit
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, manifests, query strings, package metadata, tests, workflows and deployment were not changed. No stale-cache reproduction, mixed-version failure, cache-policy correctness, artifact parity, Pages parity or production readiness is claimed.
