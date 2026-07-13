# WebGL Context Resource Recovery DSK Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T21-40-09-04-00`

## Summary

The renderer currently treats context, program, bindings and buffers as one implicit lifetime. This map defines a parent domain that owns context phase and resource generations while leaving frame scheduling, render-plan generation, grass visibility and gameplay state in their existing bounded domains.

## Plan ledger

**Goal:** define clean DSK boundaries for context-event admission, draw suspension, detached GPU rebuild, atomic installation, rollback and visible recovery proof.

- [x] Keep browser callback ownership in the frame-scheduler domain.
- [x] Keep CPU mesh generation in the render-plan/mesh domains.
- [x] Keep context and GPU-resource lifetimes in one recovery authority.
- [x] Require typed context events and results.
- [x] Require candidate resource manifests and rollback.
- [x] Require generation fencing and exact-once retirement.
- [x] Require first-visible-frame proof.
- [ ] Implement the proposed kits later.

## Parent domain

```txt
meadow-webgl-context-resource-recovery-authority-domain
```

## Ownership boundary

```txt
owns:
  renderer/canvas/context identity
  context phase and generation
  context-loss/restoration event admission
  draw suspension state
  context-bound program, binding and buffer generations
  restoration candidate construction and validation
  atomic resource installation and rollback
  stale context/resource rejection
  recovery observations, journal and first-restored-frame receipt

does not own:
  RAF callback sequencing or fixed-step simulation
  render-plan or CPU mesh semantics
  grass placement/visibility policy
  gameplay progression
  browser editor lifecycle
  persistence or deployment
```

## Proposed kit composition

### Identity and phase

```txt
renderer-id-kit
canvas-surface-id-kit
webgl-context-id-kit
webgl-context-generation-kit
webgl-context-phase-kit
webgl-resource-generation-kit
```

### Event admission and suspension

```txt
webgl-context-event-envelope-kit
webgl-context-loss-admission-kit
webgl-context-loss-result-kit
webgl-draw-suspension-kit
stale-webgl-event-rejection-kit
```

### Resource ownership

```txt
webgl-resource-manifest-kit
webgl-program-lease-kit
webgl-binding-manifest-kit
webgl-buffer-lease-kit
webgl-predecessor-retirement-kit
stale-webgl-resource-rejection-kit
```

### Restoration transaction

```txt
webgl-restoration-command-kit
webgl-restoration-admission-kit
webgl-program-rebuild-kit
webgl-buffer-rebuild-kit
webgl-baseline-state-rebuild-kit
webgl-resource-candidate-validation-kit
webgl-resource-install-commit-kit
webgl-resource-rollback-kit
webgl-context-recovery-result-kit
```

### Observation and proof

```txt
webgl-context-observation-kit
webgl-context-journal-kit
first-restored-frame-ack-kit
webgl-loss-before-first-frame-fixture-kit
webgl-loss-between-passes-fixture-kit
webgl-loss-during-rebuild-fixture-kit
webgl-repeated-loss-fixture-kit
webgl-unrecoverable-context-fixture-kit
browser-webgl-recovery-smoke-kit
pages-webgl-recovery-smoke-kit
```

## State model

```txt
UNINITIALIZED
  -> READY(contextGeneration=1, resourceGeneration=1)

READY
  -> LOST(event admitted, draw admission closed)

LOST
  -> RESTORING(candidate generation allocated)
  -> TERMINAL(unrecoverable or policy rejected)

RESTORING
  -> READY(successor resource manifest atomically installed)
  -> LOST(candidate failed and rolled back to suspended state)
  -> TERMINAL(rollback or policy failure)
```

## Required manifest

```txt
WebGLResourceManifest {
  rendererId
  contextId
  contextGeneration
  resourceGeneration
  programLease
  shaderFingerprints
  attributeBindings[5]
  uniformBindings[10]
  bufferLeases[5]
  topologyKey
  viewportRevision
  baselineStateFingerprint
}
```

## Admission invariants

```txt
one active context generation per renderer
one installed resource generation per active context generation
no draw while phase != READY
no successful renderer snapshot without READY and matching generations
restoration candidate never mutates installed resources before validation
failed candidate retires every partial handle exactly once
late context events, RAF callbacks and resource handles produce zero mutation
scheduler resume occurs only through the existing scheduler generation owner
first restored-frame acknowledgement cites context/resource/render revisions
```

## Required coordination

```txt
frame scheduler
  receives draw-suspended/resume results
  remains sole RAF owner

render-plan/mesh builder
  supplies detached CPU mesh and topology identity
  remains context independent

renderer host
  exposes typed context phase and recovery result
  does not report visible success while lost

editor/diagnostics
  observes bounded context journal
  receives no raw mutable GPU handles
```

## Completion boundary

The domain is not complete when a browser fires `webglcontextrestored`. Completion requires a validated successor manifest, atomic installation, stale-generation fencing and a visible frame receipt from that exact successor.
