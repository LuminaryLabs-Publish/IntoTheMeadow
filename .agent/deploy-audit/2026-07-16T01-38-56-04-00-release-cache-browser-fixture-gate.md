# Deploy Audit: Release Cache Browser Fixture Gate

**Timestamp:** `2026-07-16T01:38:56-04:00`  
**Status:** `static-module-graph-release-revision-cache-coherence-authority-audited`

## Plan ledger

**Goal:** prove that source, artifact and Pages load one coherent module graph across first load, reload, upgrade and rollback.

- [x] Define required fixture families.
- [x] Define pass criteria.
- [x] Keep current deployment claims blocked.
- [ ] Execute fixtures later.

## Required fixtures

```txt
clean-cache first load
warm-cache same-release reload
new-release navigation with old local modules cached
new HTML with predecessor modules cached
predecessor HTML with successor modules cached
partial successor artifact availability
compatible renderer and base renderer revision membership
external provider revision mismatch
failed successor admission with predecessor preservation
rollback from successor to predecessor
source versus artifact graph digest
artifact versus Pages graph digest
```

## Required observations

```txt
ReleaseGraphAdmissionResult
observed module URLs
observed content digests
release generation
artifact digest
deployment revision
renderer generation
FirstReleaseBoundFrameAck
upgrade or rollback result
```

## Pass criteria

- One frame may cite only one accepted release generation.
- A compatibility module may use an older historical label only when its content digest is explicitly included in the accepted graph.
- A partial successor must not silently combine with the predecessor.
- A failed upgrade must preserve or restore a coherent predecessor.
- Source, artifact and Pages graph digests must agree for the claimed release.

## Boundary

No build, workflow, cache header, artifact or Pages fixture was executed.
