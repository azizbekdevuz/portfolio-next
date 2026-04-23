import type { Messages } from "@/messages/en";
import type { SkillNode } from "./skillsList";

/**
 * Merges `messages.skills.nodes` copy onto static `skillNodes` from `skillsList.ts`.
 * Single path for desktop + mobile skills surfaces (prevents copy-paste drift).
 */
export function localizeSkillNodes(
  nodes: readonly SkillNode[],
  skillsMessages: Messages["skills"],
): SkillNode[] {
  return nodes.map((node) => {
    const loc = skillsMessages.nodes[node.id as keyof typeof skillsMessages.nodes];
    if (!loc) return node;
    return {
      ...node,
      title: loc.title,
      description: loc.description,
      experience: loc.experience,
      workspace: {
        ...node.workspace,
        title: loc.workspaceTitle,
        environment: loc.workspaceEnvironment,
      },
    };
  });
}
