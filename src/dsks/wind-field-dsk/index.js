export function createWindFieldDsk(config = {}) {
  const state = Object.freeze({
    direction: Object.freeze({ x: Number(config.direction?.x ?? 0.72), y: 0, z: Number(config.direction?.z ?? 0.34) }),
    strength: Number(config.strength ?? 0.32),
    gust: Number(config.gust ?? 0.14),
    turbulence: Number(config.turbulence ?? 0.18)
  });
  return Object.freeze({
    id: "wind-field-dsk",
    state,
    sampleAt(position = {}, time = 0) {
      const phase = Math.sin(Number(time) * 0.8 + Number(position.x ?? 0) * 0.05 + Number(position.z ?? 0) * 0.04);
      return Object.freeze({ ...state, phase, value: state.strength + phase * state.gust });
    },
    validate() {
      const failures = [];
      if (state.strength < 0) failures.push("wind strength cannot be negative");
      return Object.freeze({ passed: failures.length === 0, failures });
    }
  });
}
