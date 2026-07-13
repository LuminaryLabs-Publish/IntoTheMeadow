# Workspace Command Path Admission Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-13T02-28-51-04-00`

## Summary

Workspace operations are reachable through direct CLI commands, interactive stdio and scripted scenarios. The adapter accepts paths at capability execution time and returns generic runtime success or failure without a path-admission result.

## Plan ledger

**Goal:** place one typed admission decision between every external editor command and every filesystem effect.

- [x] Map command entry points.
- [x] Map capability routing.
- [x] Map path and label inputs.
- [x] Map filesystem effects.
- [x] Define zero-mutation rejection behavior.
- [ ] Implement and test later.

## Entry points

```txt
npm run editor -- <command>
interactive stdio terminal
npm run editor -- run <scenario.json>
headless runtime loop stage actions
future remote browser-driver transport
```

## Current capability routes

```txt
workspace.list({ path })
  -> safePath(root, path)
  -> readdir(target)

workspace.read({ path })
  -> safePath(root, path)
  -> readFile(target, utf8)

workspace.write({ path, content })
  -> safePath(root, path)
  -> mkdir(dirname(target), recursive)
  -> writeFile(target, content)

renderer.capture({ label })
  -> label becomes part of capture filename
  -> safePath(artifactRoot, filename)
  -> write JSON and SVG
```

## Missing admission dimensions

```txt
command identity
editor session generation
workspace root identity and generation
capability policy revision
normalized relative path
absolute-path classification
path.relative containment result
existing target realpath
nearest existing parent realpath
symlink disposition
operation kind and mutability
expected file state or revision
write replacement policy
terminal result and observation ID
```

## Required command flow

```txt
external command
  -> parse capability and arguments
  -> allocate WorkspaceOperationCommand
  -> validate active editor session
  -> validate capability policy
  -> canonicalize current root generation
  -> normalize path or capture label
  -> classify target and symlink state
  -> return admission result

Rejected / Stale
  -> zero read, list, directory creation or write
  -> bounded redacted observation

Accepted
  -> execute exactly one admitted operation
  -> publish typed terminal result
  -> attach result to runtime command history
```

## Error handling

Generic thrown filesystem errors should not be the only policy surface. Expected policy outcomes should be typed:

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
Cancelled
```

## Concurrency and stale work

A long-running or queued operation must cite the root generation admitted at command time. If the environment root, artifact root or capability policy changes before execution, the operation must return `Stale` with zero mutation.

## Proof matrix

| Route | Safe case | Adversarial case |
|---|---|---|
| direct CLI | in-root read | sibling-prefix read |
| interactive stdio | in-root list | absolute path |
| scenario | in-root write | parent traversal |
| loop action | capture with normalized label | separator/traversal label |
| symlink | denied or explicitly in-root | link to external root |
| stale command | current generation | predecessor root generation |

## Completion boundary

A runtime-level `ok: true` or caught exception is not path admission proof. Completion requires typed policy results, zero-mutation rejection fixtures and command history that records the admitted canonical root generation.