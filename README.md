# Into The Meadow

`IntoTheMeadow` is a publishable DSK-composed meadow exploration game.

## Architecture rule

```txt
IntoTheMeadow owns the game-specific composition and visual archetypes.
NexusEngine-ProtoKits owns reusable meadow generation.
NexusEngine owns runtime and DSK contracts.
Renderers consume validated descriptors; they do not invent fallback gameplay objects.
```

## Current milestone: render contract v2

The live route now uses a local renderer cutover instead of the old external primitive renderer:

```txt
pinned meadow-area-kit
→ cached deterministic source plan
→ cached render-plan enhancer
→ meadow-render-plan/v2
→ persistent local WebGL renderer
```

Implemented in v0.2:

- one canonical `meadow-render-plan/v2` contract
- texture-driven grass clump batches consumed by the renderer
- source flowers converted into clustered wildflower descriptors
- irregular rock archetypes rather than ellipsoid fallbacks
- branch-skeleton hero tree with leaf-card clusters
- distant tree bands with low-contrast cards
- decorative mushrooms removed from the arrival scene
- selective outlines only on the hero tree and rocks
- static source-plan, enhancement, and GPU-buffer caching
- explicit validation for unsupported descriptor types
- DOM-free renderer mesh smoke coverage

## External kit

The game imports only the deterministic meadow-area generator, pinned to a reviewed commit:

```txt
https://cdn.jsdelivr.net/gh/LuminaryLabs-Agents/NexusEngine-ProtoKits@11d245913ba4d30f3ce950eb5a17e1cc6e4aa1f5/protokits/meadow-area-kit/index.js
```

## Validation

```bash
npm run check
```

## GameHost

The browser host exposes:

```js
window.GameHost.getState()
window.GameHost.getSnapshot()
window.GameHost.getDiagnostics()
window.GameHost.getRenderPlan()
window.GameHost.getRenderSnapshot()
window.GameHost.getRenderEnhancerSnapshot()
```

Use `?debug` on the live route to display render-contract and cache diagnostics.

## Next milestones

1. Validate the visual result across desktop and mobile WebGL implementations.
2. Move reusable portions of renderer v2 upstream after the game-specific contract stabilizes.
3. Add first-person player, camera, input, interaction, story, and objective runtime behavior.
