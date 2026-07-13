# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-13T02-28-51-04-00`

## Summary

The leading editor-safety gap is filesystem containment. The Node headless environment exposes list, read and write capabilities and persists capture artifacts, but path admission is based on a lexical string prefix. Current proof cannot establish that every effect remains under the configured repository or artifact root.

## Plan ledger

**Goal:** close root identity, path containment, symlink, artifact-name and write-result gaps without moving filesystem policy into gameplay or renderer domains.

- [x] Record sibling-prefix reachability.
- [x] Record symlink and canonical-parent gaps.
- [x] Record workspace command reachability.
- [x] Record capture-label and paired-artifact gaps.
- [x] Record missing adversarial proof.
- [ ] Implement in dependency order.

## Root and identity gaps

```txt
workspace root ID
workspace root generation
canonical repository root
canonical artifact root
capability-policy revision
root transition result
stale-operation rejection
```

## Path admission gaps

```txt
relative-path-only request schema
absolute-path rejection
path-segment containment result
sibling-prefix rejection
existing-target realpath check
nearest existing parent check for new targets
post-canonicalization containment check
platform case and separator policy
Unicode normalization policy
```

## Symlink gaps

```txt
lstat segment inspection
external symlink rejection
in-root symlink policy
junction/reparse-point policy
new target below symlinked parent
root replacement and link-race policy
```

## Capability and result gaps

```txt
typed workspace command and result
observation-only versus write policy
read/list/write-specific admission
expected file state or conflict policy
atomic write staging and replacement
partial failure cleanup
bounded redacted operation journal
host-path disclosure policy
```

## Artifact gaps

```txt
capture label normalization
opaque capture ID
artifact ID/path separation
artifact-root generation
paired JSON/SVG commit result
partial-pair rollback or receipt
artifact hash and byte count
provider and render-plan fingerprint lineage
```

## Proof gaps

```txt
in-root operation baseline
absolute path
parent traversal
sibling-prefix collision
external symlink
in-root symlink
new target under symlinked parent
stale root generation
hostile capture label
partial paired write
Windows drive and junction behavior
POSIX symlink behavior
built browser capability exclusion
```

## Preserved gaps

```txt
provider-source admission and browser/headless parity
WebGL context and resource recovery
single-chain frame scheduling
executable DSK provider consumption
playable input, movement and progression
camera-bound grass visibility and LOD
audio user-gesture lifecycle
atomic save and migration
independent replay
browser editor lifecycle and bounded errors
```

## Completion boundary

A normalized path string is not workspace containment proof. Completion requires canonical roots, segment containment, authored symlink policy, typed zero-mutation rejection, atomic write results and cross-platform adversarial fixtures.