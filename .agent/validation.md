# Validation

**Updated:** `2026-07-13T16-01-05-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Audit type:** documentation and source analysis only

## Summary

Source review confirms that the enhancer and WebGL renderer use separate incomplete cache fingerprints. Values omitted from `sourceTopologyKey()` affect contracted descriptors, and values omitted from `topologySummary()` affect static CPU mesh and GPU buffer contents. Existing tests prove only that time changes preserve topology and mesh identity.

## Plan ledger

**Goal:** state exactly what was inspected, changed, synchronized and left unproven.

- [x] Confirm the repository default branch is `main`.
- [x] Compare the full ten-repository Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have root `.agent` state and matching documented heads.
- [x] Select IntoTheMeadow by the oldest eligible central timestamp.
- [x] Read the render-plan enhancer, render contract, mesh builder, WebGL renderer, host, editor bridge and cache smoke tests.
- [x] Confirm source-key omissions for consumed descriptors.
- [x] Confirm runtime performance is outside enhancer cache identity.
- [x] Confirm contract topology omissions for static mesh dependencies.
- [x] Confirm renderer mesh/GPU reuse relies solely on `contract.topologyKey`.
- [x] Confirm static vertex arrays consume omitted atmosphere, material, tree and outline values.
- [x] Confirm existing tests prove time-only reuse but not positive invalidation.
- [x] Preserve the complete 44-kit service inventory.
- [x] Add a new timestamped tracker and audit family.
- [x] Refresh required root `.agent` documents and machine state.
- [x] Change documentation only.
- [x] Create no branch or pull request.
- [ ] Execute cache invalidation and failure fixtures later.

## Confirmed by source review

```txt
sourceTopologyKey covers selected source object fields only
sourceTopologyKey omits colors, atmosphere, path detail and multiple tree fields
runtime.performance is applied after source cache identity is calculated
topologySummary omits atmosphere and static material dependencies
mesh builder bakes atmosphere, material, tree and outline values into static arrays
renderer ensureMesh reuses CPU mesh and GPU buffers from contract.topologyKey
renderer snapshots expose counters but no aggregate source/contract/mesh revision
editor capture exposes no cache-decision or visible-frame correlation
render-plan smoke proves time-only enhancer reuse
renderer smoke proves time-only mesh stability
positive invalidation coverage is absent
```

## Source-derived but not executed

```txt
color-only source changes can retain predecessor contracted descriptors
runtime quality changes can retain predecessor grass and object policy
material changes can rebuild the contract while retaining predecessor GPU color buffers
atmosphere changes can be omitted by both cache layers
an unrelated later cache miss can expose changes that were previously retained
capture can report predecessor pixels after an accepted source or policy mutation
```

These are reachable ownership and invalidation findings, not claims of a production incident.

## Documentation changed

```txt
new timestamped project breakdown and turn ledger
new architecture, render, gameplay, interaction, cache-coherence, deploy and central-sync audits
START_HERE, current audit, next steps, known gaps, validation and kit registry refreshed
central repository ledger and internal change log synchronized separately
```

## Not executed

```txt
npm install
npm run check
positive enhancer invalidation fixtures
positive mesh invalidation fixtures
runtime performance mutation fixture
cache failure injection
atomic rollback fixture
browser cache-visible-frame smoke
production build
built-output browser smoke
GitHub Pages smoke
```

## Change boundary

```txt
runtime JavaScript changed: no
CSS changed: no
gameplay changed: no
provider loading changed: no
render contract changed: no
mesh builder changed: no
renderer behavior changed: no
editor bridge behavior changed: no
package or dependency changed: no
test or workflow changed: no
deployment changed: no
branch created: no
pull request created: no
```

## Claim boundary

This audit does not claim exhaustive dependency identity, correct cache invalidation, atomic contract/mesh/GPU adoption, rollback, readback parity, capture correctness, browser parity or production readiness. Those properties remain unimplemented and unproven.