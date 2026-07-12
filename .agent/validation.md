# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-12T00-58-12-04-00`

## Plan ledger

**Goal:** distinguish repeated reads of one unchanged fallback-backed game from executable proof that independent runtimes reproduce construction, simulation, reset, progression, render plans and the first visible frame.

- [x] Review the complete accessible Publish inventory.
- [x] Compare every eligible repository with central tracking.
- [x] Verify central and root `.agent` coverage.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `IntoTheMeadow` because newer repo-local work required central reconciliation.
- [x] Inspect `validate-determinism.js` and `deterministic-scene-smoke.mjs`.
- [x] Inspect game construction, provider fallback, state, snapshot and reset.
- [x] Inspect render-plan smoke and package check coverage.
- [x] Document canonical schema, independent construction, provider parity, replay, divergence and frame-proof requirements.
- [x] Change documentation only.
- [ ] Execute replay fixtures after implementation exists.

## Source inspection completed

```txt
external declared kits: 1
local declared kits: 43
total declared kits: 44
determinism validator functions: 2
deterministic smoke files: 1
independent runtimes constructed by smoke: 1
external production providers exercised by smoke: 0
ticks executed by smoke: 0
resets executed by smoke: 0
command sequences executed by smoke: 0
checkpoint fingerprints: 0
first-divergence results: 0
visible replay-frame receipts: 0
```

## Proven from source

```txt
stableStringify recursively sorts plain object keys
validateDeterminism calls the supplied callback twice
the two serialized results are compared with strict string equality
failure output is one generic string
deterministic-scene-smoke validates authored scene-flow counts
it creates one game with no externalKits
that selects the local fallback provider
it reads game.getSnapshot twice without a tick or reset
game snapshot contains manifest, state, base render plan and diagnostics
game tick increments frame and records lastTick only
game reset constructs another initial state
render-plan smoke separately checks topology-key stability across a time overlay
npm run check includes no independent replay fixture
```

## Existing proof

Current checks prove:

```txt
required source files exist
DSK descriptors validate structurally
scene-flow authored counts validate
two adjacent reads of one unchanged fallback-backed snapshot are equal
render-plan descriptors validate
one time-only render-plan update preserves topology identity
CPU mesh data and renderer smoke remain internally valid
headless editor commands operate for existing domains
```

Current checks do not prove:

```txt
canonical-value admission
serializer schema/version identity
independent game construction determinism
production external-provider determinism
provider or seed fingerprints
same-seed checkpoint replay
command/tick sequence replay
reset and stop/start replay
30/60/120 Hz parity
objective/story progression replay
browser/headless parity
source/enhanced render-plan fingerprint parity
first visible frame parity
negative controls
exact first-divergence location
```

## Execution status

```txt
runtime source changed: no
determinism source changed: no
renderer source changed: no
package scripts changed: no
dependencies changed: no
render output changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check executed: no
replay fixtures available: no
browser replay smoke available: no
```

## Required canonical-value fixture

```txt
plain canonical values serialize identically across independent calls
object keys use one deterministic ordering policy
finite-number and -0 policy is explicit
NaN and Infinity reject
undefined and sparse arrays reject or receive explicit tagged semantics
cycles reject with a typed path
Date, Map, Set, typed values and custom prototypes reject or use versioned adapters
accessor properties and getter side effects reject
schema and serializer version participate in fingerprint identity
```

## Required independent-build fixture

```txt
construct runtime A and runtime B separately
construct separate provider instances
admit identical manifest, content, provider and seed identity
compare construction checkpoint fingerprints
repeat in reversed construction order
assert no shared mutable provider, enhancer or cache state
change seed/provider/content as negative controls
```

## Required provider fixture

```txt
fallback provider replay is deterministic
external production-provider replay is deterministic
provider ID, version and fingerprint are recorded
fallback/external differences are classified rather than silently treated as parity
provider import/export failure produces a typed result
```

## Required tick and reset fixture

```txt
admit one sequenced command stream
admit one normalized committed-tick schedule
compare state checkpoints after every command/tick boundary
reset both runtimes into a new replay epoch
replay the same scenario
assert terminal state, objective and story fingerprints match
inject changed command order and changed dt negative controls
```

## Required cadence fixture

```txt
run presentation schedules representing 30, 60 and 120 Hz
map all schedules to the same committed simulation ticks
assert state and progression fingerprints are identical
classify render interpolation differences separately
exclude hidden/suspended intervals by explicit policy
```

## Required divergence fixture

```txt
change one admitted value
stop comparison at the first mismatch
report checkpoint ID
report committed tick ID
report domain and canonical path
report left/right fingerprints
report value summaries and classification
preserve bounded evidence
```

## Required render and frame fixture

```txt
compare source render-plan fingerprints
compare enhanced render-plan fingerprints
compare topology and quality identity
compare renderer observations
wait for the first visible replay frame
assert state, plan, renderer, frame and capture cite the same replay checkpoint
```

## Required browser/headless fixture

```txt
run the same ReplayScenario through Node
run it through browser GameHost capability gateway
run it through the browser editor bridge
run it through the Node headless editor environment
assert one shared ReplayResult schema and terminal fingerprints
```

## Future commands

```bash
npm run fixture:canonical-values
npm run fixture:deterministic-independent-build
npm run fixture:deterministic-provider-parity
npm run fixture:deterministic-tick-replay
npm run fixture:deterministic-reset-replay
npm run fixture:deterministic-cadence
npm run fixture:deterministic-first-divergence
npm run fixture:deterministic-browser-headless
npm run smoke:deterministic-visible-frame
npm run smoke:deterministic-pages
npm run check
```

## Completion boundary

Do not claim deterministic replay because the same unchanged snapshot serializes equally twice. Completion requires canonical admission, independent runtime construction, production-provider coverage, checkpointed tick/reset replay, negative controls, exact divergence evidence and a first visible frame that cites the same replay result.