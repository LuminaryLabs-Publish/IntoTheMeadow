import { enhanceRenderPlan } from "../src/game/enhance-render-plan.js";
import { buildMeadowMeshData } from "../src/renderers/meadow-mesh-builder-v2.js";

function freeze(value) {
  if (Array.isArray(value)) return Object.freeze(value.map(freeze));
  if (value && typeof value === "object") {
    return Object.freeze(Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, freeze(entry)])));
  }
  return value;
}

const objects = [
  {
    id: "atmosphere",
    type: "atmosphere",
    enabled: true,
    hills: [
      { id: "near", y: 0.43, color: "#7d8d62", alpha: 0.48 },
      { id: "far", y: 0.35, color: "#506f6d", alpha: 0.32 }
    ],
    ground: { far: "#b4b978" }
  },
  { id: "ground", type: "ground" },
  {
    id: "arrival-path",
    type: "path",
    enabled: true,
    width: 3.7,
    rutCount: 3,
    pebbleCount: 48,
    points: [
      { x: 0, z: -34 },
      { x: -2, z: -20 },
      { x: 2, z: -6 },
      { x: -1, z: 10 },
      { x: 0, z: 24 }
    ]
  }
];

for (let index = 0; index < 24; index += 1) {
  objects.push({
    id: `flower-${index}`,
    type: "wildflower",
    position: { x: -18 + (index % 8) * 5, y: 0, z: -20 + Math.floor(index / 8) * 14 },
    scale: 0.72 + (index % 4) * 0.14,
    rotation: index * 0.37,
    color: "#d85d9a",
    accent: "#f4d976"
  });
}

for (let index = 0; index < 8; index += 1) {
  objects.push({
    id: `rock-${index}`,
    type: "rock",
    position: { x: index % 2 ? 10 + index : -12 - index, y: 0, z: -16 + index * 7 },
    scale: 0.7 + (index % 3) * 0.22,
    rotation: index * 0.51,
    color: "#777568",
    accent: "#c3c799"
  });
}

for (let index = 0; index < 6; index += 1) {
  objects.push({
    id: `cover-source-${index}`,
    type: "mushroom",
    position: { x: -15 + index * 6, y: 0, z: -7 + (index % 2) * 8 },
    scale: 0.75 + index * 0.06,
    rotation: index * 0.42
  });
}

for (let index = 0; index < 6; index += 1) {
  objects.push({
    id: `distant-tree-${index}`,
    type: "tree-line-tree",
    position: { x: -28 + index * 11, y: 0, z: 54 + (index % 2) * 5 },
    scale: 0.85 + (index % 3) * 0.16,
    rotation: index * 0.19,
    color: "#1a2e16",
    accent: "#3f612a"
  });
}

objects.push({
  id: "focal-tree",
  type: "focal-tree",
  position: { x: 0, y: 0, z: 24 },
  trunkRadius: 1.4,
  trunkHeight: 12.8,
  branchCount: 20,
  rootCount: 13,
  canopyRadius: 13.4,
  leafClusterCount: 112,
  shadowRadius: 7.4
});

const rawPlan = freeze({
  id: "renderer-v2-fixture",
  type: "meadow-area-render-plan",
  version: "0.1.0",
  seed: "renderer-v2-fixture-seed",
  time: 0,
  area: {
    id: "renderer-v2-fixture",
    anchor: { x: 0, y: 0, z: 10 },
    width: 60,
    depth: 80
  },
  style: {
    camera: { position: { x: 0, y: 5.6, z: -42 }, target: { x: 0, y: 5.2, z: 24 }, fov: 46, near: 0.1, far: 170 },
    light: { direction: { x: -0.48, y: 0.82, z: -0.3 }, outlineWidth: 0.052 },
    materials: {
      grass: { base: "#5f813c", shade: "#263b1e", highlight: "#d0b861" },
      flower: { base: "#d85d9a", shade: "#6b2856", highlight: "#f4d976" },
      rock: { base: "#777568", shade: "#3c3e35", highlight: "#c3c799" },
      bark: { base: "#5b3719", shade: "#1f1209", highlight: "#9b672d" },
      leaf: { base: "#3f612a", shade: "#1a2e16", highlight: "#d0993d" },
      sky: { base: "#7fb2dc", shade: "#496f88", highlight: "#efd39a" },
      terrain: {
        meadowBase: "#6f8b52",
        meadowWarm: "#91aa5c",
        meadowShade: "#4c6d35",
        meadowDry: "#a5a45b",
        pathCenter: "#f3d176",
        pathMid: "#d9a752",
        pathEdge: "#9f7b3f",
        rut: "#8d6132",
        pebble: "#d8d1a3"
      }
    }
  },
  wind: { enabled: true, strength: 0.3, gust: 0.12, direction: { x: 0.72, y: 0, z: 0.34 } },
  objects,
  stats: { objectCount: objects.length, counts: {} },
  validation: { passed: true, failures: [] }
});

const plan = enhanceRenderPlan(rawPlan);
if (!plan.contract?.validation?.passed) throw new Error(`Contract failed: ${plan.contract?.validation?.failures?.join("; ")}`);
if (plan.contract.unknownSourceTypes.length) throw new Error(`Unexpected source types: ${plan.contract.unknownSourceTypes.join(", ")}`);
if (plan.fields.flowers.instances.length !== 4) throw new Error(`Expected 4 flower clusters, got ${plan.fields.flowers.instances.length}`);
if (plan.fields.rocks.instances.length !== 8) throw new Error(`Expected 8 rock instances, got ${plan.fields.rocks.instances.length}`);
if (plan.fields.groundCover.instances.length !== 6) throw new Error(`Expected 6 ground-cover instances, got ${plan.fields.groundCover.instances.length}`);
if (plan.fields.distantTrees.instances.length !== 6) throw new Error(`Expected 6 distant trees, got ${plan.fields.distantTrees.instances.length}`);
if (plan.assets.focalTree.segments.length < 30) throw new Error("Hero tree branch skeleton is unexpectedly small");
if (plan.assets.focalTree.leafClusters.length < 30) throw new Error("Hero tree leaf field is unexpectedly small");
if (plan.objects.some((object) => ["grass-blade", "wildflower", "rock", "mushroom", "tree-line-tree"].includes(object.type))) {
  throw new Error("Primitive source objects leaked into the compatibility object list");
}

const mesh = buildMeadowMeshData(plan);
if (mesh.vertexCount <= 1000) throw new Error(`Expected substantial mesh output, got ${mesh.vertexCount} vertices`);
if (mesh.vertexCount % 3 !== 0) throw new Error("Mesh vertex count is not triangle aligned");
if (mesh.positions.length !== mesh.vertexCount * 3) throw new Error("Position buffer length mismatch");
if (mesh.normals.length !== mesh.vertexCount * 3) throw new Error("Normal buffer length mismatch");
if (mesh.colors.length !== mesh.vertexCount * 3) throw new Error("Color buffer length mismatch");
if (mesh.outlines.length !== mesh.vertexCount) throw new Error("Outline buffer length mismatch");
if (mesh.wind.length !== mesh.vertexCount * 2) throw new Error("Wind buffer length mismatch");
if (mesh.primitiveFallbackCount !== 0) throw new Error("Primitive fallback geometry was emitted");

const timedPlan = enhanceRenderPlan(freeze({ ...rawPlan, time: 2.5 }));
const timedMesh = buildMeadowMeshData(timedPlan);
if (timedPlan.contract.topologyKey !== plan.contract.topologyKey) throw new Error("Animation time changed render topology");
if (timedMesh.meshKey !== mesh.meshKey) throw new Error("Animation time changed static mesh key");
if (timedMesh.vertexCount !== mesh.vertexCount) throw new Error("Animation time changed static mesh vertex count");

console.log(`renderer v2 smoke ok · vertices:${mesh.vertexCount} triangles:${mesh.triangleCount} fallback:${mesh.primitiveFallbackCount}`);
