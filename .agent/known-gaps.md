# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T04-39-58-04-00`

## Selection state

```txt
10 accessible LuminaryLabs-Publish repositories observed
TheCavalryOfRome excluded by rule
9 eligible repositories centrally tracked with root .agent state
IntoTheMeadow selected as the oldest eligible central ledger entry
only IntoTheMeadow changed in the Publish organization
```

## Source-provider authority gaps

### Production fallback is unreachable

`startWebHost()` calls `loadExternalKits()` before game construction. A failed dynamic import or missing `createMeadowAreaKit` export throws before `createIntoTheMeadowGame()` can select its local fallback.

### Tests do not exercise the deployed provider path

Current Node tests call `createIntoTheMeadowGame()` without `externalKits`, so they exercise `createFallbackMeadowAreaKit`. A green `npm run check` does not prove the pinned external URL loads, exports the expected factory, produces a compatible raw plan or survives enhancement.

### Provider selection has no typed result

```txt
request id: absent
candidate id: absent
admission status: absent
failure class: absent
fallback reason: absent
provider fingerprint: absent
source-plan fingerprint: absent
journal sequence: absent
```

### External and fallback contracts differ

```txt
version: 0.1.0 vs local-source-plan-v1
scatter: path-relative RNG vs broad hash bands
path: normalized descriptor vs copied authored config
grass: normalized motion fields vs reduced placeholder
atmosphere: normalized feature data vs hard-coded local values
validation: structural checks vs always passed
snapshot: full provider state vs minimal fallback summary
```

No parity policy says whether those differences are acceptable, degraded, incompatible or expected to normalize away.

### No source-plan admission boundary

The enhancer receives whichever raw plan the selected provider returns. Provider identity, expected raw schema, capabilities and compatibility are not checked together before enhancement.

### No production-path fixture

```txt
external import success fixture: absent
network/import failure fixture: absent
missing export fixture: absent
module evaluation failure fixture: absent
provider version mismatch fixture: absent
invalid raw-plan fixture: absent
external/fallback parity fixture: absent
browser offline policy smoke: absent
```

## Retained runtime lifecycle gaps

```txt
RAF id not retained
stop/start can multiply RAF chains
boot discards host controller
globals are overwritten without leases
fatal startup does not roll back renderer/editor resources
no coordinated idempotent dispose
```

Provider work must compose with the lifecycle authority rather than adding a second startup owner.

## Retained frame-observation gaps

```txt
no immutable committed frame identity
no shared state/plan/render/canvas correlation
GameHost observations can mix different live moments
```

Provider fingerprints should become inputs to committed-frame provenance after that authority exists.

## Registry and service-truth gaps

```txt
43 local kits are declared
1 external kit is declared
registry membership does not prove implementation
implementation does not prove active consumption
mesh contribution and renderer consumption remain unproved
```

## Gameplay gaps

```txt
player/camera/input descriptors are not runtime-authoritative
interaction targets do not admit commands
objectives and story do not mutate from player action
save/audio/UI progression remain descriptor-only
```

## Validation gaps

The current smoke suite is useful for local fallback determinism and render enhancement, but it cannot establish source-provider parity or production dependency health.

## Deployment risk

The deployed route has a single remote module dependency. A CDN, repository, CORS, module-evaluation or export-contract failure stops boot entirely, while the codebase gives the appearance of having a fallback that production cannot actually reach.
