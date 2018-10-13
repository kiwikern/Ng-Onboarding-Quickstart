import { WorkspaceProject, WorkspaceSchema } from '@angular-devkit/core/src/workspace';

/**
 * Finds the specified project configuration in the workspace. Throws an error if the project
 * couldn't be found.
 */
export function getProjectFromWorkspace(
  workspace: WorkspaceSchema,
  projectName?: string): WorkspaceProject {

  const project = workspace.projects[projectName || workspace.defaultProject!];

  if (!project) {
    throw new Error(`Could not find project in workspace: ${projectName}`);
  }

  return project;
}
