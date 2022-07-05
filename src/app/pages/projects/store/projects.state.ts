import { Project, TaskTrack, Task, User } from '@shared/interfaces/interfaces';

export interface ProjectsState {
  projects: Project[];
  tasks: Task[];
  taskTracks: TaskTrack[];
  users: User[];
  selectedProject?: Project;
  searchValue?: string;
}

export const projectsState: ProjectsState = {
  projects: [],
  tasks: [],
  taskTracks: [],
  users: [],
};
