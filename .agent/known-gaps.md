# Known gaps

**Updated:** `2026-07-13T05-31-58-04-00`

## Summary

The newest bounded gap is host lifecycle retirement. Existing audits for workspace containment, provider parity, WebGL recovery, frame scheduling, progression, DSK consumption, and grass visibility remain unresolved and should not be treated as superseded.

## Current lifecycle gaps

```txt
host session identity: absent
host generation: absent
lifecycle phase and revision: absent
RAF request identity: absent
cancelAnimationFrame ownership: absent
pause/resume contract: ambiguous
terminal retire/dispose method: absent
ordered participant registry: absent
renderer disposal composition: absent
editor-bridge disposal composition: absent
error-listener detachment receipt: absent
GameHost lease and revocation: absent
NexusEditorEnvironment generation lease: absent
duplicate-start admission: absent
stale callback quarantine: absent
fatal cleanup result: absent
bounded lifecycle journal: absent
first resumed frame acknowledgement: absent
terminal visible-state acknowledgement: absent
lifecycle fixtures: absent
```

## Reachable consequences

- Explicit stop leaves WebGL buffers, the program, editor listeners, and public globals installed.
- Fatal render handling leaves the same participants installed while the host is marked stopped.
- Repeated boot can overwrite globals while predecessor resources and listeners remain reachable only through captured references.
- Stop/resume has no generation or temporal discontinuity proof.
- Editor capabilities can remain callable after failure or stop.
- A stale predecessor callback has no generation check before interacting with host-owned state.

These are source-derived possibilities, not measured production incidents.

## Retained unresolved audit families

### Workspace containment

The Node editor still lacks canonical-root identity, path-segment containment, link policy, atomic paired-artifact results, and adversarial fixtures.

### Provider source parity

The browser and headless provider paths still require a shared manifest, version/fingerprint contract, and typed provider admission result.

### WebGL context recovery

Context-loss generation, resource rebuild, stale-resource rejection, and recovered-frame proof remain unimplemented.

### Frame scheduling

Wall-time admission, fixed-step drain results, pause/resume discontinuity, and temporal frame provenance remain unimplemented.

### Exploration and progression

Player movement, interaction, story, and objective declarations remain largely planned rather than active gameplay authority.

### DSK runtime consumption

Many declared DSKs remain descriptors and validation surfaces rather than installed runtime service owners.

### Grass visibility and LOD

Visibility, LOD registry, budget, and rendered-frame proof remain bounded prior concerns.

## Validation gaps

```txt
web-host lifecycle unit fixture: unavailable
browser stop/resume smoke: not run
terminal retire smoke: not run
duplicate boot fixture: unavailable
fatal cleanup fixture: unavailable
RAF-count fixture: unavailable
listener-count fixture: unavailable
GameHost revocation fixture: unavailable
NexusEditorEnvironment revocation fixture: unavailable
WebGL disposal receipt fixture: unavailable
stale callback fixture: unavailable
Pages lifecycle smoke: not run
```
