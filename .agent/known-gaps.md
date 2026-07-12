# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T07-19-47-04-00`

## Summary

The leading performance gap is that `meadow-performance-dsk` describes profiles and budgets but owns no measurements, transition policy, revision, multi-consumer commit or visible-frame proof. Logical quality fields also diverge from the inspected physical render path.

## Plan ledger

**Goal:** close performance observation, stable decision, physical-policy parity, cache invalidation, rollback and frame-correlation gaps while preserving all previously documented runtime, rendering, audio and gameplay gaps.

- [x] Add adaptive-quality and logical/physical parity gaps.
- [x] Preserve prior audio, shader, surface, lifecycle, interaction and replay gaps.
- [ ] Implement in dependency order.

## Selection state

```txt
10 accessible Publish repositories observed
TheCavalryOfRome excluded
9 eligible repositories centrally tracked with root .agent state
IntoTheMeadow selected as the oldest eligible synchronized repository
only IntoTheMeadow changed in the Publish organization
```

## Performance ownership gaps

```txt
meadow-performance-dsk returns configuration, not runtime authority
web host owns RAF but no performance sampling
renderer owns physical work but no quality decision/result
render-plan enhancer accepts runtime performance but host supplies none
quality state is absent from game snapshot and editor capabilities
```

## Observation and identity gaps

```txt
performance sample ID: absent
CPU frame observation: absent
GPU timer capability/result: absent
rolling performance window: absent
percentile result: absent
frame deadline result: absent
capability snapshot: absent
quality tier identity beyond string configuration: absent
monotonic quality revision: absent
```

## Policy and admission gaps

```txt
auto is a static profile, not adaptive policy
hysteresis: absent
upgrade/downgrade confirmation windows: absent
cooldown: absent
hidden-tab sampling policy: absent
manual/automatic command parity: absent
quality transition command/result: absent
stale session/context/surface/topology rejection: absent
```

## Logical and physical parity gaps

```txt
profile terrainResolution is not applied
contracted terrain resolution is hard-coded to 96 x 124
profile postProcess does not control physical outline/color draws
maxGrassInstances is calculated but not passed into inspected grass construction
physical draw-count budget is absent
surface scale/DPR quality adapter is absent
```

## Cache and commit gaps

```txt
runtime quality is omitted from host enhancer calls
quality revision is absent from enhancer cache admission
topology-affecting quality fields are not a separate impact plan
consumer prepare results are absent
atomic grass/terrain/post/surface/renderer commit is absent
predecessor preservation and rollback are absent
exact topology rebuild/no-rebuild result is absent
```

## Diagnostics and proof gaps

```txt
renderer snapshot has no quality revision
no measured CPU/GPU cost in diagnostics
no budget or deadline status
no transition or rollback result
no quality state in public/editor readback
no first visible-frame quality acknowledgement
no screenshot/capture correlation with quality revision
```

## Missing performance proof

```txt
static tier parity
sustained-overload downgrade
sustained-headroom upgrade
single-spike rejection
hysteresis and cooldown
GPU timing supported/unsupported paths
hidden-tab sampling
quality topology impact
consumer failure rollback
context/surface stale-plan rejection
first visible-frame receipt
browser and Pages performance smoke
```

## Preserved rendering and runtime gaps

```txt
runtime session lifecycle and ordered disposal
raw GameHost capability quarantine
RAF absolute time versus fixed dt authority
render topology identity
WebGL context recovery
render surface revision and physical-buffer proof
shader precision capability admission
committed frame observation
fatal frame recovery
camera-distance/frustum grass LOD
```

## Preserved audio gaps

```txt
trusted gesture activation
AudioContext/resource generation
ambient and spatial playback
listener revision parity
mute/volume/suspension policy
ordered audio disposal
browser audible-output proof
```

## Preserved gameplay and data gaps

```txt
movement and inspect commands
objective/story atomic commit
browser/editor progression parity
save schema, migration and atomic hydration
independent deterministic replay and first-divergence proof
DSK declaration-to-runtime consumption authority
```

## Completion boundary

Do not treat the existence of low/medium/high/ultra/auto constants, a stable vertex count or a cache hit as adaptive-quality proof. Completion requires normalized observations, stable admission policy, one committed quality revision across every physical consumer, rollback and first-visible-frame evidence.