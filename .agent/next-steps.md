# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T05-31-59-04-00`

## Goal

Replace the unconditional graphics-shader rewrite with one stage-aware policy that is re-evaluated for every WebGL context generation and observable through compile, link and visible-frame receipts.

## Plan ledger

- [ ] Preserve the current shader math and visual intent.
- [ ] Complete Runtime Session Lifecycle and WebGL Context Recovery foundations first.
- [ ] Add a context capability snapshot using `getShaderPrecisionFormat()`.
- [ ] Record capability evidence separately for vertex and fragment stages.
- [ ] Define required, preferred and fallback precision policy.
- [ ] Replace the global rewrite with a stage-specific normalization result.
- [ ] Fingerprint original and normalized sources.
- [ ] Return typed shader compile results with stage, source fingerprint and logs.
- [ ] Return a typed program link result with ordered shader identities.
- [ ] Allocate a program generation after successful admission.
- [ ] Include context generation, program generation and precision decisions in renderer snapshots.
- [ ] Re-run precision admission after context restoration.
- [ ] Correlate first rendered frame and editor capture with program generation.
- [ ] Add DOM-free normalization and policy fixtures to `npm run check`.
- [ ] Add real WebGL1/WebGL2 browser matrix smoke tests.
- [ ] Add deployed Pages shader provenance verification.

## Existing owners to update first

```txt
src/renderers/meadow-webgl-renderer-v2-compatible.js
src/renderers/meadow-webgl-renderer-v2.js
src/hosts/web-host.js
src/editor/install-editor-bridge.js
tests/renderer-v2-smoke.mjs
scripts/run-browser-observation.mjs
meadow-webgl-renderer-v2-kit
meadow-render-host-dsk
meadow-diagnostics-dsk
WebGL Context Recovery Authority
Committed Frame Observation Authority
```

## Candidate coordinating kits

```txt
shader-stage-identity-kit
graphics-context-capability-snapshot-kit
float-precision-capability-kit
shader-precision-policy-kit
shader-source-normalization-kit
shader-source-fingerprint-kit
shader-precision-decision-kit
shader-compile-result-kit
shader-program-link-result-kit
shader-program-generation-kit
shader-precision-observation-kit
shader-precision-journal-kit
first-frame-shader-provenance-kit
shader-precision-fixture-kit
browser-shader-device-matrix-smoke-kit
```

## Acceptance matrix

```txt
vertex and fragment stages receive independent capability records
original source declarations are preserved in evidence
normalization emits one deterministic source fingerprint
unsupported required precision returns Rejected before program use
supported fallback returns Degraded with explicit reason
compile failure cites stage and normalized source fingerprint
link failure cites every compiled shader result
context restoration creates a new decision and program generation
renderer snapshot cites actual context/program generations
editor capture cites the same program generation as the captured frame
WebGL1 and WebGL2 smoke results are distinguishable
same capabilities and sources produce the same decision fingerprint
```

## Ordered architecture queue

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Clock and Step Admission Authority
5. Source Provider Authority
6. Render Topology Identity Authority
6a. WebGL Context Recovery Authority
6b. Render Surface Resolution Authority
6c. Shader Precision Admission Authority
7. Committed Frame Observation Authority
7a. Fatal Runtime Failure Recovery Authority
7b. Adaptive Quality and Performance Budget Authority
7c. Grass Visibility and LOD Authority
8. Interaction Command and Objective Progression Authority
8a. Persistence Continuity Authority
9. DSK Runtime Consumption Authority
9a. Deterministic Replay Validation Authority
```

Do not add a second silent compatibility rewrite. Precision normalization must be the output of the shared admission policy.
