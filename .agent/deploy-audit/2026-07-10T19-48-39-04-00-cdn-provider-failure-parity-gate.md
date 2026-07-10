# Deploy Audit: CDN Provider Failure and Parity Gate

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T19-48-39-04-00`

## Current deployment dependency

The production browser route imports the external meadow provider from a commit-pinned jsDelivr URL before game creation. The host throws when the module cannot be loaded or does not expose `createMeadowAreaKit`.

## Current gate mismatch

```txt
production browser:
  external CDN provider required

npm run check:
  createIntoTheMeadowGame() called without externalKits
  local fallback provider selected
```

A green Node gate therefore does not prove that the deployed external module can load, expose the expected factory, create a compatible plan, pass enhancement, build geometry, or render.

## Required deployment fixtures

```txt
external module URL is reachable
external export createMeadowAreaKit exists
external provider reports expected version
external provider creates arrival-meadow plan
external plan passes render-plan enhancer
external plan passes mesh construction
external plan passes renderer-compatible headless contract
external source fingerprint is recorded
local fallback plan passes the same consumer chain
external/fallback parity row is produced
browser fallback policy is tested explicitly
```

## Failure matrix

| Failure | Current result | Required result |
|---|---|---|
| CDN unavailable | fatal boot | explicit fatal or policy-approved fallback row |
| Export missing | fatal boot | stable rejection reason |
| External validation fails | later failure or undefined behavior | explicit rejection and fallback policy |
| Fallback validation fails | not expected because validation always passes | explicit rejection |
| Provider plan incompatible | render contract failure | provider/consumer compatibility row |
| Source rebuild changes topology | aggregate cache rebuild only | source epoch and reason |

## Package gate additions

```txt
node tests/meadow-source-provider-contract-smoke.mjs
node tests/meadow-external-provider-smoke.mjs
node tests/meadow-source-fallback-parity-smoke.mjs
node tests/meadow-source-render-consumption-smoke.mjs
```

The network-dependent external smoke should use the pinned commit and should be isolated so local deterministic checks remain reproducible. A vendored fixture or fetched artifact hash may be used for offline CI, but it must still prove equivalence to the deployed commit.

## Deployment acceptance

```txt
production external provider identity is observable
failure behavior matches documented fallback policy
Node and browser consumers share the same provider contract
external and fallback outputs are classified for parity
render and gameplay readback include source identity
existing Pages route and visual defaults remain unchanged
```

## Conclusion

The current deployment gate validates the fallback path while production depends on the external path. Add a provider-contract and parity gate before treating `npm run check` as deployment evidence.