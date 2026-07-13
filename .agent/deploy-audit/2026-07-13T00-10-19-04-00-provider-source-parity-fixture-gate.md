# Provider Source Parity Fixture Gate

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-13T00-10-19-04-00`

## Summary

Current Node checks do not execute the deployed external provider. Deployment readiness requires source-aware browser, headless and Pages evidence.

## Plan ledger

**Goal:** gate release claims on successful provider admission and cross-environment semantic evidence.

- [x] Inspect declared package checks.
- [x] Identify fallback-only deterministic proof.
- [x] Identify missing external import and parity cases.
- [ ] Implement fixtures later.

## Required gates

```txt
1. manifest source identity check
2. pinned external module import check
3. provider version/service compatibility check
4. external representative-plan conformance
5. fallback representative-plan conformance
6. external/fallback semantic comparison
7. deterministic repeat for each source profile
8. browser visible-frame source receipt
9. built-output source receipt
10. GitHub Pages source receipt
```

## Failure injection

```txt
CDN unavailable
module 404
missing factory export
provider version mismatch
service manifest mismatch
invalid representative plan
fallback policy denied
fallback conformance failure
stale provider generation
visible frame cites wrong provider generation
```

## Readiness rule

Do not treat `npm run check`, a successful fallback capture or a commit-pinned URL as proof that the deployed Pages route executed the admitted external provider.
