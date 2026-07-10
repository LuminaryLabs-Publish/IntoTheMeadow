# Command Preflight and Result Journal Gap

**Timestamp:** `2026-07-10T18-22-01-04-00`

## Existing descriptors

```txt
arrival-path supports path-progress
focal-tree supports inspect
walk-the-path requires path-progress and progressAtLeast 0.35
inspect-tree requires inspect and inspected true
```

## Missing interaction chain

```txt
raw input
  X command normalization
  X sequence allocation
  X target lookup
  X supported-action check
  X range/precondition check
  X accepted/rejected/no-op result
  X state mutation
  X event emission
  X objective evaluation
  X bounded journal
```

## Required preflight reasons

```txt
accepted
unknown-command
unknown-target
unsupported-action
invalid-value
out-of-range
objective-not-active
already-completed
already-inspected
no-state-change
```

## Required journal row

```txt
{
  sequence,
  frameId,
  command,
  status,
  reason,
  targetId,
  mutations,
  events,
  stateFingerprintBefore,
  stateFingerprintAfter
}
```

## Retention rule

Retain an immutable bounded window suitable for diagnostics and fixtures. Do not clear results at the next frame. Provide the latest sequence and a stable query method through GameHost and the editor bridge.

## Entry-point rule

Browser input, editor invocation, and DOM-free fixtures must call the same dispatcher. No entry point may bypass preflight or mutate state directly.

## Fixture matrix

```txt
valid path progress
invalid negative/NaN path progress
unknown target
unsupported action on known target
out-of-range inspect
successful inspect
duplicate inspect
objective completion order
reset after completion
same-sequence replay
```