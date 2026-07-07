export function createGameSnapshot(game) {
  return Object.freeze({
    id: "into-the-meadow.snapshot",
    build: game.manifest.build,
    manifest: game.manifest,
    state: game.getState(),
    renderPlan: game.getRenderPlan(),
    diagnostics: game.getDiagnostics()
  });
}

export function validateGameSnapshot(snapshot) {
  const failures = [];
  if (!snapshot?.manifest?.id) failures.push("manifest missing");
  if (!snapshot?.state?.activeSceneId) failures.push("active scene missing");
  if (!snapshot?.renderPlan?.id) failures.push("render plan missing");
  if (!snapshot?.diagnostics?.validation?.passed) failures.push("diagnostics failed");
  return Object.freeze({ passed: failures.length === 0, failures });
}
