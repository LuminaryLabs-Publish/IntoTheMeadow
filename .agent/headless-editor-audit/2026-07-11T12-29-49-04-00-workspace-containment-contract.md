# Headless Editor Audit: Workspace Containment Contract

**Timestamp:** `2026-07-11T12-29-49-04-00`

## Summary

The Node editor's current `safePath()` function prevents obvious absolute and `..` escapes only when the resolved target no longer shares the root's raw string prefix. That is not sufficient for sibling-prefix paths, case rules on some platforms, separator boundaries or symlink targets.

## Plan ledger

**Goal:** define the exact containment behavior required before workspace and artifact capabilities are treated as safe.

- [x] Identify lexical containment behavior.
- [x] Identify sibling-prefix escape.
- [x] Identify symlink escape.
- [x] Identify write-specific nearest-ancestor requirement.
- [x] Define cross-platform fixtures.
- [ ] Implement reusable policy in NexusEngine.
- [ ] Compose local allowed-root policy in IntoTheMeadow.

## Required lexical containment rule

Use a segment-aware relative-path test, not string prefix membership.

```txt
relative = path.relative(root, target)
accept only when:
  relative == ""
  or relative is non-absolute
     and relative != ".."
     and does not begin with ".." + path separator
```

Platform path normalization and case behavior must be explicit rather than inferred from one development machine.

## Required real-filesystem rule

For existing targets:

```txt
realRoot = realpath(root)
realTarget = realpath(target)
verify realTarget is a descendant of realRoot
```

For writes to new targets:

```txt
find nearest existing ancestor
realpath ancestor
verify ancestor remains inside realRoot
then create descendants without following an unverified symlink
```

## Required operation policy

```txt
list: directories only, bounded entries, no implicit recursion
read: files only, bounded bytes, explicit text/binary policy
write: explicit allowed roots, bounded bytes, no overwrite unless requested
artifact-write: artifact root only, relative public result paths
```

## Required fixtures

```txt
.
subdir/file.txt
../outside.txt
../IntoTheMeadow-escape/out.txt
absolute outside path
inside symlink -> outside directory
inside symlink -> outside file
write under symlinked parent
mixed separators where supported
case-variant roots on case-insensitive systems
large read and write budget rejection
no filesystem mutation after rejection
```

## Ownership rule

The reusable resolver, containment classifier and symlink checks belong in NexusEngine's core headless editor. IntoTheMeadow owns the root IDs, allowed operations, budgets and artifact policy.