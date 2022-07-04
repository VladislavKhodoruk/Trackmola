import { Project, TaskTrack, User } from '@shared/interfaces/interfaces';

export interface ProjectsState {
  allTasks: TaskTrack[];
  allProjects: Project[];
  users: User[];
  selectedProject?: Project;
  searchValue?: string;
}

export const projectsState: ProjectsState = {
  allTasks: [],
  allProjects: [],
  users: [],
};
