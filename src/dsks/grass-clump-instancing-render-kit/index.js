export function createGrassClumpInstancingRenderKit(config = {}) {
  function createDrawGroups({ staticBatches = [], patches = [] } = {}) {
    const batchesById = new Map(staticBatches.map((batch) => [batch.id, batch]));
    const groups = new Map();
    for (const patch of patches) {
      for (const instance of patch.instances ?? []) {
        const batch = batchesById.get(instance.batchId);
        if (!batch) continue;
        const key = `${batch.id}:${batch.material?.windShader ?? "grass-shader-wind"}`;
        if (!groups.has(key)) groups.set(key, { batch, instances: [] });
        groups.get(key).instances.push({ ...instance, patchId: patch.id });
      }
    }
    return Object.freeze(Array.from(groups.values()).map((group) => Object.freeze({
      batchId: group.batch.id,
      material: group.batch.material,
      lod: group.batch.lod,
      cardCount: group.batch.cardCount,
      instanceCount: group.instances.length,
      instances: Object.freeze(group.instances.map((entry) => Object.freeze(entry)))
    })));
  }

  return Object.freeze({
    id: "grass-clump-instancing-render-kit",
    backend: config.backend ?? "webgl-instancing",
    createDrawGroups,
    validate(groups = []) {
      const failures = [];
      for (const group of groups) if (group.instanceCount <= 0) failures.push(`${group.batchId} has no instances`);
      return Object.freeze({ passed: failures.length === 0, failures });
    }
  });
}
