# Current Audit: Editor Mutation and Visible-Frame Settlement Authority

**Updated:** `2026-07-15T01-39-38-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `editor-mutation-visible-frame-settlement-authority-audited`  
**Immediate predecessor:** `post-process-descriptor-execution-authority-central-reconciled`

## Summary

The browser editor environment mutates the same game instance owned by the autonomous RAF host. `runtime.tick` calls `game.tick` once and `runtime.reset` calls `game.reset`, but neither command pauses the RAF lease, refreshes `lastPlan`, renders, or waits for a matching canvas frame.

The command result reports `completed` immediately. A following `renderer.capture` can therefore pair new game state with an old canvas and old renderer snapshot. The next RAF can then tick again before rendering, so one editor step can become two simulation advances before the first visible acknowledgement.

## Plan ledger

**Goal:** bind each editor mutation, simulation revision, render plan, renderer result, capture, and visible frame into one accepted transaction.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only IntoTheMeadow by the oldest synchronized timestamp.
- [x] Read browser bridge, web host, game aggregate, Node environment, scenarios, and browser observation script.
- [x] Preserve all 44 kit surfaces and services.
- [x] Add the timestamped audit family.
- [x] Change documentation only and target `main`.
- [ ] Implement authority and executable fixtures later.

## Main findings

```txt
browser runtime.tick mutates live game directly: yes
browser runtime.reset mutates live game directly: yes
RAF suspended during editor mutation: no
lastPlan refreshed by editor mutation: no
renderer invoked by editor mutation: no
command result carries state revision: no
command result carries render/frame revision: no
capture binds to mutation result: no
stale canvas rejection: no
first matching visible-frame acknowledgement: no
```

## Browser and Node semantic drift

```txt
browser runtime.tick arguments: dt, time
node runtime.tick arguments: dt, ticks
browser reset invalidates enhancer: no
node reset invalidates enhancer: yes
browser reset owns editor time: no
node reset sets editor time to zero: yes
browser renderer.compare capability: absent
node renderer.compare capability: present
shared protocol label: nexus-headless-editor-environment/v1
versioned parity manifest: absent
```

## Required parent domain

`meadow-editor-mutation-visible-frame-settlement-authority-domain`

## Required transaction

```txt
EditorMutationCommand
  -> bind EditorCommandId, HostGeneration, RuntimeRevision and expected FrameRevision
  -> acquire or suspend the browser RAF lease
  -> classify tick, reset or other state mutation
  -> settle exactly one game-state revision
  -> rebuild and validate one render plan
  -> render one matching renderer revision
  -> publish EditorMutationResult
  -> acknowledge FirstVisibleEditorMutationFrameAck
  -> permit capture or comparison only against the acknowledged frame
  -> reject stale, duplicate, retired and mixed-surface work
  -> resume the admitted RAF policy
```

## Boundary

Documentation only. No runtime, renderer, editor bridge, scenario, test, build, workflow, or deployment code changed.
