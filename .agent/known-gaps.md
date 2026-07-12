# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T23-10-51-04-00`

## Selection state

```txt
10 accessible LuminaryLabs-Publish repositories observed
TheCavalryOfRome excluded by rule
9 eligible repositories centrally tracked with root .agent state
repositories with newer unsynchronized repo-local work skipped
IntoTheMeadow selected as the oldest fully synchronized eligible repository
only IntoTheMeadow changed in the Publish organization for this pass
```

## Current persistence gaps

### Save services are declarations only

`meadow-save-dsk` advertises save-model, save-slots, persistence-adapter, migration and save-validation, but it is not a required v0.1 DSK and has no source-backed runtime instance.

### Browser boot always starts fresh

`startWebHost()` loads the provider, creates the game and starts rendering. It performs no slot discovery, candidate resolution, schema admission or hydration.

### Reset silently discards state

`game.reset()` creates the initial state again. It has no reset epoch, checkpoint policy, slot effect, predecessor receipt or typed result.

### Snapshot is not a save envelope

The current game snapshot includes manifest, state, render plan and diagnostics but lacks:

```txt
save schema ID and version
slot and checkpoint identity
state revision
reset epoch
content revision
created and updated timestamps
migration history
integrity fingerprint
storage provenance
hydration status
```

### Persistence capabilities are absent

```txt
GameHost persistence commands: absent
browser editor persistence domain: absent
Node headless persistence domain: absent
save/list/load/delete/clear commands: absent
shared typed persistence results: absent
```

### Candidate admission is absent

```txt
slot registry: absent
independent candidate reads: absent
parse failure classification: absent
schema support classification: absent
content compatibility classification: absent
integrity verification: absent
candidate precedence: absent
one-bad-slot isolation: absent
```

### Migration and reconciliation are absent

```txt
ordered pure migration functions: absent
intermediate validation: absent
migration history: absent
scene identity reconciliation: absent
objective and story reconciliation: absent
interaction-receipt reconciliation: absent
content-manifest compatibility result: absent
```

### Hydration is not transactional

```txt
detached candidate state: absent
predecessor checkpoint: absent
atomic state revision commit: absent
derived render invalidation: absent
rollback after failure: absent
stale hydration rejection: absent
first visible hydrated-frame acknowledgement: absent
```

### Storage failure policy is absent

```txt
storage denied classification
quota exceeded classification
serialization failure
partial write classification
read-back verification
atomic promotion strategy
delete failure classification
last-known-good checkpoint retention
```

## Missing persistence fixtures

```txt
empty storage fixture
current-schema save fixture
malformed-candidate fixture
unsupported-schema fixture
migration fixture
content-reconciliation fixture
integrity-failure fixture
multi-slot precedence fixture
storage-denied fixture
quota fixture
write/read-back mismatch fixture
duplicate and stale command fixture
reset/load race fixture
save/load race fixture
hydration rollback fixture
browser reload continuity fixture
headless envelope parity fixture
first visible hydrated-frame fixture
Pages reload continuity smoke
```

## Retained render-surface gaps

```txt
DPR policy remains a hard-coded 1 through 2 clamp
pixel and WebGL surface budgets are absent
resize commands and surface revisions are absent
actual drawing-buffer readback is absent
fallback and rollback are absent
renderer, viewport, capture and visible frame lack one surface identity
```

## Retained runtime clock and step gaps

```txt
RAF absolute time and fixed dt disagree
stop/start injects wall-clock pause into presentation
browser reset does not establish a new clock origin
browser editor bypasses clock admission
Node headless uses an independent accumulated clock
multi-step work is unbounded
clock revisions, step results and journals are absent
state, shader and frame clock correlation is absent
```

## Retained fatal-runtime recovery gaps

```txt
startup acquisitions are not transactional
public globals can publish before full readiness
frame state mutates before frame success
renderer mutation is not staged
fatal handling is only presentation
capabilities survive fatal state
capture remains stale-capable
in-place restart reuses the damaged graph
disposal is disconnected from failure
late predecessor callbacks are not fenced
```

## Retained WebGL context recovery gaps

```txt
context events are unowned
context and resource generations are absent
same topology can conceal invalid GPU resources
renderer readiness and capture are not fenced
restoration is not transactional
repeated restoration and late-event fixtures are absent
```

## Retained DSK registry truth gaps

```txt
multiple declaration sources can drift
descriptor status is policy rather than runtime evidence
dependency requirements are empty
implementation and service bindings are absent
installDsks() creates no local instances
runtime consumers bypass registry lookup
renderer descriptor services drift from implementation
runtime diagnostics report counts rather than consumption truth
registry-owned reverse disposal is absent
registry tests prove shape rather than runtime consumption
```

## Retained interaction and objective gaps

```txt
path-progress and inspect commands absent
player path progress remains zero
inspection receipts absent
objective predicates and completion results absent
story transitions absent
browser/editor interaction parity absent
committed-frame progression acknowledgement absent
```

## Retained workspace path gaps

```txt
segment-aware containment absent
symlink escape policy absent
new-write ancestor containment absent
root/session/revision identity absent
operation budgets and typed filesystem results absent
```

## Retained host capability gaps

```txt
GameHost exposes raw game authority
capability registration remains bypassable
session and lifecycle fences absent
transport success can conceal domain failure
public observations are not revisioned
fatal capability quarantine is absent
```

## Retained lifecycle gaps

```txt
RAF request handles not retained
stop does not cancel pending callbacks
stop/start can create duplicate RAF chains
boot discards the host controller
fatal handling does not coordinate disposal
cold replacement-session ownership is absent
```

## Retained source-provider gaps

```txt
provider selection has no typed admission result
external and fallback plans lack parity classification
production import/export failure cannot reach the local fallback
provider failure cleanup and retry policy are absent
```

## Retained render and committed-frame gaps

```txt
render-affecting cache projection incomplete
rebuild is not transactional
enhancer and renderer invalidation are uncoordinated
state, plan, renderer and canvas lack one commit identity
editor tick and reset bypass visible rendering
WebGL context and resource generation are absent
fatal candidate rollback and last-known-good frame ownership are absent
```

## Deployment risk

A successful page load or headless snapshot can hide complete progress loss on reload. Do not claim save, resume or migration support until an admitted checkpoint survives storage verification, compatibility handling and hydration, and one visible frame cites the same checkpoint and committed state revision.