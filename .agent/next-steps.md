# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-13T00-10-19-04-00`

## Summary

Make provider choice explicit before expanding gameplay. Browser, headless and tests must either consume the same admitted provider or publish a typed fallback result and prove semantic equivalence.

## Plan ledger

**Goal:** establish one versioned provider-source transaction from manifest resolution through the first visible frame.

### Identity and manifest

- [ ] Add provider source ID, source mode and generation.
- [ ] Parse the pinned owner, repo, commit and module path into structured fields.
- [ ] Declare expected provider contract version and required services.
- [ ] Add provider module and plan fingerprints.
- [ ] Expose provider lineage in game, renderer and editor snapshots.

### Admission

- [ ] Add `ProviderLoadCommand` and `ProviderLoadResult`.
- [ ] Validate factory export, version and service manifest.
- [ ] Instantiate the candidate before committing it.
- [ ] Validate provider snapshot and one representative render plan.
- [ ] Reject unknown or incompatible provider versions.
- [ ] Stop using truthiness as external readiness proof.

### Fallback policy

- [ ] Define `external-required`, `external-preferred` and `fallback-only` policies.
- [ ] Make browser fallback reachable only through an explicit admitted policy.
- [ ] Publish the reason and predecessor/candidate source identities.
- [ ] Never silently substitute fallback after an external failure.
- [ ] Keep terminal failure available when parity is not proven.

### Parity

- [ ] Run external and fallback providers with identical arrival config.
- [ ] Compare schema, area, path, object types, counts and deterministic digests.
- [ ] Define tolerated representational differences.
- [ ] Reject semantic drift outside the declared compatibility profile.
- [ ] Add browser/headless/test source-profile parity fixtures.

### Diagnostics and visible proof

- [ ] Report loaded, deferred, rejected and fallback-selected counts separately.
- [ ] Include provider commit/version/mode in `GameHost` and editor readback.
- [ ] Publish bounded provider observations and results.
- [ ] Tie the first visible frame to provider and plan fingerprints.
- [ ] Include source lineage in browser and Pages smoke artifacts.

### Proof

- [ ] External provider success fixture.
- [ ] Missing URL and failed dynamic-import fixture.
- [ ] Missing export and incompatible-version fixture.
- [ ] Explicit fallback-selection fixture.
- [ ] External/fallback semantic parity fixture.
- [ ] Determinism fixture for each admitted source profile.
- [ ] Source, built-output and GitHub Pages observations.

## Required result

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
  firstVisibleFrameAckId
}
```

## Preserved dependencies

Provider admission sits upstream of DSK readiness, render-plan generation, browser/headless parity and visible-frame proof. WebGL context recovery, frame scheduling, gameplay progression and persistence remain separate bounded domains.
