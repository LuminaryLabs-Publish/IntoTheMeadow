# Next Steps

**Updated:** `2026-07-15T20-38-13-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `runtime-renderer-identity-manifest-proof-authority-audited`

## Summary

Make renderer selection data-driven before adding more wrappers or renderer variants. One descriptor should identify the base module, compatibility chain, shader policy, context policy, DSK services, executable revision and proof target.

## Plan ledger

**Goal:** create the smallest reliable path from declared renderer identity to one matching browser frame and deploy artifact.

### Canonical renderer descriptor

- [ ] Add `RendererIdentity`, `RendererRevision` and `RendererGeneration`.
- [ ] Define one immutable descriptor for the base module and compatibility wrapper chain.
- [ ] Record shader precision normalization and WebGL context proxy policy.
- [ ] Record required capabilities, disposal behavior and supported context types.
- [ ] Remove duplicate hand-maintained renderer module declarations.

### Manifest and DSK convergence

- [ ] Make `game.manifest.json` and `GAME_MANIFEST` derive from one source.
- [ ] Make `web-host.js` resolve the accepted renderer descriptor instead of importing a hidden alternative directly.
- [ ] Add an explicit `DOMAIN_LABELS` entry for `meadow-webgl-renderer-v2-kit`.
- [ ] Add explicit renderer services to `SERVICES`.
- [ ] Validate declared services against the selected implementation.

### Admission and lifecycle

- [ ] Publish `RendererIdentityAdmissionResult` before context creation.
- [ ] Reject missing modules, unexpected wrappers and stale revisions.
- [ ] Bind context generation and GPU resources to the accepted renderer generation.
- [ ] Publish exact retirement and disposal receipts for the selected module chain.
- [ ] Prevent base and wrapper modules from becoming parallel owners.

### Evidence

- [ ] Assert exact manifest-to-host module convergence in static smoke.
- [ ] Instantiate the accepted renderer in a controlled browser fixture.
- [ ] Compile representative shaders through the accepted wrapper.
- [ ] Compare base and wrapper behavior under supported precision profiles.
- [ ] Bind headless, source, built-output and Pages evidence to the same renderer identity.
- [ ] Publish `FirstRendererIdentityFrameAck`.

## Required result

```txt
RendererIdentityAdmissionResult {
  manifestRevision
  dskRegistryRevision
  rendererIdentity
  rendererRevision
  executableModule
  baseModule
  wrapperChain
  shaderPrecisionPolicy
  contextPolicy
  serviceContractRevision
  rendererGeneration
  status
  reason
}
```

## Preserved dependencies

Accessibility projection, audio projection, editor mutation settlement, post-process execution, startup readiness, reset/replay, DSK dependency admission, observation provenance, cache coherence, viewport authority, host retirement, external provider parity, WebGL recovery, frame scheduling, progression, grass visibility and persistence remain separate bounded work.
