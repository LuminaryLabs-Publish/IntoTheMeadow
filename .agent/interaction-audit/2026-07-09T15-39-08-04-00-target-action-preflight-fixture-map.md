# Interaction Audit: Target Action Preflight Fixture Map

**Timestamp:** `2026-07-09T15-39-08-04-00`

## Current interaction source

```txt
ARRIVAL_INTERACTION_TARGETS
  -> focal-tree inspectable target
  -> arrival-path path target

ARRIVAL_OBJECTIVES
  -> path-progress objective
  -> inspect objective
```

## Current runtime behavior

The route stores target and objective descriptors in `game.content`, but no browser input path currently creates an action envelope or dispatches it into state. `advanceGameState()` ignores gameplay actions and records only frame/time.

## Missing interaction services

```txt
target lookup service
  maps action target id to descriptor.

action preflight service
  validates target existence, action compatibility, radius/position when available, and objective eligibility.

action result service
  records accepted/rejected/skipped status and mutation summary.

objective progress service
  updates path progress, inspection state, active objective, completed objectives, and story beats.

fixture row service
  proves action behavior without DOM, canvas, or renderer.
```

## Required next preflight reasons

```txt
accepted:path-progress
accepted:inspect
rejected:missing-target
rejected:wrong-action-for-target
rejected:objective-not-active
rejected:progress-below-threshold
skipped:unknown-action
unchanged:already-completed
```

## Splice rule

Do not wire pointer, keyboard, or hotspot browser controls until the preflight/result helpers pass fixture rows independently.
