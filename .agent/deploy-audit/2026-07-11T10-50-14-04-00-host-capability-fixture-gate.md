# Host Capability Fixture Gate

**Timestamp:** `2026-07-11T10-50-14-04-00`

## Deployment blocker

Current checks can confirm that capability names route, but they do not prove the public host surface is authoritative or safely revocable.

## Required pure fixtures

```txt
GameHost property allowlist
raw game/renderer/enhancer/provider absence
capability descriptor schema
command envelope validation
session and lifecycle admission
unknown capability result
stale and duplicate command result
bounded journal behavior
clone-safe observation behavior
old lease revocation after restart
```

## Required browser fixture

```txt
start controlled host
capture active host lease and session
invoke one read action
invoke one admitted mutation
confirm one typed result
confirm one later committed render observation
stop and restart host
invoke through old retained gateway
assert stale/disposed result and no mutation
inspect GameHost for forbidden raw authority properties
```

## Required Node parity fixture

The headless environment must expose equivalent capability IDs, command fields, status values and observation fields without browser-only objects.

## Future scripts

```bash
npm run fixture:host-capability-surface
npm run fixture:host-capability-admission
npm run fixture:host-lease-revocation
npm run fixture:observation-isolation
npm run fixture:browser-host-capability
npm run check
```

## Completion rule

Do not deploy a capability-authority claim until direct raw runtime access is absent, old leases are inert, all mutation is admitted, observations are isolated and browser/Node results match.