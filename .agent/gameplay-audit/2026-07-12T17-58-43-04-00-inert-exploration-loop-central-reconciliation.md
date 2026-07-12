# Gameplay Audit: Inert Exploration Loop Central Reconciliation

**Generated:** `2026-07-12T17-58-43-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The authored loop is to walk the meadow path, discover the route, inspect the focal tree and advance objectives and story. The active loop changes only frame/time metadata, so every authored gameplay transition remains unreachable.

## Plan ledger

**Goal:** preserve the authored exploration design while defining the minimum deterministic runtime loop required to make it playable.

- [x] Reconcile authored and active loops.
- [x] Record accepted and rejected paths.
- [x] Preserve DSK ownership.
- [ ] Implement command ingress, movement, inspection and progression.

## Authored loop

```txt
move along path
  -> progress crosses 0.25
  -> emit path-discovery once
  -> progress crosses 0.35
  -> complete walk-the-path once

approach focal-tree
  -> query target against committed player transform
  -> inspect with valid identity and range evidence
  -> emit focal-tree story once
  -> complete inspect-tree once
```

## Active loop

```txt
tick
  -> frame += 1
  -> lastTick = { dt, time }
  -> player unchanged
  -> path progress unchanged
  -> interaction unchanged
  -> objectives unchanged
  -> story unchanged
```

## Accepted path

```txt
valid GameplayCommand
  -> deterministic movement or inspect candidate
  -> terrain/path or target evidence
  -> candidate objective/story transitions
  -> atomic gameplay commit
  -> typed accepted result
  -> feedback/save/render projection
```

## Rejected path

```txt
stale generation
unknown action
invalid payload
unready capability
invalid movement policy
unknown/out-of-range target
duplicate threshold/completion
  -> typed rejection
  -> zero gameplay mutation
  -> no save or visible successor result
```

## Completion boundary

Content counts, descriptor validity and a rendered meadow do not prove playability. Completion requires deterministic movement, target evidence, exactly-once progression and visible feedback across source, build and Pages.