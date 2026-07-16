# Known Gaps

**Updated:** `2026-07-16T01-38-56-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `static-module-graph-release-revision-cache-coherence-authority-audited`

## Summary

The bounded gap is release-graph coherence. The browser can execute a mixed set of query-versioned and unversioned local modules without publishing which complete release, artifact or Pages deployment produced the frame.

## Plan ledger

**Goal:** record every identity, cache, admission, upgrade, retirement and proof gap required for coherent static-module publication.

- [x] Record all current revision labels.
- [x] Record missing module graph and digest authority.
- [x] Record mixed-generation and upgrade gaps.
- [x] Record browser, artifact and Pages proof gaps.
- [ ] Implement and prove later.

## Identity gaps

```txt
ReleaseId: absent
ReleaseGeneration: absent
ReleaseGraphDescriptor: absent
ReleaseGraphDigest: absent
complete transitive module list: absent
per-module content digest: absent
compatibility-parent identity: absent
artifact digest: absent
deployment revision binding: absent
```

## Cache and admission gaps

```txt
explicit HTML cache policy: absent
explicit mutable module cache policy: absent
immutable local asset URL policy: absent
mixed-generation rejection: absent
partial successor rejection: absent
stale module rejection: absent
predecessor preservation result: absent
atomic upgrade result: absent
rollback result: absent
retired release late-work rejection: absent
```

## Proof gaps

```txt
clean-cache graph fixture: absent
warm-cache graph fixture: absent
old/new mixed-cache fixture: absent
partial deploy fixture: absent
rollback fixture: absent
source/artifact graph parity: absent
artifact/Pages graph parity: absent
FirstReleaseBoundFrameAck: absent
```

## Preserved unresolved gaps

```txt
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
atomic save and migration
```

## Completion boundary

Release coherence is not proven until one graph descriptor is cited by the public entry, all transitive modules, external providers, runtime admission result, deployment artifact and Pages response, followed by a matching first visible frame acknowledgement.
