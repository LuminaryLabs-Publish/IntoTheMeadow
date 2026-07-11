# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T15-49-49-04-00`

## Goal

Preserve the current meadow route while replacing declaration-count validation with a truthful DSK implementation, installation, consumption and retirement graph. Do not treat this as a shortcut around the earlier lifecycle, capability, clock, provider, render or interaction gates.

## Plan ledger

- [ ] Preserve current visual composition and render-plan contracts.
- [ ] Complete Runtime Session Lifecycle Authority first.
- [ ] Complete Host Capability Gateway and raw runtime quarantine.
- [ ] Complete workspace path containment and typed filesystem results.
- [ ] Complete runtime-step admission and monotonic clock policy.
- [ ] Complete source-provider identity and admission.
- [ ] Complete render-topology and committed-frame proof.
- [ ] Complete interaction/objective authority.
- [ ] Choose one canonical DSK definition source.
- [ ] Generate JSON and source indexes from that canonical source.
- [ ] Add an implementation binding for every active kit.
- [ ] Record source repository, commit/version and implementation fingerprint.
- [ ] Replace generic `requires` and `provides` values with real capability contracts.
- [ ] Build and validate the dependency graph.
- [ ] Reject missing providers, duplicate providers and dependency cycles.
- [ ] Create an ordered staged install plan.
- [ ] Instantiate kits into staged ownership.
- [ ] Validate provided services before activation.
- [ ] Atomically publish the active service registry.
- [ ] Make consumers resolve services by capability rather than direct imports where appropriate.
- [ ] Record immutable per-consumer consumption receipts.
- [ ] Derive declared, installed, active, consumed, failed and retired status from evidence.
- [ ] Add reverse-order disposal for reset and stop.
- [ ] Correct `meadow-webgl-renderer-v2-kit` descriptor services.
- [ ] Classify player/input/interaction/objective services as declared-only until implemented.
- [ ] Add registry drift, dependency, activation, consumption and disposal fixtures.
- [ ] Wire DSK fixtures into `npm run check`.
- [ ] Run `npm run check` and a browser smoke after implementation.

## Existing owners to update first

```txt
game-composition-dsk
into-the-meadow-game-dsk
meadow-diagnostics-dsk
meadow-render-host-dsk
install-dsks adapter
src/content/dsk-registry.js
src/dsks/index.js
dsk-registry.json
browser and Node editor observations
static and runtime fixtures
```

## Candidate coordinating kits

```txt
1. dsk-definition-source-kit
2. dsk-implementation-binding-kit
3. dsk-capability-contract-kit
4. dsk-dependency-graph-kit
5. dsk-install-plan-kit
6. dsk-install-admission-kit
7. dsk-instance-registry-kit
8. dsk-service-registry-kit
9. dsk-external-provider-identity-kit
10. dsk-runtime-consumption-receipt-kit
11. dsk-status-derivation-kit
12. dsk-consumer-ack-kit
13. dsk-lifecycle-disposal-kit
14. dsk-diagnostics-projection-kit
15. dsk-registry-drift-fixture-kit
16. dsk-consumption-parity-fixture-kit
```

## Required definition contract

Each canonical DSK definition should include:

```txt
id
domain
version
source repository and source ref
implementation module or factory binding
lifecycle contract
provided capabilities
required capabilities
optional capabilities
configuration schema
runtime phase
ownership and disposal policy
validation contract
```

## Required install result

```txt
DskInstallResult
  sessionId
  installId
  definitionFingerprint
  orderedKitIds
  installedKitIds
  failedKitIds
  providedCapabilities
  unresolvedCapabilities
  instanceRegistryRevision
  serviceRegistryRevision
  status
  failures
```

## Acceptance cases

```txt
all 43 local IDs have one canonical definition
every active definition has one implementation binding
all required capabilities resolve exactly once
install order follows the dependency graph
renderer definition exposes the actual renderer service contract
external meadow provider records repository, ref and validation result
runtime-used grass/tree/wind/post services produce consumption receipts
diagnostics derive status from install and consumption evidence
reset and stop retire instances in reverse dependency order
registry JSON and source indexes are generated without drift
```

## Rejection cases

```txt
missing implementation binding
unknown implementation export
duplicate capability provider
missing required capability
dependency cycle
incompatible version or source identity
provider validation failure
partial staged installation
consumer requests undeclared capability
stale session or registry revision
reset/stop disposal failure
```

Every rejected install must assert:

```txt
no partial active registry
no consumer-visible service mutation
no leaked instance ownership
one typed failure result
one bounded journal row
```

## Ordered architecture queue

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Step Admission and Clock Integrity
5. Source Provider Authority
6. Render Topology Identity Authority
7. Committed Frame Observation Authority
8. Interaction Command and Objective Authority
9. DSK Runtime Consumption Authority
```

## Deferred until after this gate

```txt
additional authored objectives
new local DSK declarations
promotion of generic registry kits into NexusEngine
save/load of composed instance state
hot reload or live kit replacement
multiplayer service negotiation
```

Do not add more registry entries until the current declarations can be classified from runtime evidence rather than list membership.