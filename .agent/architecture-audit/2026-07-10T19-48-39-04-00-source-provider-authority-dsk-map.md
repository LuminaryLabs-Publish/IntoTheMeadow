# Architecture Audit: Source Provider Authority DSK Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T19-48-39-04-00`

## Architecture question

Which domain owns the identity, selection, validation, lineage, and downstream proof of the meadow source used by the browser, Node fixtures, GameHost, editor bridge, renderer, and deployment gate?

## Current DSK graph

```txt
GAME_MANIFEST
  -> external meadow-area-kit URL
  -> web-host loadExternalKits
       -> dynamic import
       -> export-shape check only
  -> createIntoTheMeadowGame({ externalKits })
       -> provider = external createMeadowAreaKit
          OR local createFallbackMeadowAreaKit when no factory was supplied
       -> installDsks({ meadow-area-kit: provider })
       -> meadow = provider(ARRIVAL_MEADOW_CONFIG)
       -> baseRenderPlan = meadow.getRenderPlan({ time: 0 })
       -> cached source plan
  -> render-plan enhancer
  -> mesh builder
  -> WebGL renderer
  -> HUD / GameHost / editor readback
```

## Ownership table

| Concern | Current owner | Current proof | Gap |
|---|---|---|---|
| External URL and commit | `GAME_MANIFEST` | literal jsDelivr URL | not copied into source observation |
| Browser module import | `web-host.loadExternalKits()` | factory exists | no version, digest, timeout, retry, or fallback result |
| Provider choice | `createIntoTheMeadowGame()` | nullish fallback expression | no explicit selection command/result |
| Local source generation | `createLocalMeadowSourcePlan()` | deterministic plan | no parity classification against external source |
| External source generation | `meadow-area-kit` | versioned deterministic plan | browser-only path in current host |
| DSK install state | `installDsks()` | loaded/deferred by function presence | does not prove provider identity or compatibility |
| Cached source plan | game domain | plan object and version | no source epoch, source fingerprint, or lineage |
| Rebuild | `rebuildRenderPlan()` | returns new plan | no reason, previous/next source row, or consumer invalidation row |
| Enhancement | render-plan enhancer | topology key and aggregate descriptors | source identity not retained as first-class provenance |
| Mesh/render | mesh builder and WebGL renderer | aggregate counts/snapshot | cannot identify the source plan consumed |
| Host/editor | GameHost and editor bridge | aggregate snapshots | no bounded source-provider observation |
| Node tests | direct `createIntoTheMeadowGame()` | local fallback succeeds | production external provider is not exercised |

## External source kit services

`meadow-area-kit 0.1.0` offers:

```txt
normalize area, path, style, materials, wind, and atmosphere
seeded random source generation
grass, flower, rock, mushroom, tree-line, focal-tree, path, ground, and atmosphere descriptors
render-plan creation
plan validation
source snapshot
reset snapshot
optional NexusEngine runtime-kit wrapper
provided services:
  environment:meadow-area
  render:meadow-area-plan
  service:meadow-area-query
```

## Local fallback services

```txt
deterministic hash-based scatter
atmosphere, ground, path, one grass source, flowers, rocks, tree line, and focal tree
local-source-plan-v1 render plan
fallback snapshot
validation marked fallback and representative
```

The local provider is structurally similar but not proven behaviorally equivalent. It uses different placement logic, IDs, normalization rules, version identity, and feature coverage.

## Required source-provider authority

Add one source-provider domain or extend the existing meadow-area bridge DSK to own:

```txt
provider request
provider candidates
selected provider kind
selection status and reason
manifest URL and pinned commit
factory/exported version
source-plan schema and version
source-plan fingerprint
source-plan object/type counts
validation result
fallback eligibility
fallback reason
source epoch
rebuild reason
consumer topology key
bounded selection and rebuild journal
```

Suggested immutable row:

```txt
{
  sourceEpoch,
  requestedProvider,
  selectedProvider,
  status,
  reason,
  moduleUrl,
  pinnedCommit,
  factoryVersion,
  planId,
  planVersion,
  planFingerprint,
  objectCounts,
  validation,
  topologyKey
}
```

## DSK classification

### Active and source-backed

```txt
meadow-area-kit
fallback-meadow-area-kit
meadow-area-bridge-dsk
install-dsks
into-the-meadow-game-dsk
game-composition-dsk
web-host-dsk
```

### Active downstream consumers

```txt
meadow-render-plan-v2
meadow-render-plan-enhancer-v2
meadow-mesh-builder-v2
meadow-webgl-renderer-v2
meadow-render-host-dsk
meadow-webgl-renderer-v2-kit
GameHost diagnostics surface
headless-editor bridge
```

### Source-dependent content/render families

```txt
meadow-terrain-texture-dsk
path-corridor-dsk
nine grass-system kits
grass-patch-dsk
gpu-grass-render-dsk
wind-field-dsk
tree-object-dsk
meadow-scatter-dsk
meadow-atmosphere-dsk
meadow-ecology-dsk
meadow-performance-dsk
post-process-stack-dsk and pass kits
```

### Declared but not authoritative

```txt
meadow-player-dsk
meadow-camera-dsk
meadow-input-dsk
meadow-interaction-dsk
meadow-story-dsk
meadow-objective-dsk
meadow-audio-dsk
meadow-ui-dsk
meadow-save-dsk
```

## Dependency order

```txt
source-provider request/result contract
  -> browser external candidate adapter
  -> local fallback candidate adapter
  -> canonical source fingerprint
  -> explicit fallback policy
  -> source selection/rebuild journal
  -> provenance projection into enhanced plan
  -> mesh and renderer consumption rows
  -> GameHost/editor observations
  -> external/fallback parity fixtures
  -> browser deployment failure-mode fixture
```

## Guardrails

```txt
preserve the current pinned external commit
preserve current visual output by default
preserve the local fallback for headless use
make fallback policy explicit instead of implicit
keep legacy GameHost methods additive
avoid renderer replacement
avoid shared-kit promotion until parity evidence exists
```

## Conclusion

The repository has two source implementations but no single authority that can say which one was selected, why, what exact plan it produced, and which rendered frame consumed that plan. The smallest safe architecture change is a source-provider result contract and parity gate, not a renderer or content rewrite.