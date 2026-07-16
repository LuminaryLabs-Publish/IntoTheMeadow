# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Last aligned:** `2026-07-16T01-38-56-04-00`  
**Status:** `static-module-graph-release-revision-cache-coherence-authority-audited`

## Summary

IntoTheMeadow's public ES-module graph uses `0.3.0-headless-editor` query tags on the entry and selected host modules, `0.2.1-shader-precision` on the compatible renderer's base import, and unversioned relative URLs for the remaining local graph.

The manifest reports build `0.3.0-headless-editor-runtime`, but no immutable release graph, per-module digest set, cache policy, mixed-generation rejection or first release-bound frame acknowledgement proves that one browser frame came from one coherent deployment.

## Plan ledger

**Goal:** make one immutable release identity authoritative from `index.html` through all local modules, compatibility wrappers, external providers, artifacts and deployed Pages.

- [x] Compare the full 11-repository Publish organization.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm ten eligible ledgers and root `.agent` states.
- [x] Select only IntoTheMeadow by oldest synchronized timestamp.
- [x] Preserve all 44 kit surfaces and offered services.
- [x] Add the `2026-07-16T01-38-56-04-00` release/cache audit family.
- [x] Change documentation only and target `main`.
- [x] Create no branch or pull request.
- [ ] Implement release-graph admission and browser/deploy fixtures later.

## Read this pass first

```txt
.agent/trackers/2026-07-16T01-38-56-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-16T01-38-56-04-00.md
.agent/architecture-audit/2026-07-16T01-38-56-04-00-static-module-release-cache-dsk-map.md
.agent/render-audit/2026-07-16T01-38-56-04-00-mixed-release-visible-frame-gap.md
.agent/gameplay-audit/2026-07-16T01-38-56-04-00-release-graph-gameplay-readiness-loop.md
.agent/interaction-audit/2026-07-16T01-38-56-04-00-release-graph-command-result-map.md
.agent/release-cache-audit/2026-07-16T01-38-56-04-00-module-graph-version-cache-contract.md
.agent/deploy-audit/2026-07-16T01-38-56-04-00-release-cache-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-16T01-38-56-04-00-oldest-selection-release-cache-reconciliation.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Complete interaction loop

```txt
index.html
  -> boot-game.js?v=0.3.0-headless-editor
  -> web-host.js?v=0.3.0-headless-editor
  -> mixed versioned and unversioned transitive imports
  -> compatible renderer?v=0.3.0-headless-editor
  -> base renderer?v=0.2.1-shader-precision
  -> immutable external meadow provider
  -> game, DSK, renderer and editor initialization
  -> recursive RAF
  -> visible WebGL frame
```

## Domain and kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
active-v0.1 local descriptors: 15
planned local descriptors: 28
planned release/cache authority surfaces: 19
```

The complete kit-by-kit service map is in the latest tracker and `.agent/kit-registry.json`.

## Required parent domain

`meadow-static-module-graph-release-cache-coherence-authority-domain`

## Next safe ledge

Generate one immutable release graph listing resolved module URLs, content digests, compatibility relationships, external provider revisions, artifact digest and cache policy. Require source, artifact and Pages execution to publish a matching `ReleaseGraphAdmissionResult` and `FirstReleaseBoundFrameAck`.

## Claim boundary

No stale-cache incident, mixed-version runtime failure, cache-policy correctness, artifact parity, Pages parity or production readiness is claimed.
