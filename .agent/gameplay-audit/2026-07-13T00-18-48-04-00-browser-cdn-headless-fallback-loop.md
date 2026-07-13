# Browser CDN / Headless Fallback Gameplay Loop

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-13T00-18-48-04-00`

## Summary

Gameplay-facing meadow state is composed from different provider implementations depending on environment. Browser startup requires the external CDN provider, while headless and deterministic paths silently construct the local fallback.

## Plan ledger

**Goal:** make provider source an explicit part of gameplay boot, reset, diagnostics and deterministic proof.

- [x] Trace browser boot and failure behavior.
- [x] Trace headless and test fallback behavior.
- [x] Record gameplay snapshot lineage gaps.
- [x] Define explicit fallback and terminal-failure policies.
- [ ] Implement and execute later.

## Current loop

```txt
browser success
  -> load external provider
  -> create game
  -> generate meadow arrival plan
  -> render static meadow

browser provider failure
  -> boot throws
  -> no game state is created
  -> fallback path is unreachable

headless/test
  -> omit external factory
  -> create fallback provider
  -> generate local-source-plan-v1
  -> validate or capture fallback state
```

## Gameplay authority gap

The game snapshot does not identify:

```txt
which provider was selected
why that source was selected
which commit/version supplied the source
whether fallback was allowed
whether external and fallback semantics were compared
which provider generation produced current meadow state
```

## Consequences

```txt
browser failure cannot produce an explicit fallback-selected result
headless success does not prove browser provider success
determinism proof applies only to the fallback source profile
reset cannot prove it retained the same provider generation
diagnostics cannot distinguish loaded, deferred, rejected and fallback-selected sources
future interaction/objective logic could bind to environment-specific meadow semantics
```

## Required gameplay boot result

```txt
MeadowBootResult {
  bootCommandId
  runtimeSessionId
  providerLoadResultId
  providerId
  providerGeneration
  sourceMode
  status
  reason
  gameStateRevision
  meadowSnapshotFingerprint
  renderPlanFingerprint
}
```

## Required reset invariant

```txt
reset within one runtime session
  -> preserve admitted provider generation
  -> regenerate state from the same source contract
  -> publish reset result with provider lineage

provider change
  -> require a new explicit provider-load transaction
  -> never occur as a side effect of reset
```

## Required source policies

```txt
external-required
  browser external failure -> terminal boot result

external-preferred
  browser external failure -> explicit compatible fallback candidate
  fallback only commits after parity/profile admission

fallback-only
  no external import attempt
  source mode remains visible in snapshots
```

## Validation boundary

No gameplay, boot, reset, provider or snapshot implementation changed. No runtime fallback or deterministic cross-source fixture was run.