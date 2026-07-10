function hashUint(value) {
  let hash = 2166136261;
  for (const character of String(value)) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
  return hash >>> 0;
}

function hashUnit(value) {
  return hashUint(value) / 4294967295;
}

function freezeObject(value) {
  if (Array.isArray(value)) return Object.freeze(value.map(freezeObject));
  if (value && typeof value === "object") {
    return Object.freeze(Object.fromEntries(Object.entries(value).map(([key, child]) => [key, freezeObject(child)])));
  }
  return value;
}

function scatter(config, kind, count, options = {}) {
  const area = config.area;
  const seed = `${config.seed}:${kind}`;
  const output = [];
  for (let index = 0; index < count; index += 1) {
    const side = hashUnit(`${seed}:side:${index}`) > 0.5 ? 1 : -1;
    const sideDistance = options.sideMin + hashUnit(`${seed}:x:${index}`) * (options.sideMax - options.sideMin);
    const z = options.zMin + hashUnit(`${seed}:z:${index}`) * (options.zMax - options.zMin);
    const scale = options.scaleMin + hashUnit(`${seed}:scale:${index}`) * (options.scaleMax - options.scaleMin);
    output.push({
      id: `${kind}-${String(index).padStart(4, "0")}`,
      type: kind,
      position: { x: area.anchor.x + side * sideDistance, y: area.anchor.y, z },
      rotation: hashUnit(`${seed}:rotation:${index}`) * Math.PI * 2,
      scale,
      color: options.color,
      accent: options.accent
    });
  }
  return output;
}

export function createLocalMeadowSourcePlan(config = {}, { time = 0 } = {}) {
  const area = config.area ?? { id: "arrival-meadow", anchor: { x: 0, y: 0, z: 20 }, width: 90, depth: 110 };
  const features = config.features ?? {};
  const style = config.style ?? {};
  const materials = style.materials ?? {};
  const zMin = area.anchor.z - area.depth * 0.5;
  const zMax = area.anchor.z + area.depth * 0.5;
  const objects = [
    {
      id: "meadow-atmosphere",
      type: "atmosphere",
      enabled: true,
      hills: [
        { y: 0.38, color: "#87947b" },
        { y: 0.5, color: "#687b70" },
        { y: 0.6, color: "#536c69" }
      ],
      sun: { position: { x: -28, y: 30, z: 72 }, radius: 5.4, color: "#ffd38b" }
    },
    { id: "meadow-ground", type: "ground", color: materials.grass?.base ?? "#58733f" },
    { id: "meadow-path", type: "path", ...(features.path ?? {}) },
    {
      id: "meadow-grass-source",
      type: "grass-blade",
      position: { x: area.anchor.x, y: area.anchor.y, z: zMin },
      width: 0.04,
      height: 0.5,
      color: materials.grass?.base ?? "#58733f"
    }
  ];

  if (features.flowers?.enabled !== false) {
    objects.push(...scatter(config, "wildflower", Math.max(0, Math.floor(features.flowers?.count ?? 0)), {
      sideMin: area.width * 0.08,
      sideMax: area.width * 0.47,
      zMin,
      zMax: area.anchor.z + area.depth * 0.22,
      scaleMin: 0.55,
      scaleMax: 1.08,
      color: materials.flower?.base ?? "#c76f99",
      accent: materials.flower?.highlight ?? "#e3c878"
    }));
  }

  if (features.rocks?.enabled !== false) {
    objects.push(...scatter(config, "rock", Math.max(0, Math.floor(features.rocks?.count ?? 0)), {
      sideMin: area.width * 0.11,
      sideMax: area.width * 0.45,
      zMin,
      zMax: area.anchor.z + area.depth * 0.3,
      scaleMin: 0.34,
      scaleMax: 0.78,
      color: materials.rock?.base ?? "#73766c",
      accent: materials.rock?.highlight ?? "#9ba88a"
    }));
  }

  if (features.treeLine?.enabled !== false) {
    objects.push(...scatter(config, "tree-line-tree", Math.max(0, Math.floor(features.treeLine?.count ?? 0)), {
      sideMin: area.width * 0.18,
      sideMax: area.width * 0.66,
      zMin: area.anchor.z + area.depth * 0.26,
      zMax,
      scaleMin: 0.7,
      scaleMax: 1.3,
      color: materials.leaf?.shade ?? "#243d2b",
      accent: materials.leaf?.base ?? "#4c6b3c"
    }));
  }

  if (features.focalTree?.enabled !== false) {
    objects.push({ id: "focal-tree", type: "focal-tree", ...(features.focalTree ?? {}) });
  }

  const counts = objects.reduce((result, object) => {
    result[object.type] = (result[object.type] ?? 0) + 1;
    return result;
  }, {});

  return freezeObject({
    id: area.id,
    type: "meadow-area-render-plan",
    version: "local-source-plan-v1",
    time: Number(time) || 0,
    seed: config.seed,
    area,
    style,
    wind: features.wind,
    objects,
    stats: { objectCount: objects.length, counts },
    validation: { passed: true, failures: [], localSourcePlan: true }
  });
}
