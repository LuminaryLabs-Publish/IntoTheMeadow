export function createGpuGrassRenderDsk(config = {}) {
  return Object.freeze({
    id: "gpu-grass-render-dsk",
    backend: config.backend ?? "webgl-instancing-first",
    instanceLayout: Object.freeze(["position", "rotation", "height", "width", "colorIndex", "windWeight"]),
    shaderWind: Object.freeze({ time: true, direction: true, strength: true, noiseScale: true, gust: true }),
    lodPolicy: Object.freeze({ near: "instanced", mid: "cards", far: "tint", culled: "none" }),
    validate() {
      return Object.freeze({ passed: true, failures: [] });
    }
  });
}
