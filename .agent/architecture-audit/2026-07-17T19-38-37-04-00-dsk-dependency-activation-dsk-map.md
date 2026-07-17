# Architecture Audit: DSK Dependency Closure and Activation

**Timestamp:** `2026-07-17T19-38-37-04-00`

## Current map

```txt
LOCAL_DSK_IDS (43)
  -> createDskDescriptor(id)
     -> status from REQUIRED_V01_DSK_IDS
     -> five declared services
     -> provides: game:<derived-domain>
     -> requires: []
     -> shape-only validate()

EXTERNAL_DSK_IDS (1)
  -> meadow-area-kit
  -> loaded | deferred

installDsks()
  -> validateLocalDsks(LOCAL_DSKS)
  -> return all local descriptors
  -> return external availability records
  -> snapshot into initial game state
```

## Gap

The current architecture models declarations, not executable composition. It has no dependency edges, compatibility constraints, implementation bindings, activation ordering, per-capability settlement, failed-dependency propagation or admitted runtime capability manifest. Planned descriptors remain visible beside active descriptors in the installation snapshot.

## Required DSK/domain breakdown

```txt
meadow-dsk-dependency-closure-activation-truth-authority-domain
├─ manifest
│  ├─ dsk-manifest-schema-kit
│  ├─ dsk-status-policy-kit
│  └─ version-compatibility-kit
├─ capabilities
│  ├─ dsk-capability-provides-kit
│  ├─ dsk-dependency-requires-kit
│  └─ implementation-binding-kit
├─ graph
│  ├─ dependency-graph-builder-kit
│  ├─ dependency-cycle-detection-kit
│  └─ topological-install-order-kit
├─ admission
│  ├─ external-provider-availability-kit
│  ├─ activation-admission-kit
│  └─ planned-capability-exclusion-kit
├─ settlement
│  ├─ activation-result-kit
│  ├─ failed-dependency-propagation-kit
│  └─ stale-activation-generation-rejection-kit
└─ projection and proof
   ├─ runtime-capability-manifest-kit
   ├─ activation-snapshot-truth-kit
   ├─ dsk-activation-fixture-kit
   └─ first-activation-bound-frame-ack-kit
```

## Required results

```txt
DskManifestAdmissionResult
DependencyClosureResult
DskActivationResult
RuntimeCapabilityManifest
FirstActivationBoundFrameAck
```

## Boundary

Proposed architecture only. No DSK implementation, runtime installation behavior or public capability surface changed.