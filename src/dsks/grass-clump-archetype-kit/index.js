function hashUnit(value) {
  let h = 2166136261;
  for (const ch of String(value)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return (h >>> 0) / 4294967295;
}

export function createGrassClumpArchetypeKit(config = {}) {
  const families = Object.freeze(config.families ?? ["short", "tall", "meadow", "shadow", "flower-edge"]);
  const atlas = config.atlas ?? "meadow-grass-atlas";

  function createArchetype(family = "short", variant = 0) {
    const cardCount = Math.max(50, Math.min(100, Number(config.cardCount ?? (family === "tall" ? 82 : 64))));
    const radius = family === "tall" ? 1.58 : family === "flower-edge" ? 1.4 : 1.22;
    const heightMin = family === "short" ? 0.18 : family === "tall" ? 0.46 : 0.26;
    const heightMax = family === "short" ? 0.66 : family === "tall" ? 1.24 : 0.86;
    const localCards = Object.freeze(Array.from({ length: cardCount }, (_, i) => {
      const r = Math.sqrt(hashUnit(`${family}:${variant}:r:${i}`)) * radius;
      const a = hashUnit(`${family}:${variant}:a:${i}`) * Math.PI * 2;
      const h = heightMin + hashUnit(`${family}:${variant}:h:${i}`) * (heightMax - heightMin);
      return Object.freeze({
        x: Math.cos(a) * r,
        z: Math.sin(a) * r,
        rotation: hashUnit(`${family}:${variant}:rot:${i}`) * Math.PI * 2,
        width: 0.024 + hashUnit(`${family}:${variant}:w:${i}`) * 0.038,
        height: h,
        uvRect: Object.freeze({ x: (i % 4) / 4, y: Math.floor(i % 16 / 4) / 4, w: 0.25, h: 0.25 }),
        bendWeight: 0.3 + hashUnit(`${family}:${variant}:bend:${i}`) * 0.58
      });
    }));
    return Object.freeze({
      id: `grass-clump-${family}-${variant}`,
      type: "grass-clump-archetype",
      family,
      variant,
      cardCount,
      radius,
      heightRange: Object.freeze([heightMin, heightMax]),
      textureAtlas: atlas,
      localCards
    });
  }

  const archetypes = Object.freeze(families.flatMap((family) => [createArchetype(family, 0), createArchetype(family, 1)]));
  return Object.freeze({
    id: "grass-clump-archetype-kit",
    atlas,
    families,
    archetypes,
    createArchetype,
    validate() {
      const failures = [];
      for (const archetype of archetypes) if (archetype.cardCount < 50 || archetype.cardCount > 100) failures.push(`${archetype.id} card count out of range`);
      for (const archetype of archetypes) if (archetype.localCards.some((card) => card.width > 0.07)) failures.push(`${archetype.id} contains oversized grass cards`);
      return Object.freeze({ passed: failures.length === 0, failures });
    }
  });
}
