# Workspace Containment Central Fixture Gate

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-13T02-39-44-04-00`

## Summary

The current package check validates normal headless flow but does not prove filesystem containment. Production readiness for remote or autonomous editor use requires zero-mutation adversarial fixtures across Node platforms and a separate browser capability-exclusion check.

## Plan ledger

**Goal:** define the minimum executable proof required before workspace containment or artifact integrity can be claimed.

- [x] Inventory existing package checks.
- [x] Separate source review from executable proof.
- [x] Define safe baseline fixtures.
- [x] Define adversarial path and link fixtures.
- [x] Define capture group and stale-root fixtures.
- [x] Define browser and deployed-origin boundaries.
- [ ] Implement and run later.

## Existing check boundary

```txt
static-smoke
DSK registry smoke
render-plan smoke
renderer-v2 smoke
deterministic scene smoke
headless environment smoke
headless command smoke
headless loop smoke
```

These checks use trusted paths and labels. They do not call workspace list/read/write adversarially or prove that rejected commands leave the host filesystem unchanged.

## Required pure-domain fixtures

```txt
relative in-root path accepted
root path handled by policy
absolute POSIX path rejected
absolute Windows path rejected
parent traversal rejected
sibling-prefix collision rejected
malformed and platform-ambiguous path rejected
stale root generation rejected
stale policy revision rejected
```

## Required filesystem fixtures

```txt
existing file read under canonical root
new file write under canonical parent
external symlink rejected
in-root symlink handled by authored policy
new target under external symlinked parent rejected
junction or reparse-point behavior on Windows
root replacement during queued operation
atomic temporary-file cleanup on failure
no external file created after every rejection
```

## Required capture fixtures

```txt
normal bounded label
dot-segment label
slash and backslash label
drive-prefix label
control-character label
Unicode normalization collision
JSON succeeds and SVG fails
artifact root changes before execution
complete paired-artifact result with hashes and byte counts
```

## Browser and deployment fixtures

```txt
built browser output exposes no Node workspace mutation capability
browser editor readback remains observation-only
browser WebGL smoke remains independent of headless SVG evidence
source and built package checks agree
GitHub Pages loads without filesystem-provider assumptions
```

## Gate

Do not claim workspace containment, safe autonomous editing, atomic capture evidence or production readiness until the full zero-mutation matrix passes on POSIX and Windows and results are recorded with exact environment, root and policy generations.
