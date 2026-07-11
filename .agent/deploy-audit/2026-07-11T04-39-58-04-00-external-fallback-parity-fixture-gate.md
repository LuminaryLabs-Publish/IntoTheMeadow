# External/Fallback Parity Fixture Gate

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T04-39-58-04-00`

## Goal

Prevent deployment when only the local fallback path has been validated or when the pinned external provider no longer satisfies the expected contract.

## Current gate

```txt
npm run check
  -> static smoke
  -> DSK registry smoke
  -> render-plan smoke using createIntoTheMeadowGame()
  -> renderer and deterministic scene smokes
  -> headless-editor smokes
```

Direct game construction omits `externalKits`, so these checks select the local fallback. The deployed browser route uses the external provider.

## Required new fixtures

```txt
fixture:source-provider
  injected loader success and failure classes

fixture:source-parity
  same ARRIVAL_MEADOW_CONFIG through external and fallback providers

fixture:production-provider
  pinned module export, version, capabilities, raw-plan and enhancement contract

smoke:browser-provider-failure
  blocked import follows explicit fail-closed or degraded-fallback policy
```

## Required deployment evidence

```txt
manifest provider URL and commit
resolved provider version
expected export result
provider fingerprint
source-plan fingerprint
parity classification
enhanced topology key
renderer descriptor counts
browser failure-policy result
```

## Proposed package gate

```bash
npm run fixture:source-provider
npm run fixture:source-parity
npm run fixture:production-provider
npm run check
```

Browser failure smoke may run in Pages CI or a browser-capable validation job.

## Failure conditions

```txt
pinned module cannot load
expected export missing
version incompatible
required capabilities missing
raw plan invalid
external/fallback differences unclassified
production fixture uses fallback without explicit policy
provider identity absent from observation artifact
```

## Current validation state

```txt
runtime source changed: no
workflow changed: no
npm run check: not run
provider fixtures: absent
browser provider-failure smoke: absent
Pages smoke: not run
```
