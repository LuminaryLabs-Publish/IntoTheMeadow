# Gameplay Audit: Source Parity and Gameplay Coordinate Contract

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T19-48-39-04-00`

## Authored gameplay content

```txt
arrival-path
  action: path-progress
  objective: walk-the-path
  completion: progress >= 0.35

focal-tree
  action: inspect
  objective: inspect-tree
  completion: inspected
```

## Source dependency

Future gameplay commands will need stable world-space facts from the same source that produced the rendered meadow:

```txt
path points and width
focal-tree position and bounds
terrain/ground height
coordinate space
source plan identity
source epoch
```

The external kit normalizes these facts. The fallback reconstructs them independently. No parity row currently proves that a command accepted against one provider targets the same world-space path or tree rendered by the other provider.

## Current gameplay risk

```txt
browser renders the external source
Node command fixtures would default to the local fallback
interaction targets are separate authored descriptors
no source-plan target resolver binds descriptors to rendered objects
no source epoch invalidates stale target references after rebuild
no state fingerprint includes source identity
```

A future movement or inspection fixture could pass against the fallback while the browser's external path or focal-tree bounds differ.

## Required gameplay-source join

Every accepted or rejected gameplay result should include:

```txt
sourceEpoch
sourcePlanFingerprint
targetId
renderObjectId
coordinateSpace
targetPosition or path segment
preflight distance/range
status
reason
```

## Fixture cases

```txt
walk 0.35 of external path
walk 0.35 of fallback path
inspect external focal tree in range
inspect fallback focal tree in range
reject stale target after source rebuild
reject target missing from selected source
prove authored target id resolves to rendered source object id
prove same provider/config creates the same target coordinates
classify any external/fallback coordinate differences
```

## Dependency order

```txt
source-provider authority
  -> canonical source target index
  -> interaction command authority
  -> target preflight against selected source
  -> objective reducer
  -> source-aware gameplay fingerprint
  -> external/fallback replay fixtures
```

## Conclusion

Interaction authority should not be implemented against static content descriptors alone. It must bind to the selected source plan so the path and focal tree used by gameplay are the same path and tree the player sees.