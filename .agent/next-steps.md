# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T12-29-49-04-00`

## Goal

After runtime lifecycle and the host capability gateway are established, replace lexical workspace checks with one segment-aware, symlink-aware and session-owned filesystem authority shared by workspace and capture-artifact operations.

## Plan ledger

- [ ] Preserve the current meadow composition and visible output.
- [ ] Complete Runtime Session Lifecycle Authority first.
- [ ] Complete Host Capability Gateway and remove raw public authority.
- [ ] Assign editor session, host lease and workspace-root identities.
- [ ] Move reusable containment logic into NexusEngine `core-headless-editor-kit`.
- [ ] Define game-specific allowed roots and artifact policy locally.
- [ ] Replace `target.startsWith(root)` with segment-aware containment.
- [ ] Add realpath and symlink containment for existing targets.
- [ ] Verify the nearest existing ancestor before creating new write targets.
- [ ] Add operation-specific list, read, write and artifact budgets.
- [ ] Define immutable workspace operation commands.
- [ ] Return typed accepted, rejected, stale and failed results.
- [ ] Keep absolute host paths out of public results and journals.
- [ ] Use one admission path for workspace and artifact writes.
- [ ] Add bounded filesystem operation journals.
- [ ] Add atomic or explicitly partial JSON/SVG capture results.
- [ ] Add sibling-prefix, symlink and rejected-write no-mutation fixtures.
- [ ] Add POSIX and Windows path-semantics fixtures where supported.
- [ ] Wire the fixture into `npm run check`.
- [ ] Run `npm run check`.
- [ ] Run Node editor and browser smoke tests.

## Required implementation order

```txt
1. workspace-root-identity-kit
2. workspace-path-request-kit
3. workspace-containment-policy-kit
4. workspace-symlink-policy-kit
5. workspace-operation-admission-kit
6. workspace-operation-result-kit
7. workspace-artifact-path-kit
8. workspace-path-journal-kit
9. headless-workspace-adapter-kit
10. workspace-path-fixture-kit
```

Existing owners to update before adding local packages:

```txt
scripts/into-the-meadow-environment.mjs
into-the-meadow-game-dsk
meadow-diagnostics-dsk
NexusEngine core-headless-editor-kit
```

## Acceptance cases

```txt
workspace root
normal descendant directory
normal descendant file
new file under verified inside-root ancestor
capture JSON and SVG under admitted artifact root
bounded list
bounded read
bounded write
```

## Rejection cases

```txt
parent traversal
sibling-prefix traversal
absolute outside path
inside symlink to outside directory
inside symlink to outside file
write below outside-pointing symlink
unknown or stale root revision
operation not allowed for root
read, list or write budget exceeded
```

## Acceptance criteria

```txt
all filesystem operations enter one admission function
segment-aware containment replaces raw prefix comparison
real filesystem containment is proven
rejected operations perform no I/O
workspace and capture paths share one policy
public results expose relative paths only
operation results are typed and session-correlated
journals are bounded and redact host details
fixtures pass on supported path semantics
```

## Ordered architecture queue

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Step Admission and Clock Integrity
5. Source Provider Authority
6. Render Topology Identity Authority
7. Committed Frame Observation Authority
8. Interaction Command Authority
9. DSK Registry Consumption Proof
```

## Deferred until after this gate

```txt
expanded workspace commands
recursive project search
bulk file edits
artifact publishing outside the local root
agent-authored content pipelines
deterministic editor stepping
movement and objective commands
replay and save/load
```

Do not add more filesystem capabilities while `safePath()` relies on raw string-prefix membership.