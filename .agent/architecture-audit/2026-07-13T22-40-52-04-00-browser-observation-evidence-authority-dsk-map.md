# Architecture Audit: Browser Observation Evidence Authority DSK Map

**Timestamp:** `2026-07-13T22-40-52-04-00`  
**Status:** `browser-observation-evidence-authority-audited`

## Summary

The browser observation path is a host/tool workflow around the existing game and renderer domains. Its missing authority is not another renderer. It is a coordinator that binds repository identity, server ownership, one browser page, one renderer frame, correlated artifacts and terminal cleanup.

## Plan ledger

**Goal:** keep browser, filesystem and process work in adapters while centralizing observation identity, admission, artifact settlement and retirement semantics.

- [x] Separate semantic authority from Node, Python and Chromium adapters.
- [x] Preserve the existing 44 DSK/kit surfaces.
- [x] Identify five observation adapters.
- [x] Define immutable commands, attempts, artifacts and results.
- [x] Define stale, duplicate, partial and failed classifications.
- [x] Define one-page evidence and process-retirement gates.
- [ ] Implement the domain later.

## Current ownership

```txt
scripts/run-browser-observation.mjs
  owns browser discovery
  owns port selection
  owns server spawn
  owns route polling
  owns two Chromium launches
  owns artifact filenames
  owns marker checks
  owns report projection
  owns server SIGTERM
```

This combines semantic admission with platform side effects and provides no versioned transaction boundary.

## Required parent domain

```txt
meadow-browser-observation-evidence-authority-domain
```

## Core contracts

```txt
BrowserObservationCommand
ObservationAttempt
ServerAdmissionResult
BrowserSessionAdmissionResult
RendererFrameAdmissionResult
ObservationArtifact
ObservationArtifactManifest
ProcessRetirementReceipt
BrowserObservationResult
```

## Authority sequence

```txt
BrowserObservationCommand
  -> validate repository and provider evidence
  -> allocate attempt and generations
  -> reserve port
  -> prepare and admit local server
  -> launch and admit browser session
  -> create one page
  -> wait for route and renderer readiness
  -> drain browser errors
  -> capture DOM, canvas and screenshot from the same page
  -> hash and validate artifacts
  -> atomically promote manifest
  -> retire page, browser and server
  -> publish terminal result
```

## Adapter boundary

```txt
python-static-server-adapter
  bind loopback server
  return PID, address, exit and stderr evidence

chromium-process-adapter
  discover executable
  return binary version/fingerprint
  launch one controllable session

browser-page-adapter
  navigate
  evaluate readiness
  invoke NexusEditorEnvironment
  capture DOM/canvas/screenshot

filesystem-artifact-adapter
  write temporary attempt directory
  hash files
  atomically promote completed manifest
  quarantine failed attempts
```

## Result classifications

```txt
Completed
Degraded
Unavailable
Rejected
TimedOut
Failed
Cancelled
Stale
Superseded
Partial
RetirementFailed
```

## Planned coordinating surfaces

```txt
meadow-browser-observation-evidence-authority-domain
browser-observation-command-kit
browser-observation-attempt-kit
repository-revision-evidence-kit
provider-manifest-fingerprint-kit
browser-binary-fingerprint-kit
server-port-reservation-kit
local-server-generation-kit
server-origin-admission-kit
browser-session-lifecycle-kit
browser-page-generation-kit
route-readiness-barrier-kit
editor-bridge-readiness-probe-kit
renderer-frame-admission-kit
browser-error-drain-kit
same-page-dom-capture-kit
same-page-canvas-capture-kit
same-page-screenshot-kit
observation-artifact-hash-kit
observation-artifact-manifest-kit
attempt-directory-promotion-kit
stale-artifact-quarantine-kit
process-retirement-receipt-kit
browser-observation-result-kit
browser-observation-fixture-gate-kit
```

## Dependency rule

```txt
existing game and renderer domains produce state and frames
observation authority admits and correlates evidence
Node, Python, Chromium and filesystem adapters execute side effects
no adapter may declare a successful observation without the authority result
```

## Boundary

This audit defines contracts only. No executable DSK or adapter changed.