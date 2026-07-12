# Gameplay Audit: Bridge Replacement and Listener Retention Loop

**Generated:** `2026-07-12T09-06-38-04-00`

## Finding

Repeated host construction can install multiple browser error listeners while only the newest bridge remains globally discoverable. `stop()` suspends frame submission but does not dispose the bridge. A hidden predecessor can therefore keep collecting faults and retain an expanding error array after it is no longer the visible control surface.

## Failure loop

```txt
start host A
  -> bridge A listeners installed
  -> bridge A globally published
stop host A
  -> RAF stops
  -> bridge A listeners remain
start host B
  -> bridge B listeners installed
  -> global pointer replaced with bridge B
browser error occurs
  -> bridge A appends error
  -> bridge B appends error
repeat
  -> duplicate observation work
  -> hidden retained arrays grow
  -> full-array snapshot cloning cost grows
```

## Gameplay impact

The bridge is diagnostic, but it shares the page with the active game. Duplicate listeners and unbounded retained entries can increase main-thread and memory pressure during long sessions, failure storms, reload-like test loops or automated browser observation. The repository has no typed degraded state or budget response for this path.

## Required outcome

Bridge replacement must retire predecessor listener leases, bound the error journal and expose one current generation. Host stop/restart policy must explicitly decide whether diagnostics remain active, suspend or dispose.
