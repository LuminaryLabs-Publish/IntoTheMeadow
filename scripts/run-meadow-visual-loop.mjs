import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createHeadlessEditorRuntime } from "nexusengine";
import { createEnvironment } from "./into-the-meadow-environment.mjs";

const environment = await createEnvironment();
const runtime = createHeadlessEditorRuntime({
  id: "into-the-meadow-visual-loop-runtime",
  environment,
  session: { id: "into-the-meadow-visual-loop", environmentId: environment.id }
});

runtime.createLoop({
  id: "meadow-production-loop",
  goal: "Inspect and improve IntoTheMeadow through repeatable headless evidence.",
  stages: ["inspect", "capture", "observe", "compare", "decide"],
  stageActions: {
    inspect: "scene.getStatistics",
    capture: "renderer.capture",
    observe: "renderer.getSnapshot",
    compare: "renderer.compare"
  }
});

const run = await runtime.loopContinue("meadow-production-loop", {
  arguments: { label: process.env.MEADOW_CAPTURE_LABEL ?? "current" }
});
if (!run.ok) throw new Error(`Meadow visual loop blocked at ${run.loop?.currentStage ?? "unknown"}.`);
runtime.acceptLoop("meadow-production-loop", {
  note: "Technical evidence captured. Visual acceptance remains reviewable by humans and agents.",
  finish: true
});

const report = runtime.snapshot();
const output = resolve(".artifacts/headless-editor/latest-run.json");
await mkdir(resolve(".artifacts/headless-editor"), { recursive: true });
await writeFile(output, `${JSON.stringify(report, null, 2)}\n`);
console.log(`headless editor visual loop ok · commands:${report.commands.length} artifacts:${report.artifacts.length} observations:${report.observations.length}`);
