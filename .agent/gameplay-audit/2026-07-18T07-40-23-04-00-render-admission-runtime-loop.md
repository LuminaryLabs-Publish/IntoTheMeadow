# Gameplay Audit: Render Admission Runtime Loop

**Timestamp:** `2026-07-18T07-40-23-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Interaction loop

```txt
boot
  -> load meadow provider
  -> compose static meadow source plan
  -> enhance to render-plan v2
  -> validate required render descriptors
  -> expand mesh synchronously
  -> upload WebGL attributes
  -> animate wind by time uniform
  -> draw and expose snapshots
```

## Gameplay relevance

The current route is primarily an environment and editor proof. Player, input, interaction, story and objective DSKs remain planned. Render work therefore dominates the active visible loop and is a prerequisite for later playable progression.

## Gap

The loop has no admitted render-work envelope. A future editor mutation, provider revision, quality profile or gameplay-driven scene expansion can increase descriptor counts without a transaction that decides whether the resulting mesh is allowed to build.

## Required behavior

```txt
plan generation
  -> estimate render work
  -> accept / degrade / reject under profile
  -> build accepted mesh generation
  -> upload accepted attribute generation
  -> present matching frame
  -> acknowledge accepted budget generation
```

## Failure settlement

A budget failure should preserve the last accepted render generation or show a bounded fallback. It should not begin an unbounded build and fail after partial CPU allocation or GPU upload.

## Boundary

No gameplay or runtime implementation changed.