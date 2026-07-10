import assert from "node:assert/strict";
import { createHeadlessEditorRuntime } from "nexusengine";
import { createEnvironment } from "../scripts/into-the-meadow-environment.mjs";

const environment = await createEnvironment({ artifactRoot: ".artifacts/headless-editor/test-loop" });
const runtime = createHeadlessEditorRuntime({ environment, session: { id: "loop-smoke" } });
runtime.createLoop({
  id: "meadow-loop-smoke",
  goal: "Inspect the meadow through the editor harness.",
  stages: ["inspect", "capture", "observe", "compare", "decide"],
  stageActions: {
    inspect: "scene.getStatistics",
    capture: "renderer.capture",
    observe: "renderer.getSnapshot",
    compare: "renderer.compare"
  }
});

const result = await runtime.loopContinue("meadow-loop-smoke", { arguments: { label: "loop-smoke" } });
assert.equal(result.ok, true);
assert.equal(result.loop.status, "waiting-decision");
assert.equal(runtime.snapshot().artifacts.length, 2);
assert.equal(runtime.snapshot().commands.length, 4);

const accepted = runtime.acceptLoop("meadow-loop-smoke", { note: "Evidence is complete.", finish: true });
assert.equal(accepted.status, "finished");
assert.equal(runtime.snapshot().loops[0].decisions[0].type, "accepted");

console.log("headless editor loop smoke ok");
