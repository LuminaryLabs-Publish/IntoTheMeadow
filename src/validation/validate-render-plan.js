export function validateRenderPlan(renderPlan = {}) {
  const failures = [];
  if (!renderPlan.id) failures.push("renderPlan.id missing");
  if (!renderPlan.area?.id) failures.push("renderPlan.area.id missing");
  if (!Array.isArray(renderPlan.objects)) failures.push("renderPlan.objects must be an array");
  if (!renderPlan.objects?.some?.((object) => object.type === "path")) failures.push("path object missing");
  if (!renderPlan.objects?.some?.((object) => object.type === "focal-tree")) failures.push("focal tree missing");
  if (!renderPlan.stats?.objectCount) failures.push("object count missing");
  return Object.freeze({ passed: failures.length === 0, failures });
}
