# Architecture Audit: Workspace Path Authority DSK Map

**Timestamp:** `2026-07-11T12-29-49-04-00`

## Summary

The Node headless-editor environment currently owns filesystem resolution locally, but its lexical prefix test is not a trustworthy containment boundary. The correct architecture is a reusable NexusEngine path authority plus a game-specific workspace policy adapter.

## Plan ledger

**Goal:** make every workspace or artifact path pass through one typed, session-owned and filesystem-aware admission transaction.

- [x] Identify current path construction.
- [x] Identify all consumers.
- [x] Separate reusable engine policy from repo-specific policy.
- [x] Define parent domain and coordinating kits.
- [x] Define typed result and proof boundary.
- [ ] Implement after runtime lifecycle and host capability authority.

## Current ownership

```txt
scripts/into-the-meadow-environment.mjs
  -> safePath()
  -> artifactRoot
  -> renderer.capture
  -> workspace.list
  -> workspace.read
  -> workspace.write
```

## Required parent domain

```txt
meadow-workspace-path-authority-domain
```

## Existing owners to update first

```txt
into-the-meadow-game-dsk
meadow-diagnostics-dsk
scripts/into-the-meadow-environment.mjs
NexusEngine core-headless-editor-kit
```

## Layer map

```txt
Layer 1: IntoTheMeadow
  game-specific workspace and artifact policy

Layer 2: meadow-workspace-path-authority-domain
  operation admission, root identity, result and observation

Layer 3: coordinating kits
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

Layer 4: NexusEngine reusable services
  segment-aware relative containment
  platform-normalized path comparison
  realpath and symlink policy
  nearest-existing-ancestor validation for writes
  typed filesystem operation results

Layer 5: adapters
  workspace.list
  workspace.read
  workspace.write
  renderer.capture artifact writes
```

## Admission sequence

```txt
receive operation command
  -> validate session and capability lease
  -> identify allowed root
  -> reject null, malformed or forbidden operation
  -> normalize requested relative path
  -> resolve target lexically
  -> verify segment-aware containment
  -> resolve real target or nearest existing ancestor
  -> verify symlink-aware containment
  -> apply operation policy and resource budget
  -> execute I/O
  -> return typed result and bounded journal row
```

## Result contract

```js
{
  operationId: "workspace-op-0001",
  sessionId: "into-the-meadow:editor-session-0",
  workspaceRootId: "project-root",
  operation: "write",
  requestedPath: "notes/audit.md",
  normalizedRelativePath: "notes/audit.md",
  status: "accepted",
  reason: "ok",
  bytesReadOrWritten: 128,
  journalSequence: 1
}
```

Absolute host paths should remain private.

## Required fixtures

```txt
accept root and normal descendants
reject parent traversal
reject sibling-prefix traversal
reject outside absolute paths
reject symlink traversal
verify write nearest-existing ancestor
verify no mutation on rejection
verify artifact and workspace parity
verify result schema and bounded journals
verify Windows and POSIX path semantics
```

## Order

```txt
Runtime Session Lifecycle
  -> Host Capability Gateway
  -> Workspace Path Authority
  -> Runtime Step Authority
  -> expanded headless automation
```