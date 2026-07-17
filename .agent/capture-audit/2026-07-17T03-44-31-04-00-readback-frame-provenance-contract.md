# Capture Audit: Readback, Frame and Provenance Contract

**Timestamp:** `2026-07-17T03-44-31-04-00`

## Required result

```txt
CaptureArtifactResult {
  captureId
  captureGeneration
  sourceKind
  browserSessionId
  runtimeGeneration
  rendererGeneration
  frameId
  planId
  topologyKey
  viewportRevision
  width
  height
  devicePixelRatio
  colorSpace
  mimeType
  pixelDigest
  metadataDigest
  artifactDigest
  committedAt
  status
}
```

## Source classes

- `live-webgl-readback`: actual accepted WebGL frame pixels.
- `browser-screenshot`: browser-composited page capture from one identified session.
- `synthetic-svg-observation`: descriptor-derived approximation; never equivalent to live pixels.
- `metadata-only`: renderer or plan evidence without pixels.

## Invariants

1. Pixel and metadata evidence share one `CaptureId` and browser/runtime generation.
2. The renderer snapshot is produced by the same frame whose pixels are encoded.
3. Width, height and DPR are captured from the same viewport revision.
4. A synthetic observation cannot satisfy a live-WebGL fixture.
5. Screenshot and DOM evidence must originate from one browser session or remain separate results.
6. Source, built artifact and Pages evidence retain origin and module revision.
7. A committed capture is immutable and digest-addressed.

## Fixtures

```txt
fresh-frame live readback
capture between RAF callbacks
resize during capture
DPR change during capture
context loss during readback
hidden document capture rejection
synthetic/live classification
single-session screenshot plus DOM
pixel/snapshot mismatch rejection
source/artifact/Pages parity
```

## Boundary

Contract only. No capture implementation or fixture was added.
