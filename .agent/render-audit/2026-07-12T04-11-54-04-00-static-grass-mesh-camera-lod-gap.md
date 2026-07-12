# Render Audit: Static Grass Mesh and Camera LOD Gap

**Timestamp:** `2026-07-12T04-11-54-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Current render path

```txt
density texture
  -> patches
  -> density-selected near/mid batches
  -> complete draw groups
  -> addGrassField()
  -> every group
  -> every instance
  -> 28/16/4 cards by assigned batch
  -> blade ribbon triangles
  -> one static mesh key
  -> persistent WebGL buffers
```

## Finding

The declared LOD policy is not used by the active render path. The mesh builder has no camera position, camera revision, frustum, visible patch set or distance evidence. Its hard-coded card limits reduce per-instance geometry but do not reject distant or off-screen instances.

## Visible-frame mismatch

```txt
debug grass count     = total descriptor instances
debug vertex count    = total expanded mesh vertices
visible grass count   = not reported
culled patch count    = not reported
applied cards by tier = not reported
visible-set revision  = absent
frame acknowledgement = absent
```

A stable topology key proves that time animation did not rebuild geometry. It does not prove that the geometry is appropriately view-admitted.

## Required renderer input

```txt
GrassDrawPlan
  visibleSetRevision
  cameraRevision
  surfaceRevision
  contextGeneration
  qualityRevision
  admitted patch IDs
  instances grouped by applied tier
  terrain-tint patches
  requested and applied card counts
  budget result
```

## Required renderer output

```txt
GrassRenderResult
  drawPlanId
  visibleSetRevision
  uploaded instance/card counts
  drawn instance/card counts
  terrain-tint count
  fallback status
  rejection or allocation reasons
  frameAckId
```

## Completion gate

A passing renderer fixture must move the camera across all thresholds, turn patches out of the frustum, apply a constrained budget and prove the submitted frame reflects the committed draw-plan revision.
