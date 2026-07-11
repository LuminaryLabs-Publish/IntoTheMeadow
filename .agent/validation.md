# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T15-49-49-04-00`

## Plan ledger

**Goal:** separate declaration-shape proof from executable proof that DSK implementations are bound, installed, consumed and retired through one authoritative graph.

- [x] Review the full accessible Publish inventory.
- [x] Compare every eligible repository with the central ledger.
- [x] Verify central and root `.agent` coverage.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `IntoTheMeadow`.
- [x] Read `AGENTS.md` and current audit state.
- [x] Inspect registry JSON, source IDs and generated descriptors.
- [x] Inspect local installation and game-state snapshots.
- [x] Inspect direct implementation imports and runtime consumers.
- [x] Inspect DSK smoke assertions.
- [x] Document the consumption authority and fixture requirements.
- [x] Change documentation only.
- [ ] Execute fixtures after implementation exists.

## Source inspection completed

```txt
external declared kits: 1
local declared kits: 43
required-v0.1 local kits: 15
descriptor implementation references: 0
descriptor dependency edges: 0
local instances created by installDsks(): 0
registry-backed runtime service lookups: 0
per-kit install results: 0
per-consumer consumption receipts: 0
registry-owned disposal receipts: 0
```

## Proven from source

```txt
dsk-registry.json and src/content/dsk-registry.js duplicate kit IDs
src/dsks/index.js generates descriptors from IDs and service-name arrays
every generated descriptor has requires: []
every generated descriptor provides one generic game:<domain> capability
status is derived from required-v0.1 membership
installDsks() validates and returns descriptor arrays
installDsks() does not instantiate local implementations
external loaded status depends on truthiness of the supplied export
game state stores a declaration snapshot
runtime diagnostics publish aggregate counts
render-plan enhancement imports concrete factories directly
DSK smoke checks count and five architecture layers
```

## Concrete drift proof

`meadow-webgl-renderer-v2-kit` appears in the local and required-v0.1 ID lists and has a real renderer implementation, but it is missing from the descriptor label and service maps. Descriptor generation therefore falls back to:

```txt
model
state
events
validation
snapshot
```

This proves the generated registry can disagree with the implementation shipped by the browser while validation still passes.

## Existing proof

Current checks prove:

```txt
required files exist
43 local descriptors can be generated
required-v0.1 IDs appear in the descriptor set
each descriptor has five architecture layers
IDs use dsk/kit suffixes
service-name arrays contain at least five entries
render plan and renderer utility smokes pass
positive editor operations can execute
```

Current checks do not prove:

```txt
one canonical definition source
one implementation binding per active kit
source identity, version or fingerprint
dependency resolution
cycle or duplicate-provider rejection
ordered staged installation
atomic activation or rollback
capability-based service lookup
runtime consumer acknowledgement
external provider validation identity
status derived from runtime evidence
reverse-order reset and disposal
registry/runtime service parity
```

## Execution status

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
render output changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check executed: no
browser smoke executed: no
DSK consumption fixtures available: no
```

## Required DOM-free fixture

Construct a fixture with:

```txt
canonical DSK definitions
fake implementation bindings
capability requirements and providers
external provider identity
staged instance ownership
service registry
consumer registry
bounded install/result journal
lifecycle disposal adapter
```

## Acceptance assertions

```txt
all canonical IDs generate JSON and source indexes without drift
all active definitions bind exactly one implementation
dependency order is deterministic
all required capabilities resolve exactly once
staged instances validate before publication
active registry publishes atomically
runtime consumer lookup records immutable receipts
diagnostics derive installed/active/consumed status from evidence
renderer definition matches actual renderer capabilities
external provider identity and validation are retained
reset and stop dispose in reverse dependency order
```

## Rejection assertions

```txt
missing binding rejected
unknown export rejected
missing capability rejected
duplicate provider rejected
dependency cycle rejected
provider validation failure rejected
stale session or install revision rejected
consumer request for undeclared capability rejected
partial installation rolled back
disposal failure reported without concealing leaked ownership
```

Every rejected activation must assert:

```txt
no partial active service registry
no consumer-visible service change
no leaked staged instance
one typed result
one bounded journal row
```

## Required parity fixture

For every runtime-used system, compare:

```txt
canonical DSK definition
implementation binding
provided capability contract
actual created instance
consumer request
consumption receipt
diagnostics projection
retirement receipt
```

Minimum systems:

```txt
external meadow provider
game root
render host
WebGL renderer v2
tree object
wind field
performance policy
post-process stack
nine grass kits
```

Declared but currently inert player, input, interaction, objective and story services must be classified as `declared-only`, not `active` or `consumed`.

## Future commands

```bash
npm run fixture:dsk-registry-drift
npm run fixture:dsk-dependency-graph
npm run fixture:dsk-install-rollback
npm run fixture:dsk-consumption-parity
npm run fixture:dsk-disposal-order
npm run check
```

## Completion boundary

Do not claim that a DSK is installed or operational because its descriptor exists. Completion requires an implementation binding, admitted dependency graph, active service registration, at least one expected consumer receipt where applicable, truthful diagnostics and lifecycle retirement proof.