# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Last aligned:** `2026-07-13T02-28-51-04-00`  
**Status:** `headless-workspace-path-containment-authority-audited`

## Summary

IntoTheMeadow is a DSK-composed browser meadow with deterministic provider data, a WebGL renderer, browser editor readback and a permissive Node headless environment.

The current audit isolates workspace containment. The Node adapter admits paths with `target.startsWith(root)`, which is a lexical string-prefix test rather than path-segment or canonical filesystem containment. Workspace list/read/write and capture artifact paths therefore lack sibling-prefix, symlink, canonical-parent, atomic-write and typed-result authority.

## Plan ledger

**Goal:** keep every agent filesystem operation and capture artifact inside one canonical, revisioned workspace boundary.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have aligned central-ledger and root `.agent` state.
- [x] Select only `IntoTheMeadow`, the oldest eligible central entry.
- [x] Identify the complete browser, game, render, headless and workspace loops.
- [x] Preserve all 44 kit surfaces and offered services.
- [x] Audit workspace list/read/write and capture artifact path construction.
- [x] Define canonical-root, symlink, capability and atomic-write contracts.
- [x] Publish the timestamped audit family and machine routing.
- [x] Push documentation directly to `main`; create no branch or pull request.
- [ ] Implement and execute adversarial containment fixtures later.

## Read this first

```txt
.agent/trackers/2026-07-13T02-28-51-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T02-28-51-04-00.md
.agent/architecture-audit/2026-07-13T02-28-51-04-00-headless-workspace-path-containment-dsk-map.md
.agent/render-audit/2026-07-13T02-28-51-04-00-workspace-artifact-visible-evidence-gap.md
.agent/interaction-audit/2026-07-13T02-28-51-04-00-workspace-command-path-admission-map.md
.agent/editor-workspace-audit/2026-07-13T02-28-51-04-00-canonical-root-symlink-atomic-write-contract.md
.agent/deploy-audit/2026-07-13T02-28-51-04-00-workspace-containment-fixture-gate.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

The provider-source parity, WebGL context recovery, frame scheduling, exploration/progression, DSK runtime-consumption and grass-visibility audits remain active bounded dependencies.

## Complete interaction loop

```txt
browser
  -> load external meadow provider
  -> create game and render plan
  -> enhance, mesh and render WebGL frame
  -> expose GameHost and browser editor observation

Node editor
  -> createEnvironment
  -> resolve repository and artifact roots
  -> expose runtime, scene, renderer, camera, browser and workspace capabilities
  -> terminal, scenario or loop invokes a capability

workspace operation
  -> caller supplies path
  -> safePath resolves candidate
  -> startsWith(root) decides admission
  -> list, read or write host filesystem

capture operation
  -> caller supplies label
  -> label enters JSON/SVG filename
  -> safePath admits artifact target
  -> files are written and reported
```

## Main gap

```txt
canonical root identity: absent
path-segment containment: absent
existing-target realpath check: absent
new-target canonical-parent check: absent
symlink policy: absent
capture-label normalization: absent
atomic write and paired artifact commit: absent
typed workspace operation result: absent
adversarial containment fixtures: absent
```

## Kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
required-v0.1 local declarations: 15
planned local declarations: 28
implemented workspace-containment authorities: 0
```

The exact kit names and services are in the current tracker and `.agent/kit-registry.json`.

## Required parent domain

```txt
meadow-headless-workspace-path-containment-authority-domain
```

## Validation boundary

Documentation only. Runtime, game, provider, renderer, headless workspace, package, dependency and deployment behavior are unchanged. No adversarial filesystem operation, browser smoke, build or Pages fixture was executed.