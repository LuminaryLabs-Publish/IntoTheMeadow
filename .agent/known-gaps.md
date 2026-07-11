# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T06-38-59-04-00`

## Selection state

```txt
10 accessible LuminaryLabs-Publish repositories observed
TheCavalryOfRome excluded by rule
9 eligible repositories centrally tracked with root .agent state
IntoTheMeadow selected as oldest eligible central-ledger entry
only IntoTheMeadow changed in the Publish organization
```

## Render cache identity gaps

### Source plans have no revision authority

```txt
provider fingerprint: absent from active render lineage
source revision: absent
complete source fingerprint: absent
candidate versus committed raw-plan state: absent
```

### Source-key projection is incomplete

`sourceTopologyKey()` omits render-affecting fields.

```txt
path enabled, rutCount, pebbleCount
wildflower color and accent
rock color and accent
tree-line color and accent
focal-tree trunkRadius and trunkHeight
focal-tree rootCount and leafClusterCount
focal-tree shadowRadius and renderStyle
raw wind state
runtime performance override
```

A change to one of these values can reuse the prior enhanced plan.

### Cache-key schema is implicit

```txt
source key schema ID: absent
projection version: absent
static versus dynamic field registry: absent
unknown static field rejection: absent
changed-field classification: absent
```

### Rebuild is not a transaction

`rebuildRenderPlan()` replaces the cached raw plan directly.

It does not:

```txt
validate a detached candidate
increment a source revision
compare canonical identities
invalidate the enhancer
invalidate the renderer
return a typed result
roll back after downstream failure
wait for visible-frame acknowledgement
```

### Enhancer and renderer caches are independently mutable

```txt
planEnhancer.invalidate(): exposed only through raw owner
renderer.dispose(): separate lifecycle operation
coordinated invalidate/rebuild: absent
cache admission result: absent
cache journal: absent
```

### Mesh and GPU lineage is incomplete

```txt
sourceRevision -> sourceKey: absent
sourceKey -> topologyKey: implicit only
topologyKey -> meshKey: not exposed by renderer snapshot
meshKey -> bufferGeneration: absent
bufferGeneration -> committedFrameId: absent
```

### Validation proves shape, not identity coverage

Current render validation checks required descriptor families and unknown types.

It does not prove:

```txt
all render-affecting source fields are hashed
all source descriptors contribute to expected enhanced descriptors
all enhanced descriptors contribute to expected mesh families
mesh payload matches topology identity
GPU buffers match mesh identity
```

### Current tests cover only stable time updates

```txt
time-only cache hit: covered
static mutation rebuild matrix: absent
dynamic-only no-rebuild matrix: absent
manual invalidation: absent
failed candidate rollback: absent
identical deterministic rebuild lineage: absent
GPU buffer generation: absent
host/editor lineage agreement: absent
```

## Retained interaction command gaps

```txt
path-progress and inspect commands are authored but cannot be dispatched
player/path mutation is absent
objective predicates and story triggers are not executed
accepted/rejected result authority is absent
```

Interaction work must consume render lineage when it later projects visible feedback.

## Retained source-provider gaps

```txt
production fallback is unreachable after import/export failure
tests use the local fallback rather than the deployed provider
provider selection has no typed admission result
external and fallback plans lack parity classification
```

Provider fingerprint and normalized source contract are prerequisites for authoritative render identity.

## Retained lifecycle and frame gaps

```txt
RAF ownership and coordinated disposal remain incomplete
committed state/plan/render/canvas correlation remains absent
```

The cache authority must integrate with one runtime session and one committed frame authority.

## Registry truth gap

The DSK registry advertises render host, performance, wind, diagnostics, and renderer services, but declaration does not prove that a versioned identity projection or cache admission service exists.

## Deployment risk

A deployed route can pass current render checks while a changed raw source plan silently reuses old enhanced descriptors and old GPU buffers. The screen may remain valid-looking but stale, and current CI cannot detect that mismatch.