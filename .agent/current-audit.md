# Current Audit: DSK Capability Dependency Admission

**Updated:** `2026-07-14T04-00-15-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `dsk-capability-dependency-admission-authority-audited`  
**Immediate predecessor:** `browser-observation-evidence-authority-central-reconciled`

## Summary

The repository exposes a broad 44-surface kit catalog, but current installation proves descriptor shape rather than executable capability composition. All local descriptors report empty dependencies, one generic domain token and five service labels. The installer does not resolve, prepare, probe or atomically adopt the advertised services.

## Plan ledger

**Goal:** bind each declared kit to concrete executable services, explicit dependencies, one ownership graph and one accepted composition revision.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm ten eligible ledgers, root `.agent` states and synchronized heads.
- [x] Select only IntoTheMeadow by the oldest eligible timestamp.
- [x] Inspect `src/dsks/index.js`, `src/boot/install-dsks.js`, game creation and DSK tests.
- [x] Preserve all 44 declared kit surfaces and service labels.
- [x] Document 22 planned admission surfaces.
- [x] Add the timestamped audit family.
- [x] Change documentation only and push to `main`.
- [ ] Implement executable composition and failure fixtures later.

## Interaction loop

```txt
load external provider
  -> create descriptor-only local catalog
  -> validate identifier and layer shape
  -> return loaded/deferred external status
  -> create actual meadow and state outside kit service APIs
  -> store descriptor snapshots in game state
  -> tick frame/time
  -> render without one capability revision
```

## Main findings

```txt
all local requires arrays are empty
provides contains one generic game:<domain> token per descriptor
five offered service labels are not registered as service tokens
active and planned descriptors share the same install path
missing external providers can be represented as deferred without failing install
validation checks IDs, suffixes, service-count shape and required presence
installation performs no dependency resolution or cycle detection
installation produces no executable provider or lifecycle receipt
DSK smoke proves count and five layers, not service behavior
actual meadow creation and game state mutation bypass most declared services
```

## Required parent domain

```txt
meadow-dsk-capability-dependency-admission-authority-domain
```

## Required transaction

```txt
DskCompositionCommand
  -> bind repository, registry and provider revisions
  -> normalize active and planned manifests
  -> expand concrete provides and requires tokens
  -> validate unique ownership, versions and compatibility
  -> resolve an acyclic dependency graph
  -> prepare executable service providers
  -> probe every required active capability
  -> reject planned, missing, deferred, duplicate or conflicting work
  -> atomically adopt all participants or preserve predecessors
  -> publish DskCompositionResult and CapabilityManifest
  -> publish FirstCapabilityRevisionFrameAck
```

## Boundary

Documentation only. No DSK declaration, installer, game behavior, renderer, test, build or deployment code changed.