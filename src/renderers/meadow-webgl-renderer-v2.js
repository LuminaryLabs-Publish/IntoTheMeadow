import { buildMeadowMeshData } from "./meadow-mesh-builder-v2.js";
import { MEADOW_RENDER_PLAN_SCHEMA } from "../render-contract/meadow-render-plan-v2.js";

export const MEADOW_WEBGL_RENDERER_V2_VERSION = "0.2.0";

function finite(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, finite(value, min)));
}

function hex(color, fallback = "#ffffff") {
  const source = /^#[0-9a-f]{6}$/i.test(String(color)) ? String(color) : fallback;
  const value = source.slice(1);
  return [0, 2, 4].map((index) => parseInt(value.slice(index, index + 2), 16) / 255);
}

function subtract(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function normalize(vector, fallback = [0, 1, 0]) {
  const magnitude = Math.hypot(vector[0], vector[1], vector[2]);
  return magnitude > 0.00001 ? vector.map((component) => component / magnitude) : fallback;
}

function perspective(fov, aspect, near, far) {
  const scale = 1 / Math.tan((fov * Math.PI / 180) / 2);
  const range = 1 / (near - far);
  return [
    scale / aspect, 0, 0, 0,
    0, scale, 0, 0,
    0, 0, (far + near) * range, -1,
    0, 0, 2 * far * near * range, 0
  ];
}

function lookAt(eye, center, up) {
  const z = normalize(subtract(eye, center), [0, 0, 1]);
  const x = normalize(cross(up, z), [1, 0, 0]);
  const y = cross(z, x);
  return [
    x[0], y[0], z[0], 0,
    x[1], y[1], z[1], 0,
    x[2], y[2], z[2], 0,
    -dot(x, eye), -dot(y, eye), -dot(z, eye), 1
  ];
}

function multiplyMatrices(a, b) {
  const output = Array(16).fill(0);
  for (let row = 0; row < 4; row += 1) {
    for (let column = 0; column < 4; column += 1) {
      for (let index = 0; index < 4; index += 1) {
        output[column * 4 + row] += a[index * 4 + row] * b[column * 4 + index];
      }
    }
  }
  return output;
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || "unknown shader compile error";
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
}

function createProgram(gl) {
  const vertexSource = `
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    attribute vec3 aColor;
    attribute float aOutline;
    attribute vec2 aWind;

    uniform mat4 uViewProjection;
    uniform float uTime;
    uniform vec2 uWindDirection;
    uniform float uWindStrength;
    uniform float uWindGust;
    uniform float uOutlinePass;
    uniform float uOutlineWidth;

    varying vec3 vNormal;
    varying vec3 vColor;
    varying float vOutlineWeight;
    varying float vDepth;

    void main() {
      float phase = uTime * (1.18 + uWindGust * 0.34) + aWind.y * 6.2831853 + (aPosition.x + aPosition.z) * 0.052;
      float gust = sin(phase) * 0.72 + sin(phase * 0.47 + 1.7) * 0.28;
      vec3 windOffset = vec3(uWindDirection.x, 0.0, uWindDirection.y) * gust * uWindStrength * aWind.x;
      vec3 position = aPosition + windOffset;
      if (uOutlinePass > 0.5) {
        position += normalize(aNormal) * aOutline * uOutlineWidth;
      }
      vec4 clip = uViewProjection * vec4(position, 1.0);
      gl_Position = clip;
      vNormal = aNormal;
      vColor = aColor;
      vOutlineWeight = aOutline;
      vDepth = clip.z / clip.w;
    }
  `;

  const fragmentSource = `
    precision mediump float;

    varying vec3 vNormal;
    varying vec3 vColor;
    varying float vOutlineWeight;
    varying float vDepth;

    uniform vec3 uLightDirection;
    uniform vec3 uRimColor;
    uniform vec3 uOutlineColor;
    uniform vec3 uFogColor;
    uniform float uRimStrength;
    uniform float uOutlinePass;

    void main() {
      if (uOutlinePass > 0.5) {
        if (vOutlineWeight < 0.006) discard;
        gl_FragColor = vec4(uOutlineColor, 1.0);
        return;
      }

      vec3 normal = normalize(vNormal);
      float light = dot(normal, normalize(uLightDirection)) * 0.5 + 0.5;
      float cel = light < 0.2 ? 0.48 : light < 0.47 ? 0.72 : light < 0.76 ? 0.98 : 1.15;
      float rim = smoothstep(0.28, 0.92, 1.0 - abs(normal.z)) * uRimStrength;
      vec3 shaded = vColor * cel + uRimColor * rim;
      float fog = smoothstep(0.28, 0.96, vDepth) * 0.34;
      gl_FragColor = vec4(mix(shaded, uFogColor, fog), 1.0);
    }
  `;

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) || "unknown program link error";
    gl.deleteProgram(program);
    throw new Error(message);
  }
  return program;
}

function createAttributeBuffer(gl, location, size, values) {
  if (location < 0) throw new Error("required renderer attribute is unavailable");
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(values), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
  return buffer;
}

export function createMeadowWebglRendererV2(config = {}) {
  const canvas = config.canvas;
  if (!canvas) throw new Error("createMeadowWebglRendererV2 requires a canvas");
  const gl = canvas.getContext("webgl2", { antialias: config.antialias !== false, alpha: false })
    ?? canvas.getContext("webgl", { antialias: config.antialias !== false, alpha: false });
  if (!gl) throw new Error("WebGL is required for IntoTheMeadow renderer v2");

  const program = createProgram(gl);
  const attributes = Object.freeze({
    position: gl.getAttribLocation(program, "aPosition"),
    normal: gl.getAttribLocation(program, "aNormal"),
    color: gl.getAttribLocation(program, "aColor"),
    outline: gl.getAttribLocation(program, "aOutline"),
    wind: gl.getAttribLocation(program, "aWind")
  });
  const uniforms = Object.freeze({
    viewProjection: gl.getUniformLocation(program, "uViewProjection"),
    time: gl.getUniformLocation(program, "uTime"),
    windDirection: gl.getUniformLocation(program, "uWindDirection"),
    windStrength: gl.getUniformLocation(program, "uWindStrength"),
    windGust: gl.getUniformLocation(program, "uWindGust"),
    outlinePass: gl.getUniformLocation(program, "uOutlinePass"),
    outlineWidth: gl.getUniformLocation(program, "uOutlineWidth"),
    lightDirection: gl.getUniformLocation(program, "uLightDirection"),
    rimColor: gl.getUniformLocation(program, "uRimColor"),
    outlineColor: gl.getUniformLocation(program, "uOutlineColor"),
    fogColor: gl.getUniformLocation(program, "uFogColor"),
    rimStrength: gl.getUniformLocation(program, "uRimStrength")
  });

  let buffers = [];
  let cache = {
    topologyKey: null,
    mesh: null,
    rebuildCount: 0,
    cacheHitCount: 0
  };
  let snapshot = Object.freeze({
    id: "meadow-webgl-renderer-v2",
    version: MEADOW_WEBGL_RENDERER_V2_VERSION,
    topologyKey: null,
    vertexCount: 0,
    rebuildCount: 0,
    cacheHitCount: 0
  });

  function disposeBuffers() {
    for (const buffer of buffers) gl.deleteBuffer(buffer);
    buffers = [];
  }

  function bindMesh(mesh) {
    disposeBuffers();
    buffers.push(
      createAttributeBuffer(gl, attributes.position, 3, mesh.positions),
      createAttributeBuffer(gl, attributes.normal, 3, mesh.normals),
      createAttributeBuffer(gl, attributes.color, 3, mesh.colors),
      createAttributeBuffer(gl, attributes.outline, 1, mesh.outlines),
      createAttributeBuffer(gl, attributes.wind, 2, mesh.wind)
    );
  }

  function ensureMesh(renderPlan) {
    const topologyKey = renderPlan.contract?.topologyKey;
    if (!topologyKey) throw new Error("render plan topology key missing");
    if (cache.topologyKey === topologyKey && cache.mesh) {
      cache = { ...cache, cacheHitCount: cache.cacheHitCount + 1 };
      return cache.mesh;
    }
    const mesh = buildMeadowMeshData(renderPlan);
    bindMesh(mesh);
    cache = {
      topologyKey,
      mesh,
      rebuildCount: cache.rebuildCount + 1,
      cacheHitCount: cache.cacheHitCount
    };
    return mesh;
  }

  function resize() {
    const ratio = Math.min(2, Math.max(1, finite(globalThis.devicePixelRatio, 1)));
    const width = Math.max(1, Math.floor((canvas.clientWidth || globalThis.innerWidth || 1) * ratio));
    const height = Math.max(1, Math.floor((canvas.clientHeight || globalThis.innerHeight || 1) * ratio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    return { width, height, ratio };
  }

  function render(renderPlan = {}) {
    if (renderPlan.schema !== MEADOW_RENDER_PLAN_SCHEMA) {
      throw new Error(`renderer v2 requires ${MEADOW_RENDER_PLAN_SCHEMA}`);
    }
    if (!renderPlan.contract?.validation?.passed) {
      throw new Error(`render plan validation failed: ${(renderPlan.contract?.validation?.failures ?? []).join("; ")}`);
    }

    const viewport = resize();
    gl.useProgram(program);
    const mesh = ensureMesh(renderPlan);
    gl.viewport(0, 0, viewport.width, viewport.height);

    const sky = renderPlan.style?.materials?.sky ?? {};
    const skyColor = hex(sky.base ?? "#7fb2dc");
    gl.clearColor(skyColor[0], skyColor[1], skyColor[2], 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    const camera = renderPlan.style?.camera ?? {};
    const cameraPosition = camera.position ?? { x: 0, y: 5.4, z: -52 };
    const cameraTarget = camera.target ?? { x: 0, y: 5.2, z: 24 };
    const projection = perspective(
      finite(camera.fov, 46),
      viewport.width / viewport.height,
      Math.max(0.01, finite(camera.near, 0.1)),
      Math.max(20, finite(camera.far, 180))
    );
    const view = lookAt(
      [finite(cameraPosition.x), finite(cameraPosition.y), finite(cameraPosition.z)],
      [finite(cameraTarget.x), finite(cameraTarget.y), finite(cameraTarget.z)],
      [0, 1, 0]
    );
    const viewProjection = multiplyMatrices(projection, view);

    const light = renderPlan.style?.light ?? {};
    const wind = renderPlan.effects?.wind ?? {};
    const windDirection = wind.direction ?? { x: 0.72, z: 0.34 };
    const directionMagnitude = Math.hypot(finite(windDirection.x, 0.72), finite(windDirection.z, 0.34)) || 1;

    gl.uniformMatrix4fv(uniforms.viewProjection, false, new Float32Array(viewProjection));
    gl.uniform1f(uniforms.time, finite(renderPlan.time));
    gl.uniform2fv(uniforms.windDirection, new Float32Array([
      finite(windDirection.x, 0.72) / directionMagnitude,
      finite(windDirection.z, 0.34) / directionMagnitude
    ]));
    gl.uniform1f(uniforms.windStrength, clamp(finite(wind.strength, 0.32), 0, 1.4));
    gl.uniform1f(uniforms.windGust, clamp(finite(wind.gust, 0.14), 0, 1));
    gl.uniform3fv(uniforms.lightDirection, new Float32Array([
      finite(light.direction?.x, -0.48),
      finite(light.direction?.y, 0.82),
      finite(light.direction?.z, -0.3)
    ]));
    gl.uniform3fv(uniforms.rimColor, new Float32Array(hex(light.rimColor ?? "#ffd37a")));
    gl.uniform3fv(uniforms.outlineColor, new Float32Array(hex(light.outlineColor ?? "#152013")));
    gl.uniform3fv(uniforms.fogColor, new Float32Array(hex(sky.highlight ?? "#efd39a")));
    gl.uniform1f(uniforms.rimStrength, clamp(finite(light.rimStrength, 0.24), 0, 0.65));
    gl.uniform1f(uniforms.outlineWidth, clamp(finite(light.outlineWidth, 0.052), 0, 0.09));

    gl.uniform1f(uniforms.outlinePass, 1);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.FRONT);
    gl.drawArrays(gl.TRIANGLES, 0, mesh.vertexCount);

    gl.uniform1f(uniforms.outlinePass, 0);
    gl.disable(gl.CULL_FACE);
    gl.drawArrays(gl.TRIANGLES, 0, mesh.vertexCount);

    snapshot = Object.freeze({
      id: "meadow-webgl-renderer-v2",
      version: MEADOW_WEBGL_RENDERER_V2_VERSION,
      planId: renderPlan.id ?? null,
      schema: renderPlan.schema,
      topologyKey: cache.topologyKey,
      vertexCount: mesh.vertexCount,
      triangleCount: mesh.triangleCount,
      primitiveFallbackCount: mesh.primitiveFallbackCount,
      descriptorCounts: mesh.descriptorCounts,
      rebuildCount: cache.rebuildCount,
      cacheHitCount: cache.cacheHitCount,
      cacheState: cache.rebuildCount === 1 && cache.cacheHitCount > 0 ? "persistent" : "warming",
      postProcessMode: "inline-cel-fog",
      validation: renderPlan.contract.validation
    });
    return snapshot;
  }

  function dispose() {
    disposeBuffers();
    gl.deleteProgram(program);
    cache = { topologyKey: null, mesh: null, rebuildCount: cache.rebuildCount, cacheHitCount: cache.cacheHitCount };
  }

  return Object.freeze({
    id: "meadow-webgl-renderer-v2",
    version: MEADOW_WEBGL_RENDERER_V2_VERSION,
    render,
    resize,
    dispose,
    getSnapshot: () => snapshot,
    snapshot: () => snapshot
  });
}

export default createMeadowWebglRendererV2;
