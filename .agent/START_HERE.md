# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-10T19-48-39-04-00`

## Current ledge

```txt
IntoTheMeadow Runtime Session Lifecycle Authority + Stop/Restart/Dispose Fixture Gate
```

## Immediate companion gate

```txt
IntoTheMeadow Source Provider Authority + External/Fallback Parity Fixture Gate
```

## Read first

```txt
.agent/trackers/2026-07-10T19-48-39-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T19-48-39-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-10T19-48-39-04-00-source-provider-authority-dsk-map.md
.agent/render-audit/2026-07-10T19-48-39-04-00-source-identity-render-consumption-gap.md
.agent/gameplay-audit/2026-07-10T19-48-39-04-00-source-parity-gameplay-coordinate-contract.md
.agent/interaction-audit/2026-07-10T19-48-39-04-00-source-selection-result-and-target-index-map.md
.agent/source-authority-audit/2026-07-10T19-48-39-04-00-external-fallback-provider-contract.md
.agent/deploy-audit/2026-07-10T19-48-39-04-00-cdn-provider-failure-parity-gate.md
```

The immediately preceding lifecycle audit remains relevant:

```txt
.agent/trackers/2026-07-10T19-48-09-04-00/project-breakdown.md
.agent/lifecycle-audit/2026-07-10T19-48-09-04-00-runtime-session-stop-dispose-restart-contract.md
.agent/editor-proof-audit/2026-07-10T19-48-09-04-00-editor-listener-global-cleanup-gap.md
```

## Selection result

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. `TheCavalryOfRome` remains excluded. All nine eligible repositories are represented in the central ledger and have root `.agent` state.

`IntoTheMeadow` was selected from the oldest documented fallback position. A near-simultaneous lifecycle pass advanced the same repository immediately before this source-authority pass became visible. This pass remained scoped to the same single product repository and added a non-overlapping source-provider audit rather than switching projects mid-run.

## Product read

`IntoTheMeadow` is a static DSK-composed meadow route. It imports a commit-pinned external meadow source in the browser, uses a separate local fallback during direct Node/headless construction, caches one source plan, enhances it through local terrain/grass/wind/performance/postprocess services, builds a combined CPU mesh, renders through two WebGL passes, and exposes aggregate GameHost/editor readback.

## Actual interaction and frame loop

```txt
index.html
  -> boot-game.js
  -> startWebHost()
  -> dynamically import commit-pinned meadow-area-kit
  -> createIntoTheMeadowGame({ externalKits })
  -> install DSK descriptors
  -> create and cache the time-0 meadow source plan
  -> requestAnimationFrame
  -> game.tick({ time, dt: 1/60 })
  -> mutate frame and lastTick only
  -> overlay time on the cached plan
  -> enhance descriptors
  -> build/reuse CPU mesh and WebGL buffers
  -> outline pass and cel/fog pass
  -> publish aggregate HUD, GameHost, and editor snapshots
```

The authored path-progress and focal-tree inspection actions remain inactive.

## Current findings

### Lifecycle authority

The host does not retain a single session identity, RAF owner, coordinated resource/global lease ledger, or terminal disposal path. The current lifecycle gate remains first.

### Source-provider authority

```txt
browser boot requires the external CDN provider
external import/export failure stops boot before local fallback selection
Node render and determinism checks omit the external provider and silently use the local fallback
external and fallback sources use different versions, snapshots, validation strength, IDs, and placement logic
fallback validation claims representative without measured parity
source URL, commit, provider kind/version, selection reason, source fingerprint, and source epoch are not retained as one immutable row
render, GameHost, editor, and future gameplay results cannot prove which source produced the visible meadow
```

## Implementation order

```txt
1. Runtime Session Lifecycle Authority + Stop/Restart/Dispose Fixture Gate
2. Source Provider Authority + External/Fallback Parity Fixture Gate
3. Interaction Command Authority + Objective Progress Fixture Gate
4. Mesh Contribution Ledger + Registry Truth Fixture Gate
```

Do not start with CDN migration, source promotion, renderer replacement, new meadow content, or visual tuning.