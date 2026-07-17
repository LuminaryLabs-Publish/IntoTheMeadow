# Deploy Audit: Browser, Artifact and Pages Capture Gate

**Timestamp:** `2026-07-17T03-44-31-04-00`

## Current proof boundary

- Node smoke proves a synthetic capture returns JSON and SVG artifacts.
- Chromium observation proves a screenshot file exists and a separate DOM process reports expected markers.
- No fixture invokes `window.NexusEditorEnvironment.invoke("renderer.capture")` in a real browser.
- No fixture validates nonblank pixels, exact dimensions, renderer-snapshot correlation or origin parity.

## Required gate

```txt
source origin
  -> invoke live browser capture
  -> verify capture/frame/session identities
  -> decode image and reject blank/stale output
  -> compare metadata and pixel digests

built artifact origin
  -> repeat the same fixture

GitHub Pages origin
  -> repeat the same fixture

all origins
  -> require matching module revision and compatible capture contract
  -> publish FirstCaptureBoundFrameAck
```

## Minimum assertions

```txt
one browser session per evidence packet
nonzero and expected pixel dimensions
accepted viewport and DPR revision
matching plan/topology and renderer frame
nonblank pixel distribution
immutable artifact digest
explicit live versus synthetic classification
no fatal browser errors
source/artifact/Pages contract parity
```

## Boundary

No workflow, build, artifact or Pages behavior changed. The gate is proposed only.
