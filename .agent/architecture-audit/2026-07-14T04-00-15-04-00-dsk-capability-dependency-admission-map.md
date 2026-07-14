# Architecture Audit: DSK Capability Dependency Admission Map

## Current composition

```txt
content/dsk-registry.js
  -> local and external IDs

dsks/index.js
  -> service-label table
  -> generated descriptors
  -> active/planned status
  -> generic provides token
  -> empty requires list

boot/install-dsks.js
  -> structural validation
  -> loaded/deferred external status
  -> descriptor and snapshot return

game/create-into-the-meadow-game.js
  -> direct provider creation
  -> direct state creation
  -> DSK snapshot embedding
```

## Finding

The repository has an architecture catalog, not yet an executable dependency graph. Layer labels describe intended services, but no service registry binds those labels to implementations or consumers.

## Current validation boundary

```txt
validated:
  unique descriptor IDs
  -dsk or -kit suffix
  at least five service labels
  presence of required v0.1 IDs
  descriptor count and five layers in smoke

not validated:
  concrete provides/requires tokens
  service owner uniqueness
  API versions
  graph cycles
  planned capability admission
  external provider compatibility
  executable provider readiness
  initialization order
  atomic adoption or rollback
```

## Required parent domain

```txt
meadow-dsk-capability-dependency-admission-authority-domain
```

## Candidate hierarchy

```txt
meadow-dsk-capability-dependency-admission-authority-domain
  dsk-composition-command-kit
  dsk-registry-revision-kit
  dsk-capability-manifest-kit
  dsk-status-admission-kit
  service-token-normalization-kit
  service-ownership-registry-kit
  dependency-version-policy-kit
  dependency-graph-resolution-kit
  dependency-cycle-rejection-kit
  external-provider-admission-kit
  planned-capability-rejection-kit
  service-provider-preparation-kit
  service-probe-kit
  composition-preparation-receipt-kit
  composition-atomic-adoption-kit
  composition-rollback-kit
  capability-manifest-readback-kit
  gameplay-capability-admission-kit
  capability-diagnostics-kit
  first-capability-frame-ack-kit
  dsk-composition-result-kit
```

## Ownership rule

Every concrete service token must have one admitted owner, an implementation revision, a declared lifecycle and a compatible dependency graph. Planned descriptors remain discoverable metadata but cannot satisfy active runtime requirements.

## Adoption rule

No game, editor or renderer should claim capability readiness until all required providers are prepared and probed, one immutable composition is atomically adopted and a typed result records every participant.