# Validation

**Updated:** `2026-07-18T07-40-23-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Audit type:** documentation and source analysis only

## Summary

Source review confirms that IntoTheMeadow publishes render descriptor counts and topology identity but does not admit bounded descriptor, terrain-resolution, vertex or typed-buffer work before full synchronous mesh expansion and WebGL upload.

## Checklist

- [x] Confirm default branch `main`.
- [x] Compare all 11 Publish repositories and exclude Cavalry.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Confirm all eligible repository heads matched their documented heads before selection.
- [x] Select IntoTheMeadow by the oldest synchronized timestamp.
- [x] Read render-plan generation, contract validation, mesh construction, renderer upload and smoke-test source.
- [x] Preserve all 44 declared kit surfaces and services.
- [x] Add the timestamped render-budget audit family and refresh root `.agent` state.
- [x] Change documentation only and create no branch or pull request.
- [ ] Execute render-budget, browser and deployment fixtures later.

## Confirmed by source review

```txt
render-plan v2 publishes descriptorCounts and topologyKey
validation checks schema, version, identity, required types and array presence
terrain resolution is accepted without a hard limit
field, grass and tree descriptor counts are accepted without hard limits
mesh builder expands all accepted descriptors into five JavaScript attribute arrays
renderer creates five Float32Array uploads after full expansion
mesh is submitted once for outline and once for main presentation
performance data is not consumed by contract, builder or renderer admission
```

## Source arithmetic

```txt
attribute payload per vertex: 12 floats = 48 typed-array bytes
near grass instance maximum: 28 cards × 15 vertices = 420 vertices
mid grass instance maximum: 16 cards × 15 vertices = 240 vertices
far grass instance maximum: 4 cards × 15 vertices = 60 vertices
```

The byte figure excludes JavaScript-array storage, temporary arrays and objects, WebGL driver copies and implementation-specific overhead.

## Source-derived but not executed

```txt
valid-shaped provider or editor output can exceed an undeclared work envelope
no pre-build estimate can currently reject or reduce overflow
actual mesh work is not compared with an accepted profile
partial construction or upload failure has no render-budget settlement result
visible frames are not correlated with a budget admission generation
```

These are architecture and proof findings, not claims of a reproduced crash, frame-rate regression or memory failure.

## Documentation changed

```txt
new timestamped project breakdown and turn ledger
new architecture, render, gameplay, interaction, render-budget, deploy and central-sync audits
START_HERE, current audit, next steps, known gaps, validation and kit registry refreshed
central ledger and internal change log synchronized separately
```

## Not executed

```txt
local checkout
npm install
npm run check
exact-limit fixture
one-over-limit fixture
extreme terrain or grass fixture
deterministic degradation fixture
estimated-versus-actual count fixture
browser profile fixture
production artifact smoke
GitHub Pages smoke
```

## Change boundary

```txt
runtime JavaScript changed: no
DSK descriptors changed: no
provider loading changed: no
game state behavior changed: no
renderer or shader changed: no
editor behavior changed: no
package or dependency changed: no
test or workflow changed: no
deployment changed: no
branch created: no
pull request created: no
```

## Claim boundary

This audit does not claim bounded render work, performance improvement, performance regression, memory usage, browser parity, artifact parity, Pages parity or production readiness.