# Render audit: stopped host with live WebGL state

**Timestamp:** `2026-07-13T05-31-58-04-00`

## Summary

The renderer has a concrete disposal method, but the browser host never invokes it when stopped or failed. The last canvas frame can remain visible while the host reports failure and while WebGL buffers/programs and editor readback remain live, with no lifecycle generation proving whether that frame belongs to an active, paused, failed, or retired host.

## Plan ledger

**Goal:** correlate visible canvas state and GPU-resource ownership with one host lifecycle generation.

- [x] Identify renderer construction and disposal.
- [x] Identify host stop and fatal behavior.
- [x] Identify visible-state and readback surfaces.
- [x] Identify missing frame/lifecycle correlation.
- [x] Define render-specific proof requirements.
- [ ] Execute browser and GPU lifecycle fixtures later.

## Current render path

```txt
RAF frame
  -> game tick
  -> render-plan enhancement and validation
  -> renderer.render(plan)
  -> WebGL viewport, uniforms, outline pass, color pass
  -> renderer snapshot
  -> optional HUD diagnostics
  -> successor RAF
```

`meadow-webgl-renderer-v2` owns attribute buffers, a linked WebGL program, topology cache, viewport resize, and render snapshots. Its `dispose()` deletes the current buffers and program.

## Visible-state gap

```txt
rendered frame N
  -> stop() or fatal error
  -> frame N remains on canvas
  -> host stops scheduling accepted work
  -> renderer resources remain allocated
  -> GameHost.getRenderSnapshot() remains callable
  -> NexusEditorEnvironment renderer capture/readback remains callable
  -> no lifecycle phase or generation marks frame N as paused, failed, or retired
```

The HUD can show a fatal error while the prior canvas remains visually intact. This is not inherently wrong, but the repository has no explicit degraded-retention policy and no evidence that retained visual state is intentional, immutable, or safe to inspect.

## Missing render lifecycle data

```txt
hostGeneration on render snapshot
lifecycleRevision on render snapshot
frame admission result
active/paused/failed/retired frame status
renderer participant generation
renderer disposal receipt
last-good-frame retention policy
canvas clear or retained-frame policy on retire
first resumed frame acknowledgement
first failed-state projection acknowledgement
first retired-state projection acknowledgement
```

## Required render transaction

```txt
RenderFrameCommand
  -> bind active host and renderer generations
  -> reject paused, stopping, failed-retired, or stale generations
  -> render and publish RenderFrameResult
  -> correlate snapshot with lifecycle revision

Pause
  -> cancel/account for RAF
  -> retain renderer and last-good frame under explicit policy
  -> mark readback as paused

Fatal
  -> freeze a bounded last-good snapshot if policy allows
  -> revoke mutating capabilities
  -> retire renderer or publish an explicit degraded-retention receipt

Retire
  -> stop frame admission
  -> call renderer.dispose() exactly once
  -> clear, retain, or replace canvas according to declared policy
  -> publish RendererRetireResult
  -> acknowledge terminal visible state
```

## Required fixtures

```txt
render then pause               -> frame retained, renderer live, paused provenance visible
pause then resume               -> one RAF chain, first resumed frame cites successor lifecycle revision
render then retire              -> buffers/program deleted once, readback reports retired
fatal during plan validation    -> no successor draw, cleanup policy recorded
fatal during renderer.render    -> bounded last-good state, cleanup policy recorded
duplicate host boot             -> predecessor renderer retired or start rejected
stale predecessor RAF           -> no draw against successor renderer generation
capture after retire            -> typed unavailable/retired result, not stale canvas authority
```

## Validation boundary

No browser, GPU, context, capture, or deployed-origin lifecycle fixture was run. No actual GPU leak, incorrect retained-frame policy, or visible production failure is claimed.
