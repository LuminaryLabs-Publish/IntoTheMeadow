# Interaction and Objective Fixture Gate

## Summary

Current CI can pass while both authored objectives remain impossible. The deployment gate needs behavioral fixtures and one browser proof, not additional source-pattern assertions.

## Existing check surface

```txt
static smoke
DSK registry smoke
render-plan smoke
renderer-v2 smoke
deterministic scene smoke
headless editor environment smoke
headless editor command smoke
headless editor loop smoke
```

## Missing gate

```txt
DOM-free interaction/objective fixture
browser interaction-ingress smoke
browser/editor command parity fixture
reset and stale-command fixture
committed-frame progression acknowledgement
Pages smoke that completes the authored loop
```

## Required fixture cases

1. Start from the canonical initial state.
2. Submit path progress below `0.35`; assert incomplete.
3. Submit accepted progress at `0.35`; assert exactly-one completion receipt.
4. Assert `inspect-tree` becomes active.
5. Submit `inspect` for `focal-tree`; assert exactly-one completion.
6. Repeat the same inspect; assert no mutation.
7. Reset; assert new epoch and initial progression.
8. Submit an old-epoch command; assert rejection.
9. Run equivalent browser and editor commands; compare results.
10. Confirm the first committed browser frame cites the new progression revision.

## Proposed commands

```bash
npm run fixture:interaction-objective
npm run fixture:interaction-ingress-parity
npm run fixture:interaction-reset-retirement
npm run smoke:browser-objectives
npm run check
```

## Release rule

Do not describe the deployed route as a playable exploration/objective game until the Pages build can complete `walk-the-path` and `inspect-tree` through the same domain authority used by the fixtures.
