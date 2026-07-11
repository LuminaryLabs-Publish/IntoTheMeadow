# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T04-49-30-04-00`

## Selection state

```txt
10 accessible LuminaryLabs-Publish repositories observed
TheCavalryOfRome excluded by rule
9 eligible repositories centrally tracked with root .agent state
IntoTheMeadow selected as oldest eligible central ledger entry
newer repo-local source-provider audit reconciled
only IntoTheMeadow changed in the Publish organization
```

## Interaction command authority gaps

### Authored commands cannot be dispatched

```txt
path-progress: declared
inspect: declared
public command API: absent
browser input adapter: absent
headless command capability: absent
```

### Tick does not mutate gameplay

`advanceGameState()` increments the frame and records `dt` and `time`. It does not read movement, actions, target IDs, positions, path progress or inspect intent.

### Player state is static

```txt
initial position: x=0, y=0, z=-36
initial pathProgress: 0
movement transition: absent
terrain/path projection: absent
camera/input ownership: absent
```

### Interaction targets have no runtime registry

`ARRIVAL_INTERACTION_TARGETS` contains the focal tree and arrival path, but no runtime service indexes them, measures distance, resolves affordances or rejects out-of-range actions.

### Objective predicates are not evaluated

```txt
walk-the-path completion: pathProgress >= 0.35
inspect-tree completion: inspected == true
predicate evaluator: absent
objective transition: absent
completion ledger mutation: absent
active objective advancement: absent
```

### Story triggers are descriptive only

```txt
scene-start arrival: preloaded in initial state
path-progress:0.25: never evaluated
inspect:focal-tree: never evaluated
story event journal: absent
```

### No typed result or causal evidence

```txt
commandId: absent
sessionId admission check: absent
frame/tick admission check: absent
action: absent from runtime results
targetId: absent from runtime results
accepted/rejected status: absent
reason code: absent
pre-state fingerprint: absent
post-state fingerprint: absent
objective transitions: absent
story transitions: absent
feedback row: absent
journal sequence: absent
```

### Host and editor surfaces are read/tick/reset only

`GameHost` exposes state, snapshot, diagnostics and render observations. The browser and Node editor environments expose tick/reset and render inspection but no gameplay command or objective-progress capability.

### Current tests cannot detect gameplay disconnection

The headless command smoke asserts that three ticks yield frame `3`. It does not assert player movement, path progress, target admission, objective completion, story activation, rejection behavior or deterministic replay.

## Retained source-provider gaps

```txt
production fallback is unreachable after import/export failure
tests use the local fallback rather than the deployed provider
provider selection has no typed admission result
external and fallback plans lack parity classification
```

Interaction fixtures should use an injected deterministic source provider once that gate exists.

## Retained lifecycle and frame gaps

```txt
RAF ownership and coordinated disposal remain incomplete
committed state/plan/render/canvas correlation remains absent
```

Command IDs should be scoped beneath lifecycle session IDs and eventually linked to committed frame IDs.

## Registry truth gap

The interaction DSKs advertise the right service names, but registry membership does not prove implementation, invocation or state mutation.

## Deployment risk

A deployed route can render successfully while every authored objective remains impossible to complete. Current CI treats render and editor reachability as sufficient and therefore cannot catch this product-level failure.
