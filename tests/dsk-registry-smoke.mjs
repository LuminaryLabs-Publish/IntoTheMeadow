import { validateDskRegistry } from "../src/validation/validate-dsk-registry.js";
import { LOCAL_DSKS } from "../src/dsks/index.js";

const result = validateDskRegistry();
if (!result.passed) throw new Error(`DSK registry failed: ${result.failures.join("; ")}`);
if (LOCAL_DSKS.length < 26) throw new Error(`Expected at least 26 local DSK descriptors, got ${LOCAL_DSKS.length}`);
for (const dsk of LOCAL_DSKS) {
  if (dsk.layers.length !== 5) throw new Error(`${dsk.id} does not expose five architecture layers`);
}
console.log(`dsk registry smoke ok · dsks:${LOCAL_DSKS.length}`);
