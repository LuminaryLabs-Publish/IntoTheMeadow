# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Last aligned:** `2026-07-12T07-19-47-04-00`

## Summary

`IntoTheMeadow` is a DSK-composed browser meadow with one commit-pinned external provider, 43 local declarations, immutable state, a persistent WebGL renderer, browser/editor surfaces and descriptor-driven terrain, grass and atmosphere systems.

The current audit isolates **adaptive quality and performance budget authority**. `meadow-performance-dsk` is required-v0.1, but it currently returns static profiles. `auto` is another fixed profile, the host samples no CPU/GPU frame window, terrain resolution is hard-coded, physical outline/color draws ignore the profile post-process flag, runtime quality is absent from cache identity and visible frames cite no quality revision.

The preceding audio activation and shader precision audits remain active dependencies.

## Plan ledger

**Goal:** turn performance declarations into one stable runtime transaction that observes frame cost, applies capability-aware budgets and hysteresis, prepares every affected render consumer, atomically commits one quality revision and proves the first frame rendered from it.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `IntoTheMeadow` as the oldest eligible repository.
- [x] Inspect DSK declarations, performance policy, enhancer, host, diagnostics, renderer and checks.
- [x] Identify the full interaction loop, all domains, all 44 declared kits and every offered service.
- [x] Define performance observation, budget, hysteresis, transition, commit, rollback and frame-proof contracts.
- [x] Add timestamped architecture and system-specific audits.
- [x] Update documentation on `main`; create no branch or pull request.
- [ ] Runtime implementation and executable adaptive-quality fixtures remain future work.

## Read this first

```txt
.agent/trackers/2026-07-12T07-19-47-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-12T07-19-47-04-00-adaptive-quality-performance-dsk-map.md
.agent/render-audit/2026-07-12T07-19-47-04-00-static-profile-physical-render-gap.md
.agent/gameplay-audit/2026-07-12T07-19-47-04-00-unbounded-frame-quality-loop.md
.agent/interaction-audit/2026-07-12T07-19-47-04-00-performance-observation-quality-command-map.md
.agent/performance-audit/2026-07-12T07-19-47-04-00-sampling-hysteresis-quality-commit-contract.md
.agent/deploy-audit/2026-07-12T07-19-47-04-00-adaptive-quality-browser-fixture-gate.md
.agent/turn-ledger/2026-07-12T07-19-47-04-00.md
.agent/kit-registry.json
```

## Interaction loop

```txt
page boot
  -> external provider and DSK installation
  -> game, enhancer, renderer and editor bridge
  -> recursive RAF

frame
  -> absolute RAF time plus fixed dt 1/60
  -> static render-plan enhancement
  -> WebGL resize and cache admission
  -> outline draw plus color draw
  -> count/cache diagnostics
  -> successor RAF

quality
  -> default high profile
  -> no timing window
  -> no adaptive decision
  -> no quality command/result/revision
  -> no multi-consumer commit
  -> no first visible-frame quality receipt
```

## Main findings

```txt
meadow-performance-dsk required-v0.1: yes
quality profiles: low, medium, high, ultra, auto
default profile: high
auto controller: absent
CPU frame timing window: absent
GPU timer capability/result: absent
quality transition command/result: absent
quality revision: absent
terrain profile application: hard-coded 96 x 124
physical post-process policy application: absent
runtime quality cache identity: absent
visible quality-frame receipt: absent
```

## Domains and kit groups

```txt
external declared kits: 1
local declared kits: 43
total declared kits: 44
required-v0.1 local declarations: 15

browser/runtime/game/editor
terrain/path/grass/tree/scatter/atmosphere
player/input/interaction/story/objective/ecology/audio/UI/save
performance policy/render-plan enhancement/WebGL/post processing
validation/build/Pages
adaptive observation/budget/hysteresis/commit/frame proof: missing
```

The tracker and machine registry contain the complete per-kit service inventory.

## Required parent domain

```txt
meadow-adaptive-quality-performance-authority-domain
```

It coordinates capability evidence, CPU/GPU observations, rolling percentiles, named budgets, hysteresis, cooldown, quality commands, topology-impact planning, grass/terrain/post/surface adapters, atomic commit, rollback, stale-plan rejection, diagnostics and first-visible-frame proof.

## Ordered architecture queue

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Clock and Step Admission Authority
5. Source Provider Authority
6. Render Topology Identity Authority
6a. WebGL Context Recovery Authority
6b. Render Surface Resolution Authority
6c. Shader Precision Admission Authority
7. Committed Frame Observation Authority
7a. Fatal Runtime Failure Recovery Authority
7b. Adaptive Quality and Performance Budget Authority
7c. Grass Visibility and LOD Authority
7d. Audio Activation and Lifecycle Authority
8. Interaction Command and Objective Progression Authority
8a. Persistence Continuity Authority
9. DSK Runtime Consumption Authority
9a. Deterministic Replay Validation Authority
```

Do not implement adaptive mutation inside the renderer or treat one RAF duration as a quality decision. Keep quality state session-scoped, revisioned and committed through the existing enhancer and renderer owners.