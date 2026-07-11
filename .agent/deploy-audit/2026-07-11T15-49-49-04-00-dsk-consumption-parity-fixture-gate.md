# DSK Consumption Parity Fixture Gate

**Timestamp:** `2026-07-11T15-49-49-04-00`

## Summary

The current deployment checks can pass when the local DSK registry has resolved zero local services. Release validation needs executable declaration-to-runtime parity, installation rollback, consumer acknowledgement and lifecycle retirement fixtures.

## Existing check surface

```txt
static smoke
DSK registry shape smoke
render-plan smoke
renderer-v2 smoke
deterministic scene smoke
headless editor environment smoke
headless editor command smoke
headless editor loop smoke
```

## Current false-positive path

```txt
43 descriptors generated
  -> all have five layer rows
  -> required IDs present
  -> aggregate validation passes
  -> game diagnostics report localDsks: 43
  -> runtime implementations continue through direct imports
  -> no service registry or consumption receipt exists
  -> deployment check still passes
```

## Required fixture commands

```bash
npm run fixture:dsk-registry-drift
npm run fixture:dsk-dependency-graph
npm run fixture:dsk-install-rollback
npm run fixture:dsk-consumption-parity
npm run fixture:dsk-disposal-order
npm run smoke:browser-dsk-observation
npm run check
```

## Registry drift fixture

Assert exact generated parity among:

```txt
canonical DSK definitions
dsk-registry.json
src/content/dsk-registry.js
descriptor/service views
diagnostics definition fingerprint
```

Any added, removed, renamed or service-changed kit must fail until all generated views are refreshed from the canonical source.

## Dependency graph fixture

Required cases:

```txt
deterministic valid graph
duplicate single-provider capability
missing required capability
optional missing capability
direct dependency cycle
multi-node dependency cycle
incompatible capability version
```

## Install rollback fixture

```txt
stage three dependent fake kits
fail the third required validation
assert first and second are disposed
assert active instance registry unchanged
assert active service registry unchanged
assert one typed failed DskInstallResult
assert bounded journal row
```

## Consumption parity fixture

Minimum provider/consumer pairs:

```txt
external meadow provider -> game root
wind field -> grass shader and tree consumers
performance policy -> plan enhancer
post-process stack -> renderer
nine grass kits -> grass-system composer
WebGL renderer v2 -> web host and committed-frame authority
```

For each pair assert:

```txt
canonical definition and binding agree
capability resolves exactly once
instance fingerprint matches diagnostics
consumer receipt cites the active registry revision
consumer status becomes consumed
```

## Declared-only fixture

Assert these remain declared-only until their implementation gates exist:

```txt
meadow-player-dsk
meadow-input-dsk
meadow-interaction-dsk
meadow-objective-dsk
meadow-story-dsk
```

A descriptor count must not promote them to active or consumed.

## Renderer parity fixture

Assert `meadow-webgl-renderer-v2-kit` no longer receives generic fallback services. Its canonical definition and implementation binding must expose the actual renderer contract and the browser host must consume that contract through the active registry.

## Disposal fixture

```txt
install a dependency chain
record consumer receipts
invoke reset or stop
freeze new lookups
retire consumers
retire providers in reverse dependency order
revoke handles
assert no active instances remain
assert every instance has one retirement receipt
```

## Browser observation smoke

Expose a detached read model through `GameHost` or the editor bridge:

```txt
sessionId
registryRevision
definitionFingerprint
installedKitCount
activeKitCount
consumedKitCount
declaredOnlyKitCount
failedKitCount
consumerReceiptCount
rendererInstanceId
latest committed frame registryRevision
```

The browser smoke must confirm renderer and frame observations cite the same registry revision.

## Release rule

Do not ship a change that adds or modifies DSK declarations unless drift, dependency, rollback, consumption and disposal fixtures pass. Do not report a kit as active from descriptor presence or required-list membership alone.