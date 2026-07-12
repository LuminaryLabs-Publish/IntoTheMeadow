# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T05-31-59-04-00`

## Plan ledger

**Goal:** distinguish a shader that happened to compile from an admitted precision policy whose exact program is proven on the visible frame.

- [x] Review the Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Verify all eligible root `.agent` states.
- [x] Select only `IntoTheMeadow`.
- [x] Inspect the precision wrapper, base renderer, web host and current tests.
- [x] Confirm both graphics stages are rewritten to mediump.
- [x] Confirm precision capability and program-generation evidence is absent.
- [x] Document policy, normalization, compile/link and device-matrix proof requirements.
- [x] Change documentation only.
- [ ] Execute shader precision fixtures after implementation exists.

## Source inspection completed

```txt
shader stages intercepted: 2
float precision declarations removed: all matching declarations
precision inserted: mediump float
precision capability queries: 0
typed precision decisions: 0
source fingerprints: 0
typed compile results: 0
typed link results: 0
program generation fields: 0
precision-aware frame receipts: 0
```

## Proven from source

```txt
the compatibility canvas caches one wrapped context per type/options key
the WebGL proxy records shader type at createShader
shaderSource rewrites both vertex and fragment sources
the base vertex shader performs wind, outline, matrix and depth calculations
the base fragment shader performs lighting, rim and fog calculations
compile/link failures throw string errors
successful renderer snapshots omit shader and program provenance
the debug HUD reports geometry/cache state only
the Node renderer smoke does not create a WebGL context
the browser observation uses one discovered Chromium environment
```

## Existing proof

Current checks prove:

```txt
render-plan structure validates
CPU mesh buffers are internally consistent
animation time does not change topology
one Chromium can produce a non-fatal screenshot when available
```

Current checks do not prove:

```txt
stage precision capability
required/preferred/fallback policy
precision equivalence across WebGL1/WebGL2
original/normalized source identity
compile and link result provenance
context-restoration readmission
program generation
first-frame shader provenance
```

## Execution status

```txt
runtime source changed: no
renderer source changed: no
shader source changed: no
package scripts changed: no
dependencies changed: no
render output changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check executed: no
shader policy fixtures available: no
real WebGL precision matrix available: no
context restoration precision fixture available: no
first-frame shader provenance fixture available: no
```

## Required fixtures

```txt
policy fixture:
  feed vertex and fragment capability matrices
  assert Accepted, Degraded or Rejected
  assert deterministic decision fingerprint

normalization fixture:
  preserve original source
  inject only the decided stage precision
  fingerprint normalized source

compile/link fixture:
  compile exact normalized sources
  capture stage result and driver log
  link ordered shader results
  publish one program generation

context restoration fixture:
  lose and restore context
  query capabilities again
  reject predecessor program generation
  acknowledge first frame from restored generation
```

## Future commands

```bash
npm run fixture:shader-precision-policy
npm run fixture:shader-source-normalization
npm run fixture:shader-compile-link
npm run fixture:shader-context-restore
npm run smoke:shader-webgl1
npm run smoke:shader-webgl2
npm run smoke:shader-pages
npm run check
```

## Completion boundary

Do not claim shader precision correctness from a successful screenshot alone. Completion requires capability evidence, an admitted stage decision, exact source/program identity and first-frame provenance.
