# Deploy Audit: Failure Projection Browser Fixture Gate

**Timestamp:** `2026-07-16T15-38-27-04-00`

## Required fixtures

```txt
external provider import rejection
missing provider export
createIntoTheMeadowGame rejection
render-plan validation rejection
renderer frame exception
window error event
unhandled promise rejection
unknown editor capability
throwing editor capability
duplicate error burst
error-buffer capacity and eviction
manual retry against retryable failure
retry rejection against terminal failure
```

## Assertions

- Source, built artifact and deployed Pages publish the same stable public codes.
- Public HUD text contains no stack, absolute path, raw provider URL or raw capability arguments.
- Editor public results contain correlation identity, severity, health state and retryability.
- Internal diagnostic snapshots remain bounded under duplicate storms.
- Equivalent failures deduplicate predictably.
- Health transitions are deterministic.
- Recovery cannot adopt stale runtime or renderer generations.
- `FirstSafeFailureFrameAck` binds the accepted public envelope to the displayed failure frame.

## Current evidence

`npm run check` includes static, DSK, render, renderer, deterministic scene and editor smoke suites, but the reviewed tests do not provide the browser failure-injection, redaction, retention, recovery or Pages parity gate defined here.

## Release rule

A build is not failure-projection ready until all public error surfaces use accepted redacted envelopes and the same fixture suite passes against source, artifact and Pages.