export const ARRIVAL_OBJECTIVES = Object.freeze([
  Object.freeze({ id: "walk-the-path", label: "Follow the meadow path", requiredAction: "path-progress", targetId: "arrival-path", completion: Object.freeze({ progressAtLeast: 0.35 }) }),
  Object.freeze({ id: "inspect-tree", label: "Inspect the old tree", requiredAction: "inspect", targetId: "focal-tree", completion: Object.freeze({ inspected: true }) })
]);
