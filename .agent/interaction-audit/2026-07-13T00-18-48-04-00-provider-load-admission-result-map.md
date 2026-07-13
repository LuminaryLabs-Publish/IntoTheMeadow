# Provider Load Admission and Result Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-13T00-18-48-04-00`

## Summary

Provider loading currently returns either an imported factory or a thrown exception. It does not publish a command identity, admitted source policy, compatibility result, fallback result or downstream lineage receipt.

## Plan ledger

**Goal:** turn provider loading into one replay-safe command/result interaction with explicit ownership and terminal outcomes.

- [x] Map current host-to-provider interactions.
- [x] Record missing command and result identities.
- [x] Define admission checks and outcomes.
- [x] Define downstream snapshot and visible-frame bindings.
- [ ] Implement and execute later.

## Current interaction map

```txt
startWebHost
  -> loadExternalKits
      -> read module URL
      -> dynamic import
      -> inspect createMeadowAreaKit
      -> return factory or throw
  -> createIntoTheMeadowGame({ createMeadowAreaKit })
      -> install DSK declarations
      -> create provider
      -> expose game
```

Headless interaction:

```txt
createEnvironment
  -> createIntoTheMeadowGame({})
      -> external factory absent
      -> fallback factory selected
      -> no source-selection result
```

## Missing interaction identities

```txt
provider load command ID
runtime session ID
environment/source-profile ID
expected predecessor generation
provider source ID
module identity
fallback policy ID
candidate ID
load result ID
install commit ID
render-plan admission result ID
visible-frame acknowledgement ID
```

## Required admission checks

```txt
runtime session is active
command is not duplicate or stale
expected predecessor generation matches
source policy is known
module identity is structured and pinned
factory export matches schema
provider version is compatible
required services are present
candidate snapshot is valid
representative plan matches contract
provider and plan fingerprints are finite and stable
fallback is allowed by policy and compatibility profile
```

## Terminal outcomes

```txt
external-admitted
fallback-admitted
rejected-missing-source
rejected-import-failure
rejected-export-shape
rejected-version
rejected-service-contract
rejected-snapshot-contract
rejected-plan-contract
rejected-semantic-drift
stale-command
predecessor-mismatch
terminal-no-compatible-provider
```

## Delivery map

```txt
ProviderLoadResult
  -> game boot result
  -> DSK readiness projection
  -> game snapshot provider lineage
  -> renderer plan-admission lineage
  -> GameHost diagnostics
  -> browser editor readback
  -> headless capture metadata
  -> test fixture artifact
  -> first visible frame acknowledgement
```

## Exact-once requirements

```txt
one command produces one terminal result
one provider generation is installed at most once
duplicate command returns prior result
stale candidate cannot replace current provider
one fallback reason is retained in the committed result
one visible frame acknowledgement names one provider generation
```

## Validation boundary

No interaction, loader, event, snapshot or result implementation changed. The map is documentation only.