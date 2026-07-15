# Next Steps

**Updated:** `2026-07-15T15-41-21-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `accessible-semantic-projection-authority-audited`

## Summary

Activate semantic accessibility only after gameplay state and command admission have stable revisions. Start with one immutable read model, then add structured DOM, keyboard commands, focus ownership, announcements, preferences and executable parity fixtures.

## Plan ledger

**Goal:** create the smallest reliable path from accepted meadow state to one matching accessible browser frame.

### State and semantic events

- [ ] Add `StateRevision`, `SemanticUiEventId` and `AccessibleStateRevision`.
- [ ] Derive one immutable read model from accepted state.
- [ ] Publish scene, objective, story, interaction and lifecycle fields.
- [ ] Deduplicate repeated RAF snapshots and event replays.

### Structured DOM

- [ ] Add one named game region.
- [ ] Add current-objective and story/status regions.
- [ ] Add an available-interactions list.
- [ ] Add a command-help surface.
- [ ] Derive the canvas alternative description from accepted state.

### Commands and focus

- [ ] Publish allowlisted keyboard commands from the action map.
- [ ] Route all controls through normal gameplay admission.
- [ ] Own one focus order and focus generation.
- [ ] Restore focus after overlays, route changes and host replacement.
- [ ] Reject stale focus requests.

### Announcements and preferences

- [ ] Add polite story/status and assertive fatal live regions.
- [ ] Deduplicate announcements by semantic event and state revision.
- [ ] Observe reduced-motion and forced-colors preferences.
- [ ] Add text scaling, reflow and focus-indicator policy.
- [ ] Publish preference-change results.

### Evidence

- [ ] Publish `AccessibilityProjectionResult`.
- [ ] Publish `FocusSettlementResult` and `AnnouncementProjectionResult`.
- [ ] Publish `FirstAccessibleFrameAck`.
- [ ] Publish `FirstVisualAccessibleConvergenceAck`.
- [ ] Bind accessibility-tree snapshots to commit and state/frame revisions.

### Fixtures

- [ ] Add keyboard-only navigation and command fixtures.
- [ ] Add semantic-region and accessible-name fixtures.
- [ ] Add story/objective/interaction announcement fixtures.
- [ ] Add focus order and restoration fixtures.
- [ ] Add reduced-motion, forced-colors and 200% text fixtures.
- [ ] Add source, built-output and GitHub Pages parity fixtures.

## Required result

```txt
AccessibilityProjectionResult {
  hostGeneration
  sessionRevision
  stateRevision
  visibleFrameRevision
  accessibleStateRevision
  semanticEventIds
  projectedRegionIds
  commandIds
  focusRevision
  announcementRevision
  accessibilityPolicyRevision
  canvasAlternativeRevision
  status
  reason
}
```

## Preserved dependencies

Audio projection, shader precision, editor mutation settlement, post-process execution, startup readiness, reset/replay, DSK capability admission, browser observation, cache coherence, viewport authority, editor lifecycle, host retirement, provider parity, WebGL recovery, frame scheduling, progression, grass visibility and save/migration remain separate bounded work.