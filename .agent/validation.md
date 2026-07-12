# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T23-10-51-04-00`

## Plan ledger

**Goal:** distinguish a declared save DSK and readable live snapshot from executable proof that a checkpoint can be written, verified, reloaded, migrated, hydrated, rolled back and projected into the first visible resumed frame.

- [x] Review the complete accessible Publish inventory.
- [x] Compare every eligible repository with central tracking.
- [x] Verify central and root `.agent` coverage.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `IntoTheMeadow` after skipping newer unsynchronized repo-local work.
- [x] Inspect the save DSK declaration and required-v0.1 registry.
- [x] Inspect game construction and reset behavior.
- [x] Inspect game snapshot shape.
- [x] Inspect GameHost, browser editor and Node headless capability surfaces.
- [x] Inspect current package validation scripts.
- [x] Document schema, slot, fingerprint, migration, reconciliation, hydration, rollback and frame-proof requirements.
- [x] Change documentation only.
- [ ] Execute fixtures after implementation exists.

## Source inspection completed

```txt
external declared kits: 1
local declared kits: 43
total declared kits: 44
meadow-save-dsk service declarations: 5
required-v0.1 save implementation: 0
save schema descriptors: 0
slot registries: 0
checkpoint IDs: 0
state revisions: 0
reset epochs: 0
integrity fingerprints: 0
browser persistence adapters: 0
save/load command capabilities: 0
migration executions: 0
hydration results: 0
persistence journal rows: 0
visible hydrated-frame receipts: 0
persistence fixture commands: 0
```

## Proven from source

```txt
meadow-save-dsk declares save-model
meadow-save-dsk declares save-slots
meadow-save-dsk declares persistence-adapter
meadow-save-dsk declares migration
meadow-save-dsk declares save-validation
meadow-save-dsk is not included in REQUIRED_V01_DSK_IDS
game construction always creates initial state
browser startup supplies no hydrated state
reset always creates initial state again
game snapshot bundles manifest, state, render plan and diagnostics
snapshot validation checks only manifest, scene, render plan and diagnostics
GameHost exposes no persistence command
browser editor exposes no persistence domain
Node headless environment exposes no persistence domain
npm run check includes no save, migration, reload or hydration fixture
```

## Existing proof

Current checks prove:

```txt
required files exist
DSK descriptors validate structurally
render-plan descriptors validate
CPU mesh data is internally aligned
static topology remains stable across time changes
renderer can draw the current plan
headless-editor runtime and command surfaces operate for existing domains
```

Current checks do not prove:

```txt
canonical save-envelope construction
atomic slot write and read-back verification
storage failure classification
candidate parsing and precedence
schema support and migration
content reconciliation
integrity verification
stale and duplicate command handling
reset/new-game slot policy
detached hydration and rollback
browser reload continuity
headless persistence parity
first visible hydrated-frame correlation
Pages reload continuity
```

## Execution status

```txt
runtime source changed: no
persistence source changed: no
renderer source changed: no
package scripts changed: no
dependencies changed: no
render output changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check executed: no
browser reload smoke executed: no
persistence fixtures available: no
```

## Required envelope fixture

Construct canonical state and content identity inputs.

Acceptance assertions:

```txt
only persistable domain state enters the payload
schema and content IDs are required
checkpoint ID, slot ID, reset epoch and state revision are present
fingerprint is deterministic for canonical content
functions, provider instances, render plans and GPU state are rejected or omitted
serializing the same admitted state is deterministic
```

## Required candidate fixture

```txt
empty slot classifies as empty
valid current checkpoint classifies as current
supported predecessor classifies as migratable
malformed JSON cannot throw through startup
unsupported schema fails explicitly
content mismatch fails explicitly
integrity mismatch fails explicitly
one invalid slot cannot hide another valid candidate
multiple valid candidates resolve through one versioned policy
```

## Required write fixture

```txt
admit SaveCommand against session, epoch and state revision
write canonical candidate to a temporary or transactional location
read back the exact bytes or canonical value
verify checkpoint identity and fingerprint
promote only after verification
preserve the predecessor on denial, quota, serialization or mismatch
return one typed SaveResult
record one bounded journal row
```

## Required migration and reconciliation fixture

```txt
run ordered pure migrations
validate every intermediate schema
append deterministic migration history
reconcile scene identity
reconcile objectives and story beats
reconcile interaction receipts
reject unsupported content changes without mutating live state
```

## Required hydration fixture

```txt
commit a baseline live state and visible frame
resolve and prepare a detached checkpoint candidate
validate state invariants
commit one successor state revision
invalidate or rebuild derived render state
wait for first visible hydrated frame
assert state, snapshot, diagnostics, renderer and frame share checkpoint identity
inject failure before and after candidate preparation
assert predecessor state and frame remain or rollback succeeds
```

## Required browser reload matrix

```txt
fresh boot with empty storage
save valid checkpoint and reload
multiple slots
malformed candidate beside valid candidate
unsupported schema
migratable schema
content mismatch
integrity mismatch
storage denied
quota exceeded
read-back mismatch
reset and reload
new game with existing resume candidate
save/load race
reset/load race
```

For every successful resume assert:

```txt
selected slot and checkpoint ID
source and committed schema version
committed state revision
active scene and progression state
renderer observation checkpoint identity
first visible frame checkpoint identity
capture checkpoint identity
```

## Required browser smoke

```txt
boot and wait for initial frame
save a checkpoint through the supported command surface
verify durable read-back
reload page
observe candidate resolution and hydration result
wait for first hydrated frame
assert state, diagnostics, renderer and capture share checkpoint identity
repeat with malformed and incompatible candidates
assert explicit safe failure and no partial mutation
```

## Future commands

```bash
npm run fixture:persistence-envelope
npm run fixture:persistence-candidates
npm run fixture:persistence-write
npm run fixture:persistence-migration
npm run fixture:persistence-reconciliation
npm run fixture:persistence-hydration
npm run fixture:persistence-races
npm run smoke:persistence-browser-reload
npm run smoke:persistence-pages-reload
npm run check
```

## Completion boundary

Do not claim persistence because a save DSK is registered or a live snapshot can be serialized. Completion requires verified durable storage, compatibility admission, failure-safe hydration and a first visible frame that cites the same checkpoint and committed state revision.