import { createIntoTheMeadowGame } from "../src/game/create-into-the-meadow-game.js";
import { validateRenderPlan } from "../src/validation/validate-render-plan.js";
import { enhanceRenderPlan } from "../src/game/enhance-render-plan.js";

const game = await createIntoTheMeadowGame();
const rawPlan = game.getRenderPlan(0);
const plan = enhanceRenderPlan(rawPlan, { performance: rawPlan.style?.performance });
const result = validateRenderPlan(plan);
if (!result.passed) throw new Error(`Render plan failed: ${result.failures.join("; ")}`);
const diagnostics = game.getDiagnostics();
if (!diagnostics.validation.passed) throw new Error(`Diagnostics failed: ${diagnostics.validation.failures.join("; ")}`);
if (!plan.grassSystem?.densityTexture) throw new Error("Expected grass density texture descriptor");
if (!plan.grassSystem?.staticBatches?.length) throw new Error("Expected reusable grass static batch descriptors");
if (!plan.grassSystem?.patches?.length) throw new Error("Expected texture-driven grass patch descriptors");
if (!plan.grassSystem?.drawGroups?.length) throw new Error("Expected grass instancing draw groups");
if (!plan.postProcess?.passes?.length) throw new Error("Expected post-process pass descriptors in enhanced render plan");
console.log(`render plan smoke ok · objects:${plan.stats.objectCount} patches:${plan.stats.grassPatchCount} batches:${plan.stats.grassStaticBatchCount} groups:${plan.stats.grassDrawGroupCount}`);
