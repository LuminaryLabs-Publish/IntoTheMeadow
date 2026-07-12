# Render Audit: Forced Mediump Stage Policy Gap

**Timestamp:** `2026-07-12T05-31-59-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Source path

```txt
createPrecisionSafeCanvas
  -> createPrecisionSafeContext
  -> createShader records stage
  -> shaderSource calls normalizeFloatPrecision
  -> every float precision declaration is removed
  -> precision mediump float is prepended
```

## Finding

The same transformation is applied to vertex and fragment shaders. The active context is never asked what lowp, mediump or highp means for either stage, and the renderer never publishes the final transformed source or the program that used it.

## Precision-sensitive calculations

```txt
vertex:
  world-position wind offset
  outline extrusion
  view-projection multiplication
  clip-space depth

fragment:
  normal normalization
  cel and rim lighting
  depth-derived fog
```

## Observable gap

```txt
renderer snapshot:
  plan/schema/topology/geometry/cache/validation
  no precision decision
  no source fingerprint
  no program generation
  no context generation

debug HUD:
  gpu cache state
  no shader provenance
```

## Risk boundary

A device-specific precision limitation or visible quantization could occur while current diagnostics still report a completed renderer frame. This pass does not claim that the defect is visible on the currently observed browser; it establishes that the runtime cannot prove or classify the outcome.

## Required observation

```txt
ShaderProgramObservation
  contextGeneration
  programGeneration
  vertexDecision
  fragmentDecision
  originalSourceFingerprints
  normalizedSourceFingerprints
  compileResults
  linkResult
  firstFrameId
```
