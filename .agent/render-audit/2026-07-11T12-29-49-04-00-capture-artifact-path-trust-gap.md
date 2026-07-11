# Render Audit: Capture Artifact Path Trust Gap

**Timestamp:** `2026-07-11T12-29-49-04-00`

## Summary

Browser rendering writes directly to the canvas, while Node `renderer.capture` writes synthetic JSON and SVG artifacts through the same lexical `safePath()` helper used by workspace operations. The capture content may be valid, but its destination is not proven to remain inside the admitted artifact root.

## Plan ledger

**Goal:** correlate every headless capture with an admitted artifact path, editor session and capture result without allowing artifact writes outside the configured root.

- [x] Trace browser WebGL capture behavior.
- [x] Trace Node synthetic capture behavior.
- [x] Trace artifact-root and capture-path construction.
- [x] Identify the containment and correlation gap.
- [x] Define render-facing proof.
- [ ] Implement and run capture-path fixtures later.

## Current flow

```txt
createEnvironment
  -> artifactRoot = safePath(projectRoot, configuredArtifactRoot)

renderer.capture
  -> build plan, mesh and metrics
  -> captureId from label and topologyKey
  -> jsonPath = safePath(artifactRoot, captures/<id>.json)
  -> svgPath = safePath(artifactRoot, captures/<id>.svg)
  -> write both artifacts
  -> report paths as successful artifacts
```

## Gap

The artifact root and child paths rely on a raw string-prefix test. Sibling-prefix and symlink escapes can therefore produce successful capture results for files written outside the configured artifact tree.

The capture packet also lacks:

```txt
editor session ID
workspace root ID
artifact root revision
filesystem operation IDs
path admission results
content hashes
atomic pair commit status
```

A JSON write can succeed while the SVG write fails, leaving a partial capture without one terminal pair result.

## Required render-facing contract

```txt
capture command
  -> capture preflight
  -> admitted artifact root
  -> admitted JSON target
  -> admitted SVG target
  -> stage both outputs
  -> write temporary files
  -> commit both or report partial failure
  -> publish content hashes and relative paths
  -> correlate capture ID, topology key and editor session
```

## Required proof

```txt
browser capture remains read-only with respect to host filesystem
Node capture cannot escape artifact root
JSON and SVG use one path authority
pair writes report atomic or explicitly partial result
public artifacts expose relative paths only
capture result includes session and topology lineage
rejected capture performs no write
```

This render audit does not claim browser and Node image parity. The Node SVG remains a synthetic observation surface rather than WebGL output.