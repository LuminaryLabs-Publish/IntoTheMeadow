# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Last aligned:** `2026-07-12T13-54-00-04-00`  
**Status:** `grass-visibility-lod-central-reconciled`

## Summary

IntoTheMeadow is a DSK-composed browser meadow with one commit-pinned external provider, 43 local declarations, immutable game state, a texture-driven grass descriptor stack, one persistent CPU mesh and a WebGL renderer.

The current source-backed audit isolates grass visibility and LOD authority. Near, mid, far and terrain-tint tiers are declared, but placement chooses only near or mid batches from density. The distance policy is not consumed, every instance is baked into one static mesh, and the renderer draws that complete mesh twice without frustum, distance, hysteresis or visible-budget admission.

This timestamp reconciles that repo-local audit with the machine registry and `LuminaryLabs-Dev/LuminaryLabs`. Runtime behavior is unchanged.

## Plan ledger

**Goal:** keep one authoritative documentation state while defining camera-bound, revisioned grass visibility and first-frame proof through existing grass/render owners.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `IntoTheMeadow` because repo-local grass documentation was newer than central tracking.
- [x] Preserve the interaction loop, all domains, all 44 declared kits and offered services.
- [x] Preserve the source-backed density/static-mesh finding.
- [x] Add a fresh reconciliation tracker and architecture/system audits.
- [x] Synchronize root entrypoints, machine registry and central tracking.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement and execute camera-bound visibility later.

## Read this first

```txt
.agent/trackers/2026-07-12T13-54-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T13-54-00-04-00.md
.agent/architecture-audit/2026-07-12T13-54-00-04-00-grass-visibility-central-reconciliation-dsk-map.md
.agent/render-audit/2026-07-12T13-54-00-04-00-camera-visible-set-ledger-reconciliation-gap.md
.agent/gameplay-audit/2026-07-12T13-54-00-04-00-density-tagged-grass-lod-reconciliation.md
.agent/interaction-audit/2026-07-12T13-54-00-04-00-camera-grass-admission-reconciliation.md
.agent/grass-system-audit/2026-07-12T13-54-00-04-00-visibility-lod-registry-contract.md
.agent/central-sync-audit/2026-07-12T13-54-00-04-00-repo-ledger-machine-registry-contract.md
.agent/deploy-audit/2026-07-12T13-54-00-04-00-grass-visibility-fixture-central-gate.md
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
  -> create immutable game, render plan, performance, wind and post descriptors
  -> generate density texture, clump archetypes and near/mid/far batches
  -> create patch grid and choose near/mid instances from density
  -> flatten every instance into draw groups
  -> attach but do not consume the distance LOD policy
  -> build one complete static CPU mesh
  -> expose GameHost/editor bridge and start RAF

frame
  -> tick game with fixed 1/60 dt
  -> reuse static topology and mesh
  -> derive camera matrices
  -> upload time/wind/light/outline uniforms
  -> draw the complete mesh as outline
  -> draw the complete mesh as color
  -> publish aggregate counts/cache snapshot
  -> schedule successor RAF

proof
  -> Node checks require descriptors, groups and aligned static mesh arrays
  -> browser checks require page/editor/GPU markers and screenshot output
  -> no fixture traverses LOD bands, frustum states or visibility revisions
```

## Main findings

```txt
declared LOD tiers: near, mid, far, terrain-tint
active calls to grass-lod-policy-kit.pick(distance): 0
placement batch rule: density > 0.55 => near; otherwise mid
far selected by placement: no
terrain-tint representation: absent
culled representation: absent
patch bounds/frustum result: absent
hysteresis: absent
visible patch/instance/vertex/draw budgets: absent
all grass baked into one static mesh: yes
full-mesh draw passes per frame: 2
```

## Required parent domain

```txt
meadow-grass-visibility-lod-authority-domain
```

## Required flow

```txt
committed camera, viewport, topology, policy and performance revisions
  -> allocate GrassVisibilityCommand
  -> classify stable patch bounds against the frustum
  -> measure camera distance to admitted bounds
  -> apply tier hysteresis and deterministic budgets
  -> choose near, mid, far, terrain-tint or culled
  -> produce immutable GrassVisibilityResult
  -> reject stale generations
  -> stage and atomically install mesh/draw generation
  -> preserve predecessor after candidate failure
  -> publish per-tier observations
  -> acknowledge first visible frame with matching visibility revision
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

The exact kit and service inventory is in `.agent/kit-registry.json` and the current tracker.

## Validation boundary

```txt
runtime/grass/renderer/gameplay source changed: no
package scripts or dependencies changed: no
deployment changed: no
npm run check: not run
browser/Pages smoke: not run
grass visibility fixtures: unavailable
branch created: no
pull request created: no
```

Do not treat density-selected batch labels, lower card counts, stable topology or successful full-mesh rendering as camera-based LOD proof.
