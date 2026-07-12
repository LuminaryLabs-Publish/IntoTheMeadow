# Render Audit: Visual Frame and Audio Listener Correlation Gap

**Timestamp:** `2026-07-12T05-39-42-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Finding

The visual path has a camera descriptor, render plan, renderer snapshot and browser-canvas capture. The declared audio path has no listener pose, audio-frame identity or audible-output receipt.

```txt
RAF time
  -> game tick
  -> render-plan enhancement
  -> WebGL render
  -> renderer snapshot

same frame for audio
  -> no audio command
  -> no listener position/orientation
  -> no scene or clock revision
  -> no mix result
  -> no audible-output observation
```

## Risk

A future spatial-audio implementation could read mutable camera values directly while rendering uses a different committed plan. This would permit visual and audible viewpoints to diverge during reset, camera movement, pause, stale async decode, restart or context replacement.

## Required correlation

```txt
CommittedSceneObservation {
  runtimeSessionId
  sceneRevision
  clockRevision
  cameraRevision
  playerRevision
}

VisualFrameResult {
  frameId
  sceneRevision
  cameraRevision
  renderPlanRevision
}

AudioFrameResult {
  audioFrameId
  sceneRevision
  clockRevision
  listenerPoseRevision
  mixRevision
  activeSourceCount
}
```

Visual and audio results may complete independently, but diagnostics must be able to prove that they consumed compatible scene, clock and listener observations.

## Required proof

- listener position and orientation derive from one committed pose revision;
- reset invalidates predecessor listener and mix results;
- stale audio-frame results cannot apply after camera or scene replacement;
- visual rendering continues when audio is blocked or failed;
- audio diagnostics identify silent, blocked, suspended and active states;
- browser observation can compare visual frame and audio revision without exposing mutable runtime objects.
