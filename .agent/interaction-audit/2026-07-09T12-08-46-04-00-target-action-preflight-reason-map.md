# Interaction Audit — Target Action Preflight Reason Map

**Timestamp:** `2026-07-09T12-08-46-04-00`

## Current interaction state

`IntoTheMeadow` has interaction-target descriptors and objective descriptors, but no runtime interaction authority yet.

The current route does not run a source-owned command path from target/action input into state mutation, rejection, or objective progress.

## Required interaction authority

```txt
input target id
  -> target lookup
  -> allowed action lookup
  -> current objective lookup
  -> state eligibility check
  -> accepted/rejected/no-op result
  -> stable reason code
```

## First reason catalog

```txt
accepted.path_progress
accepted.inspect_target
accepted.objective_completed
noop.target_already_inspected
rejected.unknown_target
rejected.unknown_action
rejected.action_not_allowed_for_target
rejected.objective_not_active
rejected.missing_action_payload
```

## Required preflight rows

```txt
arrival-path + path-progress -> accepted
focal-tree + inspect -> accepted
focal-tree + path-progress -> rejected.action_not_allowed_for_target
missing-target + inspect -> rejected.unknown_target
arrival-path + unknown-action -> rejected.unknown_action
repeat focal-tree + inspect -> noop.target_already_inspected
```

## Output shape

Each interaction row should include:

```txt
id
targetId
action
status
reason
objectiveId
before
next
diff
journal
```

## Browser integration rule

Do not attach new pointer, keyboard, or UI interactions before the DOM-free reason matrix is proven. Browser input should be a consumer of this contract, not the authority.
