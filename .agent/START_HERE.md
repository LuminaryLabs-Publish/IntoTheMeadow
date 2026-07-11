# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-11T02-20-44-04-00`

## Current ledge

```txt
IntoTheMeadow Runtime Session Lifecycle Authority
+ Stop/Restart/Dispose/Rollback Fixture Gate
```

## Latest documentation finding

```txt
IntoTheMeadow DSK Registry and Service Truth
+ Declared/Implemented/Consumed Fixture Gate
```

## Read first

```txt
.agent/trackers/2026-07-11T02-20-44-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T02-20-44-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-11T02-20-44-04-00-dsk-registry-service-truth-map.md
.agent/render-audit/2026-07-11T02-20-44-04-00-renderer-kit-registry-contract-gap.md
.agent/gameplay-audit/2026-07-11T02-20-44-04-00-declared-versus-authoritative-gameplay-kit-map.md
.agent/interaction-audit/2026-07-11T02-20-44-04-00-editor-host-capability-registry-gap.md
.agent/registry-truth-audit/2026-07-11T02-20-44-04-00-declared-runtime-consumption-contract.md
.agent/deploy-audit/2026-07-11T02-20-44-04-00-registry-truth-fixture-gate.md
```

## Selection result

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. `TheCavalryOfRome` remains excluded. All nine eligible repositories are centrally tracked and have root `.agent` state.

```txt
IntoTheMeadow       selected / 2026-07-11T00-30-48-04-00
PrehistoricRush      tracked  / 2026-07-11T00-39-25-04-00
TheOpenAbove         tracked  / 2026-07-11T00-49-45-04-00
HorrorCorridor       tracked  / 2026-07-11T01-10-28-04-00
PhantomCommand       tracked  / 2026-07-11T01-20-51-04-00
ZombieOrchard        tracked  / 2026-07-11T01-31-15-04-00
TheUnmappedHouse     tracked  / 2026-07-11T01-38-28-04-00
MyCozyIsland         tracked  / 2026-07-11T02-02-59-04-00
AetherVale           tracked  / 2026-07-11T02-10-13-04-00
TheCavalryOfRome     excluded by rule
```

`IntoTheMeadow` was the oldest eligible documented fallback. Only this product repository was changed.

## Interaction loop

```txt
index.html
  -> src/boot/boot-game.js
  -> startWebHost()
  -> import commit-pinned meadow-area-kit
  -> create game, renderer, enhancer, GameHost, and editor bridge
  -> requestAnimationFrame
  -> fixed-dt state tick with RAF absolute time
  -> raw-plan time overlay
  -> plan enhancement
  -> WebGL outline and cel/fog render
  -> HUD, GameHost, and editor readback
  -> successor RAF
```

Independent editor paths can call `runtime.tick`, `runtime.reset`, plan reads, renderer reads, and capture without using one committed browser frame.

## Registry census

```txt
external declared kits: 1
local declared kits: 43
total declared kits: 44
required-v0.1 local kits: 15
runtime source-backed surfaces cataloged: 24
```

Prior docs repeatedly described the registry as one external plus 44 local kits. The source of truth is one external plus 43 local kits.

## Main finding

The DSK registry is a descriptor catalog, not an implementation or consumption authority.

```txt
LOCAL_DSK_IDS membership
  -> creates descriptors
  -> REQUIRED_V01 membership labels selected descriptors active-v0.1
  -> install validates shape and presence
  -> snapshot reports descriptor status
```

This does not prove a kit has a source-backed implementation, is imported, is invoked, produces an output, or is consumed by the renderer or gameplay loop.

`meadow-webgl-renderer-v2-kit` is required, but it has no explicit `DOMAIN_LABELS` or `SERVICES` row. It therefore receives generic fallback services even though the actual renderer exposes WebGL context, shader, buffer-cache, resize, draw, snapshot, and disposal behavior.

## Implementation order

```txt
1. Runtime Session Lifecycle Authority + Stop/Restart/Dispose/Rollback Fixture Gate
2. Committed Frame Observation Authority + State/Plan/Render/Canvas Coherence Fixture Gate
3. Source Provider Authority + External/Fallback Parity Fixture Gate
4. Interaction Command Authority + Objective Progress Fixture Gate
5. DSK Registry Truth + Mesh Contribution and Consumer Proof Fixture Gate
```

Do not begin with visual tuning, renderer replacement, WebGPU migration, CDN migration, new meadow content, or shared-kit promotion.
