# Interaction Audit: Target Action Preflight Proof

**Timestamp:** `2026-07-10T04-58-56-04-00`

## Current interaction inputs

The content layer defines arrival interaction targets, but runtime action authority is not first-class yet.

The editor bridge can invoke runtime and scene commands, but those commands do not produce action-result proof rows.

## Needed preflight service

```txt
TargetActionPreflight {
  frameId,
  targetId,
  actionId,
  targetExists,
  actionAllowed,
  activeObjectiveId,
  reasonCode
}
```

## Rows to prove

```txt
arrival-path + progress action accepted
focal-tree + inspect action accepted
unknown target rejected
known target + wrong action rejected
repeat inspect unchanged/skipped
objective complete accepted
legacy state shape preserved
editor invoke row mirrors source action result
```

## Main interaction gap

The repo should not add more interactive controls yet.

First prove the target/action policy in DOM-free rows, then expose the same rows through `GameHost` and the editor bridge.
