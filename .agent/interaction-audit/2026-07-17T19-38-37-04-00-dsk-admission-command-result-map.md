# Interaction Audit: DSK Admission Command/Result Map

**Timestamp:** `2026-07-17T19-38-37-04-00`

## Command flow

```txt
DskManifestAdmissionCommand
  -> DskManifestAdmissionResult

DependencyClosureCommand
  -> DependencyClosureResult

DskActivationCommand
  -> DskActivationResult

RuntimeCapabilityProjectionCommand
  -> RuntimeCapabilityManifest

ActivationFrameCommitCommand
  -> FirstActivationBoundFrameAck
```

## Admission rules

- Reject missing or duplicate capability identities.
- Reject unresolved required capabilities.
- Reject circular dependency graphs.
- Reject incompatible provider or implementation revisions.
- Keep `planned` descriptors visible as declarations but unavailable to runtime commands.
- Settle each activation attempt once under one runtime generation.
- Reject late results from retired generations.
- Publish only admitted capabilities through host and editor surfaces.

## Current missing results

```txt
DskManifestAdmissionResult: absent
DependencyClosureResult: absent
DskActivationResult: absent
RuntimeCapabilityManifest: absent
FirstActivationBoundFrameAck: absent
```

## Boundary

Proposed command/result contract only. Existing browser and editor commands were not changed.