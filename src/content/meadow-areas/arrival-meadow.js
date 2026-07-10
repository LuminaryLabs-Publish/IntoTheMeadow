export const ARRIVAL_MEADOW_CONFIG = Object.freeze({
  seed: "into-the-meadow-arrival-v0.2",
  area: Object.freeze({
    id: "arrival-meadow",
    anchor: Object.freeze({ x: 0, y: 0, z: 20 }),
    width: 90,
    depth: 110
  }),
  features: Object.freeze({
    path: Object.freeze({
      enabled: true,
      width: 3.65,
      pebbleCount: 92,
      rutCount: 3,
      points: Object.freeze([
        Object.freeze({ x: 0, z: -44 }),
        Object.freeze({ x: -1.8, z: -31 }),
        Object.freeze({ x: 1.6, z: -18 }),
        Object.freeze({ x: -3.4, z: -6 }),
        Object.freeze({ x: 1.2, z: 7 }),
        Object.freeze({ x: 0, z: 20 })
      ])
    }),
    focalTree: Object.freeze({
      enabled: true,
      position: Object.freeze({ x: 0, y: 0, z: 24 }),
      trunkRadius: 1.42,
      trunkHeight: 12.8,
      branchCount: 22,
      rootCount: 14,
      canopyRadius: 13.6,
      canopyHeight: 9.8,
      leafClusterCount: 118,
      shadowRadius: 7.6,
      sway: 0.3
    }),
    // meadow-area-kit currently requires at least one source grass object.
    // The visible field is generated from the local texture-driven clump contract.
    grass: Object.freeze({ enabled: true, bladeCount: 1 }),
    flowers: Object.freeze({ enabled: true, count: 300 }),
    rocks: Object.freeze({ enabled: true, count: 32 }),
    mushrooms: Object.freeze({ enabled: false, count: 0 }),
    treeLine: Object.freeze({ enabled: true, count: 30 }),
    wind: Object.freeze({
      enabled: true,
      strength: 0.3,
      gust: 0.12,
      direction: Object.freeze({ x: 0.72, y: 0, z: 0.34 })
    })
  }),
  style: Object.freeze({
    timeOfDay: "golden-hour",
    renderStyle: "painterly-meadow-v2",
    camera: Object.freeze({
      position: Object.freeze({ x: 0, y: 5.6, z: -52 }),
      target: Object.freeze({ x: 0, y: 5.4, z: 24 }),
      fov: 46,
      near: 0.1,
      far: 190
    }),
    light: Object.freeze({
      direction: Object.freeze({ x: -0.48, y: 0.82, z: -0.3 }),
      rimColor: "#ffd37a",
      rimStrength: 0.24,
      outlineColor: "#152013",
      outlineWidth: 0.052
    }),
    materials: Object.freeze({
      grass: Object.freeze({ base: "#5f813c", shade: "#263b1e", highlight: "#d0b861" }),
      flower: Object.freeze({ base: "#d85d9a", shade: "#6b2856", highlight: "#f4d976" }),
      rock: Object.freeze({ base: "#777568", shade: "#3c3e35", highlight: "#c3c799" }),
      bark: Object.freeze({ base: "#5b3719", shade: "#1f1209", highlight: "#9b672d" }),
      leaf: Object.freeze({ base: "#3f612a", shade: "#1a2e16", highlight: "#d0993d" }),
      sky: Object.freeze({ base: "#7fb2dc", shade: "#496f88", highlight: "#efd39a" }),
      terrain: Object.freeze({
        meadowBase: "#6f8b52",
        meadowWarm: "#91aa5c",
        meadowShade: "#4c6d35",
        meadowDry: "#a5a45b",
        pathCenter: "#f3d176",
        pathMid: "#d9a752",
        pathEdge: "#9f7b3f",
        rut: "#8d6132",
        pebble: "#d8d1a3"
      })
    })
  })
});
