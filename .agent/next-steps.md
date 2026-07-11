# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T04-39-58-04-00`

## Goal

Introduce one explicit source-provider authority that admits the pinned external provider, classifies import/export failures, applies a declared fallback policy, normalizes raw source plans, and proves production/test parity without changing the current visual result.

## Plan ledger

```txt
[ ] Preserve the pinned meadow-area-kit commit and manifest URL.
[ ] Preserve meadow-render-plan/v2 and the current renderer output.
[ ] Complete Runtime Session Lifecycle Authority first so failed startup can roll back safely.
[ ] Add a ProviderRequest containing provider id, URL, expected export, expected version and fallback policy.
[ ] Inject the module loader instead of hard-wiring dynamic import inside the authority.
[ ] Return a typed ProviderAdmissionResult for admitted, rejected, degraded and fallback outcomes.
[ ] Classify network, parse, module-evaluation, missing-export, incompatible-version and invalid-plan failures.
[ ] Define whether production may fall back, fail closed or require an explicit debug/degraded flag.
[ ] Add provider capabilities for render-plan generation, snapshot, validate and reset.
[ ] Fingerprint provider id, source repository, commit, version, export contract and fallback status.
[ ] Add a shared raw SourcePlan contract before enhancement.
[ ] Validate external and fallback plans against that contract.
[ ] Define a parity matrix: exact, semantically equivalent, intentionally degraded or incompatible.
[ ] Normalize known differences before meadow-render-plan/v2 enhancement.
[ ] Include provider identity and admission result in game diagnostics and snapshots.
[ ] Expose clone-safe provider state through GameHost and browser editor observations.
[ ] Add a bounded provider journal with request, candidate, admission, plan and failure rows.
[ ] Add an injected-loader Node fixture for success and every failure class.
[ ] Add an external/fallback same-config parity fixture.
[ ] Add a production boot fixture that uses the pinned external module contract.
[ ] Add a browser offline/import-failure smoke matching the declared fallback policy.
[ ] Wire the new fixtures into npm run check.
[ ] Run npm run check.
[ ] Run browser and deployed Pages smoke tests.
```

## Required implementation order

```txt
1. source-provider-request-kit
2. source-provider-candidate-kit
3. source-provider-loader-kit
4. source-provider-export-contract-kit
5. source-provider-capability-kit
6. source-provider-failure-classification-kit
7. source-provider-fallback-policy-kit
8. source-provider-admission-kit
9. source-provider-fingerprint-kit
10. source-plan-contract-kit
11. source-plan-normalization-kit
12. source-plan-parity-kit
13. source-provider-journal-kit
14. source-provider-observation-kit
15. source-provider-fixture-kit
```

## Acceptance criteria

```txt
production and tests declare which provider they use
provider selection never collapses to an untyped throw
fallback use is explicit and observable
same request yields the same admission result and fingerprint
external and fallback raw plans receive a parity classification
invalid or incompatible plans never reach the enhancer
GameHost snapshots identify provider and source-plan provenance
all provider failure classes have deterministic fixtures
```

## Deferred until after this gate

```txt
new meadow content
visual retuning
renderer replacement
WebGPU migration
CDN migration
shared-kit promotion
player movement and objective progression
```
