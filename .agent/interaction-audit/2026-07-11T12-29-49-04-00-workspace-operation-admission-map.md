# Interaction Audit: Workspace Operation Admission

**Timestamp:** `2026-07-11T12-29-49-04-00`

## Summary

The headless editor exposes `workspace.list`, `workspace.read` and `workspace.write` as callable capabilities, but path validation is performed inside each callback through one lexical helper rather than through a typed operation-admission authority.

## Plan ledger

**Goal:** make every filesystem interaction produce an explicit accepted or rejected result before any I/O occurs.

- [x] Identify the three workspace capabilities.
- [x] Trace caller-controlled path flow.
- [x] Identify missing command, session and path-result fields.
- [x] Define operation admission and terminal results.
- [ ] Implement after the host capability gateway.

## Current map

```txt
editor client
  -> capability ID
  -> arguments.path
  -> callback
  -> safePath(root, path)
  -> readdir / readFile / mkdir + writeFile
  -> generic environment success or exception
```

## Missing admission data

```txt
operation ID
session ID
workspace root identity
expected root revision
normalized relative path
path policy result
symlink policy result
operation policy result
resource budget
terminal filesystem result
bounded journal row
```

## Required map

```txt
workspace command
  -> host capability admission
  -> workspace operation admission
  -> canonical path resolution
  -> containment and symlink proof
  -> operation-specific policy
  -> I/O execution
  -> typed result
  -> observation and journal
```

## Required reasons

```txt
ok
invalid-path
absolute-path-forbidden
parent-escape
sibling-prefix-escape
symlink-escape
unknown-root
stale-root-revision
operation-denied
read-budget-exceeded
write-budget-exceeded
io-failed
```

## Interaction invariant

No capability may report `ok` or `completed` merely because its callback returned. The filesystem domain result must remain distinct from transport execution success.