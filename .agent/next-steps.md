# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T19-01-08-04-00`

## Goal

Preserve the current meadow and renderer while making every startup or frame failure enter a typed lifecycle state with reverse cleanup, last-known-good frame retention, public capability quarantine, deterministic disposal and a cold replacement-session recovery path.

## Plan ledger

- [ ] Preserve the current source plan, visual composition and descriptor contract.
- [ ] Complete Runtime Session Lifecycle Authority first.
- [ ] Complete Host Capability Gateway and remove raw `GameHost.game` mutation authority.
- [ ] Complete runtime-step admission and monotonic clock ownership.
- [ ] Complete source-provider admission and startup result identity.
- [ ] Complete render-topology and committed-frame transaction ownership.
- [ ] Integrate WebGL context recovery as the recoverable GPU-specific path.
- [ ] Add startup candidate identity and phase tracking.
- [ ] Register reverse cleanup immediately after every acquired provider, game, renderer, enhancer, global and listener lease.
- [ ] Delay `GameHost` and `NexusEditorEnvironment` publication until startup commit.
- [ ] Add typed startup failure and cleanup results.
- [ ] Stage state, plan and render work before public frame commit.
- [ ] Preserve the previous committed frame when candidate work fails.
- [ ] Enter a quarantined fatal state after frame failure.
- [ ] Fence tick, reset, rebuild and capture capabilities during failure.
- [ ] Classify whether rollback, WebGL recovery or terminal graph retirement is permitted.
- [ ] Reject in-place `start()` after terminal failure.
- [ ] Add cold restart with new runtime, session, renderer, context/resource and frame generations.
- [ ] Require a first committed replacement-session frame before readiness returns.
- [ ] Make cleanup and disposal idempotent and observable.
- [ ] Add startup, mid-frame, cleanup-failure, quarantine and repeated-restart fixtures.
- [ ] Wire fixtures into `npm run check` or an explicit browser gate.

## Existing owners to update first

```txt
web-host-dsk
into-the-meadow-game-dsk
runtime session lifecycle authority
Host Capability Gateway and Raw Runtime Quarantine
Source Provider Authority
Render Topology Identity Authority
WebGL Context Recovery Authority
Committed Frame Observation Authority
meadow-webgl-renderer-v2-kit
meadow-diagnostics-dsk
browser editor bridge
browser boot projection
browser and deployment fixtures
```

## Candidate coordinating kits

```txt
1. runtime-failure-id-kit
2. runtime-failure-state-kit
3. startup-acquisition-ledger-kit
4. reverse-cleanup-stack-kit
5. failure-classification-kit
6. fatal-event-admission-kit
7. frame-failure-result-kit
8. last-known-good-frame-kit
9. failure-quarantine-kit
10. failure-capability-fence-kit
11. failure-capture-fence-kit
12. rollback-or-retire-plan-kit
13. cleanup-result-kit
14. failure-observation-kit
15. restart-admission-kit
16. cold-restart-transaction-kit
17. terminal-disposal-kit
18. fatal-recovery-journal-kit
19. fatal-recovery-fixture-kit
```

## Required failure state

```txt
RuntimeFailureState
  runtimeSessionId
  rendererInstanceId
  failureId
  failureSequence
  phase
  classification
  source
  frameRequestId
  lastCommittedFrameId
  candidateStateRevision
  candidatePlanRevision
  resourceImpact
  capabilitiesQuarantined
  cleanupStatus
  recoveryPolicy
  terminal
  lastResult
```

## Required startup result

```txt
StartupResult
  startupAttemptId
  candidateSessionId
  phaseReached
  acquiredLeaseIds
  publishedGlobalIds
  status
  failure
  cleanupResult
  committedSessionId
  firstCommittedFrameId
```

## Required frame failure result

```txt
FrameFailureResult
  failureId
  sessionId
  frameRequestId
  previousCommittedFrameId
  candidateStateFrame
  candidatePlanId
  rendererPhase
  resourceImpact
  rollbackStatus
  quarantineStatus
  recoveryPolicy
```

## Required cold restart result

```txt
ColdRestartResult
  predecessorSessionId
  predecessorFailureId
  cleanupResult
  replacementSessionId
  replacementRendererInstanceId
  replacementContextGeneration
  replacementResourceGeneration
  replacementCommittedFrameId
  status
```

## Acceptance cases

```txt
external-provider import failure before game construction
game construction failure
renderer construction failure
editor installation failure
failure immediately after game.tick
render-plan validation failure
mesh construction failure
buffer replacement failure
first draw failure
second draw failure
HUD projection failure
cleanup callback failure
fatal state tick/reset/rebuild/capture rejection
recoverable WebGL context loss routing
terminal failure cold restart
three repeated failure/restart cycles
stop/dispose during failure recovery
```

## Rejection cases

```txt
stale failure event
failure from retired session
in-place restart after terminal failure
public capability invocation while quarantined
capture without a current committed frame
readiness before cleanup completes
readiness before replacement first frame commits
late callback from predecessor session
partial startup global publication
```

Every rejected or failed transition must assert:

```txt
no false ready state
no new public frame commit
no unowned global or listener lease
one typed result
one bounded journal row
```

## Ordered architecture queue

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Step Admission and Clock Integrity
5. Source Provider Authority
6. Render Topology Identity Authority
6a. WebGL Context Recovery Authority
7. Committed Frame Observation Authority
7a. Fatal Runtime Failure Recovery Authority
8. Interaction Command and Objective Authority
9. DSK Runtime Consumption Authority
```

## Deferred until after this gate

```txt
renderer hot replacement
multi-canvas host recovery
new post-process passes
new visual feature families
shared engine promotion
```

Do not treat visible error text, `stopped = true`, a retained pre-failure snapshot or an in-place RAF restart as recovery proof.