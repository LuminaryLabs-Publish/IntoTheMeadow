# Deploy Audit: Interaction and Progression Fixture Gate

**Timestamp:** `2026-07-12T02-38-23-04-00`

## Current gate

`npm run check` validates files, DSK structure, render plans, renderer behavior, deterministic read stability and headless editor mechanics. It does not execute the authored path or tree progression.

## Missing DOM-free fixtures

```txt
interaction-command-schema
movement-finite-bounds
path-progress-sampling
path-threshold-transitions
inspect-target-admission
objective-story-atomicity
duplicate-command-idempotence
stale-session-scene-epoch
progression-reset-epoch
browser-editor-headless-parity
progression-state-render-frame-correlation
```

## Missing browser smoke

```txt
boot production external provider
issue real browser movement input
observe path-discovery and walk-the-path
reach and inspect focal-tree
observe objective and story feedback
capture first frames for both transitions
reset and confirm canonical initial progression
verify no console or capability errors
```

## Future commands

```bash
npm run fixture:interaction-command
npm run fixture:path-progress
npm run fixture:inspect-objective
npm run fixture:progression-atomicity
npm run fixture:progression-reset
npm run fixture:progression-adapter-parity
npm run smoke:progression-visible-frame
npm run smoke:progression-pages
npm run check
```

## Release rule

Do not treat the page as a playable objective slice until the production browser can complete both authored objectives, the same scenario passes through editor/headless adapters, and captured frames cite the accepted progression revisions.
