# Browser CDN Headless Fallback Loop

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-13T00-10-19-04-00`

## Summary

The product's two primary execution environments boot different meadow sources. Browser failure is terminal before game creation, while Node tooling silently falls back.

## Plan ledger

**Goal:** replace environment-dependent implicit source choice with an explicit bootstrap result.

- [x] Trace browser bootstrap.
- [x] Trace headless and deterministic bootstrap.
- [x] Record fallback reachability.
- [x] Record gameplay/readback consequences.
- [ ] Implement one bootstrap authority later.

## Current loop

```txt
browser
  -> external import required
  -> success: game starts with external provider
  -> failure: game never starts

headless/test
  -> no external factory
  -> local fallback selected automatically
  -> proof continues
```

## Consequence

A green Node proof does not demonstrate that the deployed browser loaded or executed the same provider. Conversely, browser import failure does not exercise or validate the local fallback.

## Required gameplay bootstrap result

```txt
ProviderBootstrapResult
  status: ready-external | ready-fallback | rejected | terminal
  source profile
  provider generation
  config fingerprint
  plan fingerprint
  diagnostics revision
  first frame/capture receipt
```
