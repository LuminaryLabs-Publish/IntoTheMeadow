# Runtime Lifecycle Fixture Gate

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-10T22-58-36-04-00`

## Current deployment posture

The product is a static Pages route. The existing `npm run check` validates local structure, DSK registry, render plans, renderer behavior, deterministic scene reachability, and headless-editor surfaces.

The deployment gate does not prove runtime lifecycle ownership.

## Missing pre-deploy fixtures

```txt
runtime-session-lifecycle-smoke.mjs
runtime-single-raf-smoke.mjs
runtime-stop-cancels-raf-smoke.mjs
runtime-restart-generation-smoke.mjs
runtime-dispose-idempotency-smoke.mjs
runtime-fatal-rollback-smoke.mjs
runtime-global-lease-smoke.mjs
runtime-listener-release-smoke.mjs
runtime-render-after-dispose-smoke.mjs
```

## Required fixture adapters

```txt
fake requestAnimationFrame/cancelAnimationFrame queue
fake clock
fake global target with previous GameHost/NexusEditorEnvironment values
fake event target with listener accounting
fake renderer with allocation/disposal counters
fake enhancer with invalidation counter
fake game with tick/reset counters
phase-injected construction and first-frame failures
```

## Gate assertions

```txt
at most one active RAF owner exists
stop cancels the retained RAF
restart cannot revive old-run callbacks
construction failure unwinds every prior acquisition
first-frame failure leaves no RAF, global, listener, or renderer ownership
only the active lease owner restores/deletes globals
dispose order is stable and reverse-acquisition-safe
dispose is idempotent
post-dispose mutations are rejected
lifecycle snapshots and journals are JSON-safe and bounded
current render-plan, renderer, editor, and visual checks still pass
```

## Package integration target

```txt
npm run check
  -> existing static/registry/render/editor checks
  -> runtime lifecycle fixtures
  -> later committed-frame fixtures
```

## Deployment rule

Do not treat a successful Pages build or a visually running meadow as lifecycle proof. The deploy gate is incomplete until stop, restart, rollback, global release, listener release, renderer disposal, and post-dispose rejection are deterministic in Node fixtures and smoke-tested in the browser.
