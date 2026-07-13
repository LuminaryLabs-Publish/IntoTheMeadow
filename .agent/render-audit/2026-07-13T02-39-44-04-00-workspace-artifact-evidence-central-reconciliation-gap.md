# Workspace Artifact Evidence Central Reconciliation Gap

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-13T02-39-44-04-00`

## Summary

The browser WebGL surface and the Node SVG observation surface are separate render paths. This audit does not claim they are visually equivalent. It isolates a narrower evidence problem: the Node capture path can report success after sequential writes without one canonical artifact-root generation, normalized artifact identity, paired commit result or visible-source fingerprint.

## Plan ledger

**Goal:** make every headless visual artifact attributable to one admitted root, provider plan, topology and complete write result.

- [x] Identify capture inputs and outputs.
- [x] Identify label-to-filename coupling.
- [x] Identify sequential JSON/SVG write behavior.
- [x] Identify missing render and source fingerprints.
- [x] Define a typed paired-artifact result.
- [ ] Implement and execute later.

## Current capture path

```txt
renderer.capture({ label, width, height })
  -> build current plan, mesh and visual metrics
  -> captureId = label + topologyKey
  -> jsonPath = safePath(artifactRoot, captures/<captureId>.json)
  -> svgPath = safePath(artifactRoot, captures/<captureId>.svg)
  -> mkdir JSON parent
  -> write JSON
  -> write SVG
  -> publish two relative paths
```

## Evidence gaps

```txt
artifact-root ID and generation: absent
canonical artifact-root receipt: absent
bounded normalized label: absent
opaque artifact ID: absent
provider-source fingerprint: absent
render-plan fingerprint: absent
mesh fingerprint: absent
SVG content hash: absent
JSON content hash: absent
paired commit status: absent
partial-write rollback or orphan receipt: absent
browser-visible-frame correlation: absent
```

## Failure cases

```txt
JSON succeeds and SVG fails
  -> one artifact remains
  -> capture has no terminal group result

label influences path components
  -> artifact identity and filesystem name are coupled

artifact root or symlink state changes
  -> queued capture has no expected root generation

headless SVG differs from browser WebGL frame
  -> no source, plan or visible-frame lineage establishes what was proven
```

## Required result

```txt
CaptureArtifactCommitResult {
  commandId
  captureId
  artifactRootId
  rootGeneration
  status
  reason
  label
  providerFingerprint
  renderPlanFingerprint
  topologyKey
  meshFingerprint
  members: [
    { kind, artifactId, relativePath, bytes, hash, status }
  ]
  observationId
  browserVisibleFrameAckId?
}
```

## Claim boundary

The existing SVG is a deterministic headless observation, not a browser-render screenshot. Completion requires admitted artifact placement, complete paired-write receipts, source and plan lineage, and a separate browser observation when visible WebGL parity is claimed.
