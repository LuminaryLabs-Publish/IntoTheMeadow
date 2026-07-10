import { createIntoTheMeadowGame } from "../src/game/create-into-the-meadow-game.js";
import { validateRenderPlan } from "../src/validation/validate-render-plan.js";
import { createRenderPlanEnhancer } from "../src/game/enhance-render-plan.js";
import { MEADOW_RENDER_PLAN_SCHEMA } from "../src/render-contract/meadow-render-plan-v2.js";

const game = await createIntoTheMeadowGame();
const enhancer = createRenderPlanEnhancer();
const rawPlan = game.getRenderPlan(0);
const plan = enhancer.enhance(rawPlan);
const result = validateRenderPlan(plan);
if (!result.passed) throw new Error(`Render plan failed: ${result.failures.join("; ")}`);
const diagnostics = game.getDiagnostics();
if (!diagnostics.validation.passed) throw new Error(`Diagnostics failed: ${diagnostics.validation.failures.join("; ")}`);
if (plan.schema !== MEADOW_RENDER_PLAN_SCHEMA) throw new Error("Expected meadow render plan v2 schema");
if (!plan.contract?.topologyKey) throw new Error("Expected persistent topology key");
if (!plan.fields?.grass?.densityTexture) throw new Error("Expected grass density texture descriptor");
if (!plan.fields?.grass?.staticBatches?.length) throw new Error("Expected reusable grass static batch descriptors");
if (!plan.fields?.grass?.patches?.length) throw new Error("Expected texture-driven grass patch descriptors");
if (!plan.fields?.grass?.drawGroups?.length) throw new Error("Expected grass draw groups");
if (plan.fields.flowers.type !== "wildflower-cluster-field") throw new Error("Expected clustered flower field");
if (plan.fields.rocks.type !== "rock-instance-field") throw new Error("Expected rock instance field");
if (plan.assets.focalTree.type !== "hero-tree-asset") throw new Error("Expected hero tree asset descriptor");
if (!plan.postProcess?.passes?.length) throw new Error("Expected post-process descriptors");

const timedPlan = enhancer.enhance(game.getRenderPlan(1));
if (timedPlan.contract.topologyKey !== plan.contract.topologyKey) throw new Error("Time update changed topology key");
if (enhancer.getSnapshot().rebuildCount !== 1) throw new Error("Enhancer rebuilt static topology more than once");
if (enhancer.getSnapshot().cacheHitCount < 1) throw new Error("Enhancer did not report a cache hit");

console.log(`render plan smoke ok · schema:v${plan.schemaVersion} topology:${plan.contract.topologyKey} grass:${plan.contract.descriptorCounts.grassInstances}`);
