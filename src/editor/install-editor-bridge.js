function clone(value) {
  if (value === undefined) return undefined;
  return structuredClone(value);
}

export function installIntoTheMeadowEditorBridge({ gameHost, canvas, target = globalThis } = {}) {
  if (!gameHost) throw new Error("IntoTheMeadow editor bridge requires GameHost.");
  const errors = [];
  const capabilities = new Map();

  function register(id, execute, description = "") {
    capabilities.set(id, Object.freeze({ id, domain: id.split(".")[0], description, execute }));
  }

  register("runtime.status", () => ({
    build: gameHost.build,
    state: gameHost.getState?.() ?? null,
    diagnostics: gameHost.getDiagnostics?.() ?? null
  }), "Read the active game and diagnostic state.");
  register("runtime.getState", () => gameHost.getState?.() ?? null);
  register("runtime.getSnapshot", () => gameHost.getSnapshot?.() ?? null);
  register("runtime.tick", ({ dt = 1 / 60, time = 0 } = {}) => gameHost.game?.tick?.({ dt, time }) ?? null);
  register("runtime.reset", () => gameHost.game?.reset?.() ?? null);
  register("scene.getRenderPlan", () => gameHost.getRenderPlan?.() ?? null);
  register("scene.getStatistics", () => gameHost.getRenderPlan?.()?.stats ?? null);
  register("renderer.getSnapshot", () => gameHost.getRenderSnapshot?.() ?? null);
  register("renderer.getEnhancerSnapshot", () => gameHost.getRenderEnhancerSnapshot?.() ?? null);
  register("renderer.capture", ({ format = "image/png", quality } = {}) => ({
    format,
    width: canvas?.width ?? 0,
    height: canvas?.height ?? 0,
    dataUrl: canvas?.toDataURL?.(format, quality) ?? null,
    renderer: gameHost.getRenderSnapshot?.() ?? null
  }), "Capture the actual browser canvas as seen by the user.");
  register("browser.getViewport", () => ({
    innerWidth: target.innerWidth ?? null,
    innerHeight: target.innerHeight ?? null,
    devicePixelRatio: target.devicePixelRatio ?? 1,
    canvasWidth: canvas?.width ?? null,
    canvasHeight: canvas?.height ?? null
  }));
  register("browser.getErrors", () => clone(errors));

  function onError(event) {
    errors.push({
      type: "error",
      message: event?.message ?? String(event?.error ?? event),
      filename: event?.filename ?? null,
      lineno: event?.lineno ?? null,
      colno: event?.colno ?? null
    });
  }

  function onRejection(event) {
    errors.push({ type: "unhandledrejection", message: event?.reason?.message ?? String(event?.reason ?? "Unhandled rejection") });
  }

  target.addEventListener?.("error", onError);
  target.addEventListener?.("unhandledrejection", onRejection);

  const bridge = Object.freeze({
    id: "into-the-meadow-web-environment",
    protocol: "nexus-headless-editor-environment/v1",
    listCapabilities() {
      return Object.freeze([...capabilities.values()].map(({ execute, ...descriptor }) => Object.freeze(descriptor)));
    },
    hasCapability(id) {
      return capabilities.has(id);
    },
    async invoke(action, argumentsValue = {}) {
      const capability = capabilities.get(action);
      if (!capability) return { ok: false, status: "unavailable", action };
      try {
        return { ok: true, status: "completed", action, data: await capability.execute(clone(argumentsValue)) };
      } catch (error) {
        const entry = { type: "capability-error", action, message: error?.message ?? String(error) };
        errors.push(entry);
        return { ok: false, status: "failed", action, errors: [entry] };
      }
    },
    snapshot() {
      return {
        id: this.id,
        protocol: this.protocol,
        capabilities: this.listCapabilities(),
        runtime: gameHost.getState?.() ?? null,
        renderer: gameHost.getRenderSnapshot?.() ?? null,
        errors: clone(errors)
      };
    },
    dispose() {
      target.removeEventListener?.("error", onError);
      target.removeEventListener?.("unhandledrejection", onRejection);
      if (target.NexusEditorEnvironment === bridge) delete target.NexusEditorEnvironment;
    }
  });

  target.NexusEditorEnvironment = bridge;
  return bridge;
}

export default installIntoTheMeadowEditorBridge;
