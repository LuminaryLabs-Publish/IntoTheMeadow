# Render Cache Mutation Fixture Gate

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T06-38-59-04-00`

## Goal

Prevent deployment when a render-affecting source mutation can reuse stale enhanced descriptors or GPU buffers, or when a dynamic-only mutation causes unnecessary static rebuilds.

## Current checks

```txt
static-smoke
dsk-registry-smoke
render-plan-smoke
renderer-v2-smoke
deterministic-scene-smoke
headless-editor-environment-smoke
headless-editor-command-smoke
headless-editor-loop-smoke
```

Current render checks prove one stable plan and one time-only cache hit. They do not execute a source mutation matrix.

## Required new fixtures

```txt
tests/render-source-key-mutation-smoke.mjs
tests/render-cache-admission-smoke.mjs
tests/render-mesh-contribution-parity-smoke.mjs
tests/render-buffer-generation-smoke.mjs
tests/render-rebuild-rollback-smoke.mjs
tests/render-cache-observation-smoke.mjs
```

## Required commands

```bash
npm run fixture:render-source-key
npm run fixture:render-cache-admission
npm run fixture:render-mesh-parity
npm run fixture:render-buffer-generation
npm run fixture:render-rebuild-rollback
npm run fixture:render-cache-observation
npm run check
```

## Mutation matrix

Every fixture must start from one canonical raw plan and change one field at a time.

```txt
time                                no static rebuild
camera position                     no static rebuild
wind uniform                        no static rebuild
path rutCount                       one static rebuild
path pebbleCount                    one static rebuild
flower color                        one static rebuild
rock accent                         one static rebuild
tree-line color                     one static rebuild
focal-tree trunkHeight              one static rebuild
focal-tree rootCount                one static rebuild
focal-tree leafClusterCount         one static rebuild
performance density budget          one static rebuild
unknown source type                 reject before cache mutation
invalid source plan                 reject and preserve committed cache
manual invalidate                   one static rebuild
identical deterministic rebuild     cache hit with new source revision lineage
```

## Assertions per case

```txt
source revision
source fingerprint
source-key schema
prior and next source keys
changed-field classification
cache admission status and reason
enhancer rebuild and hit counters
topology key
mesh key and contribution counts
buffer generation
renderer rebuild and hit counters
committed frame ID
last committed identities preserved after failure
```

## Browser smoke

```txt
boot the pinned production provider
capture baseline lineage and canvas
invoke one supported source rebuild mutation
wait for a committed frame
capture next lineage and canvas
prove the expected rebuild or cache hit
prove no browser errors
prove capture identities match renderer and GameHost observations
```

## Pages gate

Deployment should fail when:

```txt
a registered static mutation does not change staticRenderKey
a topology change does not change topologyKey
a mesh payload change does not change meshKey
a new meshKey does not create a new bufferGeneration
a dynamic-only mutation rebuilds static buffers without policy justification
a failed candidate replaces committed identities
GameHost, renderer snapshot, and canvas capture disagree on lineage
```

## Status

```txt
fixtures implemented: no
package scripts wired: no
npm run check executed in this documentation pass: no
browser smoke executed: no
Pages smoke executed: no
runtime source changed: no
```