function finite(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function average(values = []) {
  return values.length ? values.reduce((sum, value) => sum + finite(value), 0) / values.length : 0;
}

function flattenGrassCards(plan = {}) {
  return (plan.fields?.grass?.staticBatches ?? []).flatMap((batch) =>
    (batch.cards ?? []).map((card) => ({ ...card, batchId: batch.id, family: batch.family, lod: batch.lod }))
  );
}

export function measureMeadowVisuals(plan = {}, mesh = null) {
  const cards = flattenGrassCards(plan);
  const tree = plan.assets?.focalTree ?? {};
  const clusters = tree.leafClusters ?? [];
  const rocks = plan.fields?.rocks?.instances ?? [];
  const grassInstances = (plan.fields?.grass?.drawGroups ?? []).flatMap((group) => group.instances ?? []);
  const terrain = plan.terrainSurface ?? {};
  const path = plan.pathSurface ?? terrain.path ?? {};
  const familyCounts = cards.reduce((counts, card) => {
    counts[card.family ?? "unknown"] = (counts[card.family ?? "unknown"] ?? 0) + 1;
    return counts;
  }, {});
  const canopyAreaProxy = clusters.reduce((sum, cluster) => sum + Math.PI * finite(cluster.radius) ** 2, 0);
  const observations = [];

  const averageGrassWidth = average(cards.map((card) => card.width));
  const maxGrassWidth = Math.max(0, ...cards.map((card) => finite(card.width)));
  const averageGrassHeight = average(cards.map((card) => card.height));
  const averageRockScale = average(rocks.map((rock) => rock.scale));
  const maxRockScale = Math.max(0, ...rocks.map((rock) => finite(rock.scale)));
  const averageLeafCards = average(clusters.map((cluster) => cluster.cardCount));

  if (maxGrassWidth > 0.09) observations.push({ severity: "warning", code: "grass-card-wide", message: `Maximum grass half-width is ${maxGrassWidth.toFixed(3)}; wide cards may read as flat polygons.` });
  if (averageLeafCards < 13) observations.push({ severity: "warning", code: "tree-canopy-sparse", message: `Average leaf-card count per cluster is ${averageLeafCards.toFixed(1)}.` });
  if (canopyAreaProxy < 650) observations.push({ severity: "warning", code: "tree-canopy-underfilled", message: `Canopy area proxy is ${canopyAreaProxy.toFixed(1)}.` });
  if (maxRockScale > 0.9) observations.push({ severity: "warning", code: "rock-scale-large", message: `Maximum rock scale is ${maxRockScale.toFixed(2)}.` });
  if (finite(path.edgeBlend) < finite(path.width, 1) * 0.55) observations.push({ severity: "warning", code: "path-edge-hard", message: "Path edge blend is narrow relative to path width." });
  if (finite(terrain.material?.variation) < 0.42) observations.push({ severity: "warning", code: "terrain-variation-low", message: "Terrain material variation is low." });

  return Object.freeze({
    id: "into-the-meadow.visual-metrics",
    schema: plan.schema ?? null,
    topologyKey: plan.contract?.topologyKey ?? null,
    descriptorCounts: plan.contract?.descriptorCounts ?? null,
    grass: Object.freeze({
      cardCount: cards.length,
      instanceCount: grassInstances.length,
      averageCardWidth: averageGrassWidth,
      maxCardWidth: maxGrassWidth,
      averageCardHeight: averageGrassHeight,
      familyCounts: Object.freeze(familyCounts)
    }),
    tree: Object.freeze({
      segmentCount: tree.segments?.length ?? 0,
      clusterCount: clusters.length,
      averageCardsPerCluster: averageLeafCards,
      canopyAreaProxy
    }),
    rocks: Object.freeze({ count: rocks.length, averageScale: averageRockScale, maxScale: maxRockScale }),
    terrain: Object.freeze({
      xSegments: terrain.resolution?.xSegments ?? 0,
      zSegments: terrain.resolution?.zSegments ?? 0,
      variation: terrain.material?.variation ?? 0,
      pathWidth: path.width ?? 0,
      pathEdgeBlend: path.edgeBlend ?? 0
    }),
    mesh: mesh ? Object.freeze({ vertexCount: mesh.vertexCount, triangleCount: mesh.triangleCount, primitiveFallbackCount: mesh.primitiveFallbackCount }) : null,
    observations: Object.freeze(observations)
  });
}
