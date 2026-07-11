# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T04-39-58-04-00`

## Plan ledger

**Goal:** Separate completed source inspection from executable proof and define the exact gates required before claiming safe external loading, fallback behavior, provider parity or production boot reliability.

```txt
[x] Review the complete accessible Publish inventory.
[x] Compare every eligible repository with the central ledger.
[x] Exclude TheCavalryOfRome.
[x] Select only IntoTheMeadow.
[x] Read AGENTS.md and current .agent state.
[x] Inspect GAME_MANIFEST external provider declaration.
[x] Inspect browser dynamic import and export validation.
[x] Inspect fallback provider selection.
[x] Inspect external meadow-area-kit implementation at the pinned commit.
[x] Inspect local source-plan implementation.
[x] Compare provider versions, scatter, object shapes, validation and snapshots.
[x] Inspect package scripts and provider coverage of current Node smoke tests.
[x] Document required source-provider fixtures and browser smoke coverage.
[x] Change documentation only.
[x] Push to main.
[x] Synchronize the central ledger and internal change log.
```

## Source inspection completed

```txt
manifest URL is commit-pinned: yes
expected external export: createMeadowAreaKit
browser import failure handling: untyped throw
browser missing-export handling: untyped throw
production fallback after import failure: no
local fallback for omitted externalKits: yes
external provider version: 0.1.0
local provider version: local-source-plan-v1
shared raw source-plan schema: no
provider fingerprint: no
parity classification: no
production provider smoke in npm run check: no
```

## Current test-path proof

The existing Node tests instantiate the game without `externalKits`. They prove local fallback generation, enhancement, deterministic snapshot behavior, renderer descriptors and headless-editor behavior. They do not prove the external production provider.

```txt
npm run check executed in this documentation pass: no
browser smoke executed: no
Pages smoke executed: no
runtime source changed: no
package scripts changed: no
dependencies changed: no
```

## Required provider-admission fixture

Use an injected loader and deterministic module candidates.

Cases:

```txt
pinned external module loads and exposes the expected factory
module load rejects with a network/import failure
module evaluates and omits createMeadowAreaKit
factory throws during provider construction
provider lacks required capabilities
provider version is incompatible
provider returns malformed raw plan
provider returns validation failure
fallback is admitted when policy allows it
fallback is rejected when policy is fail-closed
same request produces same provider fingerprint
```

Each result must assert:

```txt
requestId
candidateId
providerId
providerVersion
sourceReference and commit
status: admitted | fallback | degraded | rejected
failureClass and reason
capabilities
providerFingerprint
sourcePlanFingerprint
journal sequence
```

## Required external/fallback parity fixture

Generate the same `ARRIVAL_MEADOW_CONFIG` through both providers and compare:

```txt
area identity and bounds
seed identity
required object families
path points and width
focal-tree presence and core dimensions
feature counts
ground/material semantics
wind semantics
raw validation result
enhanced schema and descriptor families
topology key stability
renderer descriptor counts
```

Differences must be classified as:

```txt
exact
normalized-equivalent
intentional-degradation
incompatible
```

The fixture must fail on unclassified differences.

## Required production boot fixture

```txt
load manifest entry
resolve pinned external source
validate expected export and version
construct provider
validate raw plan
normalize/enhance plan
validate meadow-render-plan/v2
produce one renderer snapshot
publish provider identity through GameHost
```

## Required browser failure smoke

Simulate blocked or failed external loading and assert the declared policy:

```txt
fail-closed -> visible typed failure and complete startup rollback
fallback-allowed -> explicit degraded state, local provider fingerprint and visible diagnostics
```

No silent fallback is acceptable.

## Existing command retained

```bash
npm run check
```

## Future commands

```bash
npm run fixture:source-provider
npm run fixture:source-parity
npm run fixture:production-provider
npm run smoke:browser-provider-failure
npm run check
```

## Completion boundary

Do not claim source-provider reliability from a successful local render-plan smoke. Completion requires deterministic admission, parity, production boot and browser failure-policy fixtures.