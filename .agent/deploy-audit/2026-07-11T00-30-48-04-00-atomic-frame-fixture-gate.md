# Atomic Frame Fixture Gate

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-11T00-30-48-04-00`

## Current deployment posture

The static Pages route and existing `npm run check` validate structure, registry, render plan, renderer shape, deterministic scene reachability, and headless-editor capability reachability.

They do not prove atomic browser-frame publication.

## Missing fixtures

```txt
committed-frame-coherence-smoke.mjs
render-failure-no-partial-publish-smoke.mjs
editor-tick-frame-commit-smoke.mjs
reset-frame-commit-smoke.mjs
capture-frame-correlation-smoke.mjs
gamehost-frame-snapshot-smoke.mjs
browser-node-frame-parity-smoke.mjs
failed-frame-pointer-stability-smoke.mjs
```

## Required adapters

```txt
fake lifecycle session with sessionId/runId
pure staged game-state adapter
fake enhancer with deterministic fingerprints
fake renderer with phase-injected failures
fake canvas acknowledgement
fake HUD/GameHost/editor consumers
fake browser capture surface
Node mesh/synthetic observation adapter
bounded journal inspection
```

## Gate assertions

```txt
one request produces zero or one committed frame
failed render never publishes staged state or plan
lastCommittedFrame remains stable after failure
editor tick/reset cannot mutate without terminal frame result
GameHost snapshot is internally coherent
capture frame ID matches renderer and committed frame IDs
raw and enhanced plan times match
browser and Node shared deterministic fingerprints match
synthetic capture is never labeled browser WebGL proof
existing visual and editor checks remain green
```

## Package integration target

```txt
npm run check
  -> existing static/registry/render/editor checks
  -> lifecycle fixtures
  -> atomic committed-frame fixtures
  -> later source-provider parity fixtures
```

## Deployment rule

Do not treat a successful build, a non-empty canvas, or a passing synthetic headless capture as committed-frame proof. Deployment remains incomplete until state, plan, render, canvas, GameHost, and editor observations are frame-correlated and failure-safe.
