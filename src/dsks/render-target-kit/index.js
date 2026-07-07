export function createRenderTargetDescriptor(config = {}) {
  return Object.freeze({
    id: "render-target-descriptor",
    width: Number(config.width ?? 0),
    height: Number(config.height ?? 0),
    color: Boolean(config.color ?? true),
    depth: Boolean(config.depth ?? true),
    normal: Boolean(config.normal ?? false),
    pingPong: Boolean(config.pingPong ?? true),
    resizePolicy: config.resizePolicy ?? "match-canvas"
  });
}
