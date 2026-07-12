# Deploy Audit: Adaptive Quality Browser Fixture Gate

**Timestamp:** `2026-07-12T07-19-47-04-00`

## Summary

The current `npm run check` chain validates static structure, deterministic plans, renderer topology and editor commands. It does not measure browser frame cost or prove a quality transition on local or deployed Pages surfaces.

## Plan ledger

**Goal:** require deterministic policy fixtures plus browser/Pages evidence before adaptive quality is considered deployable.

- [x] Review current package checks.
- [x] Identify missing DOM-free and browser gates.
- [x] Define deployment evidence.
- [ ] Implement and run the gates.

## Required DOM-free fixtures

```txt
fixture:performance-window
fixture:performance-budget-policy
fixture:quality-hysteresis
fixture:quality-cooldown
fixture:quality-capability-envelope
fixture:quality-topology-impact
fixture:quality-consumer-prepare
fixture:quality-rollback
fixture:quality-stale-plan
fixture:quality-frame-correlation
```

## Required browser matrix

```txt
quality tiers: low, medium, high, ultra, auto
viewports: desktop, tablet, narrow mobile
DPR: 1, 1.5, 2
GPU timing: supported and unsupported
visibility: visible, hidden, restored
load: stable, transient spike, sustained overload, sustained headroom
```

## Required captured evidence

```txt
runtime/session ID
performance window ID
capability snapshot ID
predecessor and committed quality revisions
target tier and reason
consumer prepare/commit results
topology rebuild/no-rebuild result
surface revision
renderer snapshot
first visible frame ID
screenshot/capture linked to the same frame
zero unresolved rollback or resource leases
```

## Current status

```txt
npm run check: not run
adaptive quality fixtures: unavailable
browser quality smoke: unavailable
Pages quality smoke: unavailable
runtime source changed: no
deployment changed: no
```

## Boundary

Static validation cannot establish adaptive-quality correctness or device performance.