# Provider Load Admission Result Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-13T00-10-19-04-00`

## Summary

Provider loading currently returns either a factory object or a thrown error. This map defines typed commands and terminal outcomes.

## Plan ledger

**Goal:** ensure every load attempt has one auditable result and zero silent source substitution.

- [x] Map manifest resolution.
- [x] Map external import and export checks.
- [x] Map fallback selection.
- [x] Map conformance and commit.
- [ ] Implement later.

## Command path

```txt
ProviderLoadCommand
  -> ManifestResolutionResult
  -> ModuleImportResult
  -> ProviderExportResult
  -> ProviderCompatibilityResult
  -> ProviderCandidateResult
  -> ProviderPlanConformanceResult
  -> ProviderLoadResult
```

## Terminal statuses

```txt
ready-external
ready-fallback
rejected-manifest
rejected-import
rejected-export
rejected-version
rejected-services
rejected-plan
stale
terminal-external-required
```

## Zero-mutation rules

```txt
rejected candidate never replaces committed provider
fallback requires an explicit policy result
stale load result cannot advance provider generation
diagnostics update only from committed result
visible frame cannot cite an uncommitted candidate
```
