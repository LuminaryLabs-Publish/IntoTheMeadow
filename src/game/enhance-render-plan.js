import { createTreeObjectDsk } from "../dsks/tree-object-dsk/index.js";
import { createWindFieldDsk } from "../dsks/wind-field-dsk/index.js";
import { createMeadowPerformancePolicy } from "../dsks/meadow-performance-dsk/index.js";
import { createPostProcessStack } from "../dsks/post-process-stack-dsk/index.js";
import { createGrassDensityTextureKit } from "../dsks/grass-density-texture-kit/index.js";
import { createGrassClumpArchetypeKit } from "../dsks/grass-clump-archetype-kit/index.js";
import { createGrassStaticBatchKit } from "../dsks/grass-static-batch-kit/index.js";
import { createGrassPatchPlacementKit } from "../dsks/grass-patch-placement-kit/index.js";
import { createGrassClumpInstancingRenderKit } from "../dsks/grass-clump-instancing-render-kit/index.js";
import { createGrassShaderWindKit } from "../dsks/grass-shader-wind-kit/index.js";
import { createGrassLodPolicyKit } from "../dsks/grass-lod-policy-kit/index.js";
import { createGrassDensityScalingKit } from "../dsks/grass-density-scaling-kit/index.js";
import { createGrassDebugVisualizationKit } from "../dsks/grass-debug-visualization-kit/index.js";
import {
  createMeadowRenderPlanV2,
  sourceTopologyKey,
  withMeadowRenderTime
} from "../render-contract/meadow-render-plan-v2.js";

const SMALL_TYPES = new Set(["grass-blade", "wildflower", "mushroom", "tree-line-tree"]);

function withOutlinePolicy(object = {}, performance) {
  if (object.type === "focal-tree") {
    const enhanced = createTreeObjectDsk().enhanceFocalTree(object);
    return Object.freeze({
      ...enhanced,
      renderStyle: Object.freeze({
        ...enhanced.renderStyle,
        outlineWeight: performance.outlinePolicy.hero
      })
    });
  }
  if (object.type === "rock") {
    return Object.freeze({
      ...object,
      renderStyle: Object.freeze({ outlineClass: "soft", outlineWeight: performance.outlinePolicy.soft })
    });
  }
  if (SMALL_TYPES.has(object.type)) {
    return Object.freeze({
      ...object,
      renderStyle: Object.freeze({ outlineClass: "none", outlineWeight: 0 })
    });
  }
  return object;
}

function reduceTinyClutter(objects = [], performance) {
  const limits = Object.freeze({
    wildflower: performance.budgets.maxFlowerObjects,
    mushroom: 14,
    "tree-line-tree": performance.budgets.maxTreeLineObjects
  });
  const counts = new Map();
  return objects.filter((object) => {
    const limit = limits[object.type];
    if (!limit) return true;
    const next = (counts.get(object.type) ?? 0) + 1;
    counts.set(object.type, next);
    return next <= limit;
  });
}

function createGrassSystem(renderPlan, performance, wind) {
  const path = (renderPlan.objects ?? []).find((object) => object.type === "path")
    ?? renderPlan.features?.path
    ?? { points: [], width: 4 };
  const densityTexture = createGrassDensityTextureKit({
    area: renderPlan.area,
    path,
    seed: `${renderPlan.seed ?? renderPlan.id}:density`,
    resolution: [128, 128]
  });
  const archetypeKit = createGrassClumpArchetypeKit({ cardCount: 64 });
  const staticBatchKit = createGrassStaticBatchKit();
  const staticBatches = staticBatchKit.createBatches(archetypeKit.archetypes);
  const densityScale = createGrassDensityScalingKit({ quality: performance.quality });
  const placement = createGrassPatchPlacementKit({ patchSize: 8, densityScale: densityScale.scaleFor() });
  const patches = placement.createPatches({ area: renderPlan.area, densityTexture, staticBatches });
  const instancing = createGrassClumpInstancingRenderKit();
  const drawGroups = instancing.createDrawGroups({ staticBatches, patches });
  const shaderWind = createGrassShaderWindKit(wind.state);
  const lodPolicy = createGrassLodPolicyKit();
  const debug = createGrassDebugVisualizationKit();
  return Object.freeze({
    id: `${renderPlan.id ?? "meadow"}-grass-system`,
    type: "texture-driven-grass-system",
    densityTexture: Object.freeze({
      id: densityTexture.id,
      resolution: densityTexture.resolution,
      worldBounds: densityTexture.worldBounds,
      channels: densityTexture.channels
    }),
    staticBatches,
    patches,
    drawGroups,
    shaderWind,
    lodPolicy,
    densityScale,
    debug: debug.createDebugSummary({ densityTexture, staticBatches, patches, drawGroups }),
    validation: Object.freeze({
      density: densityTexture.validate(),
      archetypes: archetypeKit.validate(),
      batches: staticBatchKit.validate(staticBatches),
      placement: placement.validate(patches),
      drawGroups: instancing.validate(drawGroups),
      wind: shaderWind.validate(),
      lod: lodPolicy.validate()
    })
  });
}

export function enhanceRenderPlan(renderPlan = {}, options = {}) {
  const performance = createMeadowPerformancePolicy(options.performance ?? renderPlan.style?.performance ?? {});
  const wind = createWindFieldDsk(renderPlan.wind ?? {});
  const postProcess = createPostProcessStack(renderPlan.style?.postProcess ?? {});
  const filteredSourceObjects = reduceTinyClutter(renderPlan.objects ?? [], performance)
    .map((object) => withOutlinePolicy(object, performance));
  const grassSystem = createGrassSystem(renderPlan, performance, wind);
  const performanceSnapshot = Object.freeze({
    quality: performance.quality,
    profile: performance.profile,
    budgets: performance.budgets,
    outlinePolicy: performance.outlinePolicy
  });

  const contracted = createMeadowRenderPlanV2(
    { ...renderPlan, objects: filteredSourceObjects },
    {
      sourceObjects: filteredSourceObjects.filter((object) => object.type !== "grass-blade"),
      grassSystem,
      wind: wind.state,
      postProcess,
      performance: performanceSnapshot,
      focalTree: filteredSourceObjects.find((object) => object.type === "focal-tree")
    }
  );

  const descriptorCounts = contracted.contract.descriptorCounts;
  return Object.freeze({
    ...contracted,
    grassSystem,
    grassPatches: grassSystem.patches,
    windField: wind.state,
    postProcess,
    performance: performanceSnapshot,
    stats: Object.freeze({
      ...(renderPlan.stats ?? {}),
      objectCount: contracted.objects.length
        + descriptorCounts.flowerClusters
        + descriptorCounts.rocks
        + descriptorCounts.groundCover
        + descriptorCounts.distantTrees
        + 1,
      sourceObjectCount: filteredSourceObjects.length,
      grassPatchCount: grassSystem.patches.length,
      grassStaticBatchCount: grassSystem.staticBatches.length,
      grassDrawGroupCount: grassSystem.drawGroups.length,
      estimatedGrassInstances: descriptorCounts.grassInstances,
      estimatedGrassCards: grassSystem.drawGroups.reduce((sum, group) => sum + group.cardCount * group.instanceCount, 0),
      descriptorCounts
    })
  });
}

export function createRenderPlanEnhancer(options = {}) {
  let cachedSourceKey = null;
  let cachedPlan = null;
  let rebuildCount = 0;
  let cacheHitCount = 0;

  function enhance(renderPlan = {}, runtime = {}) {
    const nextSourceKey = sourceTopologyKey(renderPlan);
    if (!cachedPlan || nextSourceKey !== cachedSourceKey) {
      cachedSourceKey = nextSourceKey;
      cachedPlan = enhanceRenderPlan(
        { ...renderPlan, time: 0 },
        { ...options, performance: runtime.performance ?? options.performance ?? renderPlan.style?.performance }
      );
      rebuildCount += 1;
    } else {
      cacheHitCount += 1;
    }

    return withMeadowRenderTime(cachedPlan, renderPlan.time ?? runtime.time ?? 0, {
      enhancerCache: Object.freeze({
        sourceKey: cachedSourceKey,
        rebuildCount,
        cacheHitCount,
        state: cacheHitCount > 0 ? "persistent" : "warming"
      })
    });
  }

  return Object.freeze({
    id: "meadow-render-plan-enhancer-v2",
    enhance,
    invalidate() {
      cachedSourceKey = null;
      cachedPlan = null;
    },
    getSnapshot() {
      return Object.freeze({
        id: "meadow-render-plan-enhancer-v2",
        sourceKey: cachedSourceKey,
        topologyKey: cachedPlan?.contract?.topologyKey ?? null,
        rebuildCount,
        cacheHitCount,
        state: cachedPlan ? (cacheHitCount > 0 ? "persistent" : "warming") : "empty"
      });
    }
  });
}
