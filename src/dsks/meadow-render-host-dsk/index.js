export function createMeadowRenderHostDsk(config = {}) {
  const passOrder = Object.freeze(["terrain", "vegetation", "grass-patches", "hero-objects", "atmosphere", "post", "final"]);
  return Object.freeze({
    id: "meadow-render-host-dsk",
    backend: config.backend ?? "webgl",
    passOrder,
    routeRenderPlan(renderPlan = {}) {
      return Object.freeze({ id: `${renderPlan.id ?? "meadow"}.render-route`, passOrder, grassPatches: Object.freeze([...(renderPlan.grassPatches ?? [])]), stats: renderPlan.stats ?? null });
    },
    validate() {
      return Object.freeze({ passed: passOrder.length > 0, failures: passOrder.length > 0 ? [] : ["missing pass order"] });
    }
  });
}
