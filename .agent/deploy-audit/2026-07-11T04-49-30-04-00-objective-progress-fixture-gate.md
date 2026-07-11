# Objective Progress Fixture Gate

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T04-49-30-04-00`

## Deployment gate

The Pages workflow must not deploy a route that renders successfully but cannot complete its authored objectives.

## Required CI fixtures

```txt
fixture:interaction-path
fixture:interaction-inspect
fixture:objective-story
fixture:interaction-replay
```

## Minimum path fixture

```txt
create canonical game
dispatch progress below 0.25
cross 0.25 and assert one story transition
cross 0.35 and assert one objective completion
repeat command ID and assert no mutation
reset and assert canonical state
```

## Minimum inspect fixture

```txt
reject unknown target
reject out-of-range focal tree
accept in-range focal tree
complete inspect objective exactly once
emit focal-tree story exactly once
repeat and assert no duplicate mutation
```

## Host parity fixture

Run the same command list through:

```txt
direct game API
GameHost
browser editor environment
Node headless editor environment
```

All paths must produce semantically identical result rows and final progression fingerprints.

## Browser smoke

```txt
boot production provider
wait for committed frame
dispatch supported command through editor/host
observe typed result
observe objective/story state
observe matching feedback projection
assert no browser errors
```

## Gate order

```txt
source-provider parity
interaction fixtures
committed-frame observation
browser production smoke
npm run check
Pages deploy
```

## Current status

```txt
fixtures implemented: no
npm run check executed in this docs pass: no
browser smoke executed: no
deployment workflow changed: no
```
