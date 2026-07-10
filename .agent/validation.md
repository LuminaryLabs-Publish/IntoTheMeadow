# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-10T15-18-29-04-00`

## Validation performed this pass

This was a documentation-only breakdown using authenticated GitHub reads and direct updates to `main`.

```txt
full accessible Publish inventory reviewed: yes
central ledger comparison performed: yes
selected repository root .agent reviewed: yes
runtime source changed: no
branch created: no
pull request created: no
npm install: not run
npm run check: not run
npm test: not run
browser smoke: not run
headless editor smoke: not run
mesh contribution fixtures: not run because they do not exist yet
registry truth fixture: not run because it does not exist yet
pushed to main: yes
central ledger updated: yes
```

## Source inspection completed

```txt
package.json
AGENTS.md
dsk-registry.json
src/dsks/index.js
src/game/create-into-the-meadow-game.js
src/game/enhance-render-plan.js
src/hosts/web-host.js
src/boot/expose-game-host.js
src/renderers/meadow-mesh-builder-v2.js
src/renderers/meadow-webgl-renderer-v2.js
src/editor/install-editor-bridge.js
tests/static-smoke.mjs
```

## Existing checks

```txt
npm run check
npm test
npm run editor:smoke
npm run editor:loop
npm run editor:browser
```

`npm run check` currently covers static structure, DSK registry, render plan, renderer v2, deterministic scene, and editor environment/command/loop reachability. It does not prove measured mesh contribution or registry implementation truth.

## Required next checks

```txt
node tests/mesh-contribution-ledger-smoke.mjs
node tests/mesh-contribution-edge-cases-smoke.mjs
node tests/dsk-registry-truth-smoke.mjs
npm run check
npm test
npm run editor:smoke
```

## Required fixture assertions

```txt
all eight geometry families have deterministic rows
expected descriptor counts remain separate from measured counts
vertex deltas sum to final vertexCount
triangle deltas sum to final triangleCount
empty families report absent rather than consumed
malformed entries report skipped with stable reasons
unknown families report unsupported or fail contract validation explicitly
primitiveFallbackCount equals fallback-row total
GameHost preserves legacy methods and adds proof projection
editor bridge exposes the same serializable contribution rows
all 45 registry entries have explicit external/source-backed/descriptor-shell/planned/unresolved classification
active-v0.1 cannot silently imply implementation-backed source
```

## Validation warning

A successful rendered frame, nonzero vertex count, or matching echoed descriptor count is not proof that each descriptor family was consumed. The next gate must measure contribution at the mesh-builder boundary.