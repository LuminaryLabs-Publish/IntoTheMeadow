# Deploy Audit: Program Interface Browser Fixture Gate

**Timestamp:** `2026-07-12T11-29-40-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

Current deployment proof can establish that Chromium produced a screenshot, the page left boot state, the editor bridge appeared and a renderer marker reached the DOM. It cannot prove that the linked program exposed the required active attributes and uniforms or that the captured frame used an admitted interface generation.

## Plan ledger

**Goal:** require local and deployed browser proof for shader-interface reflection, compatibility rejection and first-frame provenance.

- [x] Inspect current Node renderer smoke.
- [x] Inspect current Chromium observation script.
- [x] Identify missing WebGL interface evidence.
- [x] Define deterministic and real-browser fixture matrix.
- [x] Define deployment acceptance gate.
- [ ] Implement and run the fixtures.

## Existing proof

```txt
renderer-v2 smoke:
  render-plan contract validation
  CPU mesh generation
  array length and triangle alignment
  topology and mesh key stability across time-only changes

browser observation:
  Chromium launch
  page title present
  boot marker retired
  editor bridge marker present
  gpu marker present
  screenshot exists and exceeds 10 KB
```

## Missing proof

```txt
WebGL context version and generation
active attribute inventory
active uniform inventory
exact GL types and array sizes
non-null required locations
mesh/program schema compatibility
uniform operation/type compatibility
resource-limit admission
program and interface fingerprint
stale-generation draw rejection
first visible frame correlation
WebGL1/WebGL2 parity
deployed Pages parity
```

## Deterministic fixture set

```txt
fixture:program-interface-manifest
fixture:active-attribute-reflection
fixture:active-uniform-reflection
fixture:missing-required-attribute
fixture:missing-required-uniform
fixture:optimized-out-required-uniform
fixture:attribute-type-mismatch
fixture:uniform-type-mismatch
fixture:uniform-array-size-mismatch
fixture:mesh-layout-compatibility
fixture:uniform-payload-compatibility
fixture:resource-budget-rejection
fixture:predecessor-preservation-after-rejection
fixture:stale-context-generation-draw
fixture:stale-program-generation-draw
fixture:interface-fingerprint-stability
fixture:first-frame-program-interface-receipt
```

## Browser matrix

```txt
context: WebGL2 preferred, WebGL1 fallback
browser: Chromium plus one independent implementation when available
viewport: desktop, tablet, narrow mobile
pixel ratio: 1 and 2
shader case: accepted, missing attribute, missing uniform, type mismatch
lifecycle: initial, resize, context loss, context restore, disposal
host: local static server and deployed GitHub Pages
```

## Required browser report

```txt
browser and version
URL and deployment commit
context version and generation
program generation
manifest revision
active attribute inventory
active uniform inventory
interface fingerprint
mesh layout fingerprint
uniform payload fingerprint
draw admission results
first visible frame ID
screenshot path, bytes and digest
fatal/error observations
```

## Deployment gate

A Pages build is not interface-ready until:

```txt
all required symbols are admitted
incompatible candidates reject before draw
accepted local and deployed fingerprints match source-equivalent expectations
first visible frame cites the accepted interface generation
screenshots and renderer readback cite the same frame receipt
```

## Execution status

```txt
npm run check: not run
browser observation: not run
Pages observation: not run
program-interface fixtures: unavailable
runtime source changed: no
deployment source changed: no
```

No deployment-readiness claim is made.