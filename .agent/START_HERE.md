# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Last aligned:** `2026-07-13T00-18-48-04-00`  
**Status:** `provider-source-parity-publication-central-reconciled`

## Summary

IntoTheMeadow has one commit-pinned browser provider, one local fallback provider, 43 local DSK declarations, deterministic meadow generation, a WebGL renderer, browser/editor surfaces and Node headless tooling.

The current technical audit isolates provider-source parity. Browser boot requires the pinned external provider and fails before fallback selection, while headless/editor and deterministic tests silently use the local fallback. This reconciliation publishes the complete timestamped audit family, aligns the machine registry and prepares matching central tracking.

## Plan ledger

**Goal:** keep provider source explicit and make root routing, timestamped evidence, machine state and central tracking describe one complete audit.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `IntoTheMeadow`.
- [x] Preserve the provider-source interaction loop, domain map and 44-kit service inventory.
- [x] Publish the missing tracker and audit family.
- [x] Align `.agent/kit-registry.json` to the provider-source audit.
- [x] Add a central-sync audit for the prior split publication state.
- [x] Push documentation directly to `main`; create no branch or pull request.
- [ ] Implement typed provider admission and execute parity fixtures later.

## Read this first

```txt
.agent/trackers/2026-07-13T00-18-48-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T00-18-48-04-00.md
.agent/architecture-audit/2026-07-13T00-18-48-04-00-provider-source-parity-dsk-map.md
.agent/render-audit/2026-07-13T00-18-48-04-00-browser-headless-provider-visible-plan-gap.md
.agent/gameplay-audit/2026-07-13T00-18-48-04-00-browser-cdn-headless-fallback-loop.md
.agent/interaction-audit/2026-07-13T00-18-48-04-00-provider-load-admission-result-map.md
.agent/provider-source-audit/2026-07-13T00-18-48-04-00-commit-version-contract-parity.md
.agent/central-sync-audit/2026-07-13T00-18-48-04-00-root-machine-central-publication-contract.md
.agent/deploy-audit/2026-07-13T00-18-48-04-00-provider-source-parity-fixture-gate.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

The prior WebGL context-recovery, frame-scheduler, exploration/progression, DSK runtime-consumption, editor-bridge and grass-visibility audits remain valid bounded dependencies.

## Complete interaction loop

```txt
browser / Pages
  -> read commit-pinned provider URL
  -> dynamic import
  -> require createMeadowAreaKit
  -> create external provider version 0.1.0
  -> generate, enhance and render meadow plan
  -> expose GameHost and editor readback

browser provider failure
  -> throw before game creation
  -> fallback remains unreachable
  -> project generic boot failure

headless editor / deterministic tests
  -> call createIntoTheMeadowGame without external kits
  -> select createFallbackMeadowAreaKit
  -> generate local-source-plan-v1
  -> capture or compare fallback output only
```

## Main gap

```txt
provider source ID: partial
provider commit pin: manifest-only
provider version admission: absent
service manifest validation: absent
explicit fallback policy/result: absent
browser/headless plan digest comparison: absent
provider lineage in game/renderer snapshots: absent
first visible provider-frame acknowledgement: absent
```

## Kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
required-v0.1 local declarations: 15
planned local declarations: 28
implemented provider-source parity authorities: 0
```

The exact kit names and offered services are in the current tracker and `.agent/kit-registry.json`.

## Required parent domain

```txt
meadow-provider-source-parity-authority-domain
```

## Validation boundary

Documentation only. Runtime, gameplay, provider loading, fallback behavior, renderer, package, dependency and deployment files are unchanged. No external-provider, browser-fallback, cross-source parity, build or Pages fixture was executed.