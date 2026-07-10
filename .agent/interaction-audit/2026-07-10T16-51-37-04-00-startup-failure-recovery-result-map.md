# Interaction Audit: Startup Failure and Recovery Result Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T16-51-37-04-00`

## Current startup outcomes

```txt
missing canvas -> throw
missing external URL -> throw
import rejection -> rejected startWebHost promise
missing createMeadowAreaKit export -> throw
invalid render contract during frame -> stop loop and show fatal HUD/loading message
manual stop/start -> toggle requestAnimationFrame loop
```

## Missing result authority

The route has UI feedback for fatal frame errors, but source-load failures do not produce a normalized result row. No result records whether recovery was attempted, whether fallback was allowed, which source was selected, or why startup stopped.

## Required result model

```txt
{
  sequence,
  stage: manifest | import | export | source-create | source-validate | enhance | render,
  status: accepted | rejected | recovered | fatal,
  sourceMode: external | fallback | none,
  reason,
  recoverable,
  fallbackAttempted,
  fallbackAccepted
}
```

## Required behavior

```txt
one terminal startup result for every start attempt
stable reason codes for all source failures
explicit fallback policy
fatal UI projected from the same result row
GameHost/editor can inspect the bounded result journal
manual restart creates a new sequence rather than mutating the previous result
```

## Decision

Do not treat a caught console error or loading-text mutation as sufficient proof. Startup and recovery need a serializable result surface before adding more player interactions.