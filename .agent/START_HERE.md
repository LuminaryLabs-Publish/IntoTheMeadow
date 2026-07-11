# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-11T04-39-58-04-00`

## Current ledge

```txt
IntoTheMeadow Source Provider Authority
+ External/Fallback Admission and Parity Fixture Gate
```

## Retained prerequisite gates

```txt
1. Runtime Session Lifecycle Authority
2. Committed Frame Observation Authority
3. DSK Registry and Service Truth
```

## Read first

```txt
.agent/trackers/2026-07-11T04-39-58-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T04-39-58-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-11T04-39-58-04-00-source-provider-authority-dsk-map.md
.agent/render-audit/2026-07-11T04-39-58-04-00-source-plan-topology-parity-gap.md
.agent/gameplay-audit/2026-07-11T04-39-58-04-00-boot-source-selection-loop.md
.agent/interaction-audit/2026-07-11T04-39-58-04-00-provider-admission-observation-map.md
.agent/source-provider-audit/2026-07-11T04-39-58-04-00-external-fallback-contract.md
.agent/deploy-audit/2026-07-11T04-39-58-04-00-external-fallback-parity-fixture-gate.md
```

Retained companion context:

```txt
.agent/lifecycle-audit/2026-07-11T02-28-12-04-00-single-raf-global-lease-rollback-contract.md
.agent/frame-authority-audit/2026-07-11T00-30-48-04-00-atomic-committed-frame-contract.md
.agent/registry-truth-audit/2026-07-11T02-20-44-04-00-declared-runtime-consumption-contract.md
```

## Selection result

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. `TheCavalryOfRome` remains excluded. All nine eligible repositories are centrally tracked and have root `.agent` state.

```txt
IntoTheMeadow       selected / 2026-07-11T02-28-12-04-00
PrehistoricRush      tracked  / 2026-07-11T02-48-17-04-00
TheOpenAbove         tracked  / 2026-07-11T03-01-38-04-00
HorrorCorridor       tracked  / 2026-07-11T03-18-44-04-00
PhantomCommand       tracked  / 2026-07-11T03-41-49-04-00
ZombieOrchard        tracked  / 2026-07-11T03-48-31-04-00
TheUnmappedHouse     tracked  / 2026-07-11T04-00-07-04-00
MyCozyIsland         tracked  / 2026-07-11T04-09-54-04-00
AetherVale           tracked  / 2026-07-11T04-28-33-04-00
TheCavalryOfRome     excluded by rule
```

`IntoTheMeadow` was the oldest eligible documented fallback. Only this Publish repository is in scope for this pass.

## Product read

`IntoTheMeadow` is a static DSK-composed browser meadow. Production boot imports a commit-pinned external `meadow-area-kit`, while Node tests and direct game construction omit the external provider and therefore use a local fallback source plan.

## Actual source-selection loop

```txt
browser
  -> GAME_MANIFEST external URL
  -> dynamic import must succeed
  -> createMeadowAreaKit must exist
  -> createIntoTheMeadowGame({ externalKits })
  -> external source plan

Node tests and direct callers
  -> createIntoTheMeadowGame()
  -> no externalKits supplied
  -> createFallbackMeadowAreaKit
  -> local source plan
```

## Current finding

The code contains a fallback provider, but production cannot reach it when CDN import or export validation fails because `loadExternalKits()` throws before game construction. Tests exercise the fallback path and do not prove the production provider path.

The two providers also emit materially different raw contracts:

```txt
external version: 0.1.0
local version:    local-source-plan-v1

external scatter: seeded path-relative placement
local scatter:    hash-based broad side bands

external objects: normalized path, wind, atmosphere, grass, focal tree and feature fields
local objects:    reduced placeholder shapes with hard-coded atmosphere and always-passing validation
```

No typed provider-admission result, provider fingerprint, raw-plan parity classification, capability negotiation, or browser fallback policy exists.

## Exact inventory retained

```txt
external declared kits: 1
local declared kits: 43
total declared kits: 44
required-v0.1 local kits: 15
runtime source-backed surfaces cataloged: 24
```

## Implementation order

```txt
1. Runtime Session Lifecycle Authority
2. Committed Frame Observation Authority
3. Source Provider Authority + External/Fallback Admission and Parity Fixture Gate
4. Interaction Command Authority + Objective Progress Fixture Gate
5. DSK Registry Truth + Mesh Contribution and Consumer Proof Fixture Gate
```

Do not begin with visual tuning, renderer replacement, CDN removal, WebGPU migration, new content, or shared-kit promotion. Preserve the external commit pin and current rendered output while making provider selection explicit and testable.