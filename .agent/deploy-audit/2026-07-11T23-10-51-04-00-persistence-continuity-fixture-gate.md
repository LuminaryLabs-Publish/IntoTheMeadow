# Persistence Continuity Fixture Gate

**Timestamp:** `2026-07-11T23-10-51-04-00`

## Current validation surface

`npm run check` currently executes static, DSK registry, render-plan, renderer, deterministic-scene and headless-editor smoke tests.

It does not execute:

```txt
save envelope construction
slot discovery or candidate precedence
browser storage reads or writes
schema admission
migration
content reconciliation
integrity fingerprint verification
quota or storage-denied failure
atomic write and read-back verification
hydration commit or rollback
browser reload continuity
first visible hydrated frame
Pages reload continuity
```

## Required DOM-free fixtures

```txt
persistence-envelope-fixture
  validates canonical persistable fields, schema and fingerprint

persistence-candidate-classification-fixture
  covers empty, current, migratable, malformed, unsupported, incompatible and corrupt candidates

persistence-migration-fixture
  proves ordered pure migrations and migration history

persistence-reconciliation-fixture
  proves manifest, scene, objective and story identity admission

persistence-write-fixture
  proves atomic write, read-back verification and predecessor preservation

persistence-hydration-fixture
  proves detached preparation, atomic commit and rollback

persistence-race-fixture
  covers save/load, reset/load and duplicate-command races
```

## Required browser fixtures

```txt
fresh boot with empty storage
valid checkpoint save and page reload
multiple slots with deterministic candidate resolution
malformed and unsupported candidates beside one valid candidate
storage denied and quota exceeded
write succeeds but read-back differs
load failure preserves current state and canvas
reset applies explicit slot policy
new game does not hydrate resume data
browser editor and GameHost command parity
first visible hydrated frame cites checkpoint identity
```

## Required deployed Pages smoke

```txt
open deployed page
wait for initial frame
create or inject a valid checkpoint through supported UI/capability
reload deployed page
assert checkpoint admission and hydration result
wait for first hydrated frame
assert state, diagnostics, renderer snapshot and capture cite one checkpoint and state revision
repeat with malformed candidate and assert explicit safe fallback
```

## Suggested commands

```bash
npm run fixture:persistence-envelope
npm run fixture:persistence-candidates
npm run fixture:persistence-migration
npm run fixture:persistence-reconciliation
npm run fixture:persistence-write
npm run fixture:persistence-hydration
npm run fixture:persistence-races
npm run smoke:persistence-browser-reload
npm run smoke:persistence-pages-reload
npm run check
```

## Gate policy

Do not claim save support, reload continuity or migration support because `meadow-save-dsk` exists in the registry. Completion requires executable save, failure, migration, hydration, rollback, browser reload and visible-frame fixtures wired into the validation path.