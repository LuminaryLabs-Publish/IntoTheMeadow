# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T08-31-33-04-00`

## Goal

Implement one session-owned runtime-step authority so browser RAF, browser editor and Node headless commands cannot apply non-finite, regressed, unbounded, duplicate or stale steps.

## Plan ledger

- [ ] Preserve the current meadow composition and visible output.
- [ ] Complete Runtime Session Lifecycle Authority first.
- [ ] Assign one session ID and run generation to the step clock.
- [ ] Define immutable `runtime-step-command/v1`.
- [ ] Add command ID, source, session ID, clock epoch and expected frame.
- [ ] Validate requested step count before entering any loop.
- [ ] Require a bounded positive integer step count.
- [ ] Define one deterministic `maxStepsPerCommand`.
- [ ] Validate dt and target time as finite values.
- [ ] Reject negative or out-of-range dt.
- [ ] Enforce monotonic simulation time within one clock epoch.
- [ ] Separate wall-clock samples from simulation time authority.
- [ ] Define browser RAF adapter policy.
- [ ] Remove direct browser editor access to raw `game.tick()`.
- [ ] Remove direct Node editor loop ownership before admission.
- [ ] Add accepted, rejected, duplicate and stale results.
- [ ] Add a stable rejection reason catalog.
- [ ] Add monotonic step sequence and bounded journal.
- [ ] Make reset retire the prior clock epoch.
- [ ] Correlate the first post-reset step.
- [ ] Correlate accepted steps with future committed render frames.
- [ ] Expose clone-safe clock and journal observations through GameHost.
- [ ] Expose equivalent browser and Node editor capabilities.
- [ ] Add finite-value, budget, monotonicity, reset and concurrency fixtures.
- [ ] Wire fixtures into `npm run check`.
- [ ] Run `npm run check`.
- [ ] Run browser and deployed Pages smoke tests.

## Required implementation order

```txt
1. runtime-step-command-kit
2. finite-delta-policy-kit
3. step-budget-kit
4. monotonic-simulation-clock-kit
5. session-frame-fence-kit
6. runtime-step-admission-kit
7. step-sequence-kit
8. step-result-kit
9. step-journal-kit
10. browser-raf-step-adapter-kit
11. browser-editor-step-adapter-kit
12. headless-editor-step-adapter-kit
13. reset-clock-transaction-kit
14. step-frame-correlation-kit
15. runtime-step-fixture-kit
```

## Canonical acceptance cases

```txt
one canonical browser step
one canonical browser-editor step when policy allows it
one canonical Node step
multi-step Node request within budget
maximum allowed step count
monotonic explicit target time
reset followed by first step in new epoch
duplicate command returns duplicate without mutation
```

## Rejection cases

```txt
NaN, Infinity or -Infinity dt
negative dt
zero or out-of-range dt according to chosen policy
NaN, Infinity or -Infinity target time
regressed target time
NaN or Infinity step count
negative step count
fractional step count
step count above budget
stale session ID
retired clock epoch
stale expected frame
future expected frame
disposed runtime
stopped runtime when stepping is not allowed
```

## Acceptance criteria

```txt
all rejected requests leave state and render lineage unchanged
all accepted step counts are bounded integers
one accepted step increments state frame once
simulation time is finite and monotonic within an epoch
browser RAF does not expose raw wall time as authority
browser editor cannot bypass active session policy
Node editor validates before looping
reset retires old commands
browser and Node adapters return the same nested result schema
step journal remains bounded and clone-safe
accepted visual mutations reach one correlated render commit
```

## Ordered architecture queue

```txt
1. Runtime Session Lifecycle Authority + Single-RAF / Global-Lease / Rollback Fixture Gate
2. Runtime Step Admission and Clock Integrity + Finite / Monotonic / Work-Budget Fixture Gate
3. Source Provider Authority + External/Fallback Admission and Parity Fixture Gate
4. Render Topology Identity Authority + Source Mutation / Cache Rebuild Fixture Gate
5. Committed Frame Observation Authority + State/Plan/Render/Canvas Coherence Fixture Gate
6. Interaction Command Authority + Path/Inspect/Objective Progress Fixture Gate
7. DSK Registry Truth + Declared/Implemented/Consumed Fixture Gate
```

## Deferred until after this gate

```txt
movement simulation
wind simulation timing
objective timers
story timing
replay
save/load time restoration
visual retuning
renderer replacement
WebGPU migration
new meadow content
audio
shared-kit promotion
```

Do not add timing-dependent gameplay until the clock rejects malformed and out-of-epoch requests deterministically.