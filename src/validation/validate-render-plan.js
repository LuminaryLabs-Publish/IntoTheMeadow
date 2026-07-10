import {
  MEADOW_RENDER_PLAN_SCHEMA,
  validateMeadowRenderPlanV2
} from "../render-contract/meadow-render-plan-v2.js";

export function validateRenderPlan(renderPlan = {}) {
  if (renderPlan.schema === MEADOW_RENDER_PLAN_SCHEMA) {
    const contractValidation = validateMeadowRenderPlanV2(renderPlan);
    const failures = [...contractValidation.failures];
    if (!renderPlan.contract?.topologyKey) failures.push("render topology key missing");
    if (!renderPlan.stats?.objectCount) failures.push("object count missing");
    if ((renderPlan.contract?.descriptorCounts?.grassInstances ?? 0) <= 0) failures.push("grass instances missing");
    return Object.freeze({ passed: failures.length === 0, failures: Object.freeze(failures) });
  }

  const failures = [];
  if (!renderPlan.id) failures.push("renderPlan.id missing");
  if (!renderPlan.area?.id) failures.push("renderPlan.area.id missing");
  if (!Array.isArray(renderPlan.objects)) failures.push("renderPlan.objects must be an array");
  if (!renderPlan.objects?.some?.((object) => object.type === "path")) failures.push("path object missing");
  if (!renderPlan.objects?.some?.((object) => object.type === "focal-tree")) failures.push("focal tree missing");
  if (!renderPlan.stats?.objectCount) failures.push("object count missing");
  return Object.freeze({ passed: failures.length === 0, failures: Object.freeze(failures) });
}
