# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-10T15-18-29-04-00`

## Current ledge

```txt
IntoTheMeadow Mesh Contribution Ledger + Registry Truth Fixture Gate
```

## Read first

```txt
.agent/trackers/2026-07-10T15-18-29-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T15-18-29-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-10T15-18-29-04-00-mesh-contribution-ledger-dsk-map.md
.agent/render-audit/2026-07-10T15-18-29-04-00-descriptor-count-echo-vs-measured-consumption.md
.agent/grass-system-audit/2026-07-10T15-18-29-04-00-grass-draw-group-contribution-proof.md
.agent/gameplay-audit/2026-07-10T15-18-29-04-00-static-state-loop-deferral.md
.agent/interaction-audit/2026-07-10T15-18-29-04-00-editor-command-proof-readback.md
.agent/editor-proof-audit/2026-07-10T15-18-29-04-00-renderer-observation-row-contract.md
.agent/deploy-audit/2026-07-10T15-18-29-04-00-mesh-contribution-fixture-check-gate.md
```

## Current route

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> dynamic meadow-area-kit import
  -> src/game/create-into-the-meadow-game.js
  -> src/game/enhance-render-plan.js
  -> src/render-contract/meadow-render-plan-v2.js
  -> src/renderers/meadow-mesh-builder-v2.js
  -> src/renderers/meadow-webgl-renderer-v2.js
  -> src/boot/expose-game-host.js
  -> src/editor/install-editor-bridge.js
```

## Current interaction loop

```txt
browser boot
  -> install local and external DSK descriptors
  -> create and cache the deterministic source meadow plan
  -> enhance it with grass, wind, postprocess, performance, and descriptor counts
  -> tick frame/lastTick only
  -> build one combined CPU mesh from atmosphere, terrain, grass, flowers, cover, rocks, distant trees, and hero tree
  -> upload/reuse WebGL buffers by topologyKey
  -> render outline and cel/fog passes
  -> expose aggregate snapshots through GameHost and NexusEditorEnvironment
```

## Main finding

The renderer snapshot is not measured consumption proof.

```txt
renderPlan.contract.descriptorCounts is copied into mesh.descriptorCounts
primitiveFallbackCount is hard-coded to 0
mesh stages do not report attempted, consumed, skipped, or emitted geometry rows
GameHost and the editor bridge only forward the aggregate snapshot
DSK registry status is derived from required-v0.1 membership, not implementation-backed module proof
```

Do not start with visual fidelity, camera/input work, new content, renderer replacement, CDN migration, or shared-kit promotion.

## Next implementation files

```txt
src/render-proof/create-mesh-contribution-ledger.js
src/render-proof/create-registry-truth-snapshot.js
src/renderers/meadow-mesh-builder-v2.js
src/renderers/meadow-webgl-renderer-v2.js
src/boot/expose-game-host.js
src/editor/install-editor-bridge.js
tests/mesh-contribution-ledger-smoke.mjs
tests/dsk-registry-truth-smoke.mjs
package.json
```

## Validation state

Docs only. Runtime source did not change. No branch or pull request was created. Existing tests were not run because this pass changed documentation only.