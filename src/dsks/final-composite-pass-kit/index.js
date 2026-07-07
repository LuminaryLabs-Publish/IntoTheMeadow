export function createFinalCompositePass(config = {}) {
  return Object.freeze({
    id: "final-composite-pass",
    enabled: config.enabled !== false,
    input: config.input ?? "post-process-stack",
    output: config.output ?? "screen",
    debugOverlay: Boolean(config.debugOverlay ?? false),
    fallbackMode: config.fallbackMode ?? "direct-scene-color"
  });
}
