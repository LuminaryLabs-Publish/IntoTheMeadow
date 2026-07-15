# Architecture Audit: Accessible Semantic Projection DSK Map

**Timestamp:** `2026-07-15T15:41:21-04:00`  
**Status:** `accessible-semantic-projection-authority-audited`

## Summary

The renderer, content and game-state layers already provide enough identities to derive an accessible read model, but the semantic UI chain is declaration-only. Five planned DSKs own player input, interaction, story, objectives and UI, while the active-v0.1 composition owns none of their executable services.

## Plan ledger

**Goal:** define the smallest domain boundary that projects accepted meadow state into structured, operable and revision-bound browser semantics without moving gameplay truth into the DOM.

- [x] Map current content, state, host, render and document owners.
- [x] Map planned input, interaction, story, objective and UI DSK services.
- [x] Keep WebGL as visual projection only.
- [x] Keep semantic DOM as an immutable read model plus admitted commands.
- [x] Define revision, focus, announcement and frame receipts.
- [ ] Implement later.

## Current ownership

```txt
content
  -> story beat text
  -> objective labels
  -> interaction target labels

game state
  -> scene/session/player/progression identity
  -> frame and lastTick

web host
  -> RAF
  -> render-plan enhancement
  -> WebGL frame
  -> debug-only HUD text

document
  -> main aria-label
  -> canvas role=img with static aria-label
  -> hidden debug HUD
  -> loading text
```

## Planned but inactive domain chain

```txt
meadow-input-dsk
  -> action-map
  -> device-bindings
  -> input-context
  -> input-normalization
  -> input-validation

meadow-interaction-dsk
  -> interactable-registry
  -> affordance-rules
  -> inspect-state
  -> interaction-events
  -> interaction-validation

meadow-story-dsk
  -> story-state
  -> story-beats
  -> dialogue-text
  -> sequence-runner
  -> story-validation

meadow-objective-dsk
  -> objective-model
  -> objective-flow
  -> completion-ledger
  -> feedback-surface
  -> objective-validation

meadow-ui-dsk
  -> minimal-hud
  -> story-text-panel
  -> debug-ui
  -> ui-state
  -> ui-validation
```

## Required authority

`meadow-accessible-semantic-projection-authority-domain`

```txt
AccessibilityProjectionCommand
  -> bind HostGeneration
  -> bind SessionRevision
  -> bind StateRevision
  -> bind VisibleFrameRevision
  -> derive AccessibleReadModel
  -> stage structured DOM projection
  -> stage keyboard command descriptions
  -> stage focus order and restoration
  -> stage deduplicated announcements
  -> stage canvas alternative description
  -> apply user accessibility policy
  -> atomically publish AccessibilityProjectionResult
  -> acknowledge FirstAccessibleFrameAck
  -> acknowledge FirstVisualAccessibleConvergenceAck
```

## Domain rule

Gameplay remains authoritative for state and accepted actions. The accessibility domain owns semantic projection, command discoverability, focus and announcements. The renderer owns pixels only. The DOM must never infer gameplay truth from pixels or mutate gameplay state directly.

## Planned surfaces

```txt
meadow-accessible-semantic-projection-authority-domain
accessibility-capability-observation-kit
semantic-ui-event-kit
accessible-read-model-kit
story-announcement-projection-kit
objective-status-projection-kit
interaction-affordance-projection-kit
keyboard-command-surface-kit
focus-order-ownership-kit
focus-restoration-kit
live-region-announcement-kit
canvas-alternative-description-kit
reduced-motion-policy-kit
contrast-preference-kit
text-scaling-layout-kit
accessible-state-revision-kit
accessibility-projection-result-kit
first-accessible-frame-ack-kit
browser-accessibility-fixture-kit
source-build-pages-accessibility-parity-kit
```

## Failure handling

A failed semantic projection preserves the last accepted read model, reports a typed failure, prevents stale focus changes and never blocks the authoritative game or renderer. A visible frame without the matching accessible revision remains unacknowledged.