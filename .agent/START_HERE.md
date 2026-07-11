# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-11T10-50-14-04-00`

## Summary

`IntoTheMeadow` has a working static meadow render route, but its public control surface is not authoritative. `GameHost` exposes the raw `game` object, and the browser editor calls raw `tick()` and `reset()` methods directly.

Any page script can therefore bypass lifecycle, session, step-admission, command-result, journal and render-commit boundaries.

## Current ledge

```txt
IntoTheMeadow Host Capability Gateway
+ Raw Runtime Quarantine / Observation Isolation Fixture Gate
```

## Required implementation order

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
3. Runtime Step Admission and Clock Integrity
4. Source Provider Authority
5. Render Topology Identity Authority
6. Committed Frame Observation Authority
7. Interaction Command Authority
8. DSK Registry Consumption Proof
```

## Read first

```txt
.agent/trackers/2026-07-11T10-50-14-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T10-50-14-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-11T10-50-14-04-00-host-capability-authority-dsk-map.md
.agent/render-audit/2026-07-11T10-50-14-04-00-raw-plan-observation-commit-gap.md
.agent/gameplay-audit/2026-07-11T10-50-14-04-00-raw-tick-reset-bypass-loop.md
.agent/interaction-audit/2026-07-11T10-50-14-04-00-capability-admission-result-map.md
.agent/capability-gateway-audit/2026-07-11T10-50-14-04-00-public-host-quarantine-contract.md
.agent/deploy-audit/2026-07-11T10-50-14-04-00-host-capability-fixture-gate.md
```

Retained companion context:

```txt
.agent/lifecycle-audit/2026-07-11T02-28-12-04-00-single-raf-global-lease-rollback-contract.md
.agent/clock-authority-audit/2026-07-11T08-31-33-04-00-finite-monotonic-step-budget-contract.md
.agent/source-provider-audit/2026-07-11T04-39-58-04-00-external-fallback-contract.md
.agent/render-cache-audit/2026-07-11T06-38-59-04-00-source-key-mutation-contract.md
.agent/frame-authority-audit/2026-07-11T00-30-48-04-00-atomic-committed-frame-contract.md
.agent/objective-system-audit/2026-07-11T04-49-30-04-00-objective-story-transition-contract.md
.agent/registry-truth-audit/2026-07-11T02-20-44-04-00-declared-runtime-consumption-contract.md
```

## Selection result

All ten accessible Publish repositories were compared. `TheCavalryOfRome` remains excluded. All nine eligible repositories have central ledger entries and root `.agent/START_HERE.md` state.

```txt
IntoTheMeadow       selected / 2026-07-11T08-31-33-04-00
PrehistoricRush      tracked  / 2026-07-11T08-48-04-04-00
MyCozyIsland         tracked  / 2026-07-11T09-08-59-04-00
TheOpenAbove         tracked  / 2026-07-11T09-21-50-04-00
HorrorCorridor       tracked  / 2026-07-11T09-29-07-04-00
PhantomCommand       tracked  / 2026-07-11T09-40-19-04-00
ZombieOrchard        tracked  / 2026-07-11T10-00-12-04-00
TheUnmappedHouse     tracked  / 2026-07-11T10-18-05-04-00
AetherVale           tracked  / 2026-07-11T10-38-55-04-00
TheCavalryOfRome     excluded by rule
```

Only `LuminaryLabs-Publish/IntoTheMeadow` is in scope for this pass.

## Current failure path

```txt
page script or editor
  -> GameHost.game
  -> tick / reset / rebuildRenderPlan
  -> direct state or source mutation
  -> no capability admission
  -> no session fence
  -> no semantic result
  -> no bounded journal
  -> no committed-frame acknowledgement
```

## Exact inventory retained

```txt
external declared kits: 1
local declared kits: 43
total declared kits: 44
required-v0.1 local kits: 15
runtime source-backed surfaces cataloged: 24
```

## Next implementation boundary

Update `web-host-dsk`, `into-the-meadow-game-dsk`, `meadow-render-host-dsk` and `meadow-diagnostics-dsk` first. Add one coordinating `meadow-host-capability-authority-domain` only for public command admission, raw-runtime quarantine, read-model projection, result normalization, lease revocation and browser/Node parity.

Do not build deterministic stepping or gameplay commands on top of `GameHost.game`. First make the public gateway the only mutation path.