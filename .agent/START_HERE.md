# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-10T16-51-37-04-00`

## Current ledge

```txt
IntoTheMeadow External Meadow Source Provenance + Fallback Parity Fixture Gate
```

## Read first

```txt
.agent/trackers/2026-07-10T16-51-37-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T16-51-37-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-10T16-51-37-04-00-external-source-provenance-dsk-map.md
.agent/render-audit/2026-07-10T16-51-37-04-00-external-fallback-plan-parity-gap.md
.agent/gameplay-audit/2026-07-10T16-51-37-04-00-static-source-cache-time-overlay-loop.md
.agent/interaction-audit/2026-07-10T16-51-37-04-00-startup-failure-recovery-result-map.md
.agent/external-kit-audit/2026-07-10T16-51-37-04-00-meadow-area-kit-provenance-contract.md
.agent/deploy-audit/2026-07-10T16-51-37-04-00-external-kit-provenance-fixture-gate.md
```

## Current route

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> GAME_MANIFEST.externalKits meadow-area-kit URL
  -> dynamic import of a commit-pinned ProtoKit
  -> src/game/create-into-the-meadow-game.js
  -> cached source meadow plan
  -> local render-plan enhancement
  -> CPU mesh builder
  -> WebGL renderer v2
  -> GameHost and NexusEditorEnvironment readback
```

## Current interaction loop

```txt
browser boot
  -> import external meadow-area-kit
  -> install DSK descriptors
  -> create one deterministic source plan at time 0
  -> cache the source plan
  -> update frame and lastTick
  -> apply a time field overlay without re-querying the source kit
  -> enhance grass/wind/postprocess/performance descriptors
  -> build and render the combined mesh
  -> expose aggregate snapshots
```

## Main finding

The route has a pinned external source, but it does not have an authoritative source-provenance or fallback-parity contract.

```txt
external load success is inferred from function presence
source URL, commit, exported version, validation, and plan fingerprint are not carried into GameHost/editor readback
the browser host hard-fails on CDN/import/export errors instead of selecting the local fallback
fallback validation always passes and is not compared with the external plan
external and fallback plans differ materially in descriptor families and counts
getRenderPlan caches time-0 topology and only overlays the time field afterward
```

Preserve the existing mesh-contribution and registry-truth requirements. Add source provenance and parity proof before visual expansion, gameplay activation, CDN migration, or shared-kit promotion.

## Next implementation files

```txt
src/source-proof/create-meadow-source-provenance.js
src/source-proof/compare-meadow-source-plans.js
src/hosts/web-host.js
src/game/create-into-the-meadow-game.js
src/boot/install-dsks.js
src/boot/expose-game-host.js
src/editor/install-editor-bridge.js
tests/meadow-source-provenance-smoke.mjs
tests/meadow-source-fallback-parity-smoke.mjs
tests/meadow-source-failure-policy-smoke.mjs
package.json
```

## Validation state

Docs only. Runtime source did not change. No branch or pull request was created. Existing tests were not run because this pass changed documentation only.