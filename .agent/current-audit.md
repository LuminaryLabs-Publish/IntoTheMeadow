# Current Audit: Post-Process Descriptor Execution Authority

**Updated:** `2026-07-14T20-40-50-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `post-process-descriptor-execution-authority-audited`  
**Immediate predecessor:** `browser-startup-readiness-first-frame-authority-central-reconciled`

## Summary

The renderer contract carries an enabled six-pass post-process graph, but the active WebGL renderer never reads `effects.postProcess`. It renders directly to the default framebuffer with one geometry-outline draw and one inline cel/fog draw.

No authority identifies whether each declared pass was executed, substituted, skipped, or rejected. No render-target generation, admitted fallback profile, pass receipt, composite result, or matching visible-frame acknowledgement exists.

## Plan ledger

**Goal:** reconcile declared presentation intent with exact renderer work and visible output.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only IntoTheMeadow by the oldest synchronized timestamp.
- [x] Inspect the enhancer, post-process stack, render contract, validation, and WebGL renderer.
- [x] Preserve all 44 kit surfaces and offered services.
- [x] Add the timestamped audit family.
- [x] Change documentation only and push to `main`.
- [ ] Implement the authority and executable browser fixtures later.

## Interaction loop

```txt
source render plan
  -> enhancer creates post-process graph
  -> contract stores graph
  -> geometry validation passes
  -> renderer ignores graph
  -> inline cel/fog and geometry outline draw
  -> generic renderer snapshot publishes
```

## Main findings

```txt
declared pass graph: present
renderer capability manifest: absent
pass graph admission result: absent
offscreen render-target execution: absent
ordered pass dispatch receipts: absent
explicit inline fallback profile: absent
substitution and skip reasons: absent
PostProcessFrameResult: absent
FirstVisiblePostProcessFrameAck: absent
```

## Required parent domain

`meadow-post-process-descriptor-execution-authority-domain`

## Required transaction

```txt
PostProcessFrameCommand
  -> bind plan, renderer, viewport and policy revisions
  -> validate graph and renderer capabilities
  -> admit full, reduced, inline-fallback or rejected profile
  -> allocate versioned resources
  -> execute or explicitly substitute every pass
  -> publish pass and resource receipts
  -> publish PostProcessFrameResult
  -> acknowledge FirstVisiblePostProcessFrameAck
  -> preserve predecessor output on failure
```

## Boundary

Documentation only. No runtime, renderer, test, build, workflow, or deployment code changed.