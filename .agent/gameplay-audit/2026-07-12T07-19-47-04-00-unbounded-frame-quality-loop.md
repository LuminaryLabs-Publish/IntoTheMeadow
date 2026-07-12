# Gameplay Audit: Unbounded Frame and Quality Loop

**Timestamp:** `2026-07-12T07-19-47-04-00`

## Summary

The browser advances one fixed `1/60` game tick and submits one full render on every RAF regardless of measured cost. Gameplay state, renderer work and quality policy therefore have no shared deadline, backlog or degradation result.

## Plan ledger

**Goal:** prevent display cadence or device load from silently deciding simulation and presentation quality by introducing explicit frame admission and quality results.

- [x] Trace RAF, tick, enhancement, rendering and debug projection.
- [x] Confirm no rolling performance state or quality transition exists.
- [x] Preserve prior runtime-clock authority as a dependency.
- [ ] Implement and validate budget-aware quality transitions.

## Current loop

```txt
RAF timestamp
  -> absolute time
  -> tick with constant dt 1/60
  -> enhance static plan
  -> render outline and color passes
  -> publish counts
  -> request next RAF
```

## Consequences

```txt
slow frame: no budget result
fast frame: no headroom result
hidden/throttled frame: no sampling policy
device capability change: no quality reconsideration
sustained overload: no stable degradation transaction
recovered headroom: no bounded upgrade transaction
quality change: no gameplay/render revision correlation
```

## Required gameplay relationship

```txt
simulation step result
  -> committed scene revision
  -> admitted quality revision
  -> renderer work plan
  -> visible frame result
```

The performance authority must not mutate gameplay outcomes. It may adjust presentation consumers only through named policy, while every visible frame continues to cite the committed simulation and scene revisions.

## Fixtures

```txt
stable 60 Hz within budget
stable 30 Hz overload
single-frame spike rejection
sustained overload downgrade
sustained headroom upgrade
hysteresis and cooldown
hidden-tab sampling policy
quality transition during scene reset
quality transition without gameplay-state divergence
```

## Boundary

No gameplay or timing behavior changed.