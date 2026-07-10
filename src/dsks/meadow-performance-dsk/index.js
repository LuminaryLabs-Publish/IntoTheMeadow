export const MEADOW_PERFORMANCE_DSK_VERSION = "0.2.0";

export const QUALITY_PROFILES = Object.freeze({
  low: Object.freeze({ outline: 0.35, grassScale: 0.35, flowerScale: 0.35, terrainResolution: "low", postProcess: false }),
  medium: Object.freeze({ outline: 0.5, grassScale: 0.55, flowerScale: 0.55, terrainResolution: "medium", postProcess: true }),
  high: Object.freeze({ outline: 0.62, grassScale: 0.72, flowerScale: 0.55, terrainResolution: "medium-high", postProcess: true }),
  ultra: Object.freeze({ outline: 0.72, grassScale: 1.0, flowerScale: 0.8, terrainResolution: "high", postProcess: true }),
  auto: Object.freeze({ outline: 0.58, grassScale: 0.68, flowerScale: 0.5, terrainResolution: "medium-high", postProcess: true })
});

export function createMeadowPerformancePolicy(options = {}) {
  const quality = options.quality ?? "high";
  const profile = QUALITY_PROFILES[quality] ?? QUALITY_PROFILES.high;
  return Object.freeze({
    id: "meadow-performance-policy",
    version: MEADOW_PERFORMANCE_DSK_VERSION,
    quality,
    profile,
    budgets: Object.freeze({
      maxGrassInstances: Math.floor(Number(options.maxGrassInstances ?? 7200) * profile.grassScale),
      maxFlowerObjects: Math.floor(Number(options.maxFlowerObjects ?? 420) * profile.flowerScale),
      maxSmallScatterObjects: Number(options.maxSmallScatterObjects ?? 140),
      maxTreeLineObjects: Number(options.maxTreeLineObjects ?? 28)
    }),
    outlinePolicy: Object.freeze({
      hero: 0.2 * profile.outline,
      soft: 0.055 * profile.outline,
      tiny: 0,
      far: 0
    }),
    validate() {
      const failures = [];
      if (!QUALITY_PROFILES[quality]) failures.push(`unknown quality profile ${quality}`);
      if (this.budgets.maxGrassInstances <= 0) failures.push("grass budget must be positive");
      return Object.freeze({ passed: failures.length === 0, failures });
    }
  });
}
