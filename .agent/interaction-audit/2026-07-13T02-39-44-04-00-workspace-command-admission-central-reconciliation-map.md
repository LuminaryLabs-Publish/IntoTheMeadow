# Workspace Command Admission Central Reconciliation Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-13T02-39-44-04-00`

## Summary

Workspace effects are reachable through direct CLI commands, interactive stdio, scenarios and headless loop actions. The adapter receives path or label arguments at capability execution time and relies on generic exceptions rather than a typed path-admission result.

## Plan ledger

**Goal:** place one terminal admission decision between every external editor command and every filesystem effect.

- [x] Map entry points.
- [x] Map capability routes.
- [x] Map path and label inputs.
- [x] Map mutation and evidence effects.
- [x] Define zero-mutation rejection.
- [ ] Implement and execute later.

## Entry points

```txt
npm run editor -- <command>
interactive stdio terminal
npm run editor -- run <scenario.json>
headless runtime loop stage actions
future remote editor transport
```

## Current routes

```txt
workspace.list({ path })
  -> safePath(root, path)
  -> readdir

workspace.read({ path })
  -> safePath(root, path)
  -> readFile

workspace.write({ path, content })
  -> safePath(root, path)
  -> mkdir parent
  -> writeFile

renderer.capture({ label })
  -> label enters captureId
  -> captureId enters JSON/SVG paths
  -> safePath(artifactRoot, path)
  -> sequential writes
```

## Missing command evidence

```txt
command identity
editor session generation
workspace-root identity and generation
capability policy revision
normalized relative path
absolute-path classification
path.relative containment result
existing-target realpath
nearest existing parent realpath
symlink disposition
operation mutability
expected file state
write replacement policy
terminal result
observation ID
```

## Required flow

```txt
external editor command
  -> parse capability and arguments
  -> allocate WorkspaceOperationCommand
  -> validate editor session and environment
  -> validate capability policy
  -> bind expected root generation
  -> canonicalize root
  -> normalize relative path or label
  -> classify target and links
  -> return admission decision

Rejected | Stale
  -> zero read, list, directory creation or write
  -> bounded redacted observation

Accepted
  -> execute exactly one admitted operation
  -> publish typed terminal result
  -> attach result to command history
```

## Typed policy outcomes

```txt
RejectedAbsolutePath
RejectedParentTraversal
RejectedOutsideCanonicalRoot
RejectedSymlink
RejectedCapability
RejectedStaleRoot
RejectedName
NotFound
Conflict
ReadFailed
WriteFailed
PartialArtifactCommit
Cancelled
```

## Proof matrix

| Route | Safe case | Adversarial case |
|---|---|---|
| direct CLI | in-root read | sibling-prefix read |
| interactive stdio | in-root list | absolute path |
| scenario | in-root write | parent traversal |
| loop action | normalized capture label | separator or traversal label |
| symlink | authored in-root policy | link to external root |
| stale command | current root generation | predecessor generation |

## Completion boundary

A runtime `ok: true` or caught exception is not admission proof. Completion requires typed policy results, zero-mutation rejection fixtures and command history citing the admitted canonical root generation.
