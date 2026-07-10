# Interaction Audit: Editor Command Proof Readback

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T15-18-29-04-00`

## Current interaction surfaces

Browser user surface:

```txt
canvas render
optional debug HUD
fatal loading/status panel
```

Agent/editor surface:

```txt
runtime.status
runtime.getState
runtime.getSnapshot
runtime.tick
runtime.reset
scene.getRenderPlan
scene.getStatistics
renderer.getSnapshot
renderer.getEnhancerSnapshot
renderer.capture
browser.getViewport
browser.getErrors
```

## What command results prove

The bridge returns a stable envelope:

```txt
ok
status
 action
data or errors
```

This proves capability availability, invocation, and exception handling.

## What command results do not prove

```txt
that a render descriptor was consumed
that a source id contributed geometry
that expected counts matched measured output
that fallback or skipping occurred
that a capture corresponds to a specific contribution ledger
that registry active/planned status matches implementation truth
```

## Required additive capability

```txt
renderer.getContributionLedger
```

Expected response:

```txt
renderer id/version
topologyKey
frame or capture correlation id
expected counts
measured counts
ordered contribution rows
validation summary
```

`renderer.capture` should include the same correlation id and contribution summary alongside the data URL.

## Interaction contract rule

The editor bridge should project proof owned by the renderer/mesh consumer. It should not infer, recreate, or mutate contribution rows itself.

## Fixture gate

Invoke the new capability in the headless environment and assert that its rows equal the GameHost renderer proof projection and reconcile with the renderer snapshot totals.