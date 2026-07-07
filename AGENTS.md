# AGENTS.md

## Prime directive

Treat `IntoTheMeadow` as a DSK-composed publishable game repo.

```txt
Find the domain.
Find the DSK.
Reuse external kits before creating local behavior.
Keep game-specific content in this repo.
Keep generic reusable systems in ProtoKits.
Validate before claiming success.
```

## Repo role

This repo owns:

- game manifest
- DSK registry
- game-specific DSK composition
- authored meadow scenes
- story, objectives, interaction targets
- browser/deploy host
- validation tests

This repo does not permanently own:

- generic meadow generation
- generic terrain texturing
- generic wind fields
- generic GPU grass rendering
- engine runtime contracts

## Validation minimum

Before reporting completion, run or preserve:

```bash
npm run check
```

If a browser-only change cannot be fully checked headlessly, document the manual route and exposed `GameHost` state.
