# Deterministic Replay Fixture Gate

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-12T00-58-12-04-00`

## Goal

Prevent `npm run check` and Pages deployment from treating two adjacent reads of one fallback runtime as sufficient deterministic proof.

## Current gate

```txt
npm run check
  -> deterministic-scene-smoke.mjs
  -> create one fallback-backed game
  -> read unchanged snapshot twice
  -> compare serialized strings
```

## Required fixture suite

```txt
fixture:canonical-values
fixture:independent-build
fixture:fallback-provider-replay
fixture:external-provider-replay
fixture:provider-parity-classification
fixture:tick-sequence-replay
fixture:reset-replay
fixture:cadence-parity
fixture:negative-controls
fixture:first-divergence
fixture:browser-headless-parity
smoke:visible-replay-frame
smoke:pages-replay
```

## Minimum assertions

### Canonical values

```txt
finite numbers retain explicit policy
NaN, Infinity, undefined, cycles and unsupported prototypes reject
canonical key ordering is stable
projection schema/version changes affect fingerprint identity
```

### Independent construction

```txt
no shared game instance
no shared mutable provider state
same provider/seed/content -> same construction checkpoint
changed seed/provider/content -> expected negative-control divergence
```

### Replay

```txt
same commands and normalized ticks -> same checkpoint fingerprints
reset and replay -> same terminal fingerprints with a new replay epoch
stale/duplicate commands -> typed results without repeated effects
first mismatch -> exact tick, domain and path
```

### Presentation

```txt
source and enhanced render-plan fingerprints match
renderer observations cite replay identity
first visible frame cites committed replay checkpoint
browser and headless results use the same schema
```

## Package gate target

```json
{
  "scripts": {
    "fixture:determinism": "node tests/deterministic-replay-fixture.mjs",
    "smoke:determinism-browser": "node scripts/run-deterministic-browser-smoke.mjs",
    "check": "... && npm run fixture:determinism"
  }
}
```

## Deployment policy

Pages deployment should require the DOM-free replay fixture. Browser and visible-frame replay smoke should run in an acceptance workflow when browser execution is available. Any divergence must publish the first-divergence artifact rather than only a generic failure string.

## Current validation status

```txt
runtime source changed: no
package scripts changed: no
npm run check executed: no
new replay fixtures implemented: no
browser replay smoke executed: no
Pages replay smoke executed: no
```