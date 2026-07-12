# Interaction Audit: Program Interface Render Admission Map

**Timestamp:** `2026-07-12T11-29-40-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

This map treats shader compilation, active-symbol reflection, mesh binding, uniform updates and draw submission as an ordered renderer interaction. Today those steps communicate through raw WebGL objects and nullable locations rather than typed results and generation fences.

## Plan ledger

**Goal:** require each renderer interaction to consume an accepted predecessor result and reject stale or incompatible work before mutation.

- [x] Map current program-to-draw calls.
- [x] Identify missing typed results.
- [x] Define generation and revision fences.
- [x] Define accepted and rejected paths.
- [ ] Implement command/result surfaces.

## Current map

```txt
create shader
  -> compile
  -> throw or return WebGLShader

link program
  -> throw or return WebGLProgram

query locations
  -> raw number or null
  -> no manifest comparison

bind mesh
  -> raw attribute locations
  -> location below zero throws
  -> buffers mutate immediately

update uniforms
  -> raw nullable locations
  -> no per-update result

draw
  -> raw drawArrays calls
  -> no draw admission receipt

snapshot
  -> counts and cache state
  -> no program/interface identity
```

## Required map

```txt
ShaderCompileCommand
  -> ShaderCompileResult

ProgramLinkCommand
  -> ProgramLinkResult

ProgramInterfaceReflectCommand
  -> ActiveProgramInterface

ProgramInterfaceAdmissionCommand
  -> ProgramInterfaceResult

MeshBindingCommand
  -> MeshBindingResult

UniformUpdateBatchCommand
  -> UniformUpdateBatchResult

DrawAdmissionCommand
  -> DrawAdmissionResult

FrameCommitCommand
  -> RenderFrameReceipt
```

Every command includes the expected context generation, program generation and interface fingerprint. A mismatch returns a typed rejection and performs zero mutation.

## Admission states

```txt
Candidate
Reflected
Accepted
Installed
Current
Retiring
Retired
Rejected
```

Only `Current` may accept mesh binding, uniform updates or draws.

## Failure handling

```txt
missing symbol
  -> reject candidate
  -> preserve predecessor program and buffers

schema mismatch
  -> reject binding/update batch
  -> do not draw

stale generation
  -> reject without WebGL mutation

context loss
  -> retire program/interface generation
  -> require complete re-reflection after restoration
```

## Observation requirements

```txt
command/result IDs
context and program generations
manifest revision
interface fingerprint
mesh and uniform schema fingerprints
rejection reason
first accepted draw frame
bounded journal entries
```

## Claim boundary

The current runtime does not expose these renderer commands or results. This document defines the missing interaction boundary only.