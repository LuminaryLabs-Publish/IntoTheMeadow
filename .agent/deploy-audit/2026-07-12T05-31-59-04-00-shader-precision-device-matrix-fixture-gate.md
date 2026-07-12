# Deploy Audit: Shader Precision Device-Matrix Fixture Gate

**Timestamp:** `2026-07-12T05-31-59-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Existing deployment proof

The current browser observation launches one available Chromium, waits for a static server, captures one screenshot, dumps the DOM and checks title, editor and `gpu:` markers.

## Missing proof

```txt
explicit WebGL1 run
explicit WebGL2 run
stage precision capability capture
precision decision capture
source/program fingerprints
context restoration
device/browser matrix
first-frame program provenance
deployed Pages verification
```

## Required local fixtures

```txt
fixture:shader-precision-stage-policy
fixture:shader-source-normalization
fixture:shader-compile-link-result
fixture:shader-context-restoration-readmission
fixture:shader-program-frame-provenance
```

## Required browser matrix

At minimum record separately:

```txt
Chromium WebGL2
Chromium WebGL1 fallback
software-rendered/headless context when used
one additional browser engine when available
```

Each report must include context capabilities, selected precision, decision status, source fingerprints, compile/link results, program generation, screenshot and frame receipt.

## Gate

Pages is not shader-precision-proven until the deployed route publishes an admitted program observation and the captured frame cites the same program generation.
