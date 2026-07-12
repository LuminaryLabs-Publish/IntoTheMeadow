# Project Breakdown: Shader Precision Admission

**Timestamp:** `2026-07-12T05-31-59-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Selected branch:** `main`

## Plan ledger

**Goal:** inventory the complete product and define one authoritative shader precision path from context capability observation to the first visible frame.

- [x] Compare the full Publish repository inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `IntoTheMeadow` as the oldest eligible repository.
- [x] Read the current root `.agent` state and repository guidance.
- [x] Trace browser boot, provider load, DSK installation, renderer construction, precision wrapping, compile/link, RAF rendering, diagnostics and capture.
- [x] Identify all domains, all 44 declared kits and all offered services.
- [x] Confirm the exact stage rewrite and missing capability/provenance surfaces.
- [x] Define the DSK/domain boundary, result contracts and fixture gate.
- [x] Change documentation only.
- [ ] Implement runtime authority and execute fixtures later.

## Selection

```txt
IntoTheMeadow      2026-07-12T04-11-54-04-00 selected oldest
PhantomCommand     2026-07-12T04-18-44-04-00
HorrorCorridor     2026-07-12T04-28-03-04-00
ZombieOrchard      2026-07-12T04-38-12-04-00
TheUnmappedHouse   2026-07-12T04-44-36-04-00
AetherVale         2026-07-12T04-50-41-04-00
MyCozyIsland       2026-07-12T05-00-19-04-00
TheOpenAbove       2026-07-12T05-11-46-04-00
PrehistoricRush    2026-07-12T05-21-52-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
boot-game
  -> startWebHost
  -> loadExternalKits
  -> createIntoTheMeadowGame
  -> createMeadowWebglRendererV2 compatibility adapter
  -> wrap canvas.getContext
  -> wrap WebGL createShader and shaderSource
  -> normalize both graphics stages to mediump float
  -> compile/link base program
  -> expose GameHost/editor bridge
  -> RAF tick, plan enhancement, render and HUD
```

## Domains

```txt
browser shell and failure projection
provider and DSK admission
game state and RAF lifecycle
world descriptors and render-plan composition
CPU mesh and WebGL resource ownership
shader precision compatibility and admission
renderer diagnostics, editor capture and Pages proof
```

## Kit and service census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared: 44
active renderer implementation: meadow-webgl-renderer-v2-kit
active precision adapter: meadow-webgl-renderer-v2-compatible.js
```

The canonical per-kit service map remains in `.agent/current-audit.md` and `.agent/kit-registry.json`.

## Main finding

The compatibility adapter applies a deterministic but unadmitted global precision rewrite. It cannot answer which precision the context supports, why mediump was selected for each stage, whether the result was degraded, which normalized source compiled, or which program generation produced the visible frame.

## Required authority

```txt
meadow-shader-precision-admission-authority-domain
```

## Required result statuses

```txt
Accepted
Degraded
RejectedUnsupportedPrecision
RejectedInvalidSource
CompileFailed
LinkFailed
Committed
Retired
```

## Required proof

```txt
stage-specific precision capability evidence
deterministic decision fingerprint
original and normalized source fingerprints
typed compile and link results
program/context generation binding
context-restoration readmission
renderer/editor/capture provenance
WebGL1/WebGL2 browser matrix
first visible frame acknowledgement
```
