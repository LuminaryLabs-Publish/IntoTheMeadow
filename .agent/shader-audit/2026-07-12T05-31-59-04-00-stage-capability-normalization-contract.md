# Shader Audit: Stage Capability and Normalization Contract

**Timestamp:** `2026-07-12T05-31-59-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Capability snapshot

For each context generation, record:

```txt
WebGL version
vertex lowp/mediump/highp rangeMin rangeMax precision
fragment lowp/mediump/highp rangeMin rangeMax precision
context attributes
precision-policy revision
```

## Decision input

```txt
shader stage
original source fingerprint
declared source precision
required numeric operations
preferred precision
allowed fallback order
device capability snapshot
```

## Decision output

```txt
status: Accepted | Degraded | Rejected
selectedPrecision
reason
capabilityEvidence
policyRevision
decisionFingerprint
```

## Normalization rules

```txt
retain exact original source for evidence
replace declarations only after Accepted or Degraded decision
inject one stage-specific declaration
produce deterministic normalized source
fingerprint normalized source
never silently retry another precision after compile failure
```

## Compile and link contracts

```txt
ShaderCompileResult:
  stage
  contextGeneration
  decisionFingerprint
  normalizedSourceFingerprint
  success
  infoLog

ProgramLinkResult:
  contextGeneration
  orderedShaderCompileResults
  success
  infoLog
  programGeneration when committed
```

Program and shader objects are retired through renderer/context lifecycle. A retired generation cannot appear in a current renderer snapshot or frame receipt.
