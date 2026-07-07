import { LOCAL_DSK_IDS, REQUIRED_V01_DSK_IDS } from "../content/dsk-registry.js";

const DOMAIN_LABELS = Object.freeze({
  "into-the-meadow-game-dsk": "Game Foundation",
  "web-host-dsk": "Host Runtime",
  "game-composition-dsk": "Composition",
  "meadow-area-bridge-dsk": "Meadow Area",
  "meadow-terrain-texture-dsk": "Terrain Texturing",
  "path-corridor-dsk": "Path Corridor",
  "grass-patch-dsk": "Vegetation",
  "gpu-grass-render-dsk": "Vegetation Render",
  "wind-field-dsk": "Wind Weather",
  "tree-object-dsk": "Tree",
  "meadow-scatter-dsk": "Meadow Scatter",
  "meadow-atmosphere-dsk": "Atmosphere",
  "meadow-player-dsk": "Player Exploration",
  "meadow-camera-dsk": "Camera",
  "meadow-input-dsk": "Input",
  "meadow-interaction-dsk": "Interaction",
  "meadow-story-dsk": "Story Flow",
  "meadow-objective-dsk": "Progression",
  "meadow-ecology-dsk": "Ecology Ambience",
  "meadow-audio-dsk": "Audio",
  "meadow-ui-dsk": "UI",
  "meadow-save-dsk": "Persistence",
  "meadow-diagnostics-dsk": "Diagnostics",
  "meadow-performance-dsk": "Performance",
  "meadow-render-host-dsk": "Render Host",
  "post-process-stack-dsk": "Post Process Stack",
  "render-target-kit": "Render Target",
  "sobel-outline-pass-kit": "Sobel Outline Pass",
  "color-grade-pass-kit": "Color Grade Pass",
  "depth-fog-pass-kit": "Depth Fog Pass",
  "vignette-pass-kit": "Vignette Pass",
  "final-composite-pass-kit": "Final Composite Pass",
  "static-pages-deploy-dsk": "Deploy"
});

const SERVICES = Object.freeze({
  "into-the-meadow-game-dsk": ["game-manifest", "kit-stack-registry", "game-state-root", "boot-sequence", "game-snapshot"],
  "web-host-dsk": ["document-shell", "browser-loop", "host-debug-surface", "asset-loading-host", "browser-safety"],
  "game-composition-dsk": ["dsk-registry", "scene-composition", "render-composition", "simulation-composition", "composition-validation"],
  "meadow-area-bridge-dsk": ["meadow-area-config", "meadow-feature-config", "meadow-area-kit-adapter", "meadow-area-state", "meadow-area-validation"],
  "meadow-terrain-texture-dsk": ["terrain-surface-model", "material-layer-system", "path-layer-system", "terrain-sampler", "terrain-validation"],
  "path-corridor-dsk": ["path-curve-model", "walkable-corridor", "path-surface-detail", "path-progression", "path-validation"],
  "grass-patch-dsk": ["patch-grid", "blade-distribution", "terrain-awareness", "wind-binding", "grass-validation"],
  "gpu-grass-render-dsk": ["grass-instance-buffer", "grass-blade-mesh", "shader-wind", "grass-lod-render", "grass-render-validation"],
  "wind-field-dsk": ["wind-state", "wind-sampler", "wind-zones", "wind-consumers", "wind-validation"],
  "tree-object-dsk": ["focal-tree-model", "tree-line-model", "tree-materials", "tree-wind-binding", "tree-validation"],
  "meadow-scatter-dsk": ["flower-scatter", "rock-scatter", "mushroom-scatter", "placement-rules", "scatter-validation"],
  "meadow-atmosphere-dsk": ["sky-gradient", "sun-system", "cloud-layer", "distant-hills", "atmosphere-validation"],
  "meadow-player-dsk": ["player-state", "movement-profile", "terrain-contact", "player-actions", "player-validation"],
  "meadow-camera-dsk": ["camera-mode", "camera-rig", "camera-collision", "camera-feel", "camera-validation"],
  "meadow-input-dsk": ["action-map", "device-bindings", "input-context", "input-normalization", "input-validation"],
  "meadow-interaction-dsk": ["interactable-registry", "affordance-rules", "inspect-state", "interaction-events", "interaction-validation"],
  "meadow-story-dsk": ["story-state", "story-beats", "dialogue-text", "sequence-runner", "story-validation"],
  "meadow-objective-dsk": ["objective-model", "objective-flow", "completion-ledger", "feedback-surface", "objective-validation"],
  "meadow-ecology-dsk": ["ambient-life", "ecology-zones", "ambience-triggers", "non-gameplay-agents", "ecology-validation"],
  "meadow-audio-dsk": ["ambient-bed", "spatial-audio-cues", "audio-state", "audio-events", "audio-validation"],
  "meadow-ui-dsk": ["minimal-hud", "story-text-panel", "debug-ui", "ui-state", "ui-validation"],
  "meadow-save-dsk": ["save-model", "save-slots", "persistence-adapter", "migration", "save-validation"],
  "meadow-diagnostics-dsk": ["runtime-health", "render-health", "determinism-checks", "smoke-tests", "diagnostics-report"],
  "meadow-performance-dsk": ["quality-profile", "budget-policy", "lod-policy", "adaptive-scaling", "performance-validation"],
  "meadow-render-host-dsk": ["renderer-selection", "render-plan-ingest", "pass-order", "renderer-state", "renderer-validation"],
  "post-process-stack-dsk": ["pass-registry", "render-target-system", "sobel-outline-pass", "color-grade-pass", "post-validation"],
  "render-target-kit": ["scene-color-texture", "depth-texture", "normal-texture", "ping-pong-buffer", "resize-policy"],
  "sobel-outline-pass-kit": ["color-edge-threshold", "depth-edge-threshold", "normal-edge-threshold", "outline-color", "object-mask"],
  "color-grade-pass-kit": ["warmth", "contrast", "saturation", "shadow-tint", "highlight-tint"],
  "depth-fog-pass-kit": ["fog-near", "fog-far", "fog-color", "distance-curve", "horizon-haze"],
  "vignette-pass-kit": ["radius", "softness", "strength", "center", "quality-tier"],
  "final-composite-pass-kit": ["scene-input", "post-input", "output-target", "debug-overlay", "fallback-composite"],
  "static-pages-deploy-dsk": ["build-config", "github-pages-workflow", "release-artifacts", "cache-invalidation", "deploy-validation"]
});

function toDomain(id) {
  return id.replace(/-dsk$/, "").replace(/-kit$/, "");
}

export function createDskDescriptor(id) {
  const subdomains = SERVICES[id] ?? ["model", "state", "events", "validation", "snapshot"];
  return Object.freeze({
    id,
    domain: toDomain(id),
    label: DOMAIN_LABELS[id] ?? id,
    status: REQUIRED_V01_DSK_IDS.includes(id) ? "active-v0.1" : "planned",
    layers: Object.freeze([
      Object.freeze({ layer: 1, name: "IntoTheMeadow", role: "publishable game repo" }),
      Object.freeze({ layer: 2, name: DOMAIN_LABELS[id] ?? id, role: "game capability domain" }),
      Object.freeze({ layer: 3, name: id, role: "DSK package/folder boundary" }),
      Object.freeze({ layer: 4, name: "subdomains", items: Object.freeze(subdomains) }),
      Object.freeze({ layer: 5, name: "services", items: Object.freeze(subdomains.map((name) => `${name}:service`)) })
    ]),
    provides: Object.freeze([`game:${toDomain(id)}`]),
    requires: Object.freeze([]),
    snapshot() {
      return { id, status: this.status, layers: this.layers.length, subdomainCount: subdomains.length };
    },
    validate() {
      const failures = [];
      if (!id.endsWith("-dsk") && !id.endsWith("-kit")) failures.push("id must end with -dsk or -kit");
      if (subdomains.length < 5) failures.push("expected five subdomain services");
      return { passed: failures.length === 0, failures };
    }
  });
}

export const LOCAL_DSKS = Object.freeze(LOCAL_DSK_IDS.map(createDskDescriptor));

export function getDsk(id) {
  return LOCAL_DSKS.find((dsk) => dsk.id === id) ?? null;
}

export function validateLocalDsks(dsks = LOCAL_DSKS) {
  const failures = [];
  const ids = new Set();
  for (const dsk of dsks) {
    if (ids.has(dsk.id)) failures.push(`duplicate DSK id: ${dsk.id}`);
    ids.add(dsk.id);
    const result = dsk.validate();
    for (const failure of result.failures) failures.push(`${dsk.id}: ${failure}`);
  }
  for (const required of REQUIRED_V01_DSK_IDS) if (!ids.has(required)) failures.push(`missing required v0.1 DSK: ${required}`);
  return Object.freeze({ passed: failures.length === 0, failures, count: dsks.length, requiredCount: REQUIRED_V01_DSK_IDS.length });
}
