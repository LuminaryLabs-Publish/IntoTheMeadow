# Render Audit: Manifest and Executable Renderer Divergence

**Timestamp:** `2026-07-15T20:38:13-04:00`  
**Status:** `runtime-renderer-identity-manifest-proof-authority-audited`

## Plan ledger

**Goal:** document the exact difference between the renderer advertised to consumers and the renderer executed by the browser route.

- [x] Read both manifest surfaces.
- [x] Read the web-host import path.
- [x] Read the compatibility wrapper.
- [x] Read renderer-related proof surfaces.
- [ ] Reproduce browser behavior later.

## Source-backed divergence

```txt
game.manifest.json
  localRenderer.module = ./src/renderers/meadow-webgl-renderer-v2.js

src/content/game-manifest.js
  localRenderer.module = ./src/renderers/meadow-webgl-renderer-v2.js

src/hosts/web-host.js
  imports ./renderers/meadow-webgl-renderer-v2-compatible.js
```

The compatible module is not a transparent re-export. It:

```txt
wraps canvas.getContext
caches wrapped contexts by type/options
wraps webgl and webgl2 contexts
records shader types
intercepts shaderSource
removes existing float precision declarations
prepends precision mediump float
forwards all other context operations
```

## Render consequence boundary

A consumer that follows the manifest can select the base module without the compatibility policy. The browser route selects the wrapper regardless of the manifest value. This permits different shader admission behavior across consumers even when they claim the same renderer ID.

No actual shader compile failure or visible difference was reproduced in this turn.

## Missing evidence

```txt
exact executable module receipt
base module revision receipt
wrapper chain receipt
shader precision policy receipt
context proxy policy receipt
program compile result bound to renderer generation
first visible frame bound to renderer identity
source/build/Pages renderer identity parity
```

## Required result

```txt
RendererFrameResult {
  rendererIdentity
  rendererRevision
  rendererGeneration
  executableModule
  wrapperChain
  contextGeneration
  shaderPolicyRevision
  renderPlanRevision
  visibleFrameRevision
  status
  reason
}
```

## Completion gate

The render gap closes only when manifest selection, DSK capabilities, executable module, compiled shader policy and first visible frame cite the same accepted renderer identity in source, built output and deployed Pages.
