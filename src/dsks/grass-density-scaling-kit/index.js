export function createGrassDensityScalingKit(config = {}) {
  const qualityScales = Object.freeze({ low: 0.35, medium: 0.55, high: 0.72, ultra: 1, auto: 0.68 });
  return Object.freeze({
    id: "grass-density-scaling-kit",
    quality: config.quality ?? "high",
    qualityScales,
    scaleFor(quality = this.quality) {
      return qualityScales[quality] ?? qualityScales.high;
    },
    apply(count, quality = this.quality) {
      return Math.max(0, Math.floor(Number(count ?? 0) * this.scaleFor(quality)));
    },
    validate() {
      return Object.freeze({ passed: this.scaleFor(this.quality) > 0, failures: this.scaleFor(this.quality) > 0 ? [] : ["invalid grass density scale"] });
    }
  });
}
