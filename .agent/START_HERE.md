# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Last aligned:** `2026-07-13T00-10-19-04-00`  
**Status:** `provider-source-parity-authority-audited`

## Summary

IntoTheMeadow has one commit-pinned browser provider, one local fallback provider, 43 local DSK declarations, a WebGL renderer, browser/editor surfaces and Node headless tooling.

The current audit isolates provider-source parity. Browser boot must import the pinned ProtoKit and fails before the local fallback can run. Headless/editor and deterministic tests call `createIntoTheMeadowGame()` without external kits and therefore always use the local fallback. The two paths use different provider implementations and version strings, but no admission result, source fingerprint, contract digest or browser/headless parity fixture binds them.

## Plan ledger

**Goal:** make browser, headless, tests and Pages admit one explicit meadow-provider source contract and prove equivalent render-plan semantics before claiming deterministic parity.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Confirm every eligible repo head matches its central documentation head.
- [x] Select only `IntoTheMeadow`, the oldest eligible central entry.
- [x] Inspect manifest pinning, browser dynamic import, fallback construction, DSK status, snapshots, headless environment and deterministic tests.
- [x] Identify the complete interaction loop, domains, all 44 kits and their services.
- [x] Add the timestamped provider-source audit family.
- [x] Refresh required root `.agent` files and machine registry.
- [x] Push documentation only to `main`; create no branch or pull request.
- [ ] Implement typed provider admission and execute parity fixtures later.

## Read this first

```txt
.agent/trackers/2026-07-13T00-10-19-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T00-10-19-04-00.md
.agent/architecture-audit/2026-07-13T00-10-19-04-00-provider-source-parity-dsk-map.md
.agent/render-audit/2026-07-13T00-10-19-04-00-browser-headless-provider-visible-plan-gap.md
.agent/gameplay-audit/2026-07-13T00-10-19-04-00-browser-cdn-headless-fallback-loop.md
.agent/interaction-audit/2026-07-13T00-10-19-04-00-provider-load-admission-result-map.md
.agent/provider-source-audit/2026-07-13T00-10-19-04-00-commit-version-contract-parity.md
.agent/deploy-audit/2026-07-13T00-10-19-04-00-provider-source-parity-fixture-gate.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

The prior WebGL context-recovery audit remains valid and is retained as a renderer lifecycle dependency.

## Current source split

```txt
browser / Pages
  -> read commit-pinned CDN URL
  -> dynamic import
  -> require createMeadowAreaKit export
  -> create external provider version 0.1.0
  -> no fallback on import/export failure

headless editor / deterministic tests
  -> call createIntoTheMeadowGame() without external kits
  -> select createFallbackMeadowAreaKit
  -> create local-source-plan-v1
  -> no external provider execution
```

## Main gap

```txt
provider source ID: partial
provider commit pin: manifest-only
provider version admission: absent
service manifest validation: absent
fallback policy result: absent
browser/headless plan digest comparison: absent
provider lineage in game snapshot: absent
first visible provider-frame acknowledgement: absent
```

## Kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kits: 44
required-v0.1 declarations: 15
planned declarations: 28
implemented provider-parity authorities: 0
```

## Required parent domain

```txt
meadow-provider-source-parity-authority-domain
```

## Validation boundary

Documentation only. Runtime, provider loading, fallback behavior, renderer, package, dependency and deployment files are unchanged. No browser import-failure, external-provider, fallback or cross-source parity fixture was executed.
