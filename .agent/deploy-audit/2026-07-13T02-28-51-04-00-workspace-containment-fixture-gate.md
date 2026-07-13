# Workspace Containment Fixture Gate

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-13T02-28-51-04-00`

## Summary

Current checks prove normal headless statistics, capture and loop flow. They do not prove that workspace or capture operations remain inside their configured roots under adversarial paths or filesystem links.

## Plan ledger

**Goal:** define executable gates before workspace capabilities can be treated as safely sandboxed or deployment-ready.

- [x] Review declared package checks.
- [x] Review headless environment, command and loop smokes.
- [x] Identify missing containment fixtures.
- [x] Define source and built-output gates.
- [x] Preserve documentation-only claim limits.
- [ ] Implement and run later.

## Existing checks

```txt
static-smoke.mjs
DSK registry smoke
render-plan smoke
renderer v2 smoke
deterministic scene smoke
headless environment smoke
headless command smoke
headless loop smoke
```

The headless smokes use trusted capture labels and do not exercise workspace list/read/write.

## Required fixture suite

```txt
workspace-root-identity-smoke
workspace-in-root-list-read-write-smoke
workspace-absolute-path-rejection-smoke
workspace-parent-traversal-rejection-smoke
workspace-sibling-prefix-rejection-smoke
workspace-symlink-outside-rejection-smoke
workspace-symlink-inside-policy-smoke
workspace-new-target-parent-realpath-smoke
workspace-stale-root-generation-smoke
workspace-atomic-write-failure-smoke
capture-label-normalization-smoke
capture-paired-artifact-failure-smoke
workspace-observation-redaction-smoke
```

Every fixture must use a temporary root and verify both:

```txt
expected typed result
no unexpected filesystem mutation outside the admitted root
```

## Platform matrix

```txt
Linux path separators and symlinks
macOS path and case behavior where available
Windows drive, separator and junction/reparse-point behavior
Unicode normalization and case-collision profiles
```

## Build and deployment boundary

The workspace adapter is Node tooling and is not expected in the static browser bundle. Proof must still verify:

```txt
build output does not accidentally include writable workspace capabilities
browser NexusEditorEnvironment exposes no filesystem workspace domain
source package scripts invoke the hardened adapter
built and deployed browser surfaces retain only intended observation capabilities
artifact reports cannot cite paths outside the configured evidence root
```

## CI gate

A future `npm run check` should fail if any fixture:

```txt
reads, lists or writes outside root
follows a disallowed external symlink
accepts a traversal capture label
leaves a partial artifact without a typed partial result
leaks unrestricted host absolute paths
reports success after a stale root generation
```

## Validation this run

```txt
runtime files changed: no
package scripts changed: no
workflow changed: no
fixture files added: no
commands executed: no
external path read/write attempted: no
branch created: no
pull request created: no
```

## Completion boundary

No containment, security or deployment-readiness claim is valid until the adversarial fixture matrix passes on the supported platforms and the built browser surface is confirmed not to expose Node workspace mutation capabilities.