# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Audit timestamp:** `2026-07-13T02-28-51-04-00`  
**Status:** `headless-workspace-path-containment-authority-audited`

## Summary

The Node headless environment exposes `workspace.list`, `workspace.read` and `workspace.write`, plus renderer capture that writes JSON and SVG artifacts. All of these paths are protected by `safePath()`, which resolves the candidate and accepts it when the resulting string starts with the root string.

That test does not prove path-segment containment. A sibling whose name shares the root prefix can pass, and filesystem symlinks remain unresolved during admission. Capture labels also participate directly in artifact filenames. No canonical-root generation, symlink policy, typed operation result, atomic write or adversarial fixture closes the boundary.

## Plan ledger

**Goal:** define one canonical workspace transaction from editor command through path admission, filesystem effect and evidence publication.

- [x] Compare the full current Publish inventory and central ledger.
- [x] Select only the oldest eligible synchronized repository.
- [x] Inspect Node environment root and artifact-root setup.
- [x] Inspect workspace list/read/write capabilities.
- [x] Inspect renderer capture label and artifact path construction.
- [x] Inspect terminal and scenario reachability.
- [x] Inspect current headless smoke coverage.
- [x] Preserve the complete 44-kit service inventory.
- [x] Define canonical-root, symlink, atomic-write and fixture boundaries.
- [ ] Implement and execute the authority later.

## Selection

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
Node CLI / interactive stdio / scenario
  -> createEnvironment({ root, artifactRoot })
  -> root = resolve(configured root)
  -> artifactRoot = safePath(root, configured artifact path)
  -> create NexusEngine headless environment
  -> register runtime, scene, renderer, camera, browser and workspace capabilities
  -> terminal or loop invokes action

workspace list/read/write
  -> receive caller-controlled path
  -> resolve(root, path)
  -> accept when target.startsWith(root)
  -> call readdir, readFile or mkdir + writeFile

renderer capture
  -> receive caller-controlled label
  -> captureId = label + topologyKey
  -> resolve JSON and SVG paths through safePath(artifactRoot, ...)
  -> write both artifacts
  -> publish relative artifact paths
```

The browser route remains separate: it renders the actual canvas and exposes no Node workspace capability through `window.NexusEditorEnvironment`.

## Domains in use

```txt
browser shell and external provider loading
immutable game state, reset, snapshots and diagnostics
meadow generation and render-plan composition
CPU mesh construction and WebGL presentation
browser GameHost and editor observation
Node headless runtime and terminal transport
scenario and loop execution
workspace root and artifact-root configuration
filesystem list, read, directory creation and write
capture naming, JSON packet and SVG persistence
static, deterministic and headless smoke tests
build and GitHub Pages deployment
```

Declared but inert:

```txt
input, player, interaction, objective, story, ecology, audio, UI, save, adaptive performance
```

Missing:

```txt
workspace root ID and generation
canonical root and artifact-root result
relative-path-only request contract
path-segment containment admission
existing-target realpath verification
new-target canonical-parent verification
symlink disposition
capability policy revision
capture-label normalization
artifact identity independent of path
atomic write and paired artifact result
typed WorkspaceOperationResult
bounded redacted observation and journal
cross-platform adversarial fixtures
```

## Source-backed findings

### String-prefix admission can accept an external sibling

For a root `/work/IntoTheMeadow`, a resolved sibling `/work/IntoTheMeadow-output/file` still starts with the root string. A request such as `../IntoTheMeadow-output/file` can therefore pass the current condition even though `path.relative(root, target)` escapes the root.

### Symlinks are outside the current decision

`resolve()` is lexical. It does not dereference links. Once admitted, `readdir`, `readFile`, `mkdir` and `writeFile` follow filesystem paths. A link below the root can redirect an operation elsewhere unless the target or nearest existing parent is canonicalized and checked under an explicit symlink policy.

### Mutation is reachable from the editor transport

The environment advertises the workspace domain and registers list, read and write capabilities. The CLI supports direct commands, interactive stdio and scenario execution. The write surface is therefore intentionally reachable, even though `.editor/environment.json` labels the environment `permissive-observation`.

### Capture artifact placement shares the same boundary

`renderer.capture` accepts a label, inserts it into `captureId`, then uses that ID in JSON and SVG filenames. The same helper protects the artifact root. Labels must be normalized as metadata and mapped to opaque artifact IDs rather than being trusted as path components.

### Existing proof covers normal flow only

The environment, command and loop smokes use safe labels and do not call workspace list/read/write. No declared check attempts sibling-prefix escape, absolute paths, traversal, symlinks, stale roots or partial paired capture writes.

## Kit and service census

```txt
external provider kits: 1
local declared kits: 43
total kit surfaces: 44
required-v0.1 declarations: 15
planned declarations: 28
implemented workspace-containment authorities: 0
```

The exact inventory is in the current tracker and `.agent/kit-registry.json`.

## Required authority

```txt
meadow-headless-workspace-path-containment-authority-domain
```

## Required transaction

```txt
WorkspaceOperationCommand
  -> bind editor session, environment and expected root generation
  -> bind capability and policy revision
  -> canonicalize configured root
  -> normalize a relative path or capture label
  -> reject absolute, malformed and parent-escaping requests
  -> verify path.relative containment
  -> apply explicit symlink policy
  -> canonicalize existing target or nearest existing parent
  -> verify containment again
  -> execute list/read or atomic in-root write
  -> publish Accepted, Rejected, Stale, Failed or Cancelled
  -> record bounded redacted evidence
```

Rejected or stale commands must perform zero filesystem mutation. Cross-root access, if ever required, needs a separately named allowlisted capability.

## Validation

Documentation only. No source, package, dependency, workspace or deployment behavior changed. No hostile path, symlink or capture label was executed. No containment, security incident or deployment-readiness claim is made.