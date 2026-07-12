# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Last aligned:** `2026-07-12T05-31-59-04-00`

## Summary

`IntoTheMeadow` remains a DSK-composed browser meadow with one commit-pinned external provider, 43 local declarations, immutable game state, CPU mesh construction, a persistent WebGL renderer and browser/Node editor surfaces.

This pass isolates shader precision admission. The compatibility wrapper removes every float precision declaration and prepends `precision mediump float;` to both vertex and fragment shader sources without querying device precision support, recording a stage-specific decision or publishing compiled source/program provenance.

## Plan ledger

**Goal:** make shader precision a device-observed, stage-specific and frame-correlated admission decision rather than an unreported source rewrite.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledgers and root `.agent` state.
- [x] Select only `IntoTheMeadow` as the oldest eligible repository.
- [x] Read repository guidance, web host, compatibility wrapper, base renderer, renderer smoke and browser observation.
- [x] Identify the interaction loop, all domains, all 44 declared kits and every offered service.
- [x] Trace context creation, shader-stage tracking, source normalization, compilation, linking, rendering and diagnostics.
- [x] Define stage-specific capability admission, fingerprints, typed compile/link results and device-matrix proof.
- [x] Add timestamped architecture and system-specific audits.
- [x] Refresh all required root `.agent` files and the kit registry.
- [ ] Runtime implementation and executable shader-precision fixtures remain future work.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

IntoTheMeadow      2026-07-12T04-11-54-04-00 selected oldest
PhantomCommand     2026-07-12T04-18-44-04-00
HorrorCorridor     2026-07-12T04-28-03-04-00
ZombieOrchard      2026-07-12T04-38-12-04-00
TheUnmappedHouse   2026-07-12T04-44-36-04-00
AetherVale         2026-07-12T04-50-41-04-00
MyCozyIsland       2026-07-12T05-00-19-04-00
TheOpenAbove       2026-07-12T05-11-46-04-00
PrehistoricRush    2026-07-12T05-21-52-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/IntoTheMeadow` was selected.

## Current interaction loop

```txt
startup
  -> load commit-pinned meadow provider
  -> install 43 local DSK/kit descriptors
  -> create game and static meadow source plan
  -> create precision-safe canvas and WebGL proxies
  -> track shader stage at createShader()
  -> remove every float precision declaration at shaderSource()
  -> prepend precision mediump float to both graphics stages
  -> compile shaders and link one program
  -> expose snapshots without precision/program provenance
  -> start RAF

frame
  -> tick game
  -> enhance and validate render plan
  -> submit camera, wind, outline, light and fog uniforms
  -> draw outline and color passes
  -> report topology, vertices and cache state only
```

## Main finding

```txt
graphics stages normalized: vertex and fragment
forced precision: mediump float
device precision queries: 0
stage-specific decisions: 0
original/normalized source fingerprints: 0
typed compile/link results: 0
program generations in snapshots: 0
first-frame shader provenance receipts: 0
```

The source rewrite is deterministic, but its suitability is not admitted against the active context. Rendering can therefore be degraded or rejected on a device without a typed precision decision that diagnostics, capture and the first visible frame can cite.

## Domains in use

```txt
browser shell, loading and visible failure projection
external provider loading, validation and fallback
DSK declaration, registry validation and install snapshots
game manifest, immutable state, tick, reset, snapshot and diagnostics
runtime lifecycle, RAF clock and reset epoch
camera descriptors and browser view observation
terrain, path and terrain sampling
grass density, archetypes, patches, draw groups, wind and LOD declarations
player, input, interaction, objective, story and persistence declarations
flowers, rocks, ground cover, trees, atmosphere and scatter
render-plan validation, topology identity and CPU mesh construction
WebGL1/WebGL2 context acquisition, shader compilation, program linking and GPU buffers
shader-stage precision normalization and compatibility policy
context, program and resource generation authority
committed render/frame observation and editor capture
validation, headless tools, build and Pages deployment
DSK implementation, dependency, consumption and retirement truth
```

## Kits and services

```txt
external declared kits: 1
local declared kits: 43
total declared kits: 44
renderer compatibility adapters: 1
```

The complete per-kit service map remains in `.agent/current-audit.md` and `.agent/kit-registry.json`.

## Required parent domain

```txt
meadow-shader-precision-admission-authority-domain
```

```txt
shader-stage-identity-kit
graphics-context-capability-snapshot-kit
float-precision-capability-kit
shader-precision-policy-kit
shader-source-normalization-kit
shader-source-fingerprint-kit
shader-precision-decision-kit
shader-compile-result-kit
shader-program-link-result-kit
shader-program-generation-kit
shader-precision-observation-kit
shader-precision-journal-kit
first-frame-shader-provenance-kit
shader-precision-fixture-kit
browser-shader-device-matrix-smoke-kit
```

## Required transaction

```txt
new WebGL context generation
  -> identify shader stage and original source
  -> query lowp, mediump and highp capabilities
  -> evaluate stage precision policy
  -> produce Accepted, Degraded or Rejected decision
  -> normalize source through that decision
  -> fingerprint original and normalized sources
  -> compile and link with typed results
  -> commit one program generation
  -> render and acknowledge the first frame using that generation
```

## Ordered implementation gates

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Clock and Step Admission Authority
5. Source Provider Authority
6. Render Topology Identity Authority
6a. WebGL Context Recovery Authority
6b. Render Surface Resolution Authority
6c. Shader Precision Admission Authority
7. Committed Frame Observation Authority
7a. Fatal Runtime Failure Recovery Authority
7b. Adaptive Quality and Performance Budget Authority
7c. Grass Visibility and LOD Authority
8. Interaction Command and Objective Progression Authority
8a. Persistence Continuity Authority
9. DSK Runtime Consumption Authority
9a. Deterministic Replay Validation Authority
```

## Read this pass first

```txt
.agent/trackers/2026-07-12T05-31-59-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T05-31-59-04-00.md
.agent/architecture-audit/2026-07-12T05-31-59-04-00-shader-precision-admission-dsk-map.md
.agent/render-audit/2026-07-12T05-31-59-04-00-forced-mediump-stage-policy-gap.md
.agent/interaction-audit/2026-07-12T05-31-59-04-00-context-shader-compile-frame-map.md
.agent/shader-audit/2026-07-12T05-31-59-04-00-stage-capability-normalization-contract.md
.agent/deploy-audit/2026-07-12T05-31-59-04-00-shader-precision-device-matrix-fixture-gate.md
```

A compiled frame is not precision proof. Completion requires device capability evidence, an explicit stage decision, source/program fingerprints and a visible frame citing the admitted program generation.
