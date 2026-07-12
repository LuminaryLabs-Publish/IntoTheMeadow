# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Last aligned:** `2026-07-12T13-38-52-04-00`  
**Status:** `grass-visibility-lod-authority-audited`

## Summary

IntoTheMeadow is a DSK-composed browser meadow with one commit-pinned external provider, 43 local declarations, immutable game state, a texture-driven grass descriptor stack, one persistent CPU mesh and a WebGL renderer.

The current audit isolates **grass visibility and LOD authority**. The declared LOD policy exposes near, mid, far and terrain-tint tiers, but placement selects near or mid batches from density rather than camera distance. Far and terrain-tint tiers are not selected, every grass instance is baked into one static mesh, and the renderer draws that complete mesh twice per frame without frustum, distance, hysteresis or budget admission.

The preceding WebGL program-interface audit and all earlier runtime, host, editor, clock, provider, topology, context, surface, precision, frame, performance, audio, progression, persistence, DSK-consumption and replay audits remain active dependencies.

## Plan ledger

**Goal:** make each visible grass set a camera-bound, revisioned render decision that applies distance tiers, frustum containment, hysteresis, density budgets and first-visible-frame proof without replacing the existing grass DSK family.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Skip `TheOpenAbove` because newer repo-local terrain documentation at `2026-07-12T13-29-56-04-00` was not yet synchronized centrally.
- [x] Select only `IntoTheMeadow` as the next-oldest stable repository.
- [x] Trace grass density, batch creation, patch placement, draw grouping, LOD policy, mesh construction and draw submission.
- [x] Identify the interaction loop, all active domains, all 44 declared kits and offered services.
- [x] Define the grass visibility/LOD authority, results, observations and fixture gates.
- [x] Add a fresh timestamped tracker and architecture/render/gameplay/interaction/grass/deploy audit family.
- [x] Refresh required root `.agent` files on `main`.
- [x] Create no branch or pull request.
- [ ] Implement and execute camera-bound grass visibility later.

## Read this first

```txt
.agent/trackers/2026-07-12T13-38-52-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T13-38-52-04-00.md
.agent/architecture-audit/2026-07-12T13-38-52-04-00-grass-visibility-lod-authority-dsk-map.md
.agent/render-audit/2026-07-12T13-38-52-04-00-static-grass-mesh-camera-visibility-gap.md
.agent/gameplay-audit/2026-07-12T13-38-52-04-00-density-tagged-lod-always-drawn-loop.md
.agent/interaction-audit/2026-07-12T13-38-52-04-00-camera-grass-visibility-admission-map.md
.agent/grass-system-audit/2026-07-12T13-38-52-04-00-distance-frustum-hysteresis-budget-contract.md
.agent/deploy-audit/2026-07-12T13-38-52-04-00-grass-visibility-lod-fixture-gate.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Interaction loop

```txt
boot
  -> import pinned meadow-area provider
  -> install 43 local declarations plus one external kit
  -> create immutable game, grass descriptors, plan enhancer and renderer
  -> generate density texture and patch grid
  -> create near/mid/far static batches
  -> assign each instance a near or mid batch from density
  -> flatten every patch into draw groups
  -> build one complete CPU mesh
  -> expose GameHost/editor bridge and start RAF

frame
  -> tick game with fixed 1/60 dt
  -> reuse static topology and mesh
  -> derive camera matrices only
  -> upload time/wind/light uniforms
  -> draw the full mesh as outline
  -> draw the full mesh as color
  -> publish aggregate counts/cache snapshot
  -> schedule next RAF

proof
  -> Node tests require grass descriptors and stable topology
  -> renderer smoke requires a substantial static mesh
  -> no test moves the camera across LOD thresholds or outside patch frusta
  -> no visible-frame receipt identifies admitted/culled grass patches
```

## Main findings

```txt
declared LOD tiers: near, mid, far, terrain-tint
distance policy function: grass-lod-policy-kit.pick(distance)
runtime calls to pick(distance): 0
placement batch rule: density > 0.55 => near, otherwise mid
far batches selected by placement: no
terrain-tint batch representation: absent
camera/frustum visibility result: absent
hysteresis or transition state: absent
visible grass budget result: absent
grass patches baked into one mesh: yes
full mesh draw passes per frame: 2
per-frame grass culling: absent
```

## Required parent domain

```txt
meadow-grass-visibility-lod-authority-domain
```

## Required flow

```txt
committed camera and render-surface observation
  -> allocate visibility command and camera revision
  -> classify each patch against frustum and distance bands
  -> apply hysteresis and prior-tier continuity
  -> apply density, instance, vertex and draw budgets
  -> select near, mid, far, terrain-tint or culled representation
  -> construct immutable GrassVisibilityResult
  -> reject stale camera/surface/topology generations
  -> commit visible patch groups and mesh/draw generations
  -> publish counts, reasons and bounded observations
  -> acknowledge first visible frame with the same visibility revision
```

## Kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kits: 44
grass-specific local kits: 11
required-v0.1 local declarations: 15
planned local declarations: 28
```

The complete per-kit service inventory is in `.agent/kit-registry.json` and the current tracker.

## Validation boundary

```txt
runtime source changed: no
grass source changed: no
renderer source changed: no
gameplay source changed: no
package scripts or dependencies changed: no
deployment changed: no
npm run check: not run
browser/Pages smoke: not run
grass visibility/LOD fixtures: unavailable
```

Do not treat density-selected batch labels, stable topology, a lower card count or successful rendering as camera-based LOD proof. Readiness requires camera-bound visibility results, reachable tiers, stale-result rejection, bounded transitions and a visible frame carrying the accepted visibility revision.
