# Interaction Audit: Shader Program Admission Result Map

**Timestamp:** `2026-07-15T06-01-26-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

Shader creation currently behaves as an implicit side effect of renderer construction. Source rewriting, compilation and linking have no externally visible command identity or typed result, so diagnostics cannot distinguish authored precision from compatibility substitution.

## Plan ledger

**Goal:** turn program creation into one inspectable provider transaction without exposing raw WebGL mutation to game logic.

- [x] Map the current source-to-program path.
- [x] Define command, result and rejection surfaces.
- [x] Define diagnostics and frame acknowledgement.
- [ ] Implement later.

## Command map

```txt
ShaderProgramAdmissionCommand
  inputs:
    rendererGeneration
    programId
    vertexSourceRevision
    fragmentSourceRevision
    precisionRequirementRevision
    expectedCapabilityRevision

  prepare:
    query stage precision support
    resolve required and preferred policies
    create effective sources
    fingerprint original and effective sources
    compile detached shaders
    link detached program

  reject:
    unsupported required precision
    stale capability snapshot
    unapproved source transform
    compile failure
    link failure
    cache-key collision

  commit:
    adopt one linked program revision
    retire predecessor under renderer policy

  publish:
    ShaderTransformResult
    ShaderCompileResult
    ShaderProgramAdmissionResult
    PrecisionWarningReceipt
    FirstPrecisionAdmittedFrameAck
```

## Current result gap

```txt
source transform result: absent
precision selection result: absent
compile attempt identity: absent
program adoption revision: absent
downgrade warning: absent
renderer frame binding: absent
```

## Consumer map

```txt
renderer provider
  -> consumes accepted program

meadow-diagnostics-dsk
  -> exposes effective policy and warnings

editor environment
  -> inspects policy without mutating it

capture and compare
  -> cite program and frame revisions

deploy proof
  -> compare source, build and Pages policies
```

## Boundary

No user input or gameplay command is added. This is a provider interaction and evidence contract.
