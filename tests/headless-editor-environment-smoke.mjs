import assert from "node:assert/strict";
import { createHeadlessEditorRuntime } from "nexusengine";
import { createEnvironment } from "../scripts/into-the-meadow-environment.mjs";

const environment = await createEnvironment({ artifactRoot: ".artifacts/headless-editor/test-environment" });
const runtime = createHeadlessEditorRuntime({ environment, session: { id: "environment-smoke" } });

assert.ok(runtime.listDomains().includes("scene"));
assert.ok(runtime.listDomains().includes("renderer"));
assert.equal(runtime.hasCapability("renderer.capture"), true);

const stats = await runtime.executeAction("scene.getStatistics");
assert.equal(stats.ok, true);
assert.equal(stats.data.metrics.mesh.primitiveFallbackCount, 0);
assert.equal(stats.data.metrics.grass.maxCardWidth <= 0.09, true);
assert.equal(stats.data.metrics.tree.averageCardsPerCluster >= 13, true);
assert.equal(stats.data.metrics.rocks.maxScale <= 0.9, true);
assert.equal(stats.data.metrics.observations.length, 0);

const capture = await runtime.executeAction("renderer.capture", { label: "environment-smoke" });
assert.equal(capture.ok, true);
assert.equal(capture.artifacts.length, 2);
assert.equal(runtime.snapshot().artifacts.length, 2);

console.log(`headless editor environment smoke ok · grass:${stats.data.metrics.grass.instanceCount} canopy:${stats.data.metrics.tree.canopyAreaProxy.toFixed(1)}`);
