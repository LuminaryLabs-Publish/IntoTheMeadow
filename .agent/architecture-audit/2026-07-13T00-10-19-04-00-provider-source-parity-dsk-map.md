# Provider Source Parity DSK Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-13T00-10-19-04-00`

## Summary

This map isolates provider identity, admission, fallback and parity from render-plan semantics, WebGL lifecycle and gameplay state.

## Plan ledger

**Goal:** define a bounded parent domain that selects one provider source explicitly and publishes a verifiable result.

- [x] Keep manifest/module identity separate from meadow content semantics.
- [x] Keep provider selection upstream of DSK readiness and rendering.
- [x] Keep fallback policy explicit.
- [x] Keep cross-source conformance observable.
- [x] Require first-frame provenance.
- [ ] Implement later.

## Parent domain

```txt
meadow-provider-source-parity-authority-domain
```

## Owns

```txt
provider source ID and generation
environment/source profile
module owner/repo/commit/path
expected provider contract version
required/provided service manifest
external load and fallback admission
provider candidate validation
provider/plan fingerprints
external-fallback parity result
provider observations and bounded journal
first provider-frame acknowledgement
```

## Does not own

```txt
meadow content authoring
render-plan enhancement
CPU mesh generation
WebGL context recovery
frame scheduling
gameplay progression
save/replay
deployment transport
```

## Kit composition

```txt
identity:
  provider-source-id-kit
  provider-generation-kit
  provider-module-identity-kit
  provider-contract-version-kit

admission:
  provider-load-command-kit
  provider-load-admission-kit
  provider-service-manifest-kit
  provider-capability-validation-kit
  provider-load-result-kit
  stale-provider-result-rejection-kit

fallback:
  provider-fallback-policy-kit
  provider-fallback-result-kit

conformance:
  provider-plan-conformance-kit
  provider-plan-fingerprint-kit
  provider-parity-result-kit

observation:
  provider-source-observation-kit
  provider-source-journal-kit
  first-provider-frame-ack-kit

proof:
  browser-provider-smoke-kit
  headless-provider-smoke-kit
  browser-headless-parity-fixture-kit
  pages-provider-smoke-kit
```

## State model

```txt
UNRESOLVED
  -> LOADING_EXTERNAL
  -> VALIDATING_EXTERNAL
  -> READY_EXTERNAL

LOADING_EXTERNAL / VALIDATING_EXTERNAL
  -> SELECTING_FALLBACK only when policy admits it
  -> TERMINAL when external is required

SELECTING_FALLBACK
  -> VALIDATING_FALLBACK
  -> READY_FALLBACK
  -> TERMINAL

READY_*
  -> visible frame acknowledgement
```

## Invariants

```txt
one committed provider generation per runtime session
no silent transition between external and fallback
external readiness requires more than a truthy factory
provider version and services are validated before commit
game/editor snapshots expose selected source lineage
parity is profile-specific and does not assume byte equality
first visible frame cites provider generation and plan fingerprint
```
