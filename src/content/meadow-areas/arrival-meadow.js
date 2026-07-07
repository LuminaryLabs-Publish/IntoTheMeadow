export const ARRIVAL_MEADOW_CONFIG = Object.freeze({
  seed: "into-the-meadow-arrival-v0.1",
  area: Object.freeze({ id: "arrival-meadow", anchor: Object.freeze({ x: 0, y: 0, z: 20 }), width: 90, depth: 110 }),
  features: Object.freeze({
    path: Object.freeze({
      enabled: true,
      width: 3.9,
      points: Object.freeze([
        Object.freeze({ x: 0, z: -44 }),
        Object.freeze({ x: -1.8, z: -31 }),
        Object.freeze({ x: 1.6, z: -18 }),
        Object.freeze({ x: -3.4, z: -6 }),
        Object.freeze({ x: 1.2, z: 7 }),
        Object.freeze({ x: 0, z: 20 })
      ])
    }),
    focalTree: Object.freeze({ enabled: true, position: Object.freeze({ x: 0, y: 0, z: 24 }), trunkHeight: 12.2, canopyRadius: 13.2 }),
    grass: Object.freeze({ enabled: true, bladeCount: 3600 }),
    flowers: Object.freeze({ enabled: true, count: 420 }),
    rocks: Object.freeze({ enabled: true, count: 46 }),
    mushrooms: Object.freeze({ enabled: true, count: 34 }),
    treeLine: Object.freeze({ enabled: true, count: 36 }),
    wind: Object.freeze({ enabled: true, strength: 0.38 })
  }),
  style: Object.freeze({
    timeOfDay: "golden-hour",
    renderStyle: "painterly-cel-3d",
    materials: Object.freeze({
      terrain: Object.freeze({
        meadowBase: "#6f8b52",
        meadowWarm: "#91aa5c",
        meadowShade: "#4c6d35",
        pathCenter: "#f3d176",
        pathMid: "#d9a752",
        pathEdge: "#9f7b3f",
        rut: "#8d6132",
        pebble: "#d8d1a3"
      })
    })
  })
});
