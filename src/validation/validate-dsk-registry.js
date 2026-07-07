import { LOCAL_DSKS, validateLocalDsks } from "../dsks/index.js";
import { REQUIRED_V01_DSK_IDS } from "../content/dsk-registry.js";

export function validateDskRegistry() {
  const base = validateLocalDsks(LOCAL_DSKS);
  const ids = new Set(LOCAL_DSKS.map((dsk) => dsk.id));
  const failures = [...base.failures];
  for (const required of REQUIRED_V01_DSK_IDS) if (!ids.has(required)) failures.push(`missing required DSK ${required}`);
  return Object.freeze({ passed: failures.length === 0, failures, count: LOCAL_DSKS.length, required: REQUIRED_V01_DSK_IDS.length });
}
