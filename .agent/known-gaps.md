# Known Gaps

**Updated:** `2026-07-13T05-40-11-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `browser-editor-capability-admission-authority-central-reconciled`

## Summary

The current bounded gap is browser editor capability admission. The editor bridge exposes direct tick/reset mutation beside the live RAF loop and remains mutation-capable after host stop. The immediately preceding host-lifecycle retirement audit remains unresolved and is a direct prerequisite.

## Plan ledger

**Goal:** record missing identities, admission decisions, lifecycle ownership, render correlation, bounded observations, and proof without collapsing them into gameplay or renderer implementation.

- [x] Record raw mutation reachability.
- [x] Record independent RAF and editor mutation paths.
- [x] Record state/render/canvas correlation gaps.
- [x] Record stop/fatal and bridge-replacement lifecycle gaps.
- [x] Record unbounded error observation.
- [x] Preserve all earlier audits.
- [ ] Implement and prove the authority later.

## Command and identity gaps

```txt
editor environment ID: absent
environment generation: absent
capability registry revision: absent
capability policy revision: absent
command ID: absent
duplicate command policy: absent
observation/mutation classification: implicit only
argument schema and bounds: absent
expected state revision: absent
expected render revision: absent
```

## Scheduler and mutation gaps

```txt
scheduler generation: absent
exclusive editor mutation lease: absent
simulation-boundary admission: absent
busy result: absent
stale command rejection: absent
retired environment rejection: absent
tick transition receipt: absent
reset participant receipts: absent
zero-mutation non-accepted result proof: absent
```

## Render and capture gaps

```txt
state-to-render-plan revision binding: absent
render submission revision: absent
canvas frame revision: absent
mutation render-refresh requirement: absent
first matching visible-frame acknowledgement: absent
capture readiness result: absent
predecessor-versus-successor capture identity: absent
```

## Lifecycle gaps

```txt
host session and generation: absent
pause versus terminal retirement: ambiguous
RAF request identity and cancellation ownership: absent
editor mutation policy while stopped: absent
host-composed bridge disposal: absent
predecessor bridge retirement on replacement: absent
GameHost and editor global revocation: absent
listener retirement receipts: absent
fatal cleanup transaction: absent
```

## Error and observation gaps

```txt
maximum error entry count: absent
maximum retained bytes: absent
environment generation on errors: absent
acknowledgement cursor: absent
overflow result: absent
field redaction and length limits: absent
retention policy across lifecycle transitions: absent
```

## Proof gaps

```txt
observation zero-mutation fixture
tick under RAF concurrency fixture
reset and first matching frame fixture
duplicate command fixture
stale expected revision fixture
busy scheduler fixture
stop/fatal mutation rejection fixture
bridge replacement/listener retirement fixture
capture predecessor/successor correlation fixture
bounded error overflow fixture
source/build/Pages capability parity
```

## Preserved unresolved gaps

```txt
web-host lifecycle retirement
workspace root containment and atomic artifacts
provider-source admission and browser/headless parity
WebGL context/resource recovery
single-chain frame scheduling
executable DSK provider consumption
playable input, movement, interaction, story, and objectives
camera-bound grass visibility and LOD
audio user-gesture lifecycle
atomic save and migration
independent replay
```

## Completion boundary

A generic `{ ok, status, action, data }` wrapper is not mutation admission or visible-frame proof. Completion requires generation-bound commands, scheduler ownership, typed terminal results, lifecycle retirement, bounded observations, and executable browser/build/Pages fixtures.
