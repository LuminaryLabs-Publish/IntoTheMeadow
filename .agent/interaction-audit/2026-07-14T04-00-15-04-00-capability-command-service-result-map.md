# Interaction Audit: Capability Command, Service and Result Map

## Current relation

```txt
DSK descriptor
  -> label and generic domain token
  -> structural snapshot
  -> no executable service handle
  -> no command capability check
  -> no per-service result
```

## Required command path

```txt
DskCompositionCommand
  -> CapabilityManifestCandidate
  -> DependencyGraphResult
  -> ServicePreparationResult[]
  -> DskCompositionResult

GameplayCommand
  -> CapabilityRequirementSet
  -> CapabilityAdmissionResult
  -> ServiceCommand
  -> ServiceResult
  -> GameStateRevision

RenderFrameCommand
  -> accepted DskCompositionRevision
  -> CapabilityFrameEnvelope
  -> FirstCapabilityRevisionFrameAck
```

## Result classifications

```txt
Accepted
Degraded
RejectedMissingRequirement
RejectedDuplicateProvider
RejectedDependencyCycle
RejectedVersionMismatch
RejectedPlannedOnly
RejectedDeferredProvider
PreparationFailed
ProbeFailed
RollbackFailed
Stale
```

## Interaction rule

Public hosts and editor tools should consume immutable capability readback. They should not infer executable readiness from descriptor counts, labels or a broad validation flag.

## Duplicate and stale policy

Every command needs a command ID and expected composition revision. Duplicate commands return the original result; stale commands do not mutate the current graph.