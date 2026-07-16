# Interaction Audit: Release Graph Command and Result Map

**Timestamp:** `2026-07-16T01:38:56-04:00`  
**Status:** `static-module-graph-release-revision-cache-coherence-authority-audited`

## Plan ledger

**Goal:** make boot, reload, upgrade, rollback and retirement settle through typed release results.

- [x] Map current implicit browser actions.
- [x] Define release admission and upgrade commands.
- [x] Define failure classifications.
- [x] Bind the first interaction-capable frame to release identity.
- [ ] Implement later.

## Current implicit path

```txt
browser navigation
  -> fetch index
  -> resolve module URLs
  -> use browser cache/revalidation
  -> execute whatever graph resolves successfully
  -> start game
```

No product command or result records what graph was accepted.

## Required map

```txt
DocumentBootEvidence
  -> ReleaseGraphAdmissionCommand
  -> ReleaseGraphAdmissionResult
       accepted
       missing-module
       digest-mismatch
       mixed-generation
       provider-mismatch
       artifact-mismatch
       deployment-mismatch
       unsupported-cache-policy
       retired

accepted
  -> GameStartupCommand
  -> FirstReleaseBoundFrameAck

new deployment observed
  -> ReleaseUpgradeCommand
  -> ReleaseUpgradeResult
       reloaded
       predecessor-preserved
       rollback-accepted
       failed
```

## Interaction readiness

Keyboard, editor and accessibility commands should not be declared ready until the accepted release generation has produced the first matching visible and semantic frame.

## Boundary

No user-facing controls changed. This document defines command/result ownership only.
