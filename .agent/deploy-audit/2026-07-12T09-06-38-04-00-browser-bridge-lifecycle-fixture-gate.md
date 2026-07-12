# Deploy Audit: Browser Bridge Lifecycle Fixture Gate

**Generated:** `2026-07-12T09-06-38-04-00`

## Current proof

The package check chain runs static, DSK, render-plan, renderer, deterministic-scene and Node headless-editor tests. Those tests do not instantiate `src/editor/install-editor-bridge.js` inside a browser page or prove global/listener lifecycle.

## Required local browser gate

```txt
open fresh page
record baseline error/unhandledrejection listener counts
capture current host and bridge generations
invoke read-only capability
inject one error and one rejection
query normalized paged journal
stop and restart under explicit policy
install a successor host/bridge
verify predecessor capabilities are rejected
verify predecessor listeners are retired
inject an error flood and verify count/byte/age bounds
capture current canvas and verify frame/surface/bridge provenance
dispose and verify listener/global cleanup
```

## Required deployed Pages gate

Repeat the same lifecycle matrix against the deployed Pages route with:

```txt
fresh navigation
soft reinitialization
visibility hide/restore
renderer failure projection
capability failure
repeated observation session
```

## Claim boundary

No browser or Pages bridge-lifecycle proof exists. Existing headless-editor tests validate a separate Node environment and cannot prove browser-global replacement, listener retirement, bounded error retention or current-frame capture provenance.
