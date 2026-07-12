# Interaction and Objective Fixture Gate

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T09-08-17-04-00`

## Summary

The existing checks prove file presence, descriptor structure, render plans, static renderer behavior and editor plumbing. They do not execute movement, path progress, inspection, objective completion, story triggers or visible progression feedback.

## Plan ledger

**Goal:** prevent progression readiness claims until deterministic Node and real-browser evidence exists.

- [x] Inventory current package checks.
- [x] Identify missing gameplay and browser proofs.
- [x] Define deterministic fixture and deployment matrices.
- [ ] Add fixtures after implementation exists.
- [ ] Run local and deployed browser smoke after implementation.

## Current proof

```txt
static-smoke
DSK-registry-smoke
render-plan-smoke
renderer-v2-smoke
deterministic-scene-smoke
headless-editor environment/command/loop smoke
```

These checks do not submit an interaction command or assert progression mutation.

## Required deterministic fixtures

```txt
fixture:interaction-command-schema
fixture:interaction-session-admission
fixture:target-registry-fingerprint
fixture:path-progress-evidence
fixture:inspect-proximity-evidence
fixture:path-story-threshold
fixture:path-objective-threshold
fixture:objective-successor-selection
fixture:objective-completion-idempotence
fixture:story-trigger-deduplication
fixture:atomic-progression-commit
fixture:progression-rollback
fixture:stale-target-revision
fixture:stale-progression-revision
fixture:reset-generation-rejection
fixture:browser-editor-command-parity
fixture:progression-snapshot-readback
fixture:visible-progression-frame-correlation
```

## Required browser matrix

```txt
input source:
  keyboard/controller adapter
  pointer/touch inspect adapter
  editor capability

viewport:
  desktop
  tablet
  narrow mobile

state:
  fresh session
  partial path progress
  objective threshold crossing
  inspect outside range
  inspect inside range
  duplicate command
  reset and stale predecessor command

visibility:
  visible
  hidden then restored
```

## Required browser smoke

```txt
open fresh session
verify walk-the-path is visibly active
submit admitted path progress below 0.25
verify no path-discovery beat
cross 0.25 and verify one story result and visible frame receipt
cross 0.35 and verify walk-the-path completion plus successor activation
attempt focal-tree inspect outside range and verify typed rejection
submit admitted focal-tree inspect and verify objective/story commit
repeat command and verify no duplicate mutation
reset and verify baseline frame
repeat against deployed GitHub Pages
```

## Required diagnostics

```txt
runtime session and reset generation
progression revision
interaction command/result
canonical target and target revision
evidence identity and digest
active/completed objective state
story revision and committed beats
feedback revision
first visible progression-frame ID
bounded journal state
```

## Failure policy

```txt
fixture failure -> no progression-ready claim
browser mismatch -> no browser parity claim
Pages mismatch -> no deployment-ready claim
missing first-frame receipt -> no visible correctness claim
partial commit -> preserve predecessor and report rollback failure
```

## Execution status

```txt
runtime source changed: no
package scripts changed: no
npm run check executed: no
progression fixtures available: no
browser progression smoke available: no
Pages progression smoke available: no
branch created: no
pull request created: no
```

## Claim boundary

No interaction, objective, story, browser parity or deployment correctness claim is made by this documentation pass.