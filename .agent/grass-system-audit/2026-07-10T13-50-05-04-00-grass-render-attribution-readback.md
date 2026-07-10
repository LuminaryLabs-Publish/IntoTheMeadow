# Grass system audit: render attribution readback

Timestamp: 2026-07-10T13-50-05-04-00

## Grass systems observed

The render enhancer composes grass-related DSKs for density, archetype, static batching, patches, instancing, shader wind, LOD, density scaling, and debug surfaces.

## Current value

The grass stack is a good source-description layer. It separates placement, visual archetype, wind, density, and batching concerns better than the older renderer-only route.

## Gap

Grass readback is still aggregate. It does not prove:

- which grass source rows became patches;
- which patches became instance batches;
- which rows were culled by LOD or density scaling;
- which rows were fallback-rendered;
- which wind/shader rows were applied;
- which debug rows correspond to a source descriptor.

## Risk

Grass visual parity can drift while aggregate counts look valid. A renderer pass can preserve approximate density while losing source identity.

## Next ledge

Add grass proof rows with source ID, consumer, outcome, reason, fallback status, instance count, LOD decision, wind decision, and frame/source fingerprint.
