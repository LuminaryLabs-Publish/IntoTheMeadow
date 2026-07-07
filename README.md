# Into The Meadow

`IntoTheMeadow` is a publishable DSK-composed meadow exploration game.

The repo is intentionally split as a game/deploy repo, not a generic kit foundry. It consumes reusable meadow infrastructure from `NexusRealtime-ProtoKits` and owns the game-specific composition, story, progression, content, validation, and deployment surface.

## Architecture rule

```txt
IntoTheMeadow owns the game.
ProtoKits own reusable meadow systems.
NexusEngine owns runtime/DSK contracts.
```

## Current milestone

This first implementation creates the v0.1 DSK scaffold and browser proof:

- root `index.html` route
- game manifest
- DSK registry
- local DSK descriptors
- meadow area bridge
- render host bridge
- diagnostics validation
- static tests
- GitHub Pages workflow

## External kits

The launch route imports:

```txt
https://cdn.jsdelivr.net/gh/LuminaryLabs-Agents/NexusRealtime-ProtoKits@main/protokits/meadow-area-kit/index.js
https://cdn.jsdelivr.net/gh/LuminaryLabs-Agents/NexusRealtime-ProtoKits@main/protokits/meadow-webgl-render-kit/index.js
```

## Local scripts

```bash
npm run check
```

## GameHost

The browser host exposes:

```js
window.GameHost.getState()
window.GameHost.getSnapshot()
window.GameHost.getDiagnostics()
```

## Next milestones

1. Add explorable first-person player/camera/input DSKs.
2. Add interaction, objective, and story DSK runtime behavior.
3. Promote grass patches, shader wind, and terrain texturing into reusable ProtoKits.
