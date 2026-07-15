# Shader Precision Audit: Stage Requirement, Capability and Transform Contract

**Timestamp:** `2026-07-15T06-01-26-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The current wrapper treats compatibility as a text replacement. A reliable contract must decide precision from authored stage requirements and observed device capabilities, then record any accepted fallback before source transformation.

## Plan ledger

**Goal:** preserve exact source intent whenever supported and make every fallback explicit, bounded and testable.

- [x] Define per-stage requirement fields.
- [x] Define capability observation fields.
- [x] Define transform and fallback rules.
- [x] Define cache and diagnostics requirements.
- [ ] Implement after acceptance.

## Precision requirement descriptor

```txt
ShaderPrecisionRequirement {
  stage
  floatRequired
  floatPreferred
  floatMinimum
  intRequired
  effectRanges
  allowFallback
  fallbackOrder
  reason
  revision
}
```

## Capability snapshot

```txt
DeviceShaderPrecisionCapability {
  contextType
  rendererGeneration
  vertexLow
  vertexMedium
  vertexHigh
  fragmentLow
  fragmentMedium
  fragmentHigh
  observedAt
  revision
}
```

Each precision entry must retain range and precision values from the provider observation rather than reducing support to a Boolean.

## Transform rules

```txt
preserve original source when requirements are satisfied
never replace highp with mediump without an accepted fallback
classify vertex and fragment stages independently
include effective source hash in the program cache key
record transformed lines or a deterministic transform policy revision
reject malformed or ambiguous multiple declarations
publish warnings for non-identical accepted source
```

## Current contract violations

```txt
all declarations are removed by one regular expression
one mediump declaration is inserted for both stages
device capability is not observed
fallback permission is not authored
source identity does not change in public diagnostics
program cache and renderer snapshot omit effective source hashes
```

## Completion evidence

```txt
unit tests for declaration parsing and stage policy
mock capability matrix tests
real WebGL1 and WebGL2 compile fixtures
large-coordinate vertex fixture
wind-time stability fixture
visual differential thresholds
source/build/Pages policy parity
```

## Boundary

This contract does not prescribe a PBR engine or a new renderer. It extends the existing WebGL provider with truthful shader-policy admission.
