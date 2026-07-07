export function createGrassPatchDsk(config = {}) {
  const patchCount = Math.max(1, Number(config.patchCount ?? 36));
  const itemBudget = Math.max(0, Number(config.itemBudget ?? 2600));
  return Object.freeze({
    id: "grass-patch-dsk",
    patchCount,
    itemBudget,
    createPatches(area = { anchor: { x: 0, z: 0 }, width: 90, depth: 110 }) {
      return Object.freeze(Array.from({ length: patchCount }, (_, i) => Object.freeze({
        id: `grass-patch-${i}`,
        type: "grass-patch",
        bounds: Object.freeze({ x: area.anchor.x, z: area.anchor.z, width: area.width / 6, depth: area.depth / 6 }),
        itemCount: Math.max(8, Math.floor(itemBudget / patchCount)),
        density: 0.72,
        windWeight: 0.7,
        lod: Object.freeze({ near: "instanced", mid: "cards", far: "tint" })
      })));
    },
    validate() {
      return Object.freeze({ passed: patchCount > 0 && itemBudget > 0, failures: patchCount > 0 && itemBudget > 0 ? [] : ["invalid grass patch budget"] });
    }
  });
}
