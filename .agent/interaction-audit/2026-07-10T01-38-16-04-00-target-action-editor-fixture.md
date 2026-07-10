# Interaction Audit: Target Action Editor Fixture

**Timestamp:** `2026-07-10T01-38-16-04-00`

## Interaction read

The repo contains source descriptors for interaction targets, but the runtime state loop has not promoted them into action/result records yet.

The headless editor bridge gives a useful command surface, but it still needs action proof rows tied back to targets and objectives.

## Current interaction descriptors

```txt
focal-tree
  -> type: inspectable
  -> requiredAction: inspect
  -> position: { x: 0, y: 1.4, z: 24 }
  -> radius: 4.5

arrival-path
  -> type: path
  -> requiredAction: path-progress
  -> position: { x: 0, y: 0, z: -8 }
  -> radius: 32
```

## Current gap

```txt
no ActionFrame contract
no target lookup/preflight helper
no target distance or eligibility rows
no ActionResult for accepted/rejected/skipped/unchanged
no objective progress rows
no editor command row tied to objective outcome
no GameHost action proof projection
```

## Interaction proof rows needed

```txt
target_lookup_row
target_action_preflight_row
action_frame_row
action_result_row
objective_progress_row
editor_command_row
editor_observation_row
GameHost_action_proof_row
```

## Safe implementation rule

Add DOM-free target/action fixtures before browser input wiring.

This keeps the action contract stable before the route listens to pointer or keyboard interaction actions.

## Next safe ledge

```txt
IntoTheMeadow Headless Render Action Proof Catch-up + GameHost Ledger Gate
```
