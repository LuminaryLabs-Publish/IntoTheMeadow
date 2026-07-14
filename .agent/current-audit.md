# Current Audit: Browser Startup Readiness and First Frame Authority

**Updated:** `2026-07-14T15-38-28-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `browser-startup-readiness-first-frame-authority-audited`  
**Immediate predecessor:** `runtime-reset-session-replay-authority-central-reconciled`

## Summary

`startWebHost()` publishes the browser host and editor bridge, hides loading, schedules RAF, and resolves before one render contract has passed. A render-contract or renderer failure inside RAF is converted to UI state by `showFatal()` after the startup promise has resolved.

The failure path does not revoke `GameHost`, dispose `NexusEditorEnvironment`, remove its error listeners, retire renderer/enhancer ownership, or publish a typed failed startup result. Public editor mutation and capture capabilities can also run before first-frame readiness.

## Plan ledger

**Goal:** bind provider admission, candidate construction, first-frame proof, public publication, failure rollback, and readiness into one browser startup authority.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only IntoTheMeadow by the oldest synchronized timestamp.
- [x] Inspect the document boot, host, global publication, editor bridge, RAF and fatal paths.
- [x] Preserve all 44 kit surfaces and offered services.
- [x] Add the timestamped audit family.
- [x] Change documentation only and push to `main`.
- [ ] Implement the runtime authority and browser fixtures later.

## Interaction loop

```txt
construct provider, game, renderer and enhancer
  -> publish GameHost
  -> publish NexusEditorEnvironment and listeners
  -> hide loading
  -> schedule RAF
  -> tick, enhance, validate and render

frame failure
  -> stop future loop work
  -> show fatal UI
  -> retain public globals and candidate ownership
```

## Main findings

```txt
BootAttemptId: absent
private candidate participant phase: absent
provider fingerprint and startup manifest: absent
loading-to-first-frame correlation: absent
pre-ready editor mutation gate: absent
atomic public host adoption: absent
typed BrowserStartupResult: absent
typed BrowserStartupFailureResult: absent
failed candidate rollback receipts: absent
stale or superseded boot rejection: absent
FirstVisibleMeadowFrameAck: absent
```

## Required parent domain

`meadow-browser-startup-readiness-first-frame-authority-domain`

## Required transaction

```txt
BrowserStartupCommand
  -> allocate boot attempt identity
  -> admit and fingerprint provider
  -> prepare game, renderer, enhancer and editor candidates privately
  -> validate one exact candidate frame
  -> atomically publish globals and Ready state
  -> publish BrowserStartupResult and FirstVisibleMeadowFrameAck
  -> reject stale attempts
  -> on failure retire every candidate and publish rollback receipts
```

## Boundary

Documentation only. No runtime, renderer, editor, test, build, workflow, or deployment code changed.