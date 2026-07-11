# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T15-49-49-04-00`

## Selection state

```txt
10 accessible LuminaryLabs-Publish repositories observed
TheCavalryOfRome excluded by rule
9 eligible repositories centrally tracked with root .agent state
IntoTheMeadow selected as the oldest eligible documented repository
only IntoTheMeadow changed in the Publish organization for this pass
```

## DSK registry truth gaps

### Multiple declaration sources can drift

The same kit census is represented in:

```txt
dsk-registry.json
src/content/dsk-registry.js
src/dsks/index.js
.agent/kit-registry.json
```

There is no generated canonical source or fixture asserting exact parity.

### Descriptor status is policy, not runtime evidence

`active-v0.1` means an ID is listed in `REQUIRED_V01_DSK_IDS`. `planned` means it is not. Neither state proves an implementation factory exists, an instance was created, or any consumer used a service.

### Dependencies are absent

Every generated local descriptor exposes:

```txt
requires: []
provides: [game:<derived-domain>]
```

The registry cannot detect missing dependencies, duplicate providers, cycles, incompatible versions or activation order.

### Service bindings are absent

Descriptors contain service-name strings but no:

```txt
implementation module
factory reference
instance ID
source repository
commit or version identity
capability binding
lifecycle methods
consumer list
```

### `installDsks()` does not install local kits

It validates descriptor shape and returns descriptor arrays. It does not instantiate local kits, resolve capabilities, prepare an activation transaction or produce per-kit results.

### External provider admission is weak

The external row is marked `loaded` when a truthy function exists. It does not record provider repository, commit, export identity, validation result, fallback parity or service fingerprint.

### Runtime consumers bypass the registry

The render-plan enhancer imports concrete tree, wind, performance, post-process and grass factories directly. No service lookup or consumption receipt connects those instances to the generated descriptors.

### Renderer descriptor drift exists

`meadow-webgl-renderer-v2-kit` is required and implemented, but it is missing from the descriptor label and service maps. The generated descriptor receives generic fallback services instead of the renderer's real contract.

### Diagnostics report counts, not truth

Current diagnostics expose local/external counts and aggregate validation. They do not distinguish:

```txt
declared
implementation-bound
install-planned
installed
active
consumed
failed
degraded
retired
```

### Lifecycle retirement is absent

No registry-owned disposal plan exists. Reset and stop cannot prove reverse dependency retirement or that consumers released active instances.

### Registry tests prove shape only

The DSK smoke checks count and five architecture layers. It does not execute implementation binding, dependency resolution, service consumption, failure rollback or disposal.

## Concrete false-positive cases

```txt
player/input/interaction/objective DSKs validate despite inert gameplay
runtime-used tree and wind DSKs can be labelled planned
renderer implementation runs while its descriptor advertises fallback services
all descriptors can pass even when no local kit is instantiated by installDsks()
```

## Required DSK consumption fixture gaps

```txt
canonical definition parity across JSON and source
one implementation binding per active kit
source identity and version/fingerprint capture
dependency graph and cycle rejection
missing and duplicate provider rejection
ordered staged installation
atomic activation and rollback
capability-based service lookup
consumer acknowledgement receipts
external provider admission and validation
status derivation from runtime evidence
reverse-order reset and disposal
renderer service-contract parity
runtime-used grass/tree/wind/post consumption proof
declared-only classification for inert gameplay domains
```

## Retained interaction and objective gaps

```txt
path-progress and inspect commands absent
player path progress remains zero
inspection receipts absent
objective predicates and completion results absent
story transitions absent
browser/editor interaction parity absent
committed-frame progression acknowledgement absent
```

## Retained workspace path gaps

```txt
segment-aware containment absent
symlink escape policy absent
new-write ancestor containment absent
root/session/revision identity absent
operation budgets and typed filesystem results absent
```

## Retained host capability gaps

```txt
GameHost exposes raw game authority
capability registration remains bypassable
session and lifecycle fences absent
transport success can conceal domain failure
public observations are not revisioned
```

## Retained runtime step and clock gaps

```txt
browser RAF and editor surfaces share raw game.tick
finite delta and integer step validation absent
maximum work budget absent
monotonic simulation clock absent
reset epoch and step journal absent
```

## Retained lifecycle gaps

```txt
RAF request handles not retained
stop does not cancel pending callbacks
stop/start can create duplicate RAF chains
boot discards the host controller
fatal handling does not coordinate disposal
```

## Retained source-provider gaps

```txt
provider selection has no typed admission result
external and fallback plans lack parity classification
production import/export failure cannot reach the local fallback
```

## Retained render and committed-frame gaps

```txt
render-affecting cache projection incomplete
rebuild is not transactional
enhancer and renderer invalidation are uncoordinated
state, plan, renderer and canvas lack one commit identity
editor tick and reset bypass visible rendering
```

## Deployment risk

A Pages build can report a valid 43-entry local registry while the registry has resolved zero local services and the two authored objectives remain impossible. Deployment proof must require both DSK consumption parity and executable gameplay behavior, not declaration counts alone.