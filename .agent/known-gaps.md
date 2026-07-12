# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T15-49-09-04-00`

## Summary

The leading architecture gap is declaration-to-runtime consumption. Forty-three local DSK/kits are structurally described, but active status does not prove provider resolution, executable service installation, readiness or command consumption. The simulation currently advances only `frame` and `lastTick`.

## Plan ledger

**Goal:** close capability-truth, gameplay-consumption and visible-proof gaps while preserving earlier lifecycle, render, grass, audio, persistence and replay findings.

- [x] Record declaration, provider, dependency and install gaps.
- [x] Record inert gameplay and unreachable authored-content gaps.
- [x] Record consumption, observation and first-frame gaps.
- [x] Preserve previous grass visibility and WebGL authority gaps.
- [ ] Implement in dependency order.

## Declaration and provider gaps

```txt
service contract version
provider identity and version
immutable provider source/fingerprint
provider registry
real dependency lists
dependency graph and install order
per-kit install command/result
readiness probe
candidate rollback
provider disposal and retirement
```

## Capability-state gaps

```txt
Declared/Validated/Installed/Ready/Active distinction
runtime capability generation
declared/offered/realized service parity
planned-capability rejection
degraded capability state
stale generation rejection
bounded capability observation
```

Current `active-v0.1` is assigned from required-list membership, not runtime readiness.

## Consumption gaps

```txt
callable service registry
command-to-service binding
service invocation identity
DSK consumption receipt
input/result fingerprints
state revision before/after
exactly-once command handling
duplicate command parity
```

## Gameplay gaps

```txt
browser keyboard/pointer/gamepad listeners
input normalization and context
editor gameplay command capability
player velocity and movement integration
terrain contact and path projection
path progress mutation
interaction target query
inspection state and result
objective progress/completion
story trigger evaluation
feedback and HUD projection
audio event consumption
save binding to committed gameplay
```

## Authored-content reachability gaps

```txt
path-discovery trigger at path-progress:0.25
focal-tree trigger at inspect:focal-tree
walk-the-path completion at progress >= 0.35
inspect-tree completion from admitted inspection
```

All four conditions are authored but not evaluated by the runtime.

## State and frame gaps

```txt
gameplay state revision
objective revision
story revision
interaction result id
capability generation in render plan
DSK receipt ids in snapshot
feedback projection result
first visible gameplay frame acknowledgement
```

## Test gaps

```txt
missing/wrong provider
service contract mismatch
cyclic dependency
readiness failure and rollback
planned declaration unavailable
active declaration callable
movement determinism
path-progress thresholds
inspect target evidence
objective/story exactly-once behavior
stale capability generation
service consumption receipt
local/Pages gameplay parity
```

## Preserved grass and render gaps

```txt
camera-bound grass visible set
near/mid/far/terrain-tint/culled reachability
frustum classification and hysteresis
visible patch/instance/vertex/draw budgets
WebGL program-interface reflection and schema admission
context/surface/program generations
committed render-frame observation
```

## Preserved host and lifecycle gaps

```txt
runtime session lifecycle and ordered disposal
RAF cancellation and step admission
raw GameHost capability quarantine
editor bridge generation and bounded errors
source-provider artifact authority
fatal runtime recovery
```

## Preserved product gaps

```txt
audio user-gesture activation and lifecycle
save migration and atomic hydration
adaptive quality authority
independent deterministic replay
```

## Completion boundary

Do not count a descriptor snapshot, `active-v0.1` label, generic provide token, content count or successful visual frame as DSK runtime proof. Completion requires concrete providers, installed callable services, command consumption receipts, committed gameplay transitions and a visible frame citing the accepted capability and gameplay revisions.