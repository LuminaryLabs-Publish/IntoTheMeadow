# Editor and Host Capability Registry Gap

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-11T02-20-44-04-00`

## Current surfaces

GameHost and the browser editor expose state, diagnostics, plans, renderer snapshots, capture, viewport, errors, tick, and reset.

The Node environment exposes runtime, scene, renderer, camera, browser, and workspace capabilities.

## Gap

Neither surface can answer:

```txt
which kits are declared
which kits are required
which kits are source-backed
which modules resolved
which kits were invoked
which outputs were produced
which consumers used those outputs
which proof rows support the claim
```

## Required capabilities

```txt
runtime.getKitRegistryTruth
runtime.getKitImplementationRows
runtime.getKitInvocationRows
scene.getProducerConsumerEdges
renderer.getKitConsumptionRows
runtime.validateKitTruth
```

All returns must be detached, bounded, JSON-safe snapshots. Browser and Node capability names and row schemas should match even where their implementation providers differ.
