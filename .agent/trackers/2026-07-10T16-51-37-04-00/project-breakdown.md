# IntoTheMeadow Project Breakdown

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T16-51-37-04-00`

## Goal

Document the active meadow source boundary, identify every domain/service/kit involved, prove how the external source is selected, and define the smallest implementation slice that makes external identity, failure policy, fallback parity, source-time semantics, and downstream readback authoritative.

## Plan ledger

- [x] Compared the full accessible `LuminaryLabs-Publish` inventory with central repo-ledger state.
- [x] Excluded `TheCavalryOfRome`.
- [x] Confirmed all nine eligible repositories were already tracked and had root `.agent` state.
- [x] Selected only `IntoTheMeadow` as the oldest eligible documented fallback.
- [x] Reviewed the active route, external source manifest, dynamic import host, game composition, local fallback source plan, DSK install state, package checks, and current `.agent` state.
- [x] Reviewed the pinned `NexusEngine-ProtoKits/meadow-area-kit` implementation at commit `11d245913ba4d30f3ce950eb5a17e1cc6e4aa1f5`.
- [x] Identified the interaction loop.
- [x] Identified domains in use.
- [x] Identified services offered.
- [x] Identified runtime-backed and registry-declared kits.
- [x] Added architecture, render, gameplay, interaction, external-kit, and deploy audits.
- [x] Refreshed required root `.agent` files.
- [x] Changed documentation only.
- [x] Pushed only to `main`.
- [x] Created no branch or pull request.

## Interaction loop

```txt
browser boot
  -> resolve commit-pinned external kit URL
  -> dynamic import and factory export check
  -> create meadow source kit
  -> create and cache time-0 source plan
  -> install local/external DSK descriptors
  -> frame/lastTick update
  -> time-field overlay on cached source plan
  -> local render-plan enhancement
  -> CPU mesh construction
  -> WebGL outline and cel/fog rendering
  -> aggregate HUD/GameHost/editor readback
```

## Main finding

The source is pinned but not proven. Runtime snapshots do not retain the external repository, commit, exported version, source-plan fingerprint, selected mode, or load result. The browser host fails before the local fallback can be selected, while the fallback claims representativeness without parity evidence. The external and fallback plans materially differ, and cached time-0 topology bypasses source-kit re-query for later frames.

## Next safe ledge

```txt
IntoTheMeadow External Meadow Source Provenance + Fallback Parity Fixture Gate
```

The existing mesh-contribution and registry-truth requirements remain companion gates.