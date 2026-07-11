# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T02-20-44-04-00`

## Goal

Preserve the existing runtime priority order while making the DSK registry an exact, machine-checkable declaration and consumption ledger rather than a membership-based capability claim.

## Plan ledger

```txt
[ ] Preserve the external meadow provider URL and commit pin.
[ ] Preserve the current visual output and render-plan schema.
[ ] Implement runtime-session authority first.
[ ] Implement committed-frame authority second.
[ ] Add source-provider provenance and parity third.
[ ] Add interaction/objective command authority fourth.
[ ] Correct registry census assumptions to 43 local plus one external.
[ ] Add explicit label and services for meadow-webgl-renderer-v2-kit.
[ ] Add implementationStatus for every declared kit.
[ ] Resolve implementationModule for every source-backed kit.
[ ] Record import and invocation evidence.
[ ] Record produced output kinds and consumer IDs.
[ ] Add per-kit consumption status and proof rows.
[ ] Connect mesh contribution rows to producing kit IDs.
[ ] Connect gameplay descriptor consumption to producing kit IDs.
[ ] Expose bounded kit-truth readback through GameHost and editor surfaces.
[ ] Add browser/Node parity checks for the registry truth ledger.
[ ] Wire all registry truth fixtures into npm run check.
[ ] Update repo-local and central ledgers after implementation lands.
```

## Phase 1: Runtime Session Lifecycle Authority

```txt
IntoTheMeadow Runtime Session Lifecycle Authority
+ Stop/Restart/Dispose/Rollback Fixture Gate
```

## Phase 2: Committed Frame Observation Authority

```txt
IntoTheMeadow Committed Frame Observation Authority
+ State/Plan/Render/Canvas Coherence Fixture Gate
```

## Phase 3: Source Provider Authority

```txt
IntoTheMeadow Source Provider Authority
+ External/Fallback Parity Fixture Gate
```

## Phase 4: Interaction Command Authority

```txt
IntoTheMeadow Interaction Command Authority
+ Objective Progress Fixture Gate
```

## Phase 5: DSK Registry Truth

```txt
IntoTheMeadow DSK Registry Truth
+ Mesh Contribution and Consumer Proof Fixture Gate
```

Suggested files:

```txt
src/content/dsk-registry.js
src/dsks/index.js
src/boot/install-dsks.js
src/runtime/dsk-truth-ledger.js
src/runtime/dsk-implementation-resolver.js
src/runtime/dsk-consumption-ledger.js
src/renderers/meadow-mesh-builder-v2.js
src/renderers/meadow-webgl-renderer-v2.js
src/boot/expose-game-host.js
src/editor/install-editor-bridge.js
scripts/into-the-meadow-environment.mjs
```

Suggested fixtures:

```txt
tests/dsk-registry-census-smoke.mjs
tests/dsk-service-map-completeness-smoke.mjs
tests/dsk-implementation-resolution-smoke.mjs
tests/dsk-import-invocation-smoke.mjs
tests/dsk-producer-consumer-edge-smoke.mjs
tests/renderer-kit-service-contract-smoke.mjs
tests/mesh-contribution-ledger-smoke.mjs
tests/gameplay-descriptor-consumption-smoke.mjs
tests/gamehost-kit-truth-readback-smoke.mjs
tests/browser-node-kit-truth-parity-smoke.mjs
```

## Required kit truth row

```txt
{
  kitId,
  declarationStatus,
  requiredStatus,
  implementationStatus,
  implementationModule,
  importStatus,
  invocationStatus,
  outputKinds,
  consumerIds,
  consumptionStatus,
  proofRows,
  validation
}
```

## Required semantics

```txt
declared count is exact and fixture-checked
every required kit has explicit labels and services
every source-backed kit resolves to a module
descriptor-shell kits are never reported as implemented
active status is not inferred from required membership alone
consumer proof is attached to the producing kit
unknown or unsupported outputs fail visibly
GameHost and editor read detached JSON-safe snapshots
browser and Node report comparable registry truth
```
