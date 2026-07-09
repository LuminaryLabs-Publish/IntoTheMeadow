# Render Audit — Renderer Consumption Readback Fixture

**Timestamp:** `2026-07-08T22-38-17-04-00`

## Current render path

```txt
rawPlan = game.getRenderPlan(time)
plan = enhanceRenderPlan(rawPlan, { performance: rawPlan.style?.performance })
lastPlan = plan
render = renderer.render(plan)
GameHost.getSnapshot().enhancedRenderPlan = lastPlan
GameHost.getSnapshot().render = renderer.getSnapshot?.()
```

## Source-backed render facts

```txt
index.html mounts canvas#scene.
boot-game.js passes canvas/HUD/status/loading/debug to startWebHost.
web-host.js imports meadow-webgl-render-kit from GAME_MANIFEST.externalKits[1].url.
web-host.js passes the enhanced plan to renderer.render(plan).
web-host.js exposes renderer.getSnapshot?.() through GameHost.
enhanceRenderPlan injects grassSystem, grassPatches, windField, postProcess, performance, renderStyle/outline, and stats.
```

## Current render gap

The route can expose the enhanced plan and whatever renderer snapshot exists, but it does not compare them.

This means descriptor loss is silent.

## Required parity rows

```txt
base-object-row
outline-policy-row
wind-field-row
post-process-row
performance-budget-row
grass-density-texture-row
grass-static-batch-row
grass-patch-row
grass-draw-group-row
grass-shader-wind-row
grass-lod-policy-row
grass-density-scale-row
grass-stats-row
renderer-snapshot-available-row
renderer-snapshot-schema-row
```

## Reason catalog

```txt
consumed
unconsumed
unsupported
fallback-rendered
missing-renderer-snapshot
missing-renderer-field
invalid-plan-descriptor
count-mismatch
not-applicable
```

## Fixture acceptance rows

```txt
fixture: enhanced plan has grassSystem
expected: parity report includes grass rows

fixture: renderer snapshot missing
expected: report is failed but stable, with missing-renderer-snapshot reasons

fixture: renderer snapshot sparse
expected: missing fields are explicit rows, not thrown exceptions

fixture: renderer snapshot reports base object count only
expected: base objects classify consumed, grass/postprocess/wind classify unsupported or unconsumed

fixture: debug GameHost snapshot requested
expected: existing enhancedRenderPlan and render fields remain present, with additive renderParity branch
```

## Stop condition

Stop the render pass when `GameHost.getSnapshot().renderParity` exists and a DOM-free fixture can classify expected-vs-actual descriptor rows without a browser, canvas, or Three.js renderer.
