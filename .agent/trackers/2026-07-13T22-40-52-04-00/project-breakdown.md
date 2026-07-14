# Project Breakdown: IntoTheMeadow Browser Observation Evidence Authority

**Timestamp:** `2026-07-13T22-40-52-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Repository head reviewed:** `db9bd0127fcb28a2b37706ca32cc7b201a646d17`  
**Status:** `browser-observation-evidence-authority-audited`

## Summary

IntoTheMeadow has a useful real-Chromium observation command, but its evidence is assembled from two independent browser processes and one loosely admitted local server. The screenshot, DOM dump, renderer marker and report do not share one browser session, page generation, renderer frame, artifact attempt or content fingerprint.

A run can also accept an unrelated process already serving the fixed port, retain stale artifacts from a predecessor attempt and terminate its spawned server without waiting for a retirement receipt. The current report proves that files and text markers existed, not that one exact repository revision produced one coherent observed frame.

## Plan ledger

**Goal:** define one browser-observation transaction that owns the local server, one browser page, one admitted renderer frame, correlated DOM/canvas/screenshot artifacts, immutable provenance and terminal process retirement.

- [x] Enumerate all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare the nine eligible repositories with the central ledger.
- [x] Confirm every eligible repository head matches its recorded repo-local documentation head.
- [x] Select only `LuminaryLabs-Publish/IntoTheMeadow` by the oldest eligible timestamp.
- [x] Read the browser observation runner, page shell, boot module, web host, editor bridge, package scripts and static smoke.
- [x] Trace server launch, route admission, browser launch, readiness markers, screenshot capture, DOM capture, report writing and cleanup.
- [x] Identify the complete interaction loop and all domains in use.
- [x] Preserve all 44 declared kit surfaces and their offered services.
- [x] Document five browser-observation adapters outside the DSK census.
- [x] Define the 24-surface browser-observation evidence authority family.
- [x] Add the timestamped architecture, render, gameplay, interaction, browser-observation, deploy and central-sync audits.
- [x] Change documentation only.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement and execute one-page correlated browser evidence later.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
root .agent states: 9
new eligible repositories: 0
ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
repo-local heads newer than central documentation heads: 0

IntoTheMeadow      2026-07-13T16-01-05-04-00 selected
HorrorCorridor     2026-07-13T17-40-04-04-00
ZombieOrchard      2026-07-13T18-00-38-04-00
MyCozyIsland       2026-07-13T19-40-56-04-00
TheUnmappedHouse   2026-07-13T19-58-19-04-00
AetherVale         2026-07-13T20-40-15-04-00
PhantomCommand     2026-07-13T21-02-54-04-00
PrehistoricRush    2026-07-13T21-38-52-04-00
TheOpenAbove       2026-07-13T21-58-55-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/IntoTheMeadow` was modified in the Publish organization.

## Complete interaction loop

```txt
operator runs npm run editor:browser
  -> resolve .artifacts/headless-editor/browser
  -> locate a Chromium-compatible binary
  -> choose PORT or fixed default 4173
  -> spawn python3 -m http.server
  -> poll the route until any successful HTTP response arrives

screenshot observation process
  -> launch a new headless Chromium process
  -> boot the page and external meadow provider
  -> construct game, renderer, enhancer and editor bridge
  -> advance under a 9000 ms virtual-time budget
  -> write arrival-wide.png
  -> accept nonzero process success and file existence

DOM observation process
  -> launch a second new headless Chromium process
  -> independently boot provider, game, renderer and editor bridge
  -> dump the DOM after another virtual-time budget
  -> reject known fatal text and boot text
  -> require title, editor protocol marker and gpu: text

artifact settlement
  -> accept screenshot byte size >= 10000
  -> write fixed-name logs, DOM and report.json
  -> report screenshot and DOM facts as one observation
  -> send SIGTERM to the spawned server
  -> do not await browser/server retirement or prove server ownership
```

## Main findings

### Server admission does not prove server ownership

The runner spawns `python3 -m http.server` on a fixed default port, then `waitForServer()` accepts any successful response from the URL. It does not require the spawned child to remain alive, verify a server generation, inspect the served repository revision or prove the response came from that child. A pre-existing process on port 4173 can satisfy the readiness check after the new server fails to bind.

### Screenshot and DOM evidence come from different page instances

The screenshot and DOM dump use two separate synchronous Chromium invocations. Each invocation independently imports the provider, creates the game, creates WebGL resources, advances frames and installs an editor bridge. Their evidence cannot prove the same game state, renderer generation or visible frame.

### Readiness is marker-based, not frame-admitted

The DOM run treats the presence of `gpu:` as a completed renderer frame. The screenshot run has no readiness predicate beyond Chromium completion and file creation. Neither result cites a renderer frame ID, game revision, render-plan revision, mesh generation, GPU generation or editor snapshot.

### Screenshot validation is not semantic

The screenshot is accepted from process status, file existence and a 10000-byte minimum. No image dimensions, hash, entropy, blank-frame detection, expected pixel regions or same-page canvas capture are recorded.

### Fixed artifact names permit stale evidence

The runner reuses one directory and fixed names. It does not create a per-attempt directory, clear or quarantine predecessor files, write through temporary files or atomically promote a completed artifact manifest. A failed successor can leave a previous report, screenshot or DOM beside new partial logs.

### Provenance is incomplete

`report.json` records browser path, URL, screenshot path, size and booleans. It omits repository commit, working-tree state, provider URL and commit, browser version/hash, server PID, port ownership, attempt ID, page generation, timestamps, viewport receipt, renderer snapshot and artifact hashes.

### Process retirement is not settled

The `finally` block sends `SIGTERM` but does not await child exit, record exit status, escalate after timeout or return a retirement receipt. Browser processes are synchronous and terminal, but their version and exit metadata are not joined to the report.

### The browser observation is outside the default proof chain

`npm run check` executes static, registry, render, deterministic and headless-editor smokes. It does not execute `editor:browser`. The static smoke verifies that the script and package entry exist, not that real browser evidence is coherent.

### A same-page capture capability already exists

`NexusEditorEnvironment.invoke("renderer.capture")` can return the actual canvas data URL and renderer snapshot from one page. The observation runner does not drive that bridge, so it discards the strongest existing path to correlate renderer state and captured pixels.

## Domains in use

```txt
repository revision and provider-manifest identity
Node process and filesystem lifecycle
browser binary discovery and fingerprinting
local HTTP server binding, readiness and retirement
port ownership and origin admission
Chromium process, browser session and page lifecycle
external module/provider admission
web-host boot and fatal projection
immutable game state and render-plan enhancement
WebGL context, CPU mesh, GPU buffers and visible frames
editor bridge capability admission and browser-error capture
DOM, canvas and full-page image observation
artifact attempt directories, hashing, promotion and quarantine
observation result classification and public readback
static smoke, headless proof, build and Pages deployment
repo-local and central audit tracking
```

## Kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
browser-observation adapters outside DSK census: 5
planned observation-authority surfaces including parent: 24
```

## Complete kit and offered-service inventory

| Kit | Offered services |
|---|---|
| `meadow-area-kit` | area, path and style normalization; deterministic scatter; feature descriptors; render-plan generation; validation; snapshot; reset; runtime adaptation |
| `into-the-meadow-game-dsk` | manifest; kit stack; state root; boot sequence; game snapshot |
| `web-host-dsk` | document shell; browser loop; debug host; asset loading; browser safety |
| `game-composition-dsk` | DSK registry; scene, render and simulation composition; composition validation |
| `meadow-area-bridge-dsk` | meadow and feature configuration; provider adapter; area state; area validation |
| `meadow-terrain-texture-dsk` | terrain model; material and path layers; terrain sampling; validation |
| `path-corridor-dsk` | path curve; walkable corridor; detail; progression; validation |
| `grass-density-texture-kit` | density texture; channels; compositor; sampler; validation |
| `grass-clump-archetype-kit` | clump registry; card layout; atlas binding; variants; validation |
| `grass-static-batch-kit` | clump mesh; variant cache; atlas material; static LOD; validation |
| `grass-patch-placement-kit` | patch grid; density placement; instance selection and buffers; validation |
| `grass-clump-instancing-render-kit` | batch registry; instance stream; draw groups; shader binding; validation |
| `grass-shader-wind-kit` | wind uniforms; tip bend; phase field; gust response; validation |
| `grass-lod-policy-kit` | near, mid, far and terrain-tint LOD; validation |
| `grass-density-scaling-kit` | quality, budget, density and profile scaling; validation |
| `grass-debug-visualization-kit` | density, patch, instance and LOD views; validation |
| `grass-patch-dsk` | patch grid; blade distribution; terrain awareness; wind binding; validation |
| `gpu-grass-render-dsk` | instance buffers; blade mesh; shader wind; LOD rendering; validation |
| `wind-field-dsk` | wind state; sampler; zones; consumers; validation |
| `tree-object-dsk` | focal tree; tree line; materials; wind binding; validation |
| `meadow-scatter-dsk` | flower, rock and mushroom scatter; placement rules; validation |
| `meadow-atmosphere-dsk` | sky, sun, clouds, distant hills and validation |
| `meadow-player-dsk` | player state; movement; terrain contact; actions; validation |
| `meadow-camera-dsk` | camera mode; rig; collision; feel; validation |
| `meadow-input-dsk` | action map; bindings; contexts; normalization; validation |
| `meadow-interaction-dsk` | interactable registry; affordances; inspection; events; validation |
| `meadow-story-dsk` | story state; beats; dialogue; sequences; validation |
| `meadow-objective-dsk` | objective model; flow; completion; feedback; validation |
| `meadow-ecology-dsk` | ambient life; zones; triggers; non-gameplay agents; validation |
| `meadow-audio-dsk` | ambient bed; spatial cues; audio state and events; validation |
| `meadow-ui-dsk` | HUD; story panel; debug UI; UI state; validation |
| `meadow-save-dsk` | save model; slots; persistence; migration; validation |
| `meadow-diagnostics-dsk` | runtime health; render health; determinism; smoke reports |
| `meadow-performance-dsk` | quality profile; budgets; LOD; adaptive scaling; validation |
| `meadow-render-host-dsk` | renderer selection; plan ingest; pass order; state; validation |
| `meadow-webgl-renderer-v2-kit` | context; shaders; attributes; uniforms; CPU mesh ingest; GPU buffers; draw; resize; snapshot; disposal |
| `post-process-stack-dsk` | pass registry; targets; outline; color grade; validation |
| `render-target-kit` | scene color, depth, normal and ping-pong buffers; resize policy |
| `sobel-outline-pass-kit` | color, depth and normal thresholds; outline color; object mask |
| `color-grade-pass-kit` | warmth; contrast; saturation; shadow and highlight tint |
| `depth-fog-pass-kit` | fog range; color; distance curve; horizon haze |
| `vignette-pass-kit` | radius; softness; strength; center; quality tier |
| `final-composite-pass-kit` | scene/post inputs; output; debug overlay; fallback composite |
| `static-pages-deploy-dsk` | build configuration; Pages workflow; artifacts; cache invalidation; deploy validation |

## Browser-observation adapters

| Adapter | Current service |
|---|---|
| `browser-observation-runner-adapter` | coordinates binary discovery, server, browser commands, artifact checks and report writing |
| `python-static-server-adapter` | serves the repository root on loopback |
| `chromium-process-adapter` | launches headless screenshot and DOM processes |
| `browser-artifact-writer-adapter` | writes screenshot, DOM, process logs and JSON report |
| `browser-observation-report-adapter` | projects marker and byte-size facts into one report |

## Required parent domain

```txt
meadow-browser-observation-evidence-authority-domain
```

## Required transaction

```txt
BrowserObservationCommand
  -> bind RepositoryRevision, ProviderManifestFingerprint and ObservationPolicyRevision
  -> allocate ObservationAttemptId, ServerGeneration and BrowserSessionGeneration
  -> reserve a port and prove the spawned server owns it
  -> verify the exact expected document and module graph are served
  -> fingerprint the browser executable and effective launch policy
  -> launch one browser session and one page generation
  -> wait for the editor bridge, zero browser errors and an admitted renderer frame
  -> capture DOM, editor snapshot, canvas image and screenshot from that same page
  -> bind every artifact to the same frame and attempt
  -> calculate artifact hashes and semantic image checks
  -> write into an isolated temporary attempt directory
  -> atomically promote one immutable ObservationArtifactManifest
  -> close page and browser, stop server and await terminal receipts
  -> publish BrowserObservationResult
```

## Planned coordinating kits

```txt
meadow-browser-observation-evidence-authority-domain
browser-observation-command-kit
browser-observation-attempt-kit
repository-revision-evidence-kit
provider-manifest-fingerprint-kit
browser-binary-fingerprint-kit
server-port-reservation-kit
local-server-generation-kit
server-origin-admission-kit
browser-session-lifecycle-kit
browser-page-generation-kit
route-readiness-barrier-kit
editor-bridge-readiness-probe-kit
renderer-frame-admission-kit
browser-error-drain-kit
same-page-dom-capture-kit
same-page-canvas-capture-kit
same-page-screenshot-kit
observation-artifact-hash-kit
observation-artifact-manifest-kit
attempt-directory-promotion-kit
stale-artifact-quarantine-kit
process-retirement-receipt-kit
browser-observation-result-kit
browser-observation-fixture-gate-kit
```

## Validation boundary

Documentation and source analysis only. No browser was launched, no port was reserved, no artifacts were generated, no stale-artifact case was injected, no process retirement was observed and no build or Pages route was tested.