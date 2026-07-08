export function createGrassLodPolicyKit(config = {}) {
  return Object.freeze({
    id: "grass-lod-policy-kit",
    tiers: Object.freeze([
      Object.freeze({ id: "near", maxDistance: Number(config.near ?? 32), batchLod: "near" }),
      Object.freeze({ id: "mid", maxDistance: Number(config.mid ?? 72), batchLod: "mid" }),
      Object.freeze({ id: "far", maxDistance: Number(config.far ?? 128), batchLod: "far" }),
      Object.freeze({ id: "tint", maxDistance: Number(config.tint ?? 220), batchLod: "terrain-tint" })
    ]),
    pick(distance = 0) {
      return this.tiers.find((tier) => distance <= tier.maxDistance) ?? this.tiers[this.tiers.length - 1];
    },
    validate() {
      return Object.freeze({ passed: this.tiers.length >= 4, failures: this.tiers.length >= 4 ? [] : ["expected four grass LOD tiers"] });
    }
  });
}
