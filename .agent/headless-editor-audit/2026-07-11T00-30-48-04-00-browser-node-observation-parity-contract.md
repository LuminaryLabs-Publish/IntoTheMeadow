# Browser and Node Observation Parity Contract

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-11T00-30-48-04-00`

## Browser environment

```txt
source provider: commit-pinned external meadow-area-kit
renderer: actual WebGL
capture: canvas.toDataURL
timing: RAF plus direct editor mutations
```

## Node environment

```txt
source provider: fallback unless explicitly injected
renderer: CPU mesh observation
capture: generated SVG plus JSON packet
timing: local scalar time and on-demand build()
metadata: kind=node-headless, renderer=mesh-observation, permissive=true
```

These are useful but not equivalent observation surfaces.

## Current parity gaps

```txt
different provider admission
different renderer implementation
different capture implementation
different frame scheduling
capability calls rebuild independently
no shared frame request or commit IDs
no shared state/source/plan fingerprint packet
synthetic SVG can be mistaken for browser-frame proof
```

## Required observation classes

```txt
browser-webgl-frame
node-mesh-observation
node-synthetic-visual
```

Every artifact must state its class.

## Shared parity packet

```txt
{
  observationClass,
  sessionId,
  runId,
  frameRequestId,
  committedFrameId,
  sourceProviderId,
  sourceProviderVersion,
  sourceFingerprint,
  stateFingerprint,
  rawPlanFingerprint,
  enhancedPlanFingerprint,
  topologyKey,
  descriptorCounts,
  meshCounts,
  renderOrSyntheticResult
}
```

## Parity rule

Node proof may validate deterministic source, plan, topology, mesh, and metrics. Only browser proof may validate WebGL draw completion and actual canvas output. A parity fixture must compare the shared deterministic fields and explicitly allow renderer-class-specific fields.
