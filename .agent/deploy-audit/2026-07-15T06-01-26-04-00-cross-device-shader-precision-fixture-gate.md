# Deploy Audit: Cross-Device Shader Precision Fixture Gate

**Timestamp:** `2026-07-15T06-01-26-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

Current validation proves descriptor and mesh structure and can capture one Chromium screenshot, but it does not prove effective shader precision, fallback behavior or visual stability across WebGL versions and device precision capabilities.

## Plan ledger

**Goal:** block precision-parity claims until source, built output and Pages use the same admitted shader policy and pass device-class fixtures.

- [x] Identify current test and browser-observation coverage.
- [x] Define missing compile and visual fixtures.
- [x] Define deployment evidence requirements.
- [ ] Execute after implementation.

## Existing proof

```txt
renderer-v2-smoke:
  enhanced render-plan validation
  mesh buffer validation
  topology stability
  no WebGL context
  no shader compile

browser observation:
  one Chromium screenshot
  DOM fatal-text checks
  completed renderer marker
  no precision capability query
  no effective-source report
  no precision differential comparison
```

## Required fixture matrix

```txt
WebGL1 with high fragment precision
WebGL1 without high fragment precision
WebGL2
vertex highp accepted
fragment preferred highp accepted
fragment fallback to mediump accepted
mandatory highp rejection
large-coordinate camera and wind scene
long-running time/wind phase scene
source route
built output
GitHub Pages origin
```

## Required artifacts

```txt
capability-snapshot.json
precision-policy-result.json
original-effective-source-hashes.json
compile-link-results.json
renderer-snapshot.json
frame-capture.png
visual-diff.json
source-build-pages-parity.json
```

## Gate

No cross-device, build, Pages or production readiness claim is allowed until the effective shader policy is observable and the accepted output remains within authored visual thresholds.

## Boundary

No workflow or deployment configuration changed in this audit.
