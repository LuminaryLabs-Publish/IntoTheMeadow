export function createGrassShaderWindKit(config = {}) {
  return Object.freeze({
    id: "grass-shader-wind-kit",
    uniforms: Object.freeze({
      time: true,
      direction: config.direction ?? { x: 0.72, y: 0, z: 0.34 },
      strength: Number(config.strength ?? 0.32),
      noiseScale: Number(config.noiseScale ?? 0.08),
      gust: Number(config.gust ?? 0.14)
    }),
    vertexModel: "root-locked-tip-bend",
    bendFormula: "tipWeight * windStrength * sin(time + phase + worldXZ)",
    validate() {
      const failures = [];
      if (this.uniforms.strength < 0) failures.push("wind strength cannot be negative");
      return Object.freeze({ passed: failures.length === 0, failures });
    }
  });
}
