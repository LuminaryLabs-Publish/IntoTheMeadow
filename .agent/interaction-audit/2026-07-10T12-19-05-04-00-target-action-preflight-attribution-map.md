# Interaction Audit: Target Action Preflight Attribution Map

**Timestamp:** `2026-07-10T12-19-05-04-00`

## Current interaction content

```txt
ARRIVAL_INTERACTION_TARGETS
ARRIVAL_OBJECTIVES
STORY_BEATS
```

## Current gap

```txt
interaction targets exist as content
objectives exist as content
no preflight row maps target id to allowed actions
no action result row records accepted/rejected/skipped/unchanged
no wrong-target / unknown-action / missing-target reason rows
no editor command observation row links to action result
```

## Required preflight row

```txt
TargetActionPreflightRow {
  frameId
  targetId
  actionId
  targetFound
  actionAllowed
  objectiveIds
  status
  reason
}
```

## Required result row

```txt
ActionResultRow {
  actionFrameId
  preflightId
  status
  reason
  objectiveProgressRows
  stateChanged
}
```

## Recommendation

Add target/action preflight attribution before wiring browser input or expanding editor commands.
