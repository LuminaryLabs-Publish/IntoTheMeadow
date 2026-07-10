# Interaction audit: target action result attribution map

Timestamp: 2026-07-10T13-50-05-04-00

## Interaction surface

The interaction surface is descriptor-led: targets, actions, objectives, and editor/runtime capabilities provide the semantic route. The browser host and renderer project those descriptors into the meadow.

## Missing result map

The repo still needs a result map that can answer:

- which target was considered;
- which action was offered;
- which source row authorized it;
- whether preflight accepted or rejected it;
- why an action was skipped or unsupported;
- which objective row changed;
- how the result appears in GameHost and editor readback.

## Why this matters

The project already has useful source descriptors. The next safety improvement is not more interaction content; it is proving that existing target/action rows survive the route into runtime, renderer, and editor readback.

## Fixture target

Create a headless target-action fixture with one accepted action, one rejected action, one unsupported row, and one objective-progress row. Export the results through a stable GameHost proof surface.
