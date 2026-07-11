# Source Provider Authority DSK Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T04-39-58-04-00`

## Goal

Define the parent domain and kit boundaries required to turn external/fallback source selection into a deterministic composition service.

## Current architecture

```txt
GAME_MANIFEST.externalKits
  -> web-host.loadExternalKits()
  -> dynamic import
  -> export shape check
  -> createIntoTheMeadowGame({ externalKits })
  -> factory selection
  -> provider instance
  -> raw source plan
  -> enhancer
```

The loader, admission policy, fallback decision, provider identity and raw-plan compatibility are spread across manifest, host and game-construction code.

## Required parent domain

```txt
meadow-source-provider-authority-domain
```

Owns:

```txt
provider requests and candidates
loader injection
export and capability contracts
version admission
failure classification
fallback policy
provider and source-plan fingerprints
raw-plan schema admission and normalization
external/fallback parity results
bounded provider journal
clone-safe observations
```

Does not own:

```txt
meadow content authoring
render-plan/v2 enhancement
WebGL resources
runtime RAF lifecycle
player or objective rules
CDN infrastructure
```

## Kit map

| Kit | Service boundary |
|---|---|
| `source-provider-request-kit` | Canonical provider id, URL, expected export/version, policy and request identity. |
| `source-provider-candidate-kit` | Immutable candidate metadata and source provenance. |
| `source-provider-loader-kit` | Injected module loading with deterministic result envelopes. |
| `source-provider-export-contract-kit` | Expected factory and callable export validation. |
| `source-provider-capability-kit` | `getRenderPlan`, `getSnapshot`, `validate`, `reset` capability checks. |
| `source-provider-failure-classification-kit` | Network, parse, evaluation, export, construction, version and plan failures. |
| `source-provider-fallback-policy-kit` | Fail-closed, explicit degraded fallback or test-injected policy. |
| `source-provider-admission-kit` | One accepted/rejected/fallback result with reason and sequence. |
| `source-provider-fingerprint-kit` | Provider source, commit, version, export and capability fingerprint. |
| `source-plan-contract-kit` | Raw meadow source-plan required fields and object-family contract. |
| `source-plan-normalization-kit` | Converts accepted provider differences into one canonical raw plan. |
| `source-plan-parity-kit` | Exact, normalized-equivalent, degraded or incompatible classification. |
| `source-provider-journal-kit` | Bounded ordered request/admission/plan/failure rows. |
| `source-provider-observation-kit` | Clone-safe GameHost/editor provider state. |
| `source-provider-fixture-kit` | Injected loader and same-config parity test adapters. |

## Required flow

```txt
ProviderRequest
  -> Candidate
  -> LoaderResult
  -> ExportResult
  -> CapabilityResult
  -> AdmissionResult
  -> provider instance
  -> raw SourcePlan
  -> SourcePlanValidation
  -> SourcePlanNormalization
  -> provider/source fingerprints
  -> game construction
```

## Dependency note

Startup acquisition and failure cleanup must be registered with `runtime-session-authority-domain`. Provider authority must not become a second lifecycle owner.
