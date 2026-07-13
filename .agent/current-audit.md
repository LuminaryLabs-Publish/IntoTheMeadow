# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Audit timestamp:** `2026-07-13T02-39-44-04-00`  
**Status:** `headless-workspace-path-containment-central-reconciled`

## Summary

The Node headless environment exposes `workspace.list`, `workspace.read` and `workspace.write`, plus renderer capture that writes JSON and SVG artifacts. These paths use `safePath()`, which resolves the candidate and accepts it when the resulting string starts with the root string.

That test does not prove path-segment containment. A sibling with the same root prefix can pass, filesystem links remain unresolved during admission, and capture labels participate in artifact filenames. No canonical-root generation, symlink policy, typed operation result, atomic write or adversarial fixture closes the boundary.

## Plan ledger

**Goal:** define and centrally reconcile one canonical workspace transaction from editor command through path admission, filesystem effect and evidence publication.

- [x] Compare the full current Publish inventory and central ledger.
- [x] Confirm all nine non-Cavalry repositories have ledger and root `.agent` coverage.
- [x] Detect IntoTheMeadow repo-local documentation newer than central tracking.
- [x] Select and modify only IntoTheMeadow.
- [x] Inspect Node environment root and artifact-root setup.
- [x] Inspect workspace list/read/write capabilities.
- [x] Inspect renderer capture label and artifact path construction.
- [x] Inspect terminal, scenario and loop reachability.
- [x] Inspect current headless smoke coverage.
- [x] Preserve the complete 44-kit service inventory.
- [x] Define canonical-root, symlink, atomic-write and fixture boundaries.
- [x] Publish a new reconciliation family and machine routing.
- [x] Prepare central ledger and change-log synchronization.
- [ ] Implement and execute the authority later.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
repo-local audit newer than central ledger: 1

IntoTheMeadow      central 2026-07-13T00-18-48-04-00
                   local   2026-07-13T02-28-51-04-00 selected
PhantomCommand     central 2026-07-13T00-40-00-04-00
PrehistoricRush    central 2026-07-13T00-58-50-04-00
HorrorCorridor     central 2026-07-13T01-08-28-04-00
ZombieOrchard      central 2026-07-13T01-18-20-04-00
MyCozyIsland       central 2026-07-13T01-40-00-04-00
TheUnmappedHouse   central 2026-07-13T01-49-49-04-00
AetherVale         central 2026-07-13T02-15-51-04-00
TheOpenAbove       central 2026-07-13T02-18-03-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/IntoTheMeadow` is modified in the Publish organization.

## Complete interaction loop

```txt
browser / Pages
  -> load commit-pinned external provider
  -> create game and immutable state
  -> generate and enhance meadow render plan
  -> build CPU mesh data
  -> render WebGL frames
  -> expose GameHost and browser editor observations

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
  -> write JSON then SVG
  -> publish relative artifact paths
```

The browser route remains separate. It renders the actual canvas and does not expose the Node workspace provider through `window.NexusEditorEnvironment`.

## Domains in use

```txt
browser shell, provider loading and fatal projection
immutable game state, reset, snapshots and diagnostics
DSK declaration, registry and validation
meadow area, path, scatter, tree, grass, wind and atmosphere generation
render-plan composition and contract normalization
CPU mesh construction and WebGL presentation
browser GameHost and editor observation
Node headless runtime and terminal transport
scenario and loop execution
workspace-root and artifact-root configuration
filesystem list, read, directory creation and write
capture naming, JSON packet and SVG persistence
static, deterministic and headless smoke tests
build and GitHub Pages deployment
repo-local and central audit tracking
```

Declared but inert:

```txt
input, player, interaction, objective, story, ecology, audio, UI, save, adaptive performance
```

Missing:

```txt
workspace root ID and generation
canonical repository and artifact roots
relative-path-only request contract
path-segment containment admission
existing-target realpath verification
new-target canonical-parent verification
symlink and junction disposition
capability policy revision
capture-label normalization
opaque artifact identity
atomic write and paired-artifact result
typed WorkspaceOperationResult
stale-root and stale-policy rejection
bounded redacted observation and journal
cross-platform adversarial fixtures
```

## Source-backed findings

### String-prefix admission can accept an external sibling

For root `/work/IntoTheMeadow`, sibling `/work/IntoTheMeadow-output/file` still starts with the root string. A request such as `../IntoTheMeadow-output/file` can therefore pass the current condition while `path.relative(root, target)` shows it is outside the root.

### Symlinks are outside the current decision

`resolve()` is lexical and does not dereference links. After admission, `readdir`, `readFile`, `mkdir` and `writeFile` follow filesystem paths. A link below the root can redirect an operation unless the target or nearest existing parent is canonicalized and checked under an explicit policy.

### Mutation is reachable from editor transports

The environment registers list, read and write capabilities. Direct commands, interactive stdio, scenarios and loop actions can invoke them. The write surface is intentional even though the environment metadata describes a permissive observation mode.

### Capture placement shares the same boundary

`renderer.capture` inserts the caller label into `captureId` and uses that value in JSON and SVG filenames. Labels must be normalized as metadata and mapped to opaque artifact IDs instead of being trusted as path components.

### Capture completion is not atomic

JSON is written before SVG. If the second write fails, one member can remain committed without a typed group result identifying committed, rolled-back or orphaned artifacts.

### Existing proof covers normal flow only

Environment, command and loop smokes use safe labels and do not exercise workspace list/read/write adversarially. No declared check attempts sibling-prefix escape, absolute paths, traversal, links, stale roots or partial paired capture writes.

## Kit and service census

```txt
external provider kits: 1
local declared kits: 43
total kit surfaces: 44
required-v0.1 declarations: 15
planned declarations: 28
planned workspace authority kits: 28
implemented workspace-containment authorities: 0
```

The exact kit names and offered services are in `.agent/trackers/2026-07-13T02-39-44-04-00/project-breakdown.md` and `.agent/kit-registry.json`.

## Required authority

```txt
meadow-headless-workspace-path-containment-authority-domain
```

## Required transaction

```txt
WorkspaceOperationCommand
  -> bind editor session, environment and expected root generation
  -> bind capability and policy revision
  -> canonicalize configured repository or artifact root
  -> normalize a relative path or capture label
  -> reject absolute, malformed and parent-escaping requests
  -> verify path.relative containment
  -> apply explicit symlink and junction policy
  -> canonicalize existing target or nearest existing parent
  -> verify containment again
  -> execute list/read or atomic in-root write
  -> publish Accepted, Rejected, Stale, Failed or Cancelled
  -> record bounded redacted evidence

Rejected or stale
  -> zero filesystem mutation
  -> no directory creation
  -> no partial capture success
```

## Validation

Documentation only. No source, package, dependency, workspace or deployment behavior changed. No hostile path, link or capture label was executed. No containment, compromise, atomic-write safety or deployment-readiness claim is made.
