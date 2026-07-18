# Interaction Audit: Render Plan Admission Command and Result Map

**Timestamp:** `2026-07-18T07-40-23-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Current interaction

```txt
provider/editor source change
  -> render plan enhancement
  -> shape validation
  -> immediate full mesh build
  -> immediate upload and draw
```

The editor and public host can inspect plans and snapshots, but neither surface can request or read an admitted render budget result.

## Proposed command map

```txt
RenderWorkEstimateCommand {
  planId
  topologyKey
  descriptorCounts
  terrainResolution
  profileId
}
  -> RenderWorkEstimateResult {
       predictedVertices
       predictedTriangles
       predictedAttributeBytes
       contributors[]
     }

RenderBudgetAdmissionCommand {
  estimateId
  profileRevision
  viewportClass
}
  -> RenderBudgetAdmissionResult {
       status: accepted | degraded | rejected
       acceptedLimits
       degradationPlan
       reasons[]
     }

MeshBuildCommitCommand {
  admissionId
  planDigest
}
  -> MeshBuildResult {
       meshKey
       actualVertices
       actualTriangles
       actualAttributeBytes
       status
     }

RenderBudgetProjectionCommitCommand {
  admissionId
  meshKey
  rendererSnapshot
}
  -> FirstRenderBudgetBoundFrameAck
```

## Host/editor projection

`GameHost` and `NexusEditorEnvironment` should expose the same estimate, admission, build and frame result IDs. Editor mutation must not bypass the same admission path used by browser boot.

## Boundary

Proposed command/result contracts only.