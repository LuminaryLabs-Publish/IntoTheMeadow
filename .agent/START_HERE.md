# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-11T17-30-56-04-00`

## Summary

`IntoTheMeadow` is a DSK-composed browser meadow with one commit-pinned external provider, 43 local DSK/kit declarations, a persistent WebGL renderer, a browser editor bridge and a Node headless-editor environment.

The current audit establishes a WebGL context-recovery gap. The renderer creates its program, attribute and uniform locations, and GPU buffers once. It installs no context-loss/restoration listeners, records no context or resource generation, and can retain a valid topology cache after the browser invalidates the underlying GPU objects.

## Plan ledger

**Goal:** make WebGL context loss and restoration an explicit, generation-fenced renderer transaction that commits a new visible frame before renderer readiness, diagnostics or canvas capture return to success.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories remain centrally tracked with root `.agent` state.
- [x] Select only `IntoTheMeadow` under the oldest documented-selection rule.
- [x] Trace browser boot, RAF, renderer creation, program and buffer ownership, snapshots, capture and current smoke coverage.
- [x] Preserve the complete interaction, domain, kit and service inventory.
- [x] Define WebGL context state, generation, resource rebuild and recovered-frame proof.
- [x] Refresh the required root `.agent` state.
- [ ] Runtime implementation and executable recovery fixtures remain future work.

## Current audited ledge

```txt
IntoTheMeadow WebGL Context Recovery Authority
+ Context Generation / Resource Rebuild / Recovered Frame Fixture Gate
```

This ledge fits after render-topology ownership and before committed-frame publication. Earlier lifecycle, host-gateway, workspace, clock and source-provider gates remain prerequisites. The DSK runtime-consumption audit remains downstream and must eventually bind the renderer recovery services through truthful runtime evidence.

## Main finding

```txt
renderer construction
  -> acquire WebGL context once
  -> compile/link program once
  -> resolve attribute and uniform locations once
  -> build buffers when topology key changes

context loss
  -> no listener
  -> no state transition
  -> no resource-generation invalidation
  -> last renderer snapshot remains readable

context restoration
  -> no listener
  -> no program rebuild
  -> no location re-resolution
  -> no forced buffer upload when topology is unchanged
  -> no first recovered frame acknowledgement
```

A restored browser context can therefore be paired with previous-generation program and buffer handles while `cache.topologyKey`, `lastRender`, HUD diagnostics and editor capture still describe the pre-loss frame.

## Required authority

```txt
meadow-webgl-context-recovery-authority-domain
  -> context state and generation
  -> loss/restore event admission
  -> render and capture fences
  -> GPU resource registry and generation
  -> staged rebuild and rollback
  -> first recovered frame acknowledgement
  -> typed results, diagnostics and bounded journal
```

## Required implementation order

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Step Admission and Clock Integrity
5. Source Provider Authority
6. Render Topology Identity Authority
6a. WebGL Context Recovery Authority
7. Committed Frame Observation Authority
8. Interaction Command and Objective Authority
9. DSK Runtime Consumption Authority
```

## Read this pass first

```txt
.agent/trackers/2026-07-11T17-30-56-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T17-30-56-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-11T17-30-56-04-00-webgl-context-recovery-authority-map.md
.agent/render-audit/2026-07-11T17-30-56-04-00-context-loss-stale-render-snapshot-gap.md
.agent/interaction-audit/2026-07-11T17-30-56-04-00-context-loss-restore-event-map.md
.agent/webgl-context-audit/2026-07-11T17-30-56-04-00-context-generation-resource-rebuild-contract.md
.agent/deploy-audit/2026-07-11T17-30-56-04-00-webgl-context-recovery-fixture-gate.md
```

## Exact inventory

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
external declared kits: 1
local declared kits: 43
total declared kits: 44
required-v0.1 local kits: 15
WebGL context listeners: 0
context generation fields: 0
resource generation fields: 0
recovered-frame acknowledgements: 0
```

## Guardrails

Update existing renderer, render-host, lifecycle, diagnostics, editor and committed-frame owners before creating overlapping packages. Keep meadow-specific adapters local. Promote generic recovery contracts into NexusEngine only after forced context-loss fixtures prove repeated restoration, rollback, capture freshness and disposal.
