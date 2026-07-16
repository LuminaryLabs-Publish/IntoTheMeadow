# Gameplay Audit: Failure Stop and Restart Loop

**Timestamp:** `2026-07-16T15-38-27-04-00`

## Current loop

```txt
normal frame
  -> tick game
  -> validate plan
  -> render

exception
  -> set stopped = true
  -> expose raw failure text
  -> stop scheduling frames

manual start()
  -> set stopped = false
  -> schedule another frame
```

## Gap

`start()` can resume after a fatal exception without an accepted recovery decision, replacement renderer/runtime generation, cleared failure state or proof that the underlying cause is recoverable. Conversely, the public failure surface does not tell an operator whether retry is safe, requires reload, requires provider replacement or is terminal.

```txt
fault generation: absent
retryable/terminal classification: absent
recovery precondition: absent
replacement generation result: absent
failure-state retirement: absent
first recovered safe frame acknowledgement: absent
```

## Required loop

```txt
BrowserFailureAdmissionResult
  -> classify recoverability
  -> keep simulation and presentation policy explicit
  -> accept or reject FailureRecoveryCommand
  -> replace affected generation atomically when required
  -> publish FailureRecoveryResult
  -> publish first recovered safe frame acknowledgement
```

## Boundary

No gameplay, state, frame scheduler or restart behavior changed.