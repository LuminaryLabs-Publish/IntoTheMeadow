# Provider Source Parity Fixture Gate

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-13T00-18-48-04-00`

## Summary

Static build and Pages deployment cannot establish provider-source parity by configuration alone. Release proof must execute the pinned browser provider, identify its admitted source, compare it with the fallback compatibility profile and capture the first visible frame.

## Plan ledger

**Goal:** define the minimum source, build and Pages evidence required before provider parity or fallback readiness is claimed.

- [x] Separate manifest pinning from execution proof.
- [x] Define source-level provider fixtures.
- [x] Define built-output and Pages observations.
- [x] Define fallback and drift rejection gates.
- [x] Preserve existing WebGL recovery and scheduler gates.
- [ ] Implement and execute later.

## Source fixture matrix

| Fixture | Required result |
|---|---|
| Valid pinned external provider | external-admitted result with commit, version, services and fingerprints |
| Missing module URL | rejected-missing-source or explicit compatible fallback result |
| Dynamic import failure | typed import-failure result; no silent substitution |
| Missing factory export | rejected-export-shape result |
| Incompatible provider version | rejected-version result |
| Missing required service | rejected-service-contract result |
| Invalid provider snapshot | rejected-snapshot-contract result |
| Invalid render plan | rejected-plan-contract result |
| Explicit fallback-only policy | fallback-admitted result without external import |
| External-preferred fallback | fallback reason plus compatible profile proof |
| External/fallback parity | normalized semantic comparison and fingerprints |
| Semantic drift | rejected-semantic-drift result |
| Duplicate/stale result | prior result or stale rejection; no replacement |

## Browser proof

```txt
load built page
observe provider-load result
confirm structured owner/repo/commit/module identity
confirm expected and actual provider versions
confirm required/provided services
confirm game and renderer snapshots carry source lineage
confirm first visible frame names provider generation and plan fingerprint
capture artifact with source metadata
```

## Headless proof

```txt
run identical meadow config and seed
select explicit source profile
capture provider result and normalized plan
emit provider and plan fingerprints
repeat for determinism
compare with browser compatibility profile
```

## GitHub Pages proof

```txt
load deployed URL without local cache assumptions
confirm pinned provider import succeeds
record resolved source identity and result
record visible-frame acknowledgement
capture screenshot and machine-readable observation
compare deployed fingerprints with source/build expectations
```

## Release blockers

```txt
no external provider execution
no typed source result
no service-contract validation
no explicit fallback result
no semantic parity fixture
no source lineage in snapshots
no first visible provider frame
no deployed source observation
```

## Preserved independent gates

```txt
single-chain RAF lifecycle
WebGL context loss/restoration recovery
GPU resource rebuild and rollback
gameplay progression authority
persistence and migration
editor lifecycle and bounded diagnostics
```

## Validation boundary

No build, browser, headless, CDN or Pages command was executed. Deployment configuration is unchanged and no release-readiness claim is made.