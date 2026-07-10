# Interaction Audit: Target Action Result Fixture Map

## Current interaction model

The route has static interaction descriptors but no browser input loop for them yet.

```txt
arrival-path
focal-tree
path-progress objective
inspect objective
```

## Gap

There is no source-owned preflight or result contract for target/action pairs.

Missing rows:

```txt
known target + supported action
known target + unsupported action
missing target
unknown action
accepted path progress
inspect focal tree accepted
no-change repeat inspect
objective completed
objective still pending
```

## Next fixture map

A DOM-free fixture should call the target/action contracts directly and assert stable rows before any browser binding.

## Deferral

Do not add browser interaction wiring until these result rows are fixture-proven and exposed additively through GameHost.
