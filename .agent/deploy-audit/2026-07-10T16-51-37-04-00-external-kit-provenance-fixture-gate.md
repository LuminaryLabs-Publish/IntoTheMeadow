# Deploy Audit: External Kit Provenance Fixture Gate

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T16-51-37-04-00`

## Current deployment dependency

The static Pages route imports `meadow-area-kit` from jsDelivr at a commit-pinned GitHub URL. The pin protects against branch drift, but startup still depends on successful CDN resolution and a matching module export.

## Missing deploy gates

```txt
no Node fixture validates manifest URL parsing into repository/commit/module fields
no fixture imports or stubs the pinned module and records exported version
no fixture simulates CDN/import rejection
no fixture proves intentional hard-fail or fallback selection
no fixture compares external and fallback minimum contract parity
no deployed readback exposes selected source identity
```

## Required checks

```txt
node tests/meadow-source-provenance-smoke.mjs
node tests/meadow-source-failure-policy-smoke.mjs
node tests/meadow-source-fallback-parity-smoke.mjs
node tests/meadow-source-time-policy-smoke.mjs
npm run check
npm test
npm run editor:smoke
```

## Deploy acceptance

```txt
manifest source parses to the expected repository and commit
exported kit version is recorded
external success reaches GameHost/editor source readback
failure policy is deterministic and fixture-proven
fallback mode, when permitted, is visible and reports degradation
source fingerprints are stable
legacy static route and renderer checks still pass
```

## Validation state

```txt
runtime source changed: no
workflow changed: no
package scripts changed: no
npm run check: not run
browser smoke: not run
new fixtures: not run because they do not exist yet
pushed to main: yes
central ledger updated: yes
central change log updated: yes
```