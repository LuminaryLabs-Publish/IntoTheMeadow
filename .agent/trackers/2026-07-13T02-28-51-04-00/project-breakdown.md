# IntoTheMeadow Project Breakdown

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Audit timestamp:** `2026-07-13T02-28-51-04-00`  
**Status:** `headless-workspace-path-containment-authority-audited`

## Summary

IntoTheMeadow contains one commit-pinned browser meadow provider, one local fallback provider, 43 local DSK declarations, immutable game state, deterministic meadow generation, a persistent WebGL renderer, browser editor readback and a permissive Node headless editor.

This audit isolates the Node workspace boundary. `safePath()` admits a target when its resolved string starts with the root string. That lexical prefix test does not prove path-segment containment and does not address symlinks. The exposed `workspace.list`, `workspace.read`, `workspace.write` and renderer-capture artifact paths can therefore resolve outside the intended root in reachable sibling-prefix or symlink cases.

## Plan ledger

**Goal:** preserve the full repository architecture while defining one canonical workspace authority for every editor read, list, write and capture-artifact operation.

- [x] Compare the full accessible `LuminaryLabs-Publish` repository inventory.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger entries and root `.agent` state.
- [x] Confirm no eligible repository is new, ledger-missing, root-`.agent`-missing or centrally unsynchronized.
- [x] Select only `LuminaryLabs-Publish/IntoTheMeadow`, the oldest eligible central entry.
- [x] Identify the browser, game, render, editor and workspace interaction loops.
- [x] Identify active, declared, inert and missing domains.
- [x] Preserve all 44 existing kit surfaces and their offered services.
- [x] Inspect the Node environment root, artifact root and workspace capability implementation.
- [x] Inspect terminal/scenario reachability and current headless smoke coverage.
- [x] Define canonical-root, path-admission, symlink, artifact-name and atomic-write boundaries.
- [x] Add timestamped architecture, render, interaction, editor-workspace and deployment audits.
- [x] Refresh required root `.agent` routing and machine-readable state.
- [x] Change documentation only.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement the authority and execute adversarial workspace fixtures later.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
unsynchronized eligible repositories: 0

IntoTheMeadow      2026-07-13T00-18-48-04-00 selected oldest
PhantomCommand     2026-07-13T00-40-00-04-00
PrehistoricRush    2026-07-13T00-58-50-04-00
HorrorCorridor     2026-07-13T01-08-28-04-00
ZombieOrchard      2026-07-13T01-18-20-04-00
MyCozyIsland       2026-07-13T01-40-00-04-00
TheUnmappedHouse   2026-07-13T01-49-49-04-00
AetherVale         2026-07-13T02-15-51-04-00
TheOpenAbove       2026-07-13T02-18-03-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/IntoTheMeadow` is modified in the Publish organization.

## Complete interaction loop

```txt
browser / Pages
  -> boot document and canvas
  -> load the commit-pinned meadow provider
  -> create game and immutable state
  -> enhance meadow-render-plan/v2
  -> build CPU mesh data
  -> render WebGL frames
  -> expose GameHost and NexusEditorEnvironment

Node terminal or scenario
  -> scripts/nexus-editor.mjs
  -> createEnvironment({ root, artifactRoot })
  -> resolve root and artifactRoot
  -> create game, enhancer and headless environment
  -> create NexusEngine headless runtime and terminal transport
  -> dispatch capability command

workspace.list / workspace.read / workspace.write
  -> accept caller-controlled path
  -> safePath(root, path)
  -> resolve(root, path)
  -> admit when target.startsWith(root)
  -> readdir, readFile or mkdir + writeFile

renderer.capture
  -> accept caller-controlled label
  -> build captureId from label + topologyKey
  -> safePath(artifactRoot, captures/<captureId>.json|svg)
  -> write JSON packet and SVG observation
  -> report paths relative to the repository root
```

## Domains in use

```txt
browser document shell, loading and fatal projection
game manifest and immutable source configuration
external provider import and local fallback generation
DSK declaration, external status and validation
meadow area, path, scatter, tree, grass, wind and atmosphere generation
render-plan enhancement and contract normalization
CPU mesh generation and WebGL presentation
GameHost and browser editor observation
Node headless runtime, terminal transport and scenario execution
headless workspace list, read and write capabilities
capture artifact naming, directory creation and persistence
visual metrics, JSON evidence and SVG observation
static, deterministic and editor smoke tests
build and GitHub Pages deployment
```

Declared but currently inert:

```txt
input
player
interaction
objective
story
ecology
audio
UI
save
adaptive performance
```

Missing workspace authority:

```txt
workspace root identity and generation
canonical root resolution
path-segment containment result
absolute-path rejection
existing-target realpath verification
new-target canonical-parent verification
symlink traversal policy
capability-specific read/list/write policy
capture label normalization
artifact-root identity and fingerprint
atomic write and replacement policy
typed workspace operation result
bounded operation observation and journal
adversarial containment fixtures
```

## Source-backed findings

### Prefix matching is not path containment

`safePath()` resolves the candidate and checks `target.startsWith(root)`. For a root such as `/work/IntoTheMeadow`, a sibling such as `/work/IntoTheMeadow-output` has the same string prefix. A relative request that resolves to that sibling can pass while being outside the intended directory tree.

### Lexical resolution does not constrain symlinks

`resolve()` normalizes path segments but does not dereference filesystem links. `readdir`, `readFile`, `mkdir` and `writeFile` follow filesystem paths after admission. A symlink below the repository or artifact root can therefore redirect an admitted lexical path outside the root unless an explicit symlink policy and canonical existing-parent check are applied.

### The capability is reachable from terminal and scenarios

The Node environment advertises the `workspace` domain and registers `workspace.list`, `workspace.read` and `workspace.write`. `nexus-editor.mjs` exposes the environment through direct commands, interactive stdio and scenario execution. The boundary is therefore part of the agent operating surface, not dead helper code.

### Capture labels also participate in path construction

`renderer.capture` combines caller-supplied `label` with the topology key and inserts the result into JSON and SVG filenames. The same `safePath()` helper is used against the artifact root. Capture evidence therefore requires independent label normalization and artifact-path admission rather than relying on a broad workspace-prefix check.

### Current smoke tests use only trusted paths and labels

The declared `check` command exercises statistics, runtime ticks, normal captures and loop flow. It does not call workspace list/read/write with adversarial paths, test sibling-prefix collisions, create symlink escapes, use hostile capture labels or verify that no external file was created.

## Reachable failure examples

```txt
root = /work/IntoTheMeadow
request = ../IntoTheMeadow-output/result.txt
resolved = /work/IntoTheMeadow-output/result.txt
resolved.startsWith(root) = true
workspace.write can create or replace a file outside root
```

```txt
/work/IntoTheMeadow/linked -> /outside
request = linked/secret.txt
lexical target remains below root
readFile/writeFile follows the link
operation reaches /outside/secret.txt
```

```txt
capture label contains traversal segments
captureId is inserted into artifact filename
prefix-collision or symlink path is admitted
JSON/SVG evidence is written outside the intended artifact root
returned relative artifact path can contain parent traversal
```

These are source-derived reachability findings. No exploit or external write was executed in this documentation run.

## Complete kit and offered-service inventory

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
required-v0.1 local declarations: 15
planned local declarations: 28
implemented workspace-containment authorities: 0
```

| Kit | Offered services |
|---|---|
| `meadow-area-kit` | area normalization; path normalization; style/material normalization; deterministic seeded scatter; meadow feature descriptors; render-plan generation; validation; snapshot; reset; optional runtime adapter |
| `into-the-meadow-game-dsk` | game-manifest; kit-stack-registry; game-state-root; boot-sequence; game-snapshot |
| `web-host-dsk` | document-shell; browser-loop; host-debug-surface; asset-loading-host; browser-safety |
| `game-composition-dsk` | dsk-registry; scene-composition; render-composition; simulation-composition; composition-validation |
| `meadow-area-bridge-dsk` | meadow-area-config; meadow-feature-config; meadow-area-kit-adapter; meadow-area-state; meadow-area-validation |
| `meadow-terrain-texture-dsk` | terrain-surface-model; material-layer-system; path-layer-system; terrain-sampler; terrain-validation |
| `path-corridor-dsk` | path-curve-model; walkable-corridor; path-surface-detail; path-progression; path-validation |
| `grass-density-texture-kit` | density-texture-model; density-channels; density-compositor; density-sampler; density-validation |
| `grass-clump-archetype-kit` | clump-family-registry; card-layout-generator; texture-atlas-binding; clump-variant-generator; archetype-validation |
| `grass-static-batch-kit` | clump-mesh-builder; batch-variant-cache; atlas-material; static-batch-lod; batch-validation |
| `grass-patch-placement-kit` | patch-grid; density-driven-placement; clump-instance-selection; patch-instance-buffer; placement-validation |
| `grass-clump-instancing-render-kit` | batch-registry; instance-stream; draw-group-builder; shader-binding; render-validation |
| `grass-shader-wind-kit` | wind-uniforms; tip-bend-model; phase-field; gust-response; wind-validation |
| `grass-lod-policy-kit` | near-lod; mid-lod; far-lod; terrain-tint-lod; lod-validation |
| `grass-density-scaling-kit` | quality-scale; budget-scale; density-scale; profile-scale; scale-validation |
| `grass-debug-visualization-kit` | density-view; patch-view; instance-view; lod-view; debug-validation |
| `grass-patch-dsk` | patch-grid; blade-distribution; terrain-awareness; wind-binding; grass-validation |
| `gpu-grass-render-dsk` | grass-instance-buffer; grass-blade-mesh; shader-wind; grass-lod-render; grass-render-validation |
| `wind-field-dsk` | wind-state; wind-sampler; wind-zones; wind-consumers; wind-validation |
| `tree-object-dsk` | focal-tree-model; tree-line-model; tree-materials; tree-wind-binding; tree-validation |
| `meadow-scatter-dsk` | flower-scatter; rock-scatter; mushroom-scatter; placement-rules; scatter-validation |
| `meadow-atmosphere-dsk` | sky-gradient; sun-system; cloud-layer; distant-hills; atmosphere-validation |
| `meadow-player-dsk` | player-state; movement-profile; terrain-contact; player-actions; player-validation |
| `meadow-camera-dsk` | camera-mode; camera-rig; camera-collision; camera-feel; camera-validation |
| `meadow-input-dsk` | action-map; device-bindings; input-context; input-normalization; input-validation |
| `meadow-interaction-dsk` | interactable-registry; affordance-rules; inspect-state; interaction-events; interaction-validation |
| `meadow-story-dsk` | story-state; story-beats; dialogue-text; sequence-runner; story-validation |
| `meadow-objective-dsk` | objective-model; objective-flow; completion-ledger; feedback-surface; objective-validation |
| `meadow-ecology-dsk` | ambient-life; ecology-zones; ambience-triggers; non-gameplay-agents; ecology-validation |
| `meadow-audio-dsk` | ambient-bed; spatial-audio-cues; audio-state; audio-events; audio-validation |
| `meadow-ui-dsk` | minimal-hud; story-text-panel; debug-ui; ui-state; ui-validation |
| `meadow-save-dsk` | save-model; save-slots; persistence-adapter; migration; save-validation |
| `meadow-diagnostics-dsk` | runtime-health; render-health; determinism-checks; smoke-tests; diagnostics-report |
| `meadow-performance-dsk` | quality-profile; budget-policy; lod-policy; adaptive-scaling; performance-validation |
| `meadow-render-host-dsk` | renderer-selection; render-plan-ingest; pass-order; renderer-state; renderer-validation |
| `meadow-webgl-renderer-v2-kit` | WebGL context acquisition; shader program creation; attribute/uniform binding; CPU mesh ingestion; GPU buffer ownership; draw submission; resize; snapshot; disposal |
| `post-process-stack-dsk` | pass-registry; render-target-system; sobel-outline-pass; color-grade-pass; post-validation |
| `render-target-kit` | scene-color-texture; depth-texture; normal-texture; ping-pong-buffer; resize-policy |
| `sobel-outline-pass-kit` | color-edge-threshold; depth-edge-threshold; normal-edge-threshold; outline-color; object-mask |
| `color-grade-pass-kit` | warmth; contrast; saturation; shadow-tint; highlight-tint |
| `depth-fog-pass-kit` | fog-near; fog-far; fog-color; distance-curve; horizon-haze |
| `vignette-pass-kit` | radius; softness; strength; center; quality-tier |
| `final-composite-pass-kit` | scene-input; post-input; output-target; debug-overlay; fallback-composite |
| `static-pages-deploy-dsk` | build-config; github-pages-workflow; release-artifacts; cache-invalidation; deploy-validation |

## Required parent domain

```txt
meadow-headless-workspace-path-containment-authority-domain
```

## Candidate authority kits

```txt
workspace-session-kit
workspace-root-id-kit
workspace-root-generation-kit
workspace-root-canonicalization-kit
workspace-capability-policy-kit
workspace-operation-command-kit
workspace-path-request-kit
workspace-path-normalization-kit
workspace-relative-containment-kit
workspace-existing-target-realpath-kit
workspace-new-target-parent-admission-kit
workspace-symlink-policy-kit
workspace-list-admission-kit
workspace-read-admission-kit
workspace-write-admission-kit
workspace-artifact-root-kit
workspace-capture-label-kit
workspace-artifact-path-admission-kit
workspace-atomic-write-kit
workspace-operation-result-kit
stale-workspace-operation-rejection-kit
workspace-observation-kit
workspace-journal-kit
workspace-containment-fixture-kit
sibling-prefix-escape-fixture-kit
symlink-escape-fixture-kit
capture-label-traversal-fixture-kit
```

## Required transaction

```txt
WorkspaceOperationCommand
  -> bind editor session, environment and workspace-root generation
  -> bind requested capability and expected policy
  -> canonicalize the configured root
  -> require a normalized relative path
  -> reject absolute, empty-invalid and malformed requests
  -> calculate path.relative(canonicalRoot, candidate)
  -> reject parent traversal or absolute relative results
  -> apply explicit symlink policy
  -> canonicalize the existing target or nearest existing parent
  -> re-check containment after canonicalization
  -> sanitize capture labels independently from paths
  -> perform list/read or an atomic in-root write
  -> publish Accepted, Rejected, Stale, Failed or Cancelled
  -> record bounded evidence without exposing unrestricted host paths
```

For writes, the candidate and temporary file must share an admitted parent under the canonical root. A cross-root capability, if intentionally required, must be separately named, allowlisted and audited instead of being reachable through path formatting.

## Repo-local output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-13T02-28-51-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T02-28-51-04-00.md
.agent/architecture-audit/2026-07-13T02-28-51-04-00-headless-workspace-path-containment-dsk-map.md
.agent/render-audit/2026-07-13T02-28-51-04-00-workspace-artifact-visible-evidence-gap.md
.agent/interaction-audit/2026-07-13T02-28-51-04-00-workspace-command-path-admission-map.md
.agent/editor-workspace-audit/2026-07-13T02-28-51-04-00-canonical-root-symlink-atomic-write-contract.md
.agent/deploy-audit/2026-07-13T02-28-51-04-00-workspace-containment-fixture-gate.md
```

## Validation boundary

```txt
runtime source changed: no
gameplay changed: no
provider behavior changed: no
renderer changed: no
headless workspace behavior changed: no
package or dependency changed: no
deployment changed: no
branch created: no
pull request created: no

npm run check: not run
workspace adversarial fixtures: unavailable
sibling-prefix write attempt: not executed
symlink escape attempt: not executed
hostile capture-label attempt: not executed
browser or Pages smoke: not run
```

No external file access, actual exploit, production compromise, containment correctness, atomic-write safety or deployment-readiness claim is made.