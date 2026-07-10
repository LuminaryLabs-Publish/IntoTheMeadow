import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "index.html",
  "package.json",
  "README.md",
  "AGENTS.md",
  "game.manifest.json",
  "dsk-registry.json",
  "src/boot/boot-game.js",
  "src/game/create-into-the-meadow-game.js",
  "src/game/enhance-render-plan.js",
  "src/render-contract/meadow-render-plan-v2.js",
  "src/renderers/meadow-mesh-builder-v2.js",
  "src/renderers/meadow-webgl-renderer-v2.js",
  "src/dsks/index.js"
];

const missing = requiredFiles.filter((file) => !existsSync(file));
if (missing.length) throw new Error(`Missing required files: ${missing.join(", ")}`);

const index = readFileSync("index.html", "utf8");
if (!index.includes("src/boot/boot-game.js")) throw new Error("index.html must boot through src/boot/boot-game.js");
if (!index.includes("Game") && !index.includes("scene")) throw new Error("index.html does not look like the game route");

const webHost = readFileSync("src/hosts/web-host.js", "utf8");
if (!webHost.includes("createMeadowWebglRendererV2")) throw new Error("web host must use the local renderer v2");
if (webHost.includes("createMeadowWebglRenderKit")) throw new Error("web host must not use the primitive external renderer");

console.log(`static smoke ok · files:${requiredFiles.length}`);
