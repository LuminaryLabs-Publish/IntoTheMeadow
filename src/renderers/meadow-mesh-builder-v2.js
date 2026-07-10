import { MEADOW_RENDER_PLAN_SCHEMA, stableHash } from "../render-contract/meadow-render-plan-v2.js";

const TAU = Math.PI * 2;

function finite(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, finite(value, min)));
}

function smoothstep(edge0, edge1, value) {
  const t = clamp((finite(value) - edge0) / Math.max(0.00001, edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function hashUint(value) {
  let hash = 2166136261;
  for (const character of String(value)) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
  return hash >>> 0;
}

function hashUnit(value) {
  return hashUint(value) / 4294967295;
}

function hex(color, fallback = "#ffffff") {
  const source = /^#[0-9a-f]{6}$/i.test(String(color)) ? String(color) : fallback;
  const value = source.slice(1);
  return [0, 2, 4].map((index) => parseInt(value.slice(index, index + 2), 16) / 255);
}

function rgb(color, fallback = "#ffffff") {
  if (Array.isArray(color)) return color.slice(0, 3).map((value) => clamp(value));
  if (String(color).startsWith("#")) return hex(color, fallback);
  const match = String(color ?? "").match(/rgba?\(([^)]+)\)/);
  if (!match) return hex(fallback);
  return match[1].split(",").slice(0, 3).map((part) => clamp(Number(part.trim()) / 255));
}

function mix(a, b, amount) {
  const t = clamp(amount);
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t
  ];
}

function multiplyColor(color, scalar) {
  return color.map((component) => clamp(component * scalar));
}

function v3(x = 0, y = 0, z = 0) {
  return [finite(x), finite(y), finite(z)];
}

function add(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function subtract(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function multiply(vector, scalar) {
  return [vector[0] * scalar, vector[1] * scalar, vector[2] * scalar];
}

function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}

function length(vector) {
  return Math.hypot(vector[0], vector[1], vector[2]);
}

function normalize(vector, fallback = [0, 1, 0]) {
  const magnitude = length(vector);
  return magnitude > 0.00001 ? vector.map((component) => component / magnitude) : fallback;
}

function rotateXZ(x, z, angle) {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  return [x * cosine - z * sine, x * sine + z * cosine];
}

function valueNoise(x, z, seed = "noise") {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = smoothstep(0, 1, x - ix);
  const fz = smoothstep(0, 1, z - iz);
  const a = hashUnit(`${seed}:${ix}:${iz}`);
  const b = hashUnit(`${seed}:${ix + 1}:${iz}`);
  const c = hashUnit(`${seed}:${ix}:${iz + 1}`);
  const d = hashUnit(`${seed}:${ix + 1}:${iz + 1}`);
  const top = a + (b - a) * fx;
  const bottom = c + (d - c) * fx;
  return top + (bottom - top) * fz;
}

function nearestPath(x, z, points = []) {
  let best = { distance: Infinity, side: 0 };
  for (let index = 0; index < points.length - 1; index += 1) {
    const a = points[index];
    const b = points[index + 1];
    const dx = finite(b.x) - finite(a.x);
    const dz = finite(b.z) - finite(a.z);
    const lengthSquared = dx * dx + dz * dz || 1;
    const t = clamp(((x - finite(a.x)) * dx + (z - finite(a.z)) * dz) / lengthSquared);
    const px = finite(a.x) + dx * t;
    const pz = finite(a.z) + dz * t;
    const offsetX = x - px;
    const offsetZ = z - pz;
    const distance = Math.hypot(offsetX, offsetZ);
    if (distance < best.distance) {
      const segmentLength = Math.sqrt(lengthSquared);
      best = { distance, side: offsetX * (-dz / segmentLength) + offsetZ * (dx / segmentLength) };
    }
  }
  return best;
}

export function sampleMeadowTerrain(renderPlan = {}, x = 0, z = 0) {
  const surface = renderPlan.terrainSurface ?? {};
  const height = surface.height ?? {};
  const material = surface.material ?? {};
  const path = surface.path ?? renderPlan.pathSurface ?? {};
  const seed = renderPlan.seed ?? renderPlan.id ?? "meadow";

  const macro = valueNoise(x * finite(height.macroScale, 0.034), z * finite(height.macroScale, 0.034), `${seed}:terrain:macro`);
  const micro = valueNoise(x * finite(height.microScale, 0.12), z * finite(height.microScale, 0.12), `${seed}:terrain:micro`);
  let y = finite(height.base) + (macro - 0.5) * finite(height.macroAmplitude, 0.24) + (micro - 0.5) * finite(height.microAmplitude, 0.07);

  const shade = rgb(material.shade, "#4c6d35");
  const base = rgb(material.base, "#6f8b52");
  const warm = rgb(material.warm, "#91aa5c");
  const dry = rgb(material.dry, "#a5a45b");
  const variation = valueNoise(x * 0.086, z * 0.086, `${seed}:terrain:color`);
  const dryBand = valueNoise(x * 0.031, z * 0.031, `${seed}:terrain:dry`);
  let color = mix(mix(shade, base, 0.66), warm, variation * finite(material.variation, 0.38));
  color = mix(color, dry, smoothstep(0.68, 0.96, dryBand) * 0.34);

  let pathBlend = 0;
  let rut = 0;
  if (path.enabled !== false && (path.points?.length ?? 0) >= 2) {
    const nearest = nearestPath(x, z, path.points);
    const halfWidth = finite(path.width, 3.9) * 0.5;
    const shoulderEnd = halfWidth + finite(path.shoulderWidth, 3.2) + finite(path.edgeBlend, 1.8);
    const core = 1 - smoothstep(halfWidth * 0.68, halfWidth, nearest.distance);
    const shoulder = 1 - smoothstep(halfWidth, shoulderEnd, nearest.distance);
    pathBlend = shoulder;
    const pathColor = mix(
      rgb(path.edgeColor, "#9f7b3f"),
      mix(rgb(path.midColor, "#d9a752"), rgb(path.centerColor, "#f3d176"), core),
      Math.max(core, shoulder * 0.58)
    );
    color = mix(color, pathColor, shoulder * 0.94);
    y -= shoulder * finite(height.pathFlatten, 0.1);

    const rutCount = Math.max(0, Math.floor(finite(path.rutCount, 0)));
    for (let index = 0; index < rutCount; index += 1) {
      const spacing = 0.58;
      const offset = (index - (rutCount - 1) / 2) * spacing;
      rut = Math.max(rut, (1 - smoothstep(0, 0.12, Math.abs(nearest.side - offset))) * shoulder);
    }
    if (rut > 0) {
      color = mix(color, rgb(path.rutColor, "#8d6132"), rut * 0.46);
      y -= rut * finite(height.rutDepth, 0.045);
    }
  }

  return Object.freeze({ position: v3(x, y, z), color, pathBlend, rut });
}

function createMeshCollector() {
  const positions = [];
  const normals = [];
  const colors = [];
  const outlines = [];
  const wind = [];

  function vertex(point, normal, color, outline = 0, windWeight = 0, windPhase = 0) {
    positions.push(...point);
    normals.push(...normal);
    colors.push(...color);
    outlines.push(finite(outline));
    wind.push(finite(windWeight), finite(windPhase));
  }

  function triangle(a, b, c, color, options = {}) {
    const normal = options.normal ?? normalize(cross(subtract(b, a), subtract(c, a)));
    const weights = options.windWeights ?? [0, 0, 0];
    const phases = options.windPhases ?? [options.windPhase ?? 0, options.windPhase ?? 0, options.windPhase ?? 0];
    vertex(a, options.normals?.[0] ?? normal, color, options.outline ?? 0, weights[0], phases[0]);
    vertex(b, options.normals?.[1] ?? normal, color, options.outline ?? 0, weights[1], phases[1]);
    vertex(c, options.normals?.[2] ?? normal, color, options.outline ?? 0, weights[2], phases[2]);
  }

  function quad(a, b, c, d, color, options = {}) {
    const weights = options.windWeights ?? [0, 0, 0, 0];
    const phases = options.windPhases ?? [options.windPhase ?? 0, options.windPhase ?? 0, options.windPhase ?? 0, options.windPhase ?? 0];
    triangle(a, b, c, color, {
      ...options,
      windWeights: [weights[0], weights[1], weights[2]],
      windPhases: [phases[0], phases[1], phases[2]],
      normals: options.normals ? [options.normals[0], options.normals[1], options.normals[2]] : undefined
    });
    triangle(a, c, d, color, {
      ...options,
      windWeights: [weights[0], weights[2], weights[3]],
      windPhases: [phases[0], phases[2], phases[3]],
      normals: options.normals ? [options.normals[0], options.normals[2], options.normals[3]] : undefined
    });
  }

  function tube(start, end, startRadius, endRadius, color, options = {}) {
    const sides = Math.max(5, Math.floor(finite(options.sides, 8)));
    const axis = normalize(subtract(end, start), [0, 1, 0]);
    const reference = Math.abs(axis[1]) > 0.92 ? [1, 0, 0] : [0, 1, 0];
    const side = normalize(cross(axis, reference), [1, 0, 0]);
    const up = normalize(cross(side, axis), [0, 0, 1]);
    for (let index = 0; index < sides; index += 1) {
      const angle0 = index / sides * TAU;
      const angle1 = (index + 1) / sides * TAU;
      const radial0 = normalize(add(multiply(side, Math.cos(angle0)), multiply(up, Math.sin(angle0))), side);
      const radial1 = normalize(add(multiply(side, Math.cos(angle1)), multiply(up, Math.sin(angle1))), side);
      quad(
        add(start, multiply(radial0, startRadius)),
        add(start, multiply(radial1, startRadius)),
        add(end, multiply(radial1, endRadius)),
        add(end, multiply(radial0, endRadius)),
        color,
        {
          outline: options.outline ?? 0,
          normals: [radial0, radial1, radial1, radial0],
          windWeights: options.windWeights ?? [0, 0, 0, 0],
          windPhase: options.windPhase ?? 0
        }
      );
    }
  }

  return { positions, normals, colors, outlines, wind, triangle, quad, tube };
}

function addTerrain(mesh, plan) {
  const surface = plan.terrainSurface;
  const bounds = surface.bounds;
  const resolution = surface.resolution;
  const xSegments = Math.max(2, Math.floor(finite(resolution.xSegments, 64)));
  const zSegments = Math.max(2, Math.floor(finite(resolution.zSegments, 82)));
  const x0 = finite(bounds.x) - finite(bounds.width) * 0.5;
  const z0 = finite(bounds.z) - finite(bounds.depth) * 0.5;
  const dx = finite(bounds.width) / xSegments;
  const dz = finite(bounds.depth) / zSegments;

  for (let zIndex = 0; zIndex < zSegments; zIndex += 1) {
    for (let xIndex = 0; xIndex < xSegments; xIndex += 1) {
      const a = sampleMeadowTerrain(plan, x0 + xIndex * dx, z0 + zIndex * dz);
      const b = sampleMeadowTerrain(plan, x0 + (xIndex + 1) * dx, z0 + zIndex * dz);
      const c = sampleMeadowTerrain(plan, x0 + (xIndex + 1) * dx, z0 + (zIndex + 1) * dz);
      const d = sampleMeadowTerrain(plan, x0 + xIndex * dx, z0 + (zIndex + 1) * dz);
      const normal = normalize(cross(subtract(b.position, a.position), subtract(d.position, a.position)));
      const color = mix(mix(a.color, b.color, 0.5), mix(c.color, d.color, 0.5), 0.5);
      mesh.quad(a.position, b.position, c.position, d.position, color, { outline: 0, normals: [normal, normal, normal, normal] });
    }
  }
}

function addAtmosphere(mesh, plan) {
  const atmosphere = plan.atmosphere;
  if (!atmosphere?.enabled) return;
  const area = plan.area;
  const baseY = finite(area.anchor?.y) - 0.04;
  const farZ = finite(area.anchor?.z) + finite(area.depth, 110) * 0.62;
  const width = finite(area.width, 90) * 1.45;
  const hills = atmosphere.hills ?? [];
  hills.forEach((hill, layer) => {
    const segments = 32;
    const nearZ = farZ + layer * 5;
    const color = rgb(hill.color, layer ? "#506f6d" : "#7d8d62");
    for (let index = 0; index < segments; index += 1) {
      const xA = finite(area.anchor?.x) - width + index / segments * width * 2;
      const xB = finite(area.anchor?.x) - width + (index + 1) / segments * width * 2;
      const waveA = Math.sin(index * 0.73 + layer) * 1.7 + Math.sin(index * 0.21 + 0.4) * 0.9;
      const waveB = Math.sin((index + 1) * 0.73 + layer) * 1.7 + Math.sin((index + 1) * 0.21 + 0.4) * 0.9;
      const ridgeY = baseY + 7 + layer * 1.6 + (1 - finite(hill.y, 0.4)) * 6;
      mesh.quad(
        v3(xA, baseY, nearZ),
        v3(xB, baseY, nearZ),
        v3(xB, ridgeY + waveB, nearZ + 8),
        v3(xA, ridgeY + waveA, nearZ + 8),
        color,
        { outline: 0 }
      );
    }
  });
}

function addBladeRibbon(mesh, plan, descriptor) {
  const sample = sampleMeadowTerrain(plan, descriptor.x, descriptor.z);
  const angle = descriptor.rotation;
  const side = v3(Math.cos(angle) * descriptor.width, 0, Math.sin(angle) * descriptor.width);
  const forward = v3(Math.cos(angle + Math.PI / 2), 0, Math.sin(angle + Math.PI / 2));
  const bend = descriptor.bend;
  const base = add(sample.position, v3(0, 0.015, 0));
  const p1 = add(base, add(v3(0, descriptor.height * 0.34, 0), multiply(forward, bend * 0.12)));
  const p2 = add(base, add(v3(0, descriptor.height * 0.7, 0), multiply(forward, bend * 0.48)));
  const tip = add(base, add(v3(0, descriptor.height, 0), multiply(forward, bend)));
  const color = descriptor.color;
  const phase = descriptor.windPhase;
  mesh.quad(
    subtract(base, side), add(base, side), add(p1, multiply(side, 0.76)), subtract(p1, multiply(side, 0.76)),
    multiplyColor(color, 0.86),
    { outline: 0, windWeights: [0, 0, 0.32, 0.32], windPhase: phase }
  );
  mesh.quad(
    subtract(p1, multiply(side, 0.76)), add(p1, multiply(side, 0.76)), add(p2, multiply(side, 0.42)), subtract(p2, multiply(side, 0.42)),
    color,
    { outline: 0, windWeights: [0.32, 0.32, 0.72, 0.72], windPhase: phase }
  );
  mesh.triangle(
    subtract(p2, multiply(side, 0.42)), add(p2, multiply(side, 0.42)), tip,
    multiplyColor(color, 1.08),
    { outline: 0, windWeights: [0.72, 0.72, 1], windPhase: phase }
  );
}

function grassFamilyColor(plan, batch, instance) {
  const grass = plan.style?.materials?.grass ?? {};
  const base = rgb(grass.base, "#5e8038");
  const highlight = rgb(grass.highlight, "#d1b85f");
  const shade = rgb(grass.shade, "#263b1e");
  const tint = Array.isArray(instance.tint) ? instance.tint : base;
  const family = batch.family ?? "short";
  if (family === "golden") return mix(tint, highlight, 0.48);
  if (family === "shadow") return mix(tint, shade, 0.46);
  if (family === "flower-edge") return mix(tint, highlight, 0.22);
  if (family === "tall") return mix(tint, base, 0.35);
  return mix(tint, base, 0.5);
}

function addGrassField(mesh, plan) {
  const grass = plan.fields?.grass;
  if (!grass) return;
  const batches = new Map((grass.staticBatches ?? []).map((batch) => [batch.id, batch]));
  for (const group of grass.drawGroups ?? []) {
    const batch = batches.get(group.batchId);
    if (!batch) continue;
    const cardLimit = batch.lod === "near" ? 28 : batch.lod === "mid" ? 16 : 4;
    const cards = (batch.cards ?? []).slice(0, cardLimit);
    for (const instance of group.instances ?? []) {
      const color = grassFamilyColor(plan, batch, instance);
      const instanceRotation = finite(instance.rotation);
      const scale = finite(instance.scale, 1);
      for (const card of cards) {
        const rotated = rotateXZ(finite(card.x) * scale, finite(card.z) * scale, instanceRotation);
        addBladeRibbon(mesh, plan, {
          x: finite(instance.x) + rotated[0],
          z: finite(instance.z) + rotated[1],
          rotation: instanceRotation + finite(card.rotation),
          width: finite(card.width, 0.1) * scale,
          height: finite(card.height, 0.8) * scale,
          bend: (finite(card.bendWeight, 0.6) - 0.3) * 0.42 * scale,
          windPhase: finite(instance.windPhase) + hashUnit(`${batch.id}:${card.x}:${card.z}`),
          color: mix(color, [0.92, 0.78, 0.35], hashUnit(`${batch.id}:tint:${card.x}:${card.z}`) * 0.12)
        });
      }
    }
  }
}

function addPetal(mesh, center, angle, lengthValue, widthValue, color, windPhase) {
  const direction = v3(Math.cos(angle), 0.16 + Math.sin(angle * 2) * 0.08, Math.sin(angle));
  const side = normalize(cross(direction, [0, 1, 0]), [1, 0, 0]);
  const root = add(center, multiply(direction, 0.02));
  const middle = add(center, multiply(direction, lengthValue * 0.58));
  const tip = add(center, multiply(direction, lengthValue));
  mesh.quad(
    subtract(root, multiply(side, widthValue * 0.18)),
    add(root, multiply(side, widthValue * 0.18)),
    add(middle, multiply(side, widthValue)),
    subtract(middle, multiply(side, widthValue)),
    color,
    { outline: 0, windWeights: [0.8, 0.8, 1, 1], windPhase }
  );
  mesh.triangle(
    subtract(middle, multiply(side, widthValue)),
    add(middle, multiply(side, widthValue)),
    tip,
    multiplyColor(color, 1.08),
    { outline: 0, windWeights: [1, 1, 1], windPhase }
  );
}

function addFlowerCluster(mesh, plan, instance) {
  const baseColor = rgb(instance.color, "#d85d9a");
  const accent = rgb(instance.accent, "#f4d976");
  const stemColor = rgb(plan.style?.materials?.grass?.shade, "#263b1e");
  const count = Math.max(4, Math.floor(finite(instance.flowerCount, 7)));
  for (let index = 0; index < count; index += 1) {
    const seed = `${plan.seed}:${instance.id}:${index}`;
    const angle = hashUnit(`${seed}:offset-angle`) * TAU;
    const radius = Math.sqrt(hashUnit(`${seed}:offset-radius`)) * finite(instance.spread, 0.6) * finite(instance.scale, 1);
    const x = finite(instance.position?.x) + Math.cos(angle) * radius;
    const z = finite(instance.position?.z) + Math.sin(angle) * radius;
    const terrain = sampleMeadowTerrain(plan, x, z);
    const height = (0.42 + hashUnit(`${seed}:height`) * 0.56) * finite(instance.scale, 1);
    const leanAngle = hashUnit(`${seed}:lean-angle`) * TAU;
    const lean = 0.08 + hashUnit(`${seed}:lean`) * 0.14;
    const base = add(terrain.position, v3(0, 0.02, 0));
    const tip = add(base, v3(Math.cos(leanAngle) * lean, height, Math.sin(leanAngle) * lean));
    const side = v3(Math.cos(leanAngle + Math.PI / 2) * 0.018, 0, Math.sin(leanAngle + Math.PI / 2) * 0.018);
    mesh.quad(
      subtract(base, side), add(base, side), add(tip, multiply(side, 0.48)), subtract(tip, multiply(side, 0.48)),
      stemColor,
      { outline: 0, windWeights: [0, 0, 0.86, 0.86], windPhase: finite(instance.windPhase) }
    );
    const petalCount = instance.archetypeId?.endsWith("b") ? 6 : 5;
    const petalColor = mix(baseColor, accent, hashUnit(`${seed}:petal-color`) * 0.22);
    for (let petal = 0; petal < petalCount; petal += 1) {
      addPetal(
        mesh,
        tip,
        finite(instance.rotation) + petal / petalCount * TAU,
        (0.095 + hashUnit(`${seed}:petal-length:${petal}`) * 0.065) * finite(instance.scale, 1),
        (0.035 + hashUnit(`${seed}:petal-width:${petal}`) * 0.022) * finite(instance.scale, 1),
        petalColor,
        finite(instance.windPhase)
      );
    }
    const centerColor = multiplyColor(accent, 0.88);
    for (let centerIndex = 0; centerIndex < 6; centerIndex += 1) {
      const a0 = centerIndex / 6 * TAU;
      const a1 = (centerIndex + 1) / 6 * TAU;
      mesh.triangle(
        tip,
        add(tip, v3(Math.cos(a0) * 0.028, 0.018, Math.sin(a0) * 0.028)),
        add(tip, v3(Math.cos(a1) * 0.028, 0.018, Math.sin(a1) * 0.028)),
        centerColor,
        { outline: 0, windWeights: [1, 1, 1], windPhase: finite(instance.windPhase) }
      );
    }
  }
}

function addFlowerField(mesh, plan) {
  for (const instance of plan.fields?.flowers?.instances ?? []) addFlowerCluster(mesh, plan, instance);
}

const ROCK_ARCHETYPES = Object.freeze({
  "meadow-rock-a": Object.freeze({ sides: 7, rings: [1, 0.92, 0.48], heights: [0, 0.42, 0.74], profile: [1.0, 0.86, 1.12, 0.78, 1.04, 0.9, 1.08] }),
  "meadow-rock-b": Object.freeze({ sides: 8, rings: [1, 0.84, 0.38], heights: [0, 0.36, 0.68], profile: [0.86, 1.14, 0.8, 1.02, 0.92, 1.18, 0.76, 1.06] }),
  "meadow-rock-c": Object.freeze({ sides: 6, rings: [1, 0.9, 0.52], heights: [0, 0.5, 0.83], profile: [1.18, 0.82, 1.02, 0.74, 1.1, 0.9] }),
  "meadow-rock-d": Object.freeze({ sides: 9, rings: [1, 0.8, 0.32], heights: [0, 0.34, 0.62], profile: [0.92, 1.16, 0.84, 1.04, 0.78, 1.08, 0.88, 1.12, 0.82] })
});

function addRock(mesh, plan, instance) {
  const archetype = ROCK_ARCHETYPES[instance.archetypeId] ?? ROCK_ARCHETYPES["meadow-rock-a"];
  const scale = finite(instance.scale, 1);
  const terrain = sampleMeadowTerrain(plan, finite(instance.position?.x), finite(instance.position?.z));
  const baseColor = rgb(instance.color, "#777568");
  const accent = rgb(instance.accent, "#c3c799");
  const rotation = finite(instance.rotation);
  const rings = [];
  for (let ringIndex = 0; ringIndex < archetype.rings.length; ringIndex += 1) {
    const points = [];
    for (let sideIndex = 0; sideIndex < archetype.sides; sideIndex += 1) {
      const angle = sideIndex / archetype.sides * TAU + rotation;
      const radial = archetype.rings[ringIndex] * archetype.profile[sideIndex % archetype.profile.length] * scale;
      const flatten = 0.72 + hashUnit(`${instance.archetypeId}:flatten:${sideIndex}`) * 0.24;
      points.push(v3(
        terrain.position[0] + Math.cos(angle) * radial,
        terrain.position[1] + archetype.heights[ringIndex] * scale,
        terrain.position[2] + Math.sin(angle) * radial * flatten
      ));
    }
    rings.push(points);
  }

  for (let ringIndex = 0; ringIndex < rings.length - 1; ringIndex += 1) {
    const lower = rings[ringIndex];
    const upper = rings[ringIndex + 1];
    for (let sideIndex = 0; sideIndex < archetype.sides; sideIndex += 1) {
      const next = (sideIndex + 1) % archetype.sides;
      const faceColor = mix(baseColor, accent, ringIndex * 0.18 + hashUnit(`${instance.id}:face:${ringIndex}:${sideIndex}`) * 0.12);
      mesh.quad(lower[sideIndex], lower[next], upper[next], upper[sideIndex], faceColor, { outline: 0.025 });
    }
  }

  const top = rings[rings.length - 1];
  const center = top.reduce((sum, point) => add(sum, point), v3(0, 0, 0)).map((component) => component / top.length);
  for (let sideIndex = 0; sideIndex < archetype.sides; sideIndex += 1) {
    const next = (sideIndex + 1) % archetype.sides;
    const mossColor = mix(accent, rgb("#71854a"), finite(instance.moss, 0.3));
    mesh.triangle(center, top[sideIndex], top[next], mossColor, { outline: 0.018 });
  }
}

function addRockField(mesh, plan) {
  for (const instance of plan.fields?.rocks?.instances ?? []) addRock(mesh, plan, instance);
}

function addGroundCover(mesh, plan) {
  const baseColor = rgb(plan.style?.materials?.grass?.base, "#5e8038");
  const shade = rgb(plan.style?.materials?.grass?.shade, "#263b1e");
  for (const instance of plan.fields?.groundCover?.instances ?? []) {
    const leafCount = instance.archetypeId?.endsWith("b") ? 9 : 7;
    for (let index = 0; index < leafCount; index += 1) {
      const angle = finite(instance.rotation) + index / leafCount * TAU + hashUnit(`${instance.id}:${index}`) * 0.22;
      const lengthValue = (0.28 + hashUnit(`${instance.id}:length:${index}`) * 0.3) * finite(instance.scale, 1);
      const x = finite(instance.position?.x);
      const z = finite(instance.position?.z);
      const terrain = sampleMeadowTerrain(plan, x, z);
      const base = add(terrain.position, v3(0, 0.02, 0));
      const direction = v3(Math.cos(angle), 0.42, Math.sin(angle));
      const side = normalize(cross(direction, [0, 1, 0]), [1, 0, 0]);
      const middle = add(base, multiply(direction, lengthValue * 0.56));
      const tip = add(base, multiply(direction, lengthValue));
      const widthValue = lengthValue * 0.2;
      mesh.quad(
        base,
        base,
        add(middle, multiply(side, widthValue)),
        subtract(middle, multiply(side, widthValue)),
        mix(shade, baseColor, 0.72),
        { outline: 0, windWeights: [0, 0, 0.65, 0.65], windPhase: finite(instance.windPhase) }
      );
      mesh.triangle(
        subtract(middle, multiply(side, widthValue)),
        add(middle, multiply(side, widthValue)),
        tip,
        baseColor,
        { outline: 0, windWeights: [0.65, 0.65, 1], windPhase: finite(instance.windPhase) }
      );
    }
  }
}

function addDistantTree(mesh, plan, instance) {
  const x = finite(instance.position?.x);
  const z = finite(instance.position?.z);
  const terrain = sampleMeadowTerrain(plan, x, z);
  const scale = finite(instance.scale, 1);
  const trunkHeight = (2.4 + hashUnit(`${instance.id}:height`) * 2.2) * scale;
  const trunkWidth = 0.18 * scale;
  const dark = rgb(instance.color, "#1a2e16");
  const light = rgb(instance.accent, "#3f612a");
  const bark = rgb(plan.style?.materials?.bark?.shade, "#1f1209");
  const base = add(terrain.position, v3(0, 0.02, 0));
  mesh.quad(
    add(base, v3(-trunkWidth, 0, 0)),
    add(base, v3(trunkWidth, 0, 0)),
    add(base, v3(trunkWidth * 0.55, trunkHeight, 0)),
    add(base, v3(-trunkWidth * 0.55, trunkHeight, 0)),
    bark,
    { outline: 0 }
  );

  const shape = instance.archetypeId;
  const crownCount = shape === "distant-tree-sparse" ? 2 : 3;
  for (let index = 0; index < crownCount; index += 1) {
    const height = trunkHeight * (0.55 + index * 0.18);
    const widthValue = trunkHeight * (shape === "distant-tree-columnar" ? 0.22 : 0.34) * (1 - index * 0.12);
    const crownHeight = trunkHeight * (shape === "distant-tree-columnar" ? 0.42 : 0.32);
    const center = add(base, v3((index % 2 ? 1 : -1) * widthValue * 0.18, height, 0));
    const color = mix(dark, light, 0.32 + index * 0.16);
    mesh.quad(
      add(center, v3(-widthValue, -crownHeight * 0.35, 0)),
      add(center, v3(widthValue, -crownHeight * 0.35, 0)),
      add(center, v3(widthValue * 0.42, crownHeight * 0.48, 0)),
      add(center, v3(-widthValue * 0.42, crownHeight * 0.48, 0)),
      color,
      { outline: 0, windWeights: [0.2, 0.2, 0.7, 0.7], windPhase: finite(instance.windPhase) }
    );
  }
}

function addDistantTreeField(mesh, plan) {
  for (const instance of plan.fields?.distantTrees?.instances ?? []) addDistantTree(mesh, plan, instance);
}

function addLeafCard(mesh, center, size, rotation, color, windPhase) {
  const horizontal = v3(Math.cos(rotation) * size, 0, Math.sin(rotation) * size);
  const vertical = v3(0, size * 0.68, 0);
  const diagonal = v3(Math.cos(rotation + Math.PI / 2) * size * 0.32, size * 0.12, Math.sin(rotation + Math.PI / 2) * size * 0.32);
  mesh.quad(
    subtract(center, horizontal),
    subtract(center, diagonal),
    add(center, horizontal),
    add(center, vertical),
    color,
    { outline: 0, windWeights: [0.58, 0.68, 0.82, 1], windPhase }
  );
}

function addHeroTree(mesh, plan) {
  const tree = plan.assets?.focalTree;
  if (!tree) return;
  const origin = v3(tree.position?.x, tree.position?.y, tree.position?.z);
  const barkBase = rgb(tree.materials?.barkBase, "#5b3719");
  const barkShade = rgb(tree.materials?.barkShade, "#1f1209");
  const barkHighlight = rgb(tree.materials?.barkHighlight, "#9b672d");
  for (const segment of tree.segments ?? []) {
    const start = add(origin, v3(segment.start?.x, segment.start?.y, segment.start?.z));
    const end = add(origin, v3(segment.end?.x, segment.end?.y, segment.end?.z));
    const color = segment.kind === "root" ? mix(barkShade, barkBase, 0.52) : segment.kind === "branch" ? mix(barkBase, barkHighlight, 0.18) : barkBase;
    mesh.tube(start, end, finite(segment.startRadius, 0.4), finite(segment.endRadius, 0.2), color, {
      sides: segment.kind === "trunk" ? 10 : 7,
      outline: segment.kind === "trunk" ? finite(tree.outlineWeight, 0.12) : 0.045
    });
  }

  const leafBase = rgb(tree.materials?.leafBase, "#3f612a");
  const leafShade = rgb(tree.materials?.leafShade, "#1a2e16");
  const leafHighlight = rgb(tree.materials?.leafHighlight, "#d0993d");
  for (const cluster of tree.leafClusters ?? []) {
    const clusterCenter = add(origin, v3(cluster.position?.x, cluster.position?.y, cluster.position?.z));
    const cardCount = Math.min(12, Math.max(5, Math.floor(finite(cluster.cardCount, 8))));
    for (let index = 0; index < cardCount; index += 1) {
      const seed = `${tree.id}:${cluster.id}:${index}`;
      const angle = hashUnit(`${seed}:angle`) * TAU;
      const radial = Math.cbrt(hashUnit(`${seed}:radial`)) * finite(cluster.radius, 1.8);
      const vertical = (hashUnit(`${seed}:vertical`) - 0.46) * finite(cluster.radius, 1.8) * 0.72;
      const center = add(clusterCenter, v3(Math.cos(angle) * radial, vertical, Math.sin(angle) * radial));
      const tint = finite(cluster.tint, 1);
      const color = mix(mix(leafShade, leafBase, 0.62), leafHighlight, hashUnit(`${seed}:color`) * 0.28);
      addLeafCard(
        mesh,
        center,
        finite(cluster.radius, 1.8) * (0.18 + hashUnit(`${seed}:size`) * 0.12) * tint,
        angle + hashUnit(`${seed}:rotation`) * Math.PI,
        color,
        finite(cluster.windPhase) + hashUnit(`${seed}:wind`)
      );
    }
  }
}

export function buildMeadowMeshData(renderPlan = {}) {
  if (renderPlan.schema !== MEADOW_RENDER_PLAN_SCHEMA) {
    throw new Error(`meadow mesh builder requires ${MEADOW_RENDER_PLAN_SCHEMA}`);
  }
  if (!renderPlan.contract?.validation?.passed) {
    throw new Error(`invalid meadow render plan: ${(renderPlan.contract?.validation?.failures ?? ["unknown validation failure"]).join("; ")}`);
  }

  const mesh = createMeshCollector();
  addAtmosphere(mesh, renderPlan);
  addTerrain(mesh, renderPlan);
  addGrassField(mesh, renderPlan);
  addFlowerField(mesh, renderPlan);
  addGroundCover(mesh, renderPlan);
  addRockField(mesh, renderPlan);
  addDistantTreeField(mesh, renderPlan);
  addHeroTree(mesh, renderPlan);

  const vertexCount = mesh.positions.length / 3;
  if (mesh.normals.length / 3 !== vertexCount) throw new Error("normal buffer size mismatch");
  if (mesh.colors.length / 3 !== vertexCount) throw new Error("color buffer size mismatch");
  if (mesh.outlines.length !== vertexCount) throw new Error("outline buffer size mismatch");
  if (mesh.wind.length / 2 !== vertexCount) throw new Error("wind buffer size mismatch");

  return Object.freeze({
    id: `${renderPlan.id}-mesh-v2`,
    topologyKey: renderPlan.contract.topologyKey,
    meshKey: stableHash({ topologyKey: renderPlan.contract.topologyKey, builder: "meadow-mesh-builder-v2" }),
    positions: Object.freeze(mesh.positions),
    normals: Object.freeze(mesh.normals),
    colors: Object.freeze(mesh.colors),
    outlines: Object.freeze(mesh.outlines),
    wind: Object.freeze(mesh.wind),
    vertexCount,
    triangleCount: vertexCount / 3,
    descriptorCounts: renderPlan.contract.descriptorCounts,
    primitiveFallbackCount: 0
  });
}
