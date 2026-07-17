# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Last aligned:** `2026-07-17T03-44-31-04-00`  
**Status:** `webgl-capture-readback-frame-correlation-authority-audited`

## Summary

IntoTheMeadow exposes live WebGL, synthetic SVG and Chromium screenshot evidence, but no accepted capture generation binds pixels, renderer metadata, frame identity, viewport/DPR, browser session and artifacts. The Chromium screenshot and DOM checks also run in separate browser processes.

## Intent

Make one capture transaction authoritative from request admission through exact-frame rendering, readback, encoding, provenance and artifact commit.

## Checklist

- [x] Compare the complete Publish inventory.
- [x] Exclude TheCavalryOfRome.
- [x] Select only IntoTheMeadow by the oldest synchronized timestamp.
- [x] Preserve all 44 kit surfaces and service declarations.
- [x] Add the `2026-07-17T03-44-31-04-00` capture-correlation audit family.
- [x] Change documentation only on `main`.
- [x] Create no branch or pull request.
- [ ] Implement readback settlement and executable browser fixtures later.

## Read this pass first

```txt
.agent/trackers/2026-07-17T03-44-31-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-17T03-44-31-04-00.md
.agent/architecture-audit/2026-07-17T03-44-31-04-00-webgl-capture-correlation-dsk-map.md
.agent/render-audit/2026-07-17T03-44-31-04-00-drawable-buffer-capture-gap.md
.agent/gameplay-audit/2026-07-17T03-44-31-04-00-editor-capture-observation-loop.md
.agent/interaction-audit/2026-07-17T03-44-31-04-00-capture-command-result-map.md
.agent/capture-audit/2026-07-17T03-44-31-04-00-readback-frame-provenance-contract.md
.agent/deploy-audit/2026-07-17T03-44-31-04-00-browser-artifact-pages-capture-gate.md
.agent/central-sync-audit/2026-07-17T03-44-31-04-00-oldest-selection-capture-reconciliation.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Interaction loop

```txt
RAF render -> live canvas
editor capture -> arbitrary toDataURL + latest snapshot
Node capture -> independent synthetic SVG
browser observation -> screenshot session A + DOM session B
missing -> one correlated capture result and frame acknowledgement
```

## Domain and kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
active-v0.1 local descriptors: 15
planned local descriptors: 28
planned capture-correlation surfaces: 19
```

## Required parent domain

`meadow-webgl-capture-readback-frame-correlation-authority-domain`

## Next safe ledge

Admit one `CaptureId`, render or select one exact frame, settle capture-safe pixel ownership, encode with viewport and color metadata, bind the renderer snapshot and artifact digest, and publish `FirstCaptureBoundFrameAck` only for matching evidence.

## Claim boundary

No blank or stale capture was reproduced. No runtime capture settlement, WebGL readback correctness, browser fixture, artifact parity or Pages parity was implemented or proven.
