# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-10T16-51-37-04-00`

## Selection state

```txt
10 accessible LuminaryLabs-Publish repositories observed
TheCavalryOfRome excluded by rule
9 eligible repositories centrally tracked
root .agent state present
IntoTheMeadow selected as oldest eligible documented fallback
```

## External source provenance gaps

```txt
GAME_MANIFEST pins meadow-area-kit to a repository commit but runtime readback drops the URL and commit
loadExternalKits returns only createMeadowAreaKit
MEADOW_AREA_KIT_VERSION is not captured by the host
installDsks marks the external kit loaded from function presence only
no source-mode row distinguishes external, fallback, or failed startup
no plan fingerprint links source snapshot to enhanced plan, mesh, renderer, GameHost, or editor capture
no bounded source-load result journal exists
```

## Fallback and recovery gaps

```txt
startWebHost hard-fails before game creation when the external URL, import, or export fails
the local fallback is reachable only when another caller omits externalKits
fallback validate always passes and labels itself representative
no fixture proves fallback output satisfies the same consumer contract as the external output
external and fallback plans differ in path normalization, grass population, mushroom descriptors, atmosphere detail, version, counts, and validation semantics
no policy declares required parity, permitted degradation, or user-visible recovery behavior
```

## Source-time authority gaps

```txt
the source plan is created once at time 0
getRenderPlan for later frames only overlays the time field
external getRenderPlan is not re-queried after startup
source-owned time-dependent behavior would be silently bypassed
no fixture proves static topology with time overlay is an intentional contract
```

## Mesh contribution gaps

```txt
buildMeadowMeshData has no per-stage contribution counters
source descriptor ids are not retained in mesh readback
attempted, consumed, skipped, and unsupported counts are absent
emitted vertex and triangle counts are not attributed by descriptor family
renderPlan.contract.descriptorCounts is copied into mesh.descriptorCounts
primitiveFallbackCount is hard-coded to 0
unsupported/fallback behavior cannot be proven from the returned snapshot
```

## Grass proof gaps

```txt
grass density texture, static batches, patches, and draw groups are created and validated before rendering
the mesh builder iterates rendered grass descriptors without contribution rows
source patch/draw-group ids are not visible in renderer readback
estimatedGrassInstances and estimatedGrassCards are expectations, not measured mesh output
external source grass blades and local enhanced grass groups have no shared provenance row
```

## Registry truth gaps

```txt
dsk-registry.json declares 44 local kits and one external kit
src/dsks/index.js marks requiredForV01 entries active-v0.1 by list membership
active descriptor status is not the same as an implementation-backed module
external status loaded/deferred does not capture version, commit, validation, or selected mode
no fixture reconciles registry ids, descriptor status, implementation modules, external provenance, and runtime consumers
```

## GameHost/editor readback gaps

```txt
GameHost forwards aggregate render and enhancer snapshots only
NexusEditorEnvironment renderer.getSnapshot forwards the same aggregate snapshot
renderer.capture adds a data URL but no source provenance or descriptor-consumption rows
editor command completion proves invocation, not semantic consumption
no stable observation row links source load -> source plan -> enhanced plan -> mesh -> render snapshot
```

## Gameplay gaps

```txt
advanceGameState only updates frame and lastTick
objectives and interaction targets remain content descriptors rather than an active player loop
no movement, target preflight, action result, or objective mutation runtime exists yet
these remain later slices and should not be mixed into source-provenance proof
```

## Validation gaps

```txt
existing static smoke checks import wiring but not source metadata
existing deterministic smoke does not compare external and fallback output
no fixture simulates missing URL, rejected import, missing export, invalid plan, or fallback selection
no fixture asserts acceptable parity and declared degradation between source modes
no fixture proves static-source caching is compatible with source time semantics
no fixture verifies descriptor counts against measured emitted geometry
```

## Do not solve first

```txt
visual fidelity or asset expansion
camera and movement
new meadow content
renderer replacement or WebGPU cutover
external CDN migration
shared-kit promotion
postprocess expansion
editor command expansion
```

## Current ledge

```txt
IntoTheMeadow External Meadow Source Provenance + Fallback Parity Fixture Gate
```

Mesh contribution and registry truth remain required companion gates.