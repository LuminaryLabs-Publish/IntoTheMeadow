export function createTreeObjectDsk(config = {}) {
  const style = Object.freeze({
    id: "meadow-tree-style",
    shape: "wide-asymmetric",
    baseScale: Number(config.baseScale ?? 1.34),
    upperScale: Number(config.upperScale ?? 0.58),
    leafGap: Number(config.leafGap ?? 0.22),
    outlineClass: "hero-soft"
  });
  return Object.freeze({
    id: "tree-object-dsk",
    style,
    enhanceFocalTree(tree = {}) {
      return Object.freeze({
        ...tree,
        branchCount: Math.max(Number(tree.branchCount ?? 20), 32),
        rootCount: Math.max(Number(tree.rootCount ?? 13), 18),
        canopyLobeCount: Math.max(Number(tree.canopyLobeCount ?? 34), 46),
        renderStyle: Object.freeze({ outlineClass: "hero-soft", styleId: style.id })
      });
    },
    validate() {
      return Object.freeze({ passed: true, failures: [] });
    }
  });
}
