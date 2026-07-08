export function createGrassDebugVisualizationKit(config = {}) {
  return Object.freeze({
    id: "grass-debug-visualization-kit",
    enabled: Boolean(config.enabled ?? false),
    channels: Object.freeze(["density", "patches", "instances", "lod", "suppression"]),
    createDebugSummary(grassSystem = {}) {
      return Object.freeze({
        densityResolution: grassSystem.densityTexture?.resolution ?? null,
        staticBatchCount: grassSystem.staticBatches?.length ?? 0,
        patchCount: grassSystem.patches?.length ?? 0,
        drawGroupCount: grassSystem.drawGroups?.length ?? 0,
        estimatedCards: grassSystem.staticBatches?.reduce?.((sum, batch) => sum + Number(batch.cardCount ?? 0), 0) ?? 0
      });
    }
  });
}
