# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-11T12-29-49-04-00`

## Summary

`IntoTheMeadow` has a working static meadow render route, browser editor bridge and Node headless-editor environment. The current Node workspace uses `resolve()` followed by a raw `startsWith(root)` check, which does not prove path-segment or symlink containment.

The immediate new audit boundary is a shared workspace path authority for list, read, write and capture-artifact operations. Runtime lifecycle and the public host capability gateway remain prerequisites.

## Plan ledger

**Goal:** preserve one admitted editor workspace and artifact root before expanding automated file operations.

- [x] Compare the full accessible Publish repository list with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `IntoTheMeadow` as the oldest eligible entry.
- [x] Trace browser, headless editor, workspace and capture interactions.
- [x] Inventory domains, kits and services.
- [x] Define the workspace path DSK and fixture boundary.
- [x] Refresh root `.agent` routing.
- [ ] Implement runtime and fixtures later.

## Current ledge

```txt
IntoTheMeadow Headless Workspace Path Authority
+ Sibling-Prefix / Symlink / No-Mutation Fixture Gate
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
8. Interaction Command Authority
9. DSK Registry Consumption Proof
```

## Read first

```txt
.agent/trackers/2026-07-11T12-29-49-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T12-29-49-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-11T12-29-49-04-00-workspace-path-authority-dsk-map.md
.agent/render-audit/2026-07-11T12-29-49-04-00-capture-artifact-path-trust-gap.md
.agent/interaction-audit/2026-07-11T12-29-49-04-00-workspace-operation-admission-map.md
.agent/headless-editor-audit/2026-07-11T12-29-49-04-00-workspace-containment-contract.md
.agent/workspace-security-audit/2026-07-11T12-29-49-04-00-sibling-prefix-symlink-escape-contract.md
.agent/deploy-audit/2026-07-11T12-29-49-04-00-workspace-path-fixture-gate.md
```

Retained prerequisite audits:

```txt
.agent/lifecycle-audit/2026-07-11T02-28-12-04-00-single-raf-global-lease-rollback-contract.md
.agent/capability-gateway-audit/2026-07-11T10-50-14-04-00-public-host-quarantine-contract.md
.agent/clock-authority-audit/2026-07-11T08-31-33-04-00-finite-monotonic-step-budget-contract.md
.agent/source-provider-audit/2026-07-11T04-39-58-04-00-external-fallback-contract.md
.agent/render-cache-audit/2026-07-11T06-38-59-04-00-source-key-mutation-contract.md
.agent/frame-authority-audit/2026-07-11T00-30-48-04-00-atomic-committed-frame-contract.md
.agent/objective-system-audit/2026-07-11T04-49-30-04-00-objective-story-transition-contract.md
.agent/registry-truth-audit/2026-07-11T02-20-44-04-00-declared-runtime-consumption-contract.md
```

## Selection result

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central-ledger entries: 9
root .agent states: 9
selected: IntoTheMeadow / 2026-07-11T10-50-14-04-00
excluded: TheCavalryOfRome
```

Only `LuminaryLabs-Publish/IntoTheMeadow` is in scope for this pass.

## Current failure path

```txt
editor capability path
  -> safePath(root, path)
  -> resolve absolute target
  -> target.startsWith(root)
  -> sibling-prefix or symlink escape passes
  -> list/read/write/artifact operation outside admitted root
```

## Exact inventory

```txt
external declared kits: 1
local declared kits: 43
total declared kits: 44
required-v0.1 local kits: 15
runtime source-backed surfaces cataloged: 24
```

## Next implementation boundary

Update the existing headless environment and diagnostics owners first. Put reusable segment-aware and symlink-aware containment in NexusEngine's `core-headless-editor-kit`; keep only workspace-root IDs, operation policy, budgets and artifact policy in this repository.

Do not claim workspace safety from `target.startsWith(root)`.