# Canonical Root and Operation Result Central Reconciliation Contract

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-13T02-39-44-04-00`

## Summary

The current helper offers lexical normalization plus a string-prefix check. A correct workspace boundary needs three distinct decisions: path-segment containment, canonical filesystem containment and capability policy.

## Plan ledger

**Goal:** define exact root, path, symlink, write and result invariants for the Node headless environment.

- [x] Define root identity and canonicalization.
- [x] Define relative-path admission.
- [x] Define existing and new-target handling.
- [x] Define symlink policy.
- [x] Define capture-label policy.
- [x] Define atomic and paired writes.
- [x] Define typed results and fixtures.
- [ ] Implement later.

## Root contract

```txt
WorkspaceRoot {
  rootId
  generation
  configuredPath
  canonicalPath
  deviceIdentity?
  policyRevision
  artifactRootId
  artifactCanonicalPath
}
```

Configured paths are inputs. Canonical paths are authority. Root identity remains stable for the environment session and changes only through an explicit transition.

## Relative containment

```txt
relative = path.relative(canonicalRoot, candidate)
contained = relative === "" ||
  (!relative.startsWith(`..${sep}`) &&
   relative !== ".." &&
   !path.isAbsolute(relative))
```

The implementation must account for platform case rules, separators, drive letters, UNC paths and Unicode normalization. Prefix matching is prohibited.

## Existing target rule

```txt
candidate exists
  -> lstat relevant segments
  -> apply symlink policy
  -> realpath candidate
  -> verify canonical target remains under canonical root
  -> execute admitted operation
```

## New target rule

```txt
candidate does not exist
  -> find nearest existing parent
  -> realpath parent
  -> verify canonical parent remains under canonical root
  -> reject disallowed link segments
  -> create descendants only under admitted parent
  -> revalidate before final replacement
```

## Authored link modes

```txt
deny-all
allow-links-resolving-inside-root
allowlisted-links
```

Agent write capabilities should default to `deny-all` or `allow-links-resolving-inside-root`. Unrestricted following is not compatible with a repository-root sandbox.

## Capture label contract

```txt
raw label
  -> Unicode normalization
  -> bounded length
  -> allowlisted display characters
  -> opaque CaptureId allocation
  -> filenames derived only from CaptureId
```

Slashes, backslashes, dot segments, drive prefixes and control characters cannot influence artifact placement.

## Atomic write contract

```txt
admit canonical parent
  -> create unique temporary file in same parent
  -> write complete content
  -> optionally flush according to policy
  -> verify byte count and hash
  -> replace destination atomically where supported
  -> clean temporary file on failure
  -> publish one terminal result
```

Paired JSON/SVG captures need a group result. When true multi-file atomicity is unavailable, the result identifies committed, rolled-back and orphaned members.

## Result contract

```txt
WorkspaceOperationResult {
  commandId
  editorSessionId
  environmentId
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
  contentHash?
  artifactId?
  observationId
}
```

## Observation and redaction

Retain command ID, root generation, capability, stable relative path or hash, policy decision, link disposition, bytes, hash and terminal status. Do not expose arbitrary host absolute paths or file contents by default.

## Required fixtures

```txt
in-root file and directory
root itself
parent traversal
absolute POSIX path
absolute Windows path
sibling-prefix collision
external symlink
in-root symlink
new file below symlinked parent
root replacement during queued command
capture label with separators
capture label with dot segments
capture label Unicode collision
partial paired capture write
write destination conflict
```

## Completion boundary

A `path.relative` comparison alone is not complete. Canonical existing-parent verification, authored link policy, stale-root rejection, atomic writes and cross-platform fixtures are all required.
