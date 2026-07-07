export function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
  return JSON.stringify(value);
}

export function validateDeterminism(createSnapshot) {
  const first = stableStringify(createSnapshot());
  const second = stableStringify(createSnapshot());
  return Object.freeze({ passed: first === second, failures: first === second ? [] : ["snapshot changed between deterministic calls"] });
}
