# Provider Source Parity DSK Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-13T00-18-48-04-00`

## Summary

Provider selection is currently an implicit host decision rather than an admitted domain transaction. Browser boot requires the commit-pinned external provider, while headless and deterministic proof silently select the local fallback.

## Plan ledger

**Goal:** define one bounded authority for provider identity, loading, contract validation, fallback policy, semantic parity and visible-frame provenance.

- [x] Map current provider ownership.
- [x] Separate provider admission from rendering and gameplay.
- [x] Define parent domain and sub-kit responsibilities.
- [x] Define command, result, observation and journal surfaces.
- [x] Define compatibility and parity gates.
- [ ] Implement and execute later.

## Current ownership map

```txt
game manifest
  owns pinned external module URL

web host
  owns dynamic import and export-shape check
  fails before game creation on external-load failure

game composition
  accepts optional external factory
  silently selects local fallback when factory is absent

DSK installation
  treats factory truthiness as external loaded state
  validates local declarations only

meadow provider
  owns source-specific snapshot and render plan

game snapshot
  omits provider source lineage

renderer
  consumes a normalized plan without provider identity proof

headless/tests
  construct game without external factory
  exercise fallback only
```

## Required parent domain

```txt
meadow-provider-source-parity-authority-domain
```

This domain coordinates source identity and compatibility. It does not own meadow generation algorithms, WebGL submission, gameplay progression or deployment.

## Required kits

```txt
provider-runtime-session-kit
provider-source-policy-kit
provider-source-id-kit
provider-source-generation-kit
provider-module-location-kit
provider-commit-identity-kit
provider-contract-version-kit
provider-required-service-manifest-kit
provider-load-command-kit
provider-load-admission-kit
provider-module-import-kit
provider-factory-export-validation-kit
provider-candidate-instantiation-kit
provider-snapshot-contract-kit
provider-render-plan-contract-kit
provider-service-conformance-kit
provider-fingerprint-kit
provider-plan-fingerprint-kit
provider-compatibility-profile-kit
provider-fallback-policy-kit
provider-fallback-selection-kit
provider-load-result-kit
provider-install-commit-kit
stale-provider-result-rejection-kit
provider-observation-kit
provider-journal-kit
provider-diagnostics-projection-kit
provider-snapshot-lineage-kit
provider-visible-frame-binding-kit
first-provider-frame-ack-kit
provider-source-parity-fixture-kit
provider-source-determinism-fixture-kit
browser-provider-smoke-kit
headless-provider-smoke-kit
pages-provider-smoke-kit
```

## Service boundaries

| Kit family | Services |
|---|---|
| Identity | runtime session; environment; provider ID; generation; owner/repo/commit/module identity |
| Policy | external-required; external-preferred; fallback-only; allowed compatibility profiles |
| Admission | command IDs; expected predecessor; export validation; version validation; required/provided services |
| Candidate | detached provider construction; snapshot validation; representative plan validation |
| Commit | atomic provider install; predecessor preservation; stale-result rejection; typed terminal result |
| Parity | source fingerprints; plan fingerprints; schema and semantic comparison; tolerated-difference profile |
| Projection | game snapshot lineage; renderer lineage; editor diagnostics; bounded observations and journal |
| Visible proof | provider-generation frame binding; first visible frame acknowledgement |
| Fixtures | success; import failure; missing export; version mismatch; fallback; semantic drift; Pages parity |

## Command contract

```txt
ProviderLoadCommand {
  commandId
  runtimeSessionId
  environment
  expectedPredecessorGeneration
  sourcePolicy
  providerId
  owner
  repository
  commit
  modulePath
  moduleUrl
  expectedContractVersion
  requiredServices
  compatibilityProfileId
}
```

## Result contract

```txt
ProviderLoadResult {
  commandId
  runtimeSessionId
  environment
  status
  reason
  sourceMode
  providerId
  providerGeneration
  owner
  repository
  commit
  modulePath
  providerVersion
  requiredServices
  providedServices
  providerFingerprint
  planFingerprint
  fallbackReason
  predecessorGeneration
  firstVisibleFrameAckId
}
```

## Admission flow

```txt
receive ProviderLoadCommand
  -> validate runtime session and expected predecessor
  -> validate source policy
  -> resolve structured module identity
  -> import external candidate or select explicit fallback candidate
  -> validate factory export
  -> instantiate detached provider
  -> validate contract version and service manifest
  -> validate provider snapshot
  -> generate and validate representative render plan
  -> calculate fingerprints
  -> atomically install candidate
  -> publish ProviderLoadResult
  -> expose lineage to game, renderer and editor
  -> acknowledge first visible matching frame
```

## Failure policy

```txt
external-required + load failure
  -> terminal rejected result

external-preferred + admitted compatible fallback
  -> fallback-selected result with reason and both identities

fallback-only
  -> no external import attempt

unknown version or semantic drift
  -> reject candidate
  -> preserve predecessor
  -> do not claim external readiness
```

## Invariants

```txt
one runtime generation has one admitted provider source
provider source never changes silently
factory truthiness is not readiness proof
source lineage is present in every downstream snapshot
headless and browser parity claims require the same compatibility profile
visible-frame proof names provider and plan fingerprints
```

## Dependency map

```txt
provider source authority
  -> DSK readiness truth
  -> meadow plan generation
  -> renderer plan admission
  -> browser/headless/test parity
  -> build and Pages source proof

separate retained domains
  -> frame scheduler
  -> WebGL context recovery
  -> gameplay progression
  -> persistence
  -> editor lifecycle
```

## Validation boundary

Architecture documentation only. No kit, provider loader, snapshot, renderer or test implementation changed.