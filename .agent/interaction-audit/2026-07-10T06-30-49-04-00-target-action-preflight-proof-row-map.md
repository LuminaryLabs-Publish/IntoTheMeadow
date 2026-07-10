# Interaction Audit: Target Action Preflight Proof Row Map

**Run:** `2026-07-10T06-30-49-04-00`

## Current interaction descriptors

```txt
focal-tree
  type: inspectable
  requiredAction: inspect
  position: { x: 0, y: 1.4, z: 24 }
  radius: 4.5

arrival-path
  type: path
  requiredAction: path-progress
  position: { x: 0, y: 0, z: -8 }
  radius: 32
```

## Current interaction behavior

Descriptors exist, but runtime interaction execution does not yet exist.

`advanceGameState()` does not read targets, actions, player position, path progress, inspection state, or objective completion.

## Required preflight rows

```txt
target found
target missing
action matches target policy
action mismatches target policy
player within target radius
player outside target radius
objective requires target/action
objective already completed
```

## Required result statuses

```txt
accepted
rejected
skipped
unchanged
```

## Next interaction gate

Add target/action preflight and result rows before any browser input or click/tap interaction wiring.
