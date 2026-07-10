export const MEADOW_RENDER_PLAN_SCHEMA = "meadow-render-plan/v2";
export const MEADOW_RENDER_PLAN_VERSION = 2;

const TAU = Math.PI * 2;
const KNOWN_SOURCE_TYPES = new Set([
  "atmosphere",
  "ground",
  "path",
  "grass-blade",
  "wildflower",
  "rock",
  "mushroom",
  "tree-line-tree",
  "focal-tree",
  "terrain-surface"
]);

function finite(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, finite(value, min)));
}

function round(value, places = 4) {
  const scale = 10 ** places;
  return Math.round(finite(value) * scale) / scale;
}

function hashUint(value) {
  let hash = 2166136261;
  for (const character of String(value)) {
    hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
  }
  return hash >>> 0;
}

export function stableHash(value) {
  return hashUint(typeof value === "string" ? value : JSON.stringify(value)).toString(36);
}

function hashUnit(value) {
  return hashUint(value) / 4294967295;
}

function position(value = {}) {
  return Object.freeze({
    x: round(value.x),
    y: round(value.y),
    z: round(value.z ?? value.y)
  });
}

function freezeArray(values = []) {
  return Object.freeze(values.map((value) => Object.freeze(value)));
}

function averagePosition(objects = []) {
  if (!objects.length) return position();
  const total = objects.reduce((sum, object) => {
    sum.x += finite(object.position?.x);
    sum.y += finite(object.position?.y);
    sum.z += finite(object.position?.z);
    return sum;
  }, { x: 0, y: 0, z: 0 });
  return position({ x: total.x / objects.length, y: total.y / objects.length, z: total.z / objects.length });
}

function sourceObjects(renderPlan = {}) {
  return Array.isArray(renderPlan.objects) ? renderPlan.objects : [];
}

function sourcePath(renderPlan = {}) {
  return sourceObjects(renderPlan).find((object) => object.type === "path") ?? renderPlan.features?.path ?? {
    id: "meadow-path",
    type: "path",
    enabled: false,
    points: [],
    width: 3.9
  };
}

function createTerrainSurface(renderPlan = {}) {
  const area = renderPlan.area ?? { id: "meadow", anchor: { x: 0, y: 0, z: 0 }, width: 90, depth: 110 };
  const path = sourcePath(renderPlan);
  const materials = renderPlan.style?.materials ?? {};
  const terrain = materials.terrain ?? {};
  const grass = materials.grass ?? {};
  const pathMaterial = materials.path ?? {};
  return Object.freeze({
    id: `${renderPlan.id ?? area.id ?? "meadow"}-terrain-surface-v2`,
    type: "terrain-surface",
    bounds: Object.freeze({
      x: finite(area.anchor?.x),
      y: finite(area.anchor?.y),
      z: finite(area.anchor?.z),
      width: round(finite(area.width, 90) * 1.72),
      depth: round(finite(area.depth, 110) * 1.44)
    }),
    resolution: Object.freeze({ xSegments: 64, zSegments: 82 }),
    height: Object.freeze({
      base: round(finite(area.anchor?.y) - 0.08),
      macroAmplitude: 0.24,
      macroScale: 0.034,
      microAmplitude: 0.07,
      microScale: 0.12,
      pathFlatten: 0.1,
      rutDepth: 0.045
    }),
    material: Object.freeze({
      base: terrain.meadowBase ?? grass.base ?? "#6f8b52",
      warm: terrain.meadowWarm ?? grass.highlight ?? "#91aa5c",
      shade: terrain.meadowShade ?? grass.shade ?? "#4c6d35",
      dry: terrain.meadowDry ?? "#a5a45b",
      variation: 0.38
    }),
    path: Object.freeze({
      id: path.id ?? "meadow-path",
      enabled: path.enabled !== false,
      points: freezeArray((path.points ?? []).map((pointValue) => position(pointValue))),
      width: round(Math.max(0.6, finite(path.width, 3.9))),
      shoulderWidth: round(Math.max(0.8, finite(path.width, 3.9) * 0.82)),
      edgeBlend: round(Math.max(0.45, finite(path.width, 3.9) * 0.48)),
      centerColor: terrain.pathCenter ?? pathMaterial.highlight ?? "#f3d176",
      midColor: terrain.pathMid ?? pathMaterial.base ?? "#d9a752",
      edgeColor: terrain.pathEdge ?? pathMaterial.shade ?? "#9f7b3f",
      rutColor: terrain.rut ?? "#8d6132",
      pebbleColor: terrain.pebble ?? materials.rock?.highlight ?? "#d8d1a3",
      rutCount: Math.max(0, Math.floor(finite(path.rutCount, 3))),
      pebbleCount: Math.max(0, Math.floor(finite(path.pebbleCount, 96)))
    })
  });
}

function createFlowerField(objects = [], renderPlan = {}) {
  const flowerObjects = objects.filter((object) => object.type === "wildflower");
  const clusterSize = 6;
  const instances = [];
  for (let index = 0; index < flowerObjects.length; index += clusterSize) {
    const members = flowerObjects.slice(index, index + clusterSize);
    const id = `wildflower-cluster-${String(index / clusterSize).padStart(3, "0")}`;
    const averageScale = members.reduce((sum, member) => sum + finite(member.scale, 1), 0) / Math.max(1, members.length);
    instances.push({
      id,
      type: "wildflower-cluster-instance",
      archetypeId: hashUnit(`${renderPlan.seed}:${id}:variant`) > 0.5 ? "wildflower-cluster-pink-b" : "wildflower-cluster-pink-a",
      position: averagePosition(members),
      rotation: round(hashUnit(`${renderPlan.seed}:${id}:rotation`) * TAU),
      scale: round(clamp(averageScale, 0.65, 1.5)),
      flowerCount: Math.max(5, Math.min(11, members.length + 2)),
      spread: round(0.42 + hashUnit(`${renderPlan.seed}:${id}:spread`) * 0.46),
      windPhase: round(hashUnit(`${renderPlan.seed}:${id}:wind`)),
      color: members[0]?.color ?? renderPlan.style?.materials?.flower?.base ?? "#d85d9a",
      accent: members[0]?.accent ?? renderPlan.style?.materials?.flower?.highlight ?? "#f4d976"
    });
  }
  return Object.freeze({
    id: `${renderPlan.id ?? "meadow"}-wildflower-field`,
    type: "wildflower-cluster-field",
    archetypes: Object.freeze(["wildflower-cluster-pink-a", "wildflower-cluster-pink-b"]),
    instances: freezeArray(instances),
    sourceObjectCount: flowerObjects.length
  });
}

function createRockField(objects = [], renderPlan = {}) {
  const rockObjects = objects.filter((object) => object.type === "rock");
  const archetypes = ["meadow-rock-a", "meadow-rock-b", "meadow-rock-c", "meadow-rock-d"];
  return Object.freeze({
    id: `${renderPlan.id ?? "meadow"}-rock-field`,
    type: "rock-instance-field",
    archetypes: Object.freeze(archetypes),
    instances: freezeArray(rockObjects.map((object, index) => ({
      id: object.id ?? `rock-${index}`,
      type: "rock-instance",
      archetypeId: archetypes[Math.floor(hashUnit(`${renderPlan.seed}:${object.id ?? index}:archetype`) * archetypes.length) % archetypes.length],
      position: position(object.position),
      rotation: round(finite(object.rotation, hashUnit(`${renderPlan.seed}:${index}:rotation`) * TAU)),
      scale: round(clamp(finite(object.scale, 1), 0.58, 1.65)),
      moss: round(0.18 + hashUnit(`${renderPlan.seed}:${object.id ?? index}:moss`) * 0.54),
      color: object.color ?? renderPlan.style?.materials?.rock?.base ?? "#777568",
      accent: object.accent ?? renderPlan.style?.materials?.rock?.highlight ?? "#c3c799"
    }))),
    sourceObjectCount: rockObjects.length
  });
}

function createGroundCoverField(objects = [], renderPlan = {}) {
  const source = objects.filter((object) => object.type === "mushroom");
  return Object.freeze({
    id: `${renderPlan.id ?? "meadow"}-ground-cover-field`,
    type: "ground-cover-field",
    archetypes: Object.freeze(["broadleaf-cover-a", "broadleaf-cover-b"]),
    instances: freezeArray(source.map((object, index) => ({
      id: `ground-cover-${object.id ?? index}`,
      type: "ground-cover-instance",
      archetypeId: index % 2 ? "broadleaf-cover-b" : "broadleaf-cover-a",
      position: position(object.position),
      rotation: round(finite(object.rotation)),
      scale: round(clamp(finite(object.scale, 1), 0.55, 1.35)),
      windPhase: round(hashUnit(`${renderPlan.seed}:cover:${object.id ?? index}`))
    }))),
    sourceObjectCount: source.length,
    conversion: "decorative mushrooms converted to meadow ground cover"
  });
}

function createDistantTreeField(objects = [], renderPlan = {}) {
  const treeObjects = objects.filter((object) => object.type === "tree-line-tree");
  const archetypes = ["distant-tree-columnar", "distant-tree-wide", "distant-tree-sparse"];
  return Object.freeze({
    id: `${renderPlan.id ?? "meadow"}-distant-tree-band`,
    type: "distant-tree-billboard-band",
    archetypes: Object.freeze(archetypes),
    instances: freezeArray(treeObjects.map((object, index) => ({
      id: object.id ?? `distant-tree-${index}`,
      type: "distant-tree-instance",
      archetypeId: archetypes[Math.floor(hashUnit(`${renderPlan.seed}:tree:${object.id ?? index}`) * archetypes.length) % archetypes.length],
      position: position(object.position),
      rotation: round(finite(object.rotation)),
      scale: round(clamp(finite(object.scale, 1), 0.58, 1.55)),
      windPhase: round(hashUnit(`${renderPlan.seed}:tree-wind:${object.id ?? index}`)),
      color: object.color ?? renderPlan.style?.materials?.leaf?.shade ?? "#1a2e16",
      accent: object.accent ?? renderPlan.style?.materials?.leaf?.base ?? "#3f612a"
    }))),
    sourceObjectCount: treeObjects.length
  });
}

function createHeroTreeAsset(tree = {}, renderPlan = {}) {
  const height = Math.max(5, finite(tree.trunkHeight, 12.2));
  const radius = Math.max(4, finite(tree.canopyRadius, 13.2));
  const segmentCount = 7;
  const trunkPoints = [];
  for (let index = 0; index <= segmentCount; index += 1) {
    const t = index / segmentCount;
    trunkPoints.push(position({
      x: Math.sin(t * 2.1) * 0.28 * t,
      y: height * t,
      z: Math.sin(t * 1.35 + 0.7) * 0.18 * t
    }));
  }

  const segments = [];
  for (let index = 0; index < trunkPoints.length - 1; index += 1) {
    const t = index / Math.max(1, trunkPoints.length - 2);
    segments.push({
      id: `hero-trunk-${index}`,
      kind: "trunk",
      start: trunkPoints[index],
      end: trunkPoints[index + 1],
      startRadius: round(finite(tree.trunkRadius, 1.36) * (1 - t * 0.62)),
      endRadius: round(finite(tree.trunkRadius, 1.36) * (1 - (t + 1 / segmentCount) * 0.62))
    });
  }

  const rootCount = Math.max(8, Math.min(16, Math.floor(finite(tree.rootCount, 12))));
  for (let index = 0; index < rootCount; index += 1) {
    const angle = index / rootCount * TAU + hashUnit(`${renderPlan.seed}:root:${index}`) * 0.3;
    const length = 2.2 + hashUnit(`${renderPlan.seed}:root-length:${index}`) * 2.4;
    segments.push({
      id: `hero-root-${index}`,
      kind: "root",
      start: position({ x: 0, y: 0.08, z: 0 }),
      end: position({ x: Math.cos(angle) * length, y: -0.16, z: Math.sin(angle) * length }),
      startRadius: round(finite(tree.trunkRadius, 1.36) * 0.58),
      endRadius: round(0.11 + hashUnit(`${renderPlan.seed}:root-tip:${index}`) * 0.12)
    });
  }

  const branchTips = [];
  const branchCount = Math.max(12, Math.min(22, Math.floor(finite(tree.branchCount, 20))));
  const golden = 2.399963229728653;
  for (let index = 0; index < branchCount; index += 1) {
    const t = index / Math.max(1, branchCount - 1);
    const startY = height * (0.34 + t * 0.5);
    const angle = index * golden + hashUnit(`${renderPlan.seed}:branch-angle:${index}`) * 0.44;
    const length = radius * (0.42 + hashUnit(`${renderPlan.seed}:branch-length:${index}`) * 0.36) * (1 - t * 0.18);
    const trunkX = Math.sin(startY / height * 2.1) * 0.28 * (startY / height);
    const trunkZ = Math.sin(startY / height * 1.35 + 0.7) * 0.18 * (startY / height);
    const start = position({ x: trunkX, y: startY, z: trunkZ });
    const middle = position({
      x: trunkX + Math.cos(angle) * length * 0.48,
      y: startY + length * (0.16 + hashUnit(`${renderPlan.seed}:branch-rise:${index}`) * 0.12),
      z: trunkZ + Math.sin(angle) * length * 0.48
    });
    const tipAngle = angle + (hashUnit(`${renderPlan.seed}:branch-turn:${index}`) - 0.5) * 0.48;
    const end = position({
      x: trunkX + Math.cos(tipAngle) * length,
      y: startY + length * (0.18 + hashUnit(`${renderPlan.seed}:branch-end-rise:${index}`) * 0.2),
      z: trunkZ + Math.sin(tipAngle) * length
    });
    const baseRadius = 0.34 + (1 - t) * 0.26;
    segments.push({ id: `hero-branch-${index}-a`, kind: "branch", start, end: middle, startRadius: round(baseRadius), endRadius: round(baseRadius * 0.62) });
    segments.push({ id: `hero-branch-${index}-b`, kind: "branch", start: middle, end, startRadius: round(baseRadius * 0.62), endRadius: round(baseRadius * 0.18) });
    branchTips.push(end);
  }

  const leafClusters = [];
  branchTips.forEach((tip, index) => {
    const clusterCount = index % 3 === 0 ? 3 : 2;
    for (let clusterIndex = 0; clusterIndex < clusterCount; clusterIndex += 1) {
      const angle = hashUnit(`${renderPlan.seed}:leaf-angle:${index}:${clusterIndex}`) * TAU;
      const offset = radius * (0.08 + hashUnit(`${renderPlan.seed}:leaf-offset:${index}:${clusterIndex}`) * 0.12);
      leafClusters.push({
        id: `hero-leaf-cluster-${index}-${clusterIndex}`,
        type: "leaf-card-cluster",
        position: position({
          x: tip.x + Math.cos(angle) * offset,
          y: tip.y + (hashUnit(`${renderPlan.seed}:leaf-y:${index}:${clusterIndex}`) - 0.3) * offset,
          z: tip.z + Math.sin(angle) * offset
        }),
        radius: round(radius * (0.12 + hashUnit(`${renderPlan.seed}:leaf-radius:${index}:${clusterIndex}`) * 0.075)),
        cardCount: 7 + Math.floor(hashUnit(`${renderPlan.seed}:leaf-cards:${index}:${clusterIndex}`) * 6),
        windPhase: round(hashUnit(`${renderPlan.seed}:leaf-wind:${index}:${clusterIndex}`)),
        tint: round(0.82 + hashUnit(`${renderPlan.seed}:leaf-tint:${index}:${clusterIndex}`) * 0.25)
      });
    }
  });

  for (let index = 0; index < 8; index += 1) {
    const angle = index / 8 * TAU;
    leafClusters.push({
      id: `hero-crown-${index}`,
      type: "leaf-card-cluster",
      position: position({
        x: Math.cos(angle) * radius * 0.28,
        y: height * (0.9 + (index % 2) * 0.035),
        z: Math.sin(angle) * radius * 0.28
      }),
      radius: round(radius * 0.17),
      cardCount: 10,
      windPhase: round(hashUnit(`${renderPlan.seed}:crown:${index}`)),
      tint: round(0.92 + (index % 3) * 0.06)
    });
  }

  return Object.freeze({
    id: tree.id ?? "focal-tree",
    type: "hero-tree-asset",
    archetypeId: "arrival-meadow-hero-tree-v2",
    position: position(tree.position),
    segments: freezeArray(segments),
    leafClusters: freezeArray(leafClusters),
    materials: Object.freeze({
      barkBase: renderPlan.style?.materials?.bark?.base ?? "#5b3719",
      barkShade: renderPlan.style?.materials?.bark?.shade ?? "#1f1209",
      barkHighlight: renderPlan.style?.materials?.bark?.highlight ?? "#9b672d",
      leafBase: renderPlan.style?.materials?.leaf?.base ?? "#3f612a",
      leafShade: renderPlan.style?.materials?.leaf?.shade ?? "#1a2e16",
      leafHighlight: renderPlan.style?.materials?.leaf?.highlight ?? "#d0993d"
    }),
    shadowRadius: round(finite(tree.shadowRadius, 7.2)),
    outlineWeight: round(finite(tree.renderStyle?.outlineWeight, 0.12))
  });
}

function topologySummary(plan = {}) {
  return {
    schema: plan.schema,
    id: plan.id,
    seed: plan.seed,
    area: plan.area,
    terrain: plan.terrainSurface,
    grass: {
      batches: plan.fields?.grass?.staticBatches?.map((batch) => [batch.id, batch.lod, batch.cardCount]),
      groups: plan.fields?.grass?.drawGroups?.map((group) => [
        group.batchId,
        group.instances?.map((instance) => [instance.x, instance.z, instance.rotation, instance.scale])
      ])
    },
    flowers: plan.fields?.flowers?.instances,
    rocks: plan.fields?.rocks?.instances,
    cover: plan.fields?.groundCover?.instances,
    distantTrees: plan.fields?.distantTrees?.instances,
    tree: {
      segments: plan.assets?.focalTree?.segments,
      leaves: plan.assets?.focalTree?.leafClusters
    }
  };
}

export function sourceTopologyKey(renderPlan = {}) {
  const objects = sourceObjects(renderPlan).map((object) => ({
    id: object.id,
    type: object.type,
    position: object.position,
    scale: object.scale,
    rotation: object.rotation,
    points: object.type === "path" ? object.points : undefined,
    width: object.type === "path" ? object.width : undefined,
    branchCount: object.type === "focal-tree" ? object.branchCount : undefined,
    canopyRadius: object.type === "focal-tree" ? object.canopyRadius : undefined
  }));
  return stableHash({ id: renderPlan.id, version: renderPlan.version, seed: renderPlan.seed, area: renderPlan.area, style: renderPlan.style, objects });
}

export function validateMeadowRenderPlanV2(renderPlan = {}) {
  const failures = [];
  if (renderPlan.schema !== MEADOW_RENDER_PLAN_SCHEMA) failures.push(`schema must be ${MEADOW_RENDER_PLAN_SCHEMA}`);
  if (renderPlan.schemaVersion !== MEADOW_RENDER_PLAN_VERSION) failures.push(`schemaVersion must be ${MEADOW_RENDER_PLAN_VERSION}`);
  if (!renderPlan.id) failures.push("render plan id missing");
  if (!renderPlan.area?.id) failures.push("area id missing");
  if (renderPlan.terrainSurface?.type !== "terrain-surface") failures.push("terrain surface missing");
  if (renderPlan.pathSurface?.type !== "path-surface") failures.push("path surface missing");
  if (renderPlan.fields?.grass?.type !== "texture-driven-grass-system") failures.push("grass field missing");
  if (!Array.isArray(renderPlan.fields?.grass?.staticBatches)) failures.push("grass static batches missing");
  if (!Array.isArray(renderPlan.fields?.grass?.drawGroups)) failures.push("grass draw groups missing");
  if (renderPlan.fields?.flowers?.type !== "wildflower-cluster-field") failures.push("flower field missing");
  if (renderPlan.fields?.rocks?.type !== "rock-instance-field") failures.push("rock field missing");
  if (renderPlan.fields?.distantTrees?.type !== "distant-tree-billboard-band") failures.push("distant tree field missing");
  if (renderPlan.assets?.focalTree?.type !== "hero-tree-asset") failures.push("hero tree asset missing");
  if (renderPlan.contract?.unknownSourceTypes?.length) failures.push(`unsupported source types: ${renderPlan.contract.unknownSourceTypes.join(", ")}`);
  return Object.freeze({ passed: failures.length === 0, failures: Object.freeze(failures) });
}

export function createMeadowRenderPlanV2(renderPlan = {}, options = {}) {
  const objects = options.sourceObjects ?? sourceObjects(renderPlan);
  const grassSystem = options.grassSystem ?? renderPlan.grassSystem;
  const atmosphere = objects.find((object) => object.type === "atmosphere") ?? null;
  const focalTree = options.focalTree ?? objects.find((object) => object.type === "focal-tree") ?? {};
  const terrainSurface = createTerrainSurface({ ...renderPlan, objects });
  const pathSurface = Object.freeze({
    id: terrainSurface.path.id,
    type: "path-surface",
    ...terrainSurface.path
  });
  const unknownSourceTypes = Object.freeze([...new Set(objects.map((object) => object.type).filter((type) => !KNOWN_SOURCE_TYPES.has(type)))]);
  const compatibilityObjects = Object.freeze(objects.filter((object) => ["atmosphere", "ground", "path", "focal-tree"].includes(object.type)));

  const base = {
    ...renderPlan,
    schema: MEADOW_RENDER_PLAN_SCHEMA,
    schemaVersion: MEADOW_RENDER_PLAN_VERSION,
    objects: compatibilityObjects,
    terrainSurface,
    pathSurface,
    atmosphere,
    fields: Object.freeze({
      grass: grassSystem,
      flowers: createFlowerField(objects, renderPlan),
      rocks: createRockField(objects, renderPlan),
      groundCover: createGroundCoverField(objects, renderPlan),
      distantTrees: createDistantTreeField(objects, renderPlan)
    }),
    assets: Object.freeze({ focalTree: createHeroTreeAsset(focalTree, renderPlan) }),
    effects: Object.freeze({
      wind: options.wind ?? renderPlan.windField ?? renderPlan.wind ?? {},
      postProcess: options.postProcess ?? renderPlan.postProcess ?? null
    }),
    performance: options.performance ?? renderPlan.performance ?? null
  };

  const topologyKey = stableHash(topologySummary(base));
  const descriptorCounts = Object.freeze({
    grassBatches: base.fields.grass?.staticBatches?.length ?? 0,
    grassDrawGroups: base.fields.grass?.drawGroups?.length ?? 0,
    grassInstances: base.fields.grass?.drawGroups?.reduce((sum, group) => sum + (group.instances?.length ?? 0), 0) ?? 0,
    flowerClusters: base.fields.flowers.instances.length,
    rocks: base.fields.rocks.instances.length,
    groundCover: base.fields.groundCover.instances.length,
    distantTrees: base.fields.distantTrees.instances.length,
    treeSegments: base.assets.focalTree.segments.length,
    leafClusters: base.assets.focalTree.leafClusters.length
  });

  const preliminary = {
    ...base,
    contract: Object.freeze({
      id: "meadow-render-contract-v2",
      topologyKey,
      staticTopology: true,
      unknownSourceTypes,
      descriptorCounts,
      cachePolicy: "rebuild-on-topology-key-change"
    })
  };
  const validation = validateMeadowRenderPlanV2(preliminary);
  return Object.freeze({
    ...preliminary,
    contract: Object.freeze({ ...preliminary.contract, validation })
  });
}

export function withMeadowRenderTime(renderPlan = {}, time = 0, runtime = {}) {
  return Object.freeze({
    ...renderPlan,
    time: finite(time),
    runtime: Object.freeze({
      ...(renderPlan.runtime ?? {}),
      ...runtime
    })
  });
}
