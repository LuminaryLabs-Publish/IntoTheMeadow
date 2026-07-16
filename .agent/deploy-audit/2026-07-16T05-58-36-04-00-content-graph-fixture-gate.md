# Deploy Audit: Content Graph Fixture Gate

**Timestamp:** `2026-07-16T05-58-36-04-00`

## Summary

Static syntax checks and successful rendering do not prove authored content integrity. Deployment should be gated by source, artifact and Pages execution of the same content-graph fixtures and digest.

## Plan ledger

**Goal:** prevent publication of a build whose authored content graph is invalid, stale or different from the accepted source generation.

- [x] Define source and browser fixture classes.
- [x] Define artifact and Pages parity evidence.
- [x] Record current proof limits.
- [ ] Implement fixtures and deployment gating later.

## Required fixtures

```txt
duplicate scene/target/objective/story ID rejection
unknown initial scene/objective/story reference rejection
unknown objective target/action rejection
malformed trigger rejection
unknown trigger target/action rejection
required unreachable node rejection
optional unreachable node classification
editor mutation predecessor preservation
stale mutation rejection
content graph digest stability
source/artifact content graph parity
artifact/Pages content graph parity
FirstContentBoundGameplayFrameAck
```

## Required deployment evidence

```txt
source ContentGraphDigest
artifact ContentGraphDigest
Pages ContentGraphDigest
ContentGraphAdmissionResult
browser visible-frame acknowledgement
fixture report bound to repository and release revisions
```

## Current boundary

No fixtures were run. No build artifact was downloaded. No Pages origin was fetched. No deployment workflow was changed.