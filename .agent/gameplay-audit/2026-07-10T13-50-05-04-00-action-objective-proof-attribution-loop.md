# Gameplay audit: action objective proof attribution loop

Timestamp: 2026-07-10T13-50-05-04-00

## Interaction loop

The player route is a meadow observation/action loop:

1. User opens the browser route.
2. Web host creates game state and render plan.
3. Runtime ticks frame/time.
4. Targets, objectives, and story descriptors describe possible interactions.
5. Renderer projects meadow state.
6. GameHost/editor surfaces expose diagnostics.

## Current gameplay ownership

`createIntoTheMeadowGame()` owns state creation, render-plan access, diagnostics, snapshots, and ticks. `advanceGameState()` currently provides minimal frame/time advancement rather than a row-level gameplay result ledger.

## Gap

Gameplay needs proof rows for:

- action offered;
- action accepted/rejected;
- target preflight result;
- objective progress/completion;
- story observation surfaced;
- unsupported or skipped interaction;
- frame/source fingerprint attached to the result.

## Risk

Without gameplay proof rows, editor and renderer checks can prove reachability while missing whether player-facing action/objective semantics stayed intact.

## Next ledge

Add a DOM-free action/objective fixture that runs target preflight and objective progression against source descriptors, then asserts JSON-safe result rows through GameHost.
