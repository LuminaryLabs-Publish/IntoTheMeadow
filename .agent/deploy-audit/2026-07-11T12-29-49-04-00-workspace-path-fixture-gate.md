# Deploy Audit: Workspace Path Fixture Gate

**Timestamp:** `2026-07-11T12-29-49-04-00`

## Summary

The existing `npm run check` suite confirms editor capabilities and render metrics, but the inspected editor tests do not exercise workspace escape paths, symlink traversal, rejected-write no-mutation behavior or artifact-root containment.

## Plan ledger

**Goal:** block future claims of headless-editor workspace safety until containment fixtures run in CI.

- [x] Review current package check sequence.
- [x] Review headless editor environment and command smokes.
- [x] Identify missing containment coverage.
- [x] Define fixture and CI gate.
- [ ] Implement test file and wire it into `npm run check` later.

## Required fixture

```txt
tests/headless-editor-workspace-path-smoke.mjs
```

The fixture should create an isolated temporary root plus:

```txt
normal child file
sibling directory sharing the root prefix
outside directory
inside symlink targeting outside
new write target under an outside-pointing symlink
artifact root and capture outputs
```

## Required assertions

```txt
normal list/read/write accepted
root path accepted
parent traversal rejected
sibling-prefix traversal rejected
absolute outside path rejected
symlink read/list/write rejected
rejected write creates no file or directory
artifact capture cannot escape configured root
public result paths are relative
errors are typed and do not expose raw host paths
```

## CI order

```txt
static smoke
DSK registry smoke
render-plan smoke
renderer smoke
deterministic scene smoke
headless editor environment smoke
headless editor command smoke
headless editor workspace path smoke
headless editor loop smoke
```

## Validation status

```txt
fixture exists: no
fixture run: no
runtime source changed: no
package script changed: no
CI claim: unavailable
```

GitHub Pages runtime exposure is not the direct risk. The risk is the Node automation environment used during local and CI workflows.