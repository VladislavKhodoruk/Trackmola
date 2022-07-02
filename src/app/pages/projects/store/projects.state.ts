import { Project, TaskTrack, User } from '@shared/interfaces/interfaces';

export interface ProjectsState {
  allTasks: TaskTrack[];
  projects: Project[];
  users: User[];
  selectedProject?: Project;
  searchValue?: string;
}

export const projectsState: ProjectsState = {
  allTasks: [],
  projects: [],
  users: [],
};
