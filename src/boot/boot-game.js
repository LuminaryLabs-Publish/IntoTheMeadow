import { startWebHost } from "../hosts/web-host.js?v=0.3.0-headless-editor";

const canvas = document.querySelector("#scene");
const hud = document.querySelector("#hud");
const statusEl = document.querySelector("#status");
const loadingEl = document.querySelector("#loading");
const debug = new URLSearchParams(location.search).has("debug");

startWebHost({ canvas, hud, statusEl, loadingEl, debug }).catch((error) => {
  if (hud) hud.hidden = false;
  if (statusEl) statusEl.textContent = String(error?.stack ?? error?.message ?? error);
  if (loadingEl) loadingEl.textContent = "failed to boot IntoTheMeadow";
  console.error(error);
});
