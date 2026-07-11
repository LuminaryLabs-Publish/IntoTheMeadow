# Source Topology and GPU Cache Gap

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T06-38-59-04-00`

## Render chain

```txt
raw source plan
  -> sourceTopologyKey(rawPlan)
  -> enhancer cache
  -> enhanced meadow-render-plan/v2
  -> contract.topologyKey
  -> buildMeadowMeshData()
  -> renderer topology cache
  -> CPU mesh reuse or rebuild
  -> GPU buffer reuse or upload
  -> outline draw
  -> color draw
  -> renderer snapshot
```

## First cache defect

The source key includes:

```txt
plan id, version, seed, area, and style
object id, type, position, scale, and rotation
path points and width
focal-tree branchCount and canopyRadius
```

It omits render-affecting source fields:

```txt
path enabled, rutCount, pebbleCount
wildflower color and accent
rock color and accent
tree-line color and accent
focal-tree trunkRadius
focal-tree trunkHeight
focal-tree rootCount
focal-tree leafClusterCount
focal-tree shadowRadius
focal-tree renderStyle
raw wind state
runtime performance override
```

When only an omitted field changes, the enhancer reports a cache hit and returns the old enhanced descriptors.

## Second cache amplification

The renderer trusts `renderPlan.contract.topologyKey` as the complete mesh identity.

```txt
cached enhanced plan
  -> unchanged contract.topologyKey
  -> unchanged CPU mesh reference
  -> unchanged GPU buffers
  -> stale visible output
```

The renderer snapshot reports the cached topology key and rebuild counters. It does not report the raw source revision, source key schema, mesh fingerprint, buffer generation, or the source fields admitted into that generation.

## Rebuild path gap

`game.rebuildRenderPlan()` replaces `baseRenderPlan` and returns the new raw plan.

It does not:

```txt
increment a source revision
calculate a canonical source fingerprint
invalidate the enhancer
invalidate the renderer
return a cache admission result
prove the next frame consumed the new source
```

`lastPlan` and `lastRender` in the web host also remain the prior committed observations until a later successful frame.

## Validation gap

Current contract validation proves that required descriptor families exist and unknown source types are absent.

It does not prove:

```txt
all render-affecting source fields participate in identity
all source fields contribute to expected enhanced descriptors
source descriptor counts equal enhanced contribution counts
mesh fingerprint matches the enhanced topology
GPU generation matches the mesh fingerprint
rebuilds happen exactly once for static mutations
uniform-only changes avoid unnecessary mesh rebuilds
```

## Required render readback

```js
{
  sourceRevision: 4,
  providerFingerprint: "...",
  sourceKeySchema: "meadow-source-render-key/v1",
  sourceKey: "...",
  topologyKey: "...",
  meshKey: "...",
  meshFingerprint: "...",
  bufferGeneration: 5,
  vertexCount: 12345,
  descriptorCounts: {},
  contributionCounts: {},
  admissionStatus: "rebuild",
  committedFrameId: 98
}
```

## Required mutation matrix

```txt
time only                              -> enhancer hit, mesh hit
camera transform only                  -> classified dynamic, mesh hit
wind time/phase only                   -> dynamic uniform, mesh hit
wildflower color                       -> rebuild
rock accent                            -> rebuild
path rutCount                          -> rebuild
path pebbleCount                       -> rebuild
focal-tree trunkHeight                 -> rebuild
focal-tree rootCount                   -> rebuild
focal-tree leafClusterCount            -> rebuild
performance quality                    -> rebuild when topology budgets change
invalid unknown source type            -> reject before cache admission
identical rebuilt source plan          -> hit with new source revision linked to same identities
manual invalidate                      -> one rebuild and one new buffer generation
```

## Acceptance boundary

Do not claim persistent topology correctness until the mutation matrix proves both sides:

```txt
render-affecting changes rebuild exactly once
non-topology changes do not rebuild mesh buffers
```