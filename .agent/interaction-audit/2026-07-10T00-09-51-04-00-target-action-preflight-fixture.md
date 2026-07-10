# Interaction Audit: Target Action Preflight Fixture

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T00-09-51-04-00`

## Interaction source today

The repo has source descriptors for objectives and interaction targets, but no browser or DOM-free action authority consumes them yet.

Current target descriptors:

```txt
focal-tree: inspectable, requiredAction inspect, radius 4.5
arrival-path: path, requiredAction path-progress, radius 32
```

Current objective descriptors:

```txt
walk-the-path: path-progress on arrival-path, complete at progress >= 0.35
inspect-tree: inspect focal-tree, complete when inspected true
```

## Preflight contract needed

```txt
ActionFrame
  -> action id
  -> target id
  -> payload
  -> source state snapshot
  -> target lookup
  -> action/target compatibility check
  -> objective applicability check
  -> stable accepted/rejected reason
  -> ActionResult
```

## Required reasons

```txt
accepted.path_progress.recorded
accepted.objective.completed
accepted.inspect.recorded
rejected.target_missing
rejected.action_missing
rejected.action_target_mismatch
rejected.progress_below_threshold
unchanged.no_action
```

## Fixture before browser wiring

The next implementation should prove target/action rows in a DOM-free fixture before adding pointer, keyboard, click, or HUD interaction wiring.

## Deferrals

```txt
browser input wiring
camera/control changes
new target types
new objective content
HUD objective projection
save/load progression
```
