# Architecture Audit — RenderParity + Gameplay Source Contract

**Timestamp:** `2026-07-09T03-35-07-04-00`

## Current architecture

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> src/content/game-manifest.js
  -> external meadow-area-kit
  -> external meadow-webgl-render-kit
  -> src/game/create-into-the-meadow-game.js
  -> src/boot/install-dsks.js
  -> src/dsks/index.js
  -> src/game/enhance-render-plan.js
  -> src/game/game-state.js
  -> src/game/game-snapshot.js
  -> exposeGameHost(...)
```

## DSK/domain breakdown

```txt
into-the-meadow-root
├─ route-shell-domain
│  ├─ index.html
│  ├─ canvas surface
│  ├─ loading surface
│  └─ debug HUD shell
├─ web-host-domain
│  ├─ startWebHost service
│  ├─ external kit loader service
│  ├─ frame-loop service
│  ├─ render invocation service
│  ├─ host snapshot service
│  └─ debug status service
├─ game-composition-domain
│  ├─ createIntoTheMeadowGame service
│  ├─ manifest binding service
│  ├─ DSK install service
│  ├─ content descriptor service
│  ├─ diagnostics service
│  └─ snapshot service
├─ meadow-area-domain
│  ├─ arrival meadow descriptor
│  ├─ fallback meadow kit
│  ├─ external meadow-area adapter
│  └─ render-plan service
├─ render-enhancement-domain
│  ├─ object filtering service
│  ├─ outline policy service
│  ├─ grass system service
│  ├─ wind field service
│  ├─ post-process service
│  └─ render stats service
├─ grass-system-domain
│  ├─ density texture kit
│  ├─ clump archetype kit
│  ├─ static batch kit
│  ├─ patch placement kit
│  ├─ instancing render kit
│  ├─ shader wind kit
│  ├─ LOD policy kit
│  ├─ density scaling kit
│  └─ debug visualization kit
├─ gameplay-domain
│  ├─ initial state service
│  ├─ tick reducer service
│  ├─ player state placeholder
│  ├─ progression descriptor surface
│  └─ next ActionResult service
├─ objective-interaction-domain
│  ├─ walk-the-path objective
│  ├─ inspect-tree objective
│  ├─ arrival-path target
│  └─ focal-tree target
├─ render-consumer-proof-domain
│  ├─ expected descriptor collector
│  ├─ renderer snapshot normalizer
│  ├─ descriptor parity rows
│  ├─ grass consumption rows
│  └─ GameHost renderParity projection
└─ fixture-validation-domain
   ├─ render parity fixture
   ├─ gameplay action replay fixture
   ├─ fixture manifest rows
   └─ npm check splice
```

## Current source authority

`src/content/game-manifest.js` owns route identity, public URL, default scene, and CDN kit URLs.

`src/content/dsk-registry.js` owns local DSK identity and required active v0.1 DSKs.

`src/dsks/index.js` owns descriptor labels, service lists, validation, and snapshot projection.

`src/content/meadow-areas/arrival-meadow.js` owns the arrival meadow source descriptor.

`src/content/objectives/arrival-objectives.js` and `src/content/interaction-targets/arrival-targets.js` own the first gameplay source descriptors.

## Current services

```txt
manifest route service
external kit URL service
external kit import service
game factory service
DSK registry service
DSK validation service
meadow area render-plan service
fallback render-plan service
render-plan enhancement service
grass system descriptor service
wind-field descriptor service
post-process descriptor service
performance policy service
tick state service
game snapshot service
diagnostics service
GameHost exposure service
```

## Missing next services

```txt
render parity reason service
expected descriptor collection service
renderer snapshot compatibility service
descriptor parity comparison service
grass consumption row service
GameHost renderParity projection service
ActionFrame normalization service
ActionResult construction service
path-progress reducer service
inspect-target reducer service
objective completion service
snapshot.gameplay projection service
DOM-free fixture row service
npm check fixture runner service
```

## Boundary decision

Keep the publish repo as the source of local proof contracts.

Do not move reusable meadow renderer logic into this repo permanently.

Do not rewrite `meadow-webgl-render-kit` from here.

The next implementation should add additive consumer contracts around existing host and game seams.
