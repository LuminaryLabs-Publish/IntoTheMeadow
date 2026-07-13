# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Audit timestamp:** `2026-07-13T00-10-19-04-00`  
**Status:** `provider-source-parity-authority-audited`

## Summary

The browser and headless proof surfaces do not consume the same meadow provider. Browser boot dynamically imports the commit-pinned ProtoKit and throws before game creation if import or export validation fails. Node headless/editor and deterministic tests omit external kits, so `createIntoTheMeadowGame()` silently chooses the local fallback.

The browser provider advertises version `0.1.0`; the fallback render plan advertises `local-source-plan-v1`. Both can satisfy the broad render-plan shape, but no typed provider-admission result, service manifest, source digest, parity comparison or visible-frame receipt establishes that the same scene semantics were exercised.

## Plan ledger

**Goal:** define one provider-source authority that admits explicit external or fallback mode, validates the selected contract and proves browser/headless semantic parity.

- [x] Compare the full Publish inventory and central ledger.
- [x] Select only the oldest eligible synchronized repository.
- [x] Inspect browser provider loading and fallback reachability.
- [x] Inspect DSK external status and validation semantics.
- [x] Inspect game snapshots and diagnostics for provider lineage.
- [x] Inspect headless/editor and deterministic-test construction paths.
- [x] Preserve the complete 44-kit service inventory.
- [x] Define provider admission, fallback, conformance and parity proof.
- [ ] Implement and execute the authority later.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
unsynchronized eligible repositories: 0

IntoTheMeadow      2026-07-12T21-40-09-04-00 selected oldest
PhantomCommand     2026-07-12T22-15-00-04-00
PrehistoricRush    2026-07-12T22-18-39-04-00
HorrorCorridor     2026-07-12T22-44-30-04-00
ZombieOrchard      2026-07-12T23-00-53-04-00
MyCozyIsland       2026-07-12T23-08-37-04-00
TheUnmappedHouse   2026-07-12T23-20-51-04-00
AetherVale         2026-07-12T23-40-11-04-00
TheOpenAbove       2026-07-13T00-00-02-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/IntoTheMeadow` is modified in the Publish organization.

## Complete interaction loop

```txt
browser page
  -> boot-game selects canvas/HUD
  -> startWebHost calls loadExternalKits
  -> read manifest URL pinned to ProtoKits commit
  -> dynamic import module
  -> require createMeadowAreaKit function
  -> create game with external factory
  -> mark external DSK row loaded from factory truthiness
  -> create external meadow provider
  -> enhance and render frames
  -> expose GameHost and browser editor bridge

browser import/export failure
  -> loadExternalKits throws
  -> createIntoTheMeadowGame is never called
  -> local fallback is never selected
  -> generic boot failure is projected

Node headless/editor
  -> createEnvironment calls createIntoTheMeadowGame with no external kits
  -> local fallback provider is selected
  -> local-source-plan-v1 is enhanced, meshed, measured and captured

deterministic test
  -> createIntoTheMeadowGame with no external kits
  -> local fallback provider only
  -> snapshot determinism is checked without browser provider execution
```

## Domains in use

```txt
browser document shell, loading and fatal projection
game manifest and immutable source configuration
external CDN module import and commit pinning
provider factory export-shape validation
local fallback provider generation
DSK declaration, external status and local validation
meadow area, path, scatter, tree, wind and atmosphere generation
render-plan enhancement and contract normalization
CPU mesh generation and WebGL presentation
GameHost and browser editor observation
Node headless editor, SVG capture and workspace capabilities
deterministic scene and static smoke tests
build and GitHub Pages deployment

declared but inert:
  input, player, interaction, objective, story, ecology, audio, UI, save and adaptive performance

missing:
  provider session/source identity
  provider contract and service manifest admission
  provider commit/version compatibility result
  explicit external/fallback policy and terminal result
  provider snapshot lineage in game snapshots
  source-plan digest and semantic conformance
  browser/headless/test parity result
  first visible frame tied to admitted provider source
```

## Source-backed findings

### Browser fallback is unreachable

`startWebHost()` awaits `loadExternalKits()` before creating the game. `loadExternalKits()` throws on a missing URL, failed dynamic import or missing `createMeadowAreaKit` export. The fallback inside `createIntoTheMeadowGame()` is therefore not a browser recovery path.

### Headless and deterministic proof use fallback only

`createEnvironment()` and `deterministic-scene-smoke.mjs` call `createIntoTheMeadowGame()` without external kits. Both select `createFallbackMeadowAreaKit`.

### External readiness is not validated

`installDsks()` marks the external row `loaded` when the factory value is truthy. Its overall `validation.passed` comes only from local DSK validation. It does not validate provider version, service IDs, runtime adapter, plan contract or commit identity.

### Provider lineage is incomplete

The browser manifest contains the pinned URL and the render plan exposes a version. The game snapshot omits `meadow.getSnapshot()`, provider mode, provider commit, module URL, service manifest and plan digest. Diagnostics report one external row even when its status is `deferred`.

### Existing proof does not establish parity

The Node deterministic test exercises only the fallback. Static checks verify the manifest and host structure, not a successful import of the pinned provider. No fixture compares external and fallback plans under the same config.

## Kit and service census

```txt
external provider kits: 1
local declared kits: 43
total kit surfaces: 44
required-v0.1 declarations: 15
planned declarations: 28
implemented provider-source parity authorities: 0
```

The exact inventory is in the current tracker and `.agent/kit-registry.json`.

## Required authority

```txt
meadow-provider-source-parity-authority-domain
```

## Required transaction

```txt
ProviderLoadCommand
  -> bind runtime session, environment and expected provider policy
  -> resolve manifest source ID, URL, commit and expected contract version
  -> load external candidate or select admitted fallback mode
  -> validate factory export and service manifest
  -> instantiate candidate in detached state
  -> validate provider snapshot and render-plan contract
  -> calculate provider and plan fingerprints
  -> commit one ProviderLoadResult
  -> expose source lineage through snapshots and diagnostics
  -> compare external/fallback semantic fixture outputs
  -> acknowledge first visible frame from the admitted provider generation

failure
  -> return rejected, fallback-selected or terminal result
  -> never silently change provider source
  -> never report external readiness from declaration count alone
```

## Validation

Documentation only. No source, package, dependency or deployment behavior changed. Existing checks were inspected but not run. No external module load, fallback selection, source parity or Pages proof is claimed.
