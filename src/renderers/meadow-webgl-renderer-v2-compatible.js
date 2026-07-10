import { createMeadowWebglRendererV2 as createBaseRenderer } from "./meadow-webgl-renderer-v2.js";

function createPrecisionSafeContext(gl) {
  const shaderTypes = new WeakMap();

  return new Proxy(gl, {
    get(target, property) {
      if (property === "createShader") {
        return (type) => {
          const shader = target.createShader(type);
          if (shader) shaderTypes.set(shader, type);
          return shader;
        };
      }

      if (property === "shaderSource") {
        return (shader, source) => {
          const type = shaderTypes.get(shader);
          const isVertexShader = type === target.VERTEX_SHADER;
          const hasFloatPrecision = /precision\s+(?:lowp|mediump|highp)\s+float\s*;/.test(source);
          const normalizedSource = isVertexShader && !hasFloatPrecision
            ? `precision mediump float;\n${source}`
            : source;
          target.shaderSource(shader, normalizedSource);
        };
      }

      const value = Reflect.get(target, property, target);
      return typeof value === "function" ? value.bind(target) : value;
    }
  });
}

function createPrecisionSafeCanvas(canvas) {
  const contexts = new Map();

  return new Proxy(canvas, {
    get(target, property) {
      if (property === "getContext") {
        return (type, options) => {
          const key = `${type}:${JSON.stringify(options ?? {})}`;
          if (contexts.has(key)) return contexts.get(key);
          const context = target.getContext(type, options);
          if (!context) return context;
          const wrapped = type === "webgl" || type === "webgl2"
            ? createPrecisionSafeContext(context)
            : context;
          contexts.set(key, wrapped);
          return wrapped;
        };
      }

      const value = Reflect.get(target, property, target);
      return typeof value === "function" ? value.bind(target) : value;
    },
    set(target, property, value) {
      return Reflect.set(target, property, value, target);
    }
  });
}

export function createMeadowWebglRendererV2(config = {}) {
  if (!config.canvas) throw new Error("createMeadowWebglRendererV2 requires a canvas");
  return createBaseRenderer({
    ...config,
    canvas: createPrecisionSafeCanvas(config.canvas)
  });
}

export default createMeadowWebglRendererV2;
