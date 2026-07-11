# Provider Admission Observation Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T04-39-58-04-00`

## Goal

Define how source loading outcomes become inspectable without exposing mutable provider objects.

## Current observation

```txt
browser import failure -> rejected startWebHost promise -> fatal DOM text
successful provider -> no provider identity in GameHost snapshot
fallback direct construction -> meadow snapshot contains only minimal fallback fields
```

`GameHost` exposes game, renderer and enhancer state, but does not identify the module source, commit, provider version, capability result, fallback status or raw-plan fingerprint.

## Required admission observation

```txt
requestId
sequence
providerId
providerVersion
sourceRepository
sourceCommit
sourceUrl
expectedExport
admissionStatus
fallbackPolicy
fallbackUsed
failureClass
capabilities
providerFingerprint
sourcePlanFingerprint
normalizedPlanFingerprint
```

## Required consumers

```txt
startup fatal/degraded projection
GameHost.getSnapshot()
browser editor inspect scene
browser capture metadata
Node headless-editor status
validation artifact manifest
committed-frame provenance
```

## Interaction rule

No consumer should receive the live module namespace, provider factory or mutable provider instance. All observations must be frozen or clone-safe result records.

## Stale-result rule

Provider admission must carry the runtime session and startup generation. A late import resolution from a failed or replaced startup must be rejected and must not install globals, mutate game state or reach the renderer.
