# Accessibility Audit: Semantic DOM, Focus and Announcement Contract

**Timestamp:** `2026-07-15T15:41:21-04:00`  
**Status:** `accessible-semantic-projection-authority-audited`

## Summary

The document currently has static structural labels but no accepted semantic read model, operable gameplay controls, focus lifecycle or announcement policy. Accessibility must be a versioned projection of game truth, not an independent second game state.

## Plan ledger

**Goal:** specify the browser accessibility contract needed to expose the meadow's current state and commands without coupling assistive technology directly to internal runtime objects.

- [x] Record current semantic document surfaces.
- [x] Record missing projection, focus and announcement ownership.
- [x] Define immutable read-model fields.
- [x] Define preference and lifecycle requirements.
- [x] Define acknowledgement and fixture requirements.
- [ ] Implement later.

## Accessible read model

```txt
AccessibleMeadowReadModel {
  hostGeneration
  sessionRevision
  stateRevision
  visibleFrameRevision
  sceneId
  sceneLabel
  playerLocationDescription
  activeObjectiveId
  activeObjectiveLabel
  completedObjectiveIds
  availableInteractions[]
  currentStoryText
  commandDescriptions[]
  lifecycleState
  accessibilityPolicyRevision
}
```

## DOM projection contract

```txt
one named game region
one current objective region
one story/status region
one available-interactions list
one command-help surface
one non-interrupting status live region
one urgent failure live region
structured buttons only for admitted commands
canvas alternative derived from accepted state
```

## Focus contract

```txt
focus owner generation
ordered focusable command list
modal or overlay focus containment
focus restoration target
route and host retirement handling
stale focus-request rejection
focus settlement receipt
```

## Announcement contract

```txt
announce accepted semantic events only
deduplicate by event ID and state revision
do not announce every RAF snapshot
do not repeat unchanged objective text
separate polite story/status from assertive fatal failures
publish announcement result and reason
```

## Preference contract

```txt
prefers-reduced-motion observation
application motion policy revision
high-contrast or forced-colors observation
text scaling and reflow policy
focus indicator policy
preference-change result
```

## Completion evidence

```txt
AccessibilityProjectionResult
FocusSettlementResult
AnnouncementProjectionResult
CanvasAlternativeResult
FirstAccessibleFrameAck
FirstVisualAccessibleConvergenceAck
keyboard-only fixture
screen-reader semantics fixture
focus restore fixture
reduced-motion fixture
forced-colors fixture
200% text fixture
source/build/Pages parity fixture
```

## Claim boundary

No conformance level is claimed. No automated accessibility scanner, assistive-technology test or manual keyboard review was executed.