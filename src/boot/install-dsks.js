import { LOCAL_DSKS, validateLocalDsks } from "../dsks/index.js";
import { EXTERNAL_DSK_IDS } from "../content/dsk-registry.js";

export function installDsks({ externalKits = {} } = {}) {
  const localValidation = validateLocalDsks(LOCAL_DSKS);
  const installedExternal = EXTERNAL_DSK_IDS.map((id) => Object.freeze({ id, status: externalKits[id] ? "loaded" : "deferred" }));
  return Object.freeze({
    local: LOCAL_DSKS,
    external: Object.freeze(installedExternal),
    validation: Object.freeze({
      passed: localValidation.passed,
      failures: Object.freeze([...localValidation.failures]),
      localCount: localValidation.count,
      externalCount: installedExternal.length
    }),
    snapshot() {
      return {
        local: LOCAL_DSKS.map((dsk) => dsk.snapshot()),
        external: installedExternal,
        validation: this.validation
      };
    }
  });
}
