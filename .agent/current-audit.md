# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Audit timestamp:** `2026-07-11T12-29-49-04-00`

## Summary

`IntoTheMeadow` is a DSK-composed static browser meadow with one commit-pinned external provider, 43 local DSK declarations, a WebGL renderer, browser editor bridge and Node headless-editor environment.

This pass audits the filesystem boundary behind the Node editor. The local `safePath()` helper resolves a path and checks `target.startsWith(root)`. That is a character-prefix check, not segment-aware containment, and it does not inspect symlink destinations.

## Plan ledger

**Goal:** make list, read, write and artifact operations use one canonical workspace authority with typed rejection, no-mutation guarantees and cross-platform fixtures.

- [x] Enumerate ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Verify nine eligible central ledger entries and root `.agent` states.
- [x] Select only `IntoTheMeadow` as the oldest eligible entry.
- [x] Read `AGENTS.md` and retained audits.
- [x] Trace browser and Node interaction loops.
- [x] Trace `safePath`, artifact writes and workspace operations.
- [x] Inventory domains, kits and services.
- [x] Add architecture, render, interaction, editor, security and deploy audits.
- [x] Change documentation only.
- [ ] Runtime implementation and fixtures remain future work.

## Selection state

```txt
accessible Publish repos: 10
eligible after exclusion: 9
central ledger entries: 9
root .agent states: 9
new or missing eligible repos: 0
selected: LuminaryLabs-Publish/IntoTheMeadow
selection basis: oldest eligible central-ledger timestamp
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Interaction loops

### Browser

```txt
boot
  -> load external provider
  -> create game, enhancer and WebGL renderer
  -> expose GameHost and browser editor bridge
  -> RAF tick
  -> enhance plan
  -> render
  -> diagnostics
```

### Node headless editor

```txt
createEnvironment
  -> define project root and artifact root
  -> create game and enhancer
  -> register runtime, scene, renderer, browser and workspace capabilities
  -> editor client invokes capability
  -> capability executes local callback
```

### Workspace operation

```txt
workspace.list/read/write or renderer.capture
  -> caller-controlled path
  -> safePath(root, path)
  -> resolve(root, path)
  -> target.startsWith(root)
  -> filesystem operation
```

## Domains in use

```txt
browser shell, DOM boot and fatal projection
manifest and external dependency declaration
source-provider loading, fallback, source-plan generation and validation
DSK registry, descriptor installation and snapshots
game state, tick, reset, snapshot and diagnostics
runtime lifecycle, RAF ownership and session authority
public host capability routing, admission and revocation
browser editor invocation and error observation
Node headless editor runtime and workspace capabilities
workspace root identity, path containment, symlink policy and I/O admission
artifact path construction and capture publication
runtime step admission, clock policy and work budget
terrain, path, materials, grass, scatter, trees, wind and atmosphere
render-plan enhancement, validation and topology identity
performance, LOD and postprocess policy
CPU mesh construction and contribution accounting
WebGL resources, caching, rendering, snapshots and disposal
GameHost and editor observations
static checks, editor smokes, build and Pages deployment
```

## Kit inventory

```txt
external declared kits: 1
local declared kits: 43
total declared kits: 44
required-v0.1 local kits: 15
runtime source-backed surfaces: 24
```

The complete per-kit service inventory is recorded in:

```txt
.agent/trackers/2026-07-11T12-29-49-04-00/project-breakdown.md
.agent/kit-registry.json
src/dsks/index.js
```

## Services offered by the current stack

```txt
commit-pinned external meadow source loading
fallback source-plan construction
DSK descriptor registration and snapshots
raw game state, tick, reset and render-plan rebuild
browser RAF hosting
browser editor capability lookup and invocation
Node headless runtime, scene and renderer capabilities
workspace directory listing
workspace file reading
workspace directory creation and file writing
capture JSON and SVG artifact writing
render-plan enhancement and descriptor validation
CPU mesh generation
WebGL buffer caching and two-pass drawing
GameHost and editor observations
static checks and Pages deployment
```

Services not currently offered:

```txt
segment-aware workspace containment
realpath and symlink containment
workspace root identity and revision
operation-specific path policy
read/write budgets
no-mutation rejection proof
workspace command and result identity
bounded filesystem journal
artifact pair transaction result
cross-platform path fixture proof
```

## Main finding: `startsWith` is not path containment

Current implementation:

```js
function safePath(root, path = "") {
  const target = resolve(root, path);
  if (!target.startsWith(root)) throw new Error(`Path escapes editor root: ${path}`);
  return target;
}
```

Concrete sibling-prefix path:

```txt
root:   /workspace/IntoTheMeadow
input:  ../IntoTheMeadow-escape/out.txt
target: /workspace/IntoTheMeadow-escape/out.txt
```

The target is outside the root but its string begins with the root string. The current check therefore admits it.

A path under an inside-root symlink can also resolve on disk outside the root because `safePath()` never compares `realpath()` results.

Affected services:

```txt
artifactRoot construction
renderer.capture JSON output
renderer.capture SVG output
workspace.list
workspace.read
workspace.write
```

`workspace.write` can create parent directories recursively and write caller-controlled content after this incomplete admission check.

## Required parent domain

```txt
meadow-workspace-path-authority-domain
```

Update existing owners first:

```txt
into-the-meadow-game-dsk
meadow-diagnostics-dsk
scripts/into-the-meadow-environment.mjs
NexusEngine core-headless-editor-kit
```

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

Reusable containment belongs in NexusEngine. This repository owns allowed roots, operations, budgets and artifact policy.

## Required proof

```txt
accept root and normal descendants
reject parent traversal
reject sibling-prefix traversal
reject outside absolute paths
reject symlink traversal
validate nearest existing ancestor for new writes
perform no I/O on rejection
use one policy for workspace and artifact operations
return typed session-correlated results
publish relative paths only
run POSIX and Windows path-semantics fixtures where supported
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

## Next safe ledge

```txt
IntoTheMeadow Headless Workspace Path Authority
+ Sibling-Prefix / Symlink / Rejected-Write No-Mutation Fixture Gate
```

Runtime lifecycle and host capability authority remain prerequisites because workspace commands need one session lease and exclusive public command path.