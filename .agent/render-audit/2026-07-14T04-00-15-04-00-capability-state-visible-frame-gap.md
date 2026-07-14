# Render Audit: Capability State and Visible-Frame Gap

## Current frame evidence

The web host renders a validated render plan and can display descriptor counts, grass counts, vertices and GPU cache state. The frame does not carry a DSK composition revision, capability manifest ID or list of degraded and unavailable services.

```txt
structural DSK validation passes
  -> game state stores DSK snapshot
  -> renderer receives render plan
  -> visible meadow frame succeeds
  -> no evidence identifies which declared capabilities are executable
```

## Gap

A visible meadow can prove rendering while player, input, interaction, story, objective, audio, UI or save capabilities remain descriptor-only. Render success must not be treated as whole-game capability readiness.

## Required frame envelope

```txt
CapabilityFrameEnvelope {
  frameId
  gameRevision
  dskCompositionRevision
  capabilityManifestId
  renderPlanRevision
  rendererGeneration
  activeCapabilityIds
  degradedCapabilityIds
  unavailableCapabilityIds
}
```

## Required acknowledgement

```txt
FirstCapabilityRevisionFrameAck
```

It should be published only after a frame derived from the accepted capability composition is submitted and observed. It proves revision correlation, not that every planned kit is implemented.

## Validation boundary

No browser frame, screenshot, renderer capture or Pages observation was executed in this documentation pass.