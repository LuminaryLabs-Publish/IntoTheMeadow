# Render Audit: Raw Fatal Visible Diagnostic Gap

**Timestamp:** `2026-07-16T15-38-27-04-00`

## Current path

```txt
boot rejection or frame exception
  -> reveal #hud
  -> write error.stack, error.message or String(error) to #status
  -> show generic loading/renderer-stopped text
  -> stop or fail before another normal WebGL frame
```

## Gap

The visible failure frame is not derived from an accepted public failure envelope. It can include implementation stack text or module locations and does not identify a stable code, severity, affected operation, retryability, correlation ID or recovery action.

```txt
safe public envelope: absent
redaction acknowledgement: absent
failure presentation generation: absent
stale fatal projection rejection: absent
accessible failure status result: absent
FirstSafeFailureFrameAck: absent
```

## Required frame contract

```txt
accepted BrowserFailureAdmissionResult
  -> resolve active document and presentation generations
  -> project stable user-safe title, message, code and next action
  -> keep raw cause only in bounded internal diagnostics
  -> reject retired failure projections
  -> publish FirstSafeFailureFrameAck
```

## Boundary

No render or HUD behavior changed. No boot, render-contract or WebGL failure was injected in a browser.