# Editor Proof Audit: Renderer Observation Row Contract

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T15-18-29-04-00`

## Current editor proof level

The Nexus editor environment can list capabilities, invoke commands, read state/scene/render snapshots, capture the canvas, inspect viewport dimensions, and collect browser errors.

That is environment reachability proof, not semantic render-consumption proof.

## Required observation row

```txt
{
  observationId,
  action: "renderer.getContributionLedger",
  status,
  rendererId,
  rendererVersion,
  topologyKey,
  expectedDescriptorCounts,
  measuredDescriptorCounts,
  contributionRows,
  fallbackCount,
  validation,
  capturedAtFrame
}
```

## Ownership

```txt
mesh builder owns contribution measurement
renderer owns the current immutable contribution ledger
GameHost projects it
editor bridge invokes and returns it
headless fixture compares it
```

The editor bridge must not derive semantic status from raw descriptor counts.

## Required consistency checks

```txt
editor observation topologyKey equals renderer snapshot topologyKey
editor contribution totals equal renderer measured totals
GameHost proof projection equals editor proof projection
capture metadata references the same observation/topology key
rows remain JSON-safe and deterministically ordered
errors return failed envelopes without corrupting the last good ledger
```

## Browser observation use

Once this contract exists, an agent can inspect a running scene and answer whether the actual renderer consumed grass, tree, terrain, scatter, and atmosphere descriptors rather than merely confirming that the page drew pixels.