# Known Gaps

**Updated:** `2026-07-15T01-39-38-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `editor-mutation-visible-frame-settlement-authority-audited`

## Summary

The bounded gap is editor command-to-frame truth. Browser editor mutations complete before the autonomous host has produced a matching render plan, renderer result, canvas image, or visible-frame acknowledgement.

## Plan ledger

**Goal:** record every missing identity, admission rule, scheduler guarantee, frame binding, parity rule, rollback guarantee, and fixture required for trustworthy editor mutation.

- [x] Record command and revision gaps.
- [x] Record RAF and mutation-admission gaps.
- [x] Record render, capture, reset, and parity gaps.
- [x] Record validation and deployment gaps.
- [ ] Implement and prove the authority later.

## Identity gaps

```txt
EditorCommandId: absent
HostGeneration: absent
RuntimeRevision: absent
RenderAttemptId bound to editor mutation: absent
RenderPlanRevision bound to editor mutation: absent
RendererRevision bound to editor mutation: absent
FrameRevision bound to editor mutation: absent
browser/Node capability manifest revision: absent
```

## Admission and scheduler gaps

```txt
editor mutation admission result: absent
expected-state compare-and-set: absent
browser RAF lease: absent
RAF suspension during visible editor mutation: absent
single-step ownership receipt: absent
duplicate command rejection: absent
concurrent command serialization: absent
stale predecessor command rejection: absent
```

## Render and capture gaps

```txt
post-mutation render-plan rebuild: absent
post-mutation renderer submission: absent
EditorMutationResult: absent
FirstVisibleEditorMutationFrameAck: absent
capture-to-command binding: absent
canvas/state/renderer revision equality check: absent
stale canvas rejection: absent
failed-render predecessor preservation receipt: absent
```

## Reset and parity gaps

```txt
browser reset time ownership: absent
browser reset enhancer invalidation: absent
browser reset render settlement: absent
browser and Node runtime.tick argument parity: absent
browser and Node runtime.reset result parity: absent
browser renderer.compare capability: absent
protocol-level capability compatibility decision: absent
```

## Validation gaps

```txt
browser tick-once fixture: absent
RAF double-step fixture: absent
capture-after-tick freshness fixture: absent
capture-after-reset freshness fixture: absent
browser/Node capability parity fixture: absent
failed-render rollback fixture: absent
source/build/Pages command-frame parity fixture: absent
```

## Preserved unresolved gaps

```txt
post-process execution
browser startup readiness
runtime reset and replay authority
DSK executable capability composition
browser observation provenance
render-plan and mesh-cache coherence
viewport authority
editor capability lifecycle
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

Editor mutation is not proven until one accepted command produces exactly one accepted runtime revision and, when classified visible, one matching acknowledged frame that capture and comparison can cite.
