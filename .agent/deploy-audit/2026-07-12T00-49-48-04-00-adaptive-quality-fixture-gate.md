# Adaptive Quality Fixture and Deployment Gate

**Timestamp:** `2026-07-12T00-49-48-04-00`

## Goal

Prevent static descriptor checks or a successful page load from being treated as proof of adaptive, budget-complete quality behavior.

## Current package gate

`npm run check` currently executes static, DSK, render-plan, renderer, deterministic-scene and headless-editor smoke checks. It does not execute a performance sample window, automatic decision, quality transition, budget-overflow plan, rollback or browser-visible recovery.

## Missing DOM-free fixtures

```txt
quality profile schema validation
unknown profile rejection
quality fingerprint determinism
elapsed-time window calculation
30/60/120 Hz cadence parity
hysteresis and cooldown
hidden/suspended sample classification
complete budget ledger allocation
grass hard-ceiling enforcement
scatter hard-ceiling enforcement
terrain-resolution binding
post-process and draw-pass binding
quality-aware enhancer cache invalidation
quality-aware renderer topology invalidation
transition idempotency and stale rejection
consumer preparation failure rollback
```

## Missing browser fixtures

```txt
collect production frame-cost observations
force deterministic slow and fast sample traces
observe degrade and recover decisions
verify exactly one enhancer and renderer rebuild per quality transition
verify low-profile surface, terrain, grass, scatter and draw behavior
inject shader/buffer preparation failure
verify predecessor frame remains authoritative
trigger WebGL context loss during transition
verify classified retry or rejection
verify GameHost and browser editor observations
verify first visible quality-frame receipt
verify stop/start and page lifecycle do not duplicate sampling or RAF work
```

## Missing deployed Pages smoke

```txt
load the deployed route
capture baseline effective quality
exercise deterministic test-only performance trace
observe transition result and quality revision
capture first committed low-quality frame
exercise recovery trace
capture first committed recovered frame
assert no console errors or unbounded resource growth
assert deployed source, plan, renderer and frame fingerprints agree
```

## Proposed commands

```bash
npm run fixture:performance-profiles
npm run fixture:performance-window
npm run fixture:performance-cadence
npm run fixture:performance-budgets
npm run fixture:quality-transition
npm run fixture:quality-rollback
npm run smoke:quality-browser
npm run smoke:quality-pages
npm run check
```

## Acceptance gate

```txt
profile schema: pass
unknown profile rejection: pass
cadence parity: pass
hysteresis/cooldown: pass
all consumer budgets: pass
terrain/post/surface bindings: pass
quality cache invalidation: pass
transition rollback: pass
context-loss classification: pass
browser observation parity: pass
first visible quality-frame proof: pass
Pages degrade/recovery smoke: pass
```

## Current status

```txt
runtime source changed: no
package scripts changed: no
workflow changed: no
fixtures implemented: no
npm run check executed: no
browser smoke executed: no
Pages smoke executed: no
```
