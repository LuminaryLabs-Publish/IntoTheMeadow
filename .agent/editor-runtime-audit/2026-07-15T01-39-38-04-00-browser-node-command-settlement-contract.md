# Editor Runtime Audit: Browser and Node Command-Settlement Contract

**Timestamp:** `2026-07-15T01-39-38-04-00`

## Summary

The browser and Node editor environments expose overlapping capability names but different mutation, time, reset, capture, and comparison semantics. The shared protocol family does not include a manifest revision or compatibility result that explains those differences.

## Plan ledger

**Goal:** make browser and Node editor surfaces either semantically compatible or explicitly versioned as different profiles.

- [x] Compare runtime, scene, renderer, browser, camera and workspace capabilities.
- [x] Compare tick, reset, capture and comparison behavior.
- [x] Identify missing manifest and substitution policy.
- [x] Define required parity decisions.
- [ ] Implement parity manifests and fixtures later.

## Surface comparison

| Capability | Browser environment | Node environment | Required decision |
|---|---|---|---|
| `runtime.status` | Live GameHost state and diagnostics | Game state, diagnostics and private editor time | Normalize result schema. |
| `runtime.tick` | `{ dt, time }`, one direct tick | `{ dt, ticks }`, private time increment and loop | Define separate profiles or one schema. |
| `runtime.reset` | Game reset only | Time reset, enhancer invalidation, game reset | Define mandatory participants. |
| `scene.getRenderPlan` | Last browser plan or enhanced current plan | Rebuilt inspectable plan | Publish revision and freshness policy. |
| `renderer.getSnapshot` | Last live WebGL snapshot | Rebuilt mesh and metric observation | Identify renderer profile. |
| `renderer.capture` | Canvas data URL | JSON and SVG artifacts | Publish common capture envelope with profile-specific artifacts. |
| `renderer.compare` | Absent | Ambient previous/current metric comparison | Add, substitute, or mark unsupported. |
| `browser.getViewport` | Real viewport and canvas dimensions | Fixed headless observation dimensions | Identify viewport profile. |
| `workspace.*` | Absent | Read/write/list under contained root | Mark Node-only and policy-gated. |

## Required capability manifest

```txt
EditorCapabilityManifest {
  environmentId
  protocolId
  protocolRevision
  profileId
  capabilityId
  argumentSchema
  resultSchema
  mutationClass
  visibilityClass
  schedulerPolicy
  artifactKinds
  substitutions
  unsupportedReasons
}
```

## Compatibility rules

- Equal capability IDs must not silently imply equal semantics.
- Scenario admission must validate required capability profile and schema revision.
- Browser-only visible-frame requirements must remain explicit.
- Node-only workspace and synthetic observation services must remain explicit.
- Substitution must publish why a canvas capture became an SVG observation or why comparison is unavailable.

## Boundary

No protocol, capability ID, scenario, terminal client, or environment implementation changed. This audit records semantic drift and the required compatibility contract.
