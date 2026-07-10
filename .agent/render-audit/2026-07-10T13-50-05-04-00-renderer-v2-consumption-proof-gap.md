# Render audit: renderer v2 consumption proof gap

Timestamp: 2026-07-10T13-50-05-04-00

## Render surface

`MeadowWebGLRendererV2` is the active visual surface. It owns WebGL context setup, shader compilation, mesh cache keys, outline/main passes, render-plan schema validation, primitive fallback counts, descriptor counts, and aggregate renderer snapshots.

## What works

- Renderer v2 exposes useful aggregate snapshots.
- It can validate render-plan shape.
- It tracks descriptor counts and primitive fallback counts.
- It has a compatibility wrapper for safer renderer creation.

## Proof gap

The renderer still does not emit row-level proof for:

- source descriptor ID consumed by a draw path;
- descriptor unsupported by renderer v2;
- fallback primitive generated for a source row;
- mesh-cache hit/miss tied to source row;
- pass-level inclusion or skip reason;
- frame ID that ties `GameHost`, renderer snapshot, and source plan together.

## Risk

Without source-attributed renderer rows, visual changes can mask descriptor drift. A screenshot or aggregate count can pass while a source row is silently ignored or fallback-rendered.

## Next safe check

Create a DOM-free renderer proof fixture that feeds a minimal render plan into the consumer layer and asserts JSON-safe rows for consumed, unsupported, fallback-rendered, and skipped descriptors.
