# Architecture Audit: Static Module Release and Cache DSK Map

**Timestamp:** `2026-07-16T01:38:56-04:00`  
**Status:** `static-module-graph-release-revision-cache-coherence-authority-audited`

## Plan ledger

**Goal:** assign release-graph identity and cache coherence without moving gameplay, renderer or deployment implementation into the wrong domain.

- [x] Preserve current game, renderer, editor and deploy ownership.
- [x] Map existing source-backed services.
- [x] Define one parent authority.
- [x] Define 18 coordinating kits beneath the parent.
- [x] Keep implementation and proof future work.

## Existing ownership

```txt
web-host-dsk
  -> browser entry and recursive frame host

into-the-meadow-game-dsk
  -> game manifest, build identity and root composition

meadow-render-host-dsk
  -> renderer selection and plan ingestion

meadow-webgl-renderer-v2-kit
  -> WebGL resource and frame projection

static-pages-deploy-dsk
  -> artifact publication, cache invalidation and deploy validation
```

## Missing authority

`meadow-static-module-graph-release-cache-coherence-authority-domain`

The parent does not own gameplay, shaders or deployment execution. It owns the identity and admission contract proving that all those surfaces participate in one release generation.

## Proposed DSK map

```txt
meadow-static-module-graph-release-cache-coherence-authority-domain
  -> release-identity-kit
  -> module-graph-manifest-kit
  -> module-url-revision-kit
  -> asset-content-digest-kit
  -> entrypoint-release-binding-kit
  -> nested-import-revision-kit
  -> external-provider-revision-kit
  -> cache-policy-descriptor-kit
  -> mixed-graph-admission-kit
  -> release-generation-kit
  -> module-load-observation-kit
  -> stale-module-rejection-kit
  -> deployment-artifact-manifest-kit
  -> source-artifact-pages-parity-kit
  -> browser-reload-upgrade-fixture-kit
  -> partial-deploy-cache-fixture-kit
  -> rollback-module-graph-fixture-kit
  -> first-release-bound-frame-ack-kit
```

## Command and result boundary

```txt
ReleaseGraphAdmissionCommand
  -> ReleaseGraphAdmissionResult
  -> ReleaseGeneration
  -> FirstReleaseBoundFrameAck

ReleaseUpgradeCommand
  -> ReleaseUpgradeResult
  -> predecessor retirement or atomic preservation
```

## Required descriptor

```txt
ReleaseGraphDescriptor {
  releaseId
  manifestVersion
  buildRevision
  entryUrl
  moduleNodes[]
  externalProviders[]
  artifactDigest
  cachePolicyRevision
  deploymentRevision
}
```

Each `moduleNodes[]` entry needs the resolved URL, content digest, role, expected release generation and compatibility-parent relationship.

## Boundary

The DSK map is planning documentation. No new executable kit, module loader, service worker, build step or deployment workflow was added.
