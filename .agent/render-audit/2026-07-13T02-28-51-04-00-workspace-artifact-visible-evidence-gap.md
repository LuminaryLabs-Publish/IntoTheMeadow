# Workspace Artifact and Visible Evidence Gap

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-13T02-28-51-04-00`

## Summary

Browser capture uses the rendered canvas directly, while Node capture constructs JSON and SVG evidence from the fallback render plan. The Node artifact filenames include caller-controlled labels and are admitted by the same lexical prefix helper as workspace operations. Artifact location and identity are therefore not independently proven.

## Plan ledger

**Goal:** require every headless visual artifact to cite an admitted artifact root, normalized name, render-plan identity and completed write result.

- [x] Trace browser and Node capture paths.
- [x] Trace label-to-filename construction.
- [x] Trace artifact-root admission and write operations.
- [x] Record missing evidence lineage.
- [x] Define a revisioned artifact result.
- [ ] Implement and execute fixtures later.

## Current Node capture path

```txt
renderer.capture({ label, width, height })
  -> build current plan, mesh and metrics
  -> captureId = label + topologyKey
  -> jsonPath = safePath(artifactRoot, captures/<captureId>.json)
  -> svgPath = safePath(artifactRoot, captures/<captureId>.svg)
  -> mkdir parent
  -> write JSON
  -> write SVG
  -> publish artifact paths relative to repository root
```

## Gaps

```txt
capture label normalization: absent
artifact ID/path separation: absent
canonical artifact-root identity: absent
artifact-root generation: absent
post-realpath containment check: absent
symlink policy: absent
atomic paired JSON/SVG commit: absent
partial-write rollback: absent
artifact hash and byte count: absent
render-plan/provider lineage in artifact identity: partial
visible-frame acknowledgement: browser only remains unbound
artifact result journal: absent
```

## Reachable evidence failure

```txt
hostile or malformed label
  -> label becomes part of captureId and filename
  -> path resolution uses lexical prefix admission
  -> one or both outputs can target an unintended location
  -> returned artifact list can describe parent-traversing paths
  -> loop evidence may count artifacts without proving their admitted root
```

A second failure exists if the JSON write succeeds and SVG write fails. The capture has no paired transaction or rollback, yet the filesystem can retain a partial artifact set.

## Required artifact transaction

```txt
RenderCaptureCommand
  -> bind editor session and render-plan revision
  -> bind provider, topology and metrics fingerprints
  -> normalize label into a non-path artifact label
  -> allocate opaque CaptureId
  -> derive filenames from CaptureId only
  -> admit canonical artifact root and parent
  -> stage JSON and SVG under the admitted parent
  -> hash and validate both staged files
  -> atomically publish the pair or return a typed partial failure
  -> publish RenderCaptureResult
```

## Required result

```txt
RenderCaptureResult {
  commandId
  captureId
  status
  reason
  artifactRootId
  artifactRootGeneration
  label
  renderPlanId
  topologyKey
  providerFingerprint
  planFingerprint
  jsonArtifact { relativePath, sha256, bytes }
  svgArtifact { relativePath, sha256, bytes }
  observationIds
}
```

## Proof gates

```txt
safe label
empty label
absolute-like label
parent-traversal label
separator-containing label
Unicode normalization collision
sibling-prefix artifact root
symlinked capture directory
JSON success plus SVG failure
repeated capture ID
source, built-output and Pages evidence lineage
```

## Completion boundary

A generated SVG or data URL is not trusted visual evidence by itself. Completion requires admitted artifact placement, immutable identity, paired write results, hashes and correlation to the render-plan/provider revision being evaluated.