import { TaskTrack } from '@store/shared/shared.state';
import { Project } from '@shared/interfaces/interfaces';
import { ProjectsService } from '@shared/services/projects.service';

export function SearchCurrentProjectName(
  tasks: TaskTrack[],
  projects: Project[]
) {
  return tasks.forEach((item) => {
    item.projectId = '`'
  });
}
