import { Project, Task } from '../interfaces/interfaces';

export interface ProjectsState {
  myProjects?: Project[];
  allTasksInProjects?: Task[];
}

export const projectsState: ProjectsState = {
  myProjects: [],
  allTasksInProjects: [],
};
