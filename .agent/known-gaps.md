# Known Gaps

**Updated:** `2026-07-14T09-58-25-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `runtime-reset-session-replay-authority-audited`

## Summary

The current bounded gap is reset identity and participant coherence. Browser and headless reset paths recreate state but do not produce one unique successor session, shared participant policy, atomic result or first successor-frame proof.

## Plan ledger

**Goal:** record every missing identity, lifecycle rule and proof required for deterministic reset and replay.

- [x] Record command and session gaps.
- [x] Record scheduler and participant gaps.
- [x] Record render and observation gaps.
- [x] Record replay and validation gaps.
- [x] Preserve predecessor audits.
- [ ] Implement and prove the authority later.

## Identity gaps

```txt
RuntimeResetCommand schema: absent
ResetCommandId: absent
ExpectedStateRevision: absent
SessionGeneration: absent
predecessor/successor relationship: absent
reset cause and policy identity: absent
```

## Participant gaps

```txt
canonical reset participant manifest: absent
browser/headless participant parity: absent
provider reset or retain receipt: absent
base render-plan reset or carry receipt: absent
enhancer invalidation policy: divergent
renderer cache reset policy: absent
error-ledger carry/clear policy: absent
capture-baseline carry/clear policy: absent
```

## Scheduler gaps

```txt
RAF suspension during reset: absent
manual editor tick suspension: absent
stale tick rejection: absent
superseded reset completion rejection: absent
accepted scheduler generation: absent
```

## Evidence gaps

```txt
browser lastPlan invalidation: absent
browser lastRender invalidation: absent
headless lastCapture reset policy: absent
participant preparation receipts: absent
atomic adoption barrier: absent
rollback receipt: absent
RuntimeResetResult: absent
replay journal: absent
state/render fingerprints: absent
FirstResetSessionFrameAck: absent
```

## Validation gaps

```txt
unique successor session fixture: absent
duplicate reset command fixture: absent
stale expected revision fixture: absent
reset during RAF fixture: absent
reset versus manual tick fixture: absent
participant failure/rollback fixture: absent
browser/headless parity fixture: absent
capture baseline fixture: absent
first reset-session frame fixture: absent
source/build/Pages parity fixture: absent
```

## Preserved unresolved gaps

```txt
DSK executable capability composition
browser observation provenance
render-plan and mesh-cache coherence
viewport authority
editor capability admission
web-host retirement
workspace containment and atomic artifacts
provider-source parity
WebGL context recovery
single-chain frame scheduling
playable progression
grass visibility and LOD
audio user-gesture lifecycle
atomic save and migration
```

## Completion boundary

Reset is not proven until one admitted command creates a unique successor session, settles every declared participant atomically, rejects stale work, records replay evidence and produces a matching first successor frame.