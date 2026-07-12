# Deploy Audit: Playable Loop Central Sync Gate

**Generated:** `2026-07-12T17-58-43-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

Current checks can validate static files, descriptors, deterministic visuals and WebGL behavior. They cannot prove that source, built output or GitHub Pages accepts gameplay input, moves the player, admits focal-tree inspection, advances objectives/story or presents the committed result.

## Plan ledger

**Goal:** block playable-readiness claims until source, build and Pages produce the same deterministic command, progression and visible-frame evidence.

- [x] Reconcile pure, browser and Pages fixture requirements.
- [x] Preserve the existing deployment workflow.
- [x] Define parity evidence.
- [ ] Implement and execute the fixture matrix.

## Pure fixtures

```txt
input normalization determinism
movement and terrain contact
path projection determinism
0.25 and 0.35 threshold crossings
high-delta threshold crossing
inspect target identity and range
objective/story exactly-once behavior
atomic progression failure
stale-command zero mutation
save-revision binding
```

## Browser and Pages fixtures

```txt
keyboard movement over authored path
editor-issued movement command
path-discovery feedback
walk-the-path completion
focal-tree out-of-range rejection
focal-tree admitted inspection
inspect objective/story completion
duplicate action suppression
reset/new session generation
first visible gameplay-frame acknowledgement
```

## Parity gate

```txt
provider/capability fingerprint: source == dist == Pages
command/result sequence: source == dist == Pages
gameplay/objective/story revisions: source == dist == Pages
visible frame acknowledgement: source == dist == Pages
save payload gameplay revision: source == dist == Pages
```

## Current status

No playable-loop fixture was implemented or run. Runtime, package, dependency and deployment files were unchanged.