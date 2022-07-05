import { Project, TaskTrack, User } from '@shared/interfaces/interfaces';

export interface ProjectsState {
  allTaskTracks: TaskTrack[];
  allProjects: Project[];
  users: User[];
  selectedProject?: Project;
  searchValue?: string;
}

export const projectsState: ProjectsState = {
  allTaskTracks: [],
  allProjects: [],
  users: [],
};
