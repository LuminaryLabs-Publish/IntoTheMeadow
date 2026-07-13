# Headless Workspace Path Containment DSK Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-13T02-28-51-04-00`

## Summary

The Node headless editor exposes repository workspace and capture-artifact filesystem operations without a canonical containment authority. The current adapter uses one lexical prefix helper for roots, user paths and artifact names.

## Plan ledger

**Goal:** place path normalization, containment, symlink policy, capability admission and operation results in one reusable headless-workspace domain.

- [x] Identify current owners and consumers.
- [x] Separate engine runtime, game environment and filesystem provider responsibilities.
- [x] Define atomic and composite kits.
- [x] Define the command/result transaction.
- [x] Define proof surfaces.
- [ ] Implement after acceptance.

## Current ownership

```txt
NexusEngine core-headless-editor runtime
  owns sessions, command routing, loops and capability execution

IntoTheMeadow environment adapter
  owns repository root selection
  owns artifact root selection
  defines workspace list/read/write capabilities
  defines renderer.capture artifact naming and persistence

Node filesystem provider
  resolves paths
  follows links
  creates directories
  reads, lists and writes host files
```

## Missing parent domain

```txt
meadow-headless-workspace-path-containment-authority-domain
```

The domain is game-adapter specific until the contract is proven in multiple environments. Canonical path-admission primitives can then be promoted into NexusEngine core-headless-editor or a stable filesystem provider kit.

## Proposed composition

```txt
meadow-headless-workspace-path-containment-authority-domain
  identity
    workspace-session-kit
    workspace-root-id-kit
    workspace-root-generation-kit

  policy
    workspace-capability-policy-kit
    workspace-symlink-policy-kit
    workspace-artifact-root-kit

  request
    workspace-operation-command-kit
    workspace-path-request-kit
    workspace-capture-label-kit

  admission
    workspace-root-canonicalization-kit
    workspace-path-normalization-kit
    workspace-relative-containment-kit
    workspace-existing-target-realpath-kit
    workspace-new-target-parent-admission-kit
    workspace-list-admission-kit
    workspace-read-admission-kit
    workspace-write-admission-kit
    workspace-artifact-path-admission-kit

  execution
    workspace-atomic-write-kit
    workspace-operation-result-kit
    stale-workspace-operation-rejection-kit

  evidence
    workspace-observation-kit
    workspace-journal-kit

  proof
    workspace-containment-fixture-kit
    sibling-prefix-escape-fixture-kit
    symlink-escape-fixture-kit
    capture-label-traversal-fixture-kit
```

## Service boundary

| Service | Responsibility |
|---|---|
| `workspace.root.canonicalize` | Resolve and retain the canonical root identity and generation. |
| `workspace.path.normalize` | Require a normalized relative request and reject invalid forms. |
| `workspace.path.admit` | Prove path-segment containment using `path.relative`, not prefix matching. |
| `workspace.path.realpath` | Resolve existing targets or nearest existing parents before execution. |
| `workspace.symlink.evaluate` | Apply explicit deny, allow-in-root or allowlisted-link policy. |
| `workspace.capability.admit` | Bind list/read/write/artifact access to a named policy. |
| `workspace.artifact.name` | Normalize capture labels into stable non-path identifiers. |
| `workspace.artifact.admit` | Bind every evidence path to the canonical artifact root. |
| `workspace.write.atomic` | Stage and replace files only inside an admitted parent. |
| `workspace.operation.result` | Return one typed terminal result with root and operation generations. |
| `workspace.observe` | Publish bounded redacted evidence without leaking arbitrary host paths. |

## Required transaction

```txt
WorkspaceOperationCommand {
  commandId
  editorSessionId
  environmentId
  workspaceRootId
  expectedRootGeneration
  capability
  requestedPath
  captureLabel?
  expectedPolicyRevision
}

  -> validate session and environment
  -> validate capability policy
  -> canonicalize configured root
  -> normalize requested relative path
  -> calculate candidate under root
  -> verify path.relative(root, candidate) is contained
  -> inspect symlink state
  -> canonicalize target or nearest existing parent
  -> verify canonical containment again
  -> execute list/read or atomic write
  -> return WorkspaceOperationResult
```

## Terminal result

```txt
WorkspaceOperationResult {
  commandId
  status: Accepted | Rejected | Stale | Failed | Cancelled
  reason
  capability
  workspaceRootId
  rootGeneration
  policyRevision
  normalizedRelativePath
  targetKind
  symlinkDisposition
  bytesRead?
  bytesWritten?
  artifactId?
  observationId
}
```

Host absolute paths should remain internal unless an explicitly privileged diagnostic capability is admitted.

## Invariants

```txt
string prefix is never sufficient containment proof
all public workspace requests are relative
absolute and parent-escaping results are rejected
existing targets are checked after canonicalization
new targets are admitted through a canonical existing parent
symlink behavior is authored, not accidental
capture labels cannot become path segments
write staging and final replacement remain in one admitted parent
stale root generations perform zero filesystem mutation
cross-root access requires a separately named capability and allowlist
```

## Promotion boundary

Promote generic path-admission kits to NexusEngine only after:

```txt
multiple environment adapters use the same command/result contract
Windows and POSIX fixtures pass
existing and new-target symlink cases pass
atomic-write behavior is provider-neutral
error and path-redaction behavior is stable
```

## Completion boundary

Completion requires executable sibling-prefix, absolute-path, traversal, symlink, capture-label and atomic-write fixtures. Documentation and a corrected string comparison alone are not sufficient proof.