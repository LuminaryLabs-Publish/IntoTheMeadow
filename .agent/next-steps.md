# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-13T02-39-44-04-00`  
**Status:** `headless-workspace-path-containment-central-reconciled`

## Summary

Harden the Node headless workspace boundary before expanding remote editor transports or relying on generated capture evidence. Repo-local and central documentation now agree on the authority boundary; runtime implementation and executable proof remain open.

## Plan ledger

**Goal:** establish one canonical, cross-platform workspace-operation transaction with zero-mutation rejection and executable containment proof.

### Root identity and policy

- [ ] Add `WorkspaceRootId`, root generation and capability-policy revision.
- [ ] Canonicalize repository and artifact roots at environment startup.
- [ ] Fail startup if either root cannot be canonically admitted.
- [ ] Separate observation-only, in-root write and explicit external capabilities.
- [ ] Align `.editor/environment.json` policy with actual mutation capability.

### Path admission

- [ ] Require public workspace paths to be relative.
- [ ] Replace string-prefix checks with path-segment containment using `path.relative`.
- [ ] Reject absolute, parent-escaping, malformed and platform-ambiguous paths.
- [ ] Canonicalize existing targets before execution.
- [ ] Canonicalize the nearest existing parent for new targets.
- [ ] Re-check containment after canonicalization.
- [ ] Add explicit symlink, junction and reparse-point policies.

### Capture artifacts

- [ ] Treat capture labels as metadata, not path components.
- [ ] Normalize and bound labels.
- [ ] Allocate opaque capture IDs.
- [ ] Derive filenames only from admitted IDs.
- [ ] Bind artifacts to provider, render-plan, topology, mesh and metrics fingerprints.
- [ ] Return hashes, byte counts and root generation.
- [ ] Add a typed paired JSON/SVG commit result.

### Writes and concurrency

- [ ] Add `WorkspaceOperationCommand` and `WorkspaceOperationResult`.
- [ ] Stage writes inside the admitted destination parent.
- [ ] Replace destinations atomically where supported.
- [ ] Clean temporary files on failure.
- [ ] Reject stale root or policy generations with zero mutation.
- [ ] Define conflict and expected-file-revision policy.
- [ ] Bound and redact operation observations.

### Proof

- [ ] In-root list/read/write fixture.
- [ ] Absolute-path rejection fixture.
- [ ] Parent-traversal rejection fixture.
- [ ] Sibling-prefix collision fixture.
- [ ] External symlink rejection fixture.
- [ ] In-root symlink policy fixture.
- [ ] New-target symlinked-parent fixture.
- [ ] Stale-root generation fixture.
- [ ] Capture-label traversal fixture.
- [ ] Partial paired-artifact write fixture.
- [ ] Windows drive/junction and POSIX symlink matrix.
- [ ] Verify built browser output exposes no Node workspace mutation capabilities.

## Required result

```txt
WorkspaceOperationResult {
  commandId
  editorSessionId
  environmentId
  status
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

## Preserved dependencies

After workspace containment, retain separate work for provider-source admission/parity, DSK runtime consumption, frame lifecycle, WebGL recovery, playable exploration/progression, persistence and visible-frame provenance. Filesystem policy must not move into meadow gameplay or rendering domains.
