# Gameplay Audit: Session Save and Restore Loop

**Timestamp:** `2026-07-17T08-45-46-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

Gameplay state currently exists only for the active runtime. Frame count, player state, active scene, session ID and progression are recreated from defaults after reload or a new host session.

## Interaction loop

```txt
boot
  -> create initial scene/session/player/progression state

play/runtime operation
  -> tick in-memory state
  -> inspect state and diagnostics
  -> optionally reset to defaults

reload or replacement
  -> runtime state is discarded
  -> no slot is selected
  -> no durable checkpoint is read
  -> initial state is created again
```

## Required gameplay contract

```txt
meaningful state transition
  -> eligible save trigger or explicit save command
  -> bounded durable gameplay projection
  -> atomic slot commit
  -> durable result surfaced to player/tooling

later boot
  -> slot admission
  -> compatibility and migration
  -> restored state application
  -> first matching gameplay/render frame
```

## Durable state candidates

```txt
activeSceneId
activeSessionId replacement metadata
player position/orientation/path progress
world state that is meant to persist
active and completed objectives
story beat progression
future inventory, interaction and ecology state
```

Render plans, diagnostics, browser errors, WebGL resources and transient frame timing should not be persisted as gameplay truth.

## Boundary

No save trigger, autosave policy, slot UX, restore behavior or gameplay fixture exists. This is proposed persistence work only.