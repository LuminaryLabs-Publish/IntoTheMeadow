export function createDepthFogPass(config = {}) {
  return Object.freeze({
    id: "depth-fog-pass",
    enabled: config.enabled !== false,
    near: Number(config.near ?? 36),
    far: Number(config.far ?? 155),
    strength: Number(config.strength ?? 0.28),
    color: config.color ?? "#e8d28a",
    horizonWash: Number(config.horizonWash ?? 0.34)
  });
}
