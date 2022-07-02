import { Project } from '@shared/interfaces/interfaces';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProjects',
})
export class SearchProjectsPipe implements PipeTransform {
  transform(projects: Project[], search = ''): Project[] {
    if (!search.trim()) {
      return projects;
    }
    return projects.filter(({ name, description }) => {
      const compareName = name
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase());

      const compareDescription = description
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase());

      return compareName || compareDescription;
    });
  }
}
