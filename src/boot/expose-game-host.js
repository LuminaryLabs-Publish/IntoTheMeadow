export function exposeGameHost(game, target = globalThis) {
  target.GameHost = Object.freeze({
    build: game.manifest.build,
    getState: () => game.getState(),
    getSnapshot: () => game.getSnapshot(),
    getDiagnostics: () => game.getDiagnostics(),
    game
  });
  return target.GameHost;
}
