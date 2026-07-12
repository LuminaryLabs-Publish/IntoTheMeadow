# Editor Bridge Audit: Generation, Listener and Error-Retention Contract

**Generated:** `2026-07-12T09-06-38-04-00`

## Current contract

```txt
bridge object frozen: yes
capability descriptor list clone-safe: yes
capability arguments cloned: yes
capability failures typed: partially
browser errors observed: yes
explicit dispose helper: yes

bridge generation: no
predecessor replacement transaction: no
listener lease identity: no
host stop/dispose integration: no
bounded error retention: no
error sequence/timestamp/frame: no
paged query/acknowledgement: no
stale capability rejection: no
browser lifecycle fixtures: no
```

## Required error entry

```txt
BrowserErrorEntry {
  sequence
  bridgeId
  bridgeGeneration
  runtimeSessionId
  hostGeneration
  type
  action
  message
  stack
  filename
  line
  column
  frameId
  observedAtMonotonic
  observedAtUtcMetadata
  fingerprint
  repeatCount
}
```

## Required retention policy

```txt
maximum entries
maximum encoded bytes
maximum age
fingerprint coalescing window
per-type quota
oldest-entry eviction
explicit dropped-entry counters
query page limit
acknowledgement cursor
```

## Required disposal order

```txt
mark bridge closing
reject new invokes
revoke capability leases
remove browser listener leases
flush or release journal according to policy
remove global only when generation matches
publish disposal result
mark disposed
```

## Fixture gate

```txt
single install and dispose
repeated install replaces predecessor
stale predecessor invoke rejection
stop/start policy
error and rejection normalization
10,000-event retention bound
fingerprint coalescing
paged query and acknowledgement
snapshot cost independent of total historic faults
listener count returns to baseline
current bridge capture cites current frame
```
