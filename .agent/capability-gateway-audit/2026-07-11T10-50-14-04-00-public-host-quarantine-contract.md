# Public Host Quarantine Contract

**Timestamp:** `2026-07-11T10-50-14-04-00`

## Objective

Make `GameHost` a read-model and command gateway rather than a container of live runtime authorities.

## Public surface policy

Allowed:

```txt
build and protocol identity
session and lifecycle observation
capability descriptors
single invoke(command) function
clone-safe state observation
clone-safe diagnostics observation
clone-safe committed-frame observation
bounded command/result journal observation
```

Forbidden:

```txt
raw game
raw renderer
raw render-plan enhancer
raw external provider
mutable caches or buffers
unfenced tick/reset/rebuild/dispose methods
```

## Lease policy

Each exposed gateway must carry:

```txt
hostLeaseId
sessionId
runGeneration
installedAt sequence
status: active | revoked | disposed
```

Stop, fatal rollback, restart and dispose must revoke the prior lease. A retained old reference must return a typed stale or disposed result and must not mutate the new session.

## Observation policy

Observations must be:

```txt
plain-data
structured-clone safe
JSON-safe where practical
revisioned
bounded
free of functions, DOM nodes, WebGL handles and provider instances
correlated with session and state frame
```

## Result policy

Every command returns one nested schema with transport and domain status separated.

```txt
transport: completed | failed
admission: accepted | rejected | duplicate | stale | unavailable
commit: none | state | state-and-render
```

## Required fixtures

```txt
no forbidden properties on GameHost
old lease cannot mutate after restart
read observation mutation does not affect runtime
command arguments are isolated from caller mutation
result objects are clone-safe
journal capacity is bounded
browser and Node gateways expose equivalent descriptors and results
```