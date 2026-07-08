function hashUnit(value) {
  let h = 2166136261;
  for (const ch of String(value)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return (h >>> 0) / 4294967295;
}

export function createGrassPatchPlacementKit(config = {}) {
  const patchSize = Number(config.patchSize ?? 8);
  const densityScale = Number(config.densityScale ?? 0.85);

  function chooseBatch(staticBatches, density, seed) {
    const near = staticBatches.filter((batch) => batch.lod === "near");
    const mid = staticBatches.filter((batch) => batch.lod === "mid");
    const pool = density > 0.55 ? near : mid.length ? mid : near;
    return pool[Math.floor(hashUnit(seed) * pool.length)] ?? staticBatches[0];
  }

  function createPatches({ area, densityTexture, staticBatches }) {
    const cols = Math.max(1, Math.ceil(area.width / patchSize));
    const rows = Math.max(1, Math.ceil(area.depth / patchSize));
    const patches = [];
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const bounds = Object.freeze({
          x: area.anchor.x - area.width / 2 + (col + 0.5) * patchSize,
          z: area.anchor.z - area.depth / 2 + (row + 0.5) * patchSize,
          width: Math.min(patchSize, area.width - col * patchSize),
          depth: Math.min(patchSize, area.depth - row * patchSize)
        });
        const density = densityTexture.averageDensity(bounds);
        if (density < 0.08) continue;
        const instanceCount = Math.max(1, Math.floor(density * densityScale * 5));
        const instances = Object.freeze(Array.from({ length: instanceCount }, (_, i) => {
          const seed = `${densityTexture.seed}:${row}:${col}:${i}`;
          const batch = chooseBatch(staticBatches, density, seed);
          return Object.freeze({
            batchId: batch.id,
            x: bounds.x + (hashUnit(`${seed}:x`) - 0.5) * bounds.width,
            z: bounds.z + (hashUnit(`${seed}:z`) - 0.5) * bounds.depth,
            rotation: hashUnit(`${seed}:r`) * Math.PI * 2,
            scale: 0.75 + hashUnit(`${seed}:s`) * 0.55,
            tint: Object.freeze([0.72 + hashUnit(`${seed}:tr`) * 0.18, 0.78 + hashUnit(`${seed}:tg`) * 0.16, 0.42 + hashUnit(`${seed}:tb`) * 0.18]),
            windPhase: hashUnit(`${seed}:w`)
          });
        }));
        patches.push(Object.freeze({ id: `grass-patch-${row}-${col}`, type: "grass-patch", bounds, averageDensity: density, instances }));
      }
    }
    return Object.freeze(patches);
  }

  return Object.freeze({
    id: "grass-patch-placement-kit",
    patchSize,
    densityScale,
    createPatches,
    validate(patches = []) {
      const failures = [];
      for (const patch of patches) if (!Array.isArray(patch.instances)) failures.push(`${patch.id} missing instances`);
      return Object.freeze({ passed: failures.length === 0, failures });
    }
  });
}
