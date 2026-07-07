import { STORY_BEATS } from "../content/story/story-beats.js";
import { ARRIVAL_OBJECTIVES } from "../content/objectives/arrival-objectives.js";
import { ARRIVAL_INTERACTION_TARGETS } from "../content/interaction-targets/arrival-targets.js";

export function validateSceneFlow() {
  const failures = [];
  const targetIds = new Set(ARRIVAL_INTERACTION_TARGETS.map((target) => target.id));
  if (!STORY_BEATS.some((beat) => beat.trigger === "scene-start")) failures.push("missing scene-start story beat");
  for (const objective of ARRIVAL_OBJECTIVES) if (!targetIds.has(objective.targetId)) failures.push(`objective target missing: ${objective.targetId}`);
  return Object.freeze({ passed: failures.length === 0, failures, storyBeatCount: STORY_BEATS.length, objectiveCount: ARRIVAL_OBJECTIVES.length, targetCount: ARRIVAL_INTERACTION_TARGETS.length });
}
