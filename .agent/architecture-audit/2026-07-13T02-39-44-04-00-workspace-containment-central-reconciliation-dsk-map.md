# Workspace Containment Central Reconciliation DSK Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-13T02-39-44-04-00`

## Summary

The Node headless editor combines NexusEngine command routing with a game-owned filesystem adapter. The missing boundary is not a meadow gameplay domain. It is a headless-workspace authority that admits roots, paths, capabilities and effects before the Node provider touches the host filesystem.

## Plan ledger

**Goal:** preserve the existing DSK composition while assigning filesystem identity, policy, admission, execution and evidence to one bounded authority.

- [x] Identify current owners and consumers.
- [x] Separate NexusEngine runtime responsibilities from game-adapter policy.
- [x] Define the missing parent domain.
- [x] Define atomic kits and services.
- [x] Define promotion conditions for reusable core primitives.
- [ ] Implement after review.

## Current ownership

```txt
NexusEngine headless editor runtime
  owns session and command dispatch
  owns capability registration and execution
  owns runtime command history

IntoTheMeadow environment adapter
  selects repository root
  selects artifact root
  registers workspace list/read/write
  names and persists capture artifacts

Node filesystem provider
  resolves lexical paths
  follows filesystem links
  creates directories
  reads, lists and writes files
```

## Missing parent domain

```txt
meadow-headless-workspace-path-containment-authority-domain
```

This remains game-adapter scoped until the command/result contract passes in more than one environment. Generic canonical-path and operation-result primitives can then be promoted into NexusEngine core-headless-editor or a provider package.

## Proposed DSK composition

```txt
meadow-headless-workspace-path-containment-authority-domain
  identity
    workspace-session-kit
    workspace-root-id-kit
    workspace-root-generation-kit
    workspace-artifact-root-kit

  policy
    workspace-capability-policy-kit
    workspace-symlink-policy-kit
    workspace-conflict-policy-kit
    workspace-path-redaction-policy-kit

  command
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
    workspace-paired-artifact-commit-kit
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
| `workspace.root.canonicalize` | Resolve configured roots into retained canonical identities and generations. |
| `workspace.path.normalize` | Require a normalized relative request and reject invalid forms. |
| `workspace.path.admit` | Prove segment containment without string-prefix assumptions. |
| `workspace.path.realpath` | Canonicalize an existing target or nearest existing parent. |
| `workspace.symlink.evaluate` | Apply explicit deny, in-root or allowlisted-link policy. |
| `workspace.capability.admit` | Bind list, read, write and artifact access to a named policy revision. |
| `workspace.artifact.name` | Convert bounded labels into opaque artifact identifiers. |
| `workspace.artifact.commit` | Report the complete state of paired JSON/SVG evidence. |
| `workspace.write.atomic` | Stage and replace only within one admitted parent. |
| `workspace.operation.result` | Publish one typed terminal result and root generation. |
| `workspace.observe` | Record bounded redacted evidence without exposing arbitrary host paths. |

## Required transaction

```txt
WorkspaceOperationCommand
  -> validate editor session and environment
  -> validate expected root and policy generations
  -> canonicalize repository or artifact root
  -> normalize relative path or capture label
  -> reject absolute, malformed and parent-escaping requests
  -> calculate lexical candidate under root
  -> prove path.relative containment
  -> inspect link state
  -> canonicalize target or nearest existing parent
  -> prove canonical containment again
  -> execute admitted list/read or atomic write
  -> publish WorkspaceOperationResult
```

## Invariants

```txt
string prefix is never containment proof
public requests are relative
absolute and parent-escaping forms are rejected
existing targets are checked after canonicalization
new targets are admitted through a canonical existing parent
symlink behavior is authored
capture labels cannot become path segments
write staging and replacement stay in one admitted parent
stale roots and policies perform zero mutation
cross-root access requires a separately named allowlisted capability
```

## Promotion boundary

Promote generic primitives only after Windows and POSIX fixtures pass, multiple environment adapters use the same command/result contract, symlink behavior is provider-neutral, atomic-write semantics are stable and path redaction is explicit.
