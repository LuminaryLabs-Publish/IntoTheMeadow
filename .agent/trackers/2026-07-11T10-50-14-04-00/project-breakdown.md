# IntoTheMeadow Project Breakdown

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T10-50-14-04-00`

**Scope:** documentation and architecture audit only

## Summary

`IntoTheMeadow` is a DSK-composed static browser meadow with one commit-pinned external source kit, one local fallback source, 43 local DSK declarations, a render-plan enhancer, CPU mesh construction, a WebGL renderer, browser and Node editor surfaces, and authored story, objective and interaction descriptors.

This pass identifies a public host capability gap. `GameHost` exposes the complete raw `game` object, and the browser editor calls `gameHost.game.tick()` and `gameHost.game.reset()` directly. Any page script can therefore bypass future lifecycle, step-admission, command-result, journal and render-commit authorities.

## Plan ledger

**Goal:** replace the raw public runtime object with a session-fenced capability gateway and clone-safe read model before timing, gameplay commands or automation depend on host trust.

- [x] Enumerate all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare all nine eligible repositories with the central ledger.
- [x] Verify root `.agent/START_HERE.md` state for all nine eligible repositories.
- [x] Select only `IntoTheMeadow` under the oldest eligible fallback rule.
- [x] Read `AGENTS.md` and the current audit chain.
- [x] Trace browser boot, host construction and global exposure.
- [x] Trace browser editor capability registration and invocation.
- [x] Trace direct game mutation and render-plan rebuild surfaces.
- [x] Trace readback, snapshot and renderer observation surfaces.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Define the host capability authority and fixture gate.
- [x] Change documentation only.
- [ ] Runtime implementation and executable fixtures remain future work.

## Repository selection comparison

```txt
accessible Publish repositories: 10
eligible after Cavalry exclusion: 9
central ledger entries present: 9
root .agent START_HERE files present: 9
new or missing eligible repositories: 0
selected repository: LuminaryLabs-Publish/IntoTheMeadow
selection basis: oldest eligible central-ledger timestamp
```

```txt
IntoTheMeadow       selected / 2026-07-11T08-31-33-04-00
PrehistoricRush      tracked  / 2026-07-11T08-48-04-04-00
MyCozyIsland         tracked  / 2026-07-11T09-08-59-04-00
TheOpenAbove         tracked  / 2026-07-11T09-21-50-04-00
HorrorCorridor       tracked  / 2026-07-11T09-29-07-04-00
PhantomCommand       tracked  / 2026-07-11T09-40-19-04-00
ZombieOrchard        tracked  / 2026-07-11T10-00-12-04-00
TheUnmappedHouse     tracked  / 2026-07-11T10-18-05-04-00
AetherVale           tracked  / 2026-07-11T10-38-55-04-00
TheCavalryOfRome     excluded by rule
```

Only `LuminaryLabs-Publish/IntoTheMeadow` is changed in the Publish organization.

## Interaction loop

### Browser route

```txt
index.html
  -> boot-game.js
  -> startWebHost()
  -> import commit-pinned meadow-area-kit
  -> create game, renderer and render-plan enhancer
  -> expose global GameHost including raw game
  -> install NexusEditorEnvironment
  -> requestAnimationFrame
  -> game.tick
  -> enhance source plan
  -> render WebGL
  -> update diagnostics
  -> request next frame
```

### Public raw-runtime route

```txt
any page script
  -> GameHost.game
  -> tick / reset / rebuildRenderPlan / getRenderPlan
  -> mutate state or source-plan lineage
  -> bypass capability admission
  -> bypass session and expected-frame fences
  -> bypass typed result and journal
  -> bypass committed-frame acknowledgement
```

### Browser editor route

```txt
NexusEditorEnvironment.invoke(action, arguments)
  -> clone arguments only
  -> capability execute
  -> runtime.tick calls GameHost.game.tick directly
  -> runtime.reset calls GameHost.game.reset directly
  -> capability reports completed when no exception is thrown
  -> returned data is not normalized through a domain result envelope
```

## Domains in use

```txt
browser shell and DOM boot
manifest and external dependency declaration
source-provider discovery, loading, fallback and raw-plan production
DSK registry, descriptor installation, validation and snapshots
game state, tick, reset, snapshot and diagnostics
runtime session, RAF ownership and lifecycle
public host capability registration, admission and revocation
browser editor capability routing and error observation
Node headless editor runtime and workspace capabilities
runtime step command, clock policy and work budget
terrain, path, materials, grass, scatter, trees, wind and atmosphere
render-plan enhancement, validation and topology identity
performance, LOD and postprocess policy
CPU mesh construction and contribution accounting
WebGL resources, caching, rendering, snapshots and disposal
GameHost and editor read models
HUD, loading and fatal projection
static checks, headless smoke, build and Pages deployment
```

## Complete kit and service inventory

```txt
external declared kits: 1
local declared kits: 43
total declared kits: 44
required-v0.1 local kits: 15
runtime source-backed surfaces: 24
```

### External kit

```txt
meadow-area-kit 0.1.0
  area and path normalization
  style and material normalization
  deterministic seeded scatter
  grass, flower, rock, mushroom and tree descriptors
  wind and atmosphere descriptors
  render-plan generation
  validation
  snapshot and reset
  optional runtime-kit adapter
```

### Local declared DSK service groups

```txt
composition: manifest, registry, scene, simulation and render composition
world: meadow area, terrain, path, grass, wind, trees, scatter and atmosphere
play: player, camera, input, interaction, story, objectives and ecology
presentation: audio, UI, renderer host, WebGL renderer and postprocess
operations: save, diagnostics, performance and static Pages deployment
```

### Runtime source-backed services

```txt
external and fallback meadow source plans
DSK installation and validation
immutable game state replacement
raw tick and reset
source-plan rebuild
render-plan enhancement and cache snapshots
CPU mesh generation
WebGL buffer caching and two-pass rendering
browser RAF hosting
GameHost global exposure
browser editor capability invocation
Node headless editor capabilities
static validation and Pages deployment
```

## Main finding: the host exposes authority instead of capabilities

`exposeGameHost()` publishes `game` directly. That object includes mutation and lifecycle-adjacent methods such as `tick()`, `reset()` and `rebuildRenderPlan()` plus direct references to manifest, content, DSK install state and the external meadow provider.

The browser editor then implements `runtime.tick` and `runtime.reset` by calling the raw game object. This means the capability map is descriptive, not authoritative. A caller can skip `NexusEditorEnvironment.invoke()` and call `GameHost.game` directly.

`startWebHost()` also returns the raw `game`, renderer, enhancer and editor bridge. The boot module discards that controller, so there is no retained public owner that can revoke the global surface during stop, fatal error, restart or disposal.

Read methods return direct internal observations. Inputs to editor actions are cloned, but successful results are not normalized, sequenced, fingerprinted or correlated with a committed frame.

## Required parent domain

```txt
meadow-host-capability-authority-domain
```

Update existing owners first:

```txt
web-host-dsk
into-the-meadow-game-dsk
meadow-diagnostics-dsk
meadow-render-host-dsk
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

## Required public surface

```txt
GameHost
  build identity
  session observation
  capability descriptors
  invoke(command)
  getStateObservation()
  getCommittedFrameObservation()
  getDiagnosticsObservation()
```

Do not expose:

```txt
raw game object
raw renderer object
raw enhancer object
raw provider object
unfenced tick/reset/rebuild methods
```

## Required result

```js
{
  commandId: "host-command-0001",
  capabilityId: "runtime.step",
  sessionId: "arrival-meadow:session-0",
  status: "accepted" | "rejected" | "duplicate" | "stale" | "unavailable",
  reason: "ok" | "session-mismatch" | "capability-unavailable" | "runtime-stopped" | "runtime-disposed" | "admission-rejected",
  commandSequence: 1,
  stateFrame: 12,
  renderCommitId: null,
  observationRevision: 1
}
```

## Required proof

```txt
GameHost does not expose raw game, renderer, enhancer or provider references
all mutations enter one capability admission function
stale session commands reject without mutation
stopped and disposed sessions reject consistently
unknown capabilities return unavailable without throwing
capability success is distinct from domain acceptance
read observations are clone-safe and JSON-safe
holding or mutating a returned observation cannot change runtime state
capability and result journals are bounded
stop, restart and dispose revoke old capability leases
browser and Node adapters share one nested result schema
accepted visual changes eventually reference one committed render frame
```

## Ordered safe ledges

```txt
1. Runtime Session Lifecycle Authority + Single-RAF / Global-Lease / Rollback Fixture Gate
2. Host Capability Gateway + Raw Runtime Quarantine Fixture Gate
3. Runtime Step Admission and Clock Integrity + Finite / Monotonic / Work-Budget Fixture Gate
4. Source Provider Authority + External/Fallback Admission and Parity Fixture Gate
5. Render Topology Identity Authority + Source Mutation / Cache Rebuild Fixture Gate
6. Committed Frame Observation Authority + State/Plan/Render/Canvas Coherence Fixture Gate
7. Interaction Command Authority + Path/Inspect/Objective Progress Fixture Gate
8. DSK Registry Truth + Declared/Implemented/Consumed Fixture Gate
```

## Validation boundary

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
render output changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
host capability fixture: unavailable
raw-runtime quarantine fixture: unavailable
observation isolation fixture: unavailable
```

Do not claim that `GameHost` or the editor bridge is an authoritative control surface while the raw game object remains globally reachable.