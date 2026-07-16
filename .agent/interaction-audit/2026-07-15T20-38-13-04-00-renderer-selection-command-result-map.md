# Interaction Audit: Renderer Selection Command and Result Map

**Timestamp:** `2026-07-15T20:38:13-04:00`  
**Status:** `runtime-renderer-identity-manifest-proof-authority-audited`

## Plan ledger

**Goal:** define the command/result boundary through which manifests, DSK descriptors and browser hosts select one renderer generation.

- [x] Map current implicit selection.
- [x] Map missing identities and revisions.
- [x] Define admission, frame and retirement results.
- [ ] Implement command settlement later.

## Current implicit interaction

```txt
web host module import
  -> bypass manifest localRenderer.module
  -> construct compatible renderer
  -> compatible renderer constructs base renderer
  -> no typed selection result
  -> no rejected or fallback state
  -> no identity-bound frame acknowledgement
```

## Required command

```txt
RendererIdentityAdmissionCommand {
  commandId
  expectedManifestRevision
  expectedDskRegistryRevision
  expectedHostRevision
  requestedRendererId
  requestedRendererRevision
  requestedModule
  requestedWrapperChain
  expectedShaderPolicyRevision
  expectedContextPolicyRevision
}
```

## Required result

```txt
RendererIdentityAdmissionResult {
  commandId
  manifestRevision
  dskRegistryRevision
  hostRevision
  rendererIdentity
  rendererRevision
  executableModule
  wrapperChain
  shaderPolicyRevision
  contextPolicyRevision
  serviceContractRevision
  rendererGeneration
  status
  reason
}
```

Accepted statuses:

```txt
accepted
already-active
```

Rejected statuses:

```txt
manifest-mismatch
dsk-service-mismatch
module-missing
wrapper-missing
unsupported-context
unsupported-shader-policy
stale-revision
duplicate-command
retired-host
construction-failed
```

## Frame acknowledgement

```txt
FirstRendererIdentityFrameAck {
  rendererGeneration
  contextGeneration
  renderPlanRevision
  visibleFrameRevision
  executableModule
  wrapperChain
  shaderPolicyRevision
  status
}
```

## Retirement

`RendererIdentityRetirementCommand` must stop new work, dispose the accepted module chain once, publish resource receipts and reject callbacks tied to an older renderer generation.

## Boundary

This audit defines the interface only. The current browser host still selects its renderer through a direct import.
