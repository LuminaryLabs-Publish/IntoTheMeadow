# Deploy Audit: Post-Process Browser Fixture Gate

**Generated:** `2026-07-14T20-40-50-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

Source inspection cannot prove which post-process work reaches the source, built, or Pages frame. Deployment readiness requires executable graph, capability, fallback, resource, and image evidence.

## Plan ledger

**Goal:** define the minimum fixture matrix before post-process parity or visual readiness is claimed.

- [x] Separate source declarations from GPU execution proof.
- [x] Define full, reduced, fallback, failure, resize, and recovery fixtures.
- [x] Define source/build/Pages parity requirements.
- [ ] Execute fixtures later.

## Required fixtures

```txt
headless contract
  validate declared pass order and mandatory-pass policy

browser full profile
  prove target allocation and every accepted pass receipt

browser inline fallback
  prove explicit substitutions and matching fallback fingerprint

unsupported pass
  reject or reduce according to policy

allocation failure
  preserve predecessor output and retire candidate targets

resize and DPR change
  allocate a new target generation and reject stale pass receipts

WebGL context loss/recovery
  retire old resources and rebuild the admitted profile

visible-frame capture
  bind image evidence to frame, graph, profile and renderer generations

built artifact
  repeat the same identity and receipt checks

GitHub Pages
  confirm deployed route exposes the same result and frame identity
```

## Gate

No release may claim post-process adoption solely because pass descriptors exist or because the renderer produced a frame.

## Boundary

No workflow or deployment code changed and no fixture ran.