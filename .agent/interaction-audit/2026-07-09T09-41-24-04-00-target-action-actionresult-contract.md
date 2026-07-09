# Interaction Audit — Target Action ActionResult Contract

**Timestamp:** `2026-07-09T09-41-24-04-00`

## Current interaction source

`ARRIVAL_INTERACTION_TARGETS` currently provides two source targets:

```txt
focal-tree
  type: inspectable
  requiredAction: inspect
  radius: 4.5

arrival-path
  type: path
  requiredAction: path-progress
  radius: 32
```

## Current runtime behavior

The browser route has no live interaction reducer yet. Targets are content descriptors consumed only as content counts in diagnostics.

## Next contract

Create pure action frames:

```txt
{ action: "path-progress", targetId: "arrival-path", progress: 0.35 }
{ action: "inspect", targetId: "focal-tree" }
```

Return stable action results:

```txt
accepted / target-known / objective-progressed
accepted / target-known / objective-completed
rejected / target-missing
rejected / action-target-mismatch
unchanged / already-inspected
unchanged / objective-already-complete
```

## Consumer rule

No DOM, canvas, pointer, keyboard, or browser state should be required to replay these rows. Live input can consume the reducer after fixture rows are proven.
