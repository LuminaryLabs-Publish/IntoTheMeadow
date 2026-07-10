# Into The Meadow

`IntoTheMeadow` is a publishable DSK-composed meadow exploration game and the first full environment proof for the NexusEngine Headless Editor Runtime.

## Architecture rule

```txt
IntoTheMeadow owns game-specific composition and visual archetypes.
NexusEngine-ProtoKits owns reusable meadow generation.
NexusEngine owns runtime, DSK, and headless editor contracts.
The renderer presents validated descriptors.
The Headless Editor Runtime operates the environment through permissive capabilities.
```

## Current milestone: editor-controlled visual iteration

The live route and terminal route now share the same environment surface:

```txt
pinned meadow-area-kit
→ deterministic source plan
→ meadow-render-plan/v2
→ persistent WebGL renderer
→ GameHost
→ NexusEditorEnvironment browser bridge

nexus-editor CLI
→ core-headless-editor runtime
→ IntoTheMeadow environment capabilities
→ inspect / capture / observe / compare / loop
```

Implemented in v0.3:

- pinned NexusEngine Headless Editor Runtime dependency
- permissive runtime, scene, renderer, camera, browser, and workspace capabilities
- terminal inspection and command routing
- controllable inspect/capture/observe/compare/decide loops
- structured visual metrics and non-blocking observations
- representative local fallback scene for headless runs
- browser canvas capture through `window.NexusEditorEnvironment`
- real Chromium screenshot smoke command
- narrower grass ribbons, denser hero-tree canopy, smaller rocks, softer path transitions, richer terrain sampling, and lower outline weights

## Commands

```bash
npm install
npm run check
npm run editor:status
npm run editor:inspect
npm run editor:capture
npm run editor:loop
npm run editor:browser
```

Direct terminal examples:

```bash
npm run editor -- domains
npm run editor -- capabilities renderer
npm run editor -- call renderer.capture --label baseline
npm run editor -- loop create "Improve the meadow"
```

Generated evidence is written to `.artifacts/headless-editor/` and is not committed by default.

## Browser surfaces

```js
window.GameHost.getState()
window.GameHost.getSnapshot()
window.GameHost.getDiagnostics()
window.GameHost.getRenderPlan()
window.GameHost.getRenderSnapshot()
window.GameHost.getRenderEnhancerSnapshot()

window.NexusEditorEnvironment.listCapabilities()
window.NexusEditorEnvironment.invoke("renderer.capture")
window.NexusEditorEnvironment.snapshot()
```

Use `?debug` on the live route to display render-contract, cache, and editor protocol diagnostics.

## External kit

The deterministic meadow-area generator remains pinned to:

```txt
https://cdn.jsdelivr.net/gh/LuminaryLabs-Agents/NexusEngine-ProtoKits@11d245913ba4d30f3ce950eb5a17e1cc6e4aa1f5/protokits/meadow-area-kit/index.js
```

## Next milestones

1. Connect a browser-driver transport directly to `NexusEditorEnvironment` for interactive remote terminal sessions.
2. Review real browser capture artifacts before accepting further visual iterations.
3. Add first-person movement, interaction, story, and objective runtime behavior through DSKs.
