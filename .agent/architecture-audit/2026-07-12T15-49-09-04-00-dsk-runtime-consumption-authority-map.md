# Architecture Audit: DSK Runtime Consumption Authority

**Timestamp:** `2026-07-12T15-49-09-04-00`

## Summary

The repository has a strong declaration catalog but no authoritative executable-provider install boundary. Structural descriptor validation, runtime service realization and active service consumption are currently conflated.

## Plan ledger

**Goal:** define one bounded domain that resolves concrete providers, validates dependencies, installs executable services, publishes capability state and proves each gameplay mutation consumed the intended service generation.

- [x] Map current declaration, validation, installation and tick paths.
- [x] Separate descriptor metadata from executable provider state.
- [x] Define provider and service identities.
- [x] Define install command/result and atomic publication.
- [x] Define runtime consumption receipts.
- [x] Define gameplay and first-frame proof.
- [ ] Implement the authority in existing composition owners.

## Current architecture

```txt
LOCAL_DSK_IDS
  -> createDskDescriptor(id)
       status = required ? active-v0.1 : planned
       requires = []
       provides = [game:<domain>]
       services = metadata strings
  -> validateLocalDsks()
       id suffix, duplicate and five-item checks
  -> installDsks()
       local descriptors + external loaded/deferred rows + snapshot
  -> createIntoTheMeadowGame()
       stores install snapshot and authored content
  -> tick()
       increments frame only
```

## Required parent domain

```txt
meadow-dsk-runtime-consumption-authority-domain
```

## Domain boundaries

```txt
Declaration authority
  owns manifest ids, versions, declared services and status intent

Provider authority
  owns concrete modules, provider identity, version, source and lifecycle

Dependency authority
  owns required capabilities, graph validation and install order

Installation authority
  owns prepare, validate, commit, rollback and runtime generation

Consumption authority
  owns command-to-service admission and consumption receipts

Gameplay authority
  owns player, interaction, objective and story state transactions

Projection authority
  owns world/HUD projection and first-visible-frame acknowledgement
```

## Candidate kits

```txt
dsk-service-contract-kit
dsk-provider-identity-kit
dsk-provider-registry-kit
dsk-dependency-graph-kit
dsk-install-command-kit
dsk-install-result-kit
dsk-service-binding-kit
dsk-capability-state-kit
dsk-consumption-receipt-kit
runtime-capability-generation-kit
gameplay-input-sample-kit
gameplay-command-router-kit
player-motion-service-kit
interaction-target-query-kit
inspect-command-kit
objective-progress-service-kit
story-trigger-service-kit
feedback-projection-kit
save-consumer-binding-kit
runtime-capability-observation-kit
dsk-declared-realized-parity-fixture-kit
gameplay-consumption-smoke-kit
first-gameplay-frame-ack-kit
```

## Capability phases

```txt
Declared
Validated
ProviderResolved
Prepared
Installed
Ready
Active
Degraded
Retiring
Retired
Rejected
```

`active-v0.1` should not be assigned before provider resolution and readiness proof.

## Install transaction

```txt
DskInstallCommand
  -> validate manifest and expected predecessor generation
  -> resolve provider identity, immutable source and version
  -> validate service contract and dependencies
  -> topologically order providers
  -> construct candidate service instances
  -> execute readiness probes
  -> compare declared/offered/realized services
  -> atomically publish RuntimeCapabilityGeneration
  -> emit DskInstallResult per declaration
  -> retain predecessor until commit succeeds
```

## Gameplay consumption transaction

```txt
GameplayCommand
  -> validate session, phase and capability generation
  -> bind required service ids
  -> invoke services exactly once
  -> collect DskConsumptionReceipt rows
  -> atomically commit player/progression/story state
  -> publish typed GameplayResult
  -> project world and feedback from the committed state revision
  -> acknowledge the first visible frame
```

## Required invariants

```txt
planned != active
validated != installed
installed != consumed
no active service without concrete provider identity
no provider without immutable contract version
no gameplay commit without consumption receipts
no objective/story transition from uncommitted player evidence
no frame proof without matching state and capability generations
```

## Existing owners to update first

```txt
src/content/dsk-registry.js
src/dsks/index.js
src/boot/install-dsks.js
src/game/create-into-the-meadow-game.js
src/game/game-state.js
src/game/game-snapshot.js
src/hosts/web-host.js
existing meadow-player/input/interaction/story/objective/ui/save DSK declarations
GameHost and editor capability surfaces
```

No parallel engine or duplicate gameplay stack is recommended.