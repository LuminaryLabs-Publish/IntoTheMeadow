import { createTreeObjectDsk } from "../dsks/tree-object-dsk/index.js";
import { createGrassPatchDsk } from "../dsks/grass-patch-dsk/index.js";
import { createWindFieldDsk } from "../dsks/wind-field-dsk/index.js";
import { createMeadowPerformancePolicy } from "../dsks/meadow-performance-dsk/index.js";
import { createPostProcessStack } from "../dsks/post-process-stack-dsk/index.js";

const SMALL_TYPES = new Set(["grass-blade", "wildflower", "mushroom", "tree-line-tree"]);

function withOutlinePolicy(object = {}, performance) {
  if (object.type === "focal-tree") return createTreeObjectDsk().enhanceFocalTree(object);
  if (object.type === "rock") return Object.freeze({ ...object, renderStyle: Object.freeze({ outlineClass: "soft", outlineWeight: performance.outlinePolicy.soft }) });
  if (SMALL_TYPES.has(object.type)) return Object.freeze({ ...object, renderStyle: Object.freeze({ outlineClass: "tiny", outlineWeight: performance.outlinePolicy.tiny }) });
  return object;
}

function reduceTinyClutter(objects = [], performance) {
  const limits = Object.freeze({ wildflower: performance.budgets.maxFlowerObjects, mushroom: 14, "tree-line-tree": performance.budgets.maxTreeLineObjects });
  const counts = new Map();
  return objects.filter((object) => {
    const limit = limits[object.type];
    if (!limit) return true;
    const next = (counts.get(object.type) ?? 0) + 1;
    counts.set(object.type, next);
    return next <= limit;
  });
}

export function enhanceRenderPlan(renderPlan = {}, options = {}) {
  const performance = createMeadowPerformancePolicy(options.performance ?? renderPlan.style?.performance ?? {});
  const wind = createWindFieldDsk(renderPlan.wind ?? {});
  const grassPatches = createGrassPatchDsk({ patchCount: 36, itemBudget: performance.budgets.maxGrassInstances }).createPatches(renderPlan.area);
  const postProcess = createPostProcessStack(renderPlan.style?.postProcess ?? {});
  const filtered = reduceTinyClutter(renderPlan.objects ?? [], performance).map((object) => withOutlinePolicy(object, performance));
  return Object.freeze({
    ...renderPlan,
    objects: Object.freeze(filtered),
    grassPatches,
    windField: wind.state,
    postProcess,
    performance: Object.freeze({ profile: performance.profile, budgets: performance.budgets, outlinePolicy: performance.outlinePolicy }),
    stats: Object.freeze({
      ...(renderPlan.stats ?? {}),
      objectCount: filtered.length,
      grassPatchCount: grassPatches.length,
      estimatedGrassInstances: grassPatches.reduce((sum, patch) => sum + Number(patch.itemCount ?? 0), 0)
    })
  });
}
