# Interaction Audit: Input, Movement, Inspect and Objective Admission Map

**Generated:** `2026-07-12T17-49-51-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

There is currently no runtime ingress for keyboard, pointer or editor gameplay actions. This map defines the admission sequence needed to prevent raw device state, stale targets or duplicate progression from mutating gameplay.

## Plan ledger

**Goal:** admit every exploration action against explicit session, capability, state and evidence revisions.

- [x] Identify missing ingress and admission checks.
- [x] Define movement and inspection evidence.
- [x] Define objective/story admission.
- [x] Define zero-mutation rejection.
- [ ] Implement command routing and tests.

## Command envelope

```txt
GameplayCommand {
  commandId
  sessionId
  capabilityGeneration
  expectedGameplayRevision
  inputContext
  action
  payload
}
```

## Movement admission

```txt
normalize input sample
  -> validate movement capability and context
  -> reject stale or duplicate command
  -> build motion proposal
  -> sample terrain contact
  -> project onto authored path/corridor
  -> compute successor path progress
  -> produce movement evidence
```

## Inspect admission

```txt
InspectCommand
  -> require exact targetId
  -> validate target-index revision
  -> validate committed player transform revision
  -> compute distance and affordance
  -> reject unknown, stale, hidden or out-of-range target
  -> produce InspectAdmissionResult
```

## Progression admission

```txt
candidate successor state
  -> evaluate 0.25 path-discovery threshold
  -> evaluate 0.35 walk objective threshold
  -> evaluate inspect:focal-tree trigger
  -> check objective/story completion ledgers
  -> suppress duplicates
  -> produce ordered transition candidates
```

## Atomic commit

```txt
all evidence accepted
  -> commit player + path + interaction + objective + story together
  -> emit one GameplayResult
  -> record DSK service-consumption receipts
```

## Rejection guarantees

```txt
no implicit selected-target fallback
no threshold evaluation against an uncommitted proposal
no duplicate command replay
no duplicate objective or story completion
no partial player mutation after progression failure
no feedback or save projection after rejection
```

## Validation boundary

No runtime ingress or admission implementation was added. Existing editor/capture capabilities remain observational rather than gameplay command capabilities.
