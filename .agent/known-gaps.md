# Known Gaps

**Updated:** `2026-07-17T19-38-37-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `dsk-dependency-closure-activation-truth-authority-audited`

## Summary

The current DSK registry is declaration-complete but activation-incomplete. Active and planned descriptors share one installation snapshot without dependency closure or executable-capability settlement.

## Descriptor gaps

```txt
stable descriptor schema version: absent
implementation identity/revision: absent
meaningful capability provides contracts: incomplete
non-empty dependency requires contracts: absent
provider version constraints: absent
activation phase: absent
failure policy: absent
```

## Graph gaps

```txt
dependency graph builder: absent
missing-provider classification: absent
cycle detection: absent
version compatibility resolution: absent
deterministic topological order: absent
external-provider dependency binding: absent
DependencyClosureResult: absent
```

## Activation gaps

```txt
runtime activation generation: absent
implementation binding verification: absent
planned-capability exclusion: absent
per-capability settlement: absent
partial failure propagation: absent
stale activation rejection: absent
DskActivationResult: absent
```

## Projection gaps

```txt
RuntimeCapabilityManifest: absent
declared-versus-executable split: absent
GameHost admitted capability projection: absent
editor admitted capability projection: absent
render capability generation digest: absent
FirstActivationBoundFrameAck: absent
```

## Current divergence

```txt
registry: 43 local descriptors
status: 15 active-v0.1, 28 planned
requires: empty for every local descriptor
validation: IDs, duplicates, service count and required presence only
install snapshot: all local descriptors together
external provider: loaded or deferred only
runtime state: stores the declaration snapshot
```

## Proof gaps

```txt
missing dependency fixture: absent
planned-only dependency fixture: absent
external provider deferred fixture: absent
cycle fixture: absent
version mismatch fixture: absent
deterministic activation order fixture: absent
partial activation rollback fixture: absent
stale generation fixture: absent
host/editor capability parity fixture: absent
activation-bound frame fixture: absent
source/artifact/Pages activation parity: absent
```

## Preserved unresolved gaps

```txt
save capability and durable restore
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

DSK activation is not truthful until dependencies and implementations are admitted under one runtime generation, planned declarations remain unavailable, failures settle explicitly, runtime surfaces publish the accepted capability manifest and the matching visible frame publishes `FirstActivationBoundFrameAck`.