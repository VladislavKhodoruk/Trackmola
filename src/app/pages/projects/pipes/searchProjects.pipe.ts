import { Pipe, PipeTransform } from '@angular/core';

import { GroupBy, Project, Task } from '@shared/interfaces/interfaces';

@Pipe({
  name: 'searchProjects',
})
export class SearchProjectsPipe implements PipeTransform {
  transform(
    projects: Project[],
    search = '',
    activeTaskGroupByProject: GroupBy<Task[]>
  ): Project[] {
    const projectsWithActiveTasksLength = projects
      .map((project) => ({
        ...project,
        activeTasksLength: activeTaskGroupByProject[project.id].length,
      }))
      .sort((a, b) => b.activeTasksLength - a.activeTasksLength);

    if (!search.trim()) {
      return projectsWithActiveTasksLength;
    }
    return projectsWithActiveTasksLength.filter(({ name }) =>
      name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }
}
