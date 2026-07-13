# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Last aligned:** `2026-07-12T21-40-09-04-00`  
**Status:** `webgl-context-resource-recovery-authority-audited`

## Summary

IntoTheMeadow is a deterministic meadow and editor proof with one pinned external provider, 43 local DSK/kit declarations, a persistent WebGL renderer, `GameHost`, a browser editor bridge and Node headless-editor tooling.

The current audit isolates WebGL context and GPU-resource recovery. The renderer acquires one context, creates one shader program and binds GPU buffers into closure-owned state, but neither the renderer nor host observes `webglcontextlost` or `webglcontextrestored`. Draw calls publish a normal renderer snapshot without checking `gl.isContextLost()` or a typed draw result, so a lost context can produce a blank surface while readback still reports a completed frame. No context generation, recovery transaction or first-restored-frame receipt exists.

## Plan ledger

**Goal:** preserve all 44 kit surfaces while defining one renderer-context lifecycle that suspends drawing on loss, rebuilds every context-bound resource after restoration, rejects stale generations and proves the first visible recovered frame.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `IntoTheMeadow`, the oldest eligible central-ledger entry.
- [x] Inspect boot, host, precision wrapper, renderer construction, draw, snapshot and disposal paths.
- [x] Identify the complete interaction loop, domains, all kits and offered services.
- [x] Add a timestamped tracker, turn ledger and WebGL context audit family.
- [x] Refresh root `.agent` routing and machine registry.
- [x] Push documentation only to `main`; create no branch or pull request.
- [ ] Implement context recovery and execute browser/Pages fixtures later.

## Read this first

```txt
.agent/trackers/2026-07-12T21-40-09-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T21-40-09-04-00.md
.agent/architecture-audit/2026-07-12T21-40-09-04-00-webgl-context-resource-recovery-dsk-map.md
.agent/render-audit/2026-07-12T21-40-09-04-00-lost-context-visible-frame-gap.md
.agent/gameplay-audit/2026-07-12T21-40-09-04-00-context-loss-blank-meadow-loop.md
.agent/interaction-audit/2026-07-12T21-40-09-04-00-context-loss-restore-admission-map.md
.agent/webgl-context-audit/2026-07-12T21-40-09-04-00-generation-resource-rebuild-contract.md
.agent/deploy-audit/2026-07-12T21-40-09-04-00-webgl-context-recovery-fixture-gate.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

The prior frame-scheduler audit at `2026-07-12T19-49-41-04-00` remains the immediate lifecycle dependency. Scheduler stop/fatal handling must coordinate with context suspension and recovery rather than creating a second frame owner.

## Current failure loop

```txt
boot
  -> canvas.getContext(webgl2 or webgl)
  -> compile/link one program
  -> create buffers lazily from the CPU mesh
  -> start recursive RAF rendering

browser loses WebGL context
  -> no owned loss event or preventDefault policy
  -> no draw-suspension result
  -> no context/resource generation change
  -> render continues issuing calls
  -> snapshot is still published without context-state evidence
  -> visible canvas may remain blank

browser restores or replaces context
  -> no program, uniform, attribute or buffer rebuild transaction
  -> no stale GPU-handle retirement
  -> no first-restored-frame acknowledgement
```

## Kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kits: 44
required-v0.1 declarations: 15
planned declarations: 28
implemented context-recovery authorities: 0
```

The complete kit and service inventory is in the current tracker and `.agent/kit-registry.json`.

## Required parent domain

```txt
meadow-webgl-context-resource-recovery-authority-domain
```

## Required flow

```txt
webglcontextlost
  -> bind runtime session, renderer ID and context generation
  -> prevent default only under an admitted recovery policy
  -> suspend draw admission and publish ContextLostResult
  -> invalidate context-bound program/buffer leases
  -> preserve detached CPU mesh and last-good render plan

webglcontextrestored
  -> allocate a successor context/resource generation
  -> rebuild program, locations, buffers and baseline GL state
  -> validate the candidate resource manifest
  -> atomically install or remain suspended
  -> reject stale callbacks and predecessor handles
  -> resume the scheduler under one owner
  -> acknowledge the first matching visible recovered frame
```

## Validation boundary

Documentation only. Runtime, render, gameplay, package, dependency and deployment files are unchanged. No context-loss injection, restoration, repeated-loss or Pages fixture was executed.
