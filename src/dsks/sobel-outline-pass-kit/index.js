export function createSobelOutlinePass(config = {}) {
  return Object.freeze({
    id: "sobel-outline-pass",
    enabled: Boolean(config.enabled ?? false),
    colorThreshold: Number(config.colorThreshold ?? 0.18),
    depthThreshold: Number(config.depthThreshold ?? 0.12),
    shapeThreshold: Number(config.shapeThreshold ?? 0.22),
    lineColor: config.lineColor ?? "#132011",
    objectMask: config.objectMask ?? "hero-and-terrain"
  });
}
