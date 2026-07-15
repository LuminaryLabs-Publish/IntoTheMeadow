# Current Audit: Accessible Semantic Projection Authority

**Updated:** `2026-07-15T15-41-21-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `accessible-semantic-projection-authority-audited`  
**Immediate predecessor:** `audio-event-projection-authority-central-reconciled`

## Summary

The active browser route continuously updates a WebGL canvas while the accessible document remains effectively static. Authored story, objective and interaction labels are not projected into semantic DOM, and the planned UI/input/interaction/story/objective DSKs are not active-v0.1.

The result is a bounded projection gap: a visible frame can succeed without a matching accessible state, operable command surface, focus result, announcement result or convergence acknowledgement.

## Plan ledger

**Goal:** bind accepted game state, semantic browser output, keyboard commands, focus, announcements and visible-frame evidence into one accessibility projection contract.

- [x] Compare Publish inventory and central tracking.
- [x] Exclude TheCavalryOfRome.
- [x] Select only IntoTheMeadow by oldest synchronized timestamp.
- [x] Read the document, host, DSK registry, service map, state and semantic content.
- [x] Preserve all 44 kit surfaces and services.
- [x] Add the timestamped accessibility audit family.
- [x] Change documentation only and target `main`.
- [ ] Implement authority and fixtures later.

## Main findings

```txt
canvas role=img: present
canvas alternative bound to state: no
semantic game region state: absent
focusable gameplay commands: absent
keyboard command descriptions: absent
focus owner/restoration: absent
story announcement projection: absent
objective status projection: absent
interaction affordance projection: absent
live-region policy: absent
reduced-motion policy: absent
contrast/text-scale policy: absent
AccessibilityProjectionResult: absent
FirstAccessibleFrameAck: absent
FirstVisualAccessibleConvergenceAck: absent
```

## Current proof gap

```txt
static labels prove accessible gameplay: no
keyboard-only fixture: absent
accessibility-tree snapshot fixture: absent
screen-reader semantics fixture: absent
focus order and restore fixture: absent
announcement deduplication fixture: absent
reduced-motion fixture: absent
forced-colors fixture: absent
200% text/reflow fixture: absent
source/build/Pages accessibility parity: absent
```

## Required parent domain

`meadow-accessible-semantic-projection-authority-domain`

## Required transaction

```txt
AccessibilityProjectionCommand
  -> bind document, host, session, state and visible-frame revisions
  -> derive immutable accessible read model
  -> project structured story, objective and interaction semantics
  -> publish allowlisted keyboard commands
  -> settle focus order and restoration
  -> publish deduplicated announcements
  -> update canvas alternative description
  -> apply accessibility preferences
  -> reject stale or retired work
  -> publish AccessibilityProjectionResult
  -> acknowledge FirstAccessibleFrameAck
  -> acknowledge FirstVisualAccessibleConvergenceAck
```

## Boundary

Documentation only. No runtime, HTML, CSS, content, renderer, editor, accessibility, test, workflow or deployment code changed.