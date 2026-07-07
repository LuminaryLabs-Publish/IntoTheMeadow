export function createColorGradePass(config = {}) {
  return Object.freeze({
    id: "color-grade-pass",
    enabled: config.enabled !== false,
    warmth: Number(config.warmth ?? 0.18),
    contrast: Number(config.contrast ?? 0.92),
    chroma: Number(config.chroma ?? 0.88),
    shadowTint: config.shadowTint ?? "#27351f",
    highlightTint: config.highlightTint ?? "#ffe19a"
  });
}
