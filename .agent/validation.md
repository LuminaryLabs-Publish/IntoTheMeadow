# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T06-38-59-04-00`

## Plan ledger

**Goal:** separate completed static inspection from executable proof and define the exact mutation fixtures required before claiming that persistent render caches are correct.

- [x] Review the complete accessible Publish inventory.
- [x] Compare every eligible repository with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `IntoTheMeadow`.
- [x] Read `AGENTS.md` and current `.agent` state.
- [x] Inspect raw source-plan caching and rebuild.
- [x] Inspect source-key projection and enhancer cache logic.
- [x] Inspect enhanced topology hashing.
- [x] Inspect CPU mesh and WebGL buffer caching.
- [x] Inspect GameHost and editor readbacks.
- [x] Inspect current render-plan and renderer smoke tests.
- [x] Document render cache identity authority and required fixtures.
- [x] Change documentation only.
- [x] Push documentation to `main`.
- [ ] Execute runtime checks after implementation exists.

## Source inspection completed

```txt
raw baseRenderPlan cached: yes
explicit rebuildRenderPlan: yes
source revision: no
provider fingerprint in render lineage: no
source key: yes
source key schema/version: no
source key covers every static field: no
enhancer manual invalidate: yes
coordinated rebuild/invalidate result: no
enhanced topology key: yes
CPU mesh builder: yes
renderer topology cache: yes
mesh key in renderer snapshot: no
GPU buffer generation: no
source-to-frame lineage: no
cache journal: no
```

## Existing proof

Current checks prove:

```txt
static source and manifest reachability
DSK registry structure
fallback source-plan generation
render-plan enhancement and descriptor validation
required descriptor families
substantial CPU mesh output
buffer-array length parity
no primitive fallback output
time-only changes preserve topology and mesh identity
enhancer reports at least one cache hit
```

Current checks do not prove:

```txt
static source mutations change source identity
all render-affecting fields are part of the key
static mutations rebuild exactly once
dynamic-only mutations avoid static rebuilds
manual invalidation creates one new mesh generation
failed candidates preserve prior committed caches
identical deterministic rebuilds retain mesh buffers with new source lineage
mesh contribution fingerprint parity
GPU buffer generation identity
GameHost/editor/canvas lineage agreement
```

## Execution status

```txt
npm run check executed in this documentation pass: no
browser smoke executed: no
Pages smoke executed: no
runtime source changed: no
package scripts changed: no
dependencies changed: no
```

The GitHub connector was used for this documentation audit and does not execute repository commands.

## Required source-key mutation fixture

Start from one canonical frozen source plan and mutate one field at a time.

Static rebuild cases:

```txt
path.enabled
path.rutCount
path.pebbleCount
wildflower.color
wildflower.accent
rock.color
rock.accent
tree-line-tree.color
tree-line-tree.accent
focal-tree.trunkRadius
focal-tree.trunkHeight
focal-tree.rootCount
focal-tree.leafClusterCount
focal-tree.shadowRadius
focal-tree.renderStyle
performance quality or density budget
```

Dynamic-only cases:

```txt
time
camera position and target
viewport size
wind phase/time
wind direction and strength when declared uniform-only
```

Each case must assert:

```txt
source revision
source-key schema
prior and next source keys
changed-field classification
cache admission status and reason
enhancer rebuild and hit counts
topology key
mesh key
mesh contribution counts
buffer generation
renderer rebuild and hit counts
committed frame ID
```

## Required rollback fixture

Cases:

```txt
invalid source validation
unknown source type
unsupported static field
failed enhancement
failed mesh build
failed GPU buffer upload
failed draw
render after disposal
stale expected source revision
duplicate rebuild command ID
```

Every failure must preserve:

```txt
last committed raw source
last committed source key
last committed enhanced plan
last committed topology key
last committed mesh key
last committed GPU buffer generation
last committed visible frame
```

## Required identical rebuild fixture

```txt
produce the same deterministic raw plan twice
increment source revision for the second production event
prove source fingerprint and staticRenderKey are identical
prove enhancer and mesh caches hit
prove bufferGeneration does not change
append lineage linking the new source revision to the existing identities
```

## Required host/editor proof

```txt
GameHost.getRenderLineage()
GameHost.getRenderCacheJournal()
GameHost.rebuildRenderSource()
NexusEditorEnvironment render.rebuildSource
NexusEditorEnvironment render.invalidateCache
NexusEditorEnvironment render.getLineage
NexusEditorEnvironment render.getCacheJournal
Node headless equivalents
renderer.capture includes committed lineage
all outputs are clone-safe and bounded
```

## Future commands

```bash
npm run fixture:render-source-key
npm run fixture:render-cache-admission
npm run fixture:render-mesh-parity
npm run fixture:render-buffer-generation
npm run fixture:render-rebuild-rollback
npm run fixture:render-cache-observation
npm run check
```

## Completion boundary

Do not claim persistent render caching is correct because time updates hit the cache. Completion requires a mutation matrix proving exact rebuilds for every registered static field, no rebuilds for dynamic-only fields, rollback after failure, and one observable source-to-frame lineage.