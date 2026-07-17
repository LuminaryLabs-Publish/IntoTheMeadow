# Gameplay Audit: Editor Capture Observation Loop

**Timestamp:** `2026-07-17T03-44-31-04-00`

## Interaction loop

```txt
operator requests capture
  -> editor capability executes immediately
  -> live path reads canvas pixels without a frame lease
  -> Node path rebuilds and draws a synthetic SVG
  -> browser script captures a screenshot in one process
  -> browser script validates DOM in another process
  -> evidence is reviewed as one visual iteration
```

## Gameplay relevance

IntoTheMeadow is currently an environment and editor-controlled visual proof rather than a complete traversal game. Capture quality is therefore part of its primary interaction loop: inspect, capture, observe, compare, decide and iterate.

Without a correlated capture result, an operator can approve or reject a visual change using pixels, descriptors and diagnostics that do not prove they belong to the same runtime frame.

## Required loop

```txt
request capture
  -> admit one capture generation
  -> commit one exact frame
  -> read and encode its pixels
  -> bind renderer and plan metadata
  -> commit one provenance-complete artifact
  -> compare only compatible capture generations
```

## Boundary

No editor interaction, scene, gameplay, capture or comparison behavior changed.
