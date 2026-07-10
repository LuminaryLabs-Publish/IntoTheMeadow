# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-10T16-51-37-04-00`

## Validation performed this pass

This was a documentation-only breakdown using authenticated GitHub reads and direct updates to `main`.

```txt
full accessible Publish inventory reviewed: yes
central ledger comparison performed: yes
selected repository root .agent reviewed: yes
external ProtoKit source at the pinned commit inspected: yes
runtime source changed: no
branch created: no
pull request created: no
npm install: not run
npm run check: not run
npm test: not run
browser smoke: not run
headless editor smoke: not run
source provenance fixtures: not run because they do not exist yet
fallback parity fixture: not run because it does not exist yet
source failure policy fixture: not run because it does not exist yet
pushed to main: yes
central ledger updated: yes
```

## Source inspection completed

```txt
package.json
src/content/game-manifest.js
src/hosts/web-host.js
src/game/create-into-the-meadow-game.js
src/content/meadow-areas/create-local-meadow-source-plan.js
src/boot/install-dsks.js
src/content/dsk-registry.js
tests/static-smoke.mjs
.agent current audit set
LuminaryLabs-Agents/NexusEngine-ProtoKits/protokits/meadow-area-kit/index.js at 11d245913ba4d30f3ce950eb5a17e1cc6e4aa1f5
```

## Existing checks

```txt
npm run check
npm test
npm run editor:smoke
npm run editor:loop
npm run editor:browser
```

`npm run check` currently covers static structure, DSK registry, render plan, renderer v2, deterministic scene, and editor environment/command/loop reachability. It does not prove external source identity, import failure behavior, fallback selection, fallback parity, source-plan fingerprints, source-time semantics, measured mesh contribution, or registry implementation truth.

## Required next checks

```txt
node tests/meadow-source-provenance-smoke.mjs
node tests/meadow-source-failure-policy-smoke.mjs
node tests/meadow-source-fallback-parity-smoke.mjs
node tests/meadow-source-time-policy-smoke.mjs
node tests/mesh-contribution-ledger-smoke.mjs
node tests/dsk-registry-truth-smoke.mjs
npm run check
npm test
npm run editor:smoke
```

## Required fixture assertions

```txt
external success records the exact source id, URL, repository, commit, export version, plan version, and validation result
missing URL has a stable load-result status and reason
rejected import has a stable load-result status and reason
missing createMeadowAreaKit export has a stable load-result status and reason
hard-fail versus fallback behavior is policy-driven and deterministic
fallback selection is visible in DSK install, GameHost, and editor readback
fallback validate cannot claim representative without parity evidence
external and fallback outputs both satisfy a shared minimum render-plan consumer contract
permitted degradation is explicit for descriptor families and counts
source-plan fingerprints are stable for the same seed/config/source version
static source-plan caching and time overlay are either fixture-proven or replaced with source re-query behavior
source provenance survives enhancement, mesh, renderer, GameHost, and capture projection
mesh contribution counts remain measured rather than echoed
registry active status remains distinct from implementation and external provenance truth
```

## Validation warning

A commit-pinned URL is not sufficient runtime provenance when the host discards the commit and version after import. A local fallback function is not a recovery path when the web host fails before game creation. The next gate must prove selection, identity, failure policy, parity, and downstream propagation without requiring a browser.