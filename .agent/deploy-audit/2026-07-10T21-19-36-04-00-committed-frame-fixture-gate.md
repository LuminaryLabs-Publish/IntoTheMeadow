# Committed Frame Fixture Gate

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-10T21-19-36-04-00`

## Current deployment gate

`npm run check` runs static, registry, render-plan, renderer, deterministic-scene, and editor smoke checks before deployment.

It does not execute an atomic frame-coherence scenario.

## Required fixtures

```txt
tests/committed-frame-coherence-smoke.mjs
tests/render-failure-no-partial-publish-smoke.mjs
tests/editor-tick-frame-commit-smoke.mjs
tests/reset-frame-commit-smoke.mjs
tests/capture-frame-correlation-smoke.mjs
```

## DOM-free gate

Use injected fake RAF, game, enhancer, renderer, and capture adapters to prove:

```txt
frame request ordering
single commit after all phases succeed
previous frame retention on failure
bounded journals
tick/reset policy
stable result reasons
```

## Browser gate

Use the real route to prove:

```txt
GameHost and NexusEditorEnvironment expose the same committed frame
renderer.captureCommittedFrame identifies the displayed pixels
viewport and canvas dimensions match
browser errors reference request sequence/phase
```

## Package integration

Append the fixtures to `npm run check` only after the runtime contracts exist. Pages deployment should fail when frame coherence fails.

## Non-goals

```txt
no visual retuning
no shader changes
no renderer replacement
no CDN migration
no new gameplay content
```
