# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T14-08-51-04-00`

## Goal

Preserve the current meadow rendering while turning the authored path and tree objectives into one canonical, deterministic interaction transaction. Do not implement this before the runtime-session, host-gateway, workspace, clock and committed-frame prerequisites are stable.

## Plan ledger

- [ ] Preserve current visual composition and render-plan contracts.
- [ ] Complete Runtime Session Lifecycle Authority first.
- [ ] Complete Host Capability Gateway and remove raw public authority.
- [ ] Complete workspace path containment and typed filesystem results.
- [ ] Complete runtime-step admission and monotonic clock policy.
- [ ] Complete committed-frame observation before progression is projected.
- [ ] Add one immutable `InteractionCommand` envelope.
- [ ] Add session, epoch, scene, sequence and action admission.
- [ ] Build canonical interaction-target and objective-definition indexes.
- [ ] Add path-progress evaluation for `arrival-path`.
- [ ] Add inspection evaluation for `focal-tree`.
- [ ] Add scene-scoped inspection and objective progress ledgers.
- [ ] Return typed accepted, rejected, stale, duplicate and failed results.
- [ ] Make duplicate inspections and completions no-mutation.
- [ ] Advance active objective and story beats from canonical completion receipts.
- [ ] Add browser and editor command parity adapters.
- [ ] Add bounded interaction and objective journals.
- [ ] Project progression revision into state, diagnostics and committed frames.
- [ ] Add path, inspect, duplicate, stale and reset fixtures.
- [ ] Wire interaction/objective fixtures into `npm run check`.
- [ ] Run `npm run check` and a browser smoke after implementation.

## Required implementation order

```txt
1. interaction-command-kit
2. interaction-command-id-kit
3. interaction-admission-kit
4. canonical-interaction-target-index-kit
5. objective-definition-index-kit
6. player-action-state-kit
7. path-progress-evaluator-kit
8. inspect-target-evaluator-kit
9. objective-progress-ledger-kit
10. objective-completion-result-kit
11. story-beat-transition-kit
12. interaction-command-journal-kit
13. interaction-projection-kit
14. interaction-debug-observation-kit
15. interaction-objective-fixture-kit
16. browser-interaction-parity-smoke-kit
```

Existing owners to update before adding local packages:

```txt
into-the-meadow-game-dsk
meadow-player-dsk
meadow-input-dsk
meadow-interaction-dsk
meadow-objective-dsk
meadow-story-dsk
web-host-dsk
meadow-diagnostics-dsk
browser editor adapter
Node headless editor adapter
```

## Acceptance cases

```txt
path progress 0.10 remains incomplete
path progress 0.35 completes walk-the-path exactly once
focal-tree inspect completes inspect-tree exactly once
browser and editor ingress produce the same command result
accepted completion advances objective/story state deterministically
reset restores initial objective and retires old commands
committed frame cites the consumed progression revision
```

## Rejection cases

```txt
unknown target ID
wrong action for target
inactive scene target
stale session or epoch
non-monotonic sequence
duplicate inspection
duplicate completion
invalid or non-finite progress
out-of-range inspect evidence
command after stop or reset retirement
```

## Acceptance criteria

```txt
all gameplay actions enter one admission function
submitted descriptors are never trusted as canonical definitions
path and inspect mutations are typed and deterministic
objective predicates run from canonical definitions
completion receipts are exactly-once
story transitions cite completion receipts
browser and editor adapters have parity
journals are bounded
reset and lifecycle retirement reject stale work
state, diagnostics and committed frame share one revision
```

## Ordered architecture queue

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Step Admission and Clock Integrity
5. Source Provider Authority
6. Render Topology Identity Authority
7. Committed Frame Observation Authority
8. Interaction Command and Objective Authority
9. DSK Registry Consumption Proof
```

## Deferred until after this gate

```txt
additional objectives
inventory or dialogue interactions
save/load of progression
replay and multiplayer command transport
promoting generic objective kits into stable catalogs
```

Do not add more authored objectives while the current two cannot be executed or proven through runtime commands.
