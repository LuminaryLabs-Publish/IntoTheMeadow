# Known Gaps

**Updated:** `2026-07-17T08-45-46-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `save-capability-admission-durable-commit-migration-authority-audited`

## Summary

The bounded gap is persistence capability truth and settlement. A planned save DSK is declared, but no executable adapter, durable schema, atomic commit, migration, restore result or restored-frame acknowledgement exists.

## Intent

Record every missing capability, durability, compatibility, restore and proof boundary required before save support can be advertised.

## Checklist

- [x] Record the planned persistence descriptor and services.
- [x] Record the in-memory runtime and reset-only behavior.
- [x] Record missing host/editor persistence commands.
- [x] Record missing atomic commit, migration and restore proof.
- [x] Preserve prior unresolved audit families.
- [ ] Implement and prove later.

## Capability gaps

```txt
implemented persistence provider: absent
SaveCapabilityResult: absent
executable save/load/delete/list capabilities: absent
adapter readiness and origin policy: absent
planned-versus-available capability projection: absent
```

## Save model gaps

```txt
versioned save envelope: absent
bounded gameplay-state projection: absent
transient-state exclusion policy: absent
slot registry and slot lease: absent
product/build compatibility metadata: absent
payload and metadata digests: absent
SavePrepareResult: absent
```

## Durability gaps

```txt
temporary generation write: absent
atomic active-slot replacement: absent
readback/digest verification: absent
previous-generation retirement policy: absent
security/quota/storage failure classification: absent
stale save request rejection: absent
DurableSaveCommitResult: absent
```

## Migration and restore gaps

```txt
save classification: absent
ordered migration registry: absent
migration idempotency proof: absent
SaveMigrationResult: absent
RestoreAdmissionResult: absent
restore state replacement settlement: absent
restored session/state revision: absent
RestoreApplyResult: absent
FirstRestoredStateFrameAck: absent
```

## Current divergence

```txt
DSK registry: meadow-save-dsk declared as planned
installed DSK snapshot: includes the planned descriptor
game runtime: in-memory create/tick/reset only
game snapshot: diagnostic and render-heavy, not a save envelope
GameHost: read surfaces only
editor bridge: status/tick/reset/capture only
browser storage adapter: absent
```

## Proof gaps

```txt
save/reload/restore fixture: absent
atomic overwrite fixture: absent
multi-slot isolation fixture: absent
corrupt and foreign save rejection: absent
unsupported-version and migration fixtures: absent
quota/security/interrupted-write fixtures: absent
stale runtime command fixture: absent
first restored frame fixture: absent
source/artifact/Pages persistence parity: absent
```

## Preserved unresolved gaps

```txt
WebGL capture readback and frame correlation
adaptive quality feedback and projection
browser failure classification and bounded diagnostics
authored content graph integrity
static module release/cache coherence
runtime renderer identity
accessible semantic projection
audio event projection
shader capability admission
editor command settlement
post-process execution
browser startup readiness
runtime reset and replay
DSK dependency admission
browser observation provenance
render-plan and mesh-cache coherence
viewport authority
editor capability lifecycle
web-host retirement
workspace containment
external provider parity
WebGL context recovery
single-chain frame scheduling
playable progression
grass visibility and LOD
```

## Completion boundary

Persistence is not available until one admitted implementation projects bounded versioned gameplay state, atomically commits and verifies a slot, migrates compatible saves, applies restore exactly once and publishes `FirstRestoredStateFrameAck` for the matching runtime and frame.