export const GAME_MANIFEST = Object.freeze({
  id: "into-the-meadow",
  title: "Into The Meadow",
  version: "0.1.0",
  build: "0.1.0-dsk-scaffold",
  route: "./index.html",
  publicUrl: "https://luminarylabs-publish.github.io/IntoTheMeadow/",
  defaultScene: "arrival-meadow",
  externalKits: Object.freeze([
    Object.freeze({ id: "meadow-area-kit", url: "https://cdn.jsdelivr.net/gh/LuminaryLabs-Agents/NexusRealtime-ProtoKits@main/protokits/meadow-area-kit/index.js" }),
    Object.freeze({ id: "meadow-webgl-render-kit", url: "https://cdn.jsdelivr.net/gh/LuminaryLabs-Agents/NexusRealtime-ProtoKits@main/protokits/meadow-webgl-render-kit/index.js" })
  ])
});
