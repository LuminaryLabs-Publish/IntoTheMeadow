# Grass Visibility Fixture Central Gate

**Timestamp:** `2026-07-12T13-54-00-04-00`

## Summary

No existing check proves camera-distance tier selection, frustum culling, hysteresis, budget admission, stale-result rejection or first-visible-frame correlation. Central tracking must not treat descriptor presence or successful static rendering as readiness.

## Plan ledger

**Goal:** define the executable gate required before the grass visibility authority can be marked implemented.

- [x] Separate existing static proof from missing runtime proof.
- [x] Define deterministic and browser matrices.
- [x] Record local and Pages parity requirements.
- [ ] Implement and run later.

## Deterministic fixtures

```txt
patch bounds
frustum inside/intersection/outside
distance near/mid/far/terrain-tint/culled
threshold hysteresis
camera teleport
viewport/topology/policy revision changes
quality, vertex and draw budgets
candidate failure preserves predecessor
stale camera/viewport/topology result rejection
first visible grass frame receipt
```

## Browser matrix

```txt
WebGL2 and WebGL1 fallback
DPR 1 and 2
desktop, tablet and narrow viewport
default, near, mid, far, tint-only and outside-field cameras
slow threshold crossing, rapid orbit and teleport
high, medium, low and emergency quality
initial, resize, stop/start and context restore
local static host and deployed GitHub Pages
```

## Claim boundary

The source audit is complete. Runtime correctness, performance benefit, browser parity and deployed readiness remain unproven until these fixtures execute successfully.
