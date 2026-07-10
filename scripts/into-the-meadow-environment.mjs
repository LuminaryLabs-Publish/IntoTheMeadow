import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { createHeadlessEditorEnvironment } from "nexusengine";
import { createIntoTheMeadowGame } from "../src/game/create-into-the-meadow-game.js";
import { createRenderPlanEnhancer } from "../src/game/enhance-render-plan.js";
import { buildMeadowMeshData } from "../src/renderers/meadow-mesh-builder-v2.js";
import { measureMeadowVisuals } from "../src/editor/meadow-visual-metrics.js";

function safePath(root, path = "") {
  const target = resolve(root, path);
  if (!target.startsWith(root)) throw new Error(`Path escapes editor root: ${path}`);
  return target;
}

function toEditorSafeValue(value) {
  if (value === undefined) return null;
  return JSON.parse(JSON.stringify(value, (_key, current) => {
    if (typeof current === "function") return undefined;
    if (typeof current === "bigint") return current.toString();
    return current;
  }));
}

function escapeXml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[character]));
}

function createObservationSvg(plan, metrics, options = {}) {
  const width = Number(options.width ?? 1200);
  const height = Number(options.height ?? 675);
  const tree = plan.assets?.focalTree ?? {};
  const rocks = plan.fields?.rocks?.instances ?? [];
  const flowers = plan.fields?.flowers?.instances ?? [];
  const grass = (plan.fields?.grass?.drawGroups ?? []).flatMap((group) => group.instances ?? []).slice(0, 420);
  const distantTrees = plan.fields?.distantTrees?.instances ?? [];
  const project = (x = 0, y = 0, z = 0) => {
    const depth = Math.max(0.22, Math.min(1.15, 1.15 - (Number(z) + 44) / 150));
    return [width / 2 + Number(x) * 8.2 * depth, height * 0.73 - Number(y) * 9.2 * depth - (Number(z) + 44) * 2.05];
  };
  const elements = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
    `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#85b5d3"/><stop offset="1" stop-color="#d8c58d"/></linearGradient><linearGradient id="ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#78905d"/><stop offset="1" stop-color="#526d42"/></linearGradient></defs>`,
    `<rect width="${width}" height="${height}" fill="url(#sky)"/>`,
    `<path d="M0 ${height * 0.42} Q ${width * 0.22} ${height * 0.33} ${width * 0.45} ${height * 0.43} T ${width} ${height * 0.38} L ${width} ${height} L0 ${height}Z" fill="#637765" opacity=".78"/>`,
    `<rect y="${height * 0.49}" width="${width}" height="${height * 0.51}" fill="url(#ground)"/>`,
    `<path d="M ${width * 0.46} ${height} C ${width * 0.42} ${height * 0.77}, ${width * 0.55} ${height * 0.62}, ${width * 0.5} ${height * 0.48}" stroke="#b99d61" stroke-width="${Math.max(18, width * 0.055)}" fill="none" opacity=".72"/>`
  ];

  for (const instance of distantTrees) {
    const [x, y] = project(instance.position?.x, 0, instance.position?.z);
    const scale = Number(instance.scale ?? 1);
    elements.push(`<rect x="${x - 2 * scale}" y="${y - 32 * scale}" width="${4 * scale}" height="${32 * scale}" fill="#3d3327" opacity=".55"/>`);
    elements.push(`<ellipse cx="${x}" cy="${y - 37 * scale}" rx="${15 * scale}" ry="${22 * scale}" fill="#36513a" opacity=".62"/>`);
  }

  for (const instance of grass) {
    const [x, y] = project(instance.x, 0, instance.z);
    const scale = Number(instance.scale ?? 1);
    elements.push(`<path d="M${x} ${y} q ${-2 * scale} ${-11 * scale} ${1.5 * scale} ${-23 * scale}" stroke="#567b44" stroke-width="1.4" opacity=".62"/>`);
  }

  for (const instance of flowers) {
    const [x, y] = project(instance.position?.x, 0.6, instance.position?.z);
    elements.push(`<circle cx="${x}" cy="${y}" r="${2.2 * Number(instance.scale ?? 1)}" fill="${escapeXml(instance.color ?? "#c76f99")}" opacity=".84"/>`);
  }

  for (const rock of rocks) {
    const [x, y] = project(rock.position?.x, 0, rock.position?.z);
    const scale = Number(rock.scale ?? 1);
    elements.push(`<ellipse cx="${x}" cy="${y}" rx="${13 * scale}" ry="${7 * scale}" fill="#72776d" stroke="#4b5149" stroke-width="1"/>`);
  }

  const origin = tree.position ?? { x: 0, y: 0, z: 24 };
  for (const segment of tree.segments ?? []) {
    const [x1, y1] = project(Number(origin.x) + Number(segment.start?.x), Number(origin.y) + Number(segment.start?.y), Number(origin.z) + Number(segment.start?.z));
    const [x2, y2] = project(Number(origin.x) + Number(segment.end?.x), Number(origin.y) + Number(segment.end?.y), Number(origin.z) + Number(segment.end?.z));
    elements.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#4f3520" stroke-width="${Math.max(1, Number(segment.startRadius ?? .2) * 4)}" stroke-linecap="round"/>`);
  }
  for (const cluster of tree.leafClusters ?? []) {
    const [x, y] = project(Number(origin.x) + Number(cluster.position?.x), Number(origin.y) + Number(cluster.position?.y), Number(origin.z) + Number(cluster.position?.z));
    const radius = Number(cluster.radius ?? 1.5) * 4.8;
    elements.push(`<ellipse cx="${x}" cy="${y}" rx="${radius}" ry="${radius * .68}" fill="#45663f" opacity=".8"/>`);
  }

  elements.push(`<rect x="18" y="18" width="350" height="116" rx="12" fill="#10160f" opacity=".78"/>`);
  elements.push(`<text x="34" y="46" fill="#f4e7bf" font-family="monospace" font-size="16">IntoTheMeadow headless observation</text>`);
  elements.push(`<text x="34" y="72" fill="#c9d7ae" font-family="monospace" font-size="13">grass width max: ${metrics.grass.maxCardWidth.toFixed(3)}</text>`);
  elements.push(`<text x="34" y="94" fill="#c9d7ae" font-family="monospace" font-size="13">canopy proxy: ${metrics.tree.canopyAreaProxy.toFixed(1)}</text>`);
  elements.push(`<text x="34" y="116" fill="#c9d7ae" font-family="monospace" font-size="13">warnings: ${metrics.observations.length}</text>`);
  elements.push(`</svg>`);
  return elements.join("\n");
}

export async function createEnvironment(options = {}) {
  const root = resolve(options.root ?? process.cwd());
  const artifactRoot = safePath(root, options.artifactRoot ?? ".artifacts/headless-editor");
  await mkdir(artifactRoot, { recursive: true });
  const game = await createIntoTheMeadowGame();
  const enhancer = createRenderPlanEnhancer();
  let time = 0;
  let lastCapture = null;

  function build() {
    const rawPlan = game.getRenderPlan(time);
    const plan = enhancer.enhance(rawPlan);
    const mesh = buildMeadowMeshData(plan);
    const metrics = measureMeadowVisuals(plan, mesh);
    return { rawPlan, plan, mesh, metrics };
  }

  function inspectablePlan() {
    return toEditorSafeValue(build().plan);
  }

  async function capture({ label = "capture", width = 1200, height = 675 } = {}) {
    const current = build();
    const captureId = `${label}-${current.plan.contract.topologyKey}`;
    const jsonPath = safePath(artifactRoot, `captures/${captureId}.json`);
    const svgPath = safePath(artifactRoot, `captures/${captureId}.svg`);
    await mkdir(dirname(jsonPath), { recursive: true });
    const packet = {
      id: captureId,
      label,
      time,
      planId: current.plan.id,
      topologyKey: current.plan.contract.topologyKey,
      renderer: {
        vertexCount: current.mesh.vertexCount,
        triangleCount: current.mesh.triangleCount,
        primitiveFallbackCount: current.mesh.primitiveFallbackCount
      },
      metrics: current.metrics
    };
    await writeFile(jsonPath, `${JSON.stringify(packet, null, 2)}\n`);
    await writeFile(svgPath, createObservationSvg(current.plan, current.metrics, { width, height }));
    const previous = lastCapture;
    lastCapture = packet;
    return {
      data: packet,
      artifacts: [
        { id: `${captureId}-json`, kind: "capture-packet", path: relative(root, jsonPath) },
        { id: `${captureId}-svg`, kind: "visual-observation", path: relative(root, svgPath) }
      ],
      observations: current.metrics.observations,
      metadata: { previousCaptureId: previous?.id ?? null }
    };
  }

  return createHeadlessEditorEnvironment({
    id: "into-the-meadow-headless",
    label: "Into The Meadow Headless Environment",
    domains: ["runtime", "scene", "renderer", "camera", "browser", "workspace"],
    metadata: { kind: "node-headless", renderer: "mesh-observation", permissive: true },
    capabilities: [
      { id: "runtime.status", domain: "runtime", execute: () => ({ data: { state: game.getState(), diagnostics: game.getDiagnostics(), time } }) },
      { id: "runtime.getState", domain: "runtime", execute: () => ({ data: game.getState() }) },
      { id: "runtime.getSnapshot", domain: "runtime", execute: () => ({ data: game.getSnapshot() }) },
      { id: "runtime.tick", domain: "runtime", execute: ({ dt = 1 / 60, ticks = 1 } = {}) => { for (let index = 0; index < Number(ticks); index += 1) { time += Number(dt); game.tick({ dt, time }); } return { data: { time, state: game.getState() } }; } },
      { id: "runtime.reset", domain: "runtime", execute: () => { time = 0; enhancer.invalidate(); return { data: game.reset() }; } },
      { id: "scene.getRenderPlan", domain: "scene", execute: () => ({ data: inspectablePlan() }) },
      { id: "scene.getStatistics", domain: "scene", execute: () => { const current = build(); return { data: { stats: current.plan.stats, metrics: current.metrics } }; } },
      { id: "scene.inspect", domain: "scene", execute: ({ target = "scene" } = {}) => { const current = build(); return { data: target === "scene" ? toEditorSafeValue(current.plan) : { target, descriptors: toEditorSafeValue(current.plan.contract?.descriptorCounts) } }; } },
      { id: "scene.listDescriptors", domain: "scene", execute: () => { const plan = build().plan; return { data: { fields: Object.keys(plan.fields ?? {}), assets: Object.keys(plan.assets ?? {}), effects: Object.keys(plan.effects ?? {}) } }; } },
      { id: "renderer.getSnapshot", domain: "renderer", execute: () => { const current = build(); return { data: { mesh: { vertexCount: current.mesh.vertexCount, triangleCount: current.mesh.triangleCount, primitiveFallbackCount: current.mesh.primitiveFallbackCount }, metrics: current.metrics } }; } },
      { id: "renderer.capture", domain: "renderer", execute: capture },
      { id: "renderer.getErrors", domain: "renderer", execute: () => ({ data: { errors: [], observations: build().metrics.observations } }) },
      { id: "renderer.compare", domain: "renderer", execute: () => ({ data: { previous: lastCapture, current: build().metrics, changed: Boolean(lastCapture) } }) },
      { id: "camera.get", domain: "camera", execute: () => ({ data: toEditorSafeValue(build().plan.style?.camera ?? null) }) },
      { id: "browser.getViewport", domain: "browser", execute: () => ({ data: { width: 1200, height: 675, kind: "headless-observation" } }) },
      { id: "browser.getErrors", domain: "browser", execute: () => ({ data: { errors: [], note: "Real browser errors are exposed by window.NexusEditorEnvironment when a browser driver is connected." } }) },
      { id: "workspace.list", domain: "workspace", execute: async ({ path = "." } = {}) => ({ data: await readdir(safePath(root, path)) }) },
      { id: "workspace.read", domain: "workspace", execute: async ({ path } = {}) => ({ data: await readFile(safePath(root, path), "utf8") }) },
      { id: "workspace.write", domain: "workspace", execute: async ({ path, content = "" } = {}) => { const target = safePath(root, path); await mkdir(dirname(target), { recursive: true }); await writeFile(target, String(content)); return { data: { path } }; } }
    ]
  });
}

export default createEnvironment;
