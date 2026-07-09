# Deploy Audit — Check Script Fixture Wire Map

**Timestamp:** `2026-07-09T09-41-24-04-00`

## Current validation/deploy shape

`package.json` exposes:

```txt
npm run check
npm test
```

`npm run check` currently runs:

```txt
node tests/static-smoke.mjs
node tests/dsk-registry-smoke.mjs
node tests/render-plan-smoke.mjs
node tests/deterministic-scene-smoke.mjs
```

## Next fixture wire

After pure fixture files exist, extend the check script with:

```txt
node scripts/into-the-meadow-render-action-fixture.mjs
```

## Fixture constraints

```txt
no DOM
no canvas
no browser globals
no external renderer required
no external CDN mutation
pure source descriptors only
stable row outputs
nonzero coverage for render and gameplay proof
```

## Deployment rule

Keep this repo as a static publish route. Do not introduce a server or build pipeline unless the runtime implementation actually needs it.
