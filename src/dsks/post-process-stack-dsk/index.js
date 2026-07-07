export const POST_PROCESS_STACK_DSK_VERSION = "0.1.0";

export function createPostProcessStack(config = {}) {
  const enabled = config.enabled !== false;
  const passes = Object.freeze([
    Object.freeze({ id: "render-target", order: 0, enabled }),
    Object.freeze({ id: "depth-fog", order: 10, enabled: enabled && config.depthFog !== false }),
    Object.freeze({ id: "color-grade", order: 20, enabled: enabled && config.colorGrade !== false }),
    Object.freeze({ id: "edge-outline", order: 30, enabled: enabled && config.edgeOutline === true }),
    Object.freeze({ id: "vignette", order: 40, enabled: enabled && config.vignette !== false }),
    Object.freeze({ id: "final-composite", order: 50, enabled })
  ]);
  return Object.freeze({
    id: "post-process-stack",
    version: POST_PROCESS_STACK_DSK_VERSION,
    enabled,
    passes,
    settings: Object.freeze({
      warmth: Number(config.warmth ?? 0.18),
      contrast: Number(config.contrast ?? 0.92),
      colorRichness: Number(config.colorRichness ?? 0.88),
      fogStrength: Number(config.fogStrength ?? 0.28),
      vignetteStrength: Number(config.vignetteStrength ?? 0.18),
      outlineColor: config.outlineColor ?? "#132011"
    }),
    validate() {
      const ids = new Set();
      const failures = [];
      for (const pass of passes) {
        if (ids.has(pass.id)) failures.push(`duplicate pass ${pass.id}`);
        ids.add(pass.id);
      }
      if (!ids.has("final-composite")) failures.push("final composite pass missing");
      return Object.freeze({ passed: failures.length === 0, failures });
    }
  });
}
