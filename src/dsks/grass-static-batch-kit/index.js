export function createGrassStaticBatchKit(config = {}) {
  function createBatch(archetype, lod = "near") {
    const lodCardLimit = lod === "near" ? archetype.cardCount : lod === "mid" ? Math.min(32, archetype.cardCount) : lod === "far" ? 4 : 0;
    const cards = Object.freeze(archetype.localCards.slice(0, lodCardLimit));
    const vertexCount = cards.length * 4;
    const indexCount = cards.length * 6;
    return Object.freeze({
      id: `${archetype.id}-${lod}`,
      type: "grass-static-batch",
      archetypeId: archetype.id,
      family: archetype.family,
      lod,
      atlas: archetype.textureAtlas,
      cardCount: cards.length,
      cards,
      vertexCount,
      indexCount,
      boundsRadius: archetype.radius,
      material: Object.freeze({ alphaCutoff: Number(config.alphaCutoff ?? 0.42), doubleSided: true, alphaToCoverage: true, windShader: "grass-shader-wind" })
    });
  }

  function createBatches(archetypes = []) {
    return Object.freeze(archetypes.flatMap((archetype) => [createBatch(archetype, "near"), createBatch(archetype, "mid"), createBatch(archetype, "far")]));
  }

  return Object.freeze({
    id: "grass-static-batch-kit",
    createBatch,
    createBatches,
    validate(batches = []) {
      const failures = [];
      for (const batch of batches) {
        if (batch.cardCount < 0) failures.push(`${batch.id} invalid card count`);
        if (batch.vertexCount !== batch.cardCount * 4) failures.push(`${batch.id} invalid vertex count`);
      }
      return Object.freeze({ passed: failures.length === 0, failures });
    }
  });
}
