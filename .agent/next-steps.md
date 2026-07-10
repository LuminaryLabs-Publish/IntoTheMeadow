# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-10T15-18-29-04-00`

## Goal

Add a serializable, measured ledger that proves how each render descriptor family contributes to the built mesh, then reconcile DSK registry status with implementation-backed source truth. Preserve the current route and visuals while making renderer, GameHost, and editor readback authoritative enough for automated inspection.

## Current next build slice

```txt
IntoTheMeadow Mesh Contribution Ledger + Registry Truth Fixture Gate
```

## Plan ledger

```txt
[ ] Preserve the external meadow-area-kit URL, render-plan v2 schema, topologyKey behavior, current visual output, GameHost legacy methods, and editor protocol.
[ ] Add a mesh contribution ledger owned by the mesh-builder boundary.
[ ] Give every geometry stage a stable family id: atmosphere, terrain, grass, flowers, ground-cover, rocks, distant-trees, focal-tree.
[ ] Record expected descriptor count, attempted count, consumed count, skipped count, unsupported count, emitted vertices, emitted triangles, and reason rows.
[ ] Retain source ids where cardinality is practical and summarize deterministically where it is not.
[ ] Derive primitiveFallbackCount from actual fallback rows instead of returning a constant.
[ ] Stop treating input descriptorCounts as measured renderer counts; keep them as expectations and expose measured counts separately.
[ ] Add a renderer snapshot contribution block without removing existing snapshot fields.
[ ] Add additive GameHost getRenderContributionLedger or equivalent proof projection.
[ ] Add additive editor capability renderer.getContributionLedger and include the ledger in renderer.capture metadata.
[ ] Add a registry truth snapshot that classifies every registry entry as external, source-backed implementation, descriptor shell, planned, or unresolved.
[ ] Cross-check dsk-registry.json, REQUIRED_V01_DSK_IDS, src/dsks/index.js, and concrete imported modules.
[ ] Add DOM-free fixtures for full consumption, empty family, unsupported family, skipped malformed row, and fallback accounting.
[ ] Add registry fixtures that fail when active-v0.1 claims are not backed by an explicit classification.
[ ] Wire the new fixtures into npm run check.
[ ] Keep gameplay movement/action/objective implementation deferred to a separate slice.
[ ] Update repo-local .agent docs and the central LuminaryLabs ledger after implementation lands.
```

## Suggested files

```txt
src/render-proof/create-mesh-contribution-ledger.js
src/render-proof/mesh-contribution-types.js
src/render-proof/create-registry-truth-snapshot.js
src/renderers/meadow-mesh-builder-v2.js
src/renderers/meadow-webgl-renderer-v2.js
src/boot/expose-game-host.js
src/editor/install-editor-bridge.js
tests/mesh-contribution-ledger-smoke.mjs
tests/mesh-contribution-edge-cases-smoke.mjs
tests/dsk-registry-truth-smoke.mjs
package.json
```

## Expected row shape

```txt
{
  familyId,
  sourceId,
  status: consumed | skipped | unsupported | fallback | absent,
  expectedCount,
  attemptedCount,
  consumedCount,
  emittedVertices,
  emittedTriangles,
  reason
}
```

## Implementation order

```txt
1. Define contribution row/status contracts.
2. Instrument mesh collector with before/after vertex counters.
3. Wrap each mesh-builder stage with deterministic contribution accounting.
4. Split expected descriptor counts from measured contribution counts.
5. Derive fallback totals from rows.
6. Extend renderer snapshot additively.
7. Extend GameHost and editor bridge additively.
8. Build registry truth classification.
9. Add DOM-free fixtures and edge cases.
10. Wire package checks and run validation.
11. Update central tracking.
```

## Stop condition

Stop when tests can prove, without a browser, which descriptor families were expected, consumed, skipped, unsupported, or fallback-rendered; how much geometry each produced; and whether every registry kit has an explicit implementation-truth classification.