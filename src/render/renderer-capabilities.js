export function getRendererCapabilities(target = globalThis) {
  const documentRef = target.document ?? null;
  const canvas = documentRef?.createElement?.("canvas") ?? null;
  const webgl = Boolean(canvas?.getContext?.("webgl"));
  const webgl2 = Boolean(canvas?.getContext?.("webgl2"));
  const webgpu = Boolean(target.navigator?.gpu);
  return Object.freeze({ webgl, webgl2, webgpu, preferred: webgpu ? "webgpu" : webgl2 ? "webgl2" : webgl ? "webgl" : "none" });
}
