# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T10-50-14-04-00`

## Plan ledger

**Goal:** separate completed source inspection from executable proof and define the exact fixture gate required before claiming that `GameHost` or the editor bridge is an authoritative control surface.

- [x] Review the complete accessible Publish inventory.
- [x] Compare every eligible repository with the central ledger.
- [x] Verify root `.agent/START_HERE.md` coverage.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `IntoTheMeadow`.
- [x] Read `AGENTS.md` and current `.agent` state.
- [x] Inspect browser host construction and global exposure.
- [x] Inspect `GameHost` properties and read methods.
- [x] Inspect browser editor capability registration and invocation.
- [x] Inspect direct tick, reset and source-plan rebuild paths.
- [x] Inspect existing positive-path editor tests.
- [x] Document host capability authority and required fixtures.
- [x] Change documentation only.
- [ ] Execute runtime checks after implementation exists.

## Source inspection completed

```txt
GameHost exposes raw game: yes
GameHost exposes mutation methods indirectly: yes
browser editor calls raw game.tick: yes
browser editor calls raw game.reset: yes
page scripts can bypass invoke: yes
session-fenced host admission: no
command ID and sequence: no
typed semantic result: no
capability lease revocation: no
bounded command/result journal: no
clone-safe observation revision: no
host-command to render-commit correlation: no
```

## Existing proof

Current checks prove:

```txt
required files and host wiring exist
DSK registry shape is valid
fallback source plan can be generated
render plan can be enhanced and validated
CPU mesh is substantial
positive headless editor capability names route
runtime.tick can advance a positive test case
headless capture can be produced
```

Current checks do not prove:

```txt
GameHost omits raw authority properties
all mutations enter capability admission
old host leases are inert after restart
stale commands reject without mutation
transport completion differs from domain acceptance
duplicate command IDs do not repeat side effects
read observations are isolated from runtime state
journals are bounded
browser and Node result schemas match
accepted visible commands reach a correlated frame
```

## Execution status

```txt
npm run check executed in this documentation pass: no
browser smoke executed: no
Pages smoke executed: no
runtime source changed: no
package scripts changed: no
dependencies changed: no
render output changed: no
```

The GitHub connector was used for this documentation audit and does not execute repository commands.

## Required surface allowlist fixture

Assert the complete public `GameHost` key set.

Allowed:

```txt
build
protocol
getSessionObservation
listCapabilities
invoke
getStateObservation
getDiagnosticsObservation
getCommittedFrameObservation
getJournalObservation
```

Forbidden:

```txt
game
renderer
planEnhancer
meadow
raw tick/reset/rebuild/dispose functions
WebGL objects
DOM objects
provider instances
```

## Required admission fixture

Accepted:

```txt
known capability
valid command ID
matching active lease and session
matching expected state frame
valid payload
runtime state permits command
```

Rejected or unavailable:

```txt
unknown capability
missing command ID
stale lease
stale session
stale or future expected frame
stopped runtime
disposed runtime
invalid payload
mutation through read-only capability
```

Every rejection must assert:

```txt
state unchanged
source-plan revision unchanged
render lineage unchanged
one bounded result row appended
no new render commit
```

## Required lease-revocation fixture

```txt
start host generation 1
retain gateway reference
stop and restart as generation 2
invoke through generation-1 gateway
assert stale or disposed result
assert generation-2 state unchanged
dispose generation 2
assert both references cannot mutate
```

## Required observation-isolation fixture

```txt
read state observation
mutate returned nested arrays and objects where possible
read state again
assert runtime state and fingerprints unchanged
repeat for diagnostics, render-plan and journal observations
assert all values structuredClone successfully
assert JSON serialization follows documented policy
```

## Required browser/Node parity fixture

Both adapters must expose equivalent nested fields:

```txt
commandId
capabilityId
hostLeaseId
sessionId
status
reason
commandSequence
stateFrame
renderCommitId
observationRevision
```

## Future commands

```bash
npm run fixture:host-capability-surface
npm run fixture:host-capability-admission
npm run fixture:host-lease-revocation
npm run fixture:observation-isolation
npm run fixture:browser-host-capability
npm run check
```

## Completion boundary

Do not claim an authoritative host or editor API because capability names exist. Completion requires raw-runtime quarantine, exclusive admission, revocable leases, truthful semantic results, clone-safe observations, browser/Node parity and render correlation.