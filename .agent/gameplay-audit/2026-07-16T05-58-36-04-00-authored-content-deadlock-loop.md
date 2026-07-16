# Gameplay Audit: Authored Content Deadlock Loop

**Timestamp:** `2026-07-16T05-58-36-04-00`

## Summary

The current runtime advances time only, but its authored progression records already depend on cross-module identifiers. Once exploration services are activated, one stale target, action, trigger or initial-state ID can silently produce an objective or story path that never settles.

## Plan ledger

**Goal:** prevent gameplay admission when authored progression contains unresolved or unreachable edges.

- [x] Trace initial scene, objective and story references.
- [x] Trace objective-to-target/action edges.
- [x] Trace story-trigger edges.
- [x] Define accepted, rejected and unreachable outcomes.
- [ ] Implement progression and graph fixtures later.

## Source-derived failure loop

```txt
a target or action is renamed in one content module
  -> another module keeps the old string reference
  -> startup DSK validation passes
  -> render-plan validation passes
  -> visible scene starts
  -> player performs the apparent required action
  -> objective or story transition cannot resolve
  -> progression remains active forever without a typed failure
```

## Required settlement

```txt
ContentGraphAdmissionResult.status = accepted
  -> gameplay may create initial progression state

ContentGraphAdmissionResult.status = rejected
  -> gameplay state is not created
  -> semantic startup failure identifies every invalid edge

ContentGraphAdmissionResult.status = accepted-with-optional-unreachable
  -> only explicitly optional content may remain unreachable
  -> required progression nodes still form a reachable path
```

## Boundary

No claim is made that the current checked-in content is broken. The checked-in IDs currently agree; the missing authority is what would keep them agreeing through future edits and editor mutations.