# Render Audit: Canvas-Only Semantic Frame Gap

**Timestamp:** `2026-07-15T15:41:21-04:00`  
**Status:** `accessible-semantic-projection-authority-audited`

## Summary

The WebGL frame can update continuously while the document's accessible representation remains unchanged. The canvas has one static image label, the debug HUD is normally hidden and no accepted state revision is bound to semantic DOM or an accessibility acknowledgement.

## Plan ledger

**Goal:** require every accepted visual state that matters to play or understand the meadow to have a matching semantic projection without making the DOM responsible for rendering.

- [x] Inspect canvas, HUD, loading and frame-update paths.
- [x] Confirm static canvas labeling.
- [x] Confirm no live semantic projection during normal frames.
- [x] Define visual/accessibility convergence evidence.
- [ ] Implement and capture browser evidence later.

## Current render path

```txt
RAF timestamp
  -> game tick
  -> enhanced render plan
  -> render contract validation
  -> WebGL frame
  -> optional debug metrics
  -> next RAF
```

## Current document representation

```txt
main aria-label: Into The Meadow game
canvas role: img
canvas aria-label: A meadow path with grass, stones, flowers, and a focal tree
HUD: hidden unless debug
status live-region semantics: absent
loading live-region semantics: absent
state-linked canvas description: absent
```

## Gap

The canvas label describes a static scene, not the current objective, available interaction, story beat, player location, failure state or lifecycle state. A successful renderer call therefore cannot prove that nonvisual users received the same accepted state.

## Required evidence

```txt
VisibleFrameRevision
AccessibleStateRevision
AccessibilityProjectionResult
canvas alternative revision
story announcement revision
objective projection revision
interaction affordance revision
focus revision
FirstAccessibleFrameAck
FirstVisualAccessibleConvergenceAck
```

## Claim boundary

No visual defect or screen-reader failure was reproduced. The finding is derived from source ownership and the absence of a state-bound semantic frame path.