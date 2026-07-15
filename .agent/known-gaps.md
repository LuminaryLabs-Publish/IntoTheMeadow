# Known Gaps

**Updated:** `2026-07-14T20-40-50-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `post-process-descriptor-execution-authority-audited`

## Summary

The bounded gap is truthful presentation adoption. A six-pass post-process graph is declared, but the active renderer executes an unversioned inline profile and publishes no graph-admission, pass-execution, resource, fallback, or visible-frame receipts.

## Plan ledger

**Goal:** record every missing identity, admission rule, execution receipt, rollback guarantee, and proof required for trustworthy post-processing.

- [x] Record graph and capability gaps.
- [x] Record resource and pass-execution gaps.
- [x] Record fallback and diagnostics gaps.
- [x] Record validation and deployment gaps.
- [ ] Implement and prove the authority later.

## Identity gaps

```txt
PostProcessFrameCommand schema: absent
RenderAttemptId: absent
declared graph fingerprint: absent
renderer capability fingerprint: absent
post-process policy revision: absent
admitted profile ID: absent
resource generation ID: absent
```

## Admission gaps

```txt
mandatory versus optional pass policy: absent
full profile admission: absent
reduced profile admission: absent
inline fallback admission: absent
unsupported-pass rejection: absent
ordered input/output validation: absent
```

## Execution gaps

```txt
render-target preparation receipts: absent
scene-color target identity: absent
depth/normal target identity: absent
ping-pong target identities: absent
per-pass execution receipts: absent
final composite output identity: absent
pass substitution reasons: absent
skipped-pass reasons: absent
```

## Frame and rollback gaps

```txt
PostProcessFrameResult: absent
submitted post-process frame ID: absent
visible post-process frame ID: absent
FirstVisiblePostProcessFrameAck: absent
failed resource retirement receipt: absent
predecessor output preservation receipt: absent
stale resource/pass result rejection: absent
context-loss profile recovery receipt: absent
```

## Validation gaps

```txt
graph mutation fixtures: absent
renderer capability fixtures: absent
full/reduced/fallback fixtures: absent
unsupported mandatory pass fixture: absent
allocation and pass failure fixtures: absent
resize and DPR generation fixtures: absent
context-loss and recovery fixtures: absent
image capture tied to graph/profile: absent
source/build/Pages parity fixture: absent
```

## Preserved unresolved gaps

```txt
browser startup readiness
runtime reset and replay authority
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

Post-processing is not proven until every declared pass is executed, explicitly substituted, intentionally skipped by an admitted policy, or rejected, and the resulting profile is bound to one accepted visible frame.