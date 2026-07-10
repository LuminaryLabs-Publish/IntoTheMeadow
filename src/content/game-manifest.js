export const GAME_MANIFEST = Object.freeze({
  id: "into-the-meadow",
  title: "Into The Meadow",
  version: "0.2.0",
  build: "0.2.0-render-contract-v2",
  route: "./index.html",
  publicUrl: "https://luminarylabs-publish.github.io/IntoTheMeadow/",
  defaultScene: "arrival-meadow",
  renderContract: "meadow-render-plan/v2",
  localRenderer: Object.freeze({
    id: "meadow-webgl-renderer-v2",
    module: "./src/renderers/meadow-webgl-renderer-v2.js",
    cachePolicy: "rebuild-on-topology-key-change"
  }),
  externalKits: Object.freeze([
    Object.freeze({
      id: "meadow-area-kit",
      url: "https://cdn.jsdelivr.net/gh/LuminaryLabs-Agents/NexusEngine-ProtoKits@11d245913ba4d30f3ce950eb5a17e1cc6e4aa1f5/protokits/meadow-area-kit/index.js"
    })
  ])
});
