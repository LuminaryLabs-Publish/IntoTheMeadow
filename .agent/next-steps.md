# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T09-06-38-04-00`

## Summary

Implement bridge lifecycle and bounded browser error retention immediately after runtime-session and public-capability foundations. Keep the browser bridge as an adapter over those authorities rather than a second lifecycle owner.

## Plan ledger

**Goal:** make editor bridge installation, replacement, capability invocation, error observation, query, stop and disposal deterministic and bounded.

- [ ] Define `EditorBridgeId` and monotonic `EditorBridgeGeneration`.
- [ ] Bind every bridge to `runtimeSessionId` and `hostGeneration`.
- [ ] Replace implicit install with `EditorBridgeInstallCommand/Result`.
- [ ] Admit predecessor generation before global replacement.
- [ ] Retire predecessor capability and listener leases before successor commit.
- [ ] Represent every registered capability as a revocable lease.
- [ ] Represent `error` and `unhandledrejection` handlers as listener leases.
- [ ] Define normalized `BrowserErrorEntry` with sequence, time, frame and generation evidence.
- [ ] Add count, byte and age retention limits.
- [ ] Coalesce repeated errors by stable fingerprint and time window.
- [ ] Add dropped-entry counters and reason classification.
- [ ] Replace full-array cloning with paged cursor queries.
- [ ] Add explicit acknowledgement/clear policy.
- [ ] Reject invokes, snapshots and captures from stale/disposed bridges.
- [ ] Correlate captures with bridge, runtime, frame and surface revisions.
- [ ] Decide and encode stop policy: keep diagnostics active, suspend, or dispose.
- [ ] Make disposal ordered, idempotent and typed.
- [ ] Remove the global only when its generation still matches.
- [ ] Expose bounded bridge observations through diagnostics and editor readback.
- [ ] Add browser restart, replacement, error-flood and listener-retirement fixtures.
- [ ] Repeat the lifecycle matrix against deployed GitHub Pages.

## Required commands

```txt
EditorBridgeInstallCommand {
  commandId
  runtimeSessionId
  hostGeneration
  predecessorBridgeGeneration
  capabilityManifestRevision
  errorRetentionPolicyRevision
}

BrowserErrorQueryCommand {
  bridgeId
  bridgeGeneration
  afterSequence
  limit
}

BrowserErrorAckCommand {
  bridgeId
  bridgeGeneration
  throughSequence
}

EditorBridgeDisposeCommand {
  bridgeId
  bridgeGeneration
  reason
}
```

## Required results

```txt
EditorBridgeInstallResult {
  status
  bridgeId
  bridgeGeneration
  predecessorRetirementResult
  capabilityLeaseCount
  listenerLeaseCount
}

BrowserErrorQueryResult {
  status
  entries
  nextSequence
  retainedCount
  retainedBytes
  droppedCounts
}

EditorBridgeDisposeResult {
  status
  revokedCapabilityCount
  removedListenerCount
  releasedEntryCount
  globalRemovalResult
}
```

## Acceptance matrix

```txt
first install
idempotent dispose
stop/start under selected policy
successor install retires predecessor
stale predecessor invoke rejection
stale predecessor capture rejection
error event normalization
unhandled rejection normalization
capability error normalization
10,000-event count and byte bound
age expiry
fingerprint coalescing
paged query and acknowledgement
listener count returns to baseline
current capture cites current frame/surface/bridge
local browser smoke
GitHub Pages smoke
```

## Ordered architecture queue

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
2a. Editor Bridge Lifecycle and Error Journal Authority
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Clock and Step Admission Authority
5. Source Provider Authority
6. Render Topology Identity Authority
6a. WebGL Context Recovery Authority
6b. Render Surface Resolution Authority
6c. Shader Precision Admission Authority
7. Committed Frame Observation Authority
7a. Fatal Runtime Failure Recovery Authority
7b. Adaptive Quality and Performance Budget Authority
7c. Grass Visibility and LOD Authority
7d. Audio Activation and Lifecycle Authority
8. Interaction Command and Objective Progression Authority
8a. Persistence Continuity Authority
9. DSK Runtime Consumption Authority
9a. Deterministic Replay Validation Authority
```

Do not add another independent global owner. Update the existing host, GameHost and bridge adapters to consume runtime-session, capability and frame authorities.
