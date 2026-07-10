# AGENTS.md

## Prime directive

Treat `IntoTheMeadow` as a DSK-composed publishable game repo.

```txt
Find the domain.
Find the DSK.
Reuse external kits before creating local behavior.
Keep game-specific content and renderer adapters in this repo.
Keep generic reusable systems in ProtoKits.
Validate before claiming success.
```

## Repo role

This repo owns:

- game manifest
- DSK registry
- game-specific DSK composition
- authored meadow scenes and visual archetypes
- the validated game render-plan contract
- the game-specific WebGL renderer adapter
- story, objectives, interaction targets
- browser/deploy host
- validation tests

This repo does not permanently own:

- generic meadow generation
- generic terrain texturing APIs
- generic wind-field APIs
- engine runtime contracts

The local renderer v2 is an implementation-backed game adapter. Reusable portions may be promoted to `NexusEngine-ProtoKits` only after its descriptor contract is stable and multi-configuration validation exists.

## Render boundary

```txt
Source kit generates deterministic feature data.
Composition converts features into meadow-render-plan/v2 descriptors.
Renderer consumes only registered descriptor families.
Unknown descriptor families fail validation.
Static topology and GPU buffers rebuild only when topologyKey changes.
```

Do not restore generic `drawSimple()` fallbacks for flowers, rocks, mushrooms, trees, or future asset types.

## Validation minimum

Before reporting completion, run or preserve:

```bash
npm run check
```

Browser-only changes must retain visible failure output and expose render-plan, renderer, and cache state through `GameHost`.
