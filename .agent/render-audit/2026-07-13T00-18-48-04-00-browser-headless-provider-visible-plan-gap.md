# Browser/Headless Provider Visible-Plan Gap

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-13T00-18-48-04-00`

## Summary

The renderer receives a normalized meadow render plan but no immutable provider-source receipt. A browser frame can originate from the pinned external provider while headless captures originate from the local fallback, yet neither frame nor capture identifies the source contract that produced it.

## Plan ledger

**Goal:** bind every rendered or captured plan to one admitted provider generation and source fingerprint.

- [x] Trace browser provider selection to rendering.
- [x] Trace headless fallback selection to capture.
- [x] Record missing source lineage in render snapshots.
- [x] Define visible-plan and first-frame proof requirements.
- [ ] Implement and execute later.

## Current render paths

```txt
browser
  external module
    -> external meadow provider
    -> external-version render plan
    -> enhancer
    -> CPU mesh
    -> WebGL outline/color passes
    -> renderer snapshot without provider lineage

headless
  local fallback provider
    -> local-source-plan-v1
    -> enhancer
    -> CPU mesh or SVG capture
    -> capture artifact without external-source parity result
```

## Missing render evidence

```txt
providerId
providerGeneration
sourceMode
provider owner/repository/commit/module
provider contract version
provider fingerprint
plan fingerprint
compatibility profile
load result ID
render admission result ID
first visible provider-frame acknowledgement
```

## Reachable divergence

```txt
external and fallback both satisfy broad plan shape
  -> browser displays external plan
  -> tests validate fallback plan
  -> both surfaces report success-shaped output
  -> no evidence proves matching scene semantics
```

Possible differences requiring explicit comparison include:

```txt
path sampling
scatter counts and positions
object type names
material/style normalization
wind and atmosphere descriptors
version fields
optional runtime-adapter behavior
```

This audit does not claim that the providers currently differ. It records that visible equivalence is not proven.

## Required render admission

```txt
ProviderLoadResult
  -> RenderPlanCandidate
  -> validate provider generation and plan contract
  -> attach provider and plan fingerprints
  -> admit RenderPlanCommitResult
  -> build CPU/GPU presentation
  -> publish renderer snapshot with lineage
  -> acknowledge first visible matching frame
```

## Required renderer snapshot fields

```txt
rendererId
frameId
providerLoadResultId
providerId
providerGeneration
sourceMode
providerCommit
providerVersion
providerFingerprint
planFingerprint
compatibilityProfileId
visibleFrameAckId
```

## Fixture requirements

```txt
same config through external provider and fallback
same deterministic seed
compare normalized schema
compare area and path descriptors
compare object categories and counts
compare material/style semantics
compare deterministic fingerprints
capture browser and headless source lineage
capture first visible browser frame
reject out-of-profile semantic drift
```

## Preserved boundaries

Provider-source parity does not replace WebGL context recovery. A source-correct plan can still fail during rendering, and a recovered renderer can still display an unproven provider source.

## Validation boundary

No renderer, mesh, shader, capture or provider source changed. No browser/headless visual parity fixture was run.