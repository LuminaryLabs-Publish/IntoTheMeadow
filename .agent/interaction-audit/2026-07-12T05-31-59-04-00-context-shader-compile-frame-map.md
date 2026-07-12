# Interaction Audit: Context to Shader to Frame Map

**Timestamp:** `2026-07-12T05-31-59-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Current sequence

```txt
browser requests WebGL2, then WebGL1 fallback
  -> compatibility proxy returns wrapped context
  -> base renderer creates vertex shader
  -> proxy remembers VERTEX_SHADER
  -> proxy rewrites source to mediump
  -> base renderer compiles
  -> repeat for fragment shader
  -> base renderer links program
  -> frame loop uses program
  -> editor capture reads canvas and separately samples renderer snapshot
```

## Missing results

```txt
ContextCapabilityResult
ShaderPrecisionDecision
ShaderNormalizationResult
ShaderCompileResult
ProgramLinkResult
ProgramCommitResult
FirstProgramFrameReceipt
```

## Required sequencing

```txt
contextGeneration N
  -> precisionPolicyRevision P
  -> shaderDecisionRevision D
  -> programGeneration G
  -> renderFrame F
```

Every later result must cite its predecessors. Context restoration, policy change or source change invalidates predecessor decisions and program generations.

## Invariants

```txt
no compile before precision admission
no program use before successful link commit
no capture success without frame/program provenance
no restored context reuses predecessor precision evidence
duplicate compile requests return one terminal result
stale results perform zero current-program mutation
```
