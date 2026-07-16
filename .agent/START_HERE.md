# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Last aligned:** `2026-07-16T05-58-36-04-00`  
**Status:** `authored-content-graph-referential-integrity-authority-audited`

## Summary

IntoTheMeadow currently imports scene, objective, interaction-target and story-beat records that agree through independently authored string IDs. Startup validates DSK descriptor shape and the render plan, but no content-graph result proves those IDs are unique, resolved, supported and reachable before gameplay state or a visible frame is published.

## Plan ledger

**Goal:** make authored content an immutable validated generation before progression, editor mutation or gameplay presentation can depend on it.

- [x] Compare the complete 11-repository Publish inventory.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm ten eligible ledgers and root `.agent` states.
- [x] Select only IntoTheMeadow by oldest synchronized timestamp.
- [x] Preserve all 44 kit surfaces and service declarations.
- [x] Add the `2026-07-16T05-58-36-04-00` content-graph audit family.
- [x] Change documentation only on `main`.
- [x] Create no branch or pull request.
- [ ] Implement graph admission and executable fixtures later.

## Read this pass first

```txt
.agent/trackers/2026-07-16T05-58-36-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-16T05-58-36-04-00.md
.agent/architecture-audit/2026-07-16T05-58-36-04-00-authored-content-graph-dsk-map.md
.agent/render-audit/2026-07-16T05-58-36-04-00-content-graph-visible-frame-gap.md
.agent/gameplay-audit/2026-07-16T05-58-36-04-00-authored-content-deadlock-loop.md
.agent/interaction-audit/2026-07-16T05-58-36-04-00-content-graph-command-result-map.md
.agent/content-graph-audit/2026-07-16T05-58-36-04-00-story-objective-target-reference-contract.md
.agent/deploy-audit/2026-07-16T05-58-36-04-00-content-graph-fixture-gate.md
.agent/central-sync-audit/2026-07-16T05-58-36-04-00-oldest-selection-content-graph-reconciliation.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Interaction loop

```txt
browser boot
  -> load external meadow provider
  -> import authored scene, target, objective and story modules
  -> install DSK descriptors
  -> create initial state from hardcoded content IDs
  -> tick time-only runtime
  -> validate and render meadow plan
  -> publish visible frame without content-graph admission
```

## Domain and kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
active-v0.1 local descriptors: 15
planned local descriptors: 28
planned content-graph authority surfaces: 20
```

The latest tracker and machine registry contain the full kit-by-kit service inventory.

## Required parent domain

`meadow-authored-content-graph-referential-integrity-authority-domain`

## Next safe ledge

Generate a typed content graph from the checked-in scene, target, objective, story and initial-state records. Reject duplicate, malformed, unknown or unreachable edges before game-state creation, then bind the accepted `ContentGraphDigest` to editor publication, diagnostics, saves and `FirstContentBoundGameplayFrameAck`.

## Claim boundary

The current checked-in IDs were not found to conflict. No runtime content validation, editor mutation gate, test fixture, artifact parity or Pages parity was implemented or proven.