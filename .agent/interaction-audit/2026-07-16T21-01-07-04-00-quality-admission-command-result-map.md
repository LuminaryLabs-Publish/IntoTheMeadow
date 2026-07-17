# Interaction Audit: Quality Admission Command/Result Map

**Generated:** `2026-07-16T21-01-07-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

Quality selection currently occurs through constructor options and static defaults rather than accepted commands and observable results.

## Command map

```txt
PerformanceObservationCommand
  inputs:
    documentGeneration
    runtimeGeneration
    rendererGeneration
    frameId
    cpuFrameMs
    renderMs
    droppedFrameCount
    viewportPixels
    devicePixelRatio
  result:
    PerformanceObservationResult

QualityAdmissionCommand
  inputs:
    currentQualityGeneration
    observationWindow
    requestedMode
    minimumProfile
    maximumProfile
    expectedRendererGeneration
  result:
    QualityAdmissionResult

QualityProjectionCommand
  inputs:
    acceptedQualityGeneration
    budgetDigest
    expectedEnhancerGeneration
    expectedRendererGeneration
  result:
    QualityProjectionResult
    FirstQualityBoundFrameAck
```

## Rejection cases

- Stale renderer or runtime generation.
- Insufficient observation window.
- Unknown profile.
- Transition inside cooldown.
- Threshold change inside hysteresis band.
- Budget resolution failure.
- Enhancer or GPU replacement failure.
- Acknowledgement from a mismatched quality generation.

## Public interaction boundary

A future quality control may request `auto`, `low`, `medium`, `high` or `ultra`, but UI intent must not directly mutate grass, terrain or DPR. The request becomes effective only after `QualityAdmissionResult` and `FirstQualityBoundFrameAck` agree.

## Boundary

No UI or command implementation changed.
