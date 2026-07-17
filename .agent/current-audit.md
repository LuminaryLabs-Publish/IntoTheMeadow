# Current Audit: DSK Dependency Closure and Activation Truth

**Updated:** `2026-07-17T19-38-37-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `dsk-dependency-closure-activation-truth-authority-audited`  
**Immediate predecessor:** `save-capability-admission-durable-commit-migration-authority-central-reconciled`

## Summary

IntoTheMeadow declares 43 local DSK/kit descriptors and one external provider. Fifteen local descriptors are marked active and 28 planned, but every local `requires` list is empty and `installDsks()` returns all local descriptors in one installation snapshot. No dependency closure, executable implementation binding, activation order, activation result or runtime capability manifest exists.

## Intent

Separate declaration truth from executable runtime truth and prove which dependency-complete capability generation produced the active host/editor surface and visible frame.

## Checklist

- [x] Compare Publish inventory and central tracking.
- [x] Select only IntoTheMeadow by the oldest synchronized timestamp.
- [x] Inspect DSK registry, descriptor construction, validation and installation snapshot behavior.
- [x] Preserve all 44 declared kit surfaces and offered services.
- [x] Add the timestamped DSK activation audit family.
- [x] Change documentation only on `main`.
- [ ] Implement and prove dependency closure and activation later.

## Main finding

```txt
local descriptors: 43
active-v0.1: 15
planned: 28
external descriptors: 1
non-empty local requires arrays: 0
dependency graph: absent
cycle detection: absent
topological order: absent
implementation binding: absent
planned-capability exclusion: absent
DskActivationResult: absent
RuntimeCapabilityManifest: absent
FirstActivationBoundFrameAck: absent
```

## Source basis

- `src/content/dsk-registry.js` separates all local IDs from the 15 required-v0.1 IDs.
- `src/dsks/index.js` assigns status from that list, generic `provides`, empty `requires`, and shape-only validation.
- `src/boot/install-dsks.js` returns all local descriptors and only loaded/deferred external status.
- Initial game state stores the resulting snapshot.
- `GameHost` and `NexusEditorEnvironment` do not expose an admitted executable capability manifest.

## Required parent domain

`meadow-dsk-dependency-closure-activation-truth-authority-domain`

## Required transaction

```txt
DskManifestAdmissionCommand -> DskManifestAdmissionResult
DependencyClosureCommand -> DependencyClosureResult
DskActivationCommand -> DskActivationResult
RuntimeCapabilityProjectionCommand -> RuntimeCapabilityManifest
ActivationFrameCommitCommand -> FirstActivationBoundFrameAck
```

## Boundary

Documentation only. No runtime, DSK, provider, rendering, gameplay, test, workflow or deployment behavior changed.