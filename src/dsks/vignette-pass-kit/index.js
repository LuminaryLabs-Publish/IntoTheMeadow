export function createVignettePass(config = {}) {
  return Object.freeze({
    id: "vignette-pass",
    enabled: config.enabled !== false,
    radius: Number(config.radius ?? 0.74),
    falloff: Number(config.falloff ?? 0.32),
    strength: Number(config.strength ?? 0.18),
    center: Object.freeze({ x: Number(config.center?.x ?? 0.5), y: Number(config.center?.y ?? 0.52) })
  });
}
