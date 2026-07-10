export const ARRIVAL_MEADOW_CONFIG = Object.freeze({
  seed: "into-the-meadow-arrival-v0.3",
  area: Object.freeze({
    id: "arrival-meadow",
    anchor: Object.freeze({ x: 0, y: 0, z: 20 }),
    width: 90,
    depth: 110
  }),
  features: Object.freeze({
    path: Object.freeze({
      enabled: true,
      width: 3.35,
      pebbleCount: 70,
      rutCount: 2,
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
      trunkRadius: 1.38,
      trunkHeight: 13.1,
      branchCount: 22,
      rootCount: 14,
      canopyRadius: 12.9,
      canopyHeight: 10.4,
      leafClusterCount: 164,
      shadowRadius: 8.4,
      sway: 0.22
    }),
    grass: Object.freeze({ enabled: true, bladeCount: 1 }),
    flowers: Object.freeze({ enabled: true, count: 240 }),
    rocks: Object.freeze({ enabled: true, count: 24 }),
    mushrooms: Object.freeze({ enabled: false, count: 0 }),
    treeLine: Object.freeze({ enabled: true, count: 26 }),
    wind: Object.freeze({
      enabled: true,
      strength: 0.22,
      gust: 0.09,
      direction: Object.freeze({ x: 0.72, y: 0, z: 0.34 })
    })
  }),
  style: Object.freeze({
    timeOfDay: "golden-hour",
    renderStyle: "painterly-meadow-v3",
    camera: Object.freeze({
      position: Object.freeze({ x: 0, y: 5.3, z: -52 }),
      target: Object.freeze({ x: 0, y: 5.7, z: 24 }),
      fov: 45,
      near: 0.1,
      far: 190
    }),
    light: Object.freeze({
      direction: Object.freeze({ x: -0.48, y: 0.82, z: -0.3 }),
      rimColor: "#d6bd78",
      rimStrength: 0.17,
      outlineColor: "#202a20",
      outlineWidth: 0.028
    }),
    materials: Object.freeze({
      grass: Object.freeze({ base: "#4f7040", shade: "#293d2d", highlight: "#82965a" }),
      flower: Object.freeze({ base: "#c86f98", shade: "#6c405b", highlight: "#dbc985" }),
      rock: Object.freeze({ base: "#73786f", shade: "#454b45", highlight: "#9ca88c" }),
      bark: Object.freeze({ base: "#5a3c27", shade: "#2d2018", highlight: "#896343" }),
      leaf: Object.freeze({ base: "#486743", shade: "#243a2a", highlight: "#7f8d4e" }),
      sky: Object.freeze({ base: "#86b4d0", shade: "#55788a", highlight: "#d9c69a" }),
      terrain: Object.freeze({
        meadowBase: "#657f54",
        meadowWarm: "#7f9560",
        meadowShade: "#4a6447",
        meadowDry: "#8d8d5e",
        pathCenter: "#c7ad72",
        pathMid: "#a98c5d",
        pathEdge: "#786b4f",
        rut: "#70543d",
        pebble: "#aaa78d"
      })
    })
  })
});
