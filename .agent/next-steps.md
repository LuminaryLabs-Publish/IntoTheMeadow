# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T06-38-59-04-00`

## Goal

Implement a versioned render identity and cache admission chain so every render-affecting source mutation rebuilds enhanced descriptors and GPU buffers exactly once, while time and other dynamic-only changes preserve static buffers.

## Plan ledger

- [ ] Preserve the current meadow composition and visible output.
- [ ] Complete Runtime Session Lifecycle Authority before restart-sensitive rebuild commands.
- [ ] Complete Source Provider Authority before claiming production/test source parity.
- [ ] Add a monotonic source revision to accepted raw-plan production events.
- [ ] Add a provider fingerprint to each source revision.
- [ ] Define `meadow-source-render-key/v1`.
- [ ] Create one canonical projection of every render-affecting source field.
- [ ] Classify static, dynamic-uniform, frame-only, and observation-only fields.
- [ ] Include path detail, scatter material, focal-tree geometry, performance, and relevant wind inputs.
- [ ] Return typed cache admission results for hit, rebuild, reject, and invalidate.
- [ ] Make `rebuildRenderPlan()` validate a candidate before replacing the committed raw plan.
- [ ] Coordinate enhancer and renderer invalidation.
- [ ] Add sourceRevision, sourceKey, topologyKey, meshKey, and bufferGeneration lineage.
- [ ] Add deterministic mesh contribution counts and a mesh fingerprint.
- [ ] Increment bufferGeneration only after successful GPU upload.
- [ ] Preserve the last successful visible frame when candidate enhancement, mesh build, upload, or render fails.
- [ ] Add a bounded cache admission/rebuild journal.
- [ ] Expose clone-safe lineage through GameHost.
- [ ] Add browser editor rebuild, invalidate, lineage, and journal capabilities.
- [ ] Add equivalent Node headless capabilities.
- [ ] Link future interaction results to source revision and committed frame lineage.
- [ ] Add the complete static mutation matrix.
- [ ] Add the dynamic-only no-rebuild matrix.
- [ ] Add rollback and identical deterministic rebuild fixtures.
- [ ] Wire all fixtures into `npm run check`.
- [ ] Run `npm run check`.
- [ ] Run browser and deployed Pages smoke tests.

## Required implementation order

```txt
1. source-plan-revision-kit
2. render-affecting-projection-kit
3. render-cache-key-schema-kit
4. render-cache-admission-kit
5. render-cache-invalidation-kit
6. render-lineage-kit
7. mesh-contribution-fingerprint-kit
8. gpu-buffer-generation-kit
9. render-cache-journal-kit
10. render-cache-observation-kit
11. render-cache-mutation-fixture-kit
```

## Static mutation acceptance cases

```txt
path enabled changes -> rebuild
path points or width changes -> rebuild
path rutCount changes -> rebuild
path pebbleCount changes -> rebuild
flower color or accent changes -> rebuild
rock color or accent changes -> rebuild
tree-line color or accent changes -> rebuild
focal-tree trunkRadius or trunkHeight changes -> rebuild
focal-tree rootCount or branchCount changes -> rebuild
focal-tree leafClusterCount or canopyRadius changes -> rebuild
focal-tree shadow or render style changes -> rebuild
performance density or LOD budget changes -> rebuild when topology changes
provider output changes -> rebuild when normalized static projection changes
```

## Dynamic-only acceptance cases

```txt
time changes -> no static rebuild
camera transform changes -> no mesh rebuild
wind phase/time changes -> no mesh rebuild
wind direction/strength changes -> uniform-only when policy declares it
viewport resize -> no mesh rebuild
identical deterministic source rebuild -> cache hit with new source revision lineage
```

## Rejection and rollback cases

```txt
unknown source type -> reject before cache mutation
invalid source plan -> reject and preserve committed identities
unsupported static field -> reject with field path
stale expected source revision -> reject
render after disposal -> reject
failed enhancement -> preserve prior committed frame
failed mesh build -> preserve prior committed frame
failed GPU upload -> preserve prior committed frame
failed draw -> preserve prior committed frame and record failure
```

## Acceptance criteria

```txt
all registered static mutations change staticRenderKey
all dynamic-only changes preserve staticRenderKey
changed staticRenderKey produces one enhanced topology rebuild
changed mesh payload produces one new meshKey
new meshKey produces one new bufferGeneration
cache hits never change bufferGeneration
failed candidates never replace committed lineage
GameHost, editor, renderer snapshot, and canvas capture report one lineage
journals remain bounded and clone-safe
same source plus same policy yields the same identities
```

## Deferred until after this gate

```txt
visual retuning
renderer replacement
WebGPU migration
new meadow content
free-form controls
new objectives or story beats
audio
save/load
shared-kit promotion
```