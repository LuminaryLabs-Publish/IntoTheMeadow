# Architecture Audit: Mesh Contribution Ledger DSK Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T15-18-29-04-00`

## Architecture read

```txt
browser shell
  -> web-host-dsk
  -> external meadow-area-kit
  -> into-the-meadow-game-dsk / game-composition-dsk
  -> meadow-render-plan/v2 contract
  -> local enhancement kits
  -> meadow-mesh-builder-v2
  -> meadow-webgl-renderer-v2
  -> GameHost diagnostics
  -> Nexus headless-editor bridge
```

The repository uses DSK descriptors as a broad capability map, but the active visual path is narrower and implementation-backed by a specific set of imported modules.

## Domains and boundaries

| Domain | Current owner | Current service boundary |
|---|---|---|
| Game foundation | `create-into-the-meadow-game.js` | manifest, state root, source plan cache, reset, snapshot |
| Host runtime | `web-host.js` | dynamic kit import, animation loop, renderer orchestration, fatal display |
| DSK registry | `dsk-registry.json`, `src/dsks/index.js` | ids, labels, service descriptors, validation |
| Meadow source | external/fallback meadow-area kit | deterministic area render plan |
| Render contract | `meadow-render-plan-v2.js` | schema, topology key, descriptor counts, validation |
| Render enhancement | `enhance-render-plan.js` | object filtering, grass composition, wind, postprocess, performance |
| Terrain/path | mesh builder + render contract | height/color/path sampling and geometry |
| Grass | nine grass kits | density, archetype, batch, placement, draw groups, wind, LOD, scaling, debug |
| Scatter/assets | mesh builder, tree kit | flowers, cover, rocks, distant trees, focal tree |
| Renderer | WebGL renderer v2 | GPU buffers, shaders, resize, two passes, snapshot |
| Diagnostics | game, GameHost | state, game snapshot, render plan, renderer/enhancer snapshot |
| Editor environment | editor bridge | runtime, scene, renderer, capture, viewport, error commands |
| Deploy | static route/workflow | Pages-compatible static delivery |

## All registry-declared kits

External:

```txt
meadow-area-kit
```

Local game/host/composition:

```txt
into-the-meadow-game-dsk
web-host-dsk
game-composition-dsk
meadow-area-bridge-dsk
```

Terrain/path/vegetation:

```txt
meadow-terrain-texture-dsk
path-corridor-dsk
grass-density-texture-kit
grass-clump-archetype-kit
grass-static-batch-kit
grass-patch-placement-kit
grass-clump-instancing-render-kit
grass-shader-wind-kit
grass-lod-policy-kit
grass-density-scaling-kit
grass-debug-visualization-kit
grass-patch-dsk
gpu-grass-render-dsk
wind-field-dsk
tree-object-dsk
meadow-scatter-dsk
meadow-atmosphere-dsk
```

Player/gameplay/content:

```txt
meadow-player-dsk
meadow-camera-dsk
meadow-input-dsk
meadow-interaction-dsk
meadow-story-dsk
meadow-objective-dsk
meadow-ecology-dsk
meadow-audio-dsk
meadow-ui-dsk
meadow-save-dsk
```

Diagnostics/performance/render/deploy:

```txt
meadow-diagnostics-dsk
meadow-performance-dsk
meadow-render-host-dsk
meadow-webgl-renderer-v2-kit
post-process-stack-dsk
render-target-kit
sobel-outline-pass-kit
color-grade-pass-kit
depth-fog-pass-kit
vignette-pass-kit
final-composite-pass-kit
static-pages-deploy-dsk
```

## Service catalog from `src/dsks/index.js`

Each registry entry receives five declared subdomain services. The catalog covers:

```txt
game manifest / registry / state / boot / snapshot
browser document / loop / debug / assets / safety
composition registry / scene / render / simulation / validation
area config / features / adapter / state / validation
terrain surface / materials / path / sampling / validation
path curve / corridor / detail / progression / validation
grass density / archetypes / static mesh batches / placement / instance streams / shader wind / LOD / scaling / debug
wind state / sampling / zones / consumers / validation
tree focal/tree-line/material/wind/validation
scatter flowers/rocks/mushrooms/rules/validation
atmosphere sky/sun/clouds/hills/validation
player state/movement/contact/actions/validation
camera mode/rig/collision/feel/validation
input map/bindings/context/normalization/validation
interaction registry/affordance/inspect/events/validation
story state/beats/dialogue/sequence/validation
objective model/flow/completion/feedback/validation
ecology ambience/zones/triggers/agents/validation
audio bed/spatial cues/state/events/validation
UI HUD/story/debug/state/validation
save model/slots/adapter/migration/validation
diagnostics runtime/render/determinism/smokes/report
performance quality/budgets/LOD/adaptive scaling/validation
render host selection/ingest/pass order/state/validation
postprocess pass registry/targets/outline/color grade/validation
render target color/depth/normal/ping-pong/resize
outline/color grade/fog/vignette/final composite parameter services
Pages build/workflow/artifacts/cache/deploy validation
```

## Implementation truth classification

### Source-backed now

```txt
external and fallback meadow-area-kit paths
DSK registry/install helpers
render-plan v2 contract and enhancer
terrain/path/atmosphere/scatter/tree/grass mesh generation
nine imported grass kits
wind-field, performance, tree, and postprocess composition kits
WebGL renderer v2
GameHost diagnostics
headless-editor bridge
```

### Descriptor shells or content-level declarations

```txt
player, camera, input, interaction, story, objective, ecology, audio, UI, save
render-target and individual postprocess pass kits
some host/composition/scatter/atmosphere registry ids whose behavior is currently inline in larger modules
```

### Planned proof layer

```txt
mesh-contribution-row-kit
mesh-contribution-ledger-kit
registry-truth-snapshot-kit
GameHost-render-proof-projection-kit
headless-editor-render-observation-kit
```

## Proposed DSK composition

```txt
mesh-contribution-ledger-kit
  owns row schema, status/reason catalog, deterministic ordering, totals, validation
  receives expected descriptor families from render-plan v2
  receives measured before/after geometry counters from mesh-builder stages
  outputs serializable contribution rows and summary

registry-truth-snapshot-kit
  owns registry-id classification and consistency checks
  reads external/local/required ids, descriptor metadata, and explicit source-backed map
  outputs external/source-backed/descriptor-shell/planned/unresolved rows

GameHost-render-proof-projection-kit
  projects the contribution ledger without replacing legacy methods

headless-editor-render-observation-kit
  reads the same ledger through a stable editor capability and capture metadata
```

## Main architectural risk

The system currently treats declared descriptors and aggregate renderer output as if they were sufficient proof. They are not. The proof owner must sit at the consumer boundary where geometry is actually emitted, then be projected outward without moving rendering authority into GameHost or the editor bridge.

## Next safe ledge

```txt
IntoTheMeadow Mesh Contribution Ledger + Registry Truth Fixture Gate
```