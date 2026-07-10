# Runtime Session Stop, Dispose, and Restart Contract

**Timestamp:** `2026-07-10T19-48-09-04-00`

## Required session state

```txt
sessionId
runId
state: created | starting | running | stopped | disposing | disposed | failed
rafId
frameCount
startedAt
stoppedAt
disposedAt
fatalError
resourceLedger
globalLeaseLedger
resultJournal
```

## Stop semantics

A resumable stop must:

```txt
cancel the retained RAF
clear RAF ownership
prevent frame/tick/render submission
leave renderer/editor/game resources intact
return no-op when already stopped
reject after disposal
```

## Dispose semantics

Disposal order:

```txt
mark disposing
cancel RAF
prevent new commands
remove editor error/rejection listeners
release NexusEditorEnvironment when owned by this session
release GameHost when owned by this session
invalidate enhancer cache
call renderer.dispose()
release retained references
mark disposed
append a terminal result row
```

## Restart semantics

Restart must be one explicit operation, not an uncoordinated `stop(); start();` pair. It must prove that the old RAF is cancelled before a new RAF is scheduled and increment `runId` while retaining or replacing `sessionId` according to the declared policy.

## Fatal rollback

Every construction step must register cleanup immediately. If external import, game construction, renderer construction, contract validation, editor installation, or first-frame render fails, rollback must run the reverse cleanup sequence and leave no active global or RAF.

## Idempotency matrix

```txt
start while running      -> no-op
stop while stopped       -> no-op
stop while disposed      -> rejected
restart while running    -> accepted, one old RAF cancelled, one new RAF scheduled
dispose while stopped    -> accepted
dispose while disposed   -> no-op
start after disposed     -> rejected
fatal after disposed     -> no-op observation only
```

## Proof requirement

Every browser and headless-editor lifecycle command must produce the same stable result status and reason codes and expose the same bounded lifecycle journal.