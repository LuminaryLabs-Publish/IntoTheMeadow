# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T05-31-59-04-00`

## Selection state

```txt
10 accessible Publish repositories observed
TheCavalryOfRome excluded
9 eligible repositories centrally tracked with root .agent state
IntoTheMeadow selected as the oldest eligible repository
only IntoTheMeadow changed in the Publish organization
```

## Current shader precision gaps

### One unconditional policy

```txt
vertex shader rewrite: mediump float
fragment shader rewrite: mediump float
stage-specific requirement: absent
preferred precision: absent
fallback order: absent
rejection policy: absent
```

### Device capability is unknown

```txt
getShaderPrecisionFormat calls: 0
WebGL version in precision result: absent
GPU/renderer identity: absent
context generation: absent
precision range and bit counts: absent
```

### Source and program identity are absent

```txt
original source fingerprint: absent
normalized source fingerprint: absent
compile result object: absent
link result object: absent
program generation: absent
program-to-frame receipt: absent
```

### Diagnostics can overstate success

A linked program and a non-fatal screenshot prove that one browser produced pixels. They do not prove that the chosen precision was required, optimal, equivalent across WebGL1/WebGL2 or stable after context restoration.

## Required shader fixtures

```txt
fixture:shader-precision-stage-policy
fixture:shader-precision-capability-matrix
fixture:shader-source-normalization
fixture:shader-source-fingerprint
fixture:shader-compile-link-result
fixture:shader-unsupported-required-precision
fixture:shader-context-restoration-readmission
fixture:shader-program-frame-provenance
smoke:browser-webgl1-shader-precision
smoke:browser-webgl2-shader-precision
smoke:pages-shader-precision
```

## Retained gaps

```txt
runtime lifecycle and raw host authority remain incomplete
RAF absolute time and fixed dt disagree
WebGL context recovery is non-transactional
DPR/pixel budget and surface revision are absent
committed state/plan/frame identity is absent
fatal startup/frame recovery is non-transactional
adaptive quality authority is absent
grass camera-distance/frustum admission is absent
movement, inspection and objective progression remain unreachable
save migration and atomic hydration are absent
DSK declaration is not runtime consumption proof
independent deterministic replay proof is absent
```

## Completion boundary

Do not treat successful shader compilation as precision admission. Completion requires stage capability evidence, an explicit decision, source/program provenance and a visible frame bound to the admitted program generation.
