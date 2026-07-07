export function createRenderPlanRoute(renderPlan = {}) {
  const objects = Array.isArray(renderPlan.objects) ? renderPlan.objects : [];
  return Object.freeze({
    id: `${renderPlan.id ?? "unknown"}.render-route`,
    terrain: objects.filter((object) => ["ground", "path", "terrain-surface"].includes(object.type)),
    vegetation: objects.filter((object) => ["grass-blade", "wildflower", "tree-line-tree"].includes(object.type)),
    objects: objects.filter((object) => ["rock", "mushroom", "focal-tree"].includes(object.type)),
    atmosphere: objects.filter((object) => object.type === "atmosphere"),
    stats: renderPlan.stats ?? null
  });
}
