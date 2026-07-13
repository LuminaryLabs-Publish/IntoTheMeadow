# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-13T00-10-19-04-00`

## Summary

The leading source-integrity gap is browser/headless provider divergence. The browser requires the pinned external provider, while Node proof surfaces silently use a local fallback. Current validation cannot prove which provider produced a snapshot or whether both implementations are semantically equivalent.

## Plan ledger

**Goal:** close provider-source identity, admission, fallback and parity gaps without merging them into renderer or gameplay ownership.

- [x] Record the browser-only external import path.
- [x] Record the headless/test-only fallback path.
- [x] Record missing provider contract/version/service validation.
- [x] Record incomplete snapshot lineage and misleading external counts.
- [x] Record missing cross-source parity and visible-frame proof.
- [ ] Implement in dependency order.

## Identity gaps

```txt
provider source ID
provider generation
environment/source profile
structured owner/repo/commit/module identity
expected contract version
provider fingerprint
render-plan fingerprint
```

## Admission gaps

```txt
typed load command and result
factory export schema
provider version compatibility
required/provided service manifest
candidate snapshot validation
representative render-plan validation
atomic provider installation
stale provider result rejection
```

## Fallback gaps

```txt
browser fallback policy
explicit fallback-selected result
fallback reason and source lineage
terminal external-required result
no-silent-substitution invariant
fallback compatibility profile
```

## Snapshot and diagnostics gaps

```txt
game snapshot omits meadow/provider snapshot
provider mode and commit absent
external count does not distinguish loaded from deferred
no provider result journal
no plan digest
no first visible provider-frame acknowledgement
```

## Proof gaps

```txt
pinned external module execution
failed import/export handling
external version mismatch
explicit browser fallback
external/fallback semantic comparison
determinism per source profile
browser/headless/test parity
built-output and Pages source lineage
```

## Preserved gaps

```txt
WebGL context and resource recovery
single-chain frame scheduling
executable DSK provider consumption
playable input, movement and progression
camera-bound grass visibility and LOD
audio user-gesture lifecycle
atomic save and migration
independent replay
editor lifecycle and bounded errors
```

## Completion boundary

A commit-pinned URL is not provider admission proof. Completion requires a typed source result, validated provider contract, explicit fallback policy, source-plan fingerprints and a visible frame tied to the admitted provider generation.
