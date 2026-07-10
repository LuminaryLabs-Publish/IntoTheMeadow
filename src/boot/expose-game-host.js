export function exposeGameHost(game, target = globalThis) {
  const getRenderPlan = typeof game.getRenderPlan === "function" ? () => game.getRenderPlan() : () => null;
  const getRenderSnapshot = typeof game.getRenderSnapshot === "function"
    ? () => game.getRenderSnapshot()
    : () => game.renderer?.getSnapshot?.() ?? null;
  const getRenderEnhancerSnapshot = typeof game.getRenderEnhancerSnapshot === "function"
    ? () => game.getRenderEnhancerSnapshot()
    : () => game.planEnhancer?.getSnapshot?.() ?? null;

  target.GameHost = Object.freeze({
    build: game.manifest.build,
    getState: () => game.getState(),
    getSnapshot: () => game.getSnapshot(),
    getDiagnostics: () => game.getDiagnostics(),
    getRenderPlan,
    getRenderSnapshot,
    getRenderEnhancerSnapshot,
    game
  });
  return target.GameHost;
}
