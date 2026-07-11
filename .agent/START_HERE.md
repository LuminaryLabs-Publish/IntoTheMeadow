# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-11T15-49-49-04-00`

## Summary

`IntoTheMeadow` is a DSK-composed browser meadow with one commit-pinned external meadow provider, 43 declared local DSK/kit entries, a WebGL renderer, a browser editor bridge and a Node headless-editor environment.

The current audit establishes that the local DSK registry is primarily a declaration census, not proof of runtime composition. `installDsks()` returns generated descriptors and counts, while the actual game and renderer import implementation factories directly. Dependency requirements, service bindings, instance identities, consumption receipts and disposal ownership are not represented by the registry.

## Plan ledger

**Goal:** make the DSK registry truthfully distinguish declared, implemented, installed, active, consumed, failed and retired capabilities without changing current meadow rendering.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories remain centrally tracked with root `.agent` state.
- [x] Select only `IntoTheMeadow` under the oldest documented-selection rule.
- [x] Trace `dsk-registry.json`, source IDs, generated descriptors, installation, game state, diagnostics and smoke tests.
- [x] Trace direct runtime imports that bypass descriptor-driven service resolution.
- [x] Identify all active domains, declared kits and declared services.
- [x] Define a DSK runtime-consumption authority and executable fixture gate.
- [x] Refresh the required root `.agent` routing and validation state.
- [ ] Runtime implementation and executable consumption fixtures remain future work.

## Current audited ledge

```txt
IntoTheMeadow DSK Runtime Consumption Authority
+ Declaration / Implementation / Install / Consumption Parity Fixture Gate
```

This is the final currently documented architecture ledge. Earlier runtime-session, host-gateway, workspace, clock, provider, render-topology, committed-frame and interaction/objective gates remain prerequisites or consumers of this truth model.

## Main finding

```txt
dsk-registry.json
  -> duplicates 43 local IDs
  -> src/content/dsk-registry.js duplicates the same IDs
  -> src/dsks/index.js generates metadata descriptors
  -> installDsks() returns those descriptors and shape validation
  -> game state stores a descriptor snapshot
  -> diagnostics report counts

actual runtime
  -> imports implementation factories directly
  -> does not resolve services through the descriptor registry
  -> does not record per-kit install or consumption results
```

Additional concrete drift:

```txt
all local descriptor requires arrays: empty
all local descriptor provides arrays: one generic game:<domain> token
status source: required-v0.1 membership, not implementation evidence
meadow-webgl-renderer-v2-kit service map: missing, so generic fallback services are emitted
external loaded status: based on function truthiness, not provider identity or validation
DSK smoke: checks count and five layers, not runtime binding or consumption
```

## Required implementation order

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Step Admission and Clock Integrity
5. Source Provider Authority
6. Render Topology Identity Authority
7. Committed Frame Observation Authority
8. Interaction Command and Objective Authority
9. DSK Runtime Consumption Authority
```

## Read this pass first

```txt
.agent/trackers/2026-07-11T15-49-49-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T15-49-49-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-11T15-49-49-04-00-dsk-runtime-consumption-authority-map.md
.agent/render-audit/2026-07-11T15-49-49-04-00-renderer-registry-consumption-gap.md
.agent/gameplay-audit/2026-07-11T15-49-49-04-00-declared-gameplay-service-consumption-loop.md
.agent/dsk-registry-audit/2026-07-11T15-49-49-04-00-declaration-install-consumption-contract.md
.agent/deploy-audit/2026-07-11T15-49-49-04-00-dsk-consumption-parity-fixture-gate.md
```

## Exact inventory

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
external declared kits: 1
local declared kits: 43
total declared kits: 44
required-v0.1 local kits: 15
runtime interaction command capabilities: 0
registry-backed runtime service resolutions: 0
per-kit consumption receipts: 0
```

Update existing DSK owners before creating overlapping local packages. Generic registry, installation, dependency and consumption contracts should move to NexusEngine or ProtoKits only after the product-level fixture proves them.