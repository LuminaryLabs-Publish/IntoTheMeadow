# Registry Truth Fixture Gate

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-11T02-20-44-04-00`

## Existing check command

```txt
npm run check
```

The current suite validates static files, the DSK registry, render plans, renderer behavior, deterministic scene output, and editor environments. It does not prove implementation and consumption truth.

## Required additions

```txt
tests/dsk-registry-census-smoke.mjs
tests/dsk-service-map-completeness-smoke.mjs
tests/dsk-implementation-resolution-smoke.mjs
tests/dsk-import-invocation-smoke.mjs
tests/dsk-producer-consumer-edge-smoke.mjs
tests/renderer-kit-service-contract-smoke.mjs
tests/gameplay-descriptor-consumption-smoke.mjs
tests/gamehost-kit-truth-readback-smoke.mjs
tests/browser-node-kit-truth-parity-smoke.mjs
```

## Deployment gate

Pages deployment should remain blocked unless:

```txt
declared counts match source
every required kit has explicit services
all source-backed rows resolve
descriptor shells are labeled honestly
producer-consumer edges validate
browser and Node truth snapshots share a schema
no unresolved required kit remains
```
