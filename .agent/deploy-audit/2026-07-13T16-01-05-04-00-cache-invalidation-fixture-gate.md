# Deploy Audit: Cache Invalidation Fixture Gate

**Generated:** `2026-07-13T16-01-05-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

Current source tests prove that time-only updates reuse topology and mesh state. Deployment does not yet require positive invalidation, failure preservation, source/build parity or first-visible-revision proof.

## Plan ledger

**Goal:** block cache-sensitive releases until source mutations produce the correct rebuild scope and a matching visible frame across source, built and deployed origins.

- [x] Review current render-plan and renderer smoke coverage.
- [x] Identify missing positive invalidation cases.
- [x] Identify missing failure and rollback cases.
- [x] Define source/build/Pages parity requirements.
- [ ] Implement and execute the gate later.

## Existing proof

```txt
render-plan schema and descriptor families are valid
time-only enhancement preserves topologyKey
time-only enhancement records a cache hit
time-only mesh generation preserves meshKey and vertex count
```

## Missing source fixtures

```txt
wildflower color and accent mutation
rock and distant-tree palette mutation
atmosphere hill geometry and color mutation
path rutCount and pebbleCount mutation
focal-tree trunk, root, leaf-count, material and outline mutation
runtime performance-profile mutation
grass material and density-policy mutation
uniform-only camera, light, sky and wind update
stale and duplicate revision rejection
```

## Missing failure fixtures

```txt
contract construction failure
mesh construction failure
first GPU-buffer allocation failure
partial GPU-buffer allocation failure
candidate adoption failure
rollback to complete predecessor generation
capture during prepared but uncommitted candidate
```

## Required assertions

```txt
expected cache decision class is explicit
source, policy, contract, mesh and GPU generations are monotonic
all required fingerprints change exactly when their dependencies change
uniform-only updates preserve static mesh generation
mesh-affecting updates replace mesh and GPU generation
failed candidates do not alter active plan, mesh or buffers
renderer snapshot cites the accepted revisions
first visible frame cites the accepted cache decision
capture waits for or identifies the acknowledged frame
```

## Release matrix

```txt
npm run check
source browser mutation smoke
production build
built-output browser mutation smoke
GitHub Pages mutation smoke
source/build/Pages fingerprint and visible-result parity
```

## Boundary

No test, build, browser session or deployed-origin smoke was run. This documentation pass creates no release-readiness claim.