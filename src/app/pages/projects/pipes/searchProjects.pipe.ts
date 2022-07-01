import { Project } from '@pages/projects/interfaces/interfaces';
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

      const compareDescriprion = description
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase());

      return compareName || compareDescriprion;
    });
  }
}