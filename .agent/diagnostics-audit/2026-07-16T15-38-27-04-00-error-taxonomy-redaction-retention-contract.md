# Diagnostics Audit: Error Taxonomy, Redaction and Retention Contract

**Timestamp:** `2026-07-16T15-38-27-04-00`

## Public taxonomy

Minimum stable classes:

```txt
BOOT_PROVIDER_LOAD_FAILED
BOOT_GAME_COMPOSITION_FAILED
RENDER_PLAN_CONTRACT_FAILED
RENDERER_FRAME_FAILED
BROWSER_SCRIPT_ERROR
BROWSER_UNHANDLED_REJECTION
EDITOR_CAPABILITY_UNAVAILABLE
EDITOR_CAPABILITY_FAILED
RECOVERY_REJECTED
```

Each public result requires:

```txt
publicCode
severity: info | warning | error | fatal
healthState: healthy | degraded | failed
retryability: automatic | user-retry | reload | terminal
safeMessage
correlationId
occurredAt
```

## Internal record

```txt
errorId
correlationId
source
operation
publicCode
severity
retryability
release/route/runtime/renderer/editor revisions
cause name and message
stack
filename and location
capability ID and normalized argument digest
firstObservedAt
lastObservedAt
occurrenceCount
retention state
```

## Redaction rules

- Do not project stack traces to the normal HUD.
- Do not project absolute paths, query credentials, opaque provider URLs or raw capability arguments.
- Normalize module locations to approved repository-relative identifiers where possible.
- Keep user-safe messages independent from exception text.
- Permit raw records only through an explicitly privileged diagnostic surface.

## Bounded retention

```txt
capacity: explicit and tested
exact duplicate window: explicit
eviction policy: oldest settled or least recent duplicate group
aggregate counters: retained after eviction
fatal records: retained until release/session retirement or explicit acknowledgement
snapshot size: bounded
```

## Current divergence

The editor bridge uses an unbounded array and returns the full clone. Boot and host fatal paths bypass diagnostics entirely and write raw exception text directly to the HUD.

## Completion evidence

```txt
classification fixtures
redaction fixtures
path and stack leakage fixtures
duplicate storm fixture
capacity and eviction fixture
health-state transition fixture
recovery result fixture
source/build/Pages public-envelope parity
FirstSafeFailureFrameAck
```