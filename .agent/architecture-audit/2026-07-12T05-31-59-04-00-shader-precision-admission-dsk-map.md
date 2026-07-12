# Architecture Audit: Shader Precision Admission DSK Map

**Timestamp:** `2026-07-12T05-31-59-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Current ownership

```txt
meadow-webgl-renderer-v2-compatible.js
  canvas/context proxies
  shader type tracking
  float precision rewrite

meadow-webgl-renderer-v2.js
  shader compilation
  program linking
  bindings and draw submission
  renderer snapshot

web-host-dsk
  renderer startup and frame loop

meadow-diagnostics-dsk
  render health and proof surfaces

WebGL Context Recovery Authority
  future context-generation lifecycle

Committed Frame Observation Authority
  future frame correlation
```

## Missing ownership

```txt
stage capability snapshot
precision requirement and fallback policy
normalization decision
source fingerprint
compile/link result
program generation
context/program/frame binding
precision journal
device matrix fixture
```

## Required parent domain

```txt
meadow-shader-precision-admission-authority-domain
```

## Candidate composition

```txt
shader-stage-identity-kit
graphics-context-capability-snapshot-kit
float-precision-capability-kit
shader-precision-policy-kit
shader-source-normalization-kit
shader-source-fingerprint-kit
shader-precision-decision-kit
shader-compile-result-kit
shader-program-link-result-kit
shader-program-generation-kit
shader-precision-observation-kit
shader-precision-journal-kit
first-frame-shader-provenance-kit
shader-precision-fixture-kit
browser-shader-device-matrix-smoke-kit
```

## Authority boundary

The domain decides precision and records provenance. The renderer still owns WebGL object creation and draw submission. The compatibility adapter becomes a thin consumer of an admitted `ShaderPrecisionDecision`, not an independent source-rewriting authority.

## Transaction

```txt
context generation
  -> capability snapshot
  -> stage/source admission
  -> precision decision
  -> normalized source and fingerprint
  -> compile result
  -> link result
  -> committed program generation
  -> first frame receipt
  -> observations and bounded journal
```

A source, compile, link or frame result from an older context or policy revision must not become current.
