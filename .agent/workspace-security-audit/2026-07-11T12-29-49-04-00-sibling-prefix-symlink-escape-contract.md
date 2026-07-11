# Workspace Security Audit: Sibling-Prefix and Symlink Escape

**Timestamp:** `2026-07-11T12-29-49-04-00`

## Summary

The current headless workspace check is vulnerable to path names that share the root's character prefix without being descendants. It also cannot detect symlinks that redirect an admitted lexical path outside the workspace.

## Plan ledger

**Goal:** preserve project-root and artifact-root confinement for every list, read and write operation.

- [x] Prove the sibling-prefix failure shape.
- [x] Trace affected read, list, write and artifact services.
- [x] Identify symlink and write-ancestor risks.
- [x] Define rejection and no-mutation invariants.
- [ ] Add executable temporary-filesystem fixtures later.

## Sibling-prefix case

```txt
root   = /workspace/IntoTheMeadow
target = /workspace/IntoTheMeadow-escape/out.txt

target.startsWith(root) == true
path descendant relationship == false
```

## Symlink case

```txt
/workspace/IntoTheMeadow/link -> /private/outside
requested path: link/secret.txt
lexical target: /workspace/IntoTheMeadow/link/secret.txt
real target:    /private/outside/secret.txt
```

The lexical path passes the current check.

## Affected operations

```txt
workspace.list can enumerate outside content
workspace.read can return outside content
workspace.write can create or overwrite outside content
renderer.capture can publish artifacts outside its admitted root
```

## Required invariants

```txt
rejected operations perform no I/O
public results never disclose absolute host paths
root and artifact policies are immutable during one editor session
root revisions fence stale commands
all paths are classified before operation execution
write validation includes nearest existing ancestor
symlink policy is explicit and tested
operation journals are bounded and redact sensitive host details
```

## Severity

This is an editor filesystem authority issue, not a browser-game rendering defect. It matters because the headless editor is intended for automated agents and exposes caller-controlled workspace paths.