# Grass System Audit: Distance, Frustum and Budget Contract

**Timestamp:** `2026-07-12T04-11-54-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Existing grass contract

```txt
placement identity:
  deterministic density texture
  deterministic patch grid
  deterministic instances

detail identity:
  archetype and batch IDs
  near/mid/far static batches
  four declared LOD thresholds

render identity:
  topology key
  CPU mesh key
  WebGL cache state
```

## Missing contract

```txt
camera identity
patch bounds identity
distance evidence
frustum evidence
visible-set revision
applied LOD result
instance/card budgets
terrain-tint representation
stale-result policy
visible-frame acknowledgement
```

## Separation of concerns

```txt
density texture
  owns where grass may exist and how much may be placed

LOD policy
  owns how visible grass is represented from the current camera

frustum admission
  owns whether a patch contributes active draw work

budget policy
  owns deterministic reductions when admitted work exceeds limits

renderer
  consumes the committed draw plan
  does not invent policy
```

## Tier contract

```txt
near
  distance <= 32
  highest admitted detail

mid
  32 < distance <= 72
  reduced cards

far
  72 < distance <= 128
  four-card representation

terrain-tint
  128 < distance <= 220
  no grass blade cards
  terrain color/detail contribution only

culled
  distance > 220 or outside admitted frustum
  zero active grass card work
```

## Budget contract

```txt
policy inputs
  maximum admitted patches
  maximum instances
  maximum cards
  maximum terrain-tint patches

deterministic fallback order
  preserve near path/player neighborhood
  reduce mid detail
  transition far to terrain tint
  remove lowest-priority tint patches
  never reorder equal-priority patches nondeterministically
```

## Required observations

```txt
considered patches
admitted patches
distance-culled patches
frustum-culled patches
instances/cards by tier
requested and applied totals
budget fallback reason
visible-set fingerprint
camera/surface/context/quality revisions
first visible frame ID
```

## Required fixtures

```txt
exact threshold boundaries
density-versus-LOD separation
frustum intersection
budget overflow
stable priority ordering
path suppression parity
stale observation rejection
camera reset fidelity
renderer/diagnostics/frame parity
```
