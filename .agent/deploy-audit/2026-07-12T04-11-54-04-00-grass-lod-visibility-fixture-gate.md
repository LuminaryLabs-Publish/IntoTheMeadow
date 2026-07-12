# Deploy Audit: Grass LOD and Visibility Fixture Gate

**Timestamp:** `2026-07-12T04-11-54-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Current deployment proof

The package check validates static files, DSK descriptors, render-plan structure, CPU mesh consistency, deterministic scene reads and headless editor surfaces. GitHub Pages can publish the static browser product.

## Missing pre-deploy proof

```txt
camera-distance tier transitions
far-tier reachability
terrain-tint output
frustum patch rejection
instance/card budget enforcement
stale camera and surface rejection
renderer/diagnostics parity
first visible grass-frame correlation
deployed traversal behavior
```

## Required local gates

```bash
npm run fixture:grass-lod-distance
npm run fixture:grass-frustum
npm run fixture:grass-budget
npm run fixture:grass-stale-plan
npm run fixture:grass-diagnostics-parity
npm run smoke:grass-visible-frame
npm run check
```

## Required browser gate

```txt
boot canonical meadow
capture initial grass visible-set result
move camera across near/mid/far/tint thresholds
rotate patches outside the frustum
force a constrained grass budget
verify renderer snapshot and debug counts
capture the first frame for each committed revision
```

## Required Pages gate

```txt
load deployed Pages route
verify expected build/content identity
repeat bounded traversal
confirm no fatal renderer stop
confirm far/tint tiers and frustum reduction
confirm frame acknowledgement and diagnostics parity
```

## Deployment decision

Documentation may ship. Runtime grass visibility readiness must remain unclaimed until the local, browser and deployed gates exist and pass with captured artifacts.
