export function createInitialGameState({ manifest, dskInstall, sceneId = "arrival-meadow" } = {}) {
  return Object.freeze({
    id: "into-the-meadow.state",
    version: manifest?.version ?? "0.1.0",
    frame: 0,
    activeSceneId: sceneId,
    activeSessionId: `${sceneId}:session-0`,
    player: Object.freeze({ position: Object.freeze({ x: 0, y: 0, z: -36 }), yaw: 0, pitch: 0, pathProgress: 0 }),
    world: Object.freeze({ meadowAreaId: sceneId, wind: Object.freeze({ strength: 0.38 }) }),
    progression: Object.freeze({ activeObjectiveId: "walk-the-path", completedObjectiveIds: Object.freeze([]), storyBeatIds: Object.freeze(["arrival"]) }),
    dsk: dskInstall?.snapshot?.() ?? null
  });
}

export function advanceGameState(state, input = {}) {
  return Object.freeze({
    ...state,
    frame: state.frame + 1,
    lastTick: Object.freeze({ dt: Number(input.dt ?? 1 / 60), time: Number(input.time ?? 0) })
  });
}
