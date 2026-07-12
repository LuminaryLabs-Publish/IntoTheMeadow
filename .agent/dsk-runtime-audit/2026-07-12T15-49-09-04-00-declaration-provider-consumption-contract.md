# DSK Runtime Audit: Declaration, Provider and Consumption Contract

**Timestamp:** `2026-07-12T15-49-09-04-00`

## Summary

The repository needs explicit evidence for four different claims: a kit is declared, its descriptor is valid, an executable provider is installed, and a runtime command consumed that provider. The current descriptor snapshot proves only the first two.

## Plan ledger

**Goal:** prevent metadata-only kit rows from being reported as active runtime capabilities and make provider consumption inspectable per command and frame.

- [x] Define declaration and provider identities.
- [x] Define service contract and dependency fields.
- [x] Define capability phases.
- [x] Define install and consumption receipts.
- [x] Define observation and fixture requirements.
- [ ] Implement in the existing DSK composition path.

## Required declaration model

```txt
DskDeclaration {
  declarationId
  kitId
  domain
  contractVersion
  requestedStatus
  requiredServices[]
  optionalServices[]
  dependencies[]
  sourcePolicy
}
```

## Required provider model

```txt
DskProvider {
  providerId
  kitId
  providerVersion
  sourceIdentity
  sourceFingerprint
  contractVersion
  offeredServices[]
  lifecycle
  createServices()
  readinessProbe()
  dispose()
}
```

## Required install result

```txt
DskInstallResult {
  status
  reason
  commandId
  declarationId
  providerId
  predecessorCapabilityGeneration
  capabilityGeneration
  declaredServices[]
  offeredServices[]
  realizedServices[]
  missingServices[]
  dependencyResults[]
  readinessResults[]
  failures[]
}
```

## Required consumption receipt

```txt
DskConsumptionReceipt {
  commandId
  capabilityGeneration
  kitId
  providerId
  serviceId
  invocationId
  inputFingerprint
  resultFingerprint
  stateRevisionBefore
  stateRevisionAfter
  status
}
```

## Current gaps

```txt
provider identity: absent
provider version/fingerprint: absent
service contract version: absent
realized callable service registry: absent
dependency graph: absent
per-kit install result: absent
readiness probe: absent
rollback/disposal: absent
runtime capability generation: absent
service invocation/consumption receipt: absent
declared-realized parity report: absent
```

## Truth table

| Claim | Current proof |
|---|---|
| declaration exists | yes |
| descriptor id and service-list shape validate | yes |
| concrete provider resolved | not generally |
| dependencies satisfied | not proven |
| executable service instance installed | not proven |
| service ready | not proven |
| gameplay command consumed service | no |
| first visible frame reflects result | no |

## Required fixtures

```txt
missing provider
wrong provider contract version
missing required service
cyclic dependency
duplicate provider
provider readiness failure
candidate install rollback
planned declaration remains unavailable
active declaration exposes callable service
command consumes expected provider generation
duplicate command preserves idempotency
provider retirement rejects stale commands
visible frame cites consumption receipt
```

The existing `LOCAL_DSKS` catalog should remain the declaration source. The missing authority should enrich it rather than replace it.