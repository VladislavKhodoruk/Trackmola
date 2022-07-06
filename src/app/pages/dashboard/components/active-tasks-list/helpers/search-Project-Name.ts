import { Project } from '@shared/interfaces/interfaces';

export function searchName(id: string, projects: Project[]): string {
  return projects.find((project) => project.id === id).name;
}

export function searchProjectColor(id: string, projects: Project[]): string {
  let nameOfColor = 'undefined';
  if (projects) {
    projects.forEach((item) => {
      if (item.id == id) {
        nameOfColor = item.color;
      }
    });
  }
  return nameOfColor;
}
