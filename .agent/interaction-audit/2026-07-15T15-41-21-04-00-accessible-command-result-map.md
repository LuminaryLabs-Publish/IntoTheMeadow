# Interaction Audit: Accessible Command and Result Map

**Timestamp:** `2026-07-15T15:41:21-04:00`  
**Status:** `accessible-semantic-projection-authority-audited`

## Summary

No focusable gameplay command surface currently exists in the document. Future keyboard, pointer, touch, switch or assistive-technology commands need one shared action identity and one accepted result path rather than separate DOM and canvas behavior.

## Plan ledger

**Goal:** make gameplay commands discoverable and operable through semantic controls while keeping action admission in the game domain.

- [x] Identify current document controls.
- [x] Confirm no gameplay controls or focus owner are present.
- [x] Preserve `meadow-input-dsk` and `meadow-interaction-dsk` ownership.
- [x] Define command, result, focus and announcement identities.
- [ ] Implement later.

## Current command surface

```txt
focusable gameplay controls: none
keyboard instructions: none
interaction list: none
current objective control: none
focus order owner: none
focus restoration: none
command result announcement: none
```

## Required command path

```txt
AccessibleCommandIntent {
  commandId
  actionId
  targetId
  deviceClass
  hostGeneration
  sessionRevision
  expectedStateRevision
}

  -> input normalization
  -> gameplay command admission
  -> InteractionResult or ObjectiveResult
  -> SemanticUiEvent
  -> AccessibilityProjectionResult
  -> focus and announcement receipts
```

## Result classes

```txt
accepted
rejected
unsupported
stale
retired
duplicate
blocked-by-context
no-valid-target
```

## Focus rule

The accessibility layer may request focus placement or restoration only after an accepted semantic result. It must not create gameplay acceptance by moving focus or by directly mutating game state.

## Announcement rule

Announcements are deduplicated by semantic event identity and state revision. Repeated RAF snapshots must not repeat story, objective or interaction messages.