# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-10T16-51-37-04-00`

## Goal

Make the meadow source boundary authoritative and testable. Preserve the current route and visuals while proving which source loaded, what version and commit produced the plan, whether validation passed, whether fallback was selected, what degradation occurred, and how the source plan flowed into enhancement, mesh construction, rendering, GameHost, and editor readback.

## Current next build slice

```txt
IntoTheMeadow External Meadow Source Provenance + Fallback Parity Fixture Gate
```

## Plan ledger

```txt
[ ] Preserve the current commit-pinned external URL, render-plan v2 schema, topologyKey behavior, visual output, GameHost legacy methods, and editor protocol.
[ ] Define a JSON-safe MeadowSourceProvenance row owned by the web-host/source boundary.
[ ] Record source id, mode, repository, URL, commit, exported version, load status, validation status, source-plan version, source-plan fingerprint, and stable reason.
[ ] Make external load outcomes explicit: loaded, missing-url, import-failed, missing-export, invalid-plan, fallback-selected, fallback-unavailable.
[ ] Replace implicit function-presence status in installDsks with additive external provenance data.
[ ] Define a startup policy that either hard-fails intentionally or selects the local fallback intentionally.
[ ] Keep fatal behavior visible when fallback is not permitted.
[ ] Compare external and fallback outputs against a shared minimum consumer contract.
[ ] Declare permitted degradation for grass population, mushrooms, atmosphere detail, path normalization, counts, and plan version.
[ ] Stop labeling fallback representative without a fixture-backed parity classification.
[ ] Prove whether static source-plan caching plus time overlay is the intended contract.
[ ] Re-query the source kit only if time-dependent source behavior is required; otherwise record static-source policy explicitly.
[ ] Carry source provenance into the enhanced plan runtime block.
[ ] Add source provenance to GameHost and NexusEditorEnvironment additively.
[ ] Include source metadata in renderer capture output.
[ ] Add DOM-free fixtures for external success, missing URL, import rejection, missing export, invalid source plan, fallback selection, and fallback rejection.
[ ] Add parity fixtures comparing required descriptor families and declared degradation.
[ ] Retain the previously planned mesh-contribution ledger and registry-truth classification as companion gates.
[ ] Wire all new fixtures into npm run check.
[ ] Update repo-local .agent docs and the central LuminaryLabs ledger after implementation lands.
```

## Suggested files

```txt
src/source-proof/create-meadow-source-provenance.js
src/source-proof/compare-meadow-source-plans.js
src/source-proof/fingerprint-meadow-source-plan.js
src/hosts/web-host.js
src/game/create-into-the-meadow-game.js
src/boot/install-dsks.js
src/boot/expose-game-host.js
src/editor/install-editor-bridge.js
tests/meadow-source-provenance-smoke.mjs
tests/meadow-source-fallback-parity-smoke.mjs
tests/meadow-source-failure-policy-smoke.mjs
tests/meadow-source-time-policy-smoke.mjs
package.json
```

## Expected source row

```txt
{
  sourceId,
  mode: external | fallback,
  status: loaded | failed | degraded,
  repository,
  url,
  commit,
  exportedVersion,
  sourcePlanVersion,
  sourcePlanFingerprint,
  validationPassed,
  degradationClass,
  reason
}
```

## Implementation order

```txt
1. Define source provenance, load-result, parity, and degradation contracts.
2. Wrap dynamic import and export validation in a deterministic load-result adapter.
3. Decide and encode hard-fail versus fallback policy.
4. Capture external version and commit metadata.
5. Fingerprint the source plan before enhancement.
6. Compare fallback and external plans against the minimum consumer contract.
7. Carry source proof into DSK install, enhanced plan, GameHost, editor, and capture readback.
8. Add failure, fallback, parity, and time-policy fixtures.
9. Preserve and integrate mesh-contribution and registry-truth fixtures.
10. Run npm run check, npm test, and editor smoke validation.
11. Update central tracking.
```

## Stop condition

Stop when a DOM-free test can prove which meadow source was selected, why it was selected, exactly which pinned source produced the plan, whether it passed validation, what fallback degradation occurred, whether source time semantics are preserved, and that the same provenance reaches GameHost and editor readback.