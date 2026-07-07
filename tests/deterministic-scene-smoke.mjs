import { createIntoTheMeadowGame } from "../src/game/create-into-the-meadow-game.js";
import { validateDeterminism } from "../src/validation/validate-determinism.js";
import { validateSceneFlow } from "../src/validation/validate-scene-flow.js";

const sceneFlow = validateSceneFlow();
if (!sceneFlow.passed) throw new Error(`Scene flow failed: ${sceneFlow.failures.join("; ")}`);

const game = await createIntoTheMeadowGame();
const result = validateDeterminism(() => game.getSnapshot());
if (!result.passed) throw new Error(`Determinism failed: ${result.failures.join("; ")}`);
console.log(`deterministic scene smoke ok · story:${sceneFlow.storyBeatCount} objectives:${sceneFlow.objectiveCount}`);
