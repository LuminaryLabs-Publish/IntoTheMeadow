import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { spawn, spawnSync } from "node:child_process";
import { resolve } from "node:path";

const root = process.cwd();
const artifactRoot = resolve(root, ".artifacts/headless-editor/browser");
await mkdir(artifactRoot, { recursive: true });

function findBrowser() {
  const candidates = [process.env.CHROME_PATH, "google-chrome-stable", "google-chrome", "chromium", "chromium-browser"].filter(Boolean);
  for (const candidate of candidates) {
    const found = spawnSync("sh", ["-lc", `command -v ${JSON.stringify(candidate)}`], { encoding: "utf8" });
    if (found.status === 0 && found.stdout.trim()) return found.stdout.trim();
  }
  return null;
}

async function waitForServer(url, timeoutMs = 10000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {}
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 150));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

const browser = findBrowser();
if (!browser) throw new Error("No Chromium-compatible browser found for editor:browser.");

const port = Number(process.env.PORT ?? 4173);
const server = spawn("python3", ["-m", "http.server", String(port), "--bind", "127.0.0.1"], {
  cwd: root,
  stdio: ["ignore", "pipe", "pipe"]
});
let serverErrors = "";
server.stderr.on("data", (chunk) => { serverErrors += chunk; });

try {
  const url = `http://127.0.0.1:${port}/?debug&editor-observation=1`;
  await waitForServer(url);
  const screenshotPath = resolve(artifactRoot, "arrival-wide.png");
  const commonArgs = [
    "--headless=new",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--hide-scrollbars",
    "--window-size=1440,900",
    "--force-device-scale-factor=1",
    "--virtual-time-budget=9000"
  ];
  const screenshot = spawnSync(browser, [...commonArgs, `--screenshot=${screenshotPath}`, url], { encoding: "utf8", timeout: 30000 });
  await writeFile(resolve(artifactRoot, "chromium-screenshot.stdout.log"), screenshot.stdout ?? "");
  await writeFile(resolve(artifactRoot, "chromium-screenshot.stderr.log"), screenshot.stderr ?? "");
  if (screenshot.status !== 0) throw new Error(`Chromium screenshot failed (${screenshot.status}): ${screenshot.stderr}`);
  if (!existsSync(screenshotPath)) throw new Error("Chromium did not create the observation screenshot.");

  const dom = spawnSync(browser, [...commonArgs, "--dump-dom", url], { encoding: "utf8", timeout: 30000 });
  await writeFile(resolve(artifactRoot, "arrival-wide.dom.html"), dom.stdout ?? "");
  await writeFile(resolve(artifactRoot, "chromium-dom.stderr.log"), dom.stderr ?? "");
  if (dom.status !== 0) throw new Error(`Chromium DOM observation failed (${dom.status}): ${dom.stderr}`);
  const html = dom.stdout ?? "";
  const fatalText = ["failed to boot IntoTheMeadow", "IntoTheMeadow renderer stopped"];
  const fatal = fatalText.find((text) => html.includes(text));
  if (fatal) throw new Error(`Observed fatal browser state: ${fatal}`);
  if (!html.includes("Into The Meadow")) throw new Error("Observed browser DOM does not contain the game title.");
  if (html.includes("booting DSK stack...")) throw new Error("The browser never advanced beyond the boot state.");
  const editorMarker = "editor:nexus-headless-editor-environment/v1";
  if (!html.includes(editorMarker)) throw new Error("The rendered page did not install the Nexus editor environment bridge.");
  if (!html.includes("gpu:")) throw new Error("The rendered page did not report a completed renderer frame.");

  const screenshotBytes = (await readFile(screenshotPath)).byteLength;
  if (screenshotBytes < 10000) throw new Error(`Browser screenshot is unexpectedly small: ${screenshotBytes} bytes.`);
  const report = {
    id: "into-the-meadow.browser-observation",
    browser,
    url,
    screenshot: ".artifacts/headless-editor/browser/arrival-wide.png",
    screenshotBytes,
    domContainsGameTitle: true,
    editorBridgeObserved: true,
    completedRendererFrameObserved: true,
    fatalTextFound: null
  };
  await writeFile(resolve(artifactRoot, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.log(`browser observation ok · screenshot:${screenshotBytes} bytes · browser:${browser}`);
} finally {
  server.kill("SIGTERM");
  if (serverErrors) await writeFile(resolve(artifactRoot, "server.stderr.log"), serverErrors);
}
