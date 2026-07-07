import { createIntoTheMeadowGame } from "../src/game/create-into-the-meadow-game.js";
import { validateRenderPlan } from "../src/validation/validate-render-plan.js";

const game = await createIntoTheMeadowGame();
const plan = game.getRenderPlan(0);
const result = validateRenderPlan(plan);
if (!result.passed) throw new Error(`Render plan failed: ${result.failures.join("; ")}`);
const diagnostics = game.getDiagnostics();
if (!diagnostics.validation.passed) throw new Error(`Diagnostics failed: ${diagnostics.validation.failures.join("; ")}`);
console.log(`render plan smoke ok · objects:${plan.stats.objectCount}`);
