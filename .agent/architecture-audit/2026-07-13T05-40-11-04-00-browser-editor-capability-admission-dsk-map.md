# Architecture Audit: Browser Editor Capability Admission DSK Map

**Generated:** `2026-07-13T05-40-11-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The browser editor bridge currently combines observation, mutation, error capture and lifecycle concerns in one global object. Direct tick/reset capabilities bypass RAF ownership and state/render revision admission. The missing parent must coordinate editor commands without moving gameplay equations, rendering or browser event implementation into the authority.

## Plan ledger

**Goal:** define one bounded domain that classifies editor capabilities, admits mutations at scheduler boundaries and publishes correlated results.

- [x] Preserve existing game, host, renderer and editor responsibilities.
- [x] Separate observation from mutation capability classes.
- [x] Define environment, command, scheduler, state and render identities.
- [x] Define stale, duplicate, retired and unavailable rejection states.
- [x] Define lifecycle retirement and bounded error observation.
- [ ] Implement only after the frame scheduler exposes a lease/step boundary.

## Existing ownership

```txt
web-host-dsk
  -> boot, RAF loop, lastPlan, lastRender, stop/start and fatal projection

into-the-meadow-game-dsk
  -> immutable game state, tick, reset, snapshot and diagnostics

meadow-render-host-dsk / meadow-webgl-renderer-v2-kit
  -> render-plan ingestion, GPU ownership, draw submission and snapshots

browser editor bridge
  -> capability registry, generic invoke wrapper, canvas capture,
     browser error listeners and global environment exposure

GameHost
  -> public observations plus raw game reference
```

## Missing parent

```txt
meadow-browser-editor-capability-admission-authority-domain
```

It owns:

```txt
editor environment identity and generation
capability registry and policy revision
command identity and duplicate handling
observation-versus-mutation classification
expected state/render revision admission
scheduler lease and simulation-boundary adoption
terminal capability results
render correlation and visible-frame acknowledgement
bounded redacted command/error journals
environment retirement and predecessor listener cleanup
```

It does not own:

```txt
movement or gameplay equations
render-plan generation
WebGL resource creation or draw submission
canvas encoding
browser event implementation
headless filesystem policy
```

## Dependency direction

```txt
browser/headless caller
  -> EditorCapabilityCommand
  -> environment + capability policy admission
  -> observation path
       -> immutable snapshot result
     mutation path
       -> scheduler lease
       -> admitted tick/reset boundary
       -> state transition result
       -> render refresh requirement
  -> EditorCapabilityResult
  -> first matching EditorVisibleFrameAck
```

## Required result

```txt
EditorCapabilityResult {
  commandId
  environmentId
  environmentGeneration
  capabilityId
  capabilityClass
  status
  reason
  capabilityRegistryRevision
  policyRevision
  schedulerGeneration
  stateRevisionBefore
  stateRevisionAfter
  renderRevisionBefore
  renderRevisionAfter
  visibleFrameRequired
  visibleFrameAckId?
  observationId
}
```

## Invariants

```txt
observation capabilities perform no state mutation
mutation capabilities require one exclusive scheduler lease
stale, duplicate, unavailable or retired commands perform zero mutation
one accepted command publishes one terminal result
state and render revisions cannot be presented as correlated without an acknowledgement
stop or retire rejects later mutation commands
bridge replacement retires predecessor listeners before publication
error and command journals are bounded and generation-scoped
raw game mutation is not a public supported capability
```

## Candidate kits

```txt
editor-environment-id-kit
editor-environment-generation-kit
editor-capability-registry-revision-kit
editor-capability-policy-kit
editor-command-id-kit
editor-capability-command-kit
editor-capability-classification-kit
editor-observation-admission-kit
editor-mutation-admission-kit
editor-argument-validation-kit
editor-expected-state-revision-kit
editor-scheduler-generation-kit
editor-scheduler-lease-kit
editor-step-boundary-kit
editor-tick-transaction-kit
editor-reset-transaction-kit
editor-state-transition-result-kit
editor-render-correlation-kit
editor-visible-frame-ack-kit
stale-editor-command-rejection-kit
retired-editor-environment-rejection-kit
editor-command-journal-kit
bounded-editor-error-journal-kit
editor-environment-retirement-kit
editor-capability-fixture-gate-kit
```

## Boundary

This is documentation only. No authority or scheduler lease exists in runtime source.
