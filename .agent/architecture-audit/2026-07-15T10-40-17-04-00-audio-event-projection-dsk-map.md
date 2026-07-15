# Architecture Audit: Audio Event Projection DSK Map

**Timestamp:** `2026-07-15T10:40:17-04:00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The repository already declares an audio DSK boundary, but the active runtime does not execute it. This map keeps semantic gameplay state renderer-neutral and gives browser audio one provider-owned lifecycle and admission boundary.

## Plan ledger

**Goal:** define the smallest domain family that turns accepted semantic state into an audible result without moving Web Audio ownership into gameplay, rendering or content.

- [x] Preserve existing game, host, content and render ownership.
- [x] Treat `meadow-audio-dsk` as the product-facing parent capability.
- [x] Separate semantic events from cue assets and Web Audio resources.
- [x] Separate unlock, projection, settlement and retirement.
- [x] Require typed results and audiovisual frame evidence.
- [ ] Implement after approval.

## Existing ownership

```txt
meadow-story-dsk
  -> story beats and sequence semantics

meadow-objective-dsk
  -> objective state and completion semantics

meadow-interaction-dsk
  -> interactable identity and inspect semantics

meadow-ecology-dsk
  -> ambient-life and ambience trigger semantics

web-host-dsk
  -> document, RAF, route and host lifecycle

meadow-audio-dsk
  -> declared ambient bed, spatial cues, state, events and validation
  -> currently planned, not executable
```

## Required parent

`meadow-audio-event-projection-authority-domain`

## Proposed DSK and kit map

| Surface | Ownership |
|---|---|
| `audio-capability-observation-kit` | Browser Web Audio support and policy observations. |
| `audio-unlock-admission-kit` | User-gesture lease and accepted unlock result. |
| `audio-context-generation-kit` | One owned `AudioContext` generation and state. |
| `semantic-audio-event-kit` | Stable event IDs bound to accepted game/session revisions. |
| `audio-cue-descriptor-kit` | Renderer-neutral cue identity, category, loop and spatial policy. |
| `audio-cue-deduplication-kit` | Duplicate, replay and stale-event rejection. |
| `ambience-bed-projection-kit` | Meadow wind, insects, birds and environmental loop projection. |
| `spatial-audio-source-kit` | World source pose and attenuation descriptors. |
| `audio-listener-pose-kit` | Listener transform derived from the accepted camera/player revision. |
| `audio-bus-policy-kit` | Master, ambience, UI, story and world buses. |
| `audio-preference-kit` | Mute and volume state, restore and migration. |
| `audio-voice-budget-kit` | Pooling, concurrency and priority limits. |
| `audio-cue-admission-result-kit` | Typed accepted, substituted, skipped or rejected results. |
| `audio-lifecycle-settlement-kit` | Pause, hide, resume and route transition behavior. |
| `audio-resource-retirement-kit` | Stop, disconnect and context-close receipts. |
| `audiovisual-frame-binding-kit` | State, visual frame and audible result convergence. |
| `browser-audio-fixture-kit` | Real browser unlock, cue, lifecycle and resource tests. |
| `source-build-pages-audio-parity-kit` | Source, built artifact and deployed-origin parity. |
| `first-audible-cue-ack-kit` | First audible cue and first audiovisual convergence acknowledgements. |

## Dependency direction

```txt
accepted semantic state/result
  -> semantic audio event
  -> capability and unlock admission
  -> cue descriptor resolution
  -> deduplication and voice budget
  -> ambience/UI/spatial projection
  -> browser audio resource execution
  -> lifecycle settlement and retirement
  -> audible result and audiovisual acknowledgement
```

## Required result

```txt
AudioProjectionResult {
  documentGeneration
  hostGeneration
  sessionRevision
  stateRevision
  audioPolicyRevision
  audioContextGeneration
  eventIds
  admittedCueIds
  rejectedCueIds
  listenerPoseRevision
  sourcePoseRevisions
  busRevision
  lifecycleState
  resourceReceipts
  status
  reason
}
```

## Invariants

```txt
no browser audio resource outside the audio provider
no cue without an accepted semantic event or ambience policy
no repeated cue from the same event revision
no spatial cue without listener and source revisions
no audible output while muted, hidden, paused or retired unless explicitly allowed
no route retirement without stop/disconnect receipts
no audiovisual claim without matching state and frame revisions
```

## Boundary

Gameplay and content publish semantics. The browser provider owns Web Audio calls. Rendering remains independent and consumes only the same accepted state revision.