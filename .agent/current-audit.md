# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Audit timestamp:** `2026-07-11T10-50-14-04-00`

## Summary

`IntoTheMeadow` is a DSK-composed static meadow route with one commit-pinned external source kit, one local fallback source, 43 local DSK declarations, a render-plan enhancer, CPU mesh builder, WebGL renderer, browser editor bridge, Node headless editor and authored objective, interaction and story descriptors.

This pass audits the missing authority between public host exposure and internal runtime mutation. `GameHost` publishes the complete raw `game` object. Browser editor commands call that object directly, so capability registration is not the exclusive control surface.

## Plan ledger

**Goal:** make all public runtime mutation enter one session-fenced capability gateway and expose only clone-safe, revisioned read models.

- [x] Enumerate the complete accessible Publish inventory.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare every eligible repository with the central ledger.
- [x] Verify root `.agent/START_HERE.md` state for all eligible repositories.
- [x] Select only `IntoTheMeadow` as the oldest eligible entry.
- [x] Read `AGENTS.md` and current audit history.
- [x] Trace `startWebHost()`, `exposeGameHost()` and browser boot.
- [x] Trace editor capability registration and invocation.
- [x] Trace direct tick, reset and render-plan rebuild access.
- [x] Trace state, plan, renderer and capture readbacks.
- [x] Identify interaction loop, domains, kits and services.
- [x] Add architecture, render, gameplay, interaction, capability and deploy audits.
- [x] Refresh all required root `.agent` files.
- [x] Change documentation only.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection state

```txt
accessible Publish repos: 10
eligible after exclusion: 9
central ledger entries: 9
root START_HERE files: 9
new or missing eligible repos: 0
selected: LuminaryLabs-Publish/IntoTheMeadow
selection basis: oldest eligible central-ledger timestamp
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Interaction loop

### Browser route

```txt
boot
  -> import external meadow-area provider
  -> create game, renderer and enhancer
  -> expose GameHost with raw game reference
  -> install NexusEditorEnvironment
  -> RAF
  -> game.tick
  -> enhance plan
  -> render WebGL
  -> update diagnostics
  -> next RAF
```

### Raw public mutation route

```txt
page script
  -> GameHost.game
  -> tick / reset / rebuildRenderPlan
  -> direct internal mutation
  -> no capability admission
  -> no session or expected-frame fence
  -> no typed domain result
  -> no journal
  -> no render acknowledgement
```

### Browser editor route

```txt
NexusEditorEnvironment.invoke
  -> capability lookup
  -> structuredClone input arguments
  -> execute callback
  -> runtime.tick calls GameHost.game.tick
  -> runtime.reset calls GameHost.game.reset
  -> completed means only that no exception occurred
```

## Domains in use

```txt
browser shell, DOM boot and fatal projection
manifest and external dependency declaration
source-provider discovery, loading, fallback and raw-plan production
DSK registry, descriptor installation, validation and snapshots
game state, tick, reset, snapshot and diagnostics
runtime session, RAF ownership and lifecycle
public host capability registration, admission, sequencing and revocation
browser editor capability routing and error observation
Node headless editor runtime, artifacts and workspace capabilities
runtime step commands, clock policy and work budget
terrain, path, materials, grass, scatter, trees, wind and atmosphere
render-plan enhancement, validation and topology identity
performance, LOD and postprocess policy
CPU mesh construction and contribution accounting
WebGL resources, caching, rendering, snapshots and disposal
GameHost and editor read-model projection
static checks, headless smoke, build and Pages deployment
```

## Kit inventory

```txt
external declared kits: 1
local declared kits: 43
total declared kits: 44
required-v0.1 local kits: 15
runtime source-backed surfaces: 24
```

The complete per-kit service inventory remains recorded in:

```txt
.agent/trackers/2026-07-11T10-50-14-04-00/project-breakdown.md
.agent/kit-registry.json
```

## Services offered by the current stack

```txt
commit-pinned external source loading
fallback source-plan construction
DSK descriptor registration and snapshots
raw game state, tick, reset and render-plan rebuild
browser RAF stepping
browser editor capability lookup and invocation
Node headless multi-step tick and reset
render-plan enhancement and descriptor validation
CPU mesh generation
WebGL buffer caching and two-pass drawing
GameHost and editor readback
canvas capture
static checks and Pages deployment
```

Services not currently offered:

```txt
exclusive capability-owned mutation
raw runtime quarantine
session-fenced host command admission
capability command IDs and sequence numbers
typed accepted/rejected/duplicate/stale/unavailable results
capability lease revocation
bounded command/result journal
clone-safe observation revisions
state/read-model fingerprints
browser/Node capability parity proof
host-command to render-commit correlation
```

## Main finding: GameHost is an authority leak

`exposeGameHost()` publishes `game` directly. The object is frozen, but its methods remain callable and mutate closure-owned state or rebuild source-plan lineage.

Publicly reachable methods include:

```txt
tick
reset
rebuildRenderPlan
getRenderPlan
getSnapshot
getDiagnostics
```

The browser editor's capability callbacks call `gameHost.game.tick()` and `gameHost.game.reset()`. Therefore the capability registry does not own admission. A caller can bypass `NexusEditorEnvironment.invoke()` entirely.

`startWebHost()` also returns raw game, renderer, enhancer and editor bridge references. `boot-game.js` does not retain that controller, so no authoritative public owner can revoke the exposed surface after stop, fatal error, restart or disposal.

Input arguments are cloned before editor execution, but successful output is not normalized through one revisioned result contract. Read methods lack a shared observation revision, fingerprint, session lease and render commit identity.

## Required parent domain

```txt
meadow-host-capability-authority-domain
```

Update existing DSKs first:

```txt
web-host-dsk
into-the-meadow-game-dsk
meadow-render-host-dsk
meadow-diagnostics-dsk
```

Add coordinating kits only:

```txt
host-capability-registry-kit
host-command-envelope-kit
host-command-admission-kit
host-session-fence-kit
raw-runtime-quarantine-kit
gamehost-read-model-kit
clone-safe-observation-kit
capability-result-kit
capability-sequence-kit
capability-journal-kit
capability-revocation-kit
browser-editor-capability-adapter-kit
headless-editor-capability-adapter-kit
host-capability-fixture-kit
```

## Required public API

```txt
GameHost.build
GameHost.getSessionObservation()
GameHost.listCapabilities()
GameHost.invoke(command)
GameHost.getStateObservation()
GameHost.getDiagnosticsObservation()
GameHost.getCommittedFrameObservation()
```

Forbidden public properties:

```txt
game
renderer
planEnhancer
meadow provider
WebGL resources
unfenced tick/reset/rebuild/dispose functions
```

## Ordered safe ledges

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
3. Runtime Step Admission and Clock Integrity
4. Source Provider Authority
5. Render Topology Identity Authority
6. Committed Frame Observation Authority
7. Interaction Command Authority
8. DSK Registry Consumption Proof
```

## Next safe ledge

```txt
IntoTheMeadow Host Capability Gateway
+ Raw Runtime Quarantine / Observation Isolation Fixture Gate
```

Runtime Session Lifecycle Authority remains the prerequisite because the gateway lease must be installed, revoked and retired by one session owner.