# Boot Source Selection Loop

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T04-39-58-04-00`

## Goal

Trace how provider selection changes the game state and content basis before the runtime loop begins.

## Production loop

```txt
boot
  -> external import required
  -> external factory required
  -> external meadow created
  -> raw plan cached
  -> game state initialized
  -> tick and render loop starts
```

## Test loop

```txt
Node test
  -> no external provider supplied
  -> fallback factory selected
  -> local meadow created
  -> local raw plan cached
  -> game state initialized
  -> snapshots and render descriptors checked
```

## Gameplay consequence

The current gameplay state is mostly static, but its scene identity, render source, diagnostics and future interaction geometry are established by the provider before frame one. When player movement, objective progression, interaction targets or terrain contact become active, provider differences can affect:

```txt
path position and corridor semantics
object placement and stable IDs
focal-tree geometry and interaction anchor
wind and sway inputs
terrain and atmosphere semantics
feature counts and diagnostics
replay and save provenance
```

## Missing authority

```txt
no session-visible provider identity
no source-plan fingerprint in state or snapshot
no command or objective proof tied to provider provenance
no policy for resuming state created from a different provider fingerprint
```

## Required rule

The admitted provider and normalized source-plan fingerprint must be immutable inputs to a game session and later to save/replay compatibility. A fallback session must be explicitly marked degraded rather than appearing equivalent to a production-provider session.
