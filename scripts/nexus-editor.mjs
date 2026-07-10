#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import {
  createHeadlessEditorRuntime,
  createHeadlessEditorTerminalClient
} from "nexusengine";
import { createStdioHeadlessEditorTransport } from "nexusengine/core-kits/core-headless-editor-kit/transports/stdio";
import { createEnvironment } from "./into-the-meadow-environment.mjs";

const args = process.argv.slice(2);
const json = args.includes("--json");
const quiet = args.includes("--quiet");
for (const flag of ["--json", "--quiet"]) {
  const index = args.indexOf(flag);
  if (index >= 0) args.splice(index, 1);
}

const environment = await createEnvironment();
const runtime = createHeadlessEditorRuntime({
  id: "into-the-meadow-editor",
  environment,
  session: { id: "into-the-meadow-cli", environmentId: environment.id }
});
const client = createHeadlessEditorTerminalClient({ runtime });
const transport = createStdioHeadlessEditorTransport({ client });

if (args[0] === "run" && args[1]) {
  const scenario = JSON.parse(await readFile(args[1], "utf8"));
  const result = await runtime.runScript(scenario, { source: "scenario" });
  await transport.execute("report", { json, quiet: true });
  if (!quiet) process.stdout.write(`${JSON.stringify(result, null, json ? 0 : 2)}\n`);
  process.exitCode = result.ok ? 0 : 1;
} else if (args.length) {
  const result = await transport.execute(args.join(" "), { json, quiet });
  process.exitCode = result?.ok === false ? 1 : 0;
} else {
  transport.start({ json, quiet, prompt: true, promptText: "into-the-meadow> " });
}
