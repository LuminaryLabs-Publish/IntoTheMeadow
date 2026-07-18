# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Last aligned:** `2026-07-18T07-40-23-04-00`  
**Status:** `render-descriptor-mesh-expansion-budget-authority-audited`

## Summary

IntoTheMeadow has 43 local DSK/kit descriptors and one external provider. The active visual route produces a validated `meadow-render-plan/v2`, expands it into one combined mesh and uploads five vertex attributes. Descriptor counts exist, but no hard descriptor, terrain-resolution, vertex or attribute-byte budget is admitted before full mesh construction.

## Intent

Bound render-plan expansion before allocation, classify overflow deterministically and prove that the presented frame uses the accepted plan, mesh and budget generation.

## Checklist

- [x] Compare the complete Publish inventory.
- [x] Exclude TheCavalryOfRome.
- [x] Select only IntoTheMeadow by the oldest synchronized timestamp.
- [x] Preserve all 44 declared kit surfaces and service declarations.
- [x] Add the `2026-07-18T07-40-23-04-00` render-budget audit family.
- [x] Change documentation only on `main`.
- [x] Create no branch or pull request.
- [ ] Implement render-work admission and overflow fixtures later.

## Read this pass first

```txt
.agent/trackers/2026-07-18T07-40-23-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-18T07-40-23-04-00.md
.agent/architecture-audit/2026-07-18T07-40-23-04-00-render-descriptor-mesh-budget-dsk-map.md
.agent/render-audit/2026-07-18T07-40-23-04-00-descriptor-count-vertex-budget-gap.md
.agent/gameplay-audit/2026-07-18T07-40-23-04-00-render-admission-runtime-loop.md
.agent/interaction-audit/2026-07-18T07-40-23-04-00-render-plan-admission-command-result-map.md
.agent/render-budget-audit/2026-07-18T07-40-23-04-00-descriptor-mesh-expansion-budget-contract.md
.agent/deploy-audit/2026-07-18T07-40-23-04-00-render-budget-source-browser-pages-gate.md
.agent/central-sync-audit/2026-07-18T07-40-23-04-00-oldest-selection-render-budget-reconciliation.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Interaction loop

```txt
provider -> source plan -> render-plan v2 -> shape validation
         -> complete mesh expansion -> five attribute uploads
         -> outline and main draws -> renderer snapshot
missing  -> work estimate, hard admission, overflow settlement and budget-bound frame ack
```

## Domain and kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
active-v0.1 local descriptors: 15
planned local descriptors: 28
planned render-budget authority surfaces: 20
```

## Required parent domain

`meadow-render-descriptor-mesh-expansion-budget-authority-domain`

## Next safe ledge

Add a pure estimator that uses the same geometry formulas as the mesh builder, bind it to versioned profile limits, reject or deterministically reduce overflow before allocation, and expose estimate/admission/build/frame result IDs through both `GameHost` and `NexusEditorEnvironment`.

## Claim boundary

No runtime budget implementation or fixture was added. No performance, memory, artifact parity, Pages parity or production-readiness claim is made.