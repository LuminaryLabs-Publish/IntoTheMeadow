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
if (!plan.grassPatches?.length) throw new Error("Expected grass patch descriptors in enhanced render plan");
if (!plan.postProcess?.passes?.length) throw new Error("Expected post-process pass descriptors in enhanced render plan");
console.log(`render plan smoke ok · objects:${plan.stats.objectCount} patches:${plan.stats.grassPatchCount}`);
