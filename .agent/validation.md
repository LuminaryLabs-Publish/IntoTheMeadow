# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T12-29-49-04-00`

## Plan ledger

**Goal:** separate completed source inspection from executable filesystem-containment proof and define the exact gate required before calling the Node editor workspace safe.

- [x] Review the full accessible Publish inventory.
- [x] Compare every eligible repository with the central ledger.
- [x] Verify root `.agent` coverage.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `IntoTheMeadow`.
- [x] Read root instructions and current audit state.
- [x] Inspect Node editor root and artifact-root construction.
- [x] Inspect workspace list/read/write callbacks.
- [x] Inspect capture JSON/SVG paths.
- [x] Inspect positive editor tests.
- [x] Document workspace authority and fixture requirements.
- [x] Change documentation only.
- [ ] Execute fixtures after implementation exists.

## Source inspection completed

```txt
workspace helper uses resolve: yes
workspace helper uses target.startsWith(root): yes
segment-aware relative containment: no
realpath containment: no
symlink policy: no
nearest-existing-ancestor write proof: no
workspace root identity/revision: no
operation ID and typed result: no
read/list/write budgets: no
bounded filesystem journal: no
artifact pair transaction: no
```

## Existing proof

Current checks prove:

```txt
required files and host wiring exist
DSK registry shape is valid
fallback source plan can be generated
render plan can be enhanced and validated
CPU mesh metrics satisfy positive thresholds
positive editor capabilities route
positive runtime.tick test advances three frames
headless capture writes two artifacts in the normal case
```

Current checks do not prove:

```txt
parent traversal rejection
sibling-prefix traversal rejection
absolute outside path rejection
symlink traversal rejection
rejected-write no-mutation behavior
artifact-root containment
relative-path-only public results
cross-platform path semantics
filesystem journals and budgets
```

## Execution status

```txt
npm run check executed in this documentation pass: no
Node editor smoke executed: no
browser smoke executed: no
Pages smoke executed: no
runtime source changed: no
package scripts changed: no
dependencies changed: no
render output changed: no
deployment changed: no
branch created: no
pull request created: no
```

The GitHub connector was used for this documentation audit and does not execute repository commands.

## Required workspace containment fixture

Create an isolated temporary filesystem containing:

```txt
project root
normal child directory and file
sibling directory whose name begins with the root name
outside directory and file
inside-root symlink to outside directory
inside-root symlink to outside file
new write target below an outside-pointing symlink
artifact root
```

## Acceptance assertions

```txt
root accepted
normal child list accepted
normal child read accepted
normal child write accepted
normal capture artifact paths accepted
public results use relative paths
```

## Rejection assertions

```txt
../outside rejected
../IntoTheMeadow-escape rejected
outside absolute path rejected
symlink read rejected
symlink list rejected
symlink write rejected
artifact escape rejected
stale root revision rejected
```

Every rejection must assert:

```txt
no file created
no directory created
no file overwritten
no artifact row published as successful
one typed result returned
one bounded redacted journal row appended
```

## Required cross-platform classifications

```txt
POSIX separators
Windows drive roots
Windows alternate separators
case-variant paths on case-insensitive filesystems
root equality
root trailing separator
```

## Future commands

```bash
npm run fixture:workspace-path-containment
npm run fixture:workspace-symlink-containment
npm run fixture:workspace-rejected-write
npm run check
```

## Completion boundary

Do not claim that `workspace.list`, `workspace.read`, `workspace.write` or Node `renderer.capture` are confined to their configured roots until segment-aware and realpath-aware fixtures pass. Host capability and lifecycle fixtures remain separate prerequisites.