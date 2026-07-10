import assert from "node:assert/strict";
import { createHeadlessEditorRuntime, createHeadlessEditorTerminalClient } from "nexusengine";
import { createEnvironment } from "../scripts/into-the-meadow-environment.mjs";

const environment = await createEnvironment({ artifactRoot: ".artifacts/headless-editor/test-command" });
const runtime = createHeadlessEditorRuntime({ environment, session: { id: "command-smoke" } });
const terminal = createHeadlessEditorTerminalClient({ runtime });

const status = await terminal.dispatch("status");
assert.equal(status.ok, true);
assert.equal(status.activeEnvironmentId, "into-the-meadow-headless");

const rendererCapabilities = await terminal.dispatch("capabilities renderer");
assert.equal(rendererCapabilities.capabilities.some((entry) => entry.id === "renderer.capture"), true);

const inspect = await terminal.dispatch("inspect scene");
assert.equal(inspect.ok, true);
assert.equal(inspect.data.schema, "meadow-render-plan/v2");

const tick = await terminal.dispatch("call runtime.tick --ticks 3 --dt 0.016");
assert.equal(tick.ok, true);
assert.equal(tick.data.state.frame, 3);

const capture = await terminal.dispatch("call renderer.capture --label command-smoke");
assert.equal(capture.ok, true);
assert.equal(capture.data.metrics.observations.length, 0);

console.log("headless editor command smoke ok");
