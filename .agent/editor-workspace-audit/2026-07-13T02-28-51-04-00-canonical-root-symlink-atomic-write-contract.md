# Canonical Root, Symlink and Atomic Write Contract

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-13T02-28-51-04-00`

## Summary

The current helper provides lexical normalization and a string-prefix check. A secure editor workspace needs three distinct decisions: segment containment, canonical filesystem containment and capability policy.

## Plan ledger

**Goal:** define exact path and write invariants for the permissive Node headless environment.

- [x] Define root identity and canonicalization.
- [x] Define relative-path admission.
- [x] Define existing and new target handling.
- [x] Define symlink policy.
- [x] Define capture-label policy.
- [x] Define atomic write behavior.
- [x] Define fixtures and claim boundaries.
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

The configured path is input. The canonical path is authority. Root identity must be retained for the complete environment session and changed only through an explicit transition.

## Relative containment

For a candidate formed from a relative request:

```txt
relative = path.relative(canonicalRoot, candidate)
contained = relative === "" || (!relative.startsWith(`..${sep}`) && relative !== ".." && !path.isAbsolute(relative))
```

The implementation must account for platform case rules, separators, drive letters, UNC paths and Unicode normalization. Prefix matching is prohibited.

## Existing target rule

```txt
candidate exists
  -> lstat candidate and each relevant segment
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
  -> reject disallowed symlink segments
  -> create only descendants of that admitted parent
  -> revalidate before final replacement
```

## Symlink policies

Supported authored modes should be explicit:

```txt
deny-all
allow-links-resolving-inside-root
allowlisted-links
```

The default for agent write capabilities should be `deny-all` or `allow-links-resolving-inside-root`. An unrestricted follow policy is not compatible with a repository-root sandbox.

## Capture label contract

A capture label is metadata, not a path.

```txt
raw label
  -> Unicode normalization
  -> bounded length
  -> allowlisted display characters
  -> opaque CaptureId allocation
  -> filesystem name derived from CaptureId
```

Slashes, backslashes, dot segments, drive prefixes and control characters must not influence artifact placement.

## Atomic write contract

```txt
admit canonical parent
  -> create unique temporary file in the same parent
  -> write complete content
  -> optionally flush according to policy
  -> verify size/hash
  -> replace destination atomically where supported
  -> clean temporary file on failure
  -> publish one terminal result
```

For paired capture artifacts, JSON and SVG require a group result. If true multi-file atomicity is unavailable, the result must identify committed, rolled-back and orphaned members rather than reporting a complete capture.

## Observation and redaction

Observations should retain:

```txt
command ID
root ID and generation
capability
normalized relative path or stable path hash
policy decision
symlink disposition
bytes and hash
terminal status
```

They should not expose arbitrary host absolute paths or file contents by default.

## Required fixtures

```txt
in-root file and directory
root itself
../ escape
absolute POSIX path
absolute Windows path
sibling-prefix collision
existing symlink to outside
existing symlink resolving inside
new file below symlinked parent
root replacement during queued command
capture label with separators
capture label with dot segments
capture label Unicode collision
partial paired capture write
write destination conflict
```

## Completion boundary

A `path.relative` check alone does not complete the contract. Canonical existing-parent verification, symlink policy, stale-root rejection, atomic-write behavior and platform fixtures are also required.