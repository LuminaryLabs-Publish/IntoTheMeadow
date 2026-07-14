# Known Gaps

**Updated:** `2026-07-14T04-00-15-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `dsk-capability-dependency-admission-authority-audited`

## Summary

The current bounded gap is capability truth. The repository has a complete descriptor catalog, but descriptor presence does not yet prove that a service exists, its dependencies are satisfied, its implementation is active or its lifecycle was admitted.

## Plan ledger

**Goal:** record every missing identity, graph rule, executable-service boundary and proof needed for trustworthy DSK composition.

- [x] Record manifest and service-token gaps.
- [x] Record dependency and ownership gaps.
- [x] Record preparation, adoption and rollback gaps.
- [x] Record gameplay and visible-frame correlation gaps.
- [x] Preserve predecessor audits.
- [ ] Implement and prove the authority later.

## Manifest gaps

```txt
DskManifestVersion: absent
DskCompositionRevision: absent
CapabilityManifestId: absent
service implementation module identity: absent
service API revision: absent
provider compatibility range: absent
planned-versus-active admission policy: absent
```

## Dependency gaps

```txt
concrete service provides tokens: absent
requires tokens: empty for every local descriptor
optional dependency policy: absent
unique service ownership validation: absent
multi-provider policy: absent
dependency version compatibility: absent
topological install order: absent
cycle detection: absent
```

## Installation gaps

```txt
prepare receipt: absent
executable service handle: absent
per-kit initialization probe: absent
atomic adoption barrier: absent
rollback receipt: absent
disposal ownership: absent
stale composition rejection: absent
partial/degraded composition result: absent
```

## Runtime gaps

```txt
active and planned descriptors share one structural install path
required external provider can be represented as deferred
most declared services are not invoked through kit APIs
GameState stores descriptor snapshots rather than capability receipts
GameHost exposes no accepted capability manifest
commands do not declare required capabilities
renderer frames carry no DSK composition revision
```

## Validation gaps

```txt
missing dependency fixture: absent
duplicate provider fixture: absent
cycle fixture: absent
version mismatch fixture: absent
planned-kit admission fixture: absent
external deferred/failure fixture: absent
prepare failure and rollback fixture: absent
capability readback fixture: absent
first capability frame fixture: absent
built-output and Pages parity fixtures: absent
```

## Preserved unresolved gaps

```txt
browser observation evidence coherence
render-plan and mesh cache coherence
render-surface viewport authority
browser editor capability admission
web-host lifecycle retirement
workspace containment and atomic artifacts
provider-source parity
WebGL context/resource recovery
single-chain frame scheduling
playable progression
camera-bound grass visibility and LOD
audio user-gesture lifecycle
atomic save and migration
independent replay
```

## Completion boundary

A descriptor count, five-layer shape and `validation.passed` flag are not executable capability evidence unless every active service has an implementation, dependency graph, ownership receipt, successful probe, accepted composition revision and matching runtime readback.