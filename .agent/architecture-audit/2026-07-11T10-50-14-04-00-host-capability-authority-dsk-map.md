# Host Capability Authority DSK Map

**Timestamp:** `2026-07-11T10-50-14-04-00`

## Current ownership

```txt
web-host-dsk
  constructs browser host
  exposes GameHost
  starts RAF

into-the-meadow-game-dsk
  owns game state replacement
  exposes tick, reset and rebuildRenderPlan

meadow-render-host-dsk
  owns plan enhancement and render submission

meadow-diagnostics-dsk
  exposes runtime and render observations

browser editor bridge
  registers capability names
  calls GameHost.game directly
```

## Current defect

The capability layer does not own mutation. It is an optional wrapper around a globally reachable raw game object.

```txt
GameHost.game.tick
GameHost.game.reset
GameHost.game.rebuildRenderPlan
```

These methods can be invoked without session identity, command identity, expected frame, admission policy, semantic result, journal or render acknowledgement.

## Required parent domain

```txt
meadow-host-capability-authority-domain
```

The parent owns only cross-surface command admission, public read-model projection, result normalization, lease revocation and audit correlation.

## Existing DSK updates first

```txt
web-host-dsk
  remove raw runtime exposure
  own capability lease installation and revocation

into-the-meadow-game-dsk
  make mutations internal domain services
  accept commands only from admitted adapters

meadow-render-host-dsk
  expose committed render observations, not renderer authority

meadow-diagnostics-dsk
  expose bounded clone-safe journals and health read models
```

## Coordinating kits

```txt
host-capability-registry-kit
host-command-envelope-kit
host-command-admission-kit
host-session-fence-kit
raw-runtime-quarantine-kit
gamehost-read-model-kit
clone-safe-observation-kit
capability-result-kit
capability-sequence-kit
capability-journal-kit
capability-revocation-kit
browser-editor-capability-adapter-kit
headless-editor-capability-adapter-kit
host-capability-fixture-kit
```

## Boundary rule

```txt
public caller
  -> capability descriptor
  -> immutable command envelope
  -> session/lifecycle admission
  -> domain service
  -> typed domain result
  -> bounded journal
  -> clone-safe observation
```

No public object should expose renderer, enhancer, provider or game mutation methods.

## Promotion rule

Keep this as a game-local authority until at least two browser hosts and one Node/headless host prove the same command and result contract. Promote only the generic registry, admission, result and observation services after cross-product validation.