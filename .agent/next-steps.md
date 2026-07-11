# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T10-50-14-04-00`

## Goal

Replace the globally exposed raw runtime with one session-owned capability gateway that can admit commands, return truthful results, revoke old leases and expose clone-safe read models.

## Plan ledger

- [ ] Preserve the current meadow composition and visible output.
- [ ] Complete Runtime Session Lifecycle Authority first.
- [ ] Assign one host lease ID, session ID and run generation.
- [ ] Define an explicit public `GameHost` property allowlist.
- [ ] Remove `GameHost.game`.
- [ ] Do not expose raw renderer, enhancer or provider references.
- [ ] Move game mutations behind internal domain services.
- [ ] Define immutable `host-command/v1` envelopes.
- [ ] Require command ID, capability ID, session ID and expected state frame.
- [ ] Add a canonical capability registry.
- [ ] Add lifecycle and session admission before every mutation.
- [ ] Add typed unavailable, rejected, duplicate, stale and accepted results.
- [ ] Separate transport completion from domain acceptance.
- [ ] Add capability sequence and bounded command/result journals.
- [ ] Define read-only capability descriptors.
- [ ] Project clone-safe state, diagnostics and committed-frame observations.
- [ ] Add observation revision and state fingerprint.
- [ ] Revoke prior capability leases on fatal rollback, restart and dispose.
- [ ] Make retained old gateways return stale or disposed results.
- [ ] Route browser editor actions through the gateway.
- [ ] Route Node headless actions through the same schema.
- [ ] Correlate accepted visual commands with a later render commit.
- [ ] Add raw-surface, lease-revocation and observation-isolation fixtures.
- [ ] Wire fixtures into `npm run check`.
- [ ] Run `npm run check`.
- [ ] Run browser and deployed Pages smoke tests.

## Required implementation order

```txt
1. host-capability-registry-kit
2. host-command-envelope-kit
3. host-session-fence-kit
4. host-command-admission-kit
5. raw-runtime-quarantine-kit
6. capability-sequence-kit
7. capability-result-kit
8. capability-journal-kit
9. gamehost-read-model-kit
10. clone-safe-observation-kit
11. capability-revocation-kit
12. browser-editor-capability-adapter-kit
13. headless-editor-capability-adapter-kit
14. host-capability-fixture-kit
```

## Public surface acceptance cases

```txt
list capabilities
read session observation
read state observation
read diagnostics observation
read committed-frame observation
invoke one admitted command
invoke one read-only capability
repeat a command ID and receive duplicate
call an old gateway after restart and receive stale
call after disposal and receive disposed/rejected result
```

## Rejection cases

```txt
unknown capability
missing command ID
missing or stale session ID
retired host lease
stale expected frame
future expected frame
stopped runtime when policy disallows mutation
disposed runtime
mutation attempted through read-only capability
invalid payload schema
```

## Acceptance criteria

```txt
GameHost exposes no raw game, renderer, enhancer or provider
all state-changing operations enter one admission function
old leases cannot mutate a new session
transport success never conceals domain rejection
read observations are structured-clone safe
mutating a returned observation cannot affect runtime state
journals remain bounded
browser and Node descriptors/results match
accepted visible mutation reaches one correlated render commit
```

## Ordered architecture queue

```txt
1. Runtime Session Lifecycle Authority + Single-RAF / Global-Lease / Rollback Fixture Gate
2. Host Capability Gateway + Raw Runtime Quarantine / Observation Isolation Fixture Gate
3. Runtime Step Admission and Clock Integrity + Finite / Monotonic / Work-Budget Fixture Gate
4. Source Provider Authority + External/Fallback Admission and Parity Fixture Gate
5. Render Topology Identity Authority + Source Mutation / Cache Rebuild Fixture Gate
6. Committed Frame Observation Authority + State/Plan/Render/Canvas Coherence Fixture Gate
7. Interaction Command Authority + Path/Inspect/Objective Progress Fixture Gate
8. DSK Registry Truth + Declared/Implemented/Consumed Fixture Gate
```

## Deferred until after this gate

```txt
deterministic editor stepping
movement simulation
objective and story command execution
replay
save/load
provider switching
render-plan rebuild commands
new public editor capabilities
shared-kit promotion
```

Do not add more public mutation capabilities while callers can bypass the gateway through `GameHost.game`.