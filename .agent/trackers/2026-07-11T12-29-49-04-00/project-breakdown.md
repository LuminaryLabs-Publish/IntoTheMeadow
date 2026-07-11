# IntoTheMeadow Project Breakdown

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T12-29-49-04-00`

**Scope:** documentation and architecture audit only

## Summary

`IntoTheMeadow` is a DSK-composed browser meadow with a commit-pinned external source kit, 43 local DSK declarations, a WebGL renderer, browser editor bridge and Node headless-editor environment.

This pass identifies a workspace-boundary defect in the Node editor. `safePath()` uses a raw string-prefix check after `path.resolve()`. A sibling path whose name begins with the workspace root, or a symlink inside the root that resolves outside it, can pass that check. The `workspace.list`, `workspace.read`, `workspace.write` and capture-artifact paths therefore do not have a proven containment boundary.

## Plan ledger

**Goal:** make every headless-editor file operation resolve through one canonical, segment-aware and symlink-aware workspace authority before the editor is treated as a safe automation surface.

- [x] Enumerate all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare all nine eligible repositories with the central ledger.
- [x] Verify root `.agent` state for all eligible repositories.
- [x] Select only `IntoTheMeadow` as the oldest eligible central-ledger entry.
- [x] Read `AGENTS.md` and the current audit chain.
- [x] Trace browser boot, runtime, renderer and editor routes.
- [x] Trace Node workspace root construction and artifact-root construction.
- [x] Trace `workspace.list`, `workspace.read`, `workspace.write` and `renderer.capture` path admission.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Define the workspace path authority and fixture gate.
- [x] Change documentation only.
- [ ] Runtime implementation and executable fixtures remain future work.

## Repository selection comparison

```txt
accessible Publish repositories: 10
eligible after Cavalry exclusion: 9
central ledger entries present: 9
root .agent state present: 9
new or missing eligible repositories: 0
selected repository: LuminaryLabs-Publish/IntoTheMeadow
selection basis: oldest eligible central-ledger timestamp
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

```txt
IntoTheMeadow       selected / 2026-07-11T10-50-14-04-00
PrehistoricRush      tracked  / 2026-07-11T10-58-10-04-00
MyCozyIsland         tracked  / 2026-07-11T11-19-10-04-00
TheOpenAbove         tracked  / 2026-07-11T11-31-06-04-00
HorrorCorridor       tracked  / 2026-07-11T11-39-11-04-00
PhantomCommand       tracked  / 2026-07-11T11-51-06-04-00
ZombieOrchard        tracked  / 2026-07-11T12-01-38-04-00
TheUnmappedHouse     tracked  / 2026-07-11T12-08-47-04-00
AetherVale           tracked  / 2026-07-11T12-18-42-04-00
TheCavalryOfRome     excluded by rule
```

Only `LuminaryLabs-Publish/IntoTheMeadow` is changed in the Publish organization.

## Interaction loops

### Browser route

```txt
index.html
  -> boot-game.js
  -> startWebHost()
  -> load commit-pinned meadow-area-kit
  -> create game, enhancer, renderer and browser editor bridge
  -> RAF tick
  -> enhance render plan
  -> WebGL render
  -> diagnostics and next RAF
```

### Node headless workspace route

```txt
createEnvironment(options)
  -> root = resolve(options.root ?? process.cwd())
  -> artifactRoot = safePath(root, requested artifact root)
  -> register workspace.list / workspace.read / workspace.write
  -> editor capability receives caller path
  -> safePath(root, path)
  -> resolve absolute target
  -> target.startsWith(root)
  -> operation executes
```

### Escape route

```txt
root:   /workspace/IntoTheMeadow
input:  ../IntoTheMeadow-escape/out.txt
resolve -> /workspace/IntoTheMeadow-escape/out.txt
prefix check -> passes because the target string begins with /workspace/IntoTheMeadow
workspace.write -> mkdir and write outside the workspace root
```

A symlink located inside the workspace can also point outside the root because the current function performs lexical resolution only and never verifies the real filesystem target.

## Domains in use

```txt
browser shell and DOM boot
manifest and external dependency declaration
source-provider loading, fallback and source-plan production
DSK registry, descriptor installation, validation and snapshots
game state, tick, reset, snapshot and diagnostics
runtime session, RAF ownership and lifecycle
public host capability registration, admission and revocation
browser editor capability routing and error observation
Node headless editor runtime and workspace capabilities
workspace root identity, path containment and filesystem operation admission
artifact path construction and capture publication
runtime step commands, clock policy and work budget
terrain, path, materials, grass, scatter, trees, wind and atmosphere
render-plan enhancement, validation and topology identity
performance, LOD and postprocess policy
CPU mesh construction and contribution accounting
WebGL resources, caching, rendering, snapshots and disposal
GameHost and editor read-model projection
static checks, editor smoke tests, build and Pages deployment
```

## Complete kit and service inventory

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

### Local DSKs and services

```txt
into-the-meadow-game-dsk: game-manifest, kit-stack-registry, game-state-root, boot-sequence, game-snapshot
web-host-dsk: document-shell, browser-loop, host-debug-surface, asset-loading-host, browser-safety
game-composition-dsk: dsk-registry, scene-composition, render-composition, simulation-composition, composition-validation
meadow-area-bridge-dsk: meadow-area-config, meadow-feature-config, meadow-area-kit-adapter, meadow-area-state, meadow-area-validation
meadow-terrain-texture-dsk: terrain-surface-model, material-layer-system, path-layer-system, terrain-sampler, terrain-validation
path-corridor-dsk: path-curve-model, walkable-corridor, path-surface-detail, path-progression, path-validation
grass-density-texture-kit: density-texture-model, density-channels, density-compositor, density-sampler, density-validation
grass-clump-archetype-kit: clump-family-registry, card-layout-generator, texture-atlas-binding, clump-variant-generator, archetype-validation
grass-static-batch-kit: clump-mesh-builder, batch-variant-cache, atlas-material, static-batch-lod, batch-validation
grass-patch-placement-kit: patch-grid, density-driven-placement, clump-instance-selection, patch-instance-buffer, placement-validation
grass-clump-instancing-render-kit: batch-registry, instance-stream, draw-group-builder, shader-binding, render-validation
grass-shader-wind-kit: wind-uniforms, tip-bend-model, phase-field, gust-response, wind-validation
grass-lod-policy-kit: near-lod, mid-lod, far-lod, terrain-tint-lod, lod-validation
grass-density-scaling-kit: quality-scale, budget-scale, density-scale, profile-scale, scale-validation
grass-debug-visualization-kit: density-view, patch-view, instance-view, lod-view, debug-validation
grass-patch-dsk: patch-grid, blade-distribution, terrain-awareness, wind-binding, grass-validation
gpu-grass-render-dsk: grass-instance-buffer, grass-blade-mesh, shader-wind, grass-lod-render, grass-render-validation
wind-field-dsk: wind-state, wind-sampler, wind-zones, wind-consumers, wind-validation
tree-object-dsk: focal-tree-model, tree-line-model, tree-materials, tree-wind-binding, tree-validation
meadow-scatter-dsk: flower-scatter, rock-scatter, mushroom-scatter, placement-rules, scatter-validation
meadow-atmosphere-dsk: sky-gradient, sun-system, cloud-layer, distant-hills, atmosphere-validation
meadow-player-dsk: player-state, movement-profile, terrain-contact, player-actions, player-validation
meadow-camera-dsk: camera-mode, camera-rig, camera-collision, camera-feel, camera-validation
meadow-input-dsk: action-map, device-bindings, input-context, input-normalization, input-validation
meadow-interaction-dsk: interactable-registry, affordance-rules, inspect-state, interaction-events, interaction-validation
meadow-story-dsk: story-state, story-beats, dialogue-text, sequence-runner, story-validation
meadow-objective-dsk: objective-model, objective-flow, completion-ledger, feedback-surface, objective-validation
meadow-ecology-dsk: ambient-life, ecology-zones, ambience-triggers, non-gameplay-agents, ecology-validation
meadow-audio-dsk: ambient-bed, spatial-audio-cues, audio-state, audio-events, audio-validation
meadow-ui-dsk: minimal-hud, story-text-panel, debug-ui, ui-state, ui-validation
meadow-save-dsk: save-model, save-slots, persistence-adapter, migration, save-validation
meadow-diagnostics-dsk: runtime-health, render-health, determinism-checks, smoke-tests, diagnostics-report
meadow-performance-dsk: quality-profile, budget-policy, lod-policy, adaptive-scaling, performance-validation
meadow-render-host-dsk: renderer-selection, render-plan-ingest, pass-order, renderer-state, renderer-validation
post-process-stack-dsk: pass-registry, render-target-system, sobel-outline-pass, color-grade-pass, post-validation
render-target-kit: scene-color-texture, depth-texture, normal-texture, ping-pong-buffer, resize-policy
sobel-outline-pass-kit: color-edge-threshold, depth-edge-threshold, normal-edge-threshold, outline-color, object-mask
color-grade-pass-kit: warmth, contrast, saturation, shadow-tint, highlight-tint
depth-fog-pass-kit: fog-near, fog-far, fog-color, distance-curve, horizon-haze
vignette-pass-kit: radius, softness, strength, center, quality-tier
final-composite-pass-kit: scene-input, post-input, output-target, debug-overlay, fallback-composite
static-pages-deploy-dsk: build-config, github-pages-workflow, release-artifacts, cache-invalidation, deploy-validation
```

### Runtime source-backed surfaces

```txt
commit-pinned meadow-area provider
local fallback meadow provider
DSK installer and descriptor registry
static game state and snapshots
render-plan enhancer
CPU mesh builder
WebGL renderer and precision adapter
browser web host and GameHost surface
browser editor bridge
Node headless-editor environment
workspace list/read/write capabilities
capture artifact writer
static checks and GitHub Pages deployment
```

## Main finding: lexical prefix checks do not establish containment

Current code:

```js
function safePath(root, path = "") {
  const target = resolve(root, path);
  if (!target.startsWith(root)) throw new Error(`Path escapes editor root: ${path}`);
  return target;
}
```

This does not prove that `target` is a child path segment of `root`. It also does not prove that the target's real filesystem location remains inside the workspace after symlink resolution.

Affected services:

```txt
artifactRoot construction
renderer.capture JSON output
renderer.capture SVG output
workspace.list
workspace.read
workspace.write
```

`workspace.write` is the highest-risk path because it creates parent directories recursively and writes caller-controlled content.

## Required parent domain

```txt
meadow-workspace-path-authority-domain
```

Update existing owners first:

```txt
into-the-meadow-game-dsk
meadow-diagnostics-dsk
scripts/into-the-meadow-environment.mjs
NexusEngine core-headless-editor-kit path policy
```

Reusable path containment belongs in NexusEngine. This repo should own only the game workspace policy, allowed roots, artifact policy and adapters.

Candidate coordinating kits:

```txt
workspace-root-identity-kit
workspace-path-request-kit
workspace-containment-policy-kit
workspace-symlink-policy-kit
workspace-operation-admission-kit
workspace-artifact-path-kit
workspace-operation-result-kit
workspace-path-journal-kit
headless-workspace-adapter-kit
workspace-path-fixture-kit
```

## Required contract

Every operation should produce a typed result containing:

```txt
operationId
sessionId
workspaceRootId
operation: list | read | write | artifact-write
requestedPath
normalizedRelativePath
resolvedPathFingerprint
status: accepted | rejected | stale | unavailable | failed
reason: ok | absolute-path | parent-escape | sibling-prefix-escape | symlink-escape | root-mismatch | operation-denied | io-failed
bytesReadOrWritten
journalSequence
```

Do not publish raw absolute host paths through the public result.

## Required proof

```txt
root itself is accepted
normal descendants are accepted
.. escapes are rejected
sibling-prefix paths are rejected
absolute paths outside the root are rejected
symlink escapes are rejected
write paths verify their nearest existing ancestor
artifact paths use the same authority
list/read/write share one policy
rejected operations perform no filesystem mutation
results are bounded, typed and session-correlated
fixtures run on Linux, macOS and Windows path semantics where supported
```

## Ordered safe ledges

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Step Admission and Clock Integrity
5. Source Provider Authority
6. Render Topology Identity Authority
7. Committed Frame Observation Authority
8. Interaction Command Authority
9. DSK Registry Consumption Proof
```

Workspace containment follows the capability gateway because file operations must enter one admitted public path, and it precedes expanded editor automation because unsafe filesystem authority must not be composed into higher-level workflows.

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
workspace path fixture: unavailable
symlink containment fixture: unavailable
cross-platform path fixture: unavailable
```

No workspace-safety claim is made while the lexical prefix check remains the only containment test.