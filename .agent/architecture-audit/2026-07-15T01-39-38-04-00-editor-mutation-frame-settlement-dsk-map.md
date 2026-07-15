# Architecture Audit: Editor Mutation and Frame-Settlement DSK Map

**Timestamp:** `2026-07-15T01-39-38-04-00`

## Summary

The current architecture has separate game, RAF, render, browser editor, and Node editor owners but no parent domain that settles their revisions together. Browser capabilities call the game directly while the host remains the only owner of render-plan publication and visible WebGL frames.

## Plan ledger

**Goal:** map current ownership and define the smallest coordinating DSK boundary required for trustworthy editor mutation.

- [x] Map current state, scheduler, renderer, capture, and editor owners.
- [x] Identify cross-owner mutation and publication gaps.
- [x] Preserve existing kit responsibilities.
- [x] Define one parent authority and bounded subkits.
- [ ] Implement composition later.

## Current ownership

```txt
createIntoTheMeadowGame
  owns game state, tick, reset, render-plan source and snapshots

startWebHost
  owns recursive RAF, time input, plan enhancement,
  contract validation, renderer submission, lastPlan and lastRender

installIntoTheMeadowEditorBridge
  publishes browser capabilities and directly calls live game APIs

createEnvironment
  owns Node editor time, synchronous plan/mesh observation,
  reset invalidation, capture artifacts and comparison lineage

meadow-webgl-renderer-v2-kit
  owns GPU resources, renderer snapshots and browser canvas output
```

## Missing parent authority

`meadow-editor-mutation-visible-frame-settlement-authority-domain`

It composes without replacing current domains:

```txt
editor-command-identity-kit
editor-capability-manifest-kit
editor-surface-parity-kit
editor-mutation-command-kit
editor-mutation-admission-kit
browser-raf-lease-kit
editor-step-suspension-kit
editor-runtime-revision-kit
editor-render-attempt-kit
editor-frame-settlement-kit
editor-capture-binding-kit
editor-reset-participant-kit
editor-stale-frame-rejection-kit
editor-mutation-result-kit
editor-visible-frame-ack-kit
editor-error-receipt-kit
editor-browser-fixture-kit
editor-node-browser-parity-fixture-kit
editor-deploy-parity-kit
```

## Domain contract

```txt
prepare command
  -> identify caller, surface, host generation and expected revisions

admit mutation
  -> validate capability manifest and serialize command ownership

settle scheduler
  -> suspend, step or retain RAF according to explicit policy

settle state
  -> execute exactly one tick/reset and publish RuntimeRevision

settle presentation
  -> enhance, validate, render and publish matching revisions

settle observation
  -> bind capture/compare to acknowledged FrameRevision

complete
  -> publish EditorMutationResult and participant receipts

retire or reject
  -> preserve predecessor frame and reject stale work
```

## Ownership rules

- The editor bridge may request mutation but must not directly own game mutation.
- The RAF host may execute frames but must expose a versioned lease to command settlement.
- The renderer may publish output only against a bound render attempt and runtime revision.
- Capture may observe only an acknowledged frame or explicitly classified headless result.
- Browser and Node surfaces must publish compatible manifests or explicit substitutions.

## Boundary

This map changes no DSK implementation or runtime composition. It documents the missing coordinating boundary only.
