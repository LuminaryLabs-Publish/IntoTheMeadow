# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T12-29-49-04-00`

## Selection state

```txt
10 accessible LuminaryLabs-Publish repositories observed
TheCavalryOfRome excluded by rule
9 eligible repositories centrally tracked with root .agent state
IntoTheMeadow selected as oldest eligible central-ledger entry
only IntoTheMeadow changed in the Publish organization
```

## Headless workspace path gaps

### String-prefix containment

`safePath()` accepts a target when `target.startsWith(root)`. This can accept a sibling path whose name begins with the root's characters without being a descendant.

### Symlink containment

Lexical path resolution does not verify the target's real filesystem location. An inside-root symlink can redirect list, read, write or capture operations outside the workspace.

### New-write ancestry

`workspace.write` creates parent directories recursively. There is no nearest-existing-ancestor realpath check before creating a new path.

### Shared operation authority

The following use the same incomplete helper but have no shared typed operation authority:

```txt
artifactRoot construction
renderer.capture JSON write
renderer.capture SVG write
workspace.list
workspace.read
workspace.write
```

### Missing root identity

Commands do not carry:

```txt
workspace root ID
workspace root revision
editor session ID
expected capability lease
operation ID
path policy revision
```

### Missing terminal result

Generic capability completion does not distinguish:

```txt
accepted
rejected-parent-escape
rejected-sibling-prefix
rejected-symlink
rejected-operation-policy
failed-I/O
partial-artifact-write
```

### Missing budgets and redaction

Read/list/write operations have no explicit byte, entry or recursion budgets. Public results are not governed by one rule that prevents absolute host-path disclosure.

## Required workspace fixture gaps

```txt
root and normal descendant acceptance
parent traversal rejection
sibling-prefix traversal rejection
absolute outside path rejection
symlink read/list/write rejection
nearest-existing-ancestor write proof
rejected-write no-mutation proof
artifact root and workspace policy parity
relative public path projection
cross-platform path semantics
```

## Retained host capability gaps

```txt
GameHost exposes raw game authority
capability registration is bypassable
session and lifecycle fences are absent
transport success conceals domain status
command identity and bounded journals are absent
public observations are not revisioned
host controller ownership is discarded
```

The host gateway must become exclusive before workspace operation admission can be trusted.

## Retained runtime step and clock gaps

```txt
browser RAF, browser editor and Node editor share raw game.tick
finite delta validation absent
integer step-count validation absent
maximum work budget absent
monotonic simulation clock absent
reset epoch absent
step result and journal absent
```

## Retained lifecycle gaps

```txt
RAF request handles are not retained
stop does not cancel pending callback
stop/start can create duplicate RAF chains
boot discards returned host controller
GameHost and editor globals have incomplete lease ownership
fatal handling does not coordinate disposal
```

## Retained source-provider gaps

```txt
production fallback is unreachable after external import/export failure
tests use local fallback rather than deployed provider
provider selection has no typed admission result
external and fallback plans lack parity classification
```

## Retained render-cache gaps

```txt
source revision absent
render-affecting projection incomplete
cache key schema implicit
rebuild not transactional
enhancer and renderer invalidation uncoordinated
mesh and GPU buffer lineage incomplete
```

## Retained committed-frame gaps

```txt
state changes before render success
lastPlan changes before renderer completion
editor tick and reset bypass rendering
state, plan, renderer and canvas lack one commit identity
```

## Retained interaction gaps

```txt
path-progress and inspect commands are authored but cannot be dispatched
player and path mutation absent
objective predicates and story triggers not executed
accepted/rejected result authority absent
```

## Registry truth gap

The DSK registry declares host, diagnostics, game, render and workspace-adjacent services, but declaration does not prove runtime consumption or safe filesystem admission.

## Deployment risk

Current CI exercises editor capabilities and render metrics but does not attempt sibling-prefix escape, symlink escape, rejected-write no-mutation or artifact-root containment. Headless-editor workspace safety is therefore unproven.