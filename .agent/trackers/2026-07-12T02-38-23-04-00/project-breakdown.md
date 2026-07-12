# Project Breakdown: IntoTheMeadow Interaction and Progression Reachability

**Timestamp:** `2026-07-12T02-38-23-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`

## Plan ledger

**Goal:** trace the authored path and tree progression from content through runtime commands, state commits, observations and visible frames, then define the missing authority without changing runtime source.

- [x] Compare ten Publish repositories with nine eligible central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Avoid active unsynchronized work in `TheOpenAbove`.
- [x] Select only `IntoTheMeadow`.
- [x] Read repository guidance and current audit state.
- [x] Trace objectives, targets, story beats, state, tick, reset, host, editor and checks.
- [x] Inventory one external kit and 43 local declarations.
- [x] Identify every offered service.
- [x] Define a parent authority, candidate kits, result schema and fixture gate.
- [x] Update root `.agent` routing documents and machine registry.
- [ ] Runtime implementation and fixture execution remain future work.

## Product interaction loop

```txt
open page
  -> load provider and authored arrival meadow
  -> create initial player/progression state
  -> start RAF
  -> tick frame counter
  -> render meadow
  -> no product action changes player or progression
```

## Authored progression graph

```txt
arrival story beat
  -> move along arrival-path
  -> path-discovery story beat at progress 0.25
  -> complete walk-the-path at progress 0.35
  -> inspect focal-tree inside admitted radius
  -> complete inspect-tree
  -> focal-tree story beat
```

The graph exists only as content. No runtime service performs these transitions.

## Source trace

```txt
src/content/objectives/arrival-objectives.js
  -> 2 authored objective rules
src/content/interaction-targets/arrival-targets.js
  -> arrival-path and focal-tree descriptors
src/content/story/story-beats.js
  -> arrival, path-discovery and focal-tree triggers
src/game/game-state.js
  -> initial player/progression state
  -> advanceGameState mutates frame and lastTick only
src/game/create-into-the-meadow-game.js
  -> exposes content/read/tick/reset, no command authority
src/hosts/web-host.js
  -> RAF/render only, no gameplay input adapter
src/boot/expose-game-host.js
  -> read methods plus raw game owner
src/editor/install-editor-bridge.js
  -> tick/reset/read/render/capture capabilities only
```

## Domains in use

```txt
provider and DSK composition
game state, tick, reset and snapshot
player, input and path declarations
interaction target and inspect declarations
objective and story declarations
browser host, public host and editor adapters
meadow world generation and render plan
WebGL rendering and frame observation
validation and deployment
```

## Kit inventory

```txt
external: meadow-area-kit
local: 43 DSK/kit declarations
total: 44
```

The exact service map is retained in `.agent/current-audit.md` and `.agent/kit-registry.json`.

## Main finding

```txt
content exists
state fields exist
DSK service names exist
runtime command path does not exist
runtime progression commit does not exist
normal player cannot complete either objective
```

## Required parent domain

```txt
meadow-interaction-objective-progression-authority-domain
```

It must own command identity and sequencing, player movement proposals, spatial path/target evidence, objective/story evaluation, one atomic commit, clone-safe observation and first-visible-frame acknowledgement.

## Validation

```txt
documentation changed: yes
runtime changed: no
renderer changed: no
package changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
progression fixtures: unavailable
browser/Pages smoke: not run
```
