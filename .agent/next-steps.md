# Next Steps

**Updated:** `2026-07-13T22-40-52-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `browser-observation-evidence-authority-audited`

## Summary

Replace the two-process screenshot/DOM workflow with one controlled browser page and one terminal observation result. Keep Chromium, HTTP serving and filesystem operations as adapters.

## Plan ledger

**Goal:** create the smallest reliable path from repository revision to one coherent browser artifact manifest.

### Source and attempt identity

- [ ] Add `ObservationAttemptId` and `ObservationPolicyRevision`.
- [ ] Record repository commit and working-tree or build fingerprint.
- [ ] Record the external provider URL and immutable commit.
- [ ] Fingerprint the browser executable, version and launch arguments.

### Server ownership

- [ ] Reserve an available loopback port instead of assuming 4173.
- [ ] Require a successful bind receipt from the spawned server.
- [ ] Verify the expected document and module graph are served.
- [ ] Reject responses from a predecessor or unrelated server.
- [ ] Await server exit and record a retirement receipt.

### One browser page

- [ ] Launch one controllable browser session and page.
- [ ] Wait for `NexusEditorEnvironment` protocol admission.
- [ ] Require zero browser errors and unhandled rejections.
- [ ] Wait for an admitted renderer frame rather than a text marker.
- [ ] Record game, plan, mesh, GPU and frame revisions when available.

### Correlated capture

- [ ] Invoke `renderer.capture` through the editor bridge.
- [ ] Capture DOM, editor snapshot, canvas image and screenshot from the same page.
- [ ] Bind every artifact to one page generation and renderer frame.
- [ ] Record media type, dimensions, bytes and cryptographic hash.
- [ ] Add blank-frame, entropy and expected-region checks.

### Artifact settlement

- [ ] Write to an isolated per-attempt temporary directory.
- [ ] Quarantine failed and partial attempts.
- [ ] Atomically promote a complete immutable manifest.
- [ ] Keep a latest-completed pointer separate from failed attempts.
- [ ] Never let stale fixed-name files satisfy a successor run.

### Results and proof

- [ ] Add `BrowserObservationCommand` and `BrowserObservationResult`.
- [ ] Return Completed, Degraded, Unavailable, Rejected, TimedOut, Failed, Partial or RetirementFailed.
- [ ] Add occupied-port and unrelated-server fixtures.
- [ ] Add provider, WebGL, browser-error, timeout and blank-frame fixtures.
- [ ] Add stale-artifact and retirement-timeout fixtures.
- [ ] Run source, built-output and GitHub Pages parity observations.
- [ ] Add the executable browser gate to an explicit proof script or workflow.

## Required result

```txt
BrowserObservationResult {
  commandId
  attemptId
  status
  reason
  repositoryRevision
  providerFingerprint
  browserFingerprint
  serverGeneration
  browserSessionGeneration
  pageGeneration
  rendererFrameId
  artifactManifestId
  artifactHashes
  serverReceipt
  browserReceipt
  frameReceipt
  retirementReceipt
  warnings
  errors
}
```

## Dependency order

```txt
repository and provider identity
  -> observation attempt
  -> port reservation and server ownership
  -> browser and page admission
  -> renderer-frame readiness
  -> same-page artifact capture
  -> hashing and semantic validation
  -> atomic manifest promotion
  -> terminal retirement
  -> source/build/Pages parity
```

## Preserved dependencies

Render cache coherence, viewport authority, editor capability admission, host retirement, workspace containment, provider parity, WebGL recovery, frame scheduling, DSK consumption, playable progression, grass visibility, audio lifecycle, save/migration and replay remain separate bounded work.