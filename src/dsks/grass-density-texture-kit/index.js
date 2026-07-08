function hashUnit(value) {
  let h = 2166136261;
  for (const ch of String(value)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return (h >>> 0) / 4294967295;
}

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, Number(value)));
}

function nearestPathDistance(x, z, points = []) {
  let best = Infinity;
  for (let i = 0; i < points.length - 1; i += 1) {
    const a = points[i];
    const b = points[i + 1];
    const dx = b.x - a.x;
    const dz = b.z - a.z;
    const len2 = dx * dx + dz * dz || 1;
    const t = clamp(((x - a.x) * dx + (z - a.z) * dz) / len2, 0, 1);
    const px = a.x + dx * t;
    const pz = a.z + dz * t;
    best = Math.min(best, Math.hypot(x - px, z - pz));
  }
  return best;
}

export function createGrassDensityTextureKit(config = {}) {
  const area = config.area ?? { anchor: { x: 0, z: 0 }, width: 90, depth: 110 };
  const path = config.path ?? { points: [], width: 4 };
  const seed = config.seed ?? "grass-density";
  const resolution = Object.freeze([Number(config.resolution?.[0] ?? 128), Number(config.resolution?.[1] ?? 128)]);
  const worldBounds = Object.freeze({ x: area.anchor?.x ?? 0, z: area.anchor?.z ?? 0, width: area.width ?? 90, depth: area.depth ?? 110 });
  const data = new Uint8Array(resolution[0] * resolution[1] * 4);

  for (let y = 0; y < resolution[1]; y += 1) {
    for (let x = 0; x < resolution[0]; x += 1) {
      const u = x / Math.max(1, resolution[0] - 1);
      const v = y / Math.max(1, resolution[1] - 1);
      const wx = worldBounds.x - worldBounds.width / 2 + u * worldBounds.width;
      const wz = worldBounds.z - worldBounds.depth / 2 + v * worldBounds.depth;
      const dist = nearestPathDistance(wx, wz, path.points ?? []);
      const pathCore = 1 - clamp((dist - path.width * 0.35) / Math.max(0.001, path.width * 0.65), 0, 1);
      const shoulder = 1 - clamp((dist - path.width * 0.8) / Math.max(0.001, path.width * 1.4), 0, 1);
      const n = hashUnit(`${seed}:${Math.floor(wx * 3)}:${Math.floor(wz * 3)}`);
      const base = clamp(0.42 + n * 0.54 - pathCore * 0.9, 0, 1);
      const tall = clamp(base * (0.35 + hashUnit(`${seed}:tall:${x}:${y}`) * 0.65) * (1 - shoulder * 0.45), 0, 1);
      const flowers = clamp((0.2 + hashUnit(`${seed}:flowers:${x}:${y}`) * 0.8) * shoulder * (1 - pathCore), 0, 1);
      const suppress = clamp(pathCore + shoulder * 0.25, 0, 1);
      const i = (y * resolution[0] + x) * 4;
      data[i] = Math.round(base * 255);
      data[i + 1] = Math.round(tall * 255);
      data[i + 2] = Math.round(flowers * 255);
      data[i + 3] = Math.round(suppress * 255);
    }
  }

  function sampleAt(x, z) {
    const u = clamp((x - (worldBounds.x - worldBounds.width / 2)) / worldBounds.width, 0, 1);
    const v = clamp((z - (worldBounds.z - worldBounds.depth / 2)) / worldBounds.depth, 0, 1);
    const px = Math.floor(u * (resolution[0] - 1));
    const py = Math.floor(v * (resolution[1] - 1));
    const i = (py * resolution[0] + px) * 4;
    return Object.freeze({ base: data[i] / 255, tall: data[i + 1] / 255, flowers: data[i + 2] / 255, suppress: data[i + 3] / 255 });
  }

  function averageDensity(bounds = worldBounds) {
    const samples = 9;
    let sum = 0;
    for (let i = 0; i < samples; i += 1) {
      const u = (i % 3 + 0.5) / 3;
      const v = (Math.floor(i / 3) + 0.5) / 3;
      const s = sampleAt(bounds.x - bounds.width / 2 + u * bounds.width, bounds.z - bounds.depth / 2 + v * bounds.depth);
      sum += s.base * (1 - s.suppress);
    }
    return sum / samples;
  }

  return Object.freeze({
    id: `${area.id ?? "meadow"}-grass-density`,
    type: "grass-density-texture",
    seed,
    resolution,
    worldBounds,
    channels: Object.freeze({ base: "R", tall: "G", flowers: "B", suppress: "A" }),
    data,
    sampleAt,
    averageDensity,
    validate() {
      const failures = [];
      if (data.length !== resolution[0] * resolution[1] * 4) failures.push("density data size mismatch");
      return Object.freeze({ passed: failures.length === 0, failures });
    }
  });
}
